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
    "A few numbers from products I have worked on. Not trophy-wall energy, just useful proof that the work held up outside the local machine.",
  icon: FiTrendingUp,
};

export const impactMetrics: ImpactMetric[] = [
  {
    value: "16M+",
    label: "platform users served",
    note: "Contributed to product surfaces built for serious scale and everyday traffic.",
    delta: "scale proven",
    period: "production reach",
    marker: "high traffic",
    visual: "reach",
    details: [
      "Worked on production-facing web surfaces used across high-traffic ecommerce journeys.",
      "Kept reusable components and state flows predictable so large product pages stayed maintainable.",
      "Improved frontend quality around rendering, interaction states, and page reliability.",
    ],
    icon: FiGlobe,
  },
  {
    value: "50%",
    label: "faster page loads",
    note: "Improved frontend loading behavior so screens felt noticeably quicker.",
    delta: "+50% speed",
    period: "frontend pass",
    marker: "faster screens",
    visual: "speed",
    details: [
      "Reduced unnecessary renders and tightened component/state boundaries.",
      "Improved loading states and interaction flow so users reached useful content faster.",
      "Cleaned expensive UI paths that were slowing down production-facing screens.",
    ],
    icon: FiActivity,
  },
  {
    value: "93%",
    label: "API load-time reduction",
    note: "Helped reduce backend/API wait time through practical optimization work.",
    delta: "93% less wait",
    period: "critical flows",
    marker: "API response",
    visual: "latency",
    details: [
      "Optimized critical backend workflows and reduced avoidable response-time overhead.",
      "Worked through large Node.js modules and improved slow paths without changing user-facing behavior.",
      "Validated improvements around the workflows that directly affected page wait time.",
    ],
    icon: FiCpu,
  },
  {
    value: "90%",
    label: "Reduced issue reporting",
    note: "Reduced recurring frontend issues through fixes, UI polish, and targeted optimization work.",
    delta: "90% quieter",
    period: "support signal",
    marker: "fewer repeats",
    visual: "quality",
    details: [
      "Fixed repeated UI bugs and edge cases that were creating recurring support noise.",
      "Improved component consistency so the same interaction did not behave differently across screens.",
      "Polished broken states, validations, and user flows that were easy to miss but visible in production.",
    ],
    icon: FiCheckCircle,
  },
  {
    value: "20%",
    label: "performance improvement",
    note: "Improved application performance across production-facing frontend work.",
    delta: "+20% gain",
    period: "release cycle",
    marker: "perf lift",
    visual: "performance",
    details: [
      "Improved rendering behavior across React screens with better component structure.",
      "Reduced frontend overhead in areas with heavy state and repeated UI updates.",
      "Balanced performance work with maintainability so changes stayed easy to extend.",
    ],
    icon: FiBarChart2,
  },
  {
    value: "15%",
    label: "engagement increase",
    note: "Shipped UI improvements that helped users interact more with the product.",
    delta: "+15% usage",
    period: "product surface",
    marker: "user action",
    visual: "engagement",
    details: [
      "Improved UI clarity and interaction feedback across user-facing journeys.",
      "Reduced friction in important flows so actions felt easier and more obvious.",
      "Shipped visual and usability refinements that made the product experience feel more trustworthy.",
    ],
    icon: FiTrendingUp,
  },
];
