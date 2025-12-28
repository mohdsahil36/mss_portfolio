"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { IconMail } from "@tabler/icons-react";

const EMAIL = "mohdsahilsiddiqui36@gmail.com";

export default function Contact({
  sectionIndex = 3,
}: {
  sectionIndex?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const sectionDirection = sectionIndex % 2 === 0 ? -60 : 60;

  return (
    <motion.section
      ref={ref}
      id="contact"
      className="
        mt-5 relative rounded-md p-4
        bg-white dark:bg-neutral-950
      "
      initial={{ opacity: 0, x: sectionDirection }}
      animate={
        isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: sectionDirection }
      }
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Heading */}
      <motion.h1
        className="mb-3 text-lg font-semibold text-zinc-900 dark:text-white text-center"
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.35, ease: "easeOut", delay: 0.2 }}
      >
        Let&apos;s connect
      </motion.h1>

      {/* Main text */}
      <motion.p
        className="text-sm leading-6 font-light text-black dark:text-white text-center"
        initial={{ opacity: 0, x: 20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
        transition={{ duration: 0.35, ease: "easeOut", delay: 0.25 }}
      >
        Always open to new opportunities—especially full-time roles and exciting
        projects. Whether it&apos;s work or a quick tech chat, feel free to
        reach out. I usually reply within seconds to a day.
      </motion.p>

      {/* Secondary line (casual + rhyming) */}
      <motion.p
        className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 text-center"
        initial={{ opacity: 0, y: 8 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.25, ease: "easeOut", delay: 0.3 }}
      >
        Mail person? Hit the button below. Social person? Dock&apos;s got you
        covered. 👀
      </motion.p>

      {/* CTA */}
      <motion.div
        className="mt-4 flex justify-center md:mt-5 cursor-pointer"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.25, ease: "easeOut", delay: 0.35 }}
      >
        <Button asChild className="rounded-md">
          <a
            href={`mailto:${EMAIL}?subject=Let’s connect`}
            aria-label="Send email"
          >
            Get in touch
            <IconMail />
          </a>
        </Button>
      </motion.div>
    </motion.section>
  );
}
