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
        className="border border-zinc-800 h-auto rounded-md p-4 mb-2 relative overflow-hidden"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 0.7 } }}
        viewport={{ once: true }}
      >
        <Meteors
          number={20}
          className="absolute inset-0 z-0 opacity-50 pointer-events-none"
        />
        <div className="relative z-10 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-white font-extralight">
              greetings, I&apos;m
            </span>
            <ActiveStatus />
          </div>

          <div className="flex items-center gap-4 my-1">
            <div className="relative w-15 h-15 rounded-full overflow-hidden">
              <Image
                src={Profile}
                alt="profile-img"
                fill
                className="object-cover"
              />
            </div>
            <h1 className="text-2xl md:text-3xl font-light tracking-tight text-neutral-50 ms-3">
              Mohd Sahil Siddiqui
            </h1>
          </div>

          <div className="flex items-center text-sm font-extralight text-white gap-2 flex-wrap">
            <span>26, he/him</span>
            <span className="opacity-50">•</span>
            <span className="inline-flex w-38 justify-center">
              <FlipWords words={words} className="text-white text-sm m-0" />
            </span>
            <span>from India</span>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2">
        <motion.div
          className="h-full"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0, transition: { duration: 0.7 } }}
          viewport={{ once: true }}
        >
          <LocationGlobe />
        </motion.div>

        <motion.div
          className="border border-zinc-800 p-6 rounded-md text-white font-extralight flex flex-col gap-3 hover:shadow-lg transition-shadow duration-300 h-full"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0, transition: { duration: 0.7 } }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold">Currently working with:</h3>
          <div className="flex flex-wrap gap-2">
            <span className="bg-zinc-800 px-2 py-1 rounded text-xs">
              React + Redux
            </span>
            <span className="bg-zinc-800 px-2 py-1 rounded text-xs">
              Tailwind CSS
            </span>
            <span className="bg-zinc-800 px-2 py-1 rounded text-xs">
              Node JS
            </span>
            <span className="bg-zinc-800 px-2 py-1 rounded text-xs">
              React Native
            </span>
          </div>
          <span className="text-xs font-extralight text-zinc-400 italic">
            …and a few more skills up my sleeve!
          </span>
        </motion.div>
      </div>

      <motion.div
        className="relative border border-zinc-800 rounded-md p-6 overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 0.7 } }}
        viewport={{ once: true }}
      >
        <p className="relative z-10 text-white leading-6 font-light text-sm italic">
          Hey! I’m a{" "}
          <span className="bg-sky-500/30 px-1 rounded">
            Full Stack Developer
          </span>{" "}
          who loves building cool stuff with React, Next.js, and Node.js. I also
          tinker with TypeScript, Tailwind CSS, Zustand and more to make apps
          faster, cleaner, and fun. And that&apos;s just the tip of the
          iceberg—there&apos;s plenty more tech I play with!
        </p>
      </motion.div>
    </div>
  );
}
