"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useLoading } from "./loading-context";

export function CinematicPreloader() {
  const [visible, setVisible] = useState(true);
  const { setDone } = useLoading();

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 3800); // Slightly longer for smooth exit
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence
      onExitComplete={() => {
        setDone(true);
      }}
    >
      {visible && (
        <motion.div className="fixed inset-0 z-[9999] bg-black overflow-hidden flex items-center justify-center">
          {/* FILM GRAIN */}
          <div className="absolute inset-0 opacity-[0.06] bg-[url('/noise.png')] pointer-events-none animate-[grain_0.6s_infinite] " />

          {/* CINEMATIC LIGHT SWEEP */}
          <motion.div
            className="absolute inset-y-0 w-[200%] bg-gradient-to-r from-transparent via-white/10 to-transparent"
            initial={{ x: "-150%" }}
            animate={{ x: "150%" }}
            transition={{
              duration: 3.5,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
            }}
          />

          {/* TEXT BLOCK */}
          <motion.div
            className="relative z-10 flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 1.2, ease: "easeInOut" },
            }}
          >
            {/* NAME */}
            <motion.span
              className="text-white text-3xl md:text-4xl tracking-[0.45em] font-light"
              initial={{ y: 40, opacity: 0, filter: "blur(12px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: -30, opacity: 0, scale: 0.95, filter: "blur(14px)" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              SAHIL
            </motion.span>

            {/* SUBTLE DIVIDER */}
            <motion.div
              className="mt-8 h-px w-32 bg-white/30"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0, opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
            />

            {/* ROLE */}
            <motion.span
              className="mt-4 text-xs tracking-[0.35em] text-white/60"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ delay: 0.8, duration: 0.8, ease: "easeInOut" }}
            >
              SOFTWARE ENGINEER
            </motion.span>
          </motion.div>

          {/* FADE OUT LAYER */}
          <motion.div
            className="absolute inset-0 bg-black"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 1.2, ease: "easeInOut", delay: 0.5 },
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
