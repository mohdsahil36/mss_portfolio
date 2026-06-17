"use client";

import Image from "next/image";
import { AnimatePresence, easeOut, motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { workExperience, workSection } from "@/app/data/workExperience";

export default function Work({ sectionIndex = 0 }: { sectionIndex?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.12 });
  const sectionDirection = sectionIndex % 2 === 0 ? -40 : 40;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <motion.section
      ref={ref}
      id="work"
      className="mt-5 scroll-mt-18 bg-white py-7 text-[#151719] dark:bg-neutral-950 dark:text-white"
      initial={{ opacity: 0, x: sectionDirection }}
      animate={
        isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: sectionDirection }
      }
      transition={{ duration: 0.45, ease: easeOut }}
    >
      <div className="mb-7 border-b border-[#ededed] pb-4 dark:border-zinc-800">
        <h2 className="text-[1.4rem] font-semibold leading-none sm:text-[1.6rem]">
          {workSection.title}
        </h2>
        <p className="mt-2 max-w-[28rem] text-[0.78rem] font-medium leading-5 text-[#747780] dark:text-zinc-400">
          {workSection.summary}
        </p>
      </div>

      <div className="space-y-3">
        {workExperience.map((item, index) => {
          const isOpen = openIndex === index;
          const isCurrent = item.type === "current";

          return (
            <motion.article
              key={item.company}
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{
                duration: 0.32,
                ease: easeOut,
                delay: index * 0.08,
              }}
              className="relative pl-6"
            >
              <span
                className={`absolute left-0 top-2 h-[5.35rem] w-px ${
                  isOpen
                    ? "bg-[#151719] dark:bg-white"
                    : "bg-[#eeeeee] dark:bg-zinc-800"
                }`}
                aria-hidden="true"
              />

              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="group w-full py-2.5 text-left"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2.5">
                      <span className="relative h-7 w-7 shrink-0 overflow-hidden rounded-md border border-[#e7e7e7] bg-white dark:border-zinc-800 dark:bg-black">
                        <Image
                          src={item.profile}
                          alt={item.imageAlt}
                          fill
                          sizes="28px"
                          className="object-cover"
                        />
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-[0.9rem] font-semibold leading-tight text-[#151719] dark:text-white sm:text-[0.98rem]">
                          {item.role} @ {item.company}
                        </h3>
                        <p className="mt-1 text-[0.76rem] font-medium text-[#747780] dark:text-zinc-400">
                          {item.location}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2.5">
                    <div className="text-right">
                      <p className="font-mono text-[0.72rem] font-semibold text-[#151719] dark:text-white">
                        {item.date}
                      </p>
                      <p
                        className={`mt-1 inline-flex items-center justify-end gap-1.5 rounded-sm border px-2 py-0.5 text-[0.62rem] font-semibold ${
                          isCurrent
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-400"
                            : "border-[#e7e7e7] bg-[#f7f7f7] text-[#747780] dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            isCurrent ? "bg-emerald-500" : "bg-[#9a9da5]"
                          }`}
                        />
                        {item.status}
                      </p>
                    </div>
                    <FiChevronDown
                      className={`h-3.5 w-3.5 text-[#777b84] transition-transform duration-200 group-hover:text-[#151719] dark:text-zinc-500 dark:group-hover:text-white ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.24, ease: easeOut }}
                    className="overflow-hidden"
                  >
                    <div className="pb-4 pt-1">
                      <ul className="space-y-1.5 text-[0.75rem] font-medium leading-6 text-[#62666f] dark:text-zinc-400">
                        {item.points.map((point) => (
                          <li key={point} className="flex gap-3">
                            <span className="mt-[0.62rem] h-1 w-1 shrink-0 rounded-full bg-[#9a9da5] dark:bg-zinc-600" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-3.5 flex flex-wrap gap-2">
                        {item.techStack.map((tech) => {
                          const Icon = tech.icon;

                          return (
                            <span
                              key={tech.name}
                              className="inline-flex items-center gap-1.5 border border-[#ededed] bg-white px-2.5 py-1.5 text-[0.68rem] font-semibold text-[#747780] transition-colors hover:border-[#d8d8d8] hover:text-[#151719] dark:border-zinc-800 dark:bg-black dark:text-zinc-400 dark:hover:text-white"
                            >
                              <Icon size={14} style={{ color: tech.color }} />
                              {tech.name}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.article>
          );
        })}
      </div>
    </motion.section>
  );
}
