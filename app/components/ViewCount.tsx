"use client";

import { useEffect, useState } from "react";
import { IconEye } from "@tabler/icons-react";

export function ViewCount() {
  const [viewCount, setViewCount] = useState<number | null>(null);

  useEffect(() => {
    // Increment view count on mount
    fetch("/api/views", { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        setViewCount(data.count);
      })
      .catch(() => {
        // Silently fail if API is not available
        setViewCount(null);
      });
  }, []);

  if (viewCount === null) {
    return null;
  }

  return (
    <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
      <IconEye className="w-3.5 h-3.5" />
      <span>View Count: {viewCount.toLocaleString()}</span>
    </div>
  );
}
