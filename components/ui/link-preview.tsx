"use client";

import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { encode } from "qss";
import React from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";
import Image from "next/image";

import { cn } from "@/lib/utils";

type LinkPreviewProps = {
  children: React.ReactNode;
  url: string;
  className?: string;
  width?: number;
  height?: number;
  quality?: number;
  layout?: string;
} & (
  | { isStatic: true; imageSrc: string }
  | { isStatic?: false; imageSrc?: never }
);

export const LinkPreview = ({
  children,
  url,
  className,
  width = 200,
  height = 125,
  isStatic = false,
  imageSrc = "",
}: LinkPreviewProps) => {
  const [isMounted, setIsMounted] = React.useState(false);
  const [isOpen, setOpen] = React.useState(false);
  const [src, setSrc] = React.useState<string>("");

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    if (!isMounted) return;

    if (!isStatic) {
      const params = encode({
        url,
        screenshot: true,
        meta: false,
        embed: "screenshot.url",
        colorScheme: "dark",
        "viewport.isMobile": true,
        "viewport.deviceScaleFactor": 1,
        "viewport.width": width * 3,
        "viewport.height": height * 3,
      });

      setSrc(`https://api.microlink.io/?${params}`);
    } else {
      setSrc(imageSrc);
    }
  }, [isMounted, url, width, height, isStatic, imageSrc]);

  const springConfig = { stiffness: 100, damping: 15 };
  const x = useMotionValue(0);
  const translateX = useSpring(x, springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetFromCenter = (offsetX - rect.width / 2) / 2;
    x.set(offsetFromCenter);
  };

  if (!isMounted) return null;

  return (
    <HoverCardPrimitive.Root
      openDelay={50}
      closeDelay={100}
      onOpenChange={setOpen}
    >
      <HoverCardPrimitive.Trigger asChild>
        <a
          href={url}
          target={url.startsWith("http") ? "_blank" : undefined}
          rel={url.startsWith("http") ? "noopener noreferrer" : undefined}
          onMouseMove={handleMouseMove}
          className={cn("text-black dark:text-white", className)}
        >
          {children}
        </a>
      </HoverCardPrimitive.Trigger>

      <HoverCardPrimitive.Content
        side="bottom"
        align="center"
        sideOffset={10}
        className="origin-(--radix-hover-card-content-transform-origin)"
      >
        <AnimatePresence>
          {isOpen && src && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.6 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                },
              }}
              exit={{ opacity: 0, y: 20, scale: 0.6 }}
              className="shadow-xl rounded-xl"
              style={{ x: translateX }}
            >
              <a
                href={url}
                className="block p-1 bg-white border-2 border-transparent rounded-xl hover:border-neutral-200 dark:hover:border-neutral-800"
                style={{ fontSize: 0 }}
              >
                <Image
                  src={src}
                  width={width}
                  height={height}
                  className="rounded-lg"
                  alt="Link preview"
                />
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Root>
  );
};
