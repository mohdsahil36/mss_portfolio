"use client";

import Image from "next/image";
import { easeOut, motion, useInView } from "framer-motion";
import { useRef } from "react";
import { workExperience } from "@/app/data/workExperience";

export default function Work({ sectionIndex = 0 }: { sectionIndex?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const sectionDirection = sectionIndex % 2 === 0 ? -60 : 60;

  const cardVariants = {
    hidden: (direction: number) => ({
      opacity: 0,
      x: direction,
    }),
    visible: () => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.35, ease: easeOut },
    }),
  };

  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: easeOut },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, x: sectionDirection },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: easeOut },
    },
  };

  return (
    <motion.section
      ref={ref}
      id="work"
      className="
        mt-5 rounded-md p-4 sm:p-6
        bg-white dark:bg-neutral-950 scroll-mt-18
      "
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.h1
        className="
          mb-6 text-lg font-semibold
          text-zinc-900 dark:text-white text-center
          font-[family-name:var(--font-playfair)] italic
        "
        variants={headingVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ delay: 0.2 }}
      >
        Career
      </motion.h1>

      <div className="relative flex flex-col gap-6 sm:gap-8">
        <div className="absolute left-5 top-0 h-full w-px hidden sm:block bg-zinc-200 dark:bg-zinc-800" />

        {workExperience.map((item, index) => {
          const isCurrent = item.type === "current";
          const direction = index % 2 === 0 ? -30 : 30;

          return (
            <motion.article
              key={index}
              custom={direction}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="relative sm:pl-14"
            >
              <span
                className={`
      absolute left-[15px] top-1/2 -translate-y-1/2
      h-3 w-3 rounded-full hidden sm:block
      ${isCurrent ? "bg-emerald-500" : "bg-amber-500"}
    `}
              />

              <div
                className="
      flex flex-col gap-3 rounded-md p-4
      border border-zinc-200 dark:border-zinc-800
      bg-zinc-50 dark:bg-neutral-950
    "
              >
                <div className="flex items-start justify-between">
                  <div
                    className="
          relative h-10 w-10 rounded-full overflow-hidden
          border border-zinc-300 dark:border-zinc-700
          sm:h-12 sm:w-12
        "
                  >
                    <Image
                      src={item.profile}
                      alt={item.imageAlt}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="font-semibold text-zinc-900 dark:text-white">
                        {item.company}
                      </h2>

                      <span
                        className={`
              flex items-center gap-1 rounded-full px-2 py-0.5
              text-xs border whitespace-nowrap
              ${
                isCurrent
                  ? `
                    bg-emerald-100 text-emerald-700 border-emerald-200 md:ms-3
                    dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800
                  `
                  : `
                    bg-amber-100 text-amber-700 border-amber-200 md:ms-3
                    dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800
                  `
              }
            `}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            isCurrent ? "bg-emerald-500" : "bg-amber-500"
                          }`}
                        />
                        {item.status}
                      </span>
                    </div>

                    <p className="md:mt-2 text-sm text-zinc-600 dark:text-neutral-300">
                      {item.role}
                    </p>
                  </div>

                  <div className="text-right text-xs text-zinc-500 dark:text-neutral-400 whitespace-nowrap grid grid-rows-2 gap-1.5">
                    <p className="font-medium">{item.date}</p>
                    <p>{item.location}</p>
                  </div>
                </div>

                <p
                  className={`text-xs leading-relaxed text-zinc-600 dark:text-white ${
                    item.isBlurred ? "blur-sm select-none" : ""
                  }`}
                >
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-3 mt-4">
                  {item.techStack.map((tech, index) => {
                    const Icon = tech.icon;

                    return (
                      <motion.div
                        key={tech.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.25, delay: index * 0.05 }}
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2 rounded-sm px-3 py-1 text-xs bg-zinc-100 dark:bg-zinc-900 cursor-pointer"
                      >
                        <Icon size={16} style={{ color: tech.color }} />
                        <span className="text-zinc-700 dark:text-zinc-200">
                          {tech.name}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </motion.section>
  );
}
