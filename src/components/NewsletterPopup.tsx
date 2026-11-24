"use client";

import { useEffect, useRef, useState } from "react";

type Step = "closed" | "ask" | "form" | "done";

const SEEN_KEY = "newsletter-prompt-seen";
const SCHOOL_EMAIL = /^[^\s@]+@(student\.)?csulb\.edu$/i;

// Landing pop-up: "Would you like to subscribe to our newsletter?"
// No → straight to the site. Yes → school-email form (CSULB addresses only).
// Shown once per browser session so it never nags while someone browses.
export function NewsletterPopup() {
  const [step, setStep] = useState<Step>("closed");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SEEN_KEY)) return;
    } catch {}
    setStep("ask");
  }, []);

  function close() {
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {}
    setStep("closed");
  }

  useEffect(() => {
    if (step === "closed") return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [step]);

  useEffect(() => {
    if (step === "form") inputRef.current?.focus();
  }, [step]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const value = email.trim().toLowerCase();
    if (!SCHOOL_EMAIL.test(value)) {
      setError("Please use your CSULB school email (…@student.csulb.edu or …@csulb.edu).");
      return;
    }
    setError("");
    setBusy(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again later.");
      }
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {}
      setStep("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  if (step === "closed") return null;

  const link =
    "text-2xl font-light text-[#4f8df5] transition-opacity hover:opacity-70 focus-visible:underline outline-none sm:text-3xl mdt:text-[#00ff41] mdt:[text-shadow:0_0_10px_rgb(0_255_65/0.6)] midnight:text-[#c3c8f5]";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="newsletter-title"
    >
      <div className="w-full max-w-3xl rounded-none border border-neutral-400 bg-background p-8 text-center shadow-2xl sm:p-12 midnight:border-[#6A0DAD] mdt:border-[#00ff41] mdt:shadow-[0_0_40px_rgb(0_255_65/0.25)]">
        {step === "ask" && (
          <>
            <h2
              id="newsletter-title"
              className="text-3xl font-bold leading-tight tracking-tight text-balance sm:text-5xl"
            >
              Welcome to CSULBreach! Would you like to subscribe to our newsletter!
            </h2>
            <div className="mt-8 flex items-center justify-center gap-16 sm:gap-24">
              <button type="button" onClick={() => setStep("form")} className={link}>
                Yes
              </button>
              <button type="button" onClick={close} className={link}>
                No
              </button>
            </div>
          </>
        )}

        {step === "form" && (
          <form onSubmit={submit} noValidate>
            <h2 id="newsletter-title" className="text-3xl font-bold tracking-tight sm:text-4xl">
              Sign up with your school email
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              CSULB email addresses only (@student.csulb.edu or @csulb.edu).
            </p>
            <input
              ref={inputRef}
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@student.csulb.edu"
              aria-label="School email"
              aria-invalid={!!error}
              className="mt-6 h-12 w-full rounded-none border border-border bg-background px-4 text-base outline-none focus:border-ring focus:ring-2 focus:ring-ring/40"
            />
            {error && (
              <p role="alert" className="mt-3 text-sm text-red-500">
                {error}
              </p>
            )}
            <div className="mt-8 flex items-center justify-center gap-16 sm:gap-24">
              <button type="submit" disabled={busy} className={`${link} disabled:opacity-50`}>
                {busy ? "Sending…" : "Subscribe"}
              </button>
              <button type="button" onClick={close} className={link}>
                No thanks
              </button>
            </div>
          </form>
        )}

        {step === "done" && (
          <>
            <h2 id="newsletter-title" className="text-3xl font-bold tracking-tight sm:text-4xl">
              You&apos;re on the list!
            </h2>
            <p className="mt-3 text-muted-foreground">We&apos;ll email you about upcoming events.</p>
            <div className="mt-8">
              <button type="button" onClick={close} className={link}>
                Continue to the site
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
