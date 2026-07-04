"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const scrollOffset = 82;
const scrollDuration = 950;

function easeInOutCubic(progress: number) {
  return progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function scrollToTarget(target: HTMLElement, replaceHash?: string) {
  const startY = window.scrollY;
  const targetY = Math.max(
    target.getBoundingClientRect().top + window.scrollY - scrollOffset,
    0,
  );
  const distance = targetY - startY;
  const startedAt = window.performance.now();

  if (prefersReducedMotion() || Math.abs(distance) < 4) {
    window.scrollTo(0, targetY);
    return;
  }

  const tick = (now: number) => {
    const elapsed = now - startedAt;
    const progress = Math.min(elapsed / scrollDuration, 1);
    const eased = easeInOutCubic(progress);

    window.scrollTo(0, startY + distance * eased);

    if (progress < 1) {
      window.requestAnimationFrame(tick);
    } else if (replaceHash) {
      window.history.replaceState(null, "", replaceHash);
    }
  };

  window.requestAnimationFrame(tick);
}

export function SmoothAnchorScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        event.button !== 0
      ) {
        return;
      }

      const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>(
        "a[href*='#']",
      );

      if (!anchor) {
        return;
      }

      const url = new URL(anchor.href);

      if (
        url.origin !== window.location.origin ||
        url.pathname !== window.location.pathname ||
        !url.hash
      ) {
        return;
      }

      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));

      if (!target) {
        return;
      }

      event.preventDefault();
      window.history.pushState(null, "", url.hash);
      scrollToTarget(target);
    };

    document.addEventListener("click", onClick);

    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!window.location.hash) {
      return;
    }

    const timer = window.setTimeout(() => {
      const target = document.getElementById(
        decodeURIComponent(window.location.hash.slice(1)),
      );

      if (target) {
        scrollToTarget(target, window.location.hash);
      }
    }, 120);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  return null;
}
