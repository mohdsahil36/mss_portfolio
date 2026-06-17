"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import Profile from "@/public/favicon.png";
import { useLoading } from "./loading-context";

export function CinematicPreloader() {
  const [visible, setVisible] = useState(true);
  const { setDone } = useLoading();

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence
      onExitComplete={() => {
        setDone(true);
      }}
    >
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background px-6 text-foreground"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.45, ease: "easeOut" },
          }}
        >
          <motion.div
            className="flex w-full max-w-sm flex-col items-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <motion.div
              className="relative mb-6 flex h-22 w-22 items-center justify-center"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.12, duration: 0.35, ease: "easeOut" }}
            >
              <motion.div
                className="absolute inset-x-2 top-1/2 h-px bg-foreground/60"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{
                  scaleX: [0, 1, 1, 0],
                  opacity: [0, 0.7, 0.7, 0],
                  y: [-20, 0, 20],
                }}
                transition={{
                  duration: 1.8,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 0.15,
                }}
              />
              <div className="relative h-17 w-17 overflow-hidden rounded-full bg-muted ring-1 ring-border">
                <Image
                  src={Profile}
                  alt="Mohd Sahil Siddiqui"
                  fill
                  priority
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <span className="absolute bottom-3 right-3 flex h-3.5 w-3.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-background bg-emerald-500" />
              </span>
            </motion.div>

            <div className="mb-5 h-1 w-24 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
              <motion.div
                className="h-full w-full origin-left rounded-full bg-zinc-900 dark:bg-zinc-100"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 1.75,
                  ease: [0.76, 0, 0.24, 1],
                  delay: 0.2,
                }}
              />
            </div>

            <motion.span
              className="text-xl font-semibold tracking-tight"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.35 }}
            >
              Mohd Sahil Siddiqui
            </motion.span>

            <motion.span
              className="mt-2 text-center text-xs leading-5 text-muted-foreground"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.3 }}
            >
              Frontend Developer building polished, responsive interfaces.
            </motion.span>

            <motion.div
              className="mt-4 text-center text-[11px] text-muted-foreground"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.56, duration: 0.3 }}
            >
              Welcome in, take a quick look around.
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
