"use client";

import { motion } from "framer-motion";
import { skillsData } from "@/app/data/skills";

export default function Skills() {
  return (
    <section className="mt-5 relative border border-zinc-800 rounded-md p-4 overflow-hidden">
      <motion.h1
        className="mb-3 text-lg font-semibold text-white"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        Skills
      </motion.h1>

      <div className="space-y-6">
        {skillsData.map((category, categoryIndex) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
              delay: categoryIndex * 0.05,
            }}
            viewport={{ once: true }}
          >
            <h2 className="mb-3 text-sm font-medium text-zinc-400">
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
                      duration: 0.18,
                      ease: "easeOut",
                      delay: skillIndex * 0.015,
                    }}
                    viewport={{ once: true }}
                    className={`
        group flex items-center gap-2 px-2 py-1 rounded text-xs border transition-all duration-200
        ${
          isSoftSkill
            ? "bg-zinc-700 text-white border-zinc-600"
            : "bg-zinc-800 text-zinc-200 border-transparent"
        }
        hover:scale-[1.03]
        hover:cursor-pointer
      `}
                    style={{
                      color: isSoftSkill ? undefined : skill.color,
                      boxShadow: `0 0 0 rgba(0,0,0,0)`,
                    }}
                    onMouseEnter={(e) => {
                      if (isSoftSkill) {
                        e.currentTarget.style.backgroundColor = "#3a3a3a";
                        e.currentTarget.style.boxShadow = `0 0 6px rgba(255,255,255,0.2)`;
                      } else {
                        e.currentTarget.style.backgroundColor = `${skill.color}20`;
                        e.currentTarget.style.boxShadow = `0 0 12px ${skill.color}40`;
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "";
                      e.currentTarget.style.boxShadow = "";
                    }}
                  >
                    {Icon ? (
                      <Icon className="text-sm transition-colors duration-200" />
                    ) : (
                      <span className="text-xs">💡</span>
                    )}
                    {skill.name}
                  </motion.span>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
