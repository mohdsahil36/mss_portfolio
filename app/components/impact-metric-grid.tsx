"use client";

import { AnimatePresence, easeOut, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { FiX } from "react-icons/fi";
import { impactMetrics } from "@/app/data/impact";
import type { ImpactMetricVisual } from "@/app/data/impact";
import { ImpactMetricCard } from "./impact-metric-card";

const detailTone: Record<
  ImpactMetricVisual,
  { title: string; summary: string }
> = {
  reach: {
    title: "Scale surface",
    summary:
      "This number is about building interfaces that stay usable when traffic and product complexity are not small anymore.",
  },
  speed: {
    title: "Frontend speed pass",
    summary:
      "This came from tightening render paths, loading behavior, and the small interaction details that make screens feel immediate.",
  },
  latency: {
    title: "API wait-time cleanup",
    summary:
      "This was backend-facing optimization work where slow workflows were reduced without making the product behavior unpredictable.",
  },
  quality: {
    title: "Issue reduction loop",
    summary:
      "This is the quieter side of product work: fixing repeated rough edges until support noise and user friction both drop.",
  },
  performance: {
    title: "Performance lift",
    summary:
      "This signal connects frontend architecture, state boundaries, and production readiness into a measurable improvement.",
  },
  engagement: {
    title: "Interaction lift",
    summary:
      "This reflects UI changes that made important actions clearer, smoother, and easier for users to trust.",
  },
};

const metricTransitionVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    y: direction * 24,
    filter: "blur(8px)",
  }),
  center: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
  exit: (direction: number) => ({
    opacity: 0,
    y: direction * -18,
    filter: "blur(8px)",
  }),
};

function ImpactDetailBackground({ visual }: { visual: ImpactMetricVisual }) {
  if (visual === "reach") {
    const nodes = [
      [52, 48],
      [116, 92],
      [184, 58],
      [238, 116],
    ];

    return (
      <svg className="absolute inset-0 h-full w-full opacity-80" viewBox="0 0 300 220" aria-hidden="true">
        {nodes.map(([x, y], nodeIndex) =>
          nodes.slice(nodeIndex + 1).map(([targetX, targetY]) => (
            <motion.line
              key={`${x}-${y}-${targetX}-${targetY}`}
              x1={x}
              x2={targetX}
              y1={y}
              y2={targetY}
              stroke="rgba(20,140,92,0.14)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, ease: easeOut }}
            />
          )),
        )}
        {nodes.map(([x, y], nodeIndex) => (
          <motion.circle
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            r={nodeIndex === 0 ? 16 : 10}
            fill="rgba(20,140,92,0.13)"
            stroke="rgba(20,140,92,0.36)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.28, ease: easeOut, delay: nodeIndex * 0.06 }}
          />
        ))}
      </svg>
    );
  }

  if (visual === "speed") {
    return (
      <div className="absolute inset-x-7 top-1/2 -translate-y-1/2 space-y-3" aria-hidden="true">
        {[92, 74, 56, 34].map((width, index) => (
          <motion.span
            key={width}
            className="block h-2 rounded-full bg-[#15945f]/18 dark:bg-emerald-300/16"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: `${width}%`, opacity: 1 }}
            transition={{ duration: 0.42, ease: easeOut, delay: index * 0.05 }}
          />
        ))}
      </div>
    );
  }

  if (visual === "latency") {
    return (
      <div className="absolute left-7 right-7 top-1/2 flex -translate-y-1/2 items-center justify-between" aria-hidden="true">
        {[1, 2, 3, 4].map((step, index) => (
          <div key={step} className="flex items-center">
            <motion.span
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#15945f]/20 bg-white/65 font-mono text-[0.64rem] font-semibold text-[#127a50] dark:bg-background/65 dark:text-emerald-300"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: easeOut, delay: index * 0.07 }}
            >
              {step}
            </motion.span>
            {index < 3 ? <span className="mx-1 h-px w-6 bg-[#15945f]/20" /> : null}
          </div>
        ))}
      </div>
    );
  }

  if (visual === "quality") {
    return (
      <div className="absolute left-7 right-7 top-1/2 grid -translate-y-1/2 grid-cols-4 gap-2" aria-hidden="true">
        {Array.from({ length: 12 }, (_, index) => (
          <motion.span
            key={index}
            className="h-8 rounded-lg border border-[#15945f]/14 bg-white/55 dark:bg-background/55"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, ease: easeOut, delay: index * 0.025 }}
          />
        ))}
      </div>
    );
  }

  if (visual === "performance") {
    return (
      <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center" aria-hidden="true">
        <svg className="h-26 w-26 -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(20,140,92,0.12)" strokeWidth="10" />
          <motion.circle
            cx="50"
            cy="50"
            r="38"
            fill="none"
            stroke="rgba(20,140,92,0.48)"
            strokeLinecap="round"
            strokeWidth="10"
            strokeDasharray="238.76"
            initial={{ strokeDashoffset: 238.76 }}
            animate={{ strokeDashoffset: 238.76 - 238.76 * 0.72 }}
            transition={{ duration: 0.7, ease: easeOut }}
          />
        </svg>
      </div>
    );
  }

  return (
    <svg className="absolute inset-0 h-full w-full opacity-80" viewBox="0 0 300 220" aria-hidden="true">
      <motion.path
        d="M 18 164 C 58 152, 68 96, 112 106 S 174 146, 204 86 S 250 54, 282 66"
        fill="none"
        stroke="rgba(20,140,92,0.42)"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: easeOut }}
      />
      {[18, 112, 204, 282].map((x, index) => (
        <motion.circle
          key={x}
          cx={x}
          cy={[164, 106, 86, 66][index]}
          r="5"
          fill="rgba(20,140,92,0.58)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.22, ease: easeOut, delay: 0.24 + index * 0.06 }}
        />
      ))}
    </svg>
  );
}

