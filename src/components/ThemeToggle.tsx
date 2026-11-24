"use client";

import { useSyncExternalStore } from "react";

type Theme = "mdt" | "sunlight" | "midnight";

const OPTIONS: { value: Theme; label: string }[] = [
  { value: "mdt", label: "MDT" },
  { value: "sunlight", label: "Sunlight" },
  { value: "midnight", label: "Midnight" },
];

function getTheme(): Theme {
  const t = document.documentElement.dataset.theme;
  return t === "sunlight" || t === "midnight" ? t : "mdt";
}

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

// Three-way pill: MDT (Matrix Digital Train, the default) · Sunlight · Midnight.
// The knob position is driven by CSS (data-theme), so it is correct before hydration.
export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "mdt" as Theme);

  function choose(next: Theme) {
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme-v2", next);
    } catch {}
  }

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className="relative grid h-9 w-52 shrink-0 grid-cols-3 items-center rounded-full bg-[#e4e4e4] p-1 text-[10px] font-bold uppercase tracking-[0.1em] shadow-[inset_0_2px_5px_rgb(0_0_0/0.25),0_1px_0_rgb(255_255_255/0.6)] mdt:bg-[#06140a] mdt:shadow-[inset_0_0_0_1px_rgb(0_255_65/0.45)] sm:w-72 sm:text-[11px]"
    >
      <span
        aria-hidden
        className="absolute inset-y-1 left-1 w-[calc((100%-0.5rem)/3)] translate-x-full rounded-full bg-[#a9a9a9] shadow-[0_2px_6px_rgb(0_0_0/0.35),inset_0_1px_0_rgb(255_255_255/0.35)] transition-[translate,background-color] duration-300 ease-out midnight:translate-x-[200%] midnight:bg-black mdt:translate-x-0 mdt:bg-[#00ff41] mdt:shadow-[0_0_12px_rgb(0_255_65/0.7)] motion-reduce:transition-none"
      />
      {OPTIONS.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={theme === o.value}
          onClick={() => choose(o.value)}
          className={`relative rounded-full py-1 text-center outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-ring ${
            theme === o.value
              ? theme === "mdt"
                ? "text-black"
                : theme === "midnight"
                  ? "text-white"
                  : "text-[#3f3f3f]"
              : theme === "mdt"
                ? "text-white/55"
                : "text-[#3f3f3f]/70"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
