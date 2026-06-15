"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Profile from "@/public/favicon.png";
import { heroData, heroSocials, resumeData } from "@/app/data/hero";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

const transition = { duration: 0.35, ease: "easeOut" as const };

const stack = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind",
  "Node.js",
  "Express",
  "NestJS",
];

export default function Hero() {
  return (
    <section className="scroll-mt-24" id="home">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={transition}
        className="relative overflow-hidden rounded-md px-4 py-5 sm:px-5 sm:py-6"
      >
        <div className="flex items-center justify-between gap-3">
          <span className="relative text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            FIG_001 / Portfolio
          </span>

          <span className="relative text-[11px] text-muted-foreground">
            Available
          </span>
        </div>

        <div className="relative mt-5">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ ...transition, delay: 0.05 }}
            className="grid gap-5 sm:grid-cols-[1fr_5.75rem] sm:items-start"
          >
            <div className="min-w-0">
              <h1 className="text-[1.35rem] font-semibold leading-tight tracking-tight text-foreground sm:text-2xl">
                {heroData.name}
              </h1>

              <p className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Software Engineer (Frontend)
              </p>

              <p className="mt-3 text-xs font-medium leading-5 text-foreground">
                Frontends that feel clear, fast, and quietly polished.
              </p>

              <p className="mt-3 text-[13px] leading-6 text-muted-foreground">
                I build scalable, high-performance web applications across the
                full stack, with a focus on clean architecture, measurable
                impact, and interfaces that feel thoughtfully designed.
              </p>

              <p className="mt-2.5 text-xs leading-5 text-muted-foreground">
                Most days, that means working with{" "}
                {stack.map((item, index) => (
                  <span key={item}>
                    <span className="font-medium text-foreground">{item}</span>
                    {index < stack.length - 2
                      ? ", "
                      : index === stack.length - 2
                        ? ", and "
                        : ""}
                  </span>
                ))}
                . The stack matters, but the real goal is clarity, reliability,
                and a product experience that earns trust.
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Button asChild className="rounded-md">
                  <a
                    href={resumeData.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Resume
                  </a>
                </Button>

                <div className="flex items-center rounded-md border border-border bg-background/60 p-1 dark:bg-black/30">
                  {heroSocials.map(({ label, href, icon: Icon }) => (
                    <Button
                      key={label}
                      asChild
                      variant="ghost"
                      size="icon-sm"
                      className="rounded-sm"
                    >
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={
                          href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        aria-label={label}
                      >
                        <Icon />
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[5.75rem] sm:mx-0">
              <div className="relative aspect-square overflow-hidden rounded-md border border-border bg-muted shadow-sm">
                <Image
                  src={Profile}
                  alt="Mohd Sahil Siddiqui"
                  fill
                  priority
                  sizes="92px"
                  className="object-cover"
                />
                <span className="absolute bottom-2 right-2 h-3.5 w-3.5 rounded-full border-2 border-background bg-emerald-500 dark:border-neutral-950" />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
