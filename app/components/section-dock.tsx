"use client";

import { sectionDockItems, workExperienceDockItems } from "@/app/data/dock";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ListTree } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export function SectionDock() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const dockItems = useMemo(() => {
    if (pathname === "/work-experience") return workExperienceDockItems;
    if (pathname === "/") return sectionDockItems;
    return [];
  }, [pathname]);
  const [activeHref, setActiveHref] = useState(sectionDockItems[0].href);
  const activeIndex = Math.max(
    dockItems.findIndex((item) => item.href === activeHref),
    0,
  );
  const activeSection = dockItems[activeIndex] ?? dockItems[0];
  const sectionIds = useMemo(
    () => dockItems.map((item) => item.href.replace("#", "")),
    [dockItems],
  );

  const shouldShowDock = dockItems.length > 0;

  useEffect(() => {
    if (!shouldShowDock) return;

    setActiveHref(dockItems[0].href);
  }, [dockItems, shouldShowDock]);

  useEffect(() => {
    if (!shouldShowDock) return;

    let frameId = 0;

    const updateActiveSection = () => {
      const anchorLine = window.innerHeight * 0.34;
      let nextHref = dockItems[0].href;

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (!element) continue;

        const rect = element.getBoundingClientRect();

        if (rect.top <= anchorLine) {
          nextHref = `#${id}`;
        } else {
          break;
        }
      }

      setActiveHref((currentHref) =>
        currentHref === nextHref ? currentHref : nextHref,
      );
    };

    const requestUpdate = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [dockItems, sectionIds, shouldShowDock]);

  const navigateTo = (href: string) => {
    const target = document.querySelector(href);

    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", href);
      setActiveHref(href);
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      {shouldShowDock && activeSection ? (
        <nav
          aria-label="Section navigation"
          className="fixed right-3 top-1/2 z-[65] hidden -translate-y-1/2 md:block"
        >
        <div className="relative rounded-full border border-[#e8e8e8] bg-[hsl(var(--background))]/96 p-1.5 shadow-[0_16px_45px_rgba(15,15,15,0.08)] backdrop-blur dark:border-zinc-800 dark:shadow-[0_16px_45px_rgba(0,0,0,0.28)]">
          <div className="flex flex-col gap-1">
            {dockItems.map((item, index) => {
              const isActive = item.href === activeHref;

              return (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => navigateTo(item.href)}
                  title={item.label}
                  aria-label={`Go to ${item.label}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`group relative flex h-8 w-8 items-center justify-center rounded-full text-[0.58rem] font-semibold transition-[background-color,color,transform] duration-200 hover:scale-105 ${
                    isActive
                      ? "bg-[#151719] text-white dark:bg-white dark:text-black"
                      : "text-[#9a9da5] hover:bg-[#f4f4f4] hover:text-[#151719] dark:hover:bg-zinc-900 dark:hover:text-white"
                  }`}
                >
                  <span className="font-mono tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <AnimatePresence initial={false}>
                    {isActive ? (
                      <motion.span
                        key={`${item.href}-active-label`}
                        initial={{ opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 8 }}
                        transition={{ duration: 0.16, ease: "easeOut" }}
                        className="pointer-events-none absolute right-full top-1/2 mr-2 block -translate-y-1/2 whitespace-nowrap rounded-full border border-[#e8e8e8] bg-[hsl(var(--background))] px-3 py-2 text-[0.72rem] font-semibold text-[#151719] shadow-[0_10px_28px_rgba(15,15,15,0.08)] dark:border-zinc-800 dark:text-white dark:shadow-[0_10px_28px_rgba(0,0,0,0.35)]"
                      >
                        {item.label}
                      </motion.span>
                    ) : (
                      <span className="pointer-events-none absolute right-full top-1/2 mr-2 hidden -translate-y-1/2 whitespace-nowrap rounded-full border border-[#e8e8e8] bg-[hsl(var(--background))] px-2.5 py-1.5 text-[0.68rem] font-semibold text-[#151719] opacity-0 shadow-[0_10px_24px_rgba(15,15,15,0.08)] transition-opacity duration-200 group-hover:opacity-100 md:block dark:border-zinc-800 dark:text-white">
                        {item.label}
                      </span>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>
        </div>
        </nav>
      ) : null}

      {shouldShowDock && activeSection ? (
        <nav
          aria-label="Mobile section navigation"
          className="fixed inset-x-3 bottom-3 z-[75] md:hidden"
        >
        <div className="w-full">
          <AnimatePresence>
            {isMobileOpen ? (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.985 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="mb-2 overflow-hidden rounded-[1.45rem] border border-white/10 bg-[#0a0a0a] text-white shadow-[0_24px_70px_rgba(0,0,0,0.25)]"
              >
                <div className="max-h-[min(22rem,58vh)] overflow-y-auto p-2">
                  <div className="flex items-center justify-between px-3 pb-2 pt-1.5">
                    <p className="font-mono text-[0.56rem] font-semibold uppercase tracking-[0.2em] text-white/40">
                      Quest map
                    </p>
                    <span className="font-mono text-[0.62rem] font-semibold text-white/38">
                      {activeIndex + 1}/{dockItems.length}
                    </span>
                  </div>

                  <div className="space-y-1">
                    {dockItems.map((item, index) => {
                      const isActive = item.href === activeHref;

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
                            {String(index + 1).padStart(2, "0")}
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
            onClick={() => setIsMobileOpen((value) => !value)}
            layout
            transition={{ type: "spring", stiffness: 420, damping: 34 }}
            className="w-full overflow-hidden rounded-full border border-white/10 bg-[#0a0a0a] text-white shadow-[0_18px_48px_rgba(0,0,0,0.22)]"
            aria-label={
              isMobileOpen
                ? "Close section navigator"
                : "Open section navigator"
            }
            aria-expanded={isMobileOpen}
          >
            <div className="flex min-h-13 items-center gap-2.5 px-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/8 text-white/72 transition-colors duration-200">
                <motion.span
                  animate={{ rotate: isMobileOpen ? 180 : 0 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="flex"
                >
                  {isMobileOpen ? (
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
                      Active checkpoint
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
                    {activeIndex + 1}/{dockItems.length}
                  </motion.span>
                </AnimatePresence>
              </span>
            </div>
          </motion.button>
        </div>
        </nav>
      ) : null}
    </>
  );
}
