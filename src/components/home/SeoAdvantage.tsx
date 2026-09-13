import Link from "next/link";
import type { CSSProperties } from "react";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { TiltCard } from "@/components/TiltCard";

const topics = [
  { name: "Technical SEO", note: "crawlability · indexability" },
  { name: "On-Page SEO", note: "titles · content · linking" },
  { name: "Keyword Strategy", note: "intent · demand mapping" },
  { name: "Site Architecture", note: "URL & content structure" },
  { name: "Schema Markup", note: "structured data" },
  { name: "Internal Linking", note: "authority flow" },
  { name: "Core Web Vitals", note: "LCP · INP · CLS" },
  { name: "AI Search Visibility", note: "AEO · GEO" },
];

/** Anatomy annotations, top-to-bottom, matching the plate rows. */
const anatomy = [
  "clean URL",
  "title tag",
  "schema.org markup",
  "meta description",
  "internal links",
];

function Pin({ label, delay }: { label: string; delay: number }) {
  return (
    <span
      className="serp-pin hidden lg:block"
      style={{ "--pin-d": `${delay}ms` } as CSSProperties}
    >
      {label}
    </span>
  );
}

/** Real pages of this site — sitelinks are earned by internal linking. */
const sitelinks = [
  { name: "WordPress Development", note: "Custom themes, no page-builder debt" },
  { name: "SEO & AI Search", note: "Technical SEO, schema, AEO" },
  { name: "Selected Work", note: "Case studies across five industries" },
  { name: "Website Performance", note: "Core Web Vitals as a build target" },
];

/* The second result is deliberately generic — a schematic of a page built
   without the structure. No brand, no invented competitor, no fake ranking. */
const missing = [
  { name: "no structured data", note: "nothing for a rich result to draw" },
  { name: "no meta description", note: "the engine writes the snippet for you" },
  { name: "query-string URL", note: "no words in the path to read" },
  { name: "one generic title", note: "repeated on every page of the site" },
];

function SlashMark() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
      aria-hidden
      className="serp-slash mt-[3px] shrink-0"
    >
      <rect x="0.5" y="0.5" width="10" height="10" stroke="currentColor" />
      <path d="M2 9 9 2" stroke="currentColor" />
    </svg>
  );
}

