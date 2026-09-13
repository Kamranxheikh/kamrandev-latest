"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Reveal } from "@/components/Reveal";

/* ------------------------------------------------------------------------ *
 *  10 / AI Search — one page, two readers.
 *
 *  A single full-width console instead of unequal columns. The question is
 *  asked at the top; below it the same page is shown twice — the designed
 *  page people see on the left, the markup machines read on the right —
 *  and the two lanes converge into the answer an engine can produce, with
 *  this site as the citable source. The answer types itself once, in view.
 * ------------------------------------------------------------------------ */

const QUESTION = "who should build my business website?";
const ANSWER =
  "Choose a developer who builds the structure in from day one — semantic HTML, " +
  "schema.org entities, clear headings and fast pages. Answer engines cite sources " +
  "they can actually parse.";

/* What an engine can actually read on this site. Each row is real markup this
   page ships — the mechanism, not a claim about being cited. */
type SourceRow = { kind: string; note: string; code: ReactNode };

const sources: SourceRow[] = [
  {
    kind: "h1",
    note: "one clear entity — who, what, where",
    code: (
      <>
        <span className="ai-punc">&lt;</span>
        <span className="ai-tag">h1</span>
        <span className="ai-punc">&gt;</span>
        <span className="ai-str">Muhammad Kamran — Software Developer in Lahore</span>
        <span className="ai-punc">&lt;/</span>
        <span className="ai-tag">h1</span>
        <span className="ai-punc">&gt;</span>
      </>
    ),
  },
  {
    kind: "ld+json",
    note: "structured data a machine can parse without guessing",
    code: (
      <>
        <span className="ai-punc">{"{"}</span>
        {"\n  "}
        <span className="ai-key">&quot;@type&quot;</span>
        <span className="ai-punc">: </span>
        <span className="ai-str">&quot;ProfessionalService&quot;</span>
        <span className="ai-punc">,</span>
        {"\n  "}
        <span className="ai-key">&quot;areaServed&quot;</span>
        <span className="ai-punc">: </span>
        <span className="ai-str">&quot;Worldwide&quot;</span>
        <span className="ai-punc">,</span>
        {"\n  "}
        <span className="ai-key">&quot;address&quot;</span>
        <span className="ai-punc">: </span>
        <span className="ai-str">&quot;Lahore, Punjab, PK&quot;</span>
        {"\n"}
        <span className="ai-punc">{"}"}</span>
      </>
    ),
  },
  {
    kind: "faq",
    note: "questions mapped to answers, in markup",
    code: (
      <>
        <span className="ai-key">&quot;@type&quot;</span>
        <span className="ai-punc">: </span>
        <span className="ai-str">&quot;FAQPage&quot;</span>
        {"\n"}
        <span className="ai-key">&quot;mainEntity&quot;</span>
        <span className="ai-punc">: [ </span>
        <span className="ai-tag">Question</span>
        <span className="ai-punc"> → </span>
        <span className="ai-tag">acceptedAnswer</span>
        <span className="ai-punc"> ]</span>
      </>
    ),
  },
];

/* The designed page, in miniature — the same entity the h1 row declares.
   Rendered (type, colour, real thumbnails), never grey bars. */
function MiniPage() {
  return (
    <div className="ai-mini" aria-hidden>
      <div className="ai-mini-nav">
        <span className="ai-mini-logo">
          Kamran<b>dev</b>
        </span>
        <span className="ai-mini-links">
          <i>Services</i>
          <i>Work</i>
          <i>Contact</i>
        </span>
      </div>

      <div className="ai-mini-hero">
        <p className="ai-mini-kicker">Muhammad Kamran — Software Developer, AI/ML &amp; Full Stack</p>
        <p className="ai-mini-h1">
          Built to be <em>found</em>.
        </p>
        <p className="ai-mini-sub">
          Fast, search-ready websites on WordPress and Next.js.
        </p>
        <span className="ai-mini-row">
          <span className="ai-mini-btn">Start a project</span>
          <span className="ai-mini-ghost">See the work</span>
        </span>
      </div>

      <div className="ai-mini-band">
        <span className="ai-mini-band-t">
          Selected work
          <em>View all</em>
        </span>
        <span className="ai-mini-thumbs">
          <img src="/work/rose-wealth.webp" alt="" loading="lazy" decoding="async" />
          <img src="/work/huckleberrys-restaurant.webp" alt="" loading="lazy" decoding="async" />
          <img src="/work/citygate-financial-planning.webp" alt="" loading="lazy" decoding="async" />
        </span>
      </div>
    </div>
  );
}

