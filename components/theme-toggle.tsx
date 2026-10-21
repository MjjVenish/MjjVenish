"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle dark mode"
      title="Toggle theme"
      className={`relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-surface bg-surface/70 text-foreground shadow-sm transition hover:bg-surface ${className}`}
    >
      {/* Both icons rendered; CSS picks the visible one (no hydration flash) */}
      <Sun className="h-4.5 w-4.5 rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4.5 w-4.5 rotate-90 scale-0 text-primary transition-all duration-500 dark:rotate-0 dark:scale-100" />
    </button>
  );
}
