import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CalendarPageClient } from "@/components/calendar/CalendarPageClient";

export const metadata: Metadata = {
  title: "Calendar — CSULBreach",
  description: "CSULBreach CyberSecurity Club monthly calendar",
};

export default function CalendarPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <CalendarPageClient />
      </main>
      <Footer />
    </>
  );
}
