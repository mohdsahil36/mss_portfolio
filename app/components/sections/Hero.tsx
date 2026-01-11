"use client";

import * as React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Profile from "@/public/favicon.png";
import { FlipWords } from "@/components/ui/flip-words";
import { ActiveStatus } from "@/components/ui/active-status";
import { heroData, heroSocials, resumeData } from "@/app/data/hero";
import { Button } from "@/components/ui/button";
import { LinkPreview } from "@/components/ui/link-preview";
import { IndiaTime } from "@/components/time";

const Goal = "/assets/Goal.mp4";

const LocationGlobe = dynamic(
  () => import("@/components/location-globe").then((mod) => mod.LocationGlobe),
  { ssr: false }
);

/* === HORIZONTAL MOTION SETTINGS === */
const fromLeft = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0 },
};
const fromRight = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0 },
};
const fastEase = [0.22, 1, 0.36, 1];
const fastTransition = { duration: 0.3, ease: fastEase };

export default function Hero() {
  const [videoLoaded, setVideoLoaded] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const ready = () => setVideoLoaded(true);

    if (video.readyState >= 3) {
      setVideoLoaded(true);
    } else {
      video.addEventListener("canplay", ready);
      video.addEventListener("loadeddata", ready);
    }

    return () => {
      video.removeEventListener("canplay", ready);
      video.removeEventListener("loadeddata", ready);
    };
  }, []);

  return (
    <div className="space-y-6 scroll-mt-24" id="home">
      {/* HERO CARD */}
      <div className="relative rounded-md border border-border p-4 overflow-hidden bg-card dark:bg-neutral-950">
        {/* VIDEO BACKGROUND */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Gradient placeholder */}
          <div
            className={`absolute inset-0 bg-linear-to-br from-zinc-900 via-zinc-800 to-black transition-opacity duration-1200 ${
              videoLoaded ? "opacity-0" : "opacity-100"
            }`}
          />
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1400 ${
              videoLoaded ? "opacity-100" : "opacity-0"
            }`}
          >
            <source src={Goal} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/40 to-black/80" />
        </div>

        {/* CONTENT */}
        <div className="relative z-10 flex flex-col gap-4">
          {/* TOP BAR */}
          <motion.div
            variants={fromLeft}
            initial="hidden"
            animate="visible"
            transition={{ ...fastTransition, delay: 0, ease: "easeInOut" }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-light text-white">
                greetings, I&apos;m
              </span>
              <div className="flex flex-col items-end gap-1.5">
                <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/15 backdrop-blur-md border border-white/30">
                  <IndiaTime />
                </div>
                <ActiveStatus />
              </div>
            </div>
          </motion.div>

          {/* NAME */}
          <motion.div
            variants={fromLeft}
            initial="hidden"
            animate="visible"
            transition={{ ...fastTransition, delay: 0.05, ease: "easeInOut" }}
            className="flex items-center gap-3"
          >
            <div className="relative h-12 w-12 overflow-hidden rounded-full sm:h-14 sm:w-14">
              <Image
                src={Profile}
                alt="profile image"
                fill
                className="object-cover"
              />
            </div>
            <h1 className="text-xl font-light tracking-tight sm:text-2xl md:text-3xl text-white">
              {heroData.name}
            </h1>
          </motion.div>

          {/* META */}
          <motion.div
            variants={fromLeft}
            initial="hidden"
            animate="visible"
            transition={{ ...fastTransition, delay: 0.1, ease: "easeInOut" }}
            className="flex flex-wrap items-center gap-2 text-sm font-extralight text-white"
          >
            <span>
              {heroData.age}, {heroData.pronouns}
            </span>
            <span className="opacity-40">•</span>
            <FlipWords words={heroData.roles} className="text-sm text-white" />
          </motion.div>

          {/* CTA + SOCIALS */}
          <motion.div
            variants={fromLeft}
            initial="hidden"
            animate="visible"
            transition={{ ...fastTransition, delay: 0.15, ease: "easeInOut" }}
            className="mt-2 flex flex-col sm:flex-row sm:items-center sm:gap-3 gap-2"
          >
            <Button
              asChild
              className="bg-white text-black hover:bg-black hover:text-white rounded-md"
            >
              <a
                href={resumeData.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                Resume
              </a>
            </Button>

            <div className="flex flex-wrap items-center gap-2">
              {heroSocials.map(({ label, href, icon: Icon, preview }) => {
                const isMailto = href.startsWith("mailto:");

                return (
                  <Button
                    key={label}
                    asChild={!isMailto}
                    variant="ghost"
                    className="p-0 bg-transparent hover:bg-transparent"
                    onClick={
                      isMailto
                        ? (e) => {
                            e.preventDefault();
                            window.location.href = href;
                          }
                        : undefined
                    }
                  >
                    {preview ? (
                      <LinkPreview url={href}>
                        <span className="w-10 h-10 flex items-center justify-center rounded-md transition hover:bg-black/35">
                          <Icon className="text-white transition hover:scale-110" />
                        </span>
                      </LinkPreview>
                    ) : (
                      <span className="w-10 h-10 flex items-center justify-center rounded-md transition hover:bg-black/25">
                        <Icon className="text-white transition hover:scale-110" />
                      </span>
                    )}
                  </Button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* LOWER GRID */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <motion.div
          variants={fromLeft}
          initial="hidden"
          animate="visible"
          transition={{ ...fastTransition, delay: 0.2, ease: "easeInOut" }}
        >
          <LocationGlobe />
        </motion.div>

        <motion.div
          variants={fromRight}
          initial="hidden"
          animate="visible"
          transition={{ ...fastTransition, delay: 0.2, ease: "easeInOut" }}
          className="rounded-md bg-card dark:bg-neutral-950 p-4 sm:p-5 flex flex-col gap-3"
        >
          <h3 className="text-base font-semibold">Currently working with:</h3>
          <div className="flex flex-wrap gap-2">
            {heroData.currentSkills.map((skill) => (
              <span key={skill} className="rounded bg-muted px-2 py-1 text-xs">
                {skill}
              </span>
            ))}
          </div>
          <span className="text-xs italic">
            …and a few more skills up my sleeve!
          </span>
        </motion.div>
      </div>

      {/* DESCRIPTION */}
      <motion.div
        variants={fromLeft}
        initial="hidden"
        animate="visible"
        transition={{ ...fastTransition, delay: 0.25, ease: "easeInOut" }}
        className="rounded-md p-4 sm:p-5"
      >
        <p className="text-sm leading-6 font-light">
          Hey! I&apos;m a{" "}
          <span className="rounded px-1 bg-emerald-100 text-black">
            {heroData.highlights.label}
          </span>{" "}
          {heroData.description}
        </p>
      </motion.div>
    </div>
  );
}
