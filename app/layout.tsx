import type { Metadata, Viewport } from "next";
import {
  Geist,
  Geist_Mono,
  Roboto_Mono,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import Navbar from "./components/Navbar";
import { DockWithAnimation } from "./components/dock-with-animation";
import { QuoteSection } from "./components/QuoteSection";
import { IconHeart, IconCode } from "@tabler/icons-react";
import { ViewCount } from "./components/ViewCount";
import { CinematicPreloader } from "./components/cinematic-preloader";
import { LoadingProvider } from "./components/loading-context";
import PageTransition from "./components/page-transition";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["italic", "normal"],
});

export const metadata: Metadata = {
  title: "Mohd Sahil Siddiqui - Software Engineer",
  description: "Software Engineer",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${robotoMono.variable} ${playfairDisplay.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        <LoadingProvider>
          {/* 🎬 PRELOADER LIVES HERE */}
          <CinematicPreloader />

          <ThemeProvider attribute="class" defaultTheme="light">
            <header className="sticky top-0 z-40 h-14 w-full bg-background/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
              <div className="h-full px-4 md:max-w-2xl md:mx-auto">
                <Navbar />
              </div>
            </header>

            {/* 🎥 CONTENT WAITED + ANIMATED */}
            <PageTransition>
              <main className="relative px-4 md:px-0 max-w-full overflow-x-hidden">
                <div className="relative md:max-w-2xl md:mx-auto">
                  <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black p-4 md:p-5 shadow-lg mt-5">
                    {children}
                  </div>

                  <QuoteSection
                    quote="Don't worry about failure: you only have to be right once."
                    author="Drew Houston"
                  />

                  <footer className="text-center py-8 pb-28 md:pb-24 space-y-3">
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 flex justify-center gap-1.5">
                      Made with
                      <IconHeart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                      and
                      <IconCode className="w-3.5 h-3.5 text-blue-500" />
                      by Sahil
                    </p>

                    <div className="flex justify-between text-xs text-zinc-400">
                      <p>© 2026 All rights reserved</p>
                      {/* <ViewCount /> */}
                    </div>
                  </footer>
                </div>
              </main>
            </PageTransition>

            <DockWithAnimation />
          </ThemeProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
