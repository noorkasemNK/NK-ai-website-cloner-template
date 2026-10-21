export function Hero() {
  return (
    <section className="border-b border-border px-4 pt-20 pb-16 text-center sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-6xl midnight:bg-linear-to-b midnight:from-[#b46cf0] midnight:to-[#6b8cf3] midnight:bg-clip-text midnight:text-transparent">
          CSULBreach. CyberSecurity Club
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground text-balance midnight:bg-linear-to-b midnight:from-[#6b8cf3] midnight:to-[#4ea4f2] midnight:bg-clip-text midnight:text-transparent">
          We&apos;re here for you, you&apos;re here to succeed
        </p>

        <div className="mt-10 flex justify-center">
          <a
            href="/events"
            className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/85 midnight:bg-[#facc15] midnight:text-black midnight:hover:bg-[#fde047]"
          >
            Get started
          </a>
        </div>
      </div>
    </section>
  );
}
