"use client";

import { usePathname } from "next/navigation";
import { fallbackQuote, pageQuotes } from "@/app/data/quotes";
import { QuoteSection } from "./QuoteSection";

export function RouteQuote() {
  const pathname = usePathname();
  const quote = pageQuotes[pathname as keyof typeof pageQuotes] ?? fallbackQuote;

  return <QuoteSection quote={quote.quote} author={quote.author} />;
}
