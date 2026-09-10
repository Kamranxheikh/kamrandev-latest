"use client";

import { useEffect, useRef } from "react";
import { projects, site } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

function fmt(n: number, pad: number) {
  return String(n).padStart(pad, "0");
}

/**
 * Count-up numeral for the stat band. The server renders the final value
 * (correct without JS and for crawlers); on mount the effect rewinds to zero
 * and counts up over ~900ms the first time the numeral enters the viewport.
 * Reduced motion or no IntersectionObserver: the final value never moves.
 */
function StatNumber({ value, pad = 0 }: { value: number; pad?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    let raf = 0;
    el.textContent = fmt(0, pad);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const duration = 900;
        const step = (now: number) => {
          const p = Math.min(1, (now - t0) / duration);
          const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
          el.textContent = fmt(Math.round(value * eased), pad);
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      el.textContent = fmt(value, pad);
    };
  }, [value, pad]);

  return <span ref={ref}>{fmt(value, pad)}</span>;
}

/* Freelancing has run continuously since 2023 (see `experience` in site.ts),
   so the timeline readout under the years stat is a fact, not a graphic. */
const START_YEAR = 2023;
const YEARS = [2023, 2024, 2025, 2026];

/** 200 delivered projects, 11 of them named in the portfolio. Both real. */
const UNITS = site.projectsShipped;
const NAMED = projects.length;

/* The full scope. `beyond` marks the disciplines a typical web developer
   hands off or skips — the line the section is actually about. */
const points = [
  { term: "Design", note: "Conversion-focused, shaped around your brand.", beyond: false },
  {
    term: "Development",
    note: "WordPress at the core — custom code where it earns its place.",
    beyond: false,
  },
  {
    term: "Technical SEO",
    note: "Architecture, schema and crawlability from day one.",
    beyond: true,
  },
  {
    term: "Performance",
    note: "Core Web Vitals, caching and server-level tuning.",
    beyond: true,
  },
  {
    term: "AI Search Visibility",
    note: "AEO and GEO — visible in AI-generated results.",
    beyond: true,
  },
  {
    term: "VPS Infrastructure",
    note: "Deployments, DNS, SSL/TLS and backups.",
    beyond: true,
  },
  {
    term: "Security & Maintenance",
    note: "Hardening, WAF and updates that keep it fast.",
    beyond: true,
  },
];

function Point({
  index,
  term,
  note,
  beyond,
  rule = true,
}: {
  index: number;
  term: string;
  note: string;
  beyond: boolean;
  rule?: boolean;
}) {
  return (
    <li className={`why-point${rule ? " why-point--rule" : ""}`}>
      <span className={`why-tick${beyond ? " why-tick--on" : ""}`} aria-hidden>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M2.5 7.2 5.8 10.5 11.5 3.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
        </svg>
      </span>
      <span className="min-w-0">
        <span className="why-term">{term}</span>
        <span className="why-note">{note}</span>
      </span>
      <span className="why-pt-idx" aria-hidden>
        {fmt(index + 1, 2)}
      </span>
    </li>
  );
}

export function WhyMe() {
  return (
    <section className="border-t border-line bg-bg2" aria-labelledby="why-heading">
      <div className="container-x section-pad">
        <div className="max-w-3xl">
          <Reveal>
            <p className="label-mono label-mono--accent">
              <span aria-hidden>06 / </span>
              Why Me
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 id="why-heading" className="display mt-5 text-[clamp(2rem,4.6vw,3.6rem)]">
              I understand your website <em>before, during and after</em> launch
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              A website is not finished when it goes live. It has to be crawled, indexed,
              ranked, secured and kept fast. That full lifecycle is the job.
            </p>
          </Reveal>
        </div>

        {/* Stat band — an instrument strip. Every number here is from site.ts. */}
        <Reveal delay={100}>
          <div className="why-band mt-16">
            <div className="why-ruler" aria-hidden />

            <div className="why-cells">
              {/* --- S-01 — years ------------------------------------------ */}
              <div className="why-cell">
                <p className="why-num">
                  <StatNumber value={site.yearsExperience} />
                  <span className="why-plus" aria-hidden>
                    +
                  </span>
                </p>
                <p className="why-lab">Years — web development &amp; SEO</p>
                <div className="why-read" aria-hidden>
                  <div className="why-years">
                    <span className="why-years-fill" />
                  </div>
                  <ul className="why-years-marks">
                    {YEARS.map((y) => (
                      <li key={y}>{y}</li>
                    ))}
                  </ul>
                  <p className="why-foot">
                    Freelance track open since {START_YEAR} — still running
                  </p>
                </div>
              </div>

              {/* --- S-02 — projects --------------------------------------- */}
              <div className="why-cell">
                <p className="why-num">
                  <StatNumber value={site.projectsShipped} />
                  <span className="why-plus" aria-hidden>
                    +
                  </span>
                </p>
                <p className="why-lab">Client projects delivered</p>
                <div className="why-read" aria-hidden>
                  <div className="why-dots">
                    {Array.from({ length: UNITS }, (_, i) => (
                      <span key={i} className={i < NAMED ? "why-dot why-dot--on" : "why-dot"} />
                    ))}
                  </div>
                  <p className="why-foot">
                    1 unit = 1 project · {NAMED} named in the portfolio
                  </p>
                </div>
              </div>

              {/* --- S-03 — reach ------------------------------------------ */}
              <div className="why-cell">
                <p className="why-num why-num--word">Worldwide</p>
                <p className="why-lab">Clients served — based in {site.location.city}</p>
                <div className="why-read" aria-hidden>
                  <dl className="why-coords">
                    <dt>Base</dt>
                    <dd>
                      {site.location.city} · {site.location.region} · PK
                    </dd>
                    <dt>Coord</dt>
                    <dd>31.5204° N &nbsp;74.3587° E</dd>
                    <dt>Shipped to</dt>
                    <dd>
                      <span className="why-flag">United Kingdom</span>
                      <span className="why-flag">International</span>
                    </dd>
                  </dl>
                  <p className="why-foot">Remote-first · UTC+5 · English</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Conviction list — the full scope, with the line most stop at drawn in */}
        <Reveal delay={140}>
          <p className="why-scope-head">
            <span>The scope — working with me</span>
            <span className="why-scope-count" aria-hidden>
              {fmt(points.length, 2)} disciplines
            </span>
          </p>
        </Reveal>
        <div className="mt-4 grid gap-x-16 md:grid-cols-2">
          <Reveal delay={180}>
            <div>
              <ul>
                <Point index={0} {...points[0]} />
                <Point index={1} {...points[1]} rule={false} />
              </ul>
              <p className="why-stop" aria-hidden>
                A typical developer stops here
              </p>
              <ul>
                <Point index={2} {...points[2]} />
              </ul>
            </div>
          </Reveal>
          <Reveal delay={260}>
            <ul>
              {points.slice(3).map((p, i) => (
                <Point key={p.term} index={i + 3} {...p} />
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
