"use client";

import { easeOut, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
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
    <span className="inline-flex h-11 items-end font-mono text-[2.25rem] font-semibold leading-none tracking-[-0.055em] text-[#111111] tabular-nums dark:text-white sm:text-[2.75rem]">
      <span className="leading-none">{current}</span>
      <span className="leading-none">{suffix}</span>
    </span>
  );
}

function TrendSurface({
  metric,
  active,
}: {
  metric: ImpactMetric;
  active: boolean;
}) {
  const gaugeValue = metric.visual === "performance" ? 74 : 88;
  const sparkline =
    metric.visual === "engagement"
      ? "M 16 118 C 58 112, 62 72, 104 78 S 162 104, 196 66 S 242 42, 278 50"
      : "M 16 118 C 76 112, 88 84, 130 82 S 204 42, 276 38";
  const nodes = [
    [54, 52],
    [118, 92],
    [174, 58],
    [230, 104],
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-y-0 right-0 w-full bg-[radial-gradient(circle_at_78%_45%,rgba(20,140,92,0.1),transparent_42%)] opacity-85 dark:bg-[radial-gradient(circle_at_78%_45%,rgba(110,231,183,0.085),transparent_44%)]" />
      <div className="absolute inset-y-0 right-0 hidden w-[58%] opacity-[0.26] [background-image:radial-gradient(circle_at_center,rgba(20,140,92,0.24)_1px,transparent_1.35px)] [background-size:10px_10px] [mask-image:linear-gradient(to_left,black,transparent_86%)] dark:opacity-[0.14] sm:block" />

      {metric.visual === "reach" ? (
        <div className="absolute inset-y-6 right-4 hidden w-[42%] sm:block">
          <svg className="h-full w-full" viewBox="0 0 300 170" aria-hidden="true">
            {nodes.map(([x, y], nodeIndex) =>
              nodes.slice(nodeIndex + 1).map(([targetX, targetY]) => (
                <motion.line
                  key={`${x}-${y}-${targetX}-${targetY}`}
                  x1={x}
                  x2={targetX}
                  y1={y}
                  y2={targetY}
                  stroke="rgba(20,140,92,0.18)"
                  strokeWidth="1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: active ? 1 : 0,
                    opacity: active ? 1 : 0,
                  }}
                  transition={{ duration: 0.45, ease: easeOut }}
                />
              )),
            )}
            {nodes.map(([x, y], nodeIndex) => (
              <motion.circle
                key={`${x}-${y}`}
                cx={x}
                cy={y}
                r={nodeIndex === 0 ? 13 : 8}
                fill="rgba(20,140,92,0.16)"
                stroke="rgba(20,140,92,0.5)"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: active ? 1 : 0, opacity: active ? 1 : 0 }}
                transition={{
                  duration: 0.3,
                  ease: easeOut,
                  delay: 0.1 + nodeIndex * 0.06,
                }}
              />
            ))}
          </svg>
        </div>
      ) : null}

      {metric.visual === "speed" ? (
        <div className="absolute bottom-12 right-6 hidden w-[38%] space-y-2.5 sm:block">
          {[82, 68, 54, 36].map((width, lineIndex) => (
            <motion.span
              key={width}
              className="block h-2 rounded-full bg-[#15945f]/28 dark:bg-emerald-300/20"
              initial={{ width: 0, opacity: 0 }}
              animate={{
                width: active ? `${width}%` : 0,
                opacity: active ? 1 : 0,
              }}
              transition={{
                duration: 0.42,
                ease: easeOut,
                delay: 0.08 + lineIndex * 0.05,
              }}
            />
          ))}
        </div>
      ) : null}

      {metric.visual === "latency" ? (
        <div className="absolute bottom-12 right-6 hidden w-[40%] items-center justify-between sm:flex">
          {[0, 1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <motion.span
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#15945f]/20 bg-white/70 font-mono text-[0.62rem] font-semibold text-[#127a50] shadow-sm dark:bg-background/70 dark:text-emerald-300"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: active ? 1 : 0, y: active ? 0 : 8 }}
                transition={{
                  duration: 0.28,
                  ease: easeOut,
                  delay: 0.08 + step * 0.08,
                }}
              >
                {step + 1}
              </motion.span>
              {step < 3 ? (
                <motion.span
                  className="mx-1 h-px w-5 bg-[#15945f]/25 lg:w-7"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: active ? 1 : 0 }}
                  transition={{
                    duration: 0.24,
                    ease: easeOut,
                    delay: 0.16 + step * 0.08,
                  }}
                />
              ) : null}
            </div>
          ))}
        </div>
      ) : null}

      {metric.visual === "quality" ? (
        <div className="absolute bottom-10 right-6 hidden w-[38%] grid-cols-3 gap-2 sm:grid">
          {Array.from({ length: 9 }, (_, itemIndex) => (
            <motion.span
              key={itemIndex}
              className="flex h-7 items-center justify-center rounded-lg border border-[#15945f]/16 bg-white/60 text-[#127a50] dark:bg-background/60 dark:text-emerald-300 lg:h-8"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{
                opacity: active ? 1 : 0,
                scale: active ? 1 : 0.92,
              }}
              transition={{
                duration: 0.22,
                ease: easeOut,
                delay: 0.04 + itemIndex * 0.035,
              }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
            </motion.span>
          ))}
        </div>
      ) : null}

      {metric.visual === "performance" ? (
        <div className="absolute bottom-8 right-10 hidden h-24 w-24 items-center justify-center sm:flex">
          <div className="absolute inset-0 rounded-full border border-[#d9eee5] bg-white/45 dark:border-emerald-300/15 dark:bg-background/35" />
          <svg className="relative h-22 w-22 -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="none"
              stroke="rgba(20,140,92,0.12)"
              strokeWidth="10"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="38"
              fill="none"
              stroke="rgba(20,140,92,0.55)"
              strokeLinecap="round"
              strokeWidth="10"
              strokeDasharray="238.76"
              initial={{ strokeDashoffset: 238.76 }}
              animate={{
                strokeDashoffset: active
                  ? 238.76 - (238.76 * gaugeValue) / 100
                  : 238.76,
              }}
              transition={{ duration: 0.8, ease: easeOut, delay: 0.12 }}
            />
          </svg>
          <span className="absolute font-mono text-[0.78rem] font-semibold text-[#127a50] dark:text-emerald-300">
            {gaugeValue}%
          </span>
        </div>
      ) : null}

      {metric.visual === "engagement" ? (
        <svg
          className="absolute inset-y-6 right-4 hidden h-[calc(100%-3rem)] w-[46%] sm:block"
          viewBox="0 0 300 170"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <motion.path
            d={sparkline}
            fill="none"
            stroke="rgba(20,140,92,0.55)"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: active ? 1 : 0,
              opacity: active ? 1 : 0,
            }}
            transition={{ duration: 0.9, ease: easeOut, delay: 0.08 }}
          />
          {[16, 104, 196, 278].map((x, dotIndex) => (
            <motion.circle
              key={x}
              cx={x}
              cy={[118, 78, 66, 50][dotIndex]}
              r="5"
              fill="rgba(20,140,92,0.65)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: active ? 1 : 0, opacity: active ? 1 : 0 }}
              transition={{
                duration: 0.24,
                ease: easeOut,
                delay: 0.3 + dotIndex * 0.08,
              }}
            />
          ))}
        </svg>
      ) : null}

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#15945f]/20 to-transparent dark:via-emerald-300/14" />
    </div>
  );
}

