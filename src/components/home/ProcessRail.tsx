"use client";

import Link from "next/link";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";

export const processSteps = [
  {
    n: "01",
    name: "Discover",
    items: ["Business goals", "Audience", "Competitors"],
    body: "Every build starts with the business — what you sell, who you serve, and what the website must achieve. We agree what success looks like before anything is designed.",
    out: "a signed brief",
    tools: ["GA4", "Search Console", "Ahrefs"],
  },
  {
    n: "02",
    name: "Design",
    items: ["UX strategy", "Visual identity", "Conversion flow"],
    body: "Layouts and identity shaped around your brand, engineered to move visitors toward one clear action. You review real layouts — not moodboards — before any code.",
    out: "approved layouts",
    tools: ["Wireframes", "12-col grid", "Type scale"],
  },
  {
    n: "03",
    name: "Develop",
    items: ["WordPress / Next.js", "Custom code", "Responsive build"],
    body: "Clean, semantic, maintainable code — WordPress, WooCommerce or custom Next.js, built mobile-first. Fast for you to edit, hard for anyone to break.",
    out: "a working site",
    tools: ["WordPress", "Next.js", "WooCommerce"],
  },
  {
    n: "04",
    name: "Optimize",
    items: ["Technical SEO", "Core Web Vitals", "Schema"],
    body: "The search layer: crawlability, structured data, internal linking and performance tuned before launch — so search engines meet a clean, structured site on day one.",
    out: "a passing audit",
    tools: ["Schema.org", "Lighthouse", "GSC"],
  },
  {
    n: "05",
    name: "Launch",
    items: ["Analytics", "Search Console", "Technical QA"],
    body: "Deployed on hardened hosting with monitoring wired in — analytics and Search Console live from the first day, so we can see how the site actually performs.",
    out: "a live, monitored site",
    tools: ["VPS + SSL", "GA4", "Search Console"],
  },
];

/* ------------------------- station instruments ---------------------------
   One real artefact per station: a signed brief, a drafting pad carrying an
   actual wireframe, a syntax-coloured template file, the <head> block that
   makes a page findable, and the deploy log that puts it live.

   The whole bay is aria-hidden — it is an illustration. The information it
   depicts is exposed to assistive tech by the tag row in the copy column. */

function delay(j: number, step = 120): CSSProperties {
  return { "--d": `${j * step}ms` } as CSSProperties;
}

function Tick({ size = 8 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" fill="none" aria-hidden>
      <path
        d="M1 4.2 3.1 6.3 7 1.7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Bay({
  cap,
  meta,
  children,
}: {
  cap: string;
  meta: string;
  children: ReactNode;
}) {
  return (
    <div className="prc-inst" aria-hidden>
      <p className="prc-inst-cap">
        <span>{cap}</span>
        <span className="prc-inst-meta">{meta}</span>
      </p>
      <div className="prc-inst-body">{children}</div>
    </div>
  );
}

/* --- 01 · the brief: a real checklist, every line answered and sourced --- */

const BRIEF: Array<[string, string]> = [
  ["Business goals", "CLIENT"],
  ["Target audience", "CLIENT"],
  ["Competitor set", "AHREFS"],
  ["Search demand", "GSC"],
  ["Conversion action", "GA4"],
  ["Content inventory", "CRAWL"],
];

function InstrumentBrief() {
  return (
    <Bay cap="Project brief" meta="What you need">
      <div className="prc-doc">
        <div className="prc-doc-head">
          <p className="prc-doc-title">Project brief</p>
          <span className="prc-stamp">Signed off</span>
        </div>
        <ul className="prc-check">
          {BRIEF.map(([label, source], j) => (
            <li key={label} className="prc-in" style={delay(j, 90)}>
              <span className="prc-tickbox" style={delay(j, 90)}>
                <Tick />
              </span>
              <span className="prc-check-t">{label}</span>
              <span className="prc-check-d">{source}</span>
            </li>
          ))}
        </ul>
        <p className="prc-doc-foot">6 of 6 answered before a pixel is drawn</p>
      </div>
    </Bay>
  );
}

/* --- 02 · the drafting pad: grid, registration marks, a real wireframe --- */

const WIRE_CARDS: Array<[string, string]> = [
  ["SEO", "Technical"],
  ["BUILD", "WordPress"],
  ["SPEED", "Core Vitals"],
];

