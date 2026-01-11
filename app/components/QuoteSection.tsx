"use client";

interface QuoteSectionProps {
  quote: string;
  author?: string;
}

export function QuoteSection({ quote }: QuoteSectionProps) {
  return (
    <div className="font-mono relative w-full pt-8 md:pt-12 pb-4  flex justify-center items-center">
      {" "}
      <div className="relative max-w-3xl text-center">
        <p className="text-sm md:text-lg font-semibold text-zinc-900 dark:text-white leading-snug">
          {quote}
        </p>
      </div>
    </div>
  );
}