export function SeoAdvantage() {
  return (
    <section className="overflow-x-clip border-t border-line bg-bg2" aria-labelledby="seo-heading">
      <div className="container-x section-pad grid items-start gap-14 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
        {/* ------------------------------ copy ------------------------------ */}
        <div>
          <SectionHead
            index="08"
            label="The SEO Advantage"
            id="seo-heading"
            title={
              <>
                Your website shouldn&apos;t just exist. People should be able to <em>find it</em>.
              </>
            }
            lede={
              <>
                I&apos;ve spent the last two years doing SEO alongside development — audits,
                keyword research, Search Console, schema, Core Web Vitals. So the
                fundamentals aren&apos;t a service you add later. They&apos;re already in the
                build.
              </>
            }
          />

          {/* Numbered ledger — what ships in every build */}
          <Reveal delay={220}>
            <p className="label-mono label-mono--faint mt-10">In every build</p>
          </Reveal>
          <div className="mt-3 border-t border-line">
            {topics.map((t, i) => (
              <Reveal key={t.name} delay={240 + i * 40}>
                <div className="flex items-baseline gap-4 border-b border-line py-2.5">
                  <span className="font-mono text-[11px] tracking-[0.12em] text-faint" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-base font-medium text-ink">{t.name}</span>
                  <span className="label-mono ml-auto hidden !text-faint sm:inline">{t.note}</span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={320}>
            <Link href="/seo/" className="btn btn-ghost mt-9">
              SEO &amp; AI search visibility
            </Link>
          </Reveal>
        </div>

        {/* --------------- the device: anatomy of a search result ----------- */}
        <Reveal delay={140} className="lg:sticky lg:top-16">
          <div className="lg:mr-40">
            <TiltCard max={4}>
              <div className="serp-plate p-6 sm:p-7">
                {/* Registration marks */}
                <span aria-hidden className="absolute -left-2.5 -top-2.5 h-3 w-3 border-l border-t border-line2 opacity-70" />
                <span aria-hidden className="absolute -right-2.5 -top-2.5 h-3 w-3 border-r border-t border-line2 opacity-70" />
                <span aria-hidden className="absolute -bottom-2.5 -left-2.5 h-3 w-3 border-b border-l border-line2 opacity-70" />
                <span aria-hidden className="absolute -bottom-2.5 -right-2.5 h-3 w-3 border-b border-r border-line2 opacity-70" />

                <span className="label-mono label-mono--faint mb-4 block">A search result</span>

                {/* the query both results below are answering */}
                <div className="serp-query">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className="shrink-0 text-accent">
                    <circle cx="6" cy="6" r="4.25" stroke="currentColor" strokeWidth="1.3" />
                    <path d="M9.2 9.2 12.5 12.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                  <span className="serp-query-text">seo friendly web developer lahore</span>
                  <span aria-hidden className="serp-caret" />
                </div>

                {/* ---------------- result 01 — built with structure -------- */}
                <div className="serp-win mt-6">
                  <div className="mb-3.5 flex flex-wrap items-center gap-x-3 gap-y-2">
                    <span className="serp-rank">01</span>
                    <span className="serp-badge">rich result eligible</span>
                  </div>

                  {/* breadcrumb — clean URL */}
                  <div className="serp-row">
                    <p className="font-mono text-xs tracking-wide text-muted">
                      kamrandev.com <span className="text-faint">› services › seo</span>
                    </p>
                    <Pin label={anatomy[0]} delay={150} />
                  </div>

                  {/* title line — the real one this page would rank with */}
                  <div className="serp-row mt-2">
                    <p className="serp-title">
                      SEO-Ready Web Development in Lahore — Muhammad Kamran
                    </p>
                    <Pin label={anatomy[1]} delay={300} />
                  </div>

                  {/* rating marks — what schema unlocks */}
                  <div className="serp-row mt-4 flex items-center gap-1.5">
                    <span aria-hidden className="flex items-center gap-1.5">
                      <span className="serp-star" />
                      <span className="serp-star" />
                      <span className="serp-star" />
                      <span className="serp-star" />
                      <span className="serp-star" />
                    </span>
                    <span className="label-mono ml-2">drawn from schema</span>
                    <Pin label={anatomy[2]} delay={450} />
                  </div>

                  {/* description — a real meta description, not grey bars */}
                  <div className="serp-row mt-3.5">
                    <p className="serp-desc">
                      <span className="text-faint">Aug 2026 — </span>
                      WordPress websites built with SEO and Core Web Vitals
                      engineered in from the first commit. Semantic structure,
                      schema markup, clean URLs and internal linking, so search
                      engines and AI answers can read you.
                    </p>
                    <Pin label={anatomy[3]} delay={600} />
                  </div>

                  {/* sitelinks — real pages of this site, which is what clean
                      internal linking actually earns you */}
                  <div className="serp-row mt-5 grid grid-cols-2 gap-x-7 gap-y-3.5">
                    {sitelinks.map((l) => (
                      <span key={l.name} className="block">
                        <span className="serp-sitelink">{l.name}</span>
                        <span className="mt-1 block text-[11px] leading-snug text-faint">
                          {l.note}
                        </span>
                      </span>
                    ))}
                    <Pin label={anatomy[4]} delay={750} />
                  </div>
                </div>

                {/* ------ result 02 — same query, no structure -------------- */}
                <div className="serp-alt mt-7">
                  <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <span className="serp-rank serp-rank--dim">02</span>
                    <span className="label-mono !text-faint">
                      same query · page built without the structure
                    </span>
                  </div>

                  <p className="serp-alt-url">
                    example.site <span>› index.php?page_id=482&amp;cat=7</span>
                  </p>
                  <p className="serp-alt-title mt-1.5">Home | Site</p>
                  <p className="serp-alt-desc mt-2">
                    Welcome to our website. We are a company that provides
                    services to customers. Contact us today to find out more
                    about what we can do for you and…
                  </p>

                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {missing.map((m) => (
                      <li key={m.name} className="serp-flag">
                        <SlashMark />
                        <span>
                          <span className="serp-flag-name">{m.name}</span>{" "}
                          <span className="serp-flag-note">— {m.note}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TiltCard>

            {/* Mobile / tablet legend — same annotations, stacked */}
            <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 lg:hidden">
              {anatomy.map((label) => (
                <div key={label} className="flex items-center gap-2.5">
                  <span aria-hidden className="h-[5px] w-[5px] shrink-0 rotate-45 border border-accent bg-bg2" />
                  <span className="label-mono">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
