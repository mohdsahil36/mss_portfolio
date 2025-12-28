"use client";
import { IndiaTime } from "./time";

export function LocationGlobe() {
  return (
    <div
      className="
        flex items-center gap-5
         rounded-md p-6 h-full
        bg-card dark:bg-neutral-950
        backdrop-blur-sm
      "
    >
      <div className="relative flex items-center justify-center">
        <div
          className="
            absolute rounded-full
            border-2 border-dashed
            border-zinc-300 dark:border-zinc-800
            animate-spin
          "
          style={{
            width: "4.125rem",
            height: "4.125rem",
            animationDuration: "10s",
          }}
        />
        <div className="relative text-5xl">🌍</div>
      </div>

      <div className="flex flex-col leading-tight ms-3">
        <span className="text-sm text-zinc-900 dark:text-white">
          Bengaluru, Karnataka, IND
        </span>
        <IndiaTime />
      </div>
    </div>
  );
}
