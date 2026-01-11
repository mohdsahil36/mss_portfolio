"use client";

import { motion } from "motion/react";
import { FloatingDockDemo } from "./floating-dock";

export function DockWithAnimation() {
  return (
    <motion.div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
      initial={{ opacity: 0, scale: 0, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 0.5,
      }}
    >
      <FloatingDockDemo />
    </motion.div>
  );
}
