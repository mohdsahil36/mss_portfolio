"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Profile from "@/public/Profile.jpg";
import { FlipWords } from "@/components/ui/flip-words";
import { ActiveStatus } from "@/components/ui/active-status";
import { Meteors } from "@/components/ui/meteors";

const LocationGlobe = dynamic(
  () => import("@/components/location-globe").then((mod) => mod.LocationGlobe),
  { ssr: false }
);

export default function Hero() {
  const words = ["Full Stack Developer", "Software Engineer"];

  return (
    <div className="space-y-6">
      <motion.div
        className="relative border border-zinc-800 rounded-md p-4 overflow-hidden"
        initial={{ opacity: 0, y: -24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <Meteors
          number={16}
          className="absolute inset-0 z-0 opacity-40 pointer-events-none hidden sm:block"
        />

        <div className="relative z-10 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-white font-extralight">
              greetings, I&apos;m
            </span>
            <ActiveStatus />
          </div>

          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 rounded-full overflow-hidden sm:h-14 sm:w-14">
              <Image
                src={Profile}
                alt="profile image"
                fill
                className="object-cover"
              />
            </div>

            <h1 className="text-xl font-light tracking-tight text-neutral-50 sm:text-2xl md:text-3xl">
              Mohd Sahil Siddiqui
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-sm font-extralight text-white">
            <span>26, he/him</span>
            <span className="opacity-50">•</span>
            <FlipWords words={words} className="text-white text-sm" />
            <span className="opacity-50">•</span>
            <span>India</span>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <motion.div
          className="h-30 md:h-full"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <LocationGlobe />
        </motion.div>

        <motion.div
          className="border border-zinc-800 rounded-md p-4 text-white font-extralight flex flex-col gap-3 sm:p-5"
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h3 className="text-base font-semibold">Currently working with:</h3>

          <div className="flex flex-wrap gap-2">
            {["React + Redux", "Tailwind CSS", "Node.js", "React Native"].map(
              (skill) => (
                <span
                  key={skill}
                  className="bg-zinc-800 px-2 py-1 rounded text-xs"
                >
                  {skill}
                </span>
              )
            )}
          </div>

          <span className="text-xs text-zinc-400 italic">
            …and a few more skills up my sleeve!
          </span>
        </motion.div>
      </div>

      <motion.div
        className="border border-zinc-800 rounded-md p-4 sm:p-5"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <p className="text-sm leading-6 font-light italic text-white">
          Hey! I’m a{" "}
          <span className="bg-sky-500/30 px-1 rounded">
            Full Stack Developer
          </span>{" "}
          who loves building cool stuff with React, Next.js, and Node.js. I also
          tinker with TypeScript, Tailwind CSS, Zustand, and more to make apps
          faster, cleaner, and fun.
        </p>
      </motion.div>
    </div>
  );
}
