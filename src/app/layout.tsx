import type { Metadata } from "next";
import { Geist, Geist_Mono, Share_Tech_Mono } from "next/font/google";
import { MatrixBackground } from "@/components/mdt/MatrixBackground";
import { NewsletterPopup } from "@/components/NewsletterPopup";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const shareTechMono = Share_Tech_Mono({
  variable: "--font-matrix",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://csulbcyber.org"),
  title: "CSULBreach — CyberSecurity Club",
  description:
    "CSULBreach is the cybersecurity club at Cal State Long Beach (CSULB). Free for every student, every major: weekly meetings, CTF team, and workshops.",
  openGraph: {
    siteName: "CSULBreach",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="mdt"
      className={`${geistSans.variable} ${geistMono.variable} ${shareTechMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Apply the saved theme before first paint (MDT is the default) so nobody sees a flash of the wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme-v2");if(t==="sunlight"||t==="midnight"||t==="mdt")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <MatrixBackground />
        {children}
        <NewsletterPopup />
      </body>
    </html>
  );
}
