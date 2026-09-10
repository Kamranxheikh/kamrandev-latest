import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-[72px]">
      <div className="grid-bg absolute inset-0" aria-hidden />
      <div className="container-x relative py-20 text-center">
        <p className="label-mono label-mono--accent">404 — Not Found</p>
        <h1 className="display mx-auto mt-6 max-w-2xl text-[clamp(2.4rem,6vw,4.6rem)]">
          This page doesn&apos;t <em>exist</em>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-muted">
          The URL may have changed. Everything worth finding is one click away.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="/" className="btn btn-primary">
            Back to Home
          </Link>
          <Link href="/services/" className="btn btn-ghost">
            Browse Services
          </Link>
          <Link href="/work/" className="btn btn-ghost">
            View Work
          </Link>
        </div>
      </div>
    </section>
  );
}
