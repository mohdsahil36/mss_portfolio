import type { IconType } from "react-icons";

import {
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiReact,
  SiRedux,
  SiNextdotjs,
  SiExpress,
  SiTailwindcss,
  SiGit,
  SiFigma,
  SiMongodb,
  SiMongoose,
  SiJira,
  SiVercel,
  SiDocker,
  SiFramer,
  SiJsonwebtokens,
  SiPostman,
  SiClaude,
  SiZod,
  SiGraphql,
  SiReactquery,
  SiAnthropic,
  SiOpenai,
  SiPrisma,
} from "react-icons/si";
import { VscCode } from "react-icons/vsc";
import {
  FiCode,
  FiCpu,
  FiGitBranch,
  FiLayers,
  FiPackage,
  FiPenTool,
  FiServer,
  FiTool,
} from "react-icons/fi";

export type SkillItem = {
  name: string;
  color: string;
  icon?: IconType;
};

export type SkillCategory = {
  title: string;
  skills: SkillItem[];
};

export const skillsSection = {
  eyebrow: "Tech stack",
  title: "What I build with",
  summary:
    "A practical stack centered on frontend systems, product UI, API integration, and reliable delivery workflows.",
  icon: FiPackage,
};

export const skillsData: SkillCategory[] = [
  {
    title: "Frontend",
    skills: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#111111" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38BDF8" },
      { name: "Redux", icon: SiRedux, color: "#764ABC" },
      { name: "Zustand", icon: FiCode, color: "#3F2F22" },
      { name: "Framer Motion", icon: SiFramer, color: "#111111" },
      { name: "Zod", icon: SiZod, color: "#3068B7" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Express", icon: SiExpress, color: "#111111" },
      { name: "REST APIs", icon: FiServer, color: "#FF6B35" },
    ],
  },
  {
    title: "Database",
    skills: [
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "Mongoose", icon: SiMongoose, color: "#880000" },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "JIRA", icon: SiJira, color: "#0052CC" },
      { name: "Figma", icon: SiFigma, color: "#F24E1E" },
      { name: "VS Code", icon: VscCode, color: "#007ACC" },
      { name: "Cursor", icon: VscCode, color: "#111111" },
      { name: "Claude Code", icon: SiClaude, color: "#D97757" },
      { name: "Postman", icon: SiPostman, color: "#FF6C37" },
      { name: "JWT", icon: SiJsonwebtokens, color: "#111111" },
    ],
  },
  {
    title: "DevOps & Workflow",
    skills: [
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "CI/CD", icon: FiGitBranch, color: "#3B82F6" },
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "Vercel", icon: SiVercel, color: "#111111" },
    ],
  },
  {
    title: "Architecture",
    skills: [
      { name: "System Design", icon: FiLayers, color: "#111111" },
      { name: "HLD", icon: FiPenTool, color: "#635BFF" },
      { name: "LLD", icon: FiCpu, color: "#7C3AED" },
    ],
  },
  {
    title: "Currently learning",
    skills: [
      { name: "Design", icon: FiPenTool, color: "#111111" },
      { name: "GraphQL", icon: SiGraphql, color: "#E10098" },
      { name: "TanStack", icon: SiReactquery, color: "#FF4154" },
      { name: "Gen AI Development", icon: SiAnthropic, color: "#D97757" },
      { name: "ChatGPT API", icon: SiOpenai, color: "#10A37F" },
      { name: "Prisma", icon: SiPrisma, color: "#2D3748" },
    ],
  },
];
