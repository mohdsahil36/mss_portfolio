"use client";

import { easeOut, motion, useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import {
  beyondCodeSection,
  codingProfileData,
  interestsData,
} from "@/app/data/beyondCode";

type ContributionDay = {
  date?: string;
  count?: number;
  level?: number;
};

type HeatmapCell = {
  date?: string;
  count?: number;
  level?: number;
  isPlaceholder?: boolean;
};

type ContributionResponse = {
  source?: string;
  years?: Record<string, ContributionYearData>;
};

type ContributionYearData = {
  total: number;
  contributions: ContributionDay[];
};

type LeetcodeSubmission = {
  difficulty: string;
  count: number;
  submissions: number;
};

type LeetcodeData = {
  solvedProblem?: number;
  easySolved?: number;
  mediumSolved?: number;
  hardSolved?: number;
  totalSubmissionNum?: LeetcodeSubmission[];
  acSubmissionNum?: LeetcodeSubmission[];
};

function calculateMaxStreak(days: ContributionDay[]) {
  let current = 0;
  let max = 0;

  days.forEach((day) => {
    if ((day.count ?? 0) > 0) {
      current += 1;
      max = Math.max(max, current);
      return;
    }

    current = 0;
  });

  return max;
}

function calculateCurrentStreak(days: ContributionDay[]) {
  let streak = 0;

  for (let index = days.length - 1; index >= 0; index -= 1) {
    if ((days[index].count ?? 0) <= 0) {
      if (streak > 0) {
        break;
      }

      continue;
    }

    streak += 1;
  }

  return streak;
}

function getIsoDate(year: string, index: number) {
  const date = new Date(Date.UTC(Number(year), 0, index + 1));
  return date.toISOString().slice(0, 10);
}

function getHeatmapCells(days: ContributionDay[]) {
  const datedDays = days
    .filter((day): day is Required<Pick<ContributionDay, "date">> & ContributionDay =>
      Boolean(day.date),
    )
    .sort((a, b) => a.date.localeCompare(b.date));

  if (!datedDays.length) {
    return [] as HeatmapCell[];
  }

  const firstDate = new Date(`${datedDays[0].date}T00:00:00Z`);
  const firstWeekday = firstDate.getUTCDay();
  const leadingCells: HeatmapCell[] = Array.from({ length: firstWeekday }, () => ({
    isPlaceholder: true,
  }));
  const cells: HeatmapCell[] = [...leadingCells, ...datedDays];
  const trailingCount = (7 - (cells.length % 7)) % 7;
  const trailingCells: HeatmapCell[] = Array.from(
    { length: trailingCount },
    () => ({
      isPlaceholder: true,
    }),
  );

  return [...cells, ...trailingCells];
}

function getMonthMarkers(cells: HeatmapCell[]) {
  const formatter = new Intl.DateTimeFormat("en", { month: "short" });
  const seen = new Set<string>();

  return cells.reduce<{ label: string; column: number }[]>(
    (markers, cell, index) => {
      if (!cell.date) return markers;

      const date = new Date(`${cell.date}T00:00:00Z`);
      const monthKey = `${date.getUTCFullYear()}-${date.getUTCMonth()}`;

      if (seen.has(monthKey)) return markers;

      seen.add(monthKey);
      markers.push({
        label: formatter.format(date),
        column: Math.floor(index / 7) + 1,
      });

      return markers;
    },
    [],
  );
}

export default function BeyondCode({
  sectionIndex = 4,
}: {
  sectionIndex?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.12 });
  const sectionDirection = sectionIndex % 2 === 0 ? -40 : 40;
  const SectionIcon = beyondCodeSection.icon;
  const [activeTab, setActiveTab] = useState(codingProfileData.tabs[0].label);
  const [isYearMenuOpen, setIsYearMenuOpen] = useState(false);
  const [hoveredContributionDay, setHoveredContributionDay] =
    useState<ContributionDay | null>(null);
  const [selectedYear, setSelectedYear] = useState(
    codingProfileData.years[0].year,
  );
  const selectedYearData =
    codingProfileData.years.find((item) => item.year === selectedYear) ??
    codingProfileData.years[0];
  const [contributionData, setContributionData] = useState<
    Record<string, ContributionYearData> | null
  >(null);
  const [isContributionLoading, setIsContributionLoading] = useState(true);
  const [leetcodeData, setLeetcodeData] = useState<LeetcodeData | null>(null);
  const [isLeetcodeLoading, setIsLeetcodeLoading] = useState(true);
  const levelClasses = [
    "bg-[#ebedf0] dark:bg-zinc-900",
    "bg-[#9be9a8]",
    "bg-[#40c463]",
    "bg-[#30a14e]",
    "bg-[#216e39]",
  ];
  const currentYear = new Date().getFullYear();
  const selectedContributionData = contributionData?.[selectedYear];
  const fallbackDays: ContributionDay[] = selectedYearData.levels
    .split("")
    .map((level, index) => ({
      date: getIsoDate(selectedYear, index),
      level: Number(level),
      count: Number(level) > 0 ? 1 : 0,
    }));
  const visibleContributionDays =
    selectedContributionData?.contributions?.length
      ? selectedContributionData.contributions
      : fallbackDays;
  const todayIso = new Date().toISOString().slice(0, 10);
  const visibleContributionDaysUntilToday =
    selectedYear === String(currentYear)
      ? visibleContributionDays.filter(
          (day) => !day.date || day.date <= todayIso,
        )
      : visibleContributionDays;
  const todayContribution =
    visibleContributionDays.find((day) => day.date === todayIso)?.count ?? 0;
  const activeProfile = codingProfileData.tabs.find(
    (tab) => tab.label === activeTab,
  ) ?? codingProfileData.tabs[0];
  const isGithubTab = activeTab === "GitHub";
  const heatmapCells = getHeatmapCells(visibleContributionDays);
  const monthMarkers = getMonthMarkers(heatmapCells);
  const activeContributionDay = hoveredContributionDay;
  const repositoryStat = selectedYearData.stats.find(
    (stat) => stat.label === "Repositories",
  );
  const dynamicStats = useMemo(
    () => [
      selectedYearData.stats[0],
      {
        ...selectedYearData.stats[1],
        value: String(calculateMaxStreak(visibleContributionDaysUntilToday)),
      },
      {
        ...selectedYearData.stats[2],
        value:
          selectedYear === String(currentYear)
            ? String(calculateCurrentStreak(visibleContributionDaysUntilToday))
            : "-",
      },
      {
        ...selectedYearData.stats[3],
        value:
          selectedYear === String(currentYear)
            ? String(todayContribution)
            : "-",
      },
    ],
    [
      currentYear,
      selectedYear,
      selectedYearData.stats,
      todayContribution,
      visibleContributionDaysUntilToday,
    ],
  );
  const totalSubmission = leetcodeData?.totalSubmissionNum?.find(
    (item) => item.difficulty === "All",
  );
  const acceptedSubmission = leetcodeData?.acSubmissionNum?.find(
    (item) => item.difficulty === "All",
  );
  const leetcodeDifficulties = [
    {
      label: "Easy",
      solved: leetcodeData?.easySolved ?? 0,
      className: "text-[#1f8f4d]",
      barClassName: "bg-[#1f8f4d]",
    },
    {
      label: "Medium",
      solved: leetcodeData?.mediumSolved ?? 0,
      className: "text-[#9a6a00]",
      barClassName: "bg-[#9a6a00]",
    },
    {
      label: "Hard",
      solved: leetcodeData?.hardSolved ?? 0,
      className: "text-[#b42318]",
      barClassName: "bg-[#b42318]",
    },
  ];
  const maxDifficultySolved = Math.max(
    ...leetcodeDifficulties.map((item) => item.solved),
    1,
  );

  useEffect(() => {
    fetch(
      `/api/github-contributions?username=${codingProfileData.username}&from=2024`,
    )
      .then((response) => response.json() as Promise<ContributionResponse>)
      .then((data) => {
        setContributionData(data.years ?? null);
      })
      .catch(() => setContributionData(null))
      .finally(() => setIsContributionLoading(false));
  }, []);

  useEffect(() => {
    fetch(`/api/leetcode?username=${codingProfileData.leetcodeUsername}`)
      .then((response) => response.json() as Promise<LeetcodeData>)
      .then((data) => {
        setLeetcodeData(data);
      })
      .catch(() => setLeetcodeData(null))
      .finally(() => setIsLeetcodeLoading(false));
  }, []);

  return (
    <motion.section
      ref={ref}
      id="beyond-code"
      className="mt-4 scroll-mt-18 bg-background py-7 text-[#151719] dark:text-white"
      initial={{ opacity: 0, x: sectionDirection }}
      animate={
        isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: sectionDirection }
      }
      transition={{ duration: 0.45, ease: easeOut }}
    >
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#ededed] bg-white dark:border-zinc-800 dark:bg-background">
          <SectionIcon className="h-4 w-4" />
        </span>
        <h2 className="text-[1.5rem] font-semibold leading-tight sm:text-[1.7rem]">
          {beyondCodeSection.title}
        </h2>
      </div>

      <p className="mt-3 max-w-[31rem] text-[0.82rem] font-medium leading-6 text-[#747780] dark:text-zinc-400">
        {beyondCodeSection.summary}
      </p>

      <div className="mt-6 rounded-[1.25rem] border border-[#e8e8e8] bg-white p-5 dark:border-zinc-800 dark:bg-background sm:p-6">
        <div className="flex flex-wrap gap-2">
          {interestsData.map((item) => {
            const Icon = item.icon;

            return (
              <span
                key={item.label}
                className="inline-flex min-h-9 items-center gap-2 rounded-full border border-[#ededed] bg-white px-3 text-[0.82rem] font-semibold text-[#565a61] dark:border-zinc-800 dark:bg-background dark:text-zinc-400"
              >
                <Icon className="h-4 w-4 text-[#8a8d95]" />
                {item.label}
              </span>
            );
          })}
        </div>

        <div className="mt-6 overflow-hidden rounded-[1rem] border border-[#ededed] dark:border-zinc-800 dark:bg-background">
          <div className="flex flex-col gap-4 border-b border-[#ededed] p-3 dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
            <div className="inline-flex w-fit rounded-xl border border-[#ededed] bg-white p-1 dark:border-zinc-800 dark:bg-background">
              {codingProfileData.tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.label;

                return (
                  <button
                    key={tab.label}
                    type="button"
                    onClick={() => setActiveTab(tab.label)}
                    className={`inline-flex min-h-9 items-center gap-2 rounded-lg px-3 text-[0.82rem] font-semibold ${
                      isActive
                        ? "bg-black text-white dark:bg-white dark:text-black"
                        : "text-[#8a8d95]"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {isGithubTab ? (
              <div className="relative flex items-center gap-2">
                <span
                  className="font-mono text-[0.62rem] font-semibold uppercase text-[#9a9da5]"
                >
                  Year
                </span>
                <button
                  type="button"
                  onClick={() => setIsYearMenuOpen((isOpen) => !isOpen)}
                  className="inline-flex min-h-9 min-w-24 items-center justify-between gap-3 rounded-lg border border-[#ededed] bg-white px-3 text-[0.78rem] font-semibold text-[#151719] transition-colors hover:bg-[#f8f8f8] dark:border-zinc-800 dark:bg-background dark:text-white dark:hover:bg-zinc-900"
                  aria-expanded={isYearMenuOpen}
                  aria-haspopup="listbox"
                >
                  {selectedYear}
                  <FiChevronDown
                    className={`h-3.5 w-3.5 text-[#8a8d95] transition-transform ${
                      isYearMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isYearMenuOpen ? (
                  <div
                    role="listbox"
                    className="absolute right-0 top-11 z-20 w-24 overflow-hidden rounded-xl border border-[#ededed] bg-white p-1 shadow-[0_14px_35px_rgba(15,23,42,0.08)] dark:border-zinc-800 dark:bg-background"
                  >
                    {codingProfileData.years.map((item) => (
                      <button
                        key={item.year}
                        type="button"
                        role="option"
                        aria-selected={selectedYear === item.year}
                        onClick={() => {
                          setSelectedYear(item.year);
                          setIsYearMenuOpen(false);
                        }}
                        className={`block min-h-8 w-full rounded-lg px-3 text-left text-[0.76rem] font-semibold transition-colors ${
                          selectedYear === item.year
                            ? "bg-black text-white dark:bg-white dark:text-black"
                            : "text-[#747780] hover:bg-[#f8f8f8] dark:text-zinc-400 dark:hover:bg-zinc-900"
                        }`}
                      >
                        {item.year}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>

          <div className="p-4">
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="font-mono text-[0.72rem] font-semibold uppercase text-[#9a9da5]">
                  {activeProfile.label === "GitHub"
                    ? codingProfileData.title
                    : "Practice profile"}
                </p>
                <p className="mt-1 text-[0.78rem] font-medium text-[#747780] dark:text-zinc-400">
                  {activeProfile.comment}
                </p>
              </div>
              <a
                href={activeProfile.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit rounded-lg border border-[#ededed] px-2.5 py-1 text-[0.72rem] font-semibold text-[#747780] dark:border-zinc-800 dark:text-zinc-400"
              >
                @
                {activeProfile.label === "GitHub"
                  ? codingProfileData.username
                  : codingProfileData.leetcodeUsername}{" "}
                ↗
              </a>
            </div>

            {isGithubTab ? (
              <>
                <div className="grid gap-2 sm:grid-cols-4">
                  {dynamicStats.map((stat) => {
                    const Icon = stat.icon;

                    return (
                      <div
                        key={stat.label}
                        className="rounded-xl border border-[#ededed] p-3 text-center dark:border-zinc-800"
                      >
                        <Icon className="mx-auto h-4 w-4 text-[#8a8d95]" />
                        <p className="mt-2 text-[1.25rem] font-semibold leading-none">
                          {isContributionLoading &&
                          stat.label !== repositoryStat?.label
                            ? "..."
                            : stat.value}
                        </p>
                        <p className="mt-1 font-mono text-[0.62rem] font-semibold uppercase text-[#9a9da5]">
                          {stat.label}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 overflow-x-auto rounded-xl border border-[#ededed] bg-[#fbfbfb] p-3 dark:border-zinc-800 dark:bg-background">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <p className="font-mono text-[0.62rem] font-semibold uppercase text-[#9a9da5]">
                      Contribution map
                    </p>
                    <p className="rounded-lg border border-[#ededed] bg-white px-2.5 py-1 text-[0.7rem] font-semibold text-[#565a61] dark:border-zinc-800 dark:bg-background dark:text-zinc-300">
                      {activeContributionDay?.date
                        ? activeContributionDay.date
                        : "Hover a day"}
                    </p>
                  </div>
                  <div className="flex w-max gap-2">
                    <div className="pt-[1.35rem] font-mono text-[0.58rem] font-medium text-[#9a9da5]">
                      <span className="block h-[0.55rem]" />
                      <span className="mt-1 block h-[0.55rem]">Mon</span>
                      <span className="mt-1 block h-[0.55rem]" />
                      <span className="mt-1 block h-[0.55rem]">Wed</span>
                      <span className="mt-1 block h-[0.55rem]" />
                      <span className="mt-1 block h-[0.55rem]">Fri</span>
                      <span className="mt-1 block h-[0.55rem]" />
                    </div>
                    <div>
                      <div
                        className="mb-2 grid gap-1 text-[0.62rem] font-medium text-[#9a9da5]"
                        style={{
                          gridTemplateColumns: `repeat(${Math.ceil(
                            heatmapCells.length / 7,
                          )}, 0.55rem)`,
                        }}
                        aria-hidden="true"
                      >
                        {monthMarkers.map((month) => (
                          <span
                            key={`${selectedYear}-${month.label}`}
                            className="w-8"
                            style={{ gridColumnStart: month.column }}
                          >
                            {month.label}
                          </span>
                        ))}
                      </div>
                      <div
                        className="grid grid-flow-col gap-1"
                        style={{
                          gridTemplateRows: "repeat(7, 0.55rem)",
                          gridAutoColumns: "0.55rem",
                        }}
                        aria-label={`GitHub contribution grid for ${selectedYear}`}
                      >
                        {heatmapCells.map((cell, index) =>
                          cell.isPlaceholder ? (
                            <span
                              key={`${selectedYear}-placeholder-${index}`}
                              className="h-2.5 w-2.5"
                              aria-hidden="true"
                            />
                          ) : (
                            <span
                              key={`${selectedYear}-${cell.date ?? index}`}
                              tabIndex={0}
                              onMouseEnter={() =>
                                setHoveredContributionDay(cell)
                              }
                              onMouseLeave={() =>
                                setHoveredContributionDay(null)
                              }
                              onFocus={() => setHoveredContributionDay(cell)}
                              onBlur={() => setHoveredContributionDay(null)}
                              aria-label={cell.date ?? "Contribution day"}
                              className={`h-2.5 w-2.5 rounded-[0.18rem] ${
                                levelClasses[Number(cell.level ?? 0)] ??
                                levelClasses[0]
                              } outline-none ring-black/0 transition-transform hover:scale-125 focus:scale-125 focus:ring-1 dark:focus:ring-white`}
                            />
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="grid gap-3 sm:grid-cols-[0.85fr_1.15fr]">
                <div className="rounded-xl border border-[#ededed] bg-[#fbfbfb] p-4 dark:border-zinc-800 dark:bg-background">
                  <p className="font-mono text-[0.62rem] font-semibold uppercase text-[#9a9da5]">
                    Problems solved
                  </p>
                  <p className="mt-3 text-[2.4rem] font-semibold leading-none tracking-tight">
                    {isLeetcodeLoading
                      ? "..."
                      : leetcodeData?.solvedProblem ?? "-"}
                  </p>
                  <p className="mt-3 text-[0.76rem] font-medium leading-5 text-[#747780] dark:text-zinc-400">
                    @{codingProfileData.leetcodeUsername}. The grind is real,
                    even when the accepted tab is shy.
                  </p>
                </div>

                <div className="rounded-xl border border-[#ededed] p-4 dark:border-zinc-800">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-mono text-[0.62rem] font-semibold uppercase text-[#9a9da5]">
                      Difficulty split
                    </p>
                    <span className="rounded-md border border-[#ededed] px-2 py-1 text-[0.68rem] font-semibold text-[#747780] dark:border-zinc-800 dark:text-zinc-400">
                      live
                    </span>
                  </div>
                  <div className="mt-4 space-y-3">
                    {leetcodeDifficulties.map((item) => {
                      const width = `${Math.max(
                        (item.solved / maxDifficultySolved) * 100,
                        item.solved > 0 ? 8 : 0,
                      )}%`;

                      return (
                        <div key={item.label}>
                          <div className="mb-1.5 flex items-center justify-between text-[0.78rem] font-semibold">
                            <span className="text-[#565a61] dark:text-zinc-300">
                              {item.label}
                            </span>
                            <span className={item.className}>
                              {isLeetcodeLoading ? "..." : item.solved}
                            </span>
                          </div>
                          <div className="h-2 overflow-hidden rounded-full bg-[#eeeeee] dark:bg-zinc-900">
                            <span
                              className={`block h-full rounded-full ${item.barClassName}`}
                              style={{ width }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="grid gap-3 sm:col-span-2 sm:grid-cols-3">
                  {[
                    {
                      label: "Submissions",
                      value: totalSubmission?.submissions,
                      detail: `${acceptedSubmission?.submissions ?? "-"} accepted`,
                    },
                    {
                      label: "Attempted",
                      value: totalSubmission?.count,
                      detail: "problem attempts",
                    },
                    {
                      label: "Acceptance",
                      value:
                        totalSubmission?.submissions && acceptedSubmission?.submissions
                          ? `${Math.round(
                              (acceptedSubmission.submissions /
                                totalSubmission.submissions) *
                                100,
                            )}%`
                          : "-",
                      detail: "submission ratio",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-xl border border-[#ededed] p-3 dark:border-zinc-800"
                    >
                      <p className="font-mono text-[0.6rem] font-semibold uppercase text-[#9a9da5]">
                        {item.label}
                      </p>
                      <p className="mt-2 text-[1.25rem] font-semibold leading-none">
                        {isLeetcodeLoading ? "..." : item.value ?? "-"}
                      </p>
                      <p className="mt-2 text-[0.7rem] font-medium text-[#8a8d95]">
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="text-[0.78rem] font-medium leading-5 text-[#8a8d95] sm:col-span-2">
                  Still trying my best; some questions simply have stronger
                  opinions than I do.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
