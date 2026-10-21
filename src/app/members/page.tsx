import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Members — CSULBreach",
  description: "Meet the CSULBreach CyberSecurity Club officers",
};

const members: { name: string; title: string; href?: string }[] = [
  {
    name: "Mindy Yun",
    title: "President",
    href: "https://www.linkedin.com/in/mindy-yun/",
  },
  {
    name: "Andres Cota",
    title: "VP_Operations",
    href: "https://www.linkedin.com/in/andres-a-cota/",
  },
  {
    name: "Bryan Gonzalez",
    title: "VP_Infrastructure",
    href: "https://www.linkedin.com/in/bryan-gonzalez-083458175/",
  },
  {
    name: "Aaron Adelentar",
    title: "Treasurer",
    href: "https://www.linkedin.com/in/aaron-a-a474a8333/",
  },
  {
    name: "Noor Kasem",
    title: "Project Director",
    href: "https://www.linkedin.com/in/noorkasem",
  },
  {
    name: "Lizzette Castro",
    title: "Social Media Director",
    href: "https://www.linkedin.com/in/lizzette-castro/",
  },
  {
    name: "Chyan Giri",
    title: "Outreach Coordinator",
    href: "https://www.linkedin.com/in/chyan-giri-74663a360/",
  },
  {
    name: "David Rincon III",
    title: "Blue Team Captain",
    href: "https://www.linkedin.com/in/david-rincon-iii-a4895b312/",
  },
  {
    name: "Tiago Borges",
    title: "Breach Team Support",
    href: "https://www.linkedin.com/in/tiago-miguel-evora-borges/",
  },
];

export default function MembersPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold tracking-tight midnight:text-[#6A0DAD]">
            Board Members
          </h1>
          <p className="mt-2 text-base text-muted-foreground midnight:text-[#6A0DAD]">
            Meet the team behind CSULBreach.
          </p>
          <p className="mt-1 text-sm text-muted-foreground midnight:text-[#6A0DAD]">
            Click on names to connect.
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
                {member.href ? (
                  <a
                    href={member.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="name-shine mt-4 text-base font-semibold"
                  >
                    {member.name}
                  </a>
                ) : (
                  <p className="mt-4 text-base font-semibold">{member.name}</p>
                )}
                <p className="mt-1 text-sm text-muted-foreground midnight:text-[#facc15]">{member.title}</p>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
