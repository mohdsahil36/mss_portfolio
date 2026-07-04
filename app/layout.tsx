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
import { RouteQuote } from "./components/route-quote";
import { CinematicPreloader } from "./components/cinematic-preloader";
import { LoadingProvider } from "./components/loading-context";
import { LoadingGate } from "./components/loading-gate";
import { SiteFooter } from "./components/site-footer";
import PageTransition from "./components/page-transition";
import { ScrollProgress } from "./components/scroll-progress";
import { SectionDock } from "./components/section-dock";
import { CardHoverBridge } from "./components/card-hover-bridge";
import { SmoothAnchorScroll } from "./components/smooth-anchor-scroll";

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
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <LoadingProvider>
            <CinematicPreloader />

            <LoadingGate>
              <ScrollProgress />
              <CardHoverBridge />
              <SmoothAnchorScroll />
              <header className="sticky top-0 z-[70] isolate h-16 w-full border-b border-zinc-200 bg-[hsl(var(--background))] dark:border-zinc-800">
                <div className="mx-auto h-full w-full px-3 md:w-[78%] md:px-0 lg:w-[64%] xl:w-[40%]">
                  <Navbar />
                </div>
              </header>
              <SectionDock />

              <PageTransition>
                <main className="relative max-w-full overflow-x-hidden px-4 md:px-0">
                  <div className="relative mx-auto w-full md:w-[78%] lg:w-[64%] xl:w-[40%]">
                    <div className="mt-5 p-0">{children}</div>

                    <RouteQuote />

                    <SiteFooter />
                  </div>
                </main>
              </PageTransition>
            </LoadingGate>
          </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