function InstrumentGrid() {
  return (
    <Bay cap="Layout" meta="12 columns">
      <div className="prc-pad">
        <span className="prc-pad-mark prc-pad-mark--tl" />
        <span className="prc-pad-mark prc-pad-mark--tr" />
        <span className="prc-pad-mark prc-pad-mark--bl" />
        <span className="prc-pad-mark prc-pad-mark--br" />

        <div className="prc-wire">
          <div className="prc-wire-nav prc-in" style={delay(0, 90)}>
            <span className="prc-wire-logo">KAMRANDEV</span>
            <span className="prc-wire-links">
              <i>Services</i>
              <i>Work</i>
              <i>Contact</i>
            </span>
          </div>

          <div className="prc-wire-hero prc-in" style={delay(1, 90)}>
            <div>
              <p className="prc-wire-h1">
                Built to be <em>found</em>
              </p>
              <p className="prc-wire-sub">One page. One action.</p>
              <span className="prc-wire-cta">Start a project</span>
            </div>
            <span className="prc-wire-img" />
          </div>

          <div className="prc-wire-band prc-in" style={delay(2, 90)}>
            <span className="prc-wire-band-t">
              Selected work
              <em>View all</em>
            </span>
            <span className="prc-wire-thumbs">
              <i />
              <i />
              <i />
            </span>
          </div>

          <div className="prc-wire-row prc-in" style={delay(3, 90)}>
            {WIRE_CARDS.map(([t, s]) => (
              <span key={t} className="prc-wire-card">
                <b>{t}</b>
                <span>{s}</span>
              </span>
            ))}
          </div>
        </div>

        <span className="prc-dim">
          <i />
          12 COL / 1440
          <i />
        </span>
      </div>
    </Bay>
  );
}

/* --- 03 · the build: a real WordPress template, syntax-coloured --------- */

type Tok = [cls: string, text: string];

function CodeLines({ lines, hit }: { lines: Tok[][]; hit?: number }) {
  return (
    <ol className="prc-code">
      {lines.map((toks, j) => (
        <li
          key={j}
          className={`prc-in${hit === j ? " is-hit" : ""}`}
          style={delay(j, 55)}
        >
          <span className="prc-ln">{j + 1}</span>
          <code>
            {toks.map(([cls, text], k) => (
              <span key={k} className={cls}>
                {text}
              </span>
            ))}
          </code>
        </li>
      ))}
    </ol>
  );
}

const TEMPLATE: Tok[][] = [
  [["prc-p", "<?php "], ["prc-f", "get_header"], ["prc-p", "(); ?>"]],
  [],
  [["prc-p", "<"], ["prc-t", "main"], ["prc-a", " id"], ["prc-p", "="], ["prc-s", '"site-main"'], ["prc-p", ">"]],
  [["prc-p", "  <"], ["prc-t", "h1"], ["prc-a", " class"], ["prc-p", "="], ["prc-s", '"entry-title"'], ["prc-p", ">"]],
  [["prc-p", "    <?php "], ["prc-f", "the_title"], ["prc-p", "(); ?>"]],
  [["prc-p", "  </"], ["prc-t", "h1"], ["prc-p", ">"]],
  [["prc-p", "  <?php "], ["prc-f", "the_content"], ["prc-p", "(); ?>"]],
  [["prc-p", "</"], ["prc-t", "main"], ["prc-p", ">"]],
  [],
  [["prc-p", "<?php "], ["prc-f", "get_footer"], ["prc-p", "(); ?>"]],
];

function InstrumentCode() {
  return (
    <Bay cap="Build" meta="WordPress · Next.js">
      <div className="prc-editor">
        <div className="prc-tabs">
          <span className="prc-tab is-on">header.php</span>
          <span className="prc-tab">style.css</span>
          <span className="prc-tab">main.js</span>
        </div>
        <CodeLines lines={TEMPLATE} hit={3} />
        <div className="prc-status">
          <span>PHP</span>
          <span>UTF-8</span>
          <span>LF</span>
          <span className="prc-status-end">Mobile-first</span>
        </div>
      </div>
    </Bay>
  );
}

/* --- 04 · the head: the tags and schema that make a page findable ------- */

