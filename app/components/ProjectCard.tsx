"use client";

import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Project } from "@/app/data/projects";
import { Button } from "@/components/ui/button";

const cardVariants: Variants = {
  hiddenLeft: {
    opacity: 0,
    x: -40,
  },
  hiddenRight: {
    opacity: 0,
    x: 40,
  },
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
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-black dark:text-white">
            {project.title}
          </h3>

          {/* Status Indicator */}
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
                Live
                <MdArrowOutward />
              </Button>
            </Link>
          )}

          <Link href={project.github} target="_blank">
            <Button
              variant="outline"
              size="sm"
              className="gap-1 cursor-pointer"
            >
              Github
              <MdArrowOutward />
            </Button>
          </Link>
        </div>
      </div>

      <ul className="mt-4 space-y-2 text-sm text-zinc-600 dark:text-zinc-400 list-disc list-inside">
        {project.description
          .split("•")
          .map((point, idx) =>
            point.trim() ? <li key={idx}>{point.trim()}</li> : null
          )}
      </ul>

      {project.status !== "Live" && (
        <div className="mt-4">
          <div className="mb-1 flex justify-between text-xs text-zinc-600">
            <span>Progress</span>
            <span>{project.progress ?? 60}%</span>
          </div>

          <div className="relative h-[2px] w-full bg-zinc-800/60 overflow-hidden rounded-full">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${project.progress ?? 60}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-y-0 left-0 bg-zinc-200 dark:bg-zinc-100"
            />
          </div>
        </div>
      )}

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
