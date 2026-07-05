import type { IconType } from "react-icons";
import {
  FiActivity,
  FiBarChart2,
  FiCheckCircle,
  FiCpu,
  FiGlobe,
  FiTrendingUp,
} from "react-icons/fi";

export type ImpactMetricVisual =
  | "reach"
  | "speed"
  | "latency"
  | "quality"
  | "performance"
  | "engagement";

export type ImpactMetric = {
  value: string;
  label: string;
  note: string;
  delta: string;
  period: string;
  marker: string;
  visual: ImpactMetricVisual;
  details: string[];
  icon: IconType;
};

export const impactSection = {
  title: "Impact Log",
  summary:
    "A few production signals from web, mobile, backend, and platform work. The useful part is not the number alone, but the kind of engineering that made it hold up.",
  icon: FiTrendingUp,
};

export const impactMetrics: ImpactMetric[] = [
  {
    value: "16M+",
    label: "Platform users served",
    note: "Built and maintained production-grade web and mobile applications used at serious scale.",
    delta: "scale proven",
    period: "production reach",
    marker: "high traffic",
    visual: "reach",
    details: [
      "Supported platforms serving 16M+ users across production web and mobile surfaces.",
      "Contributed to admin systems managing high-volume user operations across multiple time zones.",
      "Focused on reliable, scalable experiences where everyday traffic could not be treated like an edge case.",
    ],
    icon: FiGlobe,
  },
  {
    value: "50%",
    label: "Frontend performance lift",
    note: "Improved page-load behavior with cleaner state, rendering, and component architecture.",
    delta: "+50% speed",
    period: "frontend pass",
    marker: "faster screens",
    visual: "speed",
    details: [
      "Optimized React state management, conditional rendering, and unnecessary re-renders.",
      "Used strategic lazy loading and cleaner component boundaries to reduce page load friction.",
      "Made screens feel faster and more responsive without making the codebase harder to maintain.",
    ],
    icon: FiActivity,
  },
  {
    value: "93%",
    label: "API response optimization",
    note: "Reduced API response times through Node.js, MongoDB, and data-fetching optimization.",
    delta: "93% less wait",
    period: "critical flows",
    marker: "API response",
    visual: "latency",
    details: [
      "Optimized Node.js services, controller logic, helper utilities, and data-fetching strategies.",
      "Improved MongoDB aggregation pipelines around critical workflows with heavy response-time cost.",
      "Validated improvements through browser DevTools network profiling and Postman performance testing.",
    ],
    icon: FiCpu,
  },
  {
    value: "90%",
    label: "Issue reduction loop",
    note: "Reduced recurring production issues through root-cause fixes and stronger code quality.",
    delta: "90% quieter",
    period: "support signal",
    marker: "fewer repeats",
    visual: "quality",
    details: [
      "Reduced client-reported issues by approximately 90% through frontend and backend optimizations.",
      "Fixed repeated UI bugs, edge cases, and broken flows instead of patching the same symptoms repeatedly.",
      "Helped create a more stable release cycle with fewer regressions reaching production.",
    ],
    icon: FiCheckCircle,
  },
  {
    value: "20%",
    label: "Performance & scalability",
    note: "Built reusable frontend patterns that improved maintainability and production performance.",
    delta: "+20% gain",
    period: "release cycle",
    marker: "perf lift",
    visual: "performance",
    details: [
      "Built reusable component architectures and rendering patterns that scaled with product needs.",
      "Improved maintainability so feature development could move faster without adding UI inconsistency.",
      "Kept performance, scalability, and code clarity moving together instead of treating them as separate chores.",
    ],
    icon: FiBarChart2,
  },
  {
    value: "15%",
    label: "Interaction lift",
    note: "Improved engagement by making workflows clearer, faster, and easier to complete.",
    delta: "+15% usage",
    period: "product surface",
    marker: "user action",
    visual: "engagement",
    details: [
      "Designed intuitive, responsive interfaces across desktop and mobile applications.",
      "Streamlined multi-step workflows and reduced interaction friction in important product journeys.",
      "Delivered consistent experiences that made user actions feel clearer and more trustworthy.",
    ],
    icon: FiTrendingUp,
  },
];
