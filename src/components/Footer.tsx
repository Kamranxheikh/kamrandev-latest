import Link from "next/link";
import { site, services } from "@/lib/site";
import { Logo, LogoMark } from "@/components/Logo";

const company = [
  { label: "About", href: "/about/" },
  { label: "Work", href: "/work/" },
  { label: "Process", href: "/process/" },
  { label: "Insights", href: "/insights/" },
  { label: "Contact", href: "/contact/" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-bg2">
      {/* The mark, bled off the lower-right corner — decoration only. */}
      <LogoMark className="logo-watermark logo-watermark--footer" />

      <div className="container-x section-pad relative z-10 !pb-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo size="lg" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              {site.person} — {site.role} in Lahore, Pakistan.{" "}
              {site.devSpecialty} is my core development specialty. I build
              websites that look incredible, load fast, and are built to be
              found.
            </p>
            <div className="mt-6 flex flex-col gap-2 text-sm">
              <a href={`mailto:${site.email}`} className="text-ink transition-colors hover:text-accent2">
                {site.email}
              </a>
              <a href={site.phoneHref} className="text-muted transition-colors hover:text-accent2">
                {site.phone}
              </a>
              <a
                href={site.linkedin}
                rel="noopener"
                target="_blank"
                className="text-muted transition-colors hover:text-accent2"
              >
                LinkedIn
              </a>
            </div>
          </div>

          <nav aria-label="Services">
            <p className="label-mono mb-5">Services</p>
            <ul className="flex flex-col gap-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/${s.slug}/`}
                    className="text-sm text-muted transition-colors hover:text-ink"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <p className="label-mono mb-5">Studio</p>
            <ul className="flex flex-col gap-2.5">
              {company.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted transition-colors hover:text-ink"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="label-mono mb-5">Start</p>
            <p className="text-sm leading-relaxed text-muted">
              Have an idea for a website? Let&apos;s turn it into something people
              remember — and search engines can understand.
            </p>
            <Link href="/contact/" className="btn btn-ghost mt-5 text-sm">
              Start Your Project
            </Link>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-line pt-6 sm:flex-row">
          <p className="label-mono">
            © {new Date().getFullYear()} {site.person} · {site.location.city},{" "}
            {site.location.country}
          </p>
        </div>
      </div>
    </footer>
  );
}
