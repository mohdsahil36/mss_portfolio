"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { heroData, heroSocials, resumeData } from "@/app/data/hero";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

const transition = { duration: 0.35, ease: "easeOut" as const };

function getCurrentStatus(schedule: typeof heroData.statusSchedule) {
  const now = new Date();
  const currentMinute = now.getHours() * 60 + now.getMinutes();

  return schedule.find(({ startMinute, endMinute }) =>
    startMinute < endMinute
      ? currentMinute >= startMinute && currentMinute < endMinute
      : currentMinute >= startMinute || currentMinute < endMinute,
  )!;
}

function formatLocalTime() {
  const timeParts = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Kolkata",
  }).formatToParts(new Date());

  const getPart = (type: "hour" | "minute" | "second") =>
    timeParts.find((part) => part.type === type)?.value.padStart(2, "0") ??
    "00";

  return `${getPart("hour")}:${getPart("minute")}:${getPart("second")}`;
}

export default function Hero() {
  const [currentStatus, setCurrentStatus] = useState(() =>
    getCurrentStatus(heroData.statusSchedule),
  );
  const [localTime, setLocalTime] = useState(() => formatLocalTime());

  useEffect(() => {
    const updateClock = () => {
      setCurrentStatus(getCurrentStatus(heroData.statusSchedule));
      setLocalTime(formatLocalTime());
    };

    const interval = window.setInterval(updateClock, 1000);

    return () => window.clearInterval(interval);
  }, []);

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
            {heroData.eyebrow}
          </span>

          {localTime ? (
            <time
              dateTime={localTime}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-sm border border-border bg-background/75 px-2.5 py-1.5 text-xs font-medium leading-none text-foreground shadow-sm backdrop-blur dark:bg-black/30"
            >
              <span className="font-mono tabular-nums tracking-normal">
                {localTime}
              </span>
              <span className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                IST
              </span>
            </time>
          ) : null}
        </div>

        <div className="relative mt-5">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ ...transition, delay: 0.05 }}
            className="flow-root"
          >
            <div className="float-left mb-3 mr-5 w-full max-w-19">
              <div className="relative aspect-square rounded-full">
                <div className="relative h-full w-full overflow-hidden rounded-full border border-border bg-muted shadow-sm">
                  <Image
                    src={heroData.profileImage}
                    alt={heroData.profileImageAlt}
                    fill
                    priority
                    sizes="76px"
                    className="object-cover"
                  />
                </div>
                <button
                  type="button"
                  aria-label={currentStatus.message}
                  className={`group/status absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full border-2 border-background ${currentStatus.colorClass} outline-none focus-visible:ring-2 focus-visible:ring-ring dark:border-neutral-950`}
                >
                  <span className="pointer-events-none absolute bottom-0 left-full z-20 ml-2 w-max max-w-44 translate-x-1 rounded-md border border-border bg-background/80 px-2.5 py-1.5 text-left text-[11px] font-medium leading-4 text-foreground opacity-0 shadow-sm backdrop-blur-md transition group-hover/status:translate-x-0 group-hover/status:opacity-100 group-focus-visible/status:translate-x-0 group-focus-visible/status:opacity-100 dark:bg-neutral-950/80">
                    {currentStatus.message}
                  </span>
                </button>
              </div>
            </div>

            <div className="min-w-0">
              <h1 className="group/name relative inline-block text-[1.35rem] font-semibold leading-tight tracking-tight text-foreground sm:text-2xl">
                <span className="relative z-10">{heroData.name}</span>
                <span
                  aria-hidden="true"
                  className="hero-name-glitch hero-name-glitch-top"
                >
                  {heroData.name}
                </span>
                <span
                  aria-hidden="true"
                  className="hero-name-glitch hero-name-glitch-bottom"
                >
                  {heroData.name}
                </span>
              </h1>

              <p className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                {heroData.role}
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] leading-5 text-muted-foreground">
                {heroData.locations.map(({ label, icon: Icon }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1.5"
                  >
                    <Icon className="h-3 w-3" />
                    {label}
                  </span>
                ))}
              </div>

              <p className="mt-3 text-xs font-medium leading-5 text-foreground">
                {heroData.headline}
              </p>

              <p className="mt-3 text-[13px] leading-6 text-muted-foreground">
                {heroData.introSegments.map(({ text, emphasis }, index) =>
                  emphasis ? (
                    <span
                      key={`${text}-${index}`}
                      className="font-medium text-foreground"
                    >
                      {text}
                    </span>
                  ) : (
                    <span key={`${text}-${index}`}>{text}</span>
                  ),
                )}
              </p>

              <p className="mt-2.5 text-xs leading-5 text-muted-foreground">
                {heroData.stackIntro}{" "}
                {heroData.stack.map((item, index) => (
                  <span key={item}>
                    <span className="font-medium text-foreground">{item}</span>
                    {index < heroData.stack.length - 2
                      ? ", "
                      : index === heroData.stack.length - 2
                        ? ", and "
                        : ""}
                  </span>
                ))}
                . {heroData.stackOutro}{" "}
                {heroData.stackGoals.map((goal, index) => (
                  <span key={goal}>
                    <span className="font-medium text-foreground">{goal}</span>
                    {index < heroData.stackGoals.length - 2
                      ? ", "
                      : index === heroData.stackGoals.length - 2
                        ? ", and "
                        : ""}
                  </span>
                ))}
                , {heroData.stackClosing}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Button asChild className="rounded-md">
                  <a
                    href={resumeData.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {resumeData.label}
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
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
