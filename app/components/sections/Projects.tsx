"use client";

import { easeOut, motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { FiGithub, FiTool } from "react-icons/fi";
import { MdArrowOutward } from "react-icons/md";
import { projectSection, projects } from "@/app/data/projects";

export default function Projects({
  sectionIndex = 1,
}: {
  sectionIndex?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.18 });
  const sectionDirection = sectionIndex % 2 === 0 ? -40 : 40;

  const renderProjectCard = (project: (typeof projects)[number], index: number) => {
    const isLive = project.status === "Live";
    const visibleStack = project.stack.slice(0, 5);
    const hiddenStackCount = project.stack.length - visibleStack.length;

    return (
      <div className="grid gap-5 md:grid-cols-[1.05fr_0.95fr] md:items-start">
        <div className="min-w-0">
          <div className="mb-4 flex items-center justify-between border-b border-[#ededed] pb-3 dark:border-zinc-800">
            <span className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-[#9a9da5]">
              Build {String(index + 1).padStart(2, "0")}
            </span>
            <span className="font-mono text-[0.6rem] font-semibold text-[#b0b2b8]">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(projects.length).padStart(2, "0")}
            </span>
          </div>

          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2.5">
                <h3 className="text-[1.05rem] font-semibold leading-tight text-[#151719] dark:text-white">
                  {project.title}
                </h3>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-sm px-2 py-1 text-[0.68rem] font-semibold ${
                    isLive
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                      : "bg-[#ededed] text-[#4f5359] dark:bg-zinc-900 dark:text-zinc-300"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      isLive ? "bg-emerald-500" : "bg-[#5f6368]"
                    }`}
                  />
                  {isLive ? "Live" : "In progress"}
                </span>
              </div>
              <p className="mt-3 text-[0.86rem] font-medium leading-7 text-[#747780] dark:text-zinc-400">
                {project.description}
              </p>
              <p className="mt-3 font-mono text-[0.66rem] font-semibold uppercase text-[#8a8d95]">
                {project.type}
              </p>
            </div>

            <Link
              href={project.github}
              target="_blank"
              aria-label={`${project.title} GitHub repository`}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-[#ededed] text-[#777b84] transition-colors hover:bg-[#f7f7f7] hover:text-[#151719] dark:border-zinc-800 dark:hover:bg-zinc-900 dark:hover:text-white"
            >
              <FiGithub className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {visibleStack.map((tech) => (
              <span
                key={tech}
                className="border border-[#e7e7e7] bg-white px-2.5 py-1.5 text-[0.72rem] font-medium text-[#747780] dark:border-zinc-800 dark:bg-background dark:text-zinc-400"
              >
                {tech}
              </span>
            ))}
            {hiddenStackCount > 0 ? (
              <span className="border border-[#e7e7e7] bg-white px-2.5 py-1.5 text-[0.72rem] font-medium text-[#747780] dark:border-zinc-800 dark:bg-background dark:text-zinc-400">
                +{hiddenStackCount}
              </span>
            ) : null}
          </div>
        </div>

        <div className="border-t border-[#ededed] pt-5 md:border-l md:border-t-0 md:pl-5 md:pt-0 dark:border-zinc-800">
          <p className="font-mono text-[0.68rem] font-semibold uppercase text-[#151719] dark:text-white">
            Technical notes
          </p>
          <ul className="mt-3 space-y-2 text-[0.78rem] font-medium leading-6 text-[#747780] dark:text-zinc-400">
            {project.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-2.5">
                <span className="mt-[0.65rem] h-1 w-1 shrink-0 bg-[#9a9da5]" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.live ? (
              <Link
                href={project.live}
                target="_blank"
                className="inline-flex items-center gap-1.5 text-[0.75rem] font-semibold text-[#151719] underline-offset-4 hover:underline dark:text-white"
              >
                Open live <MdArrowOutward className="h-3.5 w-3.5" />
              </Link>
            ) : null}
            <Link
              href="https://github.com/mohdsahil36?tab=repositories"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-[0.75rem] font-semibold text-[#777b84] underline-offset-4 hover:text-[#151719] hover:underline dark:text-zinc-400 dark:hover:text-white"
            >
              More builds <MdArrowOutward className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, x: sectionDirection }}
      animate={
        isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: sectionDirection }
      }
      transition={{ duration: 0.45, ease: easeOut }}
      className="mt-6 scroll-mt-18 py-8 text-[#151719] dark:text-white"
      id="projects"
    >
      <div className="mb-7">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#ededed] bg-white dark:border-zinc-800 dark:bg-background">
            <FiTool className="h-4 w-4" />
          </span>
          <h2 className="text-[1.55rem] font-semibold leading-none sm:text-[1.75rem]">
            {projectSection.title}
          </h2>
        </div>
        <p className="mt-3 max-w-[32rem] text-[0.82rem] font-medium leading-6 text-[#747780] dark:text-zinc-400">
          {projectSection.summary}
        </p>
      </div>

      <div className="space-y-5">
        {projects.map((project, index) => {
          return (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.34, ease: easeOut, delay: index * 0.08 }}
              className="border border-[#e8e8e8] bg-white p-5 transition-colors hover:border-[#d8d8d8] dark:border-zinc-800 dark:bg-background"
            >
              {renderProjectCard(project, index)}
            </motion.article>
          );
        })}
      </div>
    </motion.section>
  );
}
