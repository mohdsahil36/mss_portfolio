import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiBriefcase } from "react-icons/fi";
import { workExperience, workSection } from "@/app/data/workExperience";

export default function WorkExperiencePage() {
  return (
    <section className="bg-background py-10 text-[#151719] dark:text-white sm:py-12">
      <div className="border-b border-[#ededed] pb-6 dark:border-zinc-800">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-[0.78rem] font-semibold text-[#747780] transition-colors hover:text-[#151719] dark:text-zinc-400 dark:hover:text-white"
        >
          <FiArrowLeft className="h-3.5 w-3.5" />
          Back to home
        </Link>

        <div className="mt-8 flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#ededed] bg-white dark:border-zinc-800 dark:bg-background">
            <FiBriefcase className="h-4 w-4" />
          </span>
          <h1 className="text-[1.65rem] font-semibold leading-tight sm:text-[2rem]">
            Work experience
          </h1>
        </div>

        <p className="mt-3 max-w-136 text-[0.84rem] font-medium leading-7 text-[#747780] dark:text-zinc-400">
          {workSection.summary} For now, this page uses the same experience data
          from the main portfolio and gives it more room to breathe.
        </p>
      </div>

      <div className="mt-7 space-y-7">
        {workExperience.map((item, index) => {
          const isCurrent = item.type === "current";

          return (
            <article
              key={item.company}
              className="relative border-b border-[#eeeeee] pb-7 last:border-b-0 dark:border-zinc-800"
            >
              <div className="grid gap-5 md:grid-cols-[8rem_1fr]">
                <div>
                  <p className="font-mono text-[0.68rem] font-semibold text-[#9a9da5]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p
                    className={`mt-3 inline-flex items-center gap-1.5 rounded-sm border px-2 py-1 text-[0.64rem] font-semibold ${
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
                  </p>
                </div>

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
                          {item.location}
                        </p>
                      </div>
                    </div>

                    <p className="font-mono text-[0.72rem] font-semibold text-[#151719] dark:text-white">
                      {item.date}
                    </p>
                  </div>

                  <ul className="mt-5 space-y-2 text-[0.8rem] font-medium leading-7 text-[#62666f] dark:text-zinc-400">
                    {item.points.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span className="mt-[0.8rem] h-1 w-1 shrink-0 rounded-full bg-[#9a9da5] dark:bg-zinc-600" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.techStack.map((tech) => {
                      const Icon = tech.icon;

                      return (
                        <span
                          key={tech.name}
                          className="inline-flex items-center gap-1.5 border border-[#ededed] bg-white px-2.5 py-1.5 text-[0.7rem] font-semibold text-[#747780] dark:border-zinc-800 dark:bg-background dark:text-zinc-400"
                        >
                          <Icon size={14} style={{ color: tech.color }} />
                          {tech.name}
                        </span>
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
