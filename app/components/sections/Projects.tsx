"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { projects } from "@/app/data/projects";
import { ProjectCard } from "../ProjectCard";

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="mt-10 p-4"
    >
      <h1 className="mb-8 text-center text-lg font-semibold">Projects</h1>

      <div className="grid gap-6 sm:grid-cols-2 hover:cursor-pointer">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </motion.section>
  );
}
