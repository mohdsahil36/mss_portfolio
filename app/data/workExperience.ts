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
    summary:
      "At Simplify3X, I have worked across a high-traffic real estate platform and an international airline platform, contributing to frontend development, full-stack feature delivery, mobile applications, design systems, and performance optimization. My work focuses on delivering scalable, user-centric, and production-ready solutions.",
    summaryTags: [
      "Frontend ownership",
      "Full-stack support",
      "Mobile delivery",
      "Design systems",
      "Performance work",
    ],
    points: [
      "Owned product-facing engineering across two domains: a transaction-heavy real estate platform and an international airline platform.",
      "Worked across React, React Native, Node.js, Redux, Zustand, Storybook, AWS, and Azure DevOps depending on what the product needed.",
      "Focused on shipping reliable interfaces, reusable systems, and measurable performance improvements without losing design consistency.",
    ],
    projects: [
      {
        name: "Large-scale real estate platform",
        summary:
          "Full-stack delivery across web, Android, and iOS for a transaction-driven real estate platform.",
        workDone: [
          "Maintained and enhanced cross-platform React Native applications for Android and iOS while keeping web and mobile experiences consistent.",
          "Developed and optimized React.js web applications with Redux for predictable state management and smoother high-traffic workflows.",
          "Worked on a Node.js backend across large-scale codebases, including modules exceeding 10,000 lines of code.",
          "Designed and shipped new features across web and mobile platforms with a focus on consistency, reliability, and user experience quality.",
          "Supported AWS deployment, infrastructure management, and production issue handling in collaboration with cross-functional teams.",
        ],
        impactMade: [
          "Supported a business network of 5,000+ partner agents and 13,000+ property transactions.",
          "Optimized backend APIs and reduced response/load times by up to 93% for critical workflows.",
          "Improved frontend performance by 50%+ through rendering improvements, code optimization, and more efficient state management.",
        ],
      },
      {
        name: "International airlines platform",
        summary:
          "Frontend delivery for an international airline platform with globally distributed teams working across countries and time zones.",
        workDone: [
          "Developed and launched new application pages and user workflows to improve platform functionality and user experience.",
          "Built, optimized, and maintained reusable React components to reduce duplication and improve maintainability.",
          "Worked extensively on the administration portal using React, Next.js, Zustand, Prettier, and Husky.",
          "Established and expanded a centralized Storybook component library for consistent UI implementation across teams.",
          "Used Azure DevOps Boards for sprint planning, task tracking, and cross-functional collaboration across distributed teams.",
        ],
        impactMade: [
          "Improved frontend consistency by standardizing reusable components through Storybook.",
          "Enhanced application performance and maintainability through component optimization and reusable architecture.",
          "Increased development efficiency for multiple teams through a centralized component library and code quality standards.",
        ],
      },
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
