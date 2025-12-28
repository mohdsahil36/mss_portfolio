"use client";

import { createContext, useContext, ReactNode } from "react";
import {
  useModeAnimation,
  ThemeAnimationType,
} from "react-theme-switch-animation";

interface ThemeAnimationContextType {
  ref: React.RefObject<HTMLDivElement>;
  toggleSwitchTheme: () => void;
}

const ThemeAnimationContext = createContext<ThemeAnimationContextType | null>(
  null
);

export function ThemeAnimationProvider({ children }: { children: ReactNode }) {
  // Configure transition direction and animation type here
  // Available animation types: ThemeAnimationType.CIRCLE, ThemeAnimationType.BLUR_CIRCLE
  // You can also customize duration and easing
  const { ref, toggleSwitchTheme } = useModeAnimation({
    animationType: ThemeAnimationType.CIRCLE, // Change this to control animation direction/type
    duration: 750, // Animation duration in milliseconds
    easing: "ease-in-out", // Easing function: 'ease-in-out', 'ease-in', 'ease-out', 'linear', etc.
  });

  return (
    <ThemeAnimationContext.Provider
      value={{
        ref: ref as unknown as React.RefObject<HTMLDivElement>,
        toggleSwitchTheme,
      }}
    >
      <div
        ref={ref as unknown as React.RefObject<HTMLDivElement>}
        className="min-h-screen"
      >
        {children}
      </div>
    </ThemeAnimationContext.Provider>
  );
}

export function useThemeAnimation() {
  const context = useContext(ThemeAnimationContext);
  if (!context) {
    throw new Error(
      "useThemeAnimation must be used within ThemeAnimationProvider"
    );
  }
  return context;
}
