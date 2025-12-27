"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { IconMail } from "@tabler/icons-react";

const EMAIL = "mohdsahilsiddiqui36@gmail.com";

export default function Contact() {
  return (
    <section
      id="contact"
      className="
        mt-5 relative rounded-md p-4
        border border-zinc-200 dark:border-zinc-800
        bg-white dark:bg-neutral-950
      "
    >
      {/* Heading */}
      <motion.h1
        className="mb-3 text-lg font-semibold text-zinc-900 dark:text-white text-center"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        Let’s connect
      </motion.h1>

      {/* Main text */}
      <motion.p
        className="text-sm leading-6 font-light text-black dark:text-white text-center"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35, ease: "easeOut", delay: 0.05 }}
        viewport={{ once: true }}
      >
        Always open to new opportunities—especially full-time roles and exciting
        projects. Whether it’s work or a quick tech chat, feel free to reach
        out. I usually reply within seconds to a day.
      </motion.p>

      {/* Secondary line (casual + rhyming) */}
      <motion.p
        className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 text-center"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut", delay: 0.1 }}
        viewport={{ once: true }}
      >
        Mail person? Hit the button below. Social person? Dock’s got you
        covered. 👀
      </motion.p>

      {/* CTA */}
      <motion.div
        className="mt-4 flex justify-center md:mt-5 cursor-pointer"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut", delay: 0.15 }}
        viewport={{ once: true }}
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
    </section>
  );
}
