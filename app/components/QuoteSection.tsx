"use client";

interface QuoteSectionProps {
  quote: string;
  author?: string;
}

export function QuoteSection({ quote, author }: QuoteSectionProps) {
  return (
    <div className="relative w-full pt-8 md:pt-12 pb-4 flex justify-center items-center">
      <div className="relative max-w-3xl text-center">
        <p className="text-sm md:text-lg font-semibold text-zinc-900 dark:text-white leading-snug font-[family-name:var(--font-playfair)] italic">
          {quote}
        </p>
        {author && (
          <p className="mt-3 text-xs text-zinc-600 dark:text-zinc-400 font-[family-name:var(--font-playfair)] italic">
            — {author}
          </p>
        )}
      </div>
    </div>
  );
}
