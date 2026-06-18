"use client";

import { easeOut, motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  specializationItems,
  specializationSection,
} from "@/app/data/specialization";
import { SafeMovingLabels } from "@/app/components/SafeMovingLabels";

export default function Specialization({
  sectionIndex = 3,
}: {
  sectionIndex?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.14 });
  const sectionDirection = sectionIndex % 2 === 0 ? -40 : 40;
  const SectionIcon = specializationSection.icon;

  return (
    <motion.section
      ref={ref}
      id="specialization"
      className="mt-5 scroll-mt-18 bg-background py-8 text-[#151719] dark:text-white"
      initial={{ opacity: 0, x: sectionDirection }}
      animate={
        isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: sectionDirection }
      }
      transition={{ duration: 0.45, ease: easeOut }}
    >
      <div className="mb-6 border-b border-[#ededed] pb-5 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#ededed] bg-white dark:border-zinc-800 dark:bg-background">
            <SectionIcon className="h-4 w-4" />
          </span>
          <h2 className="text-[1.55rem] font-semibold leading-tight sm:text-[1.75rem]">
            {specializationSection.title}
          </h2>
        </div>
        <p className="mt-3 max-w-[34rem] text-[0.82rem] font-medium leading-6 text-[#747780] dark:text-zinc-400">
          {specializationSection.summary}
        </p>
      </div>

      <div className="overflow-hidden rounded-[1.35rem] border border-[#e8e8e8] bg-white dark:border-zinc-800 dark:bg-background">
        {specializationItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{
                duration: 0.32,
                ease: easeOut,
                delay: index * 0.06,
              }}
              className="group grid gap-3 border-b border-[#eeeeee] p-4 transition-colors duration-300 last:border-b-0 hover:bg-[#fbfbfb] sm:grid-cols-[4.25rem_1fr] dark:border-zinc-800 dark:hover:bg-zinc-950"
            >
              <div className="flex items-center gap-2 sm:block">
                <span className="font-mono text-[0.65rem] font-semibold text-[#a2a5ad]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#ededed] bg-[#fafafa] text-[#151719] transition-colors duration-300 group-hover:border-[#d8d8d8] group-hover:bg-white dark:border-zinc-800 dark:bg-zinc-950 dark:text-white dark:group-hover:border-zinc-700 dark:group-hover:bg-background sm:mt-3">
                  <Icon className="h-4 w-4" />
                </span>
              </div>

              <div className="min-w-0 sm:border-l sm:border-[#eeeeee] sm:pl-4 dark:sm:border-zinc-800">
                <h3 className="text-[0.98rem] font-semibold leading-5">
                  {item.title}
                </h3>
                <p className="mt-2 text-[0.78rem] font-medium leading-6 text-[#747780] dark:text-zinc-400">
                  {item.description}
                </p>
              </div>
            </motion.article>
          );
        })}
      </div>

      <SafeMovingLabels />
    </motion.section>
  );
}
