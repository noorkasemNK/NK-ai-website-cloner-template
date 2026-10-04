import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Members — CSULBreach",
  description: "Meet the CSULBreach CyberSecurity Club officers",
};

const members = [
  { name: "Mindy Yun", title: "President" },
  { name: "Andres Cota", title: "VP_Operations" },
  { name: "Bryan Gonzalez", title: "VP_Infrastructure" },
  { name: "Aaron Adelentar", title: "Treasurer" },
  { name: "Noor Kasem", title: "Project Director" },
  { name: "Lizzette Castro", title: "Social Media Director" },
  { name: "Chyan Giri", title: "Outreach Coordinator" },
  { name: "David Rincon III", title: "Blue Team Captain" },
  { name: "Tiago Borges", title: "Breach Team Support" },
];

export default function MembersPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold tracking-tight">Members</h1>
          <p className="mt-2 text-base text-muted-foreground">
            Meet the team behind CSULBreach.
          </p>

          <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
            {members.map((member) => (
              <li key={member.name} className="flex flex-col items-center text-center">
                <div className="relative size-32 overflow-hidden rounded-full border border-border bg-black sm:size-36">
                  <Image
                    src="/images/member-avatar.png"
                    alt={`${member.name} profile picture`}
                    fill
                    sizes="144px"
                    className="object-cover"
                  />
                </div>
                <p className="mt-4 text-base font-semibold">{member.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{member.title}</p>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
