import type { ComponentType, SVGProps } from "react";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DiscordIcon, InstagramIcon, LinkedInIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Social media — CSULBreach",
  description: "Follow the CSULBreach CyberSecurity Club on social media",
};

const socials: {
  name: string;
  handle: string;
  description: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  iconBg: string;
}[] = [
  {
    name: "Instagram",
    handle: "@csulbcybersecurity",
    description: "Event announcements, photos, and club highlights.",
    href: "https://www.instagram.com/csulbcybersecurity",
    icon: InstagramIcon,
    iconBg: "bg-linear-45 from-[#feda75] via-[#d62976] to-[#4f5bd5]",
  },
  {
    name: "Discord",
    handle: "CSULBreach server",
    description: "Chat with members, get help, and hear about meetings first.",
    href: "https://discord.gg/ABhuutDhE",
    icon: DiscordIcon,
    iconBg: "bg-[#5865F2]",
  },
  {
    name: "LinkedIn",
    handle: "CSULB Cyber Security Club",
    description: "Club news, achievements, and professional connections.",
    href: "https://www.linkedin.com/company/csulb-cyber-security-club",
    icon: LinkedInIcon,
    iconBg: "bg-[#0A66C2]",
  },
];

export default function SocialPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold tracking-tight midnight:text-[#6A0DAD]">Social media</h1>
          <p className="mt-2 text-base text-muted-foreground midnight:text-[#6A0DAD]">
            Follow along and stay connected with CSULBreach.
          </p>

          <ul className="mt-10 space-y-4">
            {socials.map((social) => (
              <li key={social.name}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-5 rounded-2xl border border-border bg-card p-5 transition-colors hover:bg-muted"
                >
                  <span
                    className={cn(
                      "flex size-14 shrink-0 items-center justify-center rounded-2xl text-white",
                      social.iconBg
                    )}
                  >
                    <social.icon className="size-7" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-lg font-semibold midnight:text-[#6A0DAD]">{social.name}</span>
                    <span className="block text-sm text-muted-foreground midnight:text-[#c3c8f5]">
                      {social.handle}
                    </span>
                    <span className="mt-1 hidden text-sm text-muted-foreground sm:block midnight:text-[#c3c8f5]">
                      {social.description}
                    </span>
                  </span>
                  <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
