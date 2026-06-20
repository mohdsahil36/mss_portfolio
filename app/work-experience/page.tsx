"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  FiArrowLeft,
  FiBriefcase,
  FiChevronDown,
  FiMapPin,
} from "react-icons/fi";
import { workExperience, workSection } from "@/app/data/workExperience";

export default function WorkExperiencePage() {
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});
  const technologyCount = new Set(
    workExperience.flatMap((item) => item.techStack.map((tech) => tech.name)),
  ).size;

  const toggleProjectSection = (projectName: string, label: string) => {
    const key = `${projectName}-${label}`;

    setExpandedSections((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  return (
    <section
      id="work-overview"
      className="scroll-mt-24 bg-background py-10 text-[#151719] dark:text-white sm:py-12"
    >
      <Link
        href="/#work"
        className="inline-flex items-center gap-2 text-[0.78rem] font-semibold text-[#747780] transition-colors hover:text-[#151719] dark:text-zinc-400 dark:hover:text-white"
      >
        <FiArrowLeft className="h-3.5 w-3.5" />
        Back to portfolio
      </Link>

      <header className="mt-8 border-b border-[#ededed] pb-7 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#ededed] bg-white dark:border-zinc-800 dark:bg-background">
            <FiBriefcase className="h-4 w-4" />
          </span>
          <p className="font-mono text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-[#9a9da5]">
            Experience dossier
          </p>
        </div>

        <h1 className="mt-4 text-[1.8rem] font-semibold leading-tight sm:text-[2.2rem]">
          Work experience
        </h1>

        <p className="mt-3 max-w-[38rem] text-[0.84rem] font-medium leading-7 text-[#747780] dark:text-zinc-400">
          {workSection.summary} This view keeps the roles readable and gives
          each company a clearer breakdown of scope, tools, and ownership.
        </p>
      </header>

      <div className="grid gap-0 border-b border-[#ededed] py-5 dark:border-zinc-800 sm:grid-cols-3">
        {[
          ["3+ years", "Production engineering"],
          [`${workExperience.length} companies`, "Product teams"],
          [`${technologyCount}+ tools`, "Frontend to backend"],
        ].map(([value, label]) => (
          <div
            key={label}
            className="border-b border-[#ededed] py-3 last:border-b-0 dark:border-zinc-800 sm:border-b-0 sm:border-r sm:px-5 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0"
          >
            <p className="text-[1rem] font-semibold leading-none text-[#151719] dark:text-white">
              {value}
            </p>
            <p className="mt-2 font-mono text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-[#9a9da5]">
              {label}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 space-y-8">
        {workExperience.map((item, index) => {
          const isCurrent = item.type === "current";
          const projectBlocks = item.projects ?? [
            {
              name: "Frontend foundations",
              summary:
                "Production frontend work, client-facing delivery habits, and early full-stack exposure that shaped the engineering base.",
              workDone: item.points,
              impactMade: [],
            },
          ];

          return (
            <article
              key={item.company}
              id={item.company.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
              className="group scroll-mt-24 border-b border-[#ededed] pb-8 last:border-b-0 dark:border-zinc-800"
            >
              <div className="flex items-start gap-4">
                <span className="font-mono text-[0.66rem] font-semibold text-[#9a9da5]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
                    <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg border border-[#e7e7e7] bg-white dark:border-zinc-800 dark:bg-background">
                      <Image
                        src={item.profile}
                        alt={item.imageAlt}
                        fill
                        sizes="36px"
                        className="object-cover"
                      />
                    </span>

                    <div className="min-w-0 flex-1">
                      <h2 className="text-[1.04rem] font-semibold leading-tight">
                        {item.role} at {item.company}
                      </h2>

                      <span
                        className={`mt-2 inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5 text-[0.6rem] font-semibold ${
                          isCurrent
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-400"
                            : "border-[#e7e7e7] bg-[#f7f7f7] text-[#747780] dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            isCurrent ? "bg-emerald-500" : "bg-[#9a9da5]"
                          }`}
                        />
                        {item.status}
                      </span>
                    </div>

                    <p className="ml-auto flex shrink-0 flex-col gap-1 text-right text-[0.73rem] font-medium text-[#8a8d95] dark:text-zinc-500">
                      <span>{item.date}</span>
                      <span className="inline-flex items-center justify-end gap-1">
                        <FiMapPin className="h-3 w-3" />
                        {item.location}
                      </span>
                    </p>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.techStack.map((tech) => {
                      const Icon = tech.icon;

                      return (
                        <span
                          key={tech.name}
                          className="group/tech inline-flex cursor-pointer items-center gap-2 rounded-sm border border-[#ededed] bg-transparent px-2.5 py-2 text-[0.72rem] font-semibold text-[#747780] shadow-none transition-[border-color,background-color,color,box-shadow] duration-300 ease-out hover:border-[#d7d7d7] hover:bg-white hover:text-[#151719] hover:shadow-[0_6px_18px_rgba(15,15,15,0.045)] dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:bg-zinc-950 dark:hover:text-white dark:hover:shadow-[0_6px_18px_rgba(0,0,0,0.18)]"
                        >
                          <Icon
                            size={15}
                            className="transition-transform duration-300 ease-out group-hover/tech:scale-105"
                            style={{ color: tech.color }}
                          />
                          {tech.name}
                        </span>
                      );
                    })}
                  </div>

                  <div className="mt-6 space-y-6">
                    {item.projects ? (
                      <div className="rounded-xl border border-[#ededed] bg-transparent p-4 dark:border-zinc-800">
                        <p className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-[#9a9da5]">
                          Employment summary
                        </p>

                        <ol className="mt-3 space-y-2">
                          {item.points.map((point, pointIndex) => (
                            <li
                              key={point}
                              className="flex gap-3 text-[0.78rem] font-medium leading-6 text-[#62666f] dark:text-zinc-400"
                            >
                              <span className="mt-0.5 font-mono text-[0.58rem] font-semibold text-[#9a9da5]">
                                {(pointIndex + 1).toString().padStart(2, "0")}
                              </span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    ) : null}

                    {projectBlocks.map((project, projectIndex) => {
                      const impactKey = `${project.name}-Impact made`;
                        const isImpactExpanded = expandedSections[impactKey];

                        return (
                          <section
                            key={project.name}
                            className="overflow-hidden rounded-xl border border-[#ededed] bg-[#fbfbfb] dark:border-zinc-800 dark:bg-zinc-950/35"
                          >
                            <div className="p-4">
                              <div className="flex flex-wrap items-start justify-between gap-3">
                                <div className="min-w-0">
                                  <div className="flex items-baseline gap-2">
                                    <span className="font-mono text-[0.62rem] font-semibold text-[#9a9da5]">
                                      {(projectIndex + 1)
                                        .toString()
                                        .padStart(2, "0")}
                                    </span>
                                    <h3 className="text-[0.9rem] font-semibold text-[#151719] dark:text-white">
                                      {project.name}
                                    </h3>
                                  </div>

                                  <p className="mt-2 text-[0.78rem] font-medium leading-6 text-[#747780] dark:text-zinc-400">
                                    {project.summary}
                                  </p>
                                </div>
                              </div>

                              <div className="mt-4">
                                <p className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-[#9a9da5]">
                                  Work done
                                </p>
                                <ol className="mt-2 space-y-2">
                                  {project.workDone.map((point, pointIndex) => (
                                    <li
                                      key={point}
                                      className="flex gap-3 text-[0.78rem] font-medium leading-6 text-[#62666f] dark:text-zinc-400"
                                    >
                                      <span className="mt-0.5 font-mono text-[0.58rem] font-semibold text-[#9a9da5]">
                                        {(pointIndex + 1)
                                          .toString()
                                          .padStart(2, "0")}
                                      </span>
                                      <span>{point}</span>
                                    </li>
                                  ))}
                                </ol>

                                {project.impactMade.length > 0 ? (
                                  <>
                                    <div className="mt-4 flex justify-center">
                                      <button
                                        type="button"
                                        aria-expanded={isImpactExpanded}
                                        onClick={() =>
                                          toggleProjectSection(
                                            project.name,
                                            "Impact made",
                                          )
                                        }
                                        className="inline-flex min-h-8 items-center gap-2 rounded-full border border-[#dedede] bg-white px-3 text-[0.72rem] font-semibold text-[#151719] transition-[border-color,background-color,color] duration-200 hover:border-[#c8c8c8] hover:bg-[#f6f6f6] dark:border-zinc-800 dark:bg-background dark:text-white dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
                                      >
                                        <span>
                                          {isImpactExpanded
                                            ? "Hide impact made"
                                            : `Show impact made (${project.impactMade.length})`}
                                        </span>
                                        <FiChevronDown
                                          className={`h-3.5 w-3.5 transition-transform duration-200 ${
                                            isImpactExpanded ? "rotate-180" : ""
                                          }`}
                                        />
                                      </button>
                                    </div>

                                    <AnimatePresence initial={false}>
                                      {isImpactExpanded ? (
                                        <motion.div
                                          initial={{ height: 0, opacity: 0 }}
                                          animate={{ height: "auto", opacity: 1 }}
                                          exit={{ height: 0, opacity: 0 }}
                                          transition={{
                                            duration: 0.26,
                                            ease: "easeOut",
                                          }}
                                          className="overflow-hidden"
                                        >
                                          <div className="mt-4 border-t border-[#ededed] pt-4 dark:border-zinc-800">
                                            <p className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-[#9a9da5]">
                                              Impact made
                                            </p>
                                            <ol className="mt-2 space-y-2">
                                              {project.impactMade.map(
                                                (point, pointIndex) => (
                                                  <motion.li
                                                    key={point}
                                                    initial={{
                                                      opacity: 0,
                                                      y: -4,
                                                    }}
                                                    animate={{
                                                      opacity: 1,
                                                      y: 0,
                                                    }}
                                                    exit={{
                                                      opacity: 0,
                                                      y: -4,
                                                    }}
                                                    transition={{
                                                      duration: 0.18,
                                                      ease: "easeOut",
                                                    }}
                                                    className="flex gap-3 text-[0.78rem] font-medium leading-6 text-[#62666f] dark:text-zinc-400"
                                                  >
                                                    <span className="mt-0.5 font-mono text-[0.58rem] font-semibold text-[#9a9da5]">
                                                      {(pointIndex + 1)
                                                        .toString()
                                                        .padStart(2, "0")}
                                                    </span>
                                                    <span>{point}</span>
                                                  </motion.li>
                                                ),
                                              )}
                                            </ol>
                                          </div>
                                        </motion.div>
                                      ) : null}
                                    </AnimatePresence>
                                  </>
                                ) : null}
                              </div>
                            </div>
                          </section>
                        );
                      })}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
