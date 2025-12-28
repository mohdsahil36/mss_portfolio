import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import Navbar from "./components/Navbar";
import { FloatingDockDemo } from "./components/floating-dock";

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
    <html
      lang="en"
      suppressHydrationWarning
      className="w-full overflow-x-hidden"
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen w-full max-w-full bg-background text-foreground m-0 p-0 overflow-x-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <div className="sticky top-0 z-50 md:mb-3 w-full max-w-full overflow-x-hidden">
            <div className="h-14 bg-background/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 overflow-hidden w-full max-w-full">
              <div className="h-full px-4 md:px-0 w-full max-w-full">
                <div className="h-full w-full max-w-full md:max-w-2xl md:mx-auto">
                  <Navbar />
                </div>
              </div>
            </div>
          </div>

          <main className="px-4 md:px-0 w-full max-w-full overflow-x-hidden">
            <div className="w-full max-w-full md:max-w-2xl md:mx-auto rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black text-zinc-900 dark:text-white p-4 md:p-5 shadow-lg shadow-black/50 dark:shadow-black/50 ring-1 ring-zinc-200/5 dark:ring-white/5 transition-all duration-300 ease-out hover:shadow-black/70 dark:hover:shadow-black/70 mt-5 md:mt-0">
              {children}
            </div>
            <div className="h-14 md:h-24" />
          </main>

          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
            <FloatingDockDemo />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
