import Link from "next/link";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import type { PageNavigationConfig, PageNavigationItem } from "@/app/data/pageNavigation";

function PageNavButton({
  item,
  direction,
}: {
  item: PageNavigationItem;
  direction: "previous" | "next";
}) {
  const isPrevious = direction === "previous";
  const Icon = isPrevious ? FiArrowLeft : FiArrowRight;

  return (
    <Link
      href={item.href}
      className={`group flex min-h-20 items-center gap-3 rounded-xl border border-[#ededed] bg-white p-4 text-[#151719] transition-[border-color,background-color,box-shadow] duration-300 hover:border-[#d8d8d8] hover:bg-[#fbfbfb] hover:shadow-[0_14px_34px_rgba(15,15,15,0.05)] dark:border-zinc-800 dark:bg-background dark:text-white dark:hover:border-zinc-700 dark:hover:bg-zinc-950 ${
        isPrevious ? "justify-start" : "justify-between sm:text-right"
      }`}
    >
      {isPrevious ? (
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#eeeeee] bg-[#fafafa] text-[#747780] transition-colors duration-300 group-hover:text-[#151719] dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400 dark:group-hover:text-white">
          <Icon className="h-4 w-4" />
        </span>
      ) : null}

      <span className={isPrevious ? "min-w-0" : "min-w-0 flex-1"}>
        <span className="block font-mono text-[0.56rem] font-semibold uppercase tracking-[0.16em] text-[#9a9da5]">
          {item.eyebrow}
        </span>
        <span className="mt-1 block text-[0.86rem] font-semibold leading-5">
          {item.title}
        </span>
      </span>

      {!isPrevious ? (
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#eeeeee] bg-[#fafafa] text-[#747780] transition-colors duration-300 group-hover:text-[#151719] dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400 dark:group-hover:text-white">
          <Icon className="h-4 w-4" />
        </span>
      ) : null}
    </Link>
  );
}

export function PageSiblingNav({ navigation }: { navigation: PageNavigationConfig }) {
  return (
    <nav
      aria-label="Page navigation"
      className="mt-10 grid gap-3 border-t border-[#ededed] pt-6 dark:border-zinc-800 sm:grid-cols-2"
    >
      <PageNavButton item={navigation.previous} direction="previous" />
      <PageNavButton item={navigation.next} direction="next" />
    </nav>
  );
}
