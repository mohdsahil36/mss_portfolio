import { NextResponse } from "next/server";

type GithubDay = {
  date: string;
  count: number;
  level: number;
};

type GithubYear = {
  total: number;
  repositories?: number;
  contributions: GithubDay[];
};

const PUBLIC_CONTRIBUTIONS_API =
  "https://github-contributions-api.jogruber.de/v4";

function getLevel(count: number) {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

async function fetchPublicYear(username: string, year: number) {
  const response = await fetch(`${PUBLIC_CONTRIBUTIONS_API}/${username}?y=${year}`, {
    next: { revalidate: 60 * 60 * 6 },
  });

  if (!response.ok) {
    throw new Error(`Unable to fetch public contribution data for ${year}`);
  }

  const data = await response.json();

  return {
    total: data.total?.[String(year)] ?? data.total ?? 0,
    contributions: data.contributions ?? [],
  } satisfies GithubYear;
}

async function fetchGraphqlYear(username: string, year: number, token: string) {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query ContributionYear($login: String!, $from: DateTime!, $to: DateTime!) {
          user(login: $login) {
            repositories(ownerAffiliations: OWNER, privacy: PUBLIC) {
              totalCount
            }
            contributionsCollection(from: $from, to: $to) {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    date
                    contributionCount
                  }
                }
              }
            }
          }
        }
      `,
      variables: {
        login: username,
        from: `${year}-01-01T00:00:00Z`,
        to: `${year}-12-31T23:59:59Z`,
      },
    }),
    next: { revalidate: 60 * 60 },
  });

  if (!response.ok) {
    throw new Error(`Unable to fetch GitHub GraphQL data for ${year}`);
  }

  const payload = await response.json();
  const calendar = payload.data?.user?.contributionsCollection?.contributionCalendar;
  const contributions =
    calendar?.weeks?.flatMap(
      (week: { contributionDays: { date: string; contributionCount: number }[] }) =>
        week.contributionDays.map((day) => ({
          date: day.date,
          count: day.contributionCount,
          level: getLevel(day.contributionCount),
        })),
    ) ?? [];

  return {
    total: calendar?.totalContributions ?? 0,
    repositories: payload.data?.user?.repositories?.totalCount,
    contributions,
  } satisfies GithubYear;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");
  const startYear = Number(searchParams.get("from") ?? 2024);
  const currentYear = new Date().getFullYear();
  const token = process.env.GITHUB_TOKEN;

  if (!username) {
    return NextResponse.json({ error: "Missing username" }, { status: 400 });
  }

  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, index) => startYear + index,
  );

  try {
    const entries = await Promise.all(
      years.map(async (year) => {
        const data = token
          ? await fetchGraphqlYear(username, year, token)
          : await fetchPublicYear(username, year);

        return [String(year), data] as const;
      }),
    );

    return NextResponse.json({
      source: token ? "github-graphql" : "public-contributions-api",
      years: Object.fromEntries(entries),
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to fetch contribution data" },
      { status: 502 },
    );
  }
}
