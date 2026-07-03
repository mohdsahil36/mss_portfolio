"use client";

import { motion } from "framer-motion";
import { ModeToggle } from "./mode-toggle";
import { useEffect } from "react";
import { CommandPalette } from "./command-palette";

export function ScrollToTopOnLoad() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}

export default function Navbar() {
  const scrollHome = () => {
    history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search,
    );

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="flex h-full items-center"
    >
      <div className="flex w-full items-center justify-between gap-3">
        <button
          type="button"
          onClick={scrollHome}
          className="
    cursor-pointer text-[0.98rem] font-semibold uppercase sm:text-[1.05rem]
    text-zinc-900 dark:text-zinc-100
  "
        >
          sahilworks
        </button>

        <div className="flex items-center justify-end gap-2">
          <CommandPalette />
          <ModeToggle />
        </div>
      </div>
    </motion.nav>
  );
}
