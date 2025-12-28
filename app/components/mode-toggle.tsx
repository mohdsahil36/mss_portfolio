"use client";

import * as React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useThemeAnimation } from "./theme-animation-context";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const { toggleSwitchTheme } = useThemeAnimation();

  const handleToggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    toggleSwitchTheme(); // trigger smooth animation
    // Delay theme change slightly to allow animation to start
    setTimeout(() => {
      setTheme(newTheme); // actually switch theme
    }, 50);
  };

  return (
    <Button
      onClick={handleToggle}
      variant="outline"
      size="icon"
      className="h-8 w-8 rounded-full border-0 relative cursor-pointer"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
