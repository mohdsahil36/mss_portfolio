"use client";

import { AnimatePresence, easeOut, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { impactMetrics } from "@/app/data/impact";
import { ImpactMetricCard } from "./impact-metric-card";

export function ImpactMetricGrid() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selectedMetric =
    selectedIndex === null ? null : impactMetrics[selectedIndex];
  const SelectedIcon = selectedMetric?.icon;

  useEffect(() => {
    if (!selectedMetric) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedIndex(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedMetric]);

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
        {selectedMetric && SelectedIcon ? (
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
              className="w-full max-w-3xl overflow-hidden rounded-2xl border border-[#e4e4e4] bg-white shadow-[0_24px_80px_rgba(15,15,15,0.16)] dark:border-zinc-800 dark:bg-background dark:shadow-[0_28px_90px_rgba(0,0,0,0.55)]"
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.28, ease: easeOut }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="grid gap-0 md:grid-cols-[15rem_1fr]">
                <div className="border-b border-[#eeeeee] bg-[#fafafa] p-5 dark:border-zinc-800 dark:bg-zinc-950/55 md:border-b-0 md:border-r">
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e5e5e5] bg-white text-[#151719] dark:border-zinc-800 dark:bg-background dark:text-white">
                      <SelectedIcon className="h-5 w-5" />
                    </span>
                    <button
                      type="button"
                      aria-label="Close impact details"
                      onClick={() => setSelectedIndex(null)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e5e5e5] text-[#787b83] transition-colors hover:border-[#d4d4d4] hover:text-[#151719] dark:border-zinc-800 dark:text-zinc-500 dark:hover:border-zinc-700 dark:hover:text-white"
                    >
                      <FiX className="h-4 w-4" />
                    </button>
                  </div>

                  <p className="mt-7 font-mono text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-[#a6a8af]">
                    Impact signal
                  </p>
                  <p className="mt-2 text-[2.2rem] font-semibold leading-none tracking-[-0.04em] text-[#111111] dark:text-white">
                    {selectedMetric.value}
                  </p>
                  <h2
                    id="impact-detail-title"
                    className="mt-3 text-[0.95rem] font-semibold leading-5 text-[#151719] dark:text-white"
                  >
                    {selectedMetric.label}
                  </h2>
                  <p className="mt-2 text-[0.76rem] font-medium leading-6 text-[#787b83] dark:text-zinc-400">
                    {selectedMetric.note}
                  </p>
                </div>

                <div className="p-5">
                  <p className="font-mono text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-[#a6a8af]">
                    How this was achieved
                  </p>
                  <div className="mt-4 space-y-3">
                    {selectedMetric.details.map((detail, index) => (
                      <motion.div
                        key={detail}
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.28,
                          ease: easeOut,
                          delay: index * 0.05,
                        }}
                        className="grid grid-cols-[2rem_1fr] gap-3 rounded-xl border border-[#eeeeee] bg-white p-3 dark:border-zinc-800 dark:bg-background"
                      >
                        <span className="font-mono text-[0.62rem] font-semibold text-[#a6a8af]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <p className="text-[0.78rem] font-medium leading-6 text-[#676a72] dark:text-zinc-400">
                          {detail}
                        </p>
                      </motion.div>
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
