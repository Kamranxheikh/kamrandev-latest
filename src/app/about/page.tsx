import type { Metadata } from "next";
import Link from "next/link";
import { experience, site, techEcosystem } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import { LogoMark } from "@/components/Logo";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";
import { FinalCta } from "@/components/FinalCta";

export const metadata: Metadata = {
  title: `About — ${site.role} in Lahore`,
  description:
    "Fakhar e Mustafa: 3 years of web development and SEO — WordPress, WooCommerce, Core Web Vitals and VPS infrastructure. Based in Lahore, working worldwide.",
  alternates: { canonical: "/about/" },
  openGraph: {
    title: "About Fakhar e Mustafa — MustafaDev",
    description: `${site.role}. ${site.yearsExperience} years of building and ranking websites, with ${site.devSpecialty} as my core development specialty.`,
    url: "/about/",
  },
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about/" },
];

const skillGroups = [
  {
    name: "Development",
    items: techEcosystem.development,
  },
  {
    name: "SEO & AI Search",
    items: [
      "Technical SEO",
      "On-Page SEO",
      "Off-Page SEO",
      "Local SEO",
      "Keyword Research",
      "Schema Markup",
      "Core Web Vitals",
      "AEO",
      "GEO",
      "AI Overviews",
    ],
  },
  {
    name: "Infrastructure",
    items: techEcosystem.infrastructure,
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "@id": `${site.url}/about/`,
            url: `${site.url}/about/`,
            name: "About Fakhar e Mustafa",
            mainEntity: { "@id": `${site.url}/#person` },
            isPartOf: { "@id": `${site.url}/#website` },
          },
        ]}
      />

      <PageHero
        crumbs={crumbs}
        ghost="About"
        kicker={`${site.person} · ${site.location.city}, ${site.location.country}`}
        title={
          <>
            I build websites — <em>and I make sure they get found</em>
          </>
        }
        lede={
          <>
            {site.role} with {site.yearsExperience} years of experience across
            development, technical SEO and server infrastructure.{" "}
            {site.devSpecialty} is my core development specialty. One person,
            the whole stack — from the first wireframe to the VPS your website
            runs on.
          </>
        }
        aside={
          <div className="ab-id" aria-label="Profile summary">
            <div className="ab-id-head">
              <LogoMark className="h-8 w-8" />
              <b>
                Mustafa<span className="ml-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-accent2">dev</span>
              </b>
              <span>
                <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                Open to projects
              </span>
            </div>
            <div className="ab-id-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/about/fakhar-e-mustafa-wide.webp"
                alt={`${site.person} — ${site.role}, ${site.location.city}`}
                width={1000}
                height={625}
                loading="eager"
                decoding="async"
              />
              <span className="ab-id-photo-cap" aria-hidden>
                {site.person}
              </span>
            </div>
            <dl className="ab-id-rows">
              {[
                ["Name", site.person],
                ["Role", site.role],
                ["Specialty", `${site.devSpecialty} development`],
                ["Base", `${site.location.city}, ${site.location.country} — clients worldwide`],
                ["Experience", `${site.yearsExperience}+ years · ${site.projectsShipped}+ projects`],
                ["Education", "BS Computer Science, Riphah Int’l University"],
                ["Languages", "English (professional) · Urdu (native)"],
              ].map(([k, v]) => (
                <div key={k} className="ab-id-row">
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <div className="ab-id-foot">
              {["WordPress", "Technical SEO", "Core Web Vitals", "VPS"].map((c) => (
                <span key={c} className="chip">
                  {c}
                </span>
              ))}
            </div>
          </div>
        }
      />

      {/* Story */}
      <section className="container-x section-pad !pb-0">
        <div className="grid gap-8 lg:grid-cols-[220px_1fr] lg:gap-16">
          <p className="label-mono label-mono--accent pt-2">01 / The short version</p>
          <div className="max-w-3xl">
            <p className="text-xl leading-relaxed">
              Most websites are built by a developer, then handed to an SEO
              specialist, then hosted by whoever was cheapest. Every handoff
              loses something.
            </p>
            <p className="mt-5 leading-relaxed text-muted">
              I&apos;ve spent {site.yearsExperience} years doing all three jobs at
              once. At Blue-IT Technologies I built responsive WordPress websites
              and custom Elementor interfaces for international clients — and
              after each build, I was also the one implementing on-page SEO,
              metadata, internal linking and schema markup. At Webinfites I
              develop and maintain WordPress and WooCommerce sites, deploy them
              to VPS servers I administer myself, and run the technical SEO
              audits, keyword research and Core Web Vitals work behind them.
            </p>
            <p className="mt-5 leading-relaxed text-muted">
              That combination shapes how I build. I know which development
              decisions cause SEO problems, because I&apos;ve spent years fixing
              those problems on other people&apos;s builds. I know what makes a
              server fast and safe, because I harden and monitor them myself. And
              I&apos;m already applying AEO and GEO practices so websites stay
              visible as search shifts toward AI-generated answers.
            </p>
            <p className="mt-5 leading-relaxed text-muted">
              I hold a BS in Computer Science from Riphah International
              University, Lahore, and work in English (professional) and Urdu
              (native).
            </p>
          </div>
        </div>
      </section>

      {/* Experience timeline */}
      <section className="container-x section-pad !pb-0" aria-labelledby="exp-heading">
        <div className="grid gap-8 lg:grid-cols-[220px_1fr] lg:gap-16">
          <h2 id="exp-heading" className="label-mono label-mono--accent pt-2">
            02 / Experience
          </h2>
          <ol className="flex max-w-3xl flex-col gap-12 border-l border-line pl-8">
            {experience.map((job, i) => (
              <Reveal key={job.company} delay={i * 100} as="li">
                <div className="relative">
                  <span
                    aria-hidden
                    className={`absolute -left-[37px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-bg ${
                      job.period.endsWith("Present") ? "bg-accent" : "bg-line2"
                    }`}
                  />
                  <p className="label-mono">{job.period}</p>
                  <h3 className="mt-2 text-2xl font-semibold">{job.company}</h3>
                  <p className="mt-1 text-accent2">{job.role}</p>
                  <ul className="mt-4 flex flex-col gap-2">
                    {job.points.map((pt) => (
                      <li key={pt} className="flex gap-3 leading-relaxed text-muted">
                        <span aria-hidden className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent/70" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Skills */}
      <section className="container-x section-pad" aria-labelledby="skills-heading">
        <div className="grid gap-8 lg:grid-cols-[220px_1fr] lg:gap-16">
          <h2 id="skills-heading" className="label-mono label-mono--accent pt-2">
            03 / Toolbox
          </h2>
          <div className="grid max-w-3xl gap-5 sm:grid-cols-3">
            {skillGroups.map((g, i) => (
              <Reveal key={g.name} delay={i * 80}>
                <div className="card h-full p-6">
                  <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-accent2">
                    {g.name}
                  </h3>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {g.items.map((s) => (
                      <li key={s} className="chip">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-links */}
      <section className="border-t border-line bg-bg2">
        <div className="container-x flex flex-wrap items-center justify-between gap-6 py-12">
          <p className="text-lg text-muted">
            See how this shows up in practice —{" "}
            <Link href="/work/" className="text-accent2 underline underline-offset-4 hover:text-accent">
              browse my work
            </Link>{" "}
            or{" "}
            <Link href="/process/" className="text-accent2 underline underline-offset-4 hover:text-accent">
              read my process
            </Link>
            .
          </p>
          <a href={site.linkedin} target="_blank" rel="noopener" className="btn btn-ghost">
            Connect on LinkedIn
          </a>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
