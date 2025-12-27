"use client";
import { easeOut, motion } from "framer-motion";

const headingVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easeOut },
  },
};

export default function Projects() {
  return (
    <section
      id="projects"
      className="
      mt-5 relative rounded-md p-4
      border border-zinc-200 dark:border-zinc-800
      bg-white dark:bg-neutral-950
    "
    >
      <motion.h1
        className="
          mb-6 text-lg font-semibold
          text-zinc-900 dark:text-white text-center
        "
        variants={headingVariants}
        initial="hidden"
        animate="visible"
      >
        Projects{" "}
      </motion.h1>
    </section>
  );
}
