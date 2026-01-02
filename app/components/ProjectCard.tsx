"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Project } from "@/app/data/projects";
import { Button } from "@/components/ui/button";
import { BiRightArrowAlt } from "react-icons/bi";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      whileHover="hover"
      initial="rest"
      animate="rest"
      className="
        group relative overflow-hidden rounded-xl
        border border-zinc-200 dark:border-zinc-800
        bg-white dark:bg-neutral-900
        transition-shadow
        hover:shadow-lg
      "
    >
      {/* Image – moves on CARD hover */}
      <motion.div
        variants={{
          rest: { y: 0 },
          hover: { y: 6 },
        }}
        transition={{ type: "spring", stiffness: 120, damping: 16 }}
        className="p-3"
      >
        <div className="relative h-44 w-full overflow-hidden rounded-lg bg-black">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>
      </motion.div>

      {/* Content */}
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-zinc-900 dark:text-white">
            {project.title}
          </h3>

          <span
            className={`text-xs font-medium
              ${
                project.status === "Live"
                  ? "text-emerald-600"
                  : "text-orange-500"
              }`}
          >
            ● {project.status}
          </span>
        </div>

        {/* Description with subtle background */}
        <p
          className="
            mt-2 text-sm text-zinc-600 dark:text-zinc-400
            bg-zinc-50 dark:bg-neutral-800/60
            rounded-md p-2
            line-clamp-3
          "
        >
          {project.description}
        </p>

        {/* Actions */}
        <div className="mt-4 flex gap-4">
          <Link href={project.github} target="_blank">
            <Button variant="ghost" size="sm" className="px-0">
              GitHub
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
              >
                <BiRightArrowAlt className="ml-1 text-lg" />
              </motion.span>
            </Button>
          </Link>

          {project.status === "Live" && project.live && (
            <Link href={project.live} target="_blank">
              <Button variant="ghost" size="sm" className="px-0">
                Live
                <motion.span
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                >
                  <BiRightArrowAlt className="ml-1 text-lg" />
                </motion.span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}
