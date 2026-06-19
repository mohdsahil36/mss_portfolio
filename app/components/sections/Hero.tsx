"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FiFileText } from "react-icons/fi";
import { emailData, heroData, heroSocials, resumeData } from "@/app/data/hero";

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
  const EmailIcon = emailData.icon;
  const StatusIcon = currentStatus.icon;

  useEffect(() => {
    const updateClock = () => {
      setCurrentStatus(getCurrentStatus(heroData.statusSchedule));
      setLocalTime(formatLocalTime());
    };

    const interval = window.setInterval(updateClock, 1000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section
      className="relative w-full scroll-mt-24 overflow-hidden bg-background"
      id="home"
    >
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={transition}
        className="relative mx-auto min-h-96 w-full overflow-visible bg-background px-0 py-10 text-[#151719] dark:text-white sm:py-12"
      >
        <div className="mx-auto max-w-full">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex max-w-full items-center gap-2.5 rounded-2xl border border-[#e7e7e7] bg-white px-3 py-2 text-left shadow-[0_8px_22px_rgba(15,15,15,0.035)] dark:border-zinc-800 dark:bg-background">
              <span className="relative flex h-8 w-2.5 shrink-0 items-center">
                <span
                  className={`absolute inline-flex h-2.5 w-2.5 animate-ping rounded-full opacity-25 ${currentStatus.colorClass}`}
                />
                <span
                  className={`relative inline-flex h-2.5 w-2.5 rounded-full ${currentStatus.colorClass}`}
                  aria-label={currentStatus.message}
                />
              </span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#f4f4f4] text-[#151719] dark:bg-zinc-900 dark:text-white">
                <StatusIcon className="h-4 w-4" />
              </span>
              <span className="min-w-0">
                <span className="block font-mono text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-[#9a9da5]">
                  Current rhythm
                </span>
                <span className="mt-1 block text-[0.78rem] font-semibold leading-5 text-[#151719] dark:text-white">
                  {currentStatus.label} · {currentStatus.message}
                </span>
              </span>
            </div>

            {localTime ? (
              <time
                dateTime={localTime}
                className="inline-flex items-center gap-1.5 border border-[#e9e9e9] bg-white px-3 py-2 text-xs font-semibold leading-none text-[#151719] dark:border-zinc-800 dark:bg-background dark:text-white"
              >
                <span className="font-mono tabular-nums">{localTime}</span>
                <span className="font-mono text-[0.62rem] uppercase text-[#777b84] dark:text-zinc-500">
                  IST
                </span>
              </time>
            ) : null}
          </div>

          <p className="mt-8 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.13em] text-[#151719] dark:text-white">
            {heroData.availability}
          </p>

          <h1 className="group/name relative mt-3 flex items-center gap-3 text-[1.82rem] font-semibold leading-[1.06] text-[#151719] dark:text-white sm:gap-4 sm:text-[2.55rem] lg:text-[2.9rem]">
            <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md border border-[#e7e7e7] bg-white dark:border-zinc-800 dark:bg-background sm:h-12 sm:w-12">
              <Image
                src={heroData.profileImage}
                alt={heroData.profileImageAlt}
                fill
                priority
                sizes="48px"
                className="object-cover"
              />
            </span>
            <span className="relative inline-block">
              <span>{heroData.titleLine}</span>
              <span className="hero-name-glitch hero-name-glitch-top">
                {heroData.titleLine}
              </span>
              <span className="hero-name-glitch hero-name-glitch-bottom">
                {heroData.titleLine}
              </span>
            </span>
          </h1>

          <p className="mt-2 text-[0.82rem] font-semibold text-[#777b84] dark:text-zinc-400">
            {heroData.role}
          </p>

          <p className="mt-6 text-[1.28rem] font-semibold leading-snug text-[#151719] dark:text-white sm:text-[1.45rem]">
            {heroData.impactLine}
          </p>

          <p className="mt-4 max-w-xl text-[0.86rem] font-medium leading-7 text-[#62666f] dark:text-zinc-400 sm:text-[0.88rem]">
            {heroData.summary}
          </p>

          <p className="mt-4 max-w-xl text-[0.86rem] font-medium leading-7 text-[#62666f] dark:text-zinc-400 sm:text-[0.88rem]">
            {heroData.stackSummary}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={resumeData.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center justify-center gap-2 bg-black px-5 text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-85 dark:bg-white dark:text-black"
            >
              <FiFileText className="h-4 w-4" />
              {resumeData.label}
            </a>
            <a
              href={emailData.href}
              className="inline-flex min-h-10 items-center justify-center gap-2 border border-[#ededed] bg-white px-5 text-sm font-semibold text-[#151719] transition-colors duration-200 hover:bg-[#f7f7f7] dark:border-zinc-800 dark:bg-background dark:text-white dark:hover:bg-zinc-900"
            >
              <EmailIcon className="h-4 w-4" />
              {emailData.label}
            </a>
            <div className="flex items-center gap-2">
              {heroSocials.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target={
                      social.href.startsWith("mailto:") ? undefined : "_blank"
                    }
                    rel={
                      social.href.startsWith("mailto:")
                        ? undefined
                        : "noopener noreferrer"
                    }
                    aria-label={social.label}
                    className="inline-flex h-10 w-10 items-center justify-center border border-[#ededed] bg-white text-[#777b84] transition-colors duration-200 hover:bg-[#f7f7f7] hover:text-[#151719] dark:border-zinc-800 dark:bg-background dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
