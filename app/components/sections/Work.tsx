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
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOut } },
  };

  return (
    <section className="mt-5 border border-zinc-800 rounded-md p-4 sm:p-6">
      <motion.h1
        className="mb-6 text-lg font-semibold text-white"
        variants={headingVariants}
        initial="hidden"
        animate="visible"
      >
        Work Experience
      </motion.h1>

      <div className="relative flex flex-col gap-6 sm:gap-8">
        <div className="absolute left-5 top-0 h-full w-px bg-zinc-800 hidden sm:block" />

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
                className={`absolute left-[15px] top-1/2 -translate-y-1/2 h-3 w-3 rounded-full hidden sm:block ${
                  isCurrent ? "bg-emerald-400" : "bg-amber-400"
                }`}
              />

              <div className="flex flex-col gap-3 border border-zinc-800 rounded-md p-4">
                <div className="flex items-start justify-between">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden border border-zinc-700 sm:h-12 sm:w-12">
                    <Image
                      src={Profile}
                      alt={item.imageAlt}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <span
                    className={`flex items-center gap-1 rounded-full px-3 py-0.5 text-xs border whitespace-nowrap ${
                      isCurrent
                        ? "bg-emerald-900/30 text-emerald-400 border-emerald-800"
                        : "bg-amber-900/30 text-amber-400 border-amber-800"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        isCurrent ? "bg-emerald-400" : "bg-amber-400"
                      }`}
                    />
                    {item.status}
                  </span>
                </div>

                <div>
                  <h2 className="text-white font-semibold">{item.company}</h2>
                  <p className="text-sm text-neutral-300">{item.role}</p>
                </div>

                <p className="text-sm leading-relaxed text-neutral-400">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {item.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="bg-zinc-800 px-2 py-1 rounded text-xs text-neutral-300"
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
