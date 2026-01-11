"use client";

import { motion } from "framer-motion";
import { useLoading } from "./loading-context";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const { done } = useLoading();

  if (!done) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
