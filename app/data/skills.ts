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
  SiBitbucket,
  SiFigma,
  SiFirebase,
  SiMongodb,
  SiJira,
  SiVercel,
  SiShadcnui,
  SiAmazon,
  SiPostman,
} from "react-icons/si";
import { VscCode } from "react-icons/vsc";

export type SkillItem = {
  name: string;
  color: string;
  icon?: IconType;
};

export type SkillCategory = {
  title: string;
  skills: SkillItem[];
};

export const skillsData: SkillCategory[] = [
  {
    title: "Languages",
    skills: [
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "TypeScript", icon: SiTypescript, color: "#4EA1F3" },
      { name: "Node.js", icon: SiNodedotjs, color: "#4CAF50" },
    ],
  },

  {
    title: "Libraries & Frameworks",
    skills: [
      { name: "ReactJS", icon: SiReact, color: "#61DAFB" },
      { name: "Redux", icon: SiRedux, color: "#9B7BFF" },
      { name: "Zustand", icon: SiReact, color: "#7DD3FC" },
      { name: "Next.js", icon: SiNextdotjs, color: "#E5E7EB" },
      { name: "Express.js", icon: SiExpress, color: "#E5E7EB" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38E8D6" },
      { name: "Micro Frontend", icon: SiReact, color: "#7DD3FC" },
      {
        name: "shadcn/ui",
        icon: SiShadcnui,
        color: "#E5E7EB",
      },
    ],
  },

  {
    title: "Tools & Platforms",
    skills: [
      { name: "Git", icon: SiGit, color: "#FF7849" },
      { name: "Bitbucket", icon: SiBitbucket, color: "#4C82FF" },
      { name: "Figma", icon: SiFigma, color: "#FB7185" },
      {
        name: "Vercel",
        icon: SiVercel,
        color: "#E5E7EB",
      },
      { name: "Firebase", icon: SiFirebase, color: "#FFD166" },
      { name: "MongoDB", icon: SiMongodb, color: "#6EE7B7" },
      { name: "Jira", icon: SiJira, color: "#60A5FA" },
      { name: "CI/CD", icon: SiGit, color: "#FF7849" },
      { name: "Azure DevOps", icon: SiBitbucket, color: "#4C82FF" },
      { name: "AWS", color: "#FF9900", icon: SiAmazon },
      {
        name: "Cursor",
        color: "#22C55E",
        icon: VscCode,
      },
      { name: "Postman", color: "#FF9900", icon: SiPostman },
    ],
  },

  {
    title: "Soft Skills",
    skills: [
      { name: "Communication", color: "#CBD5E1" },
      { name: "Problem-solving", color: "#CBD5E1" },
      { name: "Troubleshooting", color: "#CBD5E1" },
      { name: "Collaboration", color: "#CBD5E1" },
      { name: "Agile / Scrum", color: "#CBD5E1" },
      { name: "Attention to details", color: "#CBD5E1" },
    ],
  },
];
