// app/loading-context.tsx
"use client";

import { createContext, useContext, useState } from "react";

const LoadingContext = createContext({
  done: false,
  setDone: (_: boolean) => {},
});

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [done, setDone] = useState(false);

  return (
    <LoadingContext.Provider value={{ done, setDone }}>
      {children}
    </LoadingContext.Provider>
  );
}

export const useLoading = () => useContext(LoadingContext);
