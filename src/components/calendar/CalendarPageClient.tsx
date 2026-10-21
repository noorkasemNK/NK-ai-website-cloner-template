"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const months = [
  { key: "2026-10", label: "October 2026", src: "/images/calendar/2026-10.png" },
  { key: "2026-11", label: "November 2026", src: "/images/calendar/2026-11.png" },
  { key: "2026-12", label: "December 2026", src: "/images/calendar/2026-12.png" },
];

function currentMonthIndex() {
  const now = new Date();
  const key = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const index = months.findIndex((month) => month.key === key);
  return index === -1 ? 0 : index;
}

export function CalendarPageClient() {
  const [index, setIndex] = useState(currentMonthIndex);
  const month = months[index];
  const isFirst = index === 0;
  const isLast = index === months.length - 1;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold tracking-tight midnight:text-[#6A0DAD]">Calendar</h1>

      <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-[#fdfdfd]">
        <Image
          key={month.key}
          src={month.src}
          alt={`${month.label} calendar`}
          fill
          sizes="(min-width: 1024px) 976px, 100vw"
          className="object-contain p-2"
          priority
        />
      </div>

      <div className="mt-6 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={() => setIndex((i) => i - 1)}
          disabled={isFirst}
          aria-label="Previous month"
          className="flex size-11 items-center justify-center rounded-full border border-border bg-background transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
        >
          <ChevronLeft className="size-5" />
        </button>
        <p className="w-40 text-center text-sm font-medium midnight:text-[#c3c8f5]" aria-live="polite">
          {month.label}
        </p>
        <button
          type="button"
          onClick={() => setIndex((i) => i + 1)}
          disabled={isLast}
          aria-label="Next month"
          className="flex size-11 items-center justify-center rounded-full border border-border bg-background transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  );
}