const HEAD: Tok[][] = [
  [["prc-p", "<"], ["prc-t", "title"], ["prc-p", ">"], ["prc-s", "Web Developer in Lahore"], ["prc-p", "</"], ["prc-t", "title"], ["prc-p", ">"]],
  [["prc-p", "<"], ["prc-t", "link"], ["prc-a", " rel"], ["prc-p", "="], ["prc-s", '"canonical"'], ["prc-a", " href"], ["prc-p", "="], ["prc-s", '"/"'], ["prc-p", " />"]],
  [["prc-p", "<"], ["prc-t", "script"], ["prc-a", " type"], ["prc-p", "="], ["prc-s", '"application/ld+json"'], ["prc-p", ">"]],
  [["prc-p", "{"]],
  [["prc-k", '  "@context"'], ["prc-p", ": "], ["prc-s", '"https://schema.org"'], ["prc-p", ","]],
  [["prc-k", '  "@type"'], ["prc-p", ": "], ["prc-s", '"ProfessionalService"'], ["prc-p", ","]],
  [["prc-k", '  "name"'], ["prc-p", ": "], ["prc-s", '"KamranDev"'], ["prc-p", ","]],
  [["prc-k", '  "areaServed"'], ["prc-p", ": "], ["prc-s", '"Lahore, PK"']],
  [["prc-p", "}"]],
  [["prc-p", "</"], ["prc-t", "script"], ["prc-p", ">"]],
];

const VERIFIED = ["Canonical", "Schema", "H1 ×1", "Indexable", "Sitemap"];

function InstrumentAudit() {
  return (
    <Bay cap="Search setup" meta="Head tags">
      <div className="prc-editor">
        <div className="prc-tabs">
          <span className="prc-tab is-on">head.html</span>
          <span className="prc-tab">robots.txt</span>
          <span className="prc-tab">sitemap.xml</span>
        </div>
        <CodeLines lines={HEAD} hit={5} />
        <div className="prc-verify">
          {VERIFIED.map((v, j) => (
            <span key={v} className="prc-vchip prc-in" style={delay(j, 70)}>
              <Tick size={7} />
              {v}
            </span>
          ))}
        </div>
      </div>
    </Bay>
  );
}

/* --- 05 · the deploy log, then the live strip --------------------------- */

const DEPLOY: Array<[kind: "cmd" | "ok", text: string]> = [
  ["cmd", "ssh deploy@vps"],
  ["ok", "host reachable"],
  ["cmd", "npm run build"],
  ["ok", "build passed"],
  ["cmd", "deploy --prod"],
  ["ok", "ssl/tls issued"],
  ["ok", "sitemap.xml submitted"],
  ["ok", "analytics + search console"],
];

const LIVE_CHIPS = ["SSL", "Indexed", "GA4", "Search Console"];

function InstrumentLaunch() {
  return (
    <Bay cap="Launch" meta="Production">
      <div className="prc-term">
        <div className="prc-term-head">
          <b />
          deploy — production
        </div>
        <ol className="prc-term-body">
          {DEPLOY.map(([kind, text], j) => (
            <li key={text} className="prc-in" style={delay(j, 70)}>
              {kind === "cmd" ? (
                <>
                  <span className="prc-caret">$</span>
                  <span className="prc-cmd">{text}</span>
                </>
              ) : (
                <>
                  <span className="prc-tick">
                    <Tick />
                  </span>
                  <span className="prc-ok">{text}</span>
                </>
              )}
            </li>
          ))}
        </ol>
        <div className="prc-live">
          <span className="prc-live-dot pulse-dot" />
          <span className="prc-live-t">Live</span>
          <span className="prc-live-url">kamrandev.com</span>
        </div>
      </div>
      <div className="prc-chips">
        {LIVE_CHIPS.map((c, j) => (
          <span key={c} className="prc-chip prc-in" style={delay(j, 70)}>
            <i />
            {c}
          </span>
        ))}
      </div>
    </Bay>
  );
}

/** Exported for the /process page, which mounts the same instruments on its
    phase cards — one visual language for the process everywhere. */
export const INSTRUMENTS = [
  InstrumentBrief,
  InstrumentGrid,
  InstrumentCode,
  InstrumentAudit,
  InstrumentLaunch,
];

/* ----------------------------- the section ------------------------------- *
 *  The deck. Each step is a full card; on desktop every card pins below the
 *  header and the next one slides up over it, the pinned rims stacking like
 *  sheets on a bench. A card being covered recedes — scales back a touch and
 *  dims under a wash — driven by one rAF from the next card's position.
 *  Below 1024px, without JS, or under reduced motion the cards simply stack
 *  in flow; each still fires its instrument choreography on arrival.
 * ------------------------------------------------------------------------ */

