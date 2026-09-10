import type { Metadata } from "next";
import type { ReactNode } from "react";
import { site } from "@/lib/site";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Contact — Start Your Website Project",
  description:
    "Tell me about your website project. Email, WhatsApp or LinkedIn — I usually reply within a day. Based in Lahore, Pakistan, working with clients worldwide.",
  alternates: { canonical: "/contact/" },
  openGraph: {
    title: "Contact — Start Your Website Project",
    description: "Tell me about your website project. I usually reply within a day.",
    url: "/contact/",
  },
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact/" },
];

/* Line-drawn glyphs, one per channel — same stroke language as the rest of
   the site's instruments. */
const glyphs: Record<string, ReactNode> = {
  Email: (
    <svg width="19" height="19" viewBox="0 0 20 20" fill="none" aria-hidden>
      <rect x="2" y="4.5" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="m3.5 6.5 6.5 5 6.5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  WhatsApp: (
    <svg width="19" height="19" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M10 3a7 7 0 0 0-6 10.5L3 17l3.6-.95A7 7 0 1 0 10 3Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M7.5 8.2c.3 2 2.3 4 4.3 4.3l1-1.2-1.8-1-.7.5c-.6-.4-1.1-.9-1.4-1.5l.5-.7-1-1.7-.9 1.3Z" fill="currentColor" />
    </svg>
  ),
  Phone: (
    <svg width="19" height="19" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M4 3.5h3l1.2 3.4-1.7 1.3a10.5 10.5 0 0 0 4.3 4.3l1.3-1.7 3.4 1.2v3a1.5 1.5 0 0 1-1.6 1.5C8.2 16 4 11.8 3.5 6.1A1.5 1.5 0 0 1 4 3.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  ),
  LinkedIn: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
      <rect x="2.5" y="2.5" width="15" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M6.4 8.6v5M6.4 6.2v.1M9.5 13.6V10.6c0-1.1.8-2 1.9-2s1.9.9 1.9 2v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
};

const channels = [
  {
    name: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    note: "Best for project briefs",
  },
  {
    name: "WhatsApp",
    value: site.phone,
    href: site.whatsapp,
    note: "Quick questions",
  },
  {
    name: "Phone",
    value: site.phone,
    href: site.phoneHref,
    note: "PKT (UTC+5)",
  },
  {
    name: "LinkedIn",
    // The visible handle comes from the canonical URL so it can never drift.
    value: site.linkedin.replace(/\/+$/, "").split("/").pop()!,
    href: site.linkedin,
    note: "Professional profile",
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "@id": `${site.url}/contact/`,
            url: `${site.url}/contact/`,
            name: "Contact",
            isPartOf: { "@id": `${site.url}/#website` },
            mainEntity: { "@id": `${site.url}/#person` },
          },
        ]}
      />

      <PageHero
        crumbs={crumbs}
        ghost="Contact"
        compact
        kicker={
          <span className="inline-flex items-center gap-2">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
            Usually replies within a day
          </span>
        }
        title={
          <>
            Let&apos;s build <em>your website</em>
          </>
        }
        lede="Tell me what the business does and what the website should achieve.
          I&apos;ll reply with honest thoughts on scope, approach and timeline —
          usually within a day."
      >
        <dl className="ph-spec max-w-2xl">
          {[
            ["Base", `${site.location.city}, ${site.location.country}`],
            ["Timezone", "PKT (UTC+5)"],
            ["Clients", "Worldwide"],
          ].map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      <section className="container-x section-pad grid gap-12 lg:grid-cols-[1.3fr_1fr]">
        <Reveal>
          <ContactForm />
        </Reveal>

        <div className="flex flex-col gap-4">
          {channels.map((c, i) => (
            <Reveal key={c.name} delay={i * 70}>
              <a
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener" : undefined}
                className="ct-card group"
              >
                <span className="ct-glyph">{glyphs[c.name]}</span>
                <div className="min-w-0 flex-1">
                  <p className="label-mono">{c.name}</p>
                  <p className="mt-1 truncate font-medium transition-colors group-hover:text-accent2">
                    {c.value}
                  </p>
                  <p className="mt-0.5 text-xs text-faint">{c.note}</p>
                </div>
                <svg width="18" height="18" viewBox="0 0 14 14" fill="none" aria-hidden className="shrink-0 text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent2">
                  <path d="M3 11 11 3M4.5 3H11v6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </Reveal>
          ))}

          <Reveal delay={300}>
            <div className="card p-6">
              <p className="label-mono label-mono--accent">What happens next</p>
              <ol className="mt-4 flex flex-col gap-3">
                {[
                  "You send a short brief — rough is fine.",
                  "I reply with questions, an approach and a realistic estimate.",
                  "If it fits, we scope it properly on a call.",
                ].map((s, i) => (
                  <li key={s} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <span className="font-mono text-xs text-accent2">0{i + 1}</span>
                    {s}
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
