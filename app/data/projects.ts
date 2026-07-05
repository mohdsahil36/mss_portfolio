export type ProjectStatus = "Live" | "Building Now";

export interface Project {
  title: string;
  description: string;
  image: string;
  status: ProjectStatus;
  type: string;
  github: string;
  live?: string;
  progress?: number;
  stack: string[];
  highlights: string[];
  detailsLink?: string;
}

export const projectSection = {
  eyebrow: "Currently building",
  title: "Side Quests",
  summary:
    "Experimental builds where I test product ideas, architecture choices, and interaction patterns.",
};

export const projects: Project[] = [
  {
    title: "Productivity Suite 1.0",
    description:
      "A productivity workspace for tracking goals, progress, and personal operating rhythms. The build focuses on clear state modeling, structured activity flows, and a dashboard experience that stays readable as data grows.",
    image: "/projects/coming-soon.png",
    status: "Building Now",
    type: "Side project",
    github: "https://github.com/mohdsahil36/Productivity-Suite-1.0",
    progress: 10,
    stack: ["React", "TypeScript", "TailwindCSS", "Mongodb", "Express JS"],
    highlights: [
      "Status-driven progress tracking",
      "Goal and activity organization",
      "React-first product workflow",
    ],
  },
  {
    title: "Replica of Notion",
    description:
      "A Notion-inspired document workspace built around authenticated collaboration patterns, responsive editing surfaces, and reliable document state. The project explores SaaS-style navigation, protected routes, and polished writing workflows.",
    image: "/projects/coming-soon.png",
    status: "Live",
    type: "Side project",
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
    highlights: [
      "Document editing experience",
      "Auth and backend workflows",
      "Responsive SaaS interface patterns",
    ],
  },
];
