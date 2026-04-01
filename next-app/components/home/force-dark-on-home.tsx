"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

/**
 * Forces dark mode on the homepage without permanently overwriting the user's
 * saved preference. When leaving the homepage the original preference is restored.
 */
export function ForceDarkOnHome() {
  const { setTheme } = useTheme();
  const pathname = usePathname();
  const savedTheme = useRef<string | null>(null);

  useEffect(() => {
    const storedTheme = localStorage.getItem("jf-theme");

    if (pathname === "/") {
      if (storedTheme !== "dark") {
        savedTheme.current = storedTheme;
        setTheme("dark");
      }
    } else if (savedTheme.current !== null) {
      setTheme(savedTheme.current || "light");
      savedTheme.current = null;
    }
  }, [pathname, setTheme]);

  return null;
}
