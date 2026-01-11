export type ProjectStatus = "Live" | "Building Now";

export interface Project {
  title: string;
  description: string;
  image: string;
  status: ProjectStatus;
  github: string;
  live?: string;
  progress?: number;
  stack: string[];
  detailsLink?: string;
}

export const projects: Project[] = [
  {
    title: "Devflow",
    description:
      "A platform for everyone to track their progress, statuses, and goals in a single place.",
    image: "/projects/coming-soon.png",
    status: "Building Now",
    github: "https://github.com/mohdsahil36/DevFlow",
    progress: 10,
    stack: ["React", "TypeScript", "TailwindCSS", "Mongodb", "Express JS"],
  },
  {
    title: "Replica of Notion",
    description:
      "Designed and developed a Notion-inspired SaaS application using the MERN stack. • Built with React, Next.js, TypeScript, and Tailwind CSS for a responsive UI. • Implemented efficient state management using Zustand. • Secured backend operations using Convex and Clerk with authentication and session management.",
    image: "/projects/coming-soon.png",
    status: "Live",
    github: "https://github.com/mohdsahil36/Note-Taking-Application",
    stack: [
      "Next.js",
      "TypeScript",
      "TailwindCSS",
      "Zustand",
      "Convex",
      "Clerk",
    ],
    progress: 100,
    live: "https://note-taking-application-two.vercel.app/",
  },
];
