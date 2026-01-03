"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { projects } from "@/app/data/projects";
import { ProjectCard } from "../ProjectCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BiRightArrowAlt } from "react-icons/bi";

export default function Projects({
  sectionIndex = 1,
}: {
  sectionIndex?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="mt-6 p-4"
    >
      <h1 className="mb-6 text-center text-lg font-semibold">Side Projects</h1>

      <div className="grid gap-6 grid-rows hover:cursor-pointer">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>

      <div className="text-center md:mt-6 cursor-pointer">
        <Button variant="outline" asChild>
          <Link href="/your-path">
            See all <BiRightArrowAlt />
          </Link>
        </Button>
      </div>
    </motion.section>
  );
}
