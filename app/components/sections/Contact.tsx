"use client";

import { easeOut, motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FiMail } from "react-icons/fi";
import { contactData } from "@/app/data/contact";

export default function Contact({
  sectionIndex = 3,
}: {
  sectionIndex?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.12 });
  const sectionDirection = sectionIndex % 2 === 0 ? -40 : 40;

  return (
    <motion.section
      ref={ref}
      id="contact"
      className="mt-7 scroll-mt-18 bg-background py-8 text-[#151719] dark:text-white"
      initial={{ opacity: 0, x: sectionDirection }}
      animate={
        isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: sectionDirection }
      }
      transition={{ duration: 0.45, ease: easeOut }}
    >
      <div className="rounded-[1.25rem] border border-[#e8e8e8] bg-white px-5 py-8 dark:border-zinc-800 dark:bg-background sm:px-7 sm:py-9">
        <div className="max-w-[34rem]">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#ededed] bg-white dark:border-zinc-800 dark:bg-background">
              <FiMail className="h-4 w-4" />
            </span>
            <h2 className="text-[1.5rem] font-semibold leading-tight text-[#151719] dark:text-white sm:text-[1.75rem]">
              {contactData.title}
            </h2>
          </div>
          <p className="mt-4 text-[0.9rem] font-medium leading-7 text-[#747780] dark:text-zinc-400">
            {contactData.summary}
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          {contactData.actions.map((action) => {
            const Icon = action.icon;
            const isPrimary = action.variant === "primary";

            return (
              <a
                key={action.label}
                href={action.href}
                target={action.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={
                  action.href.startsWith("mailto:")
                    ? undefined
                    : "noopener noreferrer"
                }
                className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border px-5 text-sm font-semibold transition-colors duration-200 ${
                  isPrimary
                    ? "border-black bg-black text-white hover:opacity-90 dark:border-white dark:bg-white dark:text-black"
                    : "border-[#ededed] bg-white text-[#151719] hover:bg-[#f8f8f8] dark:border-zinc-800 dark:bg-background dark:text-white dark:hover:bg-zinc-900"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {isPrimary ? action.value : action.label}
              </a>
            );
          })}
        </div>

        <p className="mt-5 font-mono text-[0.68rem] font-semibold uppercase text-[#9a9da5]">
          {contactData.availability}
        </p>
      </div>
    </motion.section>
  );
}
