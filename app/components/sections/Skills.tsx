"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { skillsData } from "@/app/data/skills";

export default function Skills({
  sectionIndex = 2,
}: {
  sectionIndex?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const sectionDirection = -60;
  return (
    <motion.section
      ref={ref}
      id="skills"
      className="
        mt-5 relative rounded-md p-4 overflow-hidden
        bg-white dark:bg-neutral-950 scroll-mt-18
      "
      initial={{ opacity: 0, x: sectionDirection }}
      animate={
        isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: sectionDirection }
      }
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.h1
        className="mb-3 text-lg font-semibold text-zinc-900 dark:text-white text-center"
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
        transition={{ duration: 0.25, ease: "easeOut", delay: 0.2 }}
      >
        Stack
      </motion.h1>

      <div className="space-y-6">
        {skillsData.map((category, categoryIndex) => {
          const fromX = categoryIndex % 2 === 0 ? -30 : 30;

          return (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, x: fromX }}
              animate={
                isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: fromX }
              }
              transition={{
                duration: 0.35,
                ease: "easeOut",
                delay: 0.3 + categoryIndex * 0.1,
              }}
            >
              <h2 className="mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                {category.title}
              </h2>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, index) => {
                  const Icon = skill.icon;
                  const isSoftSkill = !Icon;
                  return (
                    <motion.span
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.25, delay: index * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      className={`
                        group flex items-center gap-2 px-2 py-1 rounded text-xs
                        border cursor-pointer transition-all duration-200
                  
                        ${
                          isSoftSkill
                            ? `
                              bg-zinc-200 text-zinc-900 border-zinc-300
                              dark:bg-zinc-700 dark:text-white dark:border-zinc-600
                              hover:bg-zinc-300 dark:hover:bg-zinc-600
                            `
                            : `
                              bg-zinc-100 text-zinc-900 border-zinc-200
                              dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-700
                              hover:bg-zinc-200 dark:hover:bg-zinc-700
                            `
                        }
                      `}
                    >
                      {Icon ? (
                        <Icon
                          className="text-sm"
                          style={{ color: skill.color }}
                        />
                      ) : (
                        <span className="text-xs">💡</span>
                      )}
                      <span className="leading-none">{skill.name}</span>
                    </motion.span>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
