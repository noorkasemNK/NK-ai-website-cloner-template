import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const SCHOOL_EMAIL = /^[^\s@]+@(student\.)?csulb\.edu$/i;

// Newsletter sign-ups (CSULB emails only).
// - If NEWSLETTER_WEBHOOK_URL is set (e.g. a Google Apps Script that appends a row to a Sheet, which
//   exports to Excel), each sign-up is POSTed there as JSON.
// - In local development with no webhook, sign-ups append to data/newsletter-signups.csv (git-ignored).
// - In production with no webhook, the endpoint reports "not configured" instead of silently dropping emails.
export async function POST(request: Request) {
  let email = "";
  try {
    const body = await request.json();
    email = String(body?.email ?? "").trim().toLowerCase();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!SCHOOL_EMAIL.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Please use your CSULB school email." }, { status: 400 });
  }

  const signedUpAt = new Date().toISOString();
  const webhook = process.env.NEWSLETTER_WEBHOOK_URL;

  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, signedUpAt }),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
      return NextResponse.json({ ok: true });
    } catch {
      return NextResponse.json({ error: "Could not save your sign-up. Please try again later." }, { status: 502 });
    }
  }

  if (process.env.NODE_ENV !== "production") {
    const dir = path.join(process.cwd(), "data");
    await mkdir(dir, { recursive: true });
    await appendFile(path.join(dir, "newsletter-signups.csv"), `${signedUpAt},${email}\n`);
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Newsletter sign-up isn't available yet." }, { status: 503 });
}
