"use client";

import { AnimatePresence, easeOut, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { FiArrowUpRight, FiCommand, FiSearch, FiX } from "react-icons/fi";
import { commandPaletteItems } from "@/app/data/commandPalette";

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9+#.]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function scrollToHash(hash: string) {
  const target = document.querySelector(hash);

  if (!target) {
    return;
  }

  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const filteredItems = useMemo(() => {
    const cleanQuery = normalize(query);

    if (!cleanQuery) {
      return commandPaletteItems;
    }

    const queryParts = cleanQuery.split(" ").filter(Boolean);

    return commandPaletteItems.filter((item) => {
      const searchableText = normalize(
        `${item.title} ${item.description} ${item.group} ${(item.keywords ?? []).join(" ")}`,
      );

      return queryParts.every((part) => searchableText.includes(part));
    });
  }, [query]);

  const groupedItems = useMemo(() => {
    return filteredItems.reduce<Record<string, typeof filteredItems>>(
      (groups, item) => {
        groups[item.group] = [...(groups[item.group] ?? []), item];
        return groups;
      },
      {},
    );
  }, [filteredItems]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const isCommandK = (event.metaKey || event.ctrlKey) && event.key === "k";

      if (isCommandK) {
        event.preventDefault();
        setIsOpen((current) => !current);
      }

      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      return;
    }

    const frame = requestAnimationFrame(() => inputRef.current?.focus());

    return () => cancelAnimationFrame(frame);
  }, [isOpen]);

  const openItem = (href: string) => {
    setIsOpen(false);

    const [targetPath, hash] = href.split("#");
    const normalizedPath = targetPath || "/";

    if (normalizedPath === pathname && hash) {
      history.replaceState(null, "", `${normalizedPath}#${hash}`);
      window.setTimeout(() => scrollToHash(`#${hash}`), 0);
      return;
    }

    router.push(href);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="hidden min-h-9 items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 text-[0.72rem] font-semibold text-zinc-700 transition-[background-color,border-color,color] duration-200 hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-950 dark:border-zinc-800 dark:bg-background dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-zinc-950 dark:hover:text-white sm:inline-flex"
      >
        <FiSearch className="h-3.5 w-3.5" />
        Search
        <span className="ml-1 inline-flex items-center gap-1 rounded-md border border-zinc-200 px-1.5 py-0.5 font-mono text-[0.58rem] text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
          <FiCommand className="h-2.5 w-2.5" />K
        </span>
      </button>

      <button
        type="button"
        aria-label="Open search"
        onClick={() => setIsOpen(true)}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-700 transition-[background-color,border-color,color] duration-200 hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-950 dark:border-zinc-800 dark:bg-background dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-zinc-950 dark:hover:text-white sm:hidden"
      >
        <FiSearch className="h-4 w-4" />
      </button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="fixed inset-0 z-[130] flex items-start justify-center bg-[#151719]/16 px-3 pt-20 backdrop-blur-[2px] dark:bg-black/45 sm:pt-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: easeOut }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Command search"
              className="w-full max-w-xl overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_24px_80px_rgba(15,15,15,0.18)] dark:border-zinc-800 dark:bg-background dark:shadow-[0_28px_90px_rgba(0,0,0,0.6)]"
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.22, ease: easeOut }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center gap-3 border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
                <FiSearch className="h-4 w-4 shrink-0 text-zinc-400" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search sections, pages, impact, work..."
                  className="h-9 flex-1 bg-transparent text-[0.9rem] font-medium text-zinc-950 outline-none placeholder:text-zinc-400 dark:text-white"
                />
                <button
                  type="button"
                  aria-label="Close search"
                  onClick={() => setIsOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 text-zinc-500 transition-colors hover:border-zinc-300 hover:text-zinc-950 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-white"
                >
                  <FiX className="h-4 w-4" />
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-2">
                {filteredItems.length ? (
                  Object.entries(groupedItems).map(([group, items]) => (
                    <div key={group} className="py-2">
                      <p className="px-2 pb-1 font-mono text-[0.56rem] font-semibold uppercase tracking-[0.16em] text-zinc-400">
                        {group}
                      </p>
                      <div className="space-y-1">
                        {items.map((item) => (
                          <button
                            key={`${item.group}-${item.href}`}
                            type="button"
                            onClick={() => openItem(item.href)}
                            className="group grid w-full grid-cols-[1fr_auto] gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-900"
                          >
                            <span className="min-w-0">
                              <span className="block text-[0.84rem] font-semibold text-zinc-950 dark:text-white">
                                {item.title}
                              </span>
                              <span className="mt-0.5 block truncate text-[0.7rem] font-medium text-zinc-500 dark:text-zinc-400">
                                {item.description}
                              </span>
                            </span>
                            <span className="mt-1 flex h-7 w-7 items-center justify-center rounded-lg border border-zinc-200 text-zinc-400 transition-colors group-hover:border-zinc-300 group-hover:text-zinc-950 dark:border-zinc-800 dark:group-hover:border-zinc-700 dark:group-hover:text-white">
                              <FiArrowUpRight className="h-3.5 w-3.5" />
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-8 text-center">
                    <p className="text-[0.84rem] font-semibold text-zinc-950 dark:text-white">
                      No match found
                    </p>
                    <p className="mt-1 text-[0.72rem] font-medium text-zinc-500 dark:text-zinc-400">
                      Try “work”, “impact”, “skills”, or “contact”.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
