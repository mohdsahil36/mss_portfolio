import type { IconType } from "react-icons";
import {
  FiActivity,
  FiBarChart2,
  FiCheckCircle,
  FiCpu,
  FiGlobe,
  FiTrendingUp,
} from "react-icons/fi";

export type ImpactMetric = {
  value: string;
  label: string;
  note: string;
  icon: IconType;
};

export const impactSection = {
  title: "Meaningful impact",
  summary:
    "A few numbers from products I have worked on. Not trophy-wall energy, just useful proof that the work held up outside the local machine.",
  icon: FiTrendingUp,
};

export const impactMetrics: ImpactMetric[] = [
  {
    value: "16M+",
    label: "platform users served",
    note: "Contributed to product surfaces built for serious scale and everyday traffic.",
    icon: FiGlobe,
  },
  {
    value: "50%",
    label: "faster page loads",
    note: "Improved frontend loading behavior so screens felt noticeably quicker.",
    icon: FiActivity,
  },
  {
    value: "93%",
    label: "API load-time reduction",
    note: "Helped reduce backend/API wait time through practical optimization work.",
    icon: FiCpu,
  },
  {
    value: "90%",
    label: "Reduced issue reporting",
    note: "Reduced recurring frontend issues through fixes, UI polish, and targeted optimization work.",
    icon: FiCheckCircle,
  },
  {
    value: "20%",
    label: "performance improvement",
    note: "Improved application performance across production-facing frontend work.",
    icon: FiBarChart2,
  },
  {
    value: "15%",
    label: "engagement increase",
    note: "Shipped UI improvements that helped users interact more with the product.",
    icon: FiTrendingUp,
  },
];
