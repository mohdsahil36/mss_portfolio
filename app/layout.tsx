import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import Navbar from "./components/Navbar";
import { DockWithAnimation } from "./components/dock-with-animation";
import { QuoteSection } from "./components/QuoteSection";
import { IconHeart, IconCode } from "@tabler/icons-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mohd Sahil Siddiqui | Software Engineer",
  description: "Software Engineer",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="w-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen w-full bg-background text-foreground m-0 p-0`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <header className="sticky top-0 z-50 h-14 w-full bg-background/80 backdrop-blur-md border-b border-zinc-500 dark:border-zinc-800 md:mb-3">
            <div className="h-full px-4 md:px-0 md:max-w-2xl md:mx-auto w-full">
              <Navbar />
            </div>
          </header>

          <main className="relative px-4 md:px-0 w-full max-w-full overflow-x-hidden">
            <div className="relative w-full max-w-full md:max-w-2xl md:mx-auto">
              <div
                aria-hidden
                className="
        pointer-events-none
        absolute -left-6 top-0
        h-full w-px
        bg-linear-to-b
        from-transparent via-zinc-300 to-transparent
        dark:via-zinc-700
      "
              />

              <div
                aria-hidden
                className="
        pointer-events-none
        absolute -right-6 top-0
        h-full w-px
        bg-linear-to-b
        from-transparent via-zinc-300 to-transparent
        dark:via-zinc-700
      "
              />

              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black text-zinc-900 dark:text-white p-4 md:p-5 shadow-lg shadow-black/50 dark:shadow-black/50 ring-1 ring-zinc-200/5 dark:ring-white/5 transition-all duration-300 ease-out hover:shadow-black/70 dark:hover:shadow-black/70 mt-5 md:mt-0">
                {children}
              </div>

              <div>
                <QuoteSection quote='"Don&apos;t worry about failure: you only have to be right once." — Drew Houston' />
              </div>

              {/* Footer */}
              <div className="text-center pb-8 md:pb-0">
                <p className="text-sm text-zinc-500 dark:text-zinc-400 flex items-center justify-center gap-1.5">
                  Made with{" "}
                  <IconHeart className="w-3.5 h-3.5 text-red-500 fill-red-500" />{" "}
                  and{" "}
                  <IconCode className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />{" "}
                  code by Sahil
                </p>
              </div>
            </div>

            <div className="h-14 md:h-24" />
          </main>

          <DockWithAnimation />
        </ThemeProvider>
      </body>
    </html>
  );
}
