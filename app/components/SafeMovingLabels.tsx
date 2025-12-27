"use client";

import React from "react";
import clsx from "clsx";

type Speed = "slow" | "normal" | "fast";

const SPEED_MAP: Record<Speed, string> = {
  slow: "40s",
  normal: "25s",
  fast: "15s",
};

interface MovingLabelsProps {
  labels: string[];
  direction?: "left" | "right";
  speed?: Speed;
}

export function SafeMovingLabels({
  labels,
  direction = "left",
  speed = "normal",
}: MovingLabelsProps) {
  const duration = SPEED_MAP[speed];

  return (
    <div className="relative overflow-hidden w-full">
      <div
        className={clsx(
          "flex w-max gap-4 animate-marquee",
          direction === "right" && "animate-marquee-reverse"
        )}
        style={{
          ["--duration" as unknown as string]: duration,
        }}
      >
        {[...labels, ...labels].map((label, i) => (
          <span
            key={`${label}-${i}`}
            className="
              whitespace-nowrap
                tracking-wide
                text-[11px]
                font-semibold
                uppercase
                rounded-md
                px-4 py-1.5 mt-5    
                border
                border-zinc-300/70 dark:border-zinc-700
                bg-white/80 dark:bg-zinc-900/80
                text-zinc-700 dark:text-zinc-200
                backdrop-blur
                shadow-sm
                hover:bg-zinc-100 dark:hover:bg-zinc-800
                transition-colors

            "
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
