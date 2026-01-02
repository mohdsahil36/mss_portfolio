// projects.ts
export type ProjectStatus = "Live" | "Building";

export interface Project {
  title: string;
  description: string;
  image: string;
  status: ProjectStatus;
  github: string;
  live?: string;
}

export const projects: Project[] = [
  {
    title: "Lunel",
    description:
      "A modern SaaS landing experience focused on performance and clarity.",
    image: "/projects/coming-soon.png",
    status: "Building",
    github: "https://github.com/mohdsahil36",
  },
  {
    title: "Asap",
    description: "Studio-quality remote audio and video recording platform.",
    image: "/projects/coming-soon.png",
    status: "Building",
    github: "https://github.com/mohdsahil36",
  },
  {
    title: "Cuez",
    description:
      "A social platform where developers share projects and grow together.",
    image: "/projects/cuez.png",
    status: "Live",
    github: "https://github.com/mohdsahil36",
    live: "https://cuez.dev",
  },
  {
    title: "The Daily Crimes",
    description:
      "A newspaper-style crime news website with a clean editorial layout.",
    image: "/projects/daily-crimes.png",
    status: "Live",
    github: "https://github.com/mohdsahil36",
    live: "https://dailycrimes.in",
  },
];
