"use client";

import { FloatingDock } from "@/components/ui/floating-dock";
import { dockItems } from "@/app/data/dock";

export function FloatingDockDemo() {
  const links = dockItems.map(({ title, href, icon: Icon, external }) => ({
    title,
    href,
    icon: (
      <Icon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    ...(external && { target: "_blank", rel: "noopener noreferrer" }),
  }));

  return <FloatingDock items={links} />;
}
