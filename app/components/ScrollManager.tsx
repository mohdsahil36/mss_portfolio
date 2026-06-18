"use client";

import { useEffect } from "react";

export default function ScrollManager() {
  useEffect(() => {
    if (window.location.hash) {
      history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    }

    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return null;
}
