"use client";

import { sectionDockItems, workExperienceDockItems } from "@/app/data/dock";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

export function ScrollProgress() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [isScrollingDown, setIsScrollingDown] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [marker, setMarker] = useState({ x: 0, y: 0 });
  const [routeSections, setRouteSections] = useState<
    { side: "left" | "right"; x: number; innerX: number; top: number; bottom: number }[]
  >([]);
  const routeRef = useRef<SVGPathElement>(null);
  const routeSectionIds = useMemo(() => {
    const items =
      pathname === "/work-experience" ? workExperienceDockItems : sectionDockItems;

    return items.map((item) => item.href.replace("#", ""));
  }, [pathname]);

  useEffect(() => {
    let previousScrollTop = window.scrollY;
    let frameId = 0;

    const measureSections = () => {
      const width = window.innerWidth;
      const edgeOffset = width >= 1280 ? 42 : 30;
      const wrapOffset = width >= 1280 ? 16 : 12;
      const scrollTop = window.scrollY;

      setRouteSections(
        routeSectionIds
        .map((id, index) => {
          const element = document.getElementById(id);
          if (!element) return null;

          const rect = element.getBoundingClientRect();

          const side = index % 2 === 0 ? "left" : "right";
          const rawX =
            side === "left" ? rect.left - edgeOffset : rect.right + edgeOffset;
          const x = Math.min(Math.max(rawX, 20), width - 20);
          const innerX =
            side === "left"
              ? Math.min(x + wrapOffset, rect.left - 10)
              : Math.max(x - wrapOffset, rect.right + 10);
          const top = rect.top + scrollTop - 10;
          const bottom = rect.bottom + scrollTop + 10;

          if (bottom <= top) return null;

          return { side, x, innerX, top, bottom };
        })
        .filter(
          (
            section,
          ): section is {
            side: "left" | "right";
            x: number;
            innerX: number;
            top: number;
            bottom: number;
          } =>
            Boolean(section),
        ),
      );
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
        measureSections();
        updateProgress();
      });
    };

    measureSections();
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
  }, [routeSectionIds]);

  const routePath = useMemo(() => {
    if (routeSections.length === 0) return "";

    return routeSections.reduce((path, section, index) => {
      if (index === 0) {
        return `M ${section.x} ${section.top} L ${section.x} ${section.bottom}`;
      }

      const previous = routeSections[index - 1];
      const gap = section.top - previous.bottom;

      if (gap < 48) {
        return `${path} M ${section.x} ${section.top} L ${section.x} ${section.bottom}`;
      }

      const connectorY = previous.bottom + gap / 2;

      return [
        path,
        `L ${previous.x} ${connectorY}`,
        `L ${previous.innerX} ${connectorY}`,
        `M ${section.innerX} ${connectorY}`,
        `L ${section.x} ${connectorY}`,
        `L ${section.x} ${section.top}`,
        `L ${section.x} ${section.bottom}`,
      ].join(" ");
    }, "");
  }, [routeSections]);

  useEffect(() => {
    const route = routeRef.current;

    if (!route || !routePath) return;

    const length = route.getTotalLength();
    const point = route.getPointAtLength((length * progress) / 100);

    setMarker({ x: point.x, y: point.y });
  }, [progress, routePath]);

  return (
    <>
      <svg
        className="pointer-events-none fixed inset-0 z-[54] hidden h-screen w-screen lg:block"
        viewBox={`0 0 ${viewport.width || 1} ${viewport.height || 1}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {routePath ? (
          <g transform={`translate(0 ${-scrollY})`}>
            <path
              ref={routeRef}
              d={routePath}
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
              className="text-[hsl(var(--background))] dark:text-[hsl(var(--background))]"
            />
            <path
              d={routePath}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#151719]/8 dark:text-white/10"
            />
            <path
              d={routePath}
              fill="none"
              pathLength={100}
              stroke="currentColor"
              strokeWidth="1.45"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="100"
              className="text-[#151719]/30 transition-[stroke-dashoffset] duration-150 ease-out dark:text-white/34"
              style={{
                strokeDashoffset: 100 - progress,
              }}
            />
            <circle
              cx={marker.x}
              cy={marker.y}
              r="4.2"
              className="fill-[hsl(var(--background))] stroke-[#151719]/18 stroke-[1.1] transition-[opacity,transform] duration-200 dark:stroke-white/22"
              style={{
                opacity: progress > 1 ? 1 : 0,
                transform: `scale(${isScrollingDown ? 1 : 0.9})`,
                transformBox: "fill-box",
                transformOrigin: "center",
              }}
            />
            <circle
              cx={marker.x}
              cy={marker.y}
              r="1.65"
              className="fill-[#151719]/70 transition-opacity duration-200 dark:fill-white/75"
              style={{
                opacity: progress > 1 ? 1 : 0,
                transformBox: "fill-box",
                transformOrigin: "center",
              }}
            />
          </g>
        ) : null}
      </svg>
    </>
  );
}
