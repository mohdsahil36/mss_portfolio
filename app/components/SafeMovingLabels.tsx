"use client";

import { workingStyleData } from "@/app/data/workingStyle";

export function SafeMovingLabels() {
  const { title, intro, summary, groups } = workingStyleData;

  return (
    <section className="mt-4 overflow-hidden rounded-[1.35rem] border border-[#e8e8e8] bg-[#fafafa] text-[#151719] dark:border-zinc-800 dark:bg-zinc-950 dark:text-white">
      <div className="grid gap-0 md:grid-cols-[1fr_0.9fr]">
        <div className="p-4 md:border-r md:border-[#e8e8e8] dark:md:border-zinc-800">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#151719] dark:bg-white" />
            <p className="font-mono text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-[#9a9da5]">
              {title}
            </p>
          </div>
          <p className="mt-3 text-[0.88rem] font-semibold leading-6">
            {intro}
          </p>
          <p className="mt-2 text-[0.76rem] font-medium leading-6 text-[#747780] dark:text-zinc-400">
            {summary}
          </p>
        </div>

        <div className="border-t border-[#e8e8e8] p-4 md:border-t-0 dark:border-zinc-800">
          <div className="space-y-3">
            {groups.map((group) => (
              <div
                key={group.title}
                className="flex items-baseline justify-between gap-4"
              >
                <p className="font-mono text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-[#9a9da5]">
                  {group.title}
                </p>
                <p className="text-right text-[0.72rem] font-semibold leading-5 text-[#62666f] dark:text-zinc-400">
                  {group.items.join(" / ")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
