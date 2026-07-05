import { sectionDockItems } from "./dock";
import { beyondCodeSection, codingProfileData, interestsData } from "./beyondCode";
import { contactData } from "./contact";
import { educationData, educationSection } from "./education";
import { impactMetrics, impactSection } from "./impact";
import { projectSection, projects } from "./projects";
import { skillsData, skillsSection } from "./skills";
import {
  specializationItems,
  specializationSection,
} from "./specialization";
import { workingStyleData } from "./workingStyle";
import { workExperience, workSection } from "./workExperience";

export type CommandPaletteItem = {
  title: string;
  description: string;
  href: string;
  group: string;
  keywords?: string[];
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

const compact = (items: Array<string | number | undefined | null>) =>
  items.filter((item): item is string | number => item !== undefined && item !== null).map(String);

const projectKeywords = compact([
  projectSection.title,
  projectSection.summary,
  ...projects.flatMap((project) => [
    project.title,
    project.description,
    project.status,
    project.type,
    project.github,
    project.live,
    ...(project.stack ?? []),
    ...(project.highlights ?? []),
  ]),
]);

const skillKeywords = compact([
  skillsSection.title,
  skillsSection.summary,
  ...skillsData.flatMap((category) => [
    category.title,
    ...category.skills.map((skill) => skill.name),
  ]),
]);

const workKeywords = compact([
  workSection.title,
  workSection.summary,
  ...workExperience.flatMap((item) => [
    item.company,
    item.role,
    item.status,
    item.type,
    item.summary,
    item.location,
    item.date,
    ...(item.summaryTags ?? []),
    ...item.points,
    ...item.techStack.map((tech) => tech.name),
    ...(item.projects ?? []).flatMap((project) => [
      project.name,
      project.summary,
      ...project.workDone,
      ...project.impactMade,
    ]),
  ]),
]);

const impactKeywords = compact([
  impactSection.title,
  impactSection.summary,
  ...impactMetrics.flatMap((metric) => [
    metric.value,
    metric.label,
    metric.note,
    metric.delta,
    metric.period,
    metric.marker,
    metric.visual,
    ...metric.details,
  ]),
]);

const specializationKeywords = compact([
  specializationSection.title,
  specializationSection.summary,
  workingStyleData.title,
  workingStyleData.intro,
  workingStyleData.summary,
  ...specializationItems.flatMap((item) => [item.title, item.description]),
  ...workingStyleData.groups.flatMap((group) => [group.title, ...group.items]),
]);

const educationKeywords = compact([
  educationSection.title,
  educationSection.summary,
  educationData.degree,
  educationData.institute,
  educationData.duration,
  educationData.meta,
  educationData.CGPA,
]);

const beyondCodeKeywords = compact([
  beyondCodeSection.title,
  beyondCodeSection.summary,
  ...interestsData.map((interest) => interest.label),
  codingProfileData.title,
  codingProfileData.username,
  codingProfileData.leetcodeUsername,
  ...codingProfileData.tabs.flatMap((tab) => [tab.label, tab.comment, tab.href]),
  ...codingProfileData.years.flatMap((year) => [
    year.year,
    year.totalContributions,
    ...year.stats.flatMap((stat) => [stat.label, stat.value]),
  ]),
]);

const contactKeywords = compact([
  contactData.eyebrow,
  contactData.title,
  contactData.summary,
  contactData.availability,
  ...contactData.actions.flatMap((action) => [
    action.label,
    action.value,
    action.href,
    action.variant,
  ]),
]);

const homeCommandKeywords: Record<string, string[]> = {
  "Player profile": [
    "Mohd Sahil Siddiqui",
    "Software Engineer Frontend",
    "Bengaluru",
    "Kanpur",
    "resume",
    "email",
    "github",
    "linkedin",
  ],
  "Career quest": workKeywords,
  "Impact log": impactKeywords,
  "Side quests": projectKeywords,
  "Skill tree": skillKeywords,
  "Class perks": specializationKeywords,
  "Origin story": educationKeywords,
  "Player stats": beyondCodeKeywords,
  "Party up": contactKeywords,
};

export const commandPaletteItems: CommandPaletteItem[] = [
  ...sectionDockItems.map((item) => ({
    title: item.label,
    description: homeCommandDescriptions[item.label] ?? "Open homepage section",
    href: `/${item.href}`,
    group: "Home",
    keywords: homeCommandKeywords[item.label] ?? [],
  })),
  {
    title: "Full work experience",
    description: "Open the detailed quest log",
    href: "/work-experience",
    group: "Pages",
    keywords: workKeywords,
  },
  {
    title: "Full impact log",
    description: "Open detailed impact metrics",
    href: "/impact-log",
    group: "Pages",
    keywords: impactKeywords,
  },
];
