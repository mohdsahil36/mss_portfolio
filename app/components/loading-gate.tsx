"use client";

import { useLoading } from "./loading-context";

export function LoadingGate({ children }: { children: React.ReactNode }) {
  const { done } = useLoading();

  if (!done) {
    return null;
  }

  return <>{children}</>;
}
