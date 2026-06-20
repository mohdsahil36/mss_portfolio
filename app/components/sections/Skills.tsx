"use client";

import { easeOut, motion, useInView } from "framer-motion";
import { useRef } from "react";
import { skillsData, skillsSection } from "@/app/data/skills";

export default function Skills({
  sectionIndex = 2,
}: {
  sectionIndex?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.12 });
  const sectionDirection = sectionIndex % 2 === 0 ? -40 : 40;
  const SectionIcon = skillsSection.icon;

  return (
    <motion.section
      ref={ref}
      id="skills"
      className="mt-4 scroll-mt-18 bg-background py-8 text-[#151719] dark:text-white"
      initial={{ opacity: 0, x: sectionDirection }}
      animate={
        isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: sectionDirection }
      }
      transition={{ duration: 0.45, ease: easeOut }}
    >
      <div className="mb-7 border-b border-[#ededed] pb-5 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#ededed] bg-white dark:border-zinc-800 dark:bg-background">
            <SectionIcon className="h-4 w-4" />
          </span>
          <h2 className="text-[1.55rem] font-semibold leading-tight sm:text-[1.75rem]">
            {skillsSection.title}
          </h2>
        </div>
        <p className="mt-3 max-w-[32rem] text-[0.82rem] font-medium leading-6 text-[#747780] dark:text-zinc-400">
          {skillsSection.summary}
        </p>
      </div>

      <div className="space-y-5">
        {skillsData.map((category, categoryIndex) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{
              duration: 0.32,
              ease: easeOut,
              delay: categoryIndex * 0.06,
            }}
            className="grid gap-3 border-t border-[#f0f0f0] pt-5 first:border-t-0 first:pt-0 sm:grid-cols-[9rem_1fr] dark:border-zinc-900"
          >
            <h3 className="pt-1 font-mono text-[0.7rem] font-semibold uppercase text-[#8a8d95]">
              {category.title}
            </h3>

            <div className="flex flex-wrap gap-1.5">
              {category.skills.map((skill) => {
                const Icon = skill.icon;

                return (
                  <span
                    key={skill.name}
                    className="group inline-flex min-h-7 cursor-pointer items-center gap-1.5 rounded-md border border-dashed border-[#dedede] bg-white px-2.5 py-1.5 text-[0.74rem] font-semibold text-[#7a7d84] transition-[border-color,background-color,color,box-shadow] duration-300 ease-out hover:border-[#bfc1c5] hover:bg-[#fbfbfb] hover:text-[#151719] hover:shadow-[inset_0_0_0_1px_rgba(21,23,25,0.04),0_6px_18px_rgba(15,15,15,0.045)] dark:border-zinc-800 dark:bg-background dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:bg-zinc-950 dark:hover:text-white"
                  >
                    {Icon ? (
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-sm bg-transparent transition-colors duration-300 ease-out group-hover:bg-[#f1f1f1] dark:group-hover:bg-zinc-900">
                        <Icon
                          className="h-3.5 w-3.5 transition-opacity duration-300 ease-out group-hover:opacity-95"
                          style={{ color: skill.color }}
                        />
                      </span>
                    ) : null}
                    <span>{skill.name}</span>
                  </span>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
