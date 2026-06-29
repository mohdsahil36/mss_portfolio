"use client";

import { easeOut, motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { impactMetrics, impactSection } from "@/app/data/impact";

export default function Impact({
  sectionIndex = 1,
}: {
  sectionIndex?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.12 });
  const sectionDirection = sectionIndex % 2 === 0 ? -40 : 40;
  const SectionIcon = impactSection.icon;

  return (
    <motion.section
      ref={ref}
      id="impact"
      className="mt-5 scroll-mt-18 bg-background py-7 text-[#151719] dark:text-white"
      initial={{ opacity: 0, x: sectionDirection }}
      animate={
        isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: sectionDirection }
      }
      transition={{ duration: 0.45, ease: easeOut }}
    >
      <div className="mb-6 border-b border-[#ededed] pb-4 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#ededed] bg-white dark:border-zinc-800 dark:bg-background">
            <SectionIcon className="h-4 w-4" />
          </span>
          <h2 className="text-[1.4rem] font-semibold leading-none sm:text-[1.6rem]">
            {impactSection.title}
          </h2>
        </div>
        <p className="mt-2 max-w-124 text-[0.78rem] font-medium leading-6 text-[#747780] dark:text-zinc-400">
          {impactSection.summary}
        </p>
      </div>

      <div className="overflow-hidden rounded-[1.35rem] border border-[#e8e8e8] bg-white dark:border-zinc-800 dark:bg-background">
        <div className="flex items-center justify-between border-b border-[#eeeeee] px-4 py-3 dark:border-zinc-800 sm:px-5">
          <p className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-[#9a9da5]">
            Production outcomes
          </p>
          <span className="font-mono text-[0.62rem] font-semibold text-[#9a9da5]">
            {impactMetrics.length} signals
          </span>
        </div>

        <div className="px-4 sm:px-5">
          {impactMetrics.map((metric, index) => {
            const Icon = metric.icon;

            return (
              <motion.article
                key={`${metric.value}-${metric.label}`}
                initial={{ opacity: 0, y: 10 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                }
                transition={{
                  duration: 0.32,
                  ease: easeOut,
                  delay: index * 0.04,
                }}
                className="group grid gap-3 border-b border-[#eeeeee] py-4 last:border-b-0 sm:grid-cols-[5.25rem_1fr] dark:border-zinc-800"
              >
                <div className="flex items-center gap-2.5 sm:items-start">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[#eeeeee] bg-[#fafafa] text-[#747780] transition-colors duration-300 group-hover:text-[#151719] dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-500 dark:group-hover:text-white">
                    <Icon className="h-4 w-4" />
                  </span>
                  <p className="font-mono text-[1.08rem] font-semibold leading-7 tabular-nums text-[#151719] dark:text-white">
                    {metric.value}
                  </p>
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <h3 className="text-[0.86rem] font-semibold leading-5">
                      {metric.label}
                    </h3>
                    <span className="hidden h-px flex-1 bg-[#eeeeee] md:block dark:bg-zinc-800" />
                  </div>
                  <p className="mt-1.5 text-[0.74rem] font-medium leading-6 text-[#747780] dark:text-zinc-400">
                    {metric.note}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      <div className="mt-5 flex justify-center">
        <Link
          href="/impact-log"
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-[#ededed] bg-white px-4 text-[0.78rem] font-semibold text-[#151719] transition-[background-color,border-color,box-shadow] duration-200 hover:border-[#d8d8d8] hover:bg-[#f7f7f7] hover:shadow-[0_10px_28px_rgba(15,15,15,0.04)] dark:border-zinc-800 dark:bg-background dark:text-white dark:hover:bg-zinc-900"
        >
          Open full impact log
          <FiArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </motion.section>
  );
}
