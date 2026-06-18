"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ModeToggle } from "./mode-toggle";
import { useEffect } from "react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Experience", href: "#work" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
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
      className="flex h-full items-center"
    >
      <div className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-4">
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
    text-[1.05rem] font-semibold uppercase
    text-zinc-900 dark:text-zinc-100
    cursor-pointer
  "
        >
          sahilworks
        </button>

        <div className="flex items-center justify-center gap-5">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="
                relative py-5 text-[0.88rem] font-semibold
                text-zinc-500 dark:text-zinc-400
                transition-colors duration-200
                hover:text-zinc-900 dark:hover:text-zinc-100
                after:absolute after:bottom-3 after:left-0 after:h-px after:w-full
                after:origin-left after:scale-x-0 after:bg-zinc-900 after:transition-transform
                after:duration-200 hover:after:scale-x-100 dark:after:bg-zinc-100
              "
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex justify-end">
          <ModeToggle />
        </div>
      </div>
    </motion.nav>
  );
}
