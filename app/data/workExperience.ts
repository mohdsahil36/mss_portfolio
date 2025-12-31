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

export const workExperience = [
  {
    company: "Simplify3X",
    role: "Software Engineer",
    status: "Present",
    type: "current",
    description:
      "Worked on multiple projects focused on web development using React and Zustand, and now contribute across mobile apps, web frontend, backend development, and deployment in an end-to-end role.",
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
    isBlurred: true,
    location: "Bengaluru, KA, India",
    date: "March 2025 - Present",
  },
  {
    company: "Merkle",
    role: "Associate Frontend Developer",
    status: "Past",
    type: "past",
    description:
      "Started as an associate, getting trained on technologies like SFCC and JavaScript, and worked on multiple projects during this phase. Later gained hands-on experience with React, Node.js, and MongoDB, contributing to internal projects using these technologies.",
    techStack: [
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "SCSS", icon: SiSass, color: "#CC6699" },
      { name: "ReactJS", icon: SiReact, color: "#61DAFB" },
      { name: "Node.js", icon: SiNodedotjs, color: "#4CAF50" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
    ],
    imageAlt: "Merkle profile",
    profile: MerkleIcon,
    isBlurred: false,
    location: "Bengaluru, KA, India",
    date: "July 2022 - Feb 2024",
  },
];
