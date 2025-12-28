"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ModeToggle } from "./mode-toggle";

const navItems = [
  // { label: "home", href: "#home" },
  { label: "experience", href: "#work" },
  //   { label: "projects", href: "#projects" },
  { label: "skills", href: "#skills" },
  { label: "contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="sticky top-0 z-50"
    >
      <div
        className="
          mx-auto md:max-w-2xl
          flex items-center justify-between
          px-2 pt-4 bv
        "
      >
        <Link
          href="/"
          className="
            text-md font-semibold tracking-tight
            text-zinc-900 dark:text-zinc-100
          "
        >
          sahil.
        </Link>

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
