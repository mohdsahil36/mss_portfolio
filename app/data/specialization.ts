import type { IconType } from "react-icons";
import {
  FiBriefcase,
  FiLayers,
  FiMonitor,
  FiTarget,
  FiZap,
} from "react-icons/fi";

export type SpecializationItem = {
  title: string;
  description: string;
  icon: IconType;
};

export const specializationSection = {
  title: "Class Perks",
  summary:
    "I build high-quality digital products by combining user-centered design, modern engineering practices, and scalable technical solutions.",
  icon: FiTarget,
};

export const specializationItems: SpecializationItem[] = [
  {
    title: "Frontend Development",
    description:
      "Develop responsive and accessible web applications using React, Next.js, and TypeScript with a strong focus on performance and maintainability.",
    icon: FiMonitor,
  },
  {
    title: "Product Engineering",
    description:
      "Transform business goals into reliable software solutions by aligning technical implementation with user and stakeholder requirements.",
    icon: FiBriefcase,
  },
  {
    title: "System Architecture",
    description:
      "Create scalable frontend architectures, reusable component systems, and efficient state management patterns for long-term growth.",
    icon: FiLayers,
  },
  {
    title: "Optimization & Reliability",
    description:
      "Enhance application performance through code optimization, SEO improvements, monitoring, testing, and production-ready practices.",
    icon: FiZap,
  },
];
