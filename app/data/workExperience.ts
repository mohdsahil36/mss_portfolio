import {
  SiReact,
  SiRedux,
  SiTailwindcss,
  SiNodedotjs,
  SiReactivex,
  SiMongodb,
  SiAmazon,
  SiJavascript,
  SiSass,
} from "react-icons/si";

import SimplifyIcon from "@/public/assets/Simplify3x.jpeg";
import MerkleIcon from "@/public/assets/Merkle.jpeg";

export const workSection = {
  title: "Experience",
  summary:
    "A concise overview of roles, teams, and ownership driving the work.",
};

export const workExperience = [
  {
    company: "Simplify3X",
    role: "Software Engineer",
    status: "Current role",
    type: "current",
    points: [
      "Build production web interfaces with React, state management, and reusable frontend patterns.",
      "Contribute across frontend, backend, mobile, and deployment workflows when product delivery needs it.",
      "Focus on performance, maintainability, and shipping UI that feels clean under real usage.",
    ],
    techStack: [
      { name: "ReactJS", icon: SiReact, color: "#61DAFB" },
      { name: "Redux", icon: SiRedux, color: "#764ABC" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38BDF8" },
      { name: "Node.js", icon: SiNodedotjs, color: "#4CAF50" },
      { name: "React Native", icon: SiReactivex, color: "#61DAFB" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "AWS", icon: SiAmazon, color: "#FF9900" },
    ],
    imageAlt: "Simplify3X profile",
    profile: SimplifyIcon,
    location: "Bengaluru, KA, India",
    date: "March 2025 - Present",
  },
  {
    company: "Merkle",
    role: "Associate Frontend Developer",
    status: "Previous role",
    type: "past",
    points: [
      "Built frontend foundations across JavaScript, SCSS, React, and production delivery practices.",
      "Contributed to internal tools and projects using React, Node.js, and MongoDB.",
      "Learned team-scale workflows, code reviews, and reliable implementation habits in client-facing environments.",
    ],
    techStack: [
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "SCSS", icon: SiSass, color: "#CC6699" },
      { name: "ReactJS", icon: SiReact, color: "#61DAFB" },
      { name: "Node.js", icon: SiNodedotjs, color: "#4CAF50" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
    ],
    imageAlt: "Merkle profile",
    profile: MerkleIcon,
    location: "Bengaluru, KA, India",
    date: "July 2022 - Feb 2024",
  },
];