export function AiSearch() {
  const consoleRef = useRef<HTMLDivElement>(null);
  const [chars, setChars] = useState(0);
  const [inView, setInView] = useState(false);
  const done = chars >= ANSWER.length;

  /* IO gate: type once, only while on screen; reduced-motion gets it instantly. */
  useEffect(() => {
    const el = consoleRef.current;
    if (!el) return;
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setChars(ANSWER.length);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => setInView(entries[0]?.isIntersecting ?? false),
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || done) return;
    const id = window.setInterval(
      () => setChars((c) => Math.min(c + 1, ANSWER.length)),
      28,
    );
    return () => window.clearInterval(id);
  }, [inView, done]);

  return (
    <section className="border-t border-line bg-bg2" aria-labelledby="ai-heading">
      <div className="container-x section-pad">
        {/* ------------------------- section head ------------------------- */}
        <div className="grid items-end gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]">
          <div>
            <Reveal>
              <p className="label-mono label-mono--accent">10 / AI Search</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 id="ai-heading" className="display mt-5 text-[clamp(2rem,4.6vw,3.6rem)]">
                Search is <em>changing</em>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
                People increasingly get answers from AI-powered search — AI
                Overviews, answer engines, chat assistants. A website now has
                two readers: the person looking at the page, and the machine
                deciding whether to cite it.
              </p>
            </Reveal>
          </div>
          <div>
            <Reveal delay={220}>
              <p className="leading-relaxed text-muted">
                I apply Answer Engine Optimization (AEO) and Generative Engine
                Optimization (GEO) practices during development — no guaranteed
                rankings, just a site built so AI answers can read it, and cite it.
              </p>
            </Reveal>
            <Reveal delay={280}>
              <div className="mt-5 flex flex-wrap gap-2">
                {["AEO", "GEO", "AI Overviews", "Entities", "Semantic HTML"].map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        {/* --------------------------- the console ------------------------ */}
        <Reveal delay={120}>
          <div
            ref={consoleRef}
            className={`ai-console mt-14 ${inView || done ? "ai-console--cited" : ""}`}
          >
            {/* Header */}
            <div className="flex items-center gap-2.5 border-b border-line px-5 py-3.5 sm:px-7">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 text-accent2" aria-hidden>
                <path
                  d="M7 1.5 8.4 5.6 12.5 7 8.4 8.4 7 12.5 5.6 8.4 1.5 7l4.1-1.4L7 1.5Z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="label-mono">An answer engine</span>
              <span className="label-mono label-mono--faint ml-auto">aeo · geo</span>
            </div>

            {/* Question */}
            <div className="flex items-start gap-3.5 border-b border-line px-5 py-4 sm:px-7">
              <span
                aria-hidden
                className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line2 font-mono text-[10px] text-muted"
              >
                Q
              </span>
              <p className="font-mono text-[13px] leading-relaxed text-ink">
                &ldquo;{QUESTION}&rdquo;
              </p>
            </div>

            {/* Two readers, one page */}
            <div className="ai-lanes">
              <div className="ai-lane">
                <p className="ai-lane-cap">
                  <span>What people see</span>
                  <span className="ai-lane-note">the designed page</span>
                </p>
                <MiniPage />
              </div>

              <div className="ai-lane">
                <p className="ai-lane-cap">
                  <span>What machines read</span>
                  <span className="ai-lane-note">the same page, as structure</span>
                </p>
                <ul className="space-y-2.5">
                  {sources.map((s, i) => (
                    <li
                      key={s.kind}
                      className="ai-rise ai-row"
                      style={{ "--d": `${120 + i * 130}ms` } as CSSProperties}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="ai-kind">{s.kind}</span>
                        <span className="ai-row-note">{s.note}</span>
                      </div>
                      <pre className="ai-code">{s.code}</pre>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Both readings converge into the answer */}
            <div className="ai-merge" aria-hidden>
              <svg viewBox="0 0 600 46" preserveAspectRatio="none" fill="none">
                <path className="ai-merge-path" d="M150 0 C 150 30, 300 16, 300 46" />
                <path className="ai-merge-path" d="M450 0 C 450 30, 300 16, 300 46" />
              </svg>
              <span className="ai-merge-node" />
            </div>

            {/* Answer — typed once, in view */}
            <div className="ai-answer">
              <div className="mx-auto w-full max-w-2xl px-5 sm:px-7">
                <div className="flex items-start gap-3.5">
                  <span
                    aria-hidden
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-accent/50 bg-accent/10 font-mono text-[10px] text-accent2"
                  >
                    A
                  </span>
                  <div className="relative flex-1 text-base leading-relaxed text-muted">
                    {/* Ghost reserves the space and carries the accessible copy */}
                    <p className="ai-ghost">{ANSWER}</p>
                    <p className="ai-live" aria-hidden>
                      {ANSWER.slice(0, chars)}
                      {!done && <span className="ai-caret" />}
                    </p>
                  </div>
                </div>
                <div className={`ai-src mt-4 flex flex-wrap items-center gap-3 pl-[2.4rem] ${done ? "ai-src--on" : ""}`}>
                  <span className="label-mono label-mono--faint">source</span>
                  <span className="ai-cite">
                    <span aria-hidden className="ai-cite-dot" />
                    kamrandev.com
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Footnote */}
        <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <p className="label-mono label-mono--faint">
            Shows the mechanics — not a live answer
          </p>
          <p className="text-base text-muted">
            Read more about{" "}
            <Link href="/seo/" className="text-accent2 underline underline-offset-4 hover:text-accent">
              SEO &amp; AI search visibility
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
