import type { Metadata } from "next";
import Link from "next/link";
import { projects, site } from "@/lib/site";
import { ShotFrame, hasShot } from "@/components/ShotFrame";
import { TiltCard } from "@/components/TiltCard";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";
import { FinalCta } from "@/components/FinalCta";

export const metadata: Metadata = {
  title: "Work — Website Development & SEO Portfolio",
  description:
    "Full stack projects — AI SaaS, multi-tool platforms and content sites on Next.js and Laravel, plus WordPress and WooCommerce builds for restaurants, financial services and e-learning.",
  alternates: { canonical: "/work/" },
  openGraph: {
    title: "Work — KamranDev Portfolio",
    description: "Real products and real client sites across industries.",
    url: "/work/",
  },
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Work", path: "/work/" },
];

/** The three screenshots fanned in the hero — real builds, no mockups. */
const FAN = [
  { slug: "resumaic", name: "Resumaic" },
  { slug: "onlinetoolpot", name: "OnlineToolPot" },
  { slug: "ertakcham", name: "Ertakcham" },
];

export default function WorkPage() {
  const featured = projects.filter((p) => p.caseStudy);
  // Screenshot-backed projects lead the grid; text-only entries row together.
  const more = [...projects.filter((p) => !p.caseStudy)].sort(
    (a, b) => Number(hasShot(b.slug)) - Number(hasShot(a.slug)),
  );

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "@id": `${site.url}/work/`,
            url: `${site.url}/work/`,
            name: "Website Development & SEO Portfolio",
            isPartOf: { "@id": `${site.url}/#website` },
          },
        ]}
      />

      <PageHero
        crumbs={crumbs}
        ghost="Work"
        kicker="Selected projects"
        title={
          <>
            Real projects, <em>real businesses</em>
          </>
        }
        lede="AI SaaS products, tool platforms and content sites — plus restaurants, financial firms and e-learning
          platforms. Different industries, one standard: websites that look
          right, load fast and can be found."
        aside={
          <div className="ph-fan" aria-hidden>
            {FAN.map((f) => (
              <span key={f.slug} className="ph-fan-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/work/${f.slug}.webp`} alt="" loading="eager" decoding="async" />
                <span className="ph-fan-cap">{f.name}</span>
              </span>
            ))}
          </div>
        }
      >
        <dl className="ph-spec max-w-2xl">
          {[
            ["Shipped", `${site.projectsShipped}+ projects`],
            ["Building for", `${site.yearsExperience}+ years`],
            ["Clients", "Worldwide"],
          ].map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      {/* Featured case studies — real screenshots in browser frames */}
      <section className="container-x section-pad" aria-label="Case studies">
        <div className="flex flex-col gap-14 sm:gap-20 lg:gap-28">
          {featured.map((p, i) => (
            <Reveal key={p.slug}>
              <article
                className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                  i % 2 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <Link
                  href={`/work/${p.slug}/`}
                  aria-label={`View case study: ${p.name}`}
                  className="wrk-plate block min-w-0 rounded-xl"
                >
                  <TiltCard max={3}>
                    <ShotFrame project={p} />
                  </TiltCard>
                </Link>
                <div className="min-w-0">
                  <p className="label-mono label-mono--accent">
                    {String(i + 1).padStart(2, "0")}
                    <span className="text-faint"> — {p.industry}</span>
                  </p>
                  <h2 className="display mt-3 text-3xl sm:text-4xl">{p.name}</h2>
                  <p className="mt-4 max-w-lg leading-relaxed text-muted">{p.blurb}</p>
                  <dl className="mt-6 grid max-w-lg grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
                    <dt className="label-mono !text-faint">Role</dt>
                    <dd className="text-muted">{p.role}</dd>
                    <dt className="label-mono !text-faint">Services</dt>
                    <dd className="text-muted">{p.services.join(" · ")}</dd>
                  </dl>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {p.stack.map((t) => (
                      <span key={t} className="chip">
                        {t}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/work/${p.slug}/`}
                    className="group mt-7 inline-flex items-center gap-2 font-medium text-accent2"
                  >
                    Read the case study
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                      <path d="M2 7.5h10M8.5 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* More projects */}
      <section className="border-t border-line bg-bg2" aria-labelledby="more-heading">
        <div className="container-x section-pad">
          <h2 id="more-heading" className="label-mono mb-8">
            More projects &amp; ongoing work
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 70}>
                <article className="card group flex h-full flex-col overflow-hidden !p-0">
                  {hasShot(p.slug) && (
                    <div className="relative aspect-[880/520] overflow-hidden border-b border-line bg-bg2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/work/${p.slug}.webp`}
                        alt={`${p.name} website — built by Muhammad Kamran`}
                        width={880}
                        height={1320}
                        loading="lazy"
                        decoding="async"
                        className="block h-auto w-full transition-transform duration-[2.2s] ease-out group-hover:translate-y-[-32%] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <p className="label-mono flex items-center gap-2">
                      <span
                        aria-hidden
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: `hsl(${p.hue} 70% 55%)` }}
                      />
                      {p.industry}
                    </p>
                    <h3 className="mt-3 text-lg font-semibold">{p.name}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.blurb}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {p.stack.map((t) => (
                        <span key={t} className="chip">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
