import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/lib/content/articles";
import { site } from "@/lib/site";
import { readingMinutes } from "@/lib/reading";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";
import { FinalCta } from "@/components/FinalCta";

export const metadata: Metadata = {
  title: "Insights — Web Development & SEO Guides",
  description:
    "Practical guides on website development and SEO — build costs, choosing a developer, WordPress vs custom, SEO-friendly builds, Core Web Vitals and redesigns.",
  alternates: { canonical: "/insights/" },
  openGraph: {
    title: "Insights — MustafaDev",
    description: "Practical guides on website development, SEO, WordPress and performance.",
    url: "/insights/",
  },
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Insights", path: "/insights/" },
];

export default function InsightsPage() {
  const [lead, ...rest] = articles;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "@id": `${site.url}/insights/`,
            url: `${site.url}/insights/`,
            name: "Insights",
            isPartOf: { "@id": `${site.url}/#website` },
          },
        ]}
      />

      <PageHero
        crumbs={crumbs}
        ghost="Insights"
        kicker="Guides, not sales pages"
        title={
          <>
            Insights for people <em>deciding what to build</em>
          </>
        }
        lede="Costs, trade-offs, checklists and the technical foundations — written
          in plain language, from three years of building and ranking websites."
      />

      <section className="container-x section-pad" aria-label="All articles">
        {/* Lead article */}
        <Reveal>
          <Link href={`/insights/${lead.slug}/`} className="ins-lead group">
            <span className="ins-lead-ghost" aria-hidden>
              01
            </span>
            <div className="relative z-10 max-w-3xl">
              <p className="ins-meta">
                <i>Latest</i>
                <span>{lead.datePublished}</span>
                <span>{readingMinutes(lead)} min read</span>
              </p>
              <h2 className="display mt-5 text-[clamp(1.8rem,3.6vw,3rem)] leading-tight transition-colors group-hover:text-accent2">
                {lead.title}
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{lead.excerpt}</p>
              <span className="mt-7 inline-flex items-center gap-2 font-medium text-accent2">
                Read the guide
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M2 7.5h10M8.5 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </Link>
        </Reveal>

        {/* The rest */}
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {rest.map((a, i) => (
            <Reveal key={a.slug} delay={(i % 2) * 80}>
              <Link href={`/insights/${a.slug}/`} className="card group flex h-full flex-col p-8">
                <p className="ins-meta">
                  <i>{String(i + 2).padStart(2, "0")}</i>
                  <span>{a.datePublished}</span>
                  <span>{readingMinutes(a)} min read</span>
                </p>
                <h2 className="mt-4 text-2xl font-semibold leading-snug transition-colors group-hover:text-accent2">
                  {a.title}
                </h2>
                <p className="mt-3 flex-1 leading-relaxed text-muted">{a.excerpt}</p>
                <span className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-accent2">
                  Read article
                  <svg width="14" height="14" viewBox="0 0 15 15" fill="none" aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                    <path d="M2 7.5h10M8.5 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <FinalCta />
    </>
  );
}
