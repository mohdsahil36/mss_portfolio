"use client";

import Image from "next/image";
import { easeOut, motion } from "framer-motion";
import Profile from "@/public/Profile.jpg";
import { workExperience } from "@/app/data/workExperience";

export default function Work() {
  const cardVariants = {
    hidden: (direction: number) => ({
      opacity: 0,
      x: direction,
    }),
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.35, ease: easeOut },
    },
  };

  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: easeOut },
    },
  };

  return (
    <section
      id="work"
      className="
        mt-5 rounded-md p-4 sm:p-6
        border border-zinc-200 dark:border-zinc-800
        bg-white dark:bg-neutral-950
      "
    >
      <motion.h1
        className="
          mb-6 text-lg font-semibold
          text-zinc-900 dark:text-white
        "
        variants={headingVariants}
        initial="hidden"
        animate="visible"
      >
        Work Experience
      </motion.h1>

      <div className="relative flex flex-col gap-6 sm:gap-8">
        <div className="absolute left-5 top-0 h-full w-px hidden sm:block bg-zinc-200 dark:bg-zinc-800" />

        {workExperience.map((item, index) => {
          const isCurrent = item.type === "current";
          const direction = index % 2 === 0 ? -40 : 40;

          return (
            <motion.article
              key={index}
              custom={direction}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
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
                      src={Profile}
                      alt={item.imageAlt}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <span
                    className={`
                      flex items-center gap-1 rounded-full px-3 py-0.5
                      text-xs border whitespace-nowrap
                      ${
                        isCurrent
                          ? `
                            bg-emerald-100 text-emerald-700 border-emerald-200
                            dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800
                          `
                          : `
                            bg-amber-100 text-amber-700 border-amber-200
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

                <div>
                  <h2 className="font-semibold text-zinc-900 dark:text-white">
                    {item.company}
                  </h2>
                  <p className="text-sm text-zinc-600 dark:text-neutral-300">
                    {item.role}
                  </p>
                </div>

                <p className="text-sm leading-relaxed text-zinc-600 dark:text-white">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {item.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="
                        px-2 py-1 rounded text-xs
                        bg-zinc-200 text-zinc-700
                        dark:bg-zinc-800 dark:text-neutral-300
                      "
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
