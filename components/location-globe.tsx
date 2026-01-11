"use client";

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
    </div>
  );
}
