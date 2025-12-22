"use client";

export function ActiveStatus() {
  return (
    <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
      </span>
      <span>Active</span>
    </div>
  );
}
