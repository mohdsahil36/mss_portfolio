"use client";

import { motion } from "framer-motion";
import { skillsData } from "@/app/data/skills";

export default function Skills() {
  return (
    <section
      id="skills"
      className="
        mt-5 relative rounded-md p-4 overflow-hidden
        border border-zinc-200 dark:border-zinc-800
        bg-white dark:bg-neutral-950 scroll-mt-18
      "
    >
      <motion.h1
        className="mb-3 text-lg font-semibold text-zinc-900 dark:text-white text-center"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        Skills
      </motion.h1>

      <div className="space-y-6">
        {skillsData.map((category, categoryIndex) => {
          const fromX = categoryIndex % 2 === 0 ? -30 : 30;

          return (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, x: fromX }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.35,
                ease: "easeOut",
              }}
              viewport={{ once: true, margin: "-80px" }}
            >
              <h2 className="mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                {category.title}
              </h2>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => {
                  const Icon = skill.icon;
                  const isSoftSkill = !Icon;

                  return (
                    <motion.span
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.15,
                        ease: "easeOut",
                        delay: skillIndex * 0.02,
                      }}
                      viewport={{ once: true }}
                      className={`
                        group flex items-center gap-2 px-2 py-1 rounded text-xs
                        border transition-all duration-200 cursor-pointer
                        hover:scale-[1.03]

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
    </section>
  );
}
