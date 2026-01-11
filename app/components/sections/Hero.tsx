"use client";

import * as React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Profile from "@/public/Profile.jpg";
import { FlipWords } from "@/components/ui/flip-words";
import { ActiveStatus } from "@/components/ui/active-status";
import { heroData } from "@/app/data/hero";
import { Button } from "@/components/ui/button";
import { LinkPreview } from "@/components/ui/link-preview";
import { heroSocials } from "@/app/data/hero";
import { resumeData } from "@/app/data/hero";
const Goal = "/assets/Goal.mp4";

const LocationGlobe = dynamic(
  () => import("@/components/location-globe").then((mod) => mod.LocationGlobe),
  { ssr: false }
);

export default function Hero() {
  const fadeLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  };
  const fadeRight = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="space-y-6 scroll-mt-24" id="home">
      <motion.div
        className="relative rounded-md border border-border p-4 overflow-hidden bg-card dark:bg-neutral-950"
        initial="hidden"
        animate="visible"
        variants={fadeLeft}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Static Anime Video Background */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover scale-105"
          >
            <source src={Goal} type="video/mp4" />
          </video>

          {/* Cinematic readability overlay */}
          <div className="absolute inset-0 bg-linear-to-b from-black/65 via-black/40 to-black/75" />
        </div>

        <div className="relative z-10 flex flex-col gap-4">
          <motion.div
            className="flex items-center justify-between"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <span className="text-sm font-light dark:font-extralight text-white">
              greetings, I&apos;m
            </span>
            <ActiveStatus />
          </motion.div>

          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
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

          <motion.div
            className="flex flex-wrap items-center gap-2 text-sm font-extralight text-white"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="flex justify-around">
              <span>
                {heroData.age}, {heroData.pronouns}
              </span>
            </div>
            <span className="opacity-40">•</span>
            <FlipWords words={heroData.roles} className="text-sm text-white" />
          </motion.div>

          <motion.div
            className="mt-2 flex flex-col sm:flex-row sm:items-center sm:gap-3 gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Button
              asChild
              className="cursor-pointer text-black bg-white hover:text-white hover:bg-black rounded-md"
            >
              <a
                href={resumeData.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                Resume
              </a>
            </Button>

            <div className="flex flex-wrap gap-2 mt-2 sm:flex-row md:mt-0 justify-around">
              {heroSocials.map(({ label, href, icon: Icon, preview }) => (
                <Button
                  key={label}
                  asChild
                  variant="ghost"
                  className="
        group
        p-0
        bg-transparent
        border-0
        shadow-none

        hover:bg-transparent
        focus:outline-none
        focus-visible:ring-0
      "
                >
                  {preview ? (
                    <LinkPreview url={href} className="bg-transparent">
                      <span
                        className="
              flex items-center justify-center
              w-10 h-10
              rounded-md

              transition-all duration-300 ease-out

              /* LIGHT MODE hover */
              group-hover:bg-black/35

              /* DARK MODE hover */
              dark:group-hover:bg-white/15
            "
                      >
                        <Icon
                          aria-label={label}
                          className="
                text-white
                transition-transform duration-300
                group-hover:scale-110
              "
                        />
                      </span>
                    </LinkPreview>
                  ) : (
                    <a
                      href={href}
                      aria-label={label}
                      className="flex items-center justify-center"
                    >
                      <span
                        className="
              flex items-center justify-center
              w-10 h-10
              rounded-md

              transition-all duration-300 ease-out

              group-hover:bg-black/25
              dark:group-hover:bg-white/15
            "
                      >
                        <Icon
                          className="
                text-white
                transition-transform duration-300
                group-hover:scale-110
              "
                        />
                      </span>
                    </a>
                  )}
                </Button>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:mb-2">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeLeft}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <LocationGlobe />
        </motion.div>

        <motion.div
          className="rounded-md bg-card dark:bg-neutral-950 p-4 sm:p-5 flex flex-col gap-3"
          initial="hidden"
          animate="visible"
          variants={fadeRight}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-base font-semibold">Currently working with:</h3>
          <div className="flex flex-wrap gap-2">
            {heroData.currentSkills.map((skill) => (
              <span
                key={skill}
                className="rounded bg-muted px-2 py-1 text-xs dark:text-white"
              >
                {skill}
              </span>
            ))}
          </div>
          <span className="text-xs italic text-black dark:text-white">
            …and a few more skills up my sleeve!
          </span>
        </motion.div>
      </div>

      <motion.div
        className="rounded-md p-4 sm:p-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <p className="text-sm leading-6 font-light text-black dark:text-white">
          Hey! I&apos;m a{" "}
          <span className="rounded px-1 bg-emerald-100 text-black dark:font-light">
            {heroData.highlights.label}
          </span>{" "}
          {heroData.description}
        </p>
      </motion.div>
    </div>
  );
}
