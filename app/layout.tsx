import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mohd Sahil Siddiqui",
  description: "Software Engineer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-grid min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="sticky top-0 z-50">
            <div
              className="
                h-14
                bg-background/80
                backdrop-blur-md
                border-b border-zinc-200 dark:border-zinc-800
              "
            >
              <div className="h-full px-4 md:px-0">
                <div className="h-full md:max-w-xl md:mx-auto">
                  <Navbar />
                </div>
              </div>
            </div>
          </div>

          <main className="pt-4 px-4 pb-6 md:px-0">
            <div
              className="
                md:max-w-xl md:mx-auto
                rounded-2xl
                border border-zinc-200 dark:border-zinc-800
                bg-card dark:bg-neutral-950
                p-5
                shadow-sm shadow-black/40
                ring-1 ring-white/5
                transition-all duration-300 ease-out
                hover:shadow-black/60 hover:-translate-y-px
              "
            >
              {children}
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
