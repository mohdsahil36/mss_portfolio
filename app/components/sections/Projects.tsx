"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { BiRightArrowAlt } from "react-icons/bi";

import { projects } from "@/app/data/projects";
import { ProjectCard } from "../ProjectCard";
import { Button } from "@/components/ui/button";

export default function Projects({
  sectionIndex = 1,
}: {
  sectionIndex?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const sectionDirection = sectionIndex % 2 === 0 ? -60 : 60;

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, x: sectionDirection }}
      animate={
        isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: sectionDirection }
      }
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mt-6 p-4 scroll-mt-18"
      id="projects"
    >
      <h1 className="mb-6 text-center text-lg font-semibold">Builds</h1>

      {/* PROJECT LIST */}
      <div className="grid gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>

      {/* SEE ALL */}
      <div className="text-center mt-6">
        <Button variant="outline" asChild>
          <Link
            href="https://github.com/mohdsahil36?tab=repositories"
            className="inline-flex items-center gap-1"
            target="_blank"
          >
            See all <BiRightArrowAlt />
          </Link>
        </Button>
      </div>
    </motion.section>
  );
}
