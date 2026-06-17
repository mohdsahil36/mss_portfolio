import {
  FiMail,
  FiGithub,
  FiTwitter,
  FiLinkedin,
  FiHome,
  FiMapPin,
} from "react-icons/fi";
import Profile from "@/public/favicon.png";

export const heroData = {
  eyebrow: "FIG_001 / Portfolio",
  name: "Mohd Sahil Siddiqui",
  role: "Software Engineer (Frontend)",
  availability: "Eager to contribute to products with purpose",
  titleLine: "Mohd Sahil Siddiqui",
  impactLine: "Scale, Ownership, Impact.",
  summary:
    "I build scalable, high-performance web applications across the full stack, with a focus on clean architecture, measurable impact, and interfaces that feel thoughtfully designed.",
  stackSummary:
    "Most days, that means working with React, Next.js, TypeScript, Tailwind, Node.js, and Express. The stack matters, but the real goal is clarity, and reliability, and a product experience that earns trust.",
  primaryCta: {
    label: "View Case Studies",
    href: "#projects",
  },
  secondaryCta: {
    label: "Get in touch",
    href: "#contact",
  },
  profileImage: Profile,
  profileImageAlt: "Mohd Sahil Siddiqui",
  locations: [
    {
      label: "Bangalore, KA",
      icon: FiMapPin,
    },
    {
      label: "Kanpur, UP",
      icon: FiHome,
    },
  ],
  introSegments: [
    { text: "I build " },
    {
      text: "scalable, high-performance web applications",
      emphasis: true,
    },
    { text: " across the full stack, with a focus on " },
    { text: "clean architecture", emphasis: true },
    {
      text: ", measurable impact, and interfaces that feel thoughtfully designed.",
    },
  ],
  stackIntro: "Most days, that means working with",
  stack: ["React", "Next.js", "TypeScript", "Tailwind", "Node.js", "Express"],
  stackOutro: "The stack matters, but the real goal is",
  stackGoals: ["clarity", "reliability"],
  stackClosing: "and a product experience that earns trust.",
  statusSchedule: [
    {
      startMinute: 7 * 60,
      endMinute: 10 * 60,
      colorClass: "bg-sky-500",
      message: "Morning mode",
    },
    {
      startMinute: 10 * 60,
      endMinute: 19 * 60,
      colorClass: "bg-red-500",
      message: "At work, building things at Simplify3X.",
    },
    {
      startMinute: 19 * 60,
      endMinute: 19 * 60 + 30,
      colorClass: "bg-lime-500",
      message: "Wrap up",
    },
    {
      startMinute: 19 * 60 + 30,
      endMinute: 21 * 60,
      colorClass: "bg-amber-500",
      message: "Lifting weights",
    },
    {
      startMinute: 21 * 60,
      endMinute: 22 * 60 + 30,
      colorClass: "bg-orange-500",
      message: "Recharge Mode",
    },
    {
      startMinute: 22 * 60 + 30,
      endMinute: 24 * 60,
      colorClass: "bg-indigo-500",
      message: "Personal time. Usually tinkering or unwinding.",
    },
    {
      startMinute: 0,
      endMinute: 7 * 60,
      colorClass: "bg-zinc-400",
      message: "Offline..ish",
    },
  ],
};

export const heroSocials = [
  {
    label: "GitHub",
    href: "https://github.com/mohdsahil36",
    icon: FiGithub,
    preview: true,
  },
  {
    label: "Twitter",
    href: "https://x.com/LuciFeR8382",
    icon: FiTwitter,
    preview: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mohd-sahil-siddiqui-021a11201/",
    icon: FiLinkedin,
    preview: true,
  },
];
export const emailData = {
  label: "Email Me",
  href: "mailto:mohdsahilsiddiqui36@gmail.com",
  icon: FiMail,
};
export const resumeData = {
  label: "View Resume",
  href: "https://drive.google.com/file/d/1UUyN6kmVhCBg6S2zCBR72NMVTvgBuzjO/view?usp=drive_link",
};
