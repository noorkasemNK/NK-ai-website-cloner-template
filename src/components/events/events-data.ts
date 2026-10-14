export interface EventItem {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  date: string; // ISO date, e.g. "2026-10-06"
  time: string;
  location: string;
}

export const eventTags = [
  "Workshop",
  "CTF",
  "Social",
  "Beginner",
  "Guest Speaker",
];

export const events: EventItem[] = [
  {
    slug: "general-body-meeting-5",
    title: "General Body Meeting #5",
    description:
      "Password Hashing Challenge w/ NCL Practice. Please bring your Linux installed beforehand!",
    tags: ["Workshop"],
    date: "2026-10-14",
    time: "12:30 PM – 1:30 PM",
    location: "SS/PA 209",
  },
];
