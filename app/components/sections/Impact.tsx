"use client";

import { easeOut, motion, useInView } from "framer-motion";
import { useRef } from "react";
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
  const [leadMetric, ...supportingMetrics] = impactMetrics;
  const LeadIcon = leadMetric.icon;

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

      <div className="rounded-[1.35rem] border border-[#e8e8e8] bg-white p-4 dark:border-zinc-800 dark:bg-background sm:p-5">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.34, ease: easeOut }}
          className="relative overflow-hidden border-b border-[#eeeeee] pb-5 dark:border-zinc-800"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[#9a9da5]">
                Lead scale signal
              </p>
              <p className="mt-3 font-mono text-[2.6rem] font-semibold leading-none tracking-tight text-[#151719] dark:text-white sm:text-[3rem]">
                {leadMetric.value}
              </p>
              <h3 className="mt-3 text-[0.98rem] font-semibold leading-5">
                {leadMetric.label}
              </h3>
              <p className="mt-2 max-w-116 text-[0.78rem] font-medium leading-6 text-[#747780] dark:text-zinc-400">
                {leadMetric.note}
              </p>
            </div>

            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#ededed] bg-[#fafafa] text-[#151719] dark:border-zinc-800 dark:bg-zinc-950 dark:text-white">
              <LeadIcon className="h-4 w-4" />
            </span>
          </div>
        </motion.div>

        <div className="pt-2">
          {supportingMetrics.map((metric, index) => {
            const Icon = metric.icon;

            return (
              <motion.article
                key={`${metric.value}-${metric.label}`}
                initial={{ opacity: 0, y: 8 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                transition={{
                  duration: 0.3,
                  ease: easeOut,
                  delay: 0.08 + index * 0.04,
                }}
                className="group grid gap-3 border-b border-[#eeeeee] py-3.5 last:border-b-0 sm:grid-cols-[4.75rem_1fr] dark:border-zinc-800"
              >
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[#747780] transition-colors duration-300 group-hover:text-[#151719] dark:text-zinc-500 dark:group-hover:text-white">
                    <Icon className="h-4 w-4" />
                  </span>
                  <p className="font-mono text-[1.05rem] font-semibold leading-none tabular-nums text-[#151719] dark:text-white">
                    {metric.value}
                  </p>
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <h3 className="text-[0.86rem] font-semibold leading-5">
                      {metric.label}
                    </h3>
                    <span className="hidden h-px flex-1 bg-[#eeeeee] sm:block dark:bg-zinc-800" />
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
    </motion.section>
  );
}
