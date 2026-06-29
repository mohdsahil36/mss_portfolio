"use client";

import {
  impactLogDockItems,
  sectionDockItems,
  workExperienceDockItems,
} from "@/app/data/dock";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type RailSection = {
  y: number;
  isFirst: boolean;
};

type Rail = {
  x: number;
  top: number;
  bottom: number;
  sections: RailSection[];
};

export function ScrollProgress() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [isScrollingDown, setIsScrollingDown] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [rail, setRail] = useState<Rail | null>(null);
  const sectionIds = useMemo(() => {
    const items =
      pathname === "/work-experience"
        ? workExperienceDockItems
        : pathname === "/impact-log"
          ? impactLogDockItems
          : sectionDockItems;

    return items.map((item) => item.href.replace("#", ""));
  }, [pathname]);

  useEffect(() => {
    let previousScrollTop = window.scrollY;
    let frameId = 0;

    const measureRail = () => {
      const width = window.innerWidth;
      const scrollTop = window.scrollY;
      const measuredSections = sectionIds
        .map((id, index) => {
          const element = document.getElementById(id);
          if (!element) return null;

          const rect = element.getBoundingClientRect();
          const y = rect.top + scrollTop + 18;

          return {
            rect,
            y,
            isFirst: index === 0,
          };
        })
        .filter(
          (
            section,
          ): section is {
            rect: DOMRect;
            y: number;
            isFirst: boolean;
          } => Boolean(section),
        );

      if (measuredSections.length === 0) {
        setRail(null);
        return;
      }

      const first = measuredSections[0];
      const last = measuredSections[measuredSections.length - 1];
      const sideOffset = width >= 1280 ? 34 : 24;
      const x = Math.min(
        Math.max(first.rect.left - sideOffset, 18),
        width - 18,
      );
      const top = first.rect.top + scrollTop;
      const bottom = last.rect.bottom + scrollTop;

      setRail({
        x,
        top,
        bottom,
        sections: measuredSections.map(({ y, isFirst }) => ({ y, isFirst })),
      });
    };

    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      setIsScrollingDown(scrollTop >= previousScrollTop);
      previousScrollTop = scrollTop;
      setScrollY(scrollTop);
      setProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    const requestUpdate = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateProgress);
    };

    const requestMeasure = () => {
      window.requestAnimationFrame(() => {
        measureRail();
        updateProgress();
      });
    };

    measureRail();
    updateProgress();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestMeasure);
    window.addEventListener("load", requestMeasure);
    const measureTimer = window.setTimeout(requestMeasure, 450);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestMeasure);
      window.removeEventListener("load", requestMeasure);
      window.clearTimeout(measureTimer);
    };
  }, [sectionIds]);

  const railHeight = rail ? rail.bottom - rail.top : 0;
  const activeY = rail ? rail.top + railHeight * (progress / 100) : 0;

  return (
    <svg
      className="pointer-events-none fixed inset-0 z-[54] hidden h-screen w-screen lg:block"
      viewBox={`0 0 ${viewport.width || 1} ${viewport.height || 1}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {rail && railHeight > 0 ? (
        <g transform={`translate(0 ${-scrollY})`}>
          <line
            x1={rail.x}
            x2={rail.x}
            y1={rail.top}
            y2={rail.bottom}
            className="stroke-[#151719]/8 dark:stroke-white/10"
            strokeWidth="1.1"
            strokeLinecap="round"
          />
          <line
            x1={rail.x}
            x2={rail.x}
            y1={rail.top}
            y2={activeY}
            className="stroke-[#151719]/32 transition-[y2] duration-150 ease-out dark:stroke-white/35"
            strokeWidth="1.45"
            strokeLinecap="round"
          />
          {rail.sections.map((section, index) => (
            <circle
              key={`${section.y}-${index}`}
              cx={rail.x}
              cy={section.y}
              r={section.isFirst ? 2 : 1.5}
              className="fill-[hsl(var(--background))] stroke-[#151719]/18 stroke-[1] dark:stroke-white/20"
            />
          ))}
          <circle
            cx={rail.x}
            cy={activeY}
            r="4.3"
            className="fill-[hsl(var(--background))] stroke-[#151719]/18 stroke-[1.1] transition-[opacity,transform] duration-200 dark:stroke-white/22"
            style={{
              opacity: progress > 1 ? 1 : 0,
              transform: `scale(${isScrollingDown ? 1 : 0.9})`,
              transformBox: "fill-box",
              transformOrigin: "center",
            }}
          />
          <circle
            cx={rail.x}
            cy={activeY}
            r="1.7"
            className="fill-[#151719]/70 transition-opacity duration-200 dark:fill-white/75"
            style={{ opacity: progress > 1 ? 1 : 0 }}
          />
        </g>
      ) : null}
    </svg>
  );
}
