"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ModeToggle } from "./mode-toggle";
import { useEffect } from "react";

const navItems = [
  { label: "career", href: "#work" },
  { label: "builds", href: "#projects" },
  { label: "stack", href: "#skills" },
  { label: "connect", href: "#contact" },
];

export function ScrollToTopOnLoad() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="sticky top-0 z-50"
    >
      <div className="mx-auto flex items-center justify-between px-0 pt-4">
        <button
          onClick={() => {
            history.replaceState(
              null,
              "",
              window.location.pathname + window.location.search
            );

            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="
    text-md font-semibold tracking-tight
    text-zinc-900 dark:text-zinc-100
    cursor-pointer
  "
        >
          sahil.
        </button>

        <div className="flex items-center gap-4">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="
                text-sm font-normal
                text-zinc-500 dark:text-zinc-400
                transition-colors duration-200
                hover:text-zinc-900 dark:hover:text-zinc-100
              "
            >
              {item.label}
            </Link>
          ))}

          <ModeToggle />
        </div>
      </div>
    </motion.nav>
  );
}
