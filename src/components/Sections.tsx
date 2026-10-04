import { FeatureRail } from "@/components/FeatureRail";

function AboutSection() {
  return (
    <section
      id="about"
      className="scroll-mt-16 border-b border-border px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          About Us
        </h2>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
          Welcome to the Cybersecurity Club, a community recently revived to
          help students explore, learn, and thrive in the world of
          cybersecurity. Whether you&apos;re a complete beginner curious about
          how hackers think or an experienced student sharpening your skills,
          there&apos;s a place for you here. We host regular General Body
          Meetings (GBMs) where members learn new concepts, share knowledge,
          and connect with peers who share the same drive. Beyond our
          meetings, we compete in the National Cyber League (NCL), tackle
          Capture the Flag (CTF) challenges, and run hands-on blue team
          activities that build real-world defensive skills. Every system we
          secure and every challenge we solve brings us one step closer to
          becoming the defenders our digital world needs. We believe the best
          way to learn is by doing, failing, and trying again, together.
          Cybersecurity isn&apos;t just a career path; it&apos;s a mission to
          protect people, data, and the future. If you&apos;re ready to
          challenge yourself, grow your skills, and be part of something
          bigger, join us and help us build a community where curiosity
          becomes expertise.
        </p>
      </div>
    </section>
  );
}

const tools = ["Kali Linux", "Burp Suite", "Wireshark", "Ghidra", "Metasploit", "Nmap"];

function ToolBadges() {
  return (
    <div className="flex w-full max-w-sm flex-wrap gap-2">
      {tools.map((tool) => (
        <span
          key={tool}
          className="rounded-full border border-border bg-card px-3 py-1.5 font-mono text-xs"
        >
          {tool}
        </span>
      ))}
    </div>
  );
}

const dataPoints = [
  { title: "Private", body: "What happens in our workshops stays in our workshops." },
  { title: "Hands-on", body: "Practice on real labs, not just slides." },
  { title: "Peer-led", body: "Sessions run by fellow students, for students." },
  { title: "Open", body: "Beginners welcome — no experience required." },
];

function DataGrid() {
  return (
    <div className="grid w-full max-w-sm grid-cols-2 gap-4">
      {dataPoints.map((point) => (
        <div key={point.title} className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm font-semibold">{point.title}</p>
          <p className="mt-1 text-xs text-muted-foreground">{point.body}</p>
        </div>
      ))}
    </div>
  );
}

function MembershipCard() {
  return (
    <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-6">
      <p className="text-sm font-medium text-muted-foreground">Membership</p>
      <p className="mt-1 text-3xl font-semibold">Free</p>
      <p className="mt-1 text-xs text-muted-foreground">
        Open to every CSULB student, every major
      </p>
      <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Weekly meetings</span>
          <span>Included</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">CTF team</span>
          <span>Included</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Workshops</span>
          <span>Included</span>
        </div>
      </div>
    </div>
  );
}

export function Sections() {
  return (
    <>
      <AboutSection />
      <FeatureRail
        id="rail-3"
        eyebrow="Keep your setup"
        heading="Work with the tools the industry uses."
        body="Every session is built around the real tools you'll use on the job — no toy environments."
        link={{ label: "See all tools", href: "#events" }}
        visual={<ToolBadges />}
      />
      <FeatureRail
        id="rail-4"
        eyebrow="Your data stays yours"
        heading="A club built on trust."
        body="A welcoming, low-pressure space to learn security skills — beginners included."
        link={{ label: "How we run sessions", href: "#members" }}
        visual={<DataGrid />}
        reverse
      />
      <FeatureRail
        id="rail-5"
        eyebrow="Always free"
        heading="No dues, no hidden costs."
        body="Membership is free for every CSULB student. Show up, join the Discord, and start learning."
        link={{ label: "Join the club", href: "#members" }}
        visual={<MembershipCard />}
      />
    </>
  );
}
