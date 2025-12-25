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
          <div className="px-4 pt-4 md:px-0 ">
            <div className="md:max-w-xl md:mx-auto ">
              <Navbar />
            </div>
          </div>

          <div className="px-4 pb-6 md:px-0">
            <div
              className="
                mt-3 rounded-2xl border border-zinc-50 dark:border-zinc-800 bg-card dark:bg-neutral-950 p-5
                md:max-w-xl md:mx-auto
                shadow-sm shadow-black/40
                ring-1 ring-white/5
                transition-all duration-300 ease-out
                hover:shadow-black/60 hover:-translate-y-px
              "
            >
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
