"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiArrowUpRight, FiX } from "react-icons/fi";

const toastStorageKey = "impact-log-card-hint-dismissed";

export function ImpactLogToast() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isDismissed = window.sessionStorage.getItem(toastStorageKey);
    const timer = window.setTimeout(() => {
      setIsVisible(!isDismissed);
    }, 650);

    return () => window.clearTimeout(timer);
  }, []);

  const dismiss = () => {
    window.sessionStorage.setItem(toastStorageKey, "true");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.aside
          aria-live="polite"
          className="fixed bottom-[5.5rem] left-4 right-4 z-[58] mx-auto max-w-[19rem] overflow-hidden rounded-xl border border-[#e7e7e7] bg-white/88 p-3 shadow-[0_18px_50px_rgba(15,15,15,0.1)] backdrop-blur-md dark:border-zinc-800 dark:bg-background/88 dark:shadow-[0_22px_60px_rgba(0,0,0,0.42)] sm:bottom-auto sm:left-auto sm:right-5 sm:top-24 sm:mx-0"
          initial={{ opacity: 0, y: 10, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.96 }}
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span
            aria-hidden="true"
            className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-[#151719]/8 to-transparent dark:via-white/10"
            animate={{ x: ["0%", "430%"] }}
            transition={{
              duration: 2.2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 3.5,
            }}
          />
          <div className="flex items-start gap-3">
            <motion.span
              className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#eeeeee] bg-[#fafafa] text-[#151719] dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
              animate={{ y: [0, -2, 0] }}
              transition={{
                duration: 1.8,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 2.4,
              }}
            >
              <FiArrowUpRight className="h-4 w-4" />
            </motion.span>
            <div className="min-w-0 flex-1">
              <p className="text-[0.78rem] font-semibold leading-5 text-[#151719] dark:text-white">
                Want the behind-the-scenes?
              </p>
              <p className="mt-1 text-[0.72rem] font-medium leading-5 text-[#747780] dark:text-zinc-400">
                Open any signal card for the short version of how that number
                happened.
              </p>
            </div>
            <button
              type="button"
              aria-label="Dismiss impact log hint"
              onClick={dismiss}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[#8f929a] transition-colors hover:bg-[#f4f4f4] hover:text-[#151719] dark:text-zinc-500 dark:hover:bg-zinc-900 dark:hover:text-white"
            >
              <FiX className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}