export function ImpactMetricCard({
  metric,
  index,
  onOpen,
}: {
  metric: ImpactMetric;
  index: number;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.45 });
  const Icon = metric.icon;

  return (
    <motion.article
      ref={ref}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${metric.label}`}
      onClick={onOpen}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen();
        }
      }}
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: 0.36, ease: easeOut, delay: index * 0.045 }}
      className="group relative min-h-[12.75rem] cursor-pointer overflow-hidden rounded-xl border border-[#e4e4e4] bg-white outline-none transition-[background-color,border-color,box-shadow] duration-300 hover:border-[#d4d4d4] hover:shadow-[0_14px_36px_rgba(15,15,15,0.05)] focus-visible:border-[#151719] focus-visible:ring-2 focus-visible:ring-[#151719]/10 dark:border-zinc-800 dark:bg-background dark:hover:border-zinc-700 dark:hover:shadow-[0_16px_42px_rgba(0,0,0,0.2)] dark:focus-visible:border-white dark:focus-visible:ring-white/10"
    >
      <TrendSurface metric={metric} active={isInView} />

      <div className="relative z-10 flex min-h-[12.75rem] max-w-full flex-col p-4 sm:max-w-[55%] lg:max-w-[52%]">
        <div className="flex items-start justify-between gap-3">
          <span className="inline-flex items-center gap-2 rounded-lg border border-[#eeeeee] bg-white/82 px-2.5 py-2 text-[0.7rem] font-semibold text-[#676a72] backdrop-blur transition-[background-color,border-color,color] duration-300 group-hover:border-[#dddddd] group-hover:text-[#151719] dark:border-zinc-800 dark:bg-background/82 dark:text-zinc-400 dark:group-hover:border-zinc-700 dark:group-hover:text-white">
            <Icon className="h-3.5 w-3.5" />
            {metric.period}
          </span>
        </div>

        <div className="mt-12 sm:mt-14">
          <CountUpValue value={metric.value} active={isInView} />
          <h2 className="mt-3 text-[0.96rem] font-semibold leading-5 text-[#151719] dark:text-white">
            {metric.label}
          </h2>
          <p className="mt-2 text-[0.73rem] font-medium leading-5 text-[#747780] dark:text-zinc-400">
            {metric.note}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-[#eeeeee]/80 pt-3 dark:border-zinc-800">
          <span className="font-mono text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-[#a6a8af]">
            {metric.marker}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[0.72rem] font-semibold text-[#127a50] dark:text-emerald-300">
            Open signal
            <FiArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </motion.article>
  );
}
