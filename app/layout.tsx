import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-grid min-h-screen`}
      >
        <div className="h-full rounded-2xl border border-zinc-800 bg-neutral-950 p-5 md:max-w-xl md:mx-auto md:my-20 shadow-sm shadow-black/40 ring-1 ring-white/5 transition-all duration-300 ease-out hover:shadow-black/60 hover:-translate-y-px">
          {children}
        </div>
      </body>
    </html>
  );
}
