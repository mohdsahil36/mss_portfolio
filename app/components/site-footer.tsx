"use client";

import { FiArrowUp, FiMail } from "react-icons/fi";
import { heroSocials, emailData } from "@/app/data/hero";
import { ViewCount } from "./ViewCount";

export function SiteFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerLinks = [
    ...heroSocials,
    {
      label: "Email",
      href: emailData.href,
      icon: FiMail,
    },
  ];

  return (
    <footer className="relative py-12 pb-16 text-[#151719] dark:text-white">
      <span className="absolute left-1/2 top-0 h-px w-screen -translate-x-1/2 bg-[#ededed] dark:bg-zinc-800" />
      <div className="flex flex-col gap-8">
        <div className="flex flex-col items-center gap-5 text-center">
          <p className="text-[1rem] font-semibold uppercase leading-none">
            sahilworks.in
          </p>

          <div className="flex items-center gap-2">
            {footerLinks.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={
                    item.href.startsWith("mailto:") ? undefined : "_blank"
                  }
                  rel={
                    item.href.startsWith("mailto:")
                      ? undefined
                      : "noopener noreferrer"
                  }
                  aria-label={item.label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[#ededed] bg-white text-[#8a8d95] transition-colors duration-200 hover:border-[#d8d8d8] hover:bg-[#f8f8f8] hover:text-[#151719] dark:border-zinc-800 dark:bg-black dark:text-zinc-500 dark:hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>

          <p className="font-mono text-[0.7rem] font-semibold uppercase text-[#8a8d95]">
            © 2026 Mohd Sahil Siddiqui · Quest log built with precision.
          </p>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 text-[#8a8d95] sm:flex-row">
          <ViewCount />

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex h-9 items-center justify-center gap-2 rounded-xl border border-[#ededed] bg-white px-3.5 text-[0.74rem] font-semibold text-[#8a8d95] transition-colors duration-200 hover:border-[#d8d8d8] hover:bg-[#f8f8f8] hover:text-[#151719] dark:border-zinc-800 dark:bg-black dark:text-zinc-500 dark:hover:text-white"
          >
            Return to spawn
            <FiArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
