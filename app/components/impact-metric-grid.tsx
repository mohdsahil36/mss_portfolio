"use client";

import { impactMetrics } from "@/app/data/impact";
import { ImpactMetricCard } from "./impact-metric-card";

export function ImpactMetricGrid() {
  return (
    <div className="grid auto-rows-fr gap-3 sm:grid-cols-2">
      {impactMetrics.map((metric, index) => (
        <ImpactMetricCard
          key={`${metric.value}-${metric.label}`}
          metric={metric}
          index={index}
        />
      ))}
    </div>
  );
}
