"use client";

import { easeOut, motion, useInView } from "framer-motion";
import { useRef } from "react";
import { educationData, educationSection } from "@/app/data/education";

export default function Education({
  sectionIndex = 3,
}: {
  sectionIndex?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.12 });
  const sectionDirection = sectionIndex % 2 === 0 ? -40 : 40;
  const SectionIcon = educationSection.icon;

  return (
    <motion.section
      ref={ref}
      id="education"
      className="mt-7 scroll-mt-18 bg-background py-7 text-[#151719] dark:text-white"
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
          {educationSection.title}
        </h2>
      </div>

      <p className="mt-3 max-w-[31rem] text-[0.82rem] font-medium leading-6 text-[#747780] dark:text-zinc-400">
        {educationSection.summary}
      </p>

      <div className="mt-6 rounded-[1.25rem] border border-[#e8e8e8] bg-white p-5 dark:border-zinc-800 dark:bg-background sm:p-6">
        <div className="flex gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#ededed] bg-[#fafafa] text-sm font-semibold text-[#151719] dark:border-zinc-800 dark:bg-background dark:text-white">
            SRM
          </span>
          <div>
            <h3 className="text-[1rem] font-semibold leading-tight text-[#151719] dark:text-white">
              {educationData.degree}
            </h3>
            <p className="mt-2 text-[0.9rem] font-medium text-[#747780] dark:text-zinc-400">
              {educationData.institute}
            </p>
            <p className="mt-1 text-[0.82rem] font-medium text-[#9a9da5]">
              {educationData.duration} · {educationData.meta} · CGPA:{" "}
              {educationData.CGPA}
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
