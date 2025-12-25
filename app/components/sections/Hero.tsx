"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Profile from "@/public/Profile.jpg";
import { FlipWords } from "@/components/ui/flip-words";
import { ActiveStatus } from "@/components/ui/active-status";
import { Meteors } from "@/components/ui/meteors";
import { heroData } from "@/app/data/hero";

const LocationGlobe = dynamic(
  () => import("@/components/location-globe").then((mod) => mod.LocationGlobe),
  { ssr: false }
);

export default function Hero() {
  return (
    <div className="space-y-6" id="home">
      <motion.div
        className="relative rounded-md border border-border p-4 overflow-hidden bg-card dark:bg-neutral-950"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <Meteors
          number={16}
          className="absolute inset-0 z-0 opacity-40 pointer-events-none"
        />

        <div className="relative z-10 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-light dark:font-extralight text-black dark:text-muted-foreground">
              greetings, I&apos;m
            </span>
            <ActiveStatus />
          </div>

          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 overflow-hidden rounded-full sm:h-14 sm:w-14">
              <Image
                src={Profile}
                alt="profile image"
                fill
                className="object-cover"
              />
            </div>

            <h1 className="text-xl font-light tracking-tight sm:text-2xl md:text-3xl text-black dark:text-muted-foreground">
              {heroData.name}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-sm font-extralight text-black dark:text-muted-foreground ">
            <span>
              {heroData.age}, {heroData.pronouns}
            </span>
            <span className="opacity-40">•</span>
            <FlipWords words={heroData.roles} className="text-sm" />
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <LocationGlobe />
        </motion.div>

        <motion.div
          className="rounded-md border border-border bg-card dark:bg-neutral-950 p-4 sm:p-5 flex flex-col gap-3"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h3 className="text-base font-semibold">Currently working with:</h3>

          <div className="flex flex-wrap gap-2">
            {heroData.currentSkills.map((skill) => (
              <span
                key={skill}
                className="rounded bg-muted px-2 py-1 text-xs text-muted-foreground"
              >
                {skill}
              </span>
            ))}
          </div>

          <span className="text-xs italic text-black dark:text-muted-foreground">
            …and a few more skills up my sleeve!
          </span>
        </motion.div>
      </div>

      <motion.div
        className="rounded-md border border-border bg-card dark:bg-neutral-950 p-4 sm:p-5"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <p className="text-sm leading-6 font-light  text-black dark:text-muted-foreground">
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
