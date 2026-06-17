import type { Metadata, Viewport } from "next";
import {
  Geist_Mono,
  Roboto_Mono,
  Playfair_Display,
  Hanken_Grotesk,
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
import { LoadingGate } from "./components/loading-gate";
import PageTransition from "./components/page-transition";

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
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
        className={`${hankenGrotesk.variable} ${geistMono.variable} ${robotoMono.variable} ${playfairDisplay.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        <LoadingProvider>
          {/* 🎬 PRELOADER LIVES HERE */}
          <CinematicPreloader />

          <LoadingGate>
            <ThemeProvider attribute="class" defaultTheme="light">
              <header className="sticky top-0 z-40 h-14 w-full bg-background/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
                <div className="mx-auto h-full w-full px-4 md:w-[40%] md:px-0">
                  <Navbar />
                </div>
              </header>

              <PageTransition>
                <main className="relative max-w-full overflow-x-hidden px-4 md:px-0">
                  <div className="relative mx-auto w-full md:w-[40%]">
                    <div className="mt-5 p-0">{children}</div>

                    <QuoteSection
                      quote="Don't worry about failure: you only have to be right once."
                      author="Drew Houston"
                    />

                    <footer className="py-8 pb-28 text-center md:pb-24 space-y-3">
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
          </LoadingGate>
        </LoadingProvider>
      </body>
    </html>
  );
}
