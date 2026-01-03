"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BiUpArrowAlt } from "react-icons/bi";

export default function ScrollManager() {
  const [mounted, setMounted] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    if (window.location.hash) {
      history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    }

    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    window.scrollTo({ top: 0, behavior: "auto" });

    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {showButton && (
        <motion.button
          aria-label="Scroll to top"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            history.replaceState(
              null,
              "",
              window.location.pathname + window.location.search
            );
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="
  fixed
  bottom-16 md:bottom-6
  right-4 md:right-[calc(50%-20rem)]
  z-50
  flex items-center justify-center
  rounded-full
  bg-zinc-900 dark:bg-zinc-100
  p-3
  text-white dark:text-black
  shadow-lg
  hover:scale-105
  transition-transform
  cursor-pointer
"
        >
          <motion.span
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <BiUpArrowAlt size={22} />
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>,
    document.body
  );
}
