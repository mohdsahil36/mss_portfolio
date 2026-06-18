import {
  FiActivity,
  FiBookOpen,
  FiCamera,
  FiCode,
  FiGithub,
  FiHeart,
  FiMusic,
  FiTrendingUp,
} from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";

export const beyondCodeSection = {
  eyebrow: "Beyond code",
  title: "Interests & profiles",
  summary:
    "A small look at what keeps me curious outside tickets, deadlines, and deploy logs.",
  icon: FiHeart,
};

export const interestsData = [
  // { label: "Design exploration", icon: FiPenTool },
  { label: "Gaming", icon: FiCamera },
  { label: "Listening to Music", icon: FiCode },
  { label: "Gym", icon: FiActivity },
  { label: "Reading Books and Technical Blogs", icon: FiBookOpen },
  { label: "Traveling", icon: FiMusic },
];

export const codingProfileData = {
  title: "Coding activity",
  username: "mohdsahil36",
  githubHref: "https://github.com/mohdsahil36",
  leetcodeUsername: "itsSahil1999",
  leetcodeHref: "https://leetcode.com/u/itsSahil1999/",
  tabs: [
    {
      label: "GitHub",
      icon: FiGithub,
      active: true,
      comment: "Where the commits go to prove I was not just thinking really hard.",
      href: "https://github.com/mohdsahil36",
    },
    {
      label: "LeetCode",
      icon: SiLeetcode,
      active: false,
      comment:
        "Trying my best, still struggling. The arrays remain emotionally complicated.",
      href: "https://leetcode.com/u/itsSahil1999/",
    },
  ],
  years: [
    {
      year: "2026",
      stats: [
        { label: "Repositories", value: "30", icon: FiGithub },
        { label: "Max streak", value: "10", icon: FiTrendingUp },
        { label: "Current streak", value: "0", icon: FiHeart },
        { label: "Today", value: "0", icon: FiActivity },
      ],
      totalContributions: "120",
      levels:
        "00000000000000000000000000000000000000000000000000000000000000000000000000000001124201112000300000000000020140222011210110200121122124100002201000100000000024001111000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    },
    {
      year: "2025",
      stats: [
        { label: "Repositories", value: "30", icon: FiGithub },
        { label: "Max streak", value: "15", icon: FiTrendingUp },
        { label: "Current streak", value: "0", icon: FiHeart },
        { label: "Today", value: "-", icon: FiActivity },
      ],
      totalContributions: "87",
      levels:
        "00000000000000000000000000004000000000034012000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004111221212111110111110000000001410000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000000000",
    },
    {
      year: "2024",
      stats: [
        { label: "Repositories", value: "30", icon: FiGithub },
        { label: "Max streak", value: "0", icon: FiTrendingUp },
        { label: "Current streak", value: "-", icon: FiHeart },
        { label: "Today", value: "-", icon: FiActivity },
      ],
      totalContributions: "0",
      levels:
        "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    },
  ],
};
