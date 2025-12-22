"use client";
import { IndiaTime } from "./time";

export function LocationGlobe() {
  return (
    <div className="flex items-center gap-5 border border-zinc-800 p-6 rounded-md h-full">
      <div className="relative flex items-center justify-center">
        {/* Spinning dotted ring */}
        <div
          className="absolute rounded-full border-2 border-dashed border-zinc-800 animate-spin"
          style={{
            width: "4.125rem",
            height: "4.125rem",
            animationDuration: "10s",
          }}
        />
        {/* Globe emoji */}
        <div className="relative text-5xl">🌍</div>
      </div>

      {/* Location + time */}
      <div className="flex flex-col leading-tight ms-3">
        <span className="text-sm text-white">Bengaluru, Karnataka, IND</span>
        <IndiaTime />
      </div>
    </div>
  );
}