export function ProcessRail() {
  const deckRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = deckRef.current;
    if (!root) return;
    const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-prc-step]"));

    /* Instrument choreography: a card's internals animate in once, the
       first time it is properly on screen. */
    if (typeof IntersectionObserver === "undefined") {
      cards.forEach((c) => c.classList.add("is-on"));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
              entry.target.classList.add("is-on");
              io.unobserve(entry.target);
            }
          }
        },
        { threshold: 0.22, rootMargin: "0px 0px -8% 0px" },
      );
      cards.forEach((c) => io.observe(c));

      /* The recede scrub — only where the deck actually pins. */
      const media = window.matchMedia(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      );
      let raf = 0;
      const paint = () => {
        raf = 0;
        if (!media.matches) return;
        const vh = window.innerHeight;
        for (let i = 0; i < cards.length - 1; i++) {
          // Measure the next CARD, not its hold — the holds dissolve to
          // display:contents in pinned mode and report a zero rect.
          const next = cards[i + 1];
          if (!next) continue;
          const top = next.getBoundingClientRect().top;
          // 0 while the next card waits below the fold; 1 once it has pinned.
          const cov = Math.min(1, Math.max(0, (vh - top) / (vh - 110)));
          cards[i].style.setProperty("--cov", cov.toFixed(3));
        }
      };
      const kick = () => {
        if (!raf) raf = requestAnimationFrame(paint);
      };
      paint();
      window.addEventListener("scroll", kick, { passive: true });
      window.addEventListener("resize", kick);
      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("scroll", kick);
        window.removeEventListener("resize", kick);
        io.disconnect();
      };
    }
  }, []);

  return (
    <section className="border-t border-line bg-bg2" aria-labelledby="process-heading">
      <div className="container-x pt-[clamp(3.5rem,11vw,10rem)]">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHead
            index="04"
            label="Process"
            title={<span id="process-heading">From idea to website</span>}
            lede="One connected journey — no handoffs between a designer, a developer and an SEO who never talk to each other."
          />
          <Reveal delay={200}>
            <Link href="/process/" className="btn btn-ghost mb-2">
              Full process
            </Link>
          </Reveal>
        </div>
      </div>

      <div ref={deckRef} className="prc-deck container-x">
        {processSteps.map((step, i) => {
          const Instrument = INSTRUMENTS[i] ?? InstrumentBrief;
          const next = processSteps[i + 1];
          return (
            <div key={step.n} data-prc-hold className="prc-hold">
              <article
                data-prc-step
                className="prc-step prc-card"
                style={{ "--i": i } as CSSProperties}
              >
                <span className="prc-ghostnum" aria-hidden>
                  {step.n}
                </span>

                {/* status strip: index, phase meter, what this phase hands over */}
                <div className="prc-card-top">
                  <p className="label-mono label-mono--faint">
                    {step.n}
                    <span className="text-faint">
                      {" "}/ {String(processSteps.length).padStart(2, "0")}
                    </span>
                  </p>
                  <span className="prc-meter" aria-hidden>
                    {processSteps.map((s2, j) => (
                      <i
                        key={s2.n}
                        className={j <= i ? "prc-in is-lit" : "prc-in"}
                        style={delay(j, 60)}
                      />
                    ))}
                  </span>
                  <p className="prc-out">
                    Output — <b>{step.out}</b>
                  </p>
                </div>

                <div className="prc-card-grid">
                  <div className="prc-card-copy">
                    <h3 className="display text-[clamp(1.9rem,3.4vw,3rem)]">
                      {step.name}
                    </h3>
                    <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">
                      {step.body}
                    </p>
                    <ul className="prc-tags">
                      {step.items.map((it) => (
                        <li key={it} className="prc-tag">
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="prc-card-inst">
                    <Instrument />
                  </div>
                </div>

                {/* hand-off strip: the phase's toolkit, and where the work goes */}
                <div className="prc-card-foot">
                  <p className="prc-tools">{step.tools.join(" · ")}</p>
                  <p className="prc-next">
                    {next ? "Next" : "Then"}
                    <svg width="26" height="8" viewBox="0 0 26 8" fill="none" aria-hidden>
                      <path
                        d="M0 4h23.5M20 1l4 3-4 3"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <b>{next ? next.name : "ongoing site care"}</b>
                  </p>
                </div>
              </article>
            </div>
          );
        })}
      </div>
    </section>
  );
}
