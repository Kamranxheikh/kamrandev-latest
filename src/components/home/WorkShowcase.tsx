import Link from "next/link";
import { projects, type Project } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { TiltCard } from "@/components/TiltCard";

/* Every slug here has a real 880x1320 screenshot in /public/work/ — a
   top-of-page crop holding ~2 screenfuls, so translateY(-50%) pans the
   frame to the second screenful. */
const featured = [
  "resumaic",
  "onlinetoolpot",
  "huckleberrys-restaurant",
  "ai-tool-camp",
  "prophero-real-estate-crm",
];

/** One gallery plate: a minimal browser frame holding the live screenshot. */
function Plate({ project: p, index }: { project: Project; index: number }) {
  const href = p.caseStudy ? `/work/${p.slug}/` : "/work/";
  return (
    <article>
      <Link
        href={href}
        aria-label={`View project: ${p.name}`}
        className="wrk-plate block rounded-xl"
      >
        <TiltCard max={3}>
          <div className="wrk-frame">
            {/* chrome bar */}
            <div className="wrk-chrome">
              <span className="wrk-dots" aria-hidden>
                <span />
                <span />
                <span />
              </span>
              <span className="wrk-url" aria-hidden>
                <svg width="8" height="10" viewBox="0 0 8 10" fill="none">
                  <path
                    d="M2 4V2.6A2 2 0 0 1 6 2.6V4"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                  <rect x="0.5" y="4" width="7" height="5.5" rx="1.2" fill="currentColor" opacity="0.85" />
                </svg>
                <span>
                  kamrandev.com<b>/work/{p.slug}</b>
                </span>
              </span>
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                aria-hidden
                className="shrink-0 text-muted"
              >
                <path
                  d="M4 1H1v8h8V6M6 1h3v3M9 1 4.5 5.5"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            {/* the window — exactly one screenful visible, pans on hover */}
            <div className="wrk-view">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/work/${p.slug}.webp`}
                alt={`${p.name} website — built by Muhammad Kamran`}
                width={880}
                height={1320}
                loading="lazy"
                decoding="async"
                className="wrk-shot"
              />
            </div>
          </div>
        </TiltCard>
      </Link>

      {/* printed-portfolio caption */}
      <div className="wrk-meta">
        <span className="wrk-idx" aria-hidden>
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="wrk-meta-txt">
          <p className="wrk-name">{p.name}</p>
          <p className="wrk-industry">{p.industry}</p>
        </div>
        <span className="chip wrk-chip">{p.services[0]}</span>
      </div>
    </article>
  );
}

export function WorkShowcase() {
  const shown = featured
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is Project => Boolean(p));
  const [lead, offset, ...row] = shown;

  return (
    <section className="border-t border-line" aria-labelledby="work-heading">
      <div className="container-x section-pad">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHead
            index="05"
            label="Selected Work"
            title={<span id="work-heading">Real projects, real businesses</span>}
            lede="Restaurants, financial firms, SaaS products, content platforms — different industries, one standard."
          />
          <Reveal delay={200}>
            <Link href="/work/" className="btn btn-ghost mb-2">
              View all work
            </Link>
          </Reveal>
        </div>

        {/* Editorial spread: wide lead plate, offset second, then a row of three. */}
        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-14 sm:mt-20 lg:grid-cols-12 lg:gap-y-20">
          {lead && (
            <Reveal className="lg:col-span-7">
              <Plate project={lead} index={0} />
            </Reveal>
          )}
          {offset && (
            <Reveal delay={120} className="lg:col-span-5 lg:mt-16">
              <Plate project={offset} index={1} />
            </Reveal>
          )}
          {row.map((p, i) => (
            <Reveal key={p.slug} delay={i * 90} className="lg:col-span-4">
              <Plate project={p} index={i + 2} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
