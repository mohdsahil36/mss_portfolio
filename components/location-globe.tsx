"use client";

import { IndiaTime } from "./time";
import { Map } from "@/components/ui/map";

export function LocationGlobe() {
  return (
    <div
      className="
        relative
        rounded-md p-3 sm:p-4
        bg-card dark:bg-neutral-950
        backdrop-blur-sm
      "
    >
      {/* Map */}
      <div
        className="
          relative
          h-[140px] sm:h-[160px]
          w-full
          overflow-hidden
          rounded-md
          border border-zinc-200 dark:border-zinc-800
        "
      >
        <Map center={[77.5946, 12.9716]} zoom={11} />
      </div>

      {/* Overlay info */}
      <div
        className="
    absolute
    bottom-3 sm:bottom-6
    left-1/2
    -translate-x-1/2
    rounded-lg
    px-3 py-2 sm:px-4 sm:py-2.5
    bg-white/90 dark:bg-black/85
    backdrop-blur-md
    border border-zinc-200/50 dark:border-zinc-800/50
    shadow-lg
  "
      >
        <div className="flex items-baseline gap-1.5 text-sm sm:text-base">
          <IndiaTime />
        </div>
      </div>
    </div>
  );
}
