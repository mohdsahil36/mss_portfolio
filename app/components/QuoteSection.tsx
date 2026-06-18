"use client";

interface QuoteSectionProps {
  quote: string;
  author?: string;
}

export function QuoteSection({ quote, author }: QuoteSectionProps) {
  return (
    <div className="relative w-full py-8">
      <div className="relative overflow-hidden rounded-[1.25rem] border border-[#e8e8e8] bg-white px-5 py-8 text-center dark:border-zinc-800 dark:bg-black sm:px-8 sm:py-10">
        <span className="pointer-events-none absolute left-5 top-2 text-[5rem] font-semibold leading-none text-[#ededed] dark:text-zinc-900">
          “
        </span>
        <span className="pointer-events-none absolute bottom-0 right-6 text-[5rem] font-semibold leading-none text-[#ededed] dark:text-zinc-900">
          ”
        </span>
        <p className="relative mx-auto max-w-[34rem] text-[1rem] font-semibold leading-8 text-[#151719] dark:text-white sm:text-[1.15rem]">
          {quote}
        </p>
        {author && (
          <p className="relative mt-5 text-[0.82rem] font-medium text-[#8a8d95] dark:text-zinc-400">
            — {author}
          </p>
        )}
      </div>
    </div>
  );
}
