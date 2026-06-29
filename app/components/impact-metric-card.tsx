"use client";

import { easeOut, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ImpactMetric } from "@/app/data/impact";

function splitMetricValue(value: string) {
  const [, rawNumber = value, suffix = ""] = value.match(/^(\d+)(.*)$/) ?? [];

  return {
    target: Number(rawNumber),
    suffix,
  };
}

function CountUpValue({ value, active }: { value: string; active: boolean }) {
  const prefersReducedMotion = useReducedMotion();
  const { target, suffix } = useMemo(() => splitMetricValue(value), [value]);
  const [current, setCurrent] = useState(prefersReducedMotion ? target : 0);

  useEffect(() => {
    if (!active || prefersReducedMotion) {
      setCurrent(target);
      return;
    }

    let frame = 0;
    const duration = 760;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setCurrent(Math.round(target * eased));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [active, prefersReducedMotion, target]);

  return (
    <span className="inline-flex h-9 items-end font-mono text-[1.55rem] font-semibold leading-none tracking-[-0.03em] text-[#111111] tabular-nums dark:text-white sm:text-[1.68rem]">
      <span className="leading-none">{current}</span>
      <span className="leading-none">{suffix}</span>
    </span>
  );
}

export function ImpactMetricCard({
  metric,
  index,
}: {
  metric: ImpactMetric;
  index: number;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.45 });
  const Icon = metric.icon;
  const { target } = splitMetricValue(metric.value);
  const meterValue = Math.min(target, 100);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: 0.36, ease: easeOut, delay: index * 0.045 }}
      className="group relative flex min-h-[13.5rem] flex-col overflow-hidden rounded-xl border border-[#e4e4e4] bg-white p-3.5 transition-[background-color,border-color,box-shadow] duration-300 hover:border-[#d4d4d4] hover:bg-[#fbfbfb] hover:shadow-[0_12px_30px_rgba(15,15,15,0.035)] dark:border-zinc-800 dark:bg-background dark:hover:border-zinc-700 dark:hover:bg-zinc-950/35 dark:hover:shadow-[0_14px_32px_rgba(0,0,0,0.16)]"
    >
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[#151719]/0 transition-colors duration-300 group-hover:bg-[#151719]/18 dark:group-hover:bg-white/18" />

      <div className="flex h-8 items-start justify-between gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#eeeeee] bg-[#fafafa] text-[#787b83] transition-[background-color,border-color,color] duration-300 group-hover:border-[#dddddd] group-hover:bg-white group-hover:text-[#151719] dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-500 dark:group-hover:border-zinc-700 dark:group-hover:bg-zinc-900 dark:group-hover:text-white">
          <Icon className="h-4 w-4" />
        </div>
        <span className="font-mono text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-[#a6a8af]">
          signal {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="mt-4 h-9">
        <CountUpValue value={metric.value} active={isInView} />
      </div>

      <div className="mt-3 min-h-[5.25rem]">
        <h2 className="mt-2 text-[0.86rem] font-semibold leading-5 text-[#151719] dark:text-white">
          {metric.label}
        </h2>
        <p className="mt-1.5 text-[0.72rem] font-medium leading-5 text-[#858585] dark:text-zinc-400">
          {metric.note}
        </p>
      </div>

      <div className="mt-auto h-1 overflow-hidden rounded-full bg-[#eeeeee] dark:bg-zinc-800">
        <motion.span
          initial={{ width: 0 }}
          animate={{ width: isInView ? `${meterValue}%` : 0 }}
          transition={{ duration: 0.7, ease: easeOut, delay: index * 0.04 }}
          className="block h-full rounded-full bg-[#151719]/45 dark:bg-white/45"
        />
      </div>
    </motion.article>
  );
}
