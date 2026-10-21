"use client";

import { useSyncExternalStore } from "react";

type Theme = "sunlight" | "midnight";

function getTheme(): Theme {
  return document.documentElement.dataset.theme === "midnight" ? "midnight" : "sunlight";
}

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

// Sliding pill switch between the Sunlight (original) and Midnight themes.
// The knob position and colors are driven by the `midnight:` CSS variant, so the
// switch renders correctly before hydration; React state is only used for aria-checked.
export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "sunlight" as Theme);
  const isMidnight = theme === "midnight";

  function toggle() {
    const next: Theme = isMidnight ? "sunlight" : "midnight";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isMidnight}
      aria-label="Midnight theme"
      onClick={toggle}
      className="relative grid h-9 w-40 shrink-0 grid-cols-2 items-center rounded-full bg-[#e4e4e4] p-1 text-[10px] font-bold uppercase tracking-[0.12em] shadow-[inset_0_2px_5px_rgb(0_0_0/0.25),0_1px_0_rgb(255_255_255/0.6)] outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-48 sm:text-[11px]"
    >
      <span
        aria-hidden
        className="absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-[#a9a9a9] shadow-[0_2px_6px_rgb(0_0_0/0.35),inset_0_1px_0_rgb(255_255_255/0.35)] transition-[translate,background-color] duration-300 ease-out midnight:translate-x-full midnight:bg-black motion-reduce:transition-none"
      />
      <span aria-hidden className="relative text-center text-[#3f3f3f]">
        Sunlight
      </span>
      <span
        aria-hidden
        className="relative text-center text-[#3f3f3f]/55 transition-colors duration-300 midnight:text-white"
      >
        Midnight
      </span>
    </button>
  );
}
