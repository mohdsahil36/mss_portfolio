export type PageNavigationItem = {
  href: string;
  eyebrow: string;
  title: string;
};

export type PageNavigationConfig = {
  previous: PageNavigationItem;
  next: PageNavigationItem;
};

export const standalonePageNavigation: Record<string, PageNavigationConfig> = {
  "/work-experience": {
    previous: {
      href: "/",
      eyebrow: "Previous",
      title: "Player profile",
    },
    next: {
      href: "/impact-log",
      eyebrow: "Next",
      title: "Impact log",
    },
  },
  "/impact-log": {
    previous: {
      href: "/work-experience",
      eyebrow: "Previous",
      title: "Full quest log",
    },
    next: {
      href: "/",
      eyebrow: "Next",
      title: "Player profile",
    },
  },
};
