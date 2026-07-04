import Image from "next/image";
import Link from "next/link";
import {
  FiArrowLeft,
  FiBriefcase,
  FiChevronDown,
  FiLayers,
  FiTarget,
} from "react-icons/fi";
import { PageSiblingNav } from "@/app/components/page-sibling-nav";
import { standalonePageNavigation } from "@/app/data/pageNavigation";
import { workExperience, workSection } from "@/app/data/workExperience";

export default function WorkExperiencePage() {
  const pageNavigation = standalonePageNavigation["/work-experience"];

  return (
    <section
      id="work-overview"
      className="bg-background py-10 text-[#151719] dark:text-white sm:py-12"
    >
      <div className="border-b border-[#ededed] pb-6 dark:border-zinc-800">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-[0.78rem] font-semibold text-[#747780] transition-colors hover:text-[#151719] dark:text-zinc-400 dark:hover:text-white"
        >
          <FiArrowLeft className="h-3.5 w-3.5" />
          Back to player profile
        </Link>

        <div className="mt-8 flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#ededed] bg-white dark:border-zinc-800 dark:bg-background">
            <FiBriefcase className="h-4 w-4" />
          </span>
          <h1 className="text-[1.65rem] font-semibold leading-tight sm:text-[2rem]">
            Full Quest Log
          </h1>
        </div>

        <p className="mt-3 max-w-136 text-[0.84rem] font-medium leading-7 text-[#747780] dark:text-zinc-400">
          {workSection.summary} This page expands the mission context,
          project-level execution, loadout, and impact unlocked across each role.
        </p>
      </div>

      <div className="mt-7 grid grid-cols-3 divide-x divide-[#ededed] border-y border-[#ededed] py-4 dark:divide-zinc-800 dark:border-zinc-800">
        {[
          ["3+ years", "Campaign XP"],
          ["2", "Guilds"],
          ["9+", "Loadout"],
        ].map(([value, label]) => (
          <div key={label} className="px-3 first:pl-0 last:pr-0">
            <p className="text-[1rem] font-semibold leading-none">{value}</p>
            <p className="mt-2 font-mono text-[0.56rem] font-semibold uppercase tracking-[0.14em] text-[#9a9da5]">
              {label}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 space-y-10">
        {workExperience.map((item, index) => {
          const isCurrent = item.type === "current";
          const hasProjects = Boolean(item.projects?.length);

          return (
            <article
              key={item.company}
              id={item.company.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
              className="border-b border-[#eeeeee] pb-10 last:border-b-0 dark:border-zinc-800"
            >
              <div className="grid gap-5 md:grid-cols-[6.5rem_1fr]">
                <aside className="flex items-start gap-3 md:block">
                  <p className="font-mono text-[0.68rem] font-semibold text-[#9a9da5]">
                    Mission {String(index + 1).padStart(2, "0")}
                  </p>
                  <p
                    className={`mt-0 inline-flex items-center gap-1.5 rounded-sm border px-2 py-1 text-[0.64rem] font-semibold md:mt-3 ${
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
                    {isCurrent ? "Active campaign" : "Cleared"}
                  </p>
                </aside>

                <div className="min-w-0">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex min-w-0 gap-3">
                      <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-[#e7e7e7] bg-white dark:border-zinc-800 dark:bg-background">
                        <Image
                          src={item.profile}
                          alt={item.imageAlt}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </span>
                      <div className="min-w-0">
                        <h2 className="text-[1.08rem] font-semibold leading-tight">
                          {item.role} @ {item.company}
                        </h2>
                        <p className="mt-1 text-[0.8rem] font-medium text-[#747780] dark:text-zinc-400">
                          {item.location} · {item.status}
                        </p>
                      </div>
                    </div>

                    <p className="font-mono text-[0.72rem] font-semibold text-[#151719] dark:text-white">
                      {item.date}
                    </p>
                  </div>

                  {item.summary ? (
                    <div className="mt-5 border-l border-[#e7e7e7] pl-4 dark:border-zinc-800">
                      <p className="mb-2 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-[#9a9da5]">
                        Mission briefing
                      </p>
                      <p className="text-[0.82rem] font-medium leading-7 text-[#62666f] dark:text-zinc-400">
                        {item.summary}
                      </p>
                      {item.summaryTags?.length ? (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {item.summaryTags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-sm border border-[#ededed] bg-white px-2.5 py-1.5 font-mono text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-[#8a8d95] dark:border-zinc-800 dark:bg-background"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ) : null}

                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.techStack.map((tech) => {
                      const Icon = tech.icon;

                      return (
                        <span
                          key={tech.name}
                          className="inline-flex items-center gap-1.5 rounded-md border border-[#ededed] bg-white px-3 py-2 text-[0.74rem] font-semibold text-[#747780] transition-[border-color,background-color,color] duration-200 hover:border-[#d4d4d4] hover:bg-[#fbfbfb] hover:text-[#151719] dark:border-zinc-800 dark:bg-background dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:bg-zinc-950 dark:hover:text-white"
                        >
                          <Icon size={15} style={{ color: tech.color }} />
                          {tech.name}
                        </span>
                      );
                    })}
                  </div>

                  <div className="mt-7">
                    <div className="mb-3 flex items-center gap-2">
                      <FiLayers className="h-4 w-4 text-[#9a9da5]" />
                      <h3 className="text-[0.9rem] font-semibold">
                        Campaign summary
                      </h3>
                    </div>
                    <ul className="space-y-2 text-[0.8rem] font-medium leading-7 text-[#62666f] dark:text-zinc-400">
                      {item.points.map((point) => (
                        <li key={point} className="flex gap-3">
                          <span className="mt-[0.8rem] h-1 w-1 shrink-0 rounded-full bg-[#9a9da5] dark:bg-zinc-600" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {hasProjects ? (
                    <div className="mt-8 space-y-5">
                      <div className="flex items-center gap-2">
                        <FiTarget className="h-4 w-4 text-[#9a9da5]" />
                        <h3 className="text-[0.9rem] font-semibold">
                          Mission arcs
                        </h3>
                      </div>

                      {item.projects?.map((project, projectIndex) => (
                        <section
                          key={project.name}
                          className="relative rounded-xl border border-[#ededed] bg-white p-5 dark:border-zinc-800 dark:bg-background sm:p-6"
                        >
                          <span className="pointer-events-none absolute right-4 top-4 h-2 w-2 border-r border-t border-[#d5d5d5] dark:border-zinc-700" />
                          <span className="pointer-events-none absolute bottom-4 left-4 h-2 w-2 border-b border-l border-[#d5d5d5] dark:border-zinc-700" />
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                              <p className="font-mono text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-[#9a9da5]">
                                Arc {String(projectIndex + 1).padStart(2, "0")}
                              </p>
                              <h4 className="mt-2 text-[0.98rem] font-semibold">
                                {project.name}
                              </h4>
                            </div>
                          </div>

                          <p className="mt-3 text-[0.8rem] font-medium leading-6 text-[#747780] dark:text-zinc-400">
                            {project.summary}
                          </p>

                          <div className="mt-5">
                            <p className="font-mono text-[0.64rem] font-semibold uppercase tracking-[0.14em] text-[#151719] dark:text-white">
                              Objectives cleared
                            </p>
                            <ul className="mt-3 space-y-2 text-[0.78rem] font-medium leading-7 text-[#62666f] dark:text-zinc-400">
                              {project.workDone.map((point) => (
                                <li key={point} className="flex gap-3">
                                  <span className="mt-[0.8rem] h-1 w-1 shrink-0 rounded-full bg-[#9a9da5] dark:bg-zinc-600" />
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <details className="group mt-5 rounded-lg border border-dashed border-[#e2e2e2] bg-[#fbfbfb] dark:border-zinc-800 dark:bg-zinc-950/30">
                            <summary className="flex cursor-pointer list-none items-center justify-center gap-2 px-5 py-3.5 text-[0.76rem] font-semibold text-[#151719] marker:hidden dark:text-white">
                              Reveal impact unlocked
                              <FiChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-open:rotate-180" />
                            </summary>
                            <div className="border-t border-[#ededed] px-5 pb-5 pt-4 dark:border-zinc-800">
                              <ul className="space-y-2 text-[0.78rem] font-medium leading-7 text-[#62666f] dark:text-zinc-400">
                                {project.impactMade.map((point) => (
                                  <li key={point} className="flex gap-3">
                                    <span className="mt-[0.8rem] h-1 w-1 shrink-0 rounded-full bg-[#151719] dark:bg-white" />
                                    <span>{point}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </details>
                        </section>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <PageSiblingNav navigation={pageNavigation} />
    </section>
  );
}
