"use client";

import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";
import { Project } from "@/app/data/projects";
import { Button } from "@/components/ui/button";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div
      className="
        rounded-lg border border-zinc-200 dark:border-zinc-800
        bg-card dark:bg-neutral-950
        p-5
        shadow-sm
        transition-shadow
        hover:shadow-md
      "
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold text-black dark:text-white">
          {project.title}
        </h3>

        <div className="flex gap-2 shrink-0">
          {project.live && project.status === "Live" && (
            <Link href={project.live} target="_blank">
              <Button
                variant="outline"
                size="sm"
                className="gap-1 cursor-pointer"
              >
                Live
                <MdArrowOutward />
              </Button>
            </Link>
          )}

          <Link href={project.github} target="_blank">
            <Button
              variant="outline"
              size="sm"
              className="gap-1 cursor-pointer"
            >
              Github
              <MdArrowOutward />
            </Button>
          </Link>
        </div>
      </div>

      <ul className="mt-4 space-y-2 text-sm text-zinc-400 list-disc list-inside">
        {project.description
          .split("•")
          .map((point, idx) =>
            point.trim() ? <li key={idx}>{point.trim()}</li> : null
          )}
      </ul>

      {project.stack && (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="
                rounded-sm
                bg-zinc-700 dark:bg-zinc-800
                px-3 py-2
                text-xs text-zinc-300
              "
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
