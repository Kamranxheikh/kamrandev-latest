import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import { ProcessInstrument } from "@/components/ProcessInstrument";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";
import { FinalCta } from "@/components/FinalCta";

export const metadata: Metadata = {
  title: "Process — From Idea to Website",
  description:
    "How I build websites: discovery, conversion-focused design, clean development, SEO and Core Web Vitals optimization, and a monitored launch.",
  alternates: { canonical: "/process/" },
  openGraph: {
    title: "Process — From Idea to Website",
    description: "Discovery → Design → Develop → Optimize → Launch. One connected process.",
    url: "/process/",
  },
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Process", path: "/process/" },
];

const phases = [
  {
    n: "01",
    name: "Discover",
    tagline: "Understand the business before touching pixels",
    body: [
      "Every project starts with questions, not templates. What does the business sell, who is the website for, what should a visitor do on each page, and which searches should bring people in.",
      "I map competitors, gather the content that exists, and turn all of it into a concrete plan: a sitemap, a page-by-page outline, and the search intent each page should answer.",
    ],
    outputs: ["Business & audience brief", "Competitor snapshot", "Sitemap + page plan", "Keyword & intent map"],
  },
  {
    n: "02",
    name: "Design",
    tagline: "Conversion-first layouts around your brand",
    body: [
      "Design starts from hierarchy: what a visitor must understand first, second, third — on a phone, in seconds. Then the visual identity is shaped around your brand, not squeezed into a theme.",
      "Every layout decision has a job: guide the visitor to one clear action. You review staged previews you can actually click, not static mockups that behave nothing like the web.",
    ],
    outputs: ["UX structure & wireframes", "Visual design system", "Responsive layouts", "Conversion flow"],
  },
  {
    n: "03",
    name: "Develop",
    tagline: "Clean, semantic, maintainable code",
    body: [
      "For most businesses I build on WordPress — my core development specialty — with Elementor Pro, JetEngine and WooCommerce, kept lean, secure and easy for you to edit. When the project is an application, I build custom with Next.js and Node.js.",
      "Either way the markup is semantic, the heading structure is correct, images are optimized, and the build is responsive from the smallest screen up. This is where most SEO problems are born — so this is where I prevent them.",
    ],
    outputs: ["WordPress / custom build", "Semantic HTML structure", "Mobile-first responsive", "Editable CMS setup"],
  },
  {
    n: "04",
    name: "Optimize",
    tagline: "The search and speed layer, before launch",
    body: [
      "Before anything goes live, the technical SEO foundation is completed: metadata, schema markup, internal linking, clean URLs, crawlability and indexability controls.",
      "Performance gets the same rigor — Core Web Vitals tested on real templates, images compressed and sized, caching configured, scripts trimmed. Fast is a requirement, not a hope.",
    ],
    outputs: ["On-page SEO + schema", "Core Web Vitals pass", "Image & asset optimization", "Caching configuration"],
  },
  {
    n: "05",
    name: "Launch",
    tagline: "Deployed, monitored, measurable",
    body: [
      "I deploy to hosting I configure myself — typically a hardened VPS with SSL/TLS, a web application firewall, and automated backups. DNS is handled carefully so nothing drops.",
      "Google Search Console and GA4 are set up and verified, a technical QA checklist is walked through, and you get documentation plus a walkthrough so you own your website — genuinely.",
    ],
    outputs: ["VPS deployment + SSL", "Search Console & GA4", "Technical QA checklist", "Handover & documentation"],
  },
];

export default function ProcessPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": `${site.url}/process/`,
            url: `${site.url}/process/`,
            name: "Process — From Idea to Website",
            isPartOf: { "@id": `${site.url}/#website` },
          },
        ]}
      />

      <PageHero
        crumbs={crumbs}
        ghost="Process"
        kicker="How I work"
        title={
          <>
            From idea <em>to website</em>
          </>
        }
        lede="Five connected phases, one developer. No handoffs between a designer,
          a developer and an SEO who never talk to each other — the person who
          plans your structure is the person who builds and ranks it."
      >
        <dl className="ph-spec max-w-2xl">
          {[
            ["Phases", "Discover → Launch"],
            ["Handoffs", "None"],
            ["You receive", "Something concrete, every phase"],
          ].map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      <section className="container-x section-pad" aria-label="Process phases">
        <ol className="pp-rail flex flex-col gap-8">
          {phases.map((ph, i) => {
            return (
              <Reveal key={ph.n} as="li">
                <div className="grid gap-6 md:grid-cols-[56px_1fr]">
                  <span className="pp-node" aria-hidden>
                    {ph.n}
                  </span>

                  <article className="pp-card">
                    <span className="pp-ghost" aria-hidden>
                      {ph.n}
                    </span>

                    <div className="relative z-10">
                      <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
                        <span className="label-mono label-mono--accent md:hidden">{ph.n}</span>
                        <h2 className="display text-2xl sm:text-3xl">{ph.name}</h2>
                        <p className="text-muted">{ph.tagline}</p>
                      </div>

                      <div className="mt-7 grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
                        <div>
                          {ph.body.map((p, j) => (
                            <p key={j} className={`leading-relaxed text-muted ${j > 0 ? "mt-4" : ""}`}>
                              {p}
                            </p>
                          ))}

                          <p className="label-mono mt-8 mb-2">You receive</p>
                          <ul>
                            {ph.outputs.map((o) => (
                              <li key={o} className="pp-out">
                                <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden>
                                  <path d="M2.5 7.5 5.5 10.5 11.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                {o}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* The phase's instrument — the same live artefact the
                            homepage deck carries, animating in on arrival. */}
                        <div className="max-w-md lg:w-full lg:self-center lg:justify-self-end">
                          <ProcessInstrument index={i} />
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              </Reveal>
            );
          })}
        </ol>

        <Reveal>
          <div className="mt-14 flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-line bg-surface p-8">
            <p className="max-w-xl text-lg text-muted">
              Want to see what this process produces?{" "}
              <Link href="/work/" className="text-accent2 underline underline-offset-4 hover:text-accent">
                Browse the case studies
              </Link>{" "}
              — each one walks through these exact phases.
            </p>
            <Link href="/contact/" className="btn btn-primary">
              Start Your Project
            </Link>
          </div>
        </Reveal>
      </section>

      <FinalCta />
    </>
  );
}
