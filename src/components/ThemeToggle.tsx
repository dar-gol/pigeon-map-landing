"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    // Sprawdzamy zapisane ustawienie w localStorage albo systemowy preferowany tryb
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") {
      setTheme(saved);
    } else {
      // Domyślnie pobierz preferencję z systemu
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = resolvedTheme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="ml-6 px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition"
      aria-label="Toggle dark mode"
    >
      {resolvedTheme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
