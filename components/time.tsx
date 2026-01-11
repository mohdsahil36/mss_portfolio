"use client";

import { useEffect, useState } from "react";

export function IndiaTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <span className="text-sm font-mono font-semibold text-zinc-900 dark:text-white tabular-nums">
        {time}
      </span>
      <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
        IST
      </span>
    </>
  );
}
