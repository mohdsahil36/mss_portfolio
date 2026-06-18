import { NextResponse } from "next/server";

const LEETCODE_API = "https://alfa-leetcode-api.onrender.com";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json({ error: "Missing username" }, { status: 400 });
  }

  try {
    const response = await fetch(`${LEETCODE_API}/${username}/solved`, {
      next: { revalidate: 60 * 60 * 6 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Unable to fetch LeetCode data" },
        { status: response.status },
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Unable to fetch LeetCode data" },
      { status: 502 },
    );
  }
}
