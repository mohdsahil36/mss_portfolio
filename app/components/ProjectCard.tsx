"use client";

import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Project } from "@/app/data/projects";
import { Button } from "@/components/ui/button";

const cardVariants: Variants = {
  hiddenLeft: { opacity: 0, x: -40 },
  hiddenRight: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      variants={cardVariants}
      initial={isEven ? "hiddenLeft" : "hiddenRight"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="
        rounded-lg border border-zinc-200 dark:border-zinc-800
        bg-card dark:bg-neutral-950
        p-5
        shadow-sm
        transition-shadow
        hover:shadow-md
      "
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-black dark:text-white">
            {project.title}
          </h3>

          {/* Status */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span
                className={`
                  absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping
                  ${
                    project.status === "Live"
                      ? "bg-emerald-400"
                      : "bg-amber-400"
                  }
                `}
              />
              <span
                className={`
                  relative inline-flex h-2.5 w-2.5 rounded-full
                  ${
                    project.status === "Live"
                      ? "bg-emerald-500"
                      : "bg-amber-500"
                  }
                `}
              />
            </span>

            <span
              className={`
                text-xs font-medium
                ${
                  project.status === "Live"
                    ? "text-emerald-400"
                    : "text-amber-400"
                }
              `}
            >
              {project.status}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 shrink-0">
          {project.live && project.status === "Live" && (
            <Link href={project.live} target="_blank">
              <Button
                variant="outline"
                size="sm"
                className="gap-1 cursor-pointer"
              >
                Live <MdArrowOutward />
              </Button>
            </Link>
          )}

          <Link href={project.github} target="_blank">
            <Button
              variant="outline"
              size="sm"
              className="gap-1 cursor-pointer"
            >
              GitHub <MdArrowOutward />
            </Button>
          </Link>
        </div>
      </div>

      {/* Description */}
      <ul className="mt-4 space-y-2 text-sm text-zinc-600 dark:text-zinc-400 list-disc list-inside">
        {project.description
          .split("•")
          .map(
            (point, idx) => point.trim() && <li key={idx}>{point.trim()}</li>
          )}
      </ul>

      {/* Build Progress */}
      {project.status === "Building Now" && (
        <div className="mt-4">
          <div className="mb-1 flex justify-between text-[11px] tracking-wide uppercase text-zinc-500 dark:text-zinc-400">
            <span>Build progress</span>
          </div>

          <div
            className="
              relative h-[6px] w-full overflow-hidden rounded-full
              bg-zinc-200/50 dark:bg-zinc-900/60
              ring-1 ring-zinc-300/20 dark:ring-white/10
            "
          >
            {/* Grid overlay */}
            <div
              aria-hidden
              className="
                absolute inset-0 pointer-events-none
                bg-[linear-gradient(90deg,rgba(0,0,0,0.06)_1px,transparent_1px)]
                bg-size-[6px_100%]
                dark:bg-[linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)]
              "
            />

            {/* Progress fill */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${project.progress ?? 60}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="
                relative h-full rounded-full
                bg-linear-to-r
                from-zinc-900 via-zinc-700 to-zinc-500
                dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-300
                shadow-[0_0_8px_rgba(0,0,0,0.25)]
                dark:shadow-[0_0_8px_rgba(255,255,255,0.15)]
              "
            >
              <span
                aria-hidden
                className="
                  absolute inset-0
                  bg-linear-to-r
                  from-transparent via-white/35 to-transparent
                  animate-[pipeline-sweep_1.6s_ease-out_0.4s_1]
                "
              />
            </motion.div>
          </div>
        </div>
      )}

      {/* Tech Stack */}
      {project.stack && (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="
          rounded-sm
          bg-zinc-700 dark:bg-zinc-800
          px-3 py-2
          text-xs text-white
          cursor-pointer
          transition duration-300 ease-in-out
          hover:bg-zinc-600 dark:hover:bg-zinc-700
          hover:brightness-110
          hover:shadow-md
        "
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}
