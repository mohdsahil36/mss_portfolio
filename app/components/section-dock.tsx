"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ListTree } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const dockSections = [
  { label: "Home", href: "#home" },
  { label: "Work experience", href: "#work" },
  { label: "Side projects", href: "#projects" },
  { label: "Tech stack", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Coding profiles", href: "#beyond-code" },
  { label: "Contact", href: "#contact" },
];

export function SectionDock() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeHref, setActiveHref] = useState(dockSections[0].href);
  const activeIndex = Math.max(
    dockSections.findIndex((item) => item.href === activeHref),
    0,
  );
  const activeSection = dockSections[activeIndex];
  const sectionIds = useMemo(
    () => dockSections.map((item) => item.href.replace("#", "")),
    [],
  );
  const springTransition = {
    type: "spring" as const,
    stiffness: 420,
    damping: 34,
    mass: 0.8,
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries[0]?.target.id) {
          setActiveHref(`#${visibleEntries[0].target.id}`);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0.08, 0.18, 0.32],
      },
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  const navigateTo = (href: string) => {
    const target = document.querySelector(href);

    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", href);
      setActiveHref(href);
      setIsOpen(false);
    }
  };

  return (
    <div className="fixed inset-x-0 bottom-4 z-[75] flex justify-center px-4 md:bottom-6">
      <div className="w-full max-w-[25rem]">
        <AnimatePresence>
          {isOpen ? (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.985 }}
              transition={springTransition}
              className="mb-2 overflow-hidden rounded-[1.65rem] border border-white/10 bg-[#0a0a0a] text-white shadow-[0_24px_70px_rgba(0,0,0,0.25)]"
            >
              <div className="max-h-[min(22rem,60vh)] overflow-y-auto p-2">
                <div className="flex items-center justify-between px-3 pb-2 pt-1.5">
                  <p className="font-mono text-[0.56rem] font-semibold uppercase tracking-[0.2em] text-white/40">
                    Sections
                  </p>
                  <span className="font-mono text-[0.62rem] font-semibold text-white/38">
                    {activeIndex + 1}/{dockSections.length}
                  </span>
                </div>

                <div className="space-y-1">
                  {dockSections.map((item) => {
                    const isActive = item.href === activeHref;
                    const itemIndex = dockSections.findIndex(
                      (section) => section.href === item.href,
                    );

                    return (
                      <button
                        key={item.href}
                        type="button"
                        onClick={() => navigateTo(item.href)}
                        className={`group flex min-h-9 w-full items-center gap-2.5 rounded-full px-3 text-left text-[0.8rem] font-semibold transition-[background-color,color] duration-200 ${
                          isActive
                            ? "bg-white text-[#0a0a0a]"
                            : "text-white/62 hover:bg-white/8 hover:text-white"
                        }`}
                      >
                        <span
                          className={`font-mono text-[0.62rem] ${
                            isActive ? "text-black/45" : "text-white/32"
                          }`}
                        >
                          {String(itemIndex + 1).padStart(2, "0")}
                        </span>
                        <span className="min-w-0 flex-1 truncate">
                          {item.label}
                        </span>
                        <span
                          className={`h-1.5 w-1.5 rounded-full transition-colors duration-200 ${
                            isActive
                              ? "bg-[#0a0a0a]"
                              : "bg-transparent group-hover:bg-white/35"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <motion.button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          layout
          transition={springTransition}
          className="w-full overflow-hidden rounded-full border border-white/10 bg-[#0a0a0a] text-white shadow-[0_18px_48px_rgba(0,0,0,0.22)]"
          aria-label={
            isOpen ? "Close section navigator" : "Open section navigator"
          }
          aria-expanded={isOpen}
        >
          <div className="flex min-h-13 items-center gap-2.5 px-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/8 text-white/72 transition-colors duration-200">
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={springTransition}
                className="flex"
              >
                {isOpen ? (
                  <ChevronDown className="h-3.5 w-3.5" />
                ) : (
                  <ListTree className="h-3.5 w-3.5" />
                )}
              </motion.span>
            </span>

            <span className="relative min-w-0 flex-1 overflow-hidden text-left">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={activeSection.href}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.16, ease: "easeOut" }}
                  className="block"
                >
                  <span className="block truncate text-[0.84rem] font-semibold leading-none">
                    {activeSection.label}
                  </span>
                  <span className="mt-1 block font-mono text-[0.52rem] font-semibold uppercase tracking-[0.18em] text-white/36">
                    Current section
                  </span>
                </motion.span>
              </AnimatePresence>
            </span>

            <span className="relative flex h-7 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/8 font-mono text-[0.64rem] font-semibold tabular-nums text-white/54">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={activeIndex}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.14, ease: "easeOut" }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {activeIndex + 1}/{dockSections.length}
                </motion.span>
              </AnimatePresence>
            </span>
          </div>
        </motion.button>
      </div>
    </div>
  );
}
