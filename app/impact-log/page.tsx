import Link from "next/link";
import {
  FiArrowLeft,
  FiArrowUpRight,
  FiBarChart2,
  FiCheckCircle,
} from "react-icons/fi";
import { ImpactMetricGrid } from "@/app/components/impact-metric-grid";
import { impactMetrics, impactSection } from "@/app/data/impact";

export default function ImpactLogPage() {
  const SectionIcon = impactSection.icon;

  return (
    <section
      id="impact-overview"
      className="bg-background py-10 text-[#151719] dark:text-white sm:py-12"
    >
      <div className="border-b border-[#ededed] pb-6 dark:border-zinc-800">
        <Link
          href="/#impact"
          className="inline-flex items-center gap-2 text-[0.78rem] font-semibold text-[#747780] transition-colors hover:text-[#151719] dark:text-zinc-400 dark:hover:text-white"
        >
          <FiArrowLeft className="h-3.5 w-3.5" />
          Back to player profile
        </Link>

        <div className="mt-8 flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#ededed] bg-white dark:border-zinc-800 dark:bg-background">
            <SectionIcon className="h-4 w-4" />
          </span>
          <h1 className="text-[1.65rem] font-semibold leading-tight sm:text-[2rem]">
            Full Impact Log
          </h1>
        </div>

        <p className="mt-3 max-w-136 text-[0.84rem] font-medium leading-7 text-[#747780] dark:text-zinc-400">
          A deeper look at the production outcomes behind the portfolio:
          performance gains, reliability improvements, scale, and user-facing
          polish that made the product experience stronger.
        </p>
      </div>

      <div className="mt-7 grid grid-cols-3 divide-x divide-[#ededed] border-y border-[#ededed] py-4 dark:divide-zinc-800 dark:border-zinc-800">
        {[
          [impactMetrics.length.toString(), "Impact signals"],
          ["16M+", "Users reached"],
          ["93%", "Best optimization"],
        ].map(([value, label]) => (
          <div key={label} className="px-3 first:pl-0 last:pr-0">
            <p className="text-[1rem] font-semibold leading-none">{value}</p>
            <p className="mt-2 font-mono text-[0.56rem] font-semibold uppercase tracking-[0.14em] text-[#9a9da5]">
              {label}
            </p>
          </div>
        ))}
      </div>

      <div
        id="impact-signals"
        className="mt-8 scroll-mt-24"
      >
        <p className="mb-5 text-[0.82rem] font-medium leading-6 text-[#747780] dark:text-zinc-400">
          The first-pass proof: performance wins, scale, reliability, and
          product engagement.
        </p>

        <ImpactMetricGrid />
      </div>

      <div id="impact-proof" className="mt-8 grid scroll-mt-24 gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-[#ededed] bg-white p-4 dark:border-zinc-800 dark:bg-background">
          <div className="flex items-center gap-2">
            <FiCheckCircle className="h-4 w-4 text-[#9a9da5]" />
            <h2 className="text-[0.9rem] font-semibold">What this proves</h2>
          </div>
          <p className="mt-3 text-[0.8rem] font-medium leading-7 text-[#747780] dark:text-zinc-400">
            The work was not limited to UI output. It included performance,
            reliability, API wait-time improvements, product polish, and
            production-facing ownership.
          </p>
        </div>

        <div className="rounded-xl border border-[#ededed] bg-white p-4 dark:border-zinc-800 dark:bg-background">
          <div className="flex items-center gap-2">
            <FiBarChart2 className="h-4 w-4 text-[#9a9da5]" />
            <h2 className="text-[0.9rem] font-semibold">Where it connects</h2>
          </div>
          <p className="mt-3 text-[0.8rem] font-medium leading-7 text-[#747780] dark:text-zinc-400">
            These numbers connect back to the full quest log: frontend
            optimization, backend API improvements, reusable systems, and
            cleaner product workflows.
          </p>
        </div>
      </div>

      <div className="mt-7 flex justify-center">
        <Link
          href="/work-experience"
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-[#ededed] bg-white px-4 text-[0.78rem] font-semibold text-[#151719] transition-[background-color,border-color,box-shadow] duration-200 hover:border-[#d8d8d8] hover:bg-[#f7f7f7] hover:shadow-[0_10px_28px_rgba(15,15,15,0.04)] dark:border-zinc-800 dark:bg-background dark:text-white dark:hover:bg-zinc-900"
        >
          Open full quest log
          <FiArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  );
}
