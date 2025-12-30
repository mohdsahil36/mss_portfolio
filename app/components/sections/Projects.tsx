"use client";
import { easeOut, motion, useInView } from "framer-motion";
import { useRef } from "react";

const headingVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: easeOut },
  },
};

export default function Projects({
  sectionIndex = 1,
}: {
  sectionIndex?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const sectionDirection = sectionIndex % 2 === 0 ? -60 : 60;

  const sectionVariants = {
    hidden: { opacity: 0, x: sectionDirection },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: easeOut },
    },
  };

  return (
    <motion.section
      ref={ref}
      id="projects"
      className="
      mt-5 relative rounded-md p-4
      bg-white dark:bg-neutral-950
    "
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.h1
        className="
          mb-6 text-lg font-semibold
          text-zinc-900 dark:text-white text-center
        "
        variants={headingVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ delay: 0.2 }}
      >
        Projects{" "}
      </motion.h1>
    </motion.section>
  );
}
