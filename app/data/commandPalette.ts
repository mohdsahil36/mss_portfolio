import { sectionDockItems } from "./dock";

export type CommandPaletteItem = {
  title: string;
  description: string;
  href: string;
  group: string;
};

const homeCommandDescriptions: Record<string, string> = {
  "Player profile": "Intro, role, availability, and quick actions",
  "Career quest": "Work timeline and current role snapshot",
  "Impact log": "Production outcomes and measurable wins",
  "Side quests": "Active side projects and builds in progress",
  "Skill tree": "Frontend, backend, tools, and learning stack",
  "Class perks": "Specializations and working strengths",
  "Origin story": "Academic background and foundation",
  "Player stats": "Coding profiles, interests, and activity",
  "Party up": "Contact options and collaboration details",
};

export const commandPaletteItems: CommandPaletteItem[] = [
  ...sectionDockItems.map((item) => ({
    title: item.label,
    description: homeCommandDescriptions[item.label] ?? "Open homepage section",
    href: `/${item.href}`,
    group: "Home",
  })),
  {
    title: "Full work experience",
    description: "Open the detailed quest log",
    href: "/work-experience",
    group: "Pages",
  },
  {
    title: "Full impact log",
    description: "Open detailed impact metrics",
    href: "/impact-log",
    group: "Pages",
  },
];
