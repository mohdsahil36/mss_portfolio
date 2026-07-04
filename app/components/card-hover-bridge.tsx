"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type HoverFrame = {
  opacity: number;
  x: number;
  y: number;
  width: number;
  height: number;
  radius: number;
};

const initialFrame: HoverFrame = {
  opacity: 0,
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  radius: 12,
};

const cardSelector = [
  "[data-card-hover]",
  "main article[role='button']",
  "main article[class*='border']",
  "main div[class*='rounded-xl'][class*='border']",
  "main div[class*='rounded-2xl'][class*='border']",
].join(",");

function getHoverCard(target: EventTarget | null) {
  if (!(target instanceof Element)) {
    return null;
  }

  const card = target.closest<HTMLElement>(cardSelector);

  if (!card || card.closest("[role='dialog']")) {
    return null;
  }

  const rect = card.getBoundingClientRect();
  const isExplicitTarget = card.hasAttribute("data-card-hover");

  if (!isExplicitTarget && (rect.width < 80 || rect.height < 48)) {
    return null;
  }

  if (isExplicitTarget && (rect.width < 32 || rect.height < 20)) {
    return null;
  }

  return card;
}

function getFrame(card: HTMLElement): HoverFrame {
  const rect = card.getBoundingClientRect();
  const isExplicitTarget = card.hasAttribute("data-card-hover");
  const offset = isExplicitTarget ? 2 : 5;

  return {
    opacity: 1,
    x: rect.left - offset,
    y: rect.top - offset,
    width: rect.width + offset * 2,
    height: rect.height + offset * 2,
    radius: isExplicitTarget ? 10 : 16,
  };
}

export function CardHoverBridge() {
  const pathname = usePathname();
  const [frame, setFrame] = useState<HoverFrame>(initialFrame);
  const [activeCard, setActiveCard] = useState<HTMLElement | null>(null);
  const canActivateAtRef = useRef(0);
  const isScrollingRef = useRef(false);
  const scrollTimerRef = useRef<number | null>(null);

  useEffect(() => {
    canActivateAtRef.current = window.performance.now() + 850;
    setActiveCard(null);
    setFrame((current) => ({ ...current, opacity: 0 }));
  }, [pathname]);

  useEffect(() => {
    const canActivate = () =>
      window.performance.now() >= canActivateAtRef.current &&
      !isScrollingRef.current;

    const showCard = (card: HTMLElement | null) => {
      if (!card || !canActivate()) {
        setActiveCard(null);
        setFrame((current) => ({ ...current, opacity: 0 }));
        return;
      }

      setActiveCard(card);
      setFrame(getFrame(card));
    };

    const onPointerOver = (event: PointerEvent) => {
      showCard(getHoverCard(event.target));
    };

    const onPointerOut = (event: PointerEvent) => {
      if (!activeCard) {
        return;
      }

      const nextTarget = event.relatedTarget;

      if (nextTarget instanceof Node && activeCard.contains(nextTarget)) {
        return;
      }

      if (getHoverCard(nextTarget)) {
        return;
      }

      showCard(null);
    };

    const onFocusIn = (event: FocusEvent) => {
      showCard(getHoverCard(event.target));
    };

    const onFocusOut = (event: FocusEvent) => {
      if (!activeCard) {
        return;
      }

      const nextTarget = event.relatedTarget;

      if (nextTarget instanceof Node && activeCard.contains(nextTarget)) {
        return;
      }

      if (getHoverCard(nextTarget)) {
        return;
      }

      showCard(null);
    };

    const markScrolling = () => {
      isScrollingRef.current = true;
      setFrame((current) => ({ ...current, opacity: 0 }));

      if (scrollTimerRef.current) {
        window.clearTimeout(scrollTimerRef.current);
      }

      scrollTimerRef.current = window.setTimeout(() => {
        isScrollingRef.current = false;
      }, 180);
    };

    const refreshFrame = () => {
      setFrame((current) =>
        activeCard && canActivate()
          ? getFrame(activeCard)
          : { ...current, opacity: 0 },
      );
    };

    document.addEventListener("pointerover", onPointerOver, true);
    document.addEventListener("pointerout", onPointerOut, true);
    document.addEventListener("focusin", onFocusIn, true);
    document.addEventListener("focusout", onFocusOut, true);
    window.addEventListener("resize", refreshFrame);
    window.addEventListener("scroll", markScrolling, true);

    return () => {
      document.removeEventListener("pointerover", onPointerOver, true);
      document.removeEventListener("pointerout", onPointerOut, true);
      document.removeEventListener("focusin", onFocusIn, true);
      document.removeEventListener("focusout", onFocusOut, true);
      window.removeEventListener("resize", refreshFrame);
      window.removeEventListener("scroll", markScrolling, true);

      if (scrollTimerRef.current) {
        window.clearTimeout(scrollTimerRef.current);
      }
    };
  }, [activeCard]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[48] hidden border border-[#151719]/14 bg-[#151719]/[0.012] shadow-[0_14px_34px_rgba(15,15,15,0.035)] md:block dark:border-white/12 dark:bg-white/[0.018] dark:shadow-[0_16px_40px_rgba(0,0,0,0.2)]"
      initial={false}
      animate={{
        opacity: frame.opacity,
        x: frame.x,
        y: frame.y,
        width: frame.width,
        height: frame.height,
        borderRadius: frame.radius,
      }}
      transition={{
        opacity: { duration: frame.opacity ? 0.14 : 0.16, ease: "easeOut" },
        x: { type: "spring", stiffness: 320, damping: 42, mass: 0.9 },
        y: { type: "spring", stiffness: 320, damping: 42, mass: 0.9 },
        width: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
        height: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
        borderRadius: { duration: 0.16, ease: "easeOut" },
      }}
      style={{
        willChange: "transform, width, height, opacity, border-radius",
      }}
    />
  );
}