export function ImpactMetricGrid() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [transitionDirection, setTransitionDirection] = useState(1);
  const wheelProgressRef = useRef(0);
  const lastWheelMoveRef = useRef(0);
  const touchStartYRef = useRef<number | null>(null);
  const selectedMetric =
    selectedIndex === null ? null : impactMetrics[selectedIndex];
  const activeMetricPosition = selectedIndex === null ? 0 : selectedIndex + 1;
  const SelectedIcon = selectedMetric?.icon;
  const selectedTone = selectedMetric ? detailTone[selectedMetric.visual] : null;
  const metricCount = impactMetrics.length;

  const moveSelection = useCallback(
    (direction: 1 | -1) => {
      setTransitionDirection(direction);
      setSelectedIndex((current) => {
        if (current === null) {
          return current;
        }

        return (current + direction + metricCount) % metricCount;
      });
    },
    [metricCount],
  );

  useEffect(() => {
    if (!selectedMetric) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedIndex(null);
      }

      if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        event.preventDefault();
        moveSelection(1);
      }

      if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        event.preventDefault();
        moveSelection(-1);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [moveSelection, selectedMetric]);

  useEffect(() => {
    if (!selectedMetric) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedMetric]);

  useEffect(() => {
    if (!selectedMetric) {
      return;
    }

    const moveFromScroll = (direction: 1 | -1) => {
      const now = window.performance.now();

      if (now - lastWheelMoveRef.current < 720) {
        return;
      }

      lastWheelMoveRef.current = now;
      wheelProgressRef.current = 0;
      moveSelection(direction);
    };

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      wheelProgressRef.current += event.deltaY;

      if (Math.abs(wheelProgressRef.current) >= 210) {
        moveFromScroll(wheelProgressRef.current > 0 ? 1 : -1);
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      touchStartYRef.current = event.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (event: TouchEvent) => {
      const startY = touchStartYRef.current;

      if (startY === null) {
        return;
      }

      event.preventDefault();
      const currentY = event.touches[0]?.clientY ?? startY;
      const delta = startY - currentY;

      if (Math.abs(delta) >= 86) {
        touchStartYRef.current = currentY;
        moveFromScroll(delta > 0 ? 1 : -1);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: false });
    window.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      wheelProgressRef.current = 0;
      touchStartYRef.current = null;
    };
  }, [moveSelection, selectedMetric]);

  return (
    <>
      <div className="grid gap-3">
        {impactMetrics.map((metric, index) => (
          <ImpactMetricCard
            key={`${metric.value}-${metric.label}`}
            metric={metric}
            index={index}
            onOpen={() => setSelectedIndex(index)}
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedMetric && SelectedIcon && selectedTone ? (
          <motion.div
            className="fixed inset-0 z-[120] flex items-center justify-center bg-[#151719]/18 px-4 backdrop-blur-[2px] dark:bg-black/45"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: easeOut }}
            onClick={() => setSelectedIndex(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="impact-detail-title"
              className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-[#e4e4e4] bg-white shadow-[0_24px_80px_rgba(15,15,15,0.16)] dark:border-zinc-800 dark:bg-background dark:shadow-[0_28px_90px_rgba(0,0,0,0.55)]"
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.28, ease: easeOut }}
              onClick={(event) => event.stopPropagation()}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`background-${selectedMetric.visual}`}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22, ease: easeOut }}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_34%,rgba(20,140,92,0.12),transparent_48%)] dark:bg-[radial-gradient(circle_at_74%_34%,rgba(110,231,183,0.08),transparent_50%)]" />
                  <div className="absolute inset-0 opacity-[0.22] [background-image:radial-gradient(circle_at_center,rgba(20,140,92,0.25)_1px,transparent_1.4px)] [background-size:10px_10px] [mask-image:linear-gradient(to_left,black,transparent_86%)] dark:opacity-[0.12]" />
                </motion.div>
              </AnimatePresence>

              <div className="relative p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={`icon-${selectedMetric.visual}`}
                      className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#e5e5e5] bg-white/82 text-[#151719] backdrop-blur dark:border-zinc-800 dark:bg-background/82 dark:text-white"
                      initial={{ opacity: 0, scale: 0.9, y: 6 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.94, y: -6 }}
                      transition={{ duration: 0.22, ease: easeOut }}
                    >
                      <SelectedIcon className="h-5 w-5" />
                    </motion.span>
                  </AnimatePresence>
                  <button
                    type="button"
                    aria-label="Close impact details"
                    onClick={() => setSelectedIndex(null)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#e5e5e5] bg-white/72 text-[#787b83] backdrop-blur transition-colors hover:border-[#d4d4d4] hover:text-[#151719] dark:border-zinc-800 dark:bg-background/72 dark:text-zinc-500 dark:hover:border-zinc-700 dark:hover:text-white"
                  >
                    <FiX className="h-4 w-4" />
                  </button>
                </div>

                <AnimatePresence mode="wait" custom={transitionDirection} initial={false}>
                  <motion.div
                    key={`${selectedMetric.value}-${selectedMetric.label}`}
                    custom={transitionDirection}
                    className="mt-10 grid gap-7 sm:grid-cols-[0.85fr_1.15fr] sm:items-end"
                    variants={metricTransitionVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.28, ease: easeOut }}
                  >
                    <div>
                      <p className="font-mono text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-[#a6a8af]">
                        {selectedTone.title}
                      </p>
                      <p className="mt-3 text-[3rem] font-semibold leading-none tracking-[-0.06em] text-[#111111] dark:text-white sm:text-[3.45rem]">
                        {selectedMetric.value}
                      </p>
                    </div>

                    <div className="relative z-10 rounded-xl border border-[#eeeeee] bg-white/82 p-4 backdrop-blur dark:border-zinc-800 dark:bg-background/82">
                      <p className="font-mono text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-[#a6a8af]">
                        Metric context
                      </p>
                      <h2
                        id="impact-detail-title"
                        className="mt-2 text-[1.08rem] font-semibold leading-6 text-[#151719] dark:text-white"
                      >
                        {selectedMetric.label}
                      </h2>
                      <p className="mt-3 text-[0.82rem] font-medium leading-7 text-[#676a72] dark:text-zinc-400">
                        {selectedTone.summary}
                      </p>
                      <p className="mt-3 border-t border-[#eeeeee] pt-3 text-[0.78rem] font-medium leading-6 text-[#747780] dark:border-zinc-800 dark:text-zinc-400">
                        {selectedMetric.note}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="mt-6 flex flex-col gap-3 border-t border-[#eeeeee] pt-4 dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-mono text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-[#9a9da5]">
                      Scroll to switch signals
                    </p>
                    <p className="mt-1 text-[0.68rem] font-medium text-[#747780] dark:text-zinc-500">
                      {String(activeMetricPosition).padStart(2, "0")} /{" "}
                      {String(metricCount).padStart(2, "0")}
                    </p>
                  </div>
                  <div className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#eeeeee] bg-white/70 px-2.5 py-2 backdrop-blur dark:border-zinc-800 dark:bg-background/70">
                    {impactMetrics.map((metric, index) => (
                      <button
                        key={`${metric.value}-${metric.label}-dot`}
                        type="button"
                        aria-label={`Open ${metric.label}`}
                        onClick={() => {
                          setTransitionDirection(index > (selectedIndex ?? 0) ? 1 : -1);
                          setSelectedIndex(index);
                        }}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          index === selectedIndex
                            ? "w-6 bg-[#151719] dark:bg-white"
                            : "w-1.5 bg-[#d8d8d8] hover:bg-[#a6a8af] dark:bg-zinc-700 dark:hover:bg-zinc-500"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
