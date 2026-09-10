"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Reveal } from "@/components/Reveal";
import { services, site } from "@/lib/site";

/**
 * 01 / The Standard — the inspection bench.
 *
 * Not three cards: three inspection modes applied to one specimen. The left
 * rail keeps the section opener and lists the standards as a numbered ledger
 * of tabs; the right side holds a single CSS-3D webpage plate whose overlay
 * changes with the active standard — design grid, speed trace, semantic
 * x-ray. Idles through the modes every ~4s (IntersectionObserver-gated)
 * until the visitor touches it, then hands over control for good.
 */

const STANDARDS = [
  {
    key: "beautiful",
    n: "01",
    title: "Beautiful",
    mode: "Design grid",
    body: "Premium UI/UX shaped around your brand — every layout decision serves the action you want visitors to take.",
    sr: "Inspection view: an eight-point design grid with measurement rulers, dimension lines and a grid readout laid over the specimen page.",
  },
  {
    key: "fast",
    n: "02",
    title: "Fast",
    mode: "Speed trace",
    body: "Performance-first development, measured against Core Web Vitals — because slow websites lose customers.",
    sr: "Inspection view: traces sweep the specimen beside a network waterfall and a Core Web Vitals readout — LCP 1.1s, INP 42ms, CLS 0.00.",
  },
  {
    key: "discoverable",
    n: "03",
    title: "Discoverable",
    mode: "Semantic x-ray",
    body: "SEO-ready architecture from the first commit — semantic structure, schema and clean URLs that search engines and AI answers understand.",
    sr: "Inspection view: an x-ray over the specimen showing its semantic skeleton — nav, h1, section landmarks, image alt text and schema.org ProfessionalService markup.",
  },
] as const;

/* --------------------------- specimen page content ------------------------ */

/** Three real services, drawn small inside the specimen. */
const SPECIMEN_CARDS = [
  {
    label: services[0].name,
    body: "Strategy, build and launch — engineered end to end.",
    icon: "M1.5 1.5h9v9h-9zM1.5 4.5h9M4.5 4.5v6",
  },
  {
    label: services[1].name,
    body: "Technical SEO, AEO and GEO structure.",
    icon: "M5.2 1.6a3.6 3.6 0 1 0 0 7.2 3.6 3.6 0 0 0 0-7.2M8 8l2.5 2.5",
  },
  {
    label: site.devSpecialty,
    body: "Elementor Pro, JetEngine and custom code.",
    icon: "M6.5 1 2.2 6.8h3.3L4.8 11l4.3-5.8H5.8z",
  },
] as const;

const SPECIMEN_STATS = [
  { v: `${site.yearsExperience}+`, k: "YEARS" },
  { v: `${site.projectsShipped}+`, k: "PROJECTS" },
  { v: `${services.length}`, k: "SERVICES" },
  { v: "PK", k: "LAHORE" },
] as const;

/** The homepage JSON-LD, quoted from the real graph this page emits. */
type CodeLine = {
  ind: number;
  raw?: string;
  k?: string;
  v?: string;
  /** Syntax-highlight this value in accent rather than ink */
  hi?: boolean;
  last?: boolean;
};

const SPECIMEN_CODE: CodeLine[] = [
  { ind: 0, raw: "{" },
  { ind: 1, k: "@context", v: "https://schema.org" },
  { ind: 1, k: "@type", v: "ProfessionalService", hi: true },
  { ind: 1, k: "name", v: "MustafaDev" },
  { ind: 1, k: "areaServed", v: "Worldwide", last: true },
  { ind: 0, raw: "}" },
];

const SPECIMEN_URLS = [
  "/services/",
  "/work/",
  "/process/",
  "/insights/",
  "/contact/",
] as const;

const SPECIMEN_FOOTER = [
  "Services",
  "Work",
  "Process",
  "About",
  "Insights",
  "Contact",
] as const;

/**
 * The specimen: this very site drawn at roughly 1:2.4 — nav, headline,
 * a real project screenshot, stats, three service cards, the page's own
 * JSON-LD, a crawl list and a footer. Rendered twice with identical geometry
 * — once solid (the built page), once as the x-ray wireframe overlay — so the
 * two align block for block.
 */
function SpecimenPage({ wire = false }: { wire?: boolean }) {
  /* In x-ray mode every filled surface becomes an outline and every glyph goes
     invisible (not hidden — visibility keeps the layout), so the wireframe
     lands on the built page block for block and the page reads through it. */
  const t = wire ? "invisible" : "";
  const edge = wire ? "border-accent/45" : "border-line";
  const box = wire
    ? "border border-accent/45 bg-accent/[0.05]"
    : "border border-line bg-surface2";

  return (
    <div className="flex h-full flex-col">
      {/* Browser chrome */}
      <div className={`flex items-center gap-2 border-b px-3.5 py-2.5 ${edge}`}>
        <span className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`h-1.5 w-1.5 rounded-full ${
                wire ? "border border-accent/50" : "bg-line2"
              }`}
            />
          ))}
        </span>
        <span
          className={`ml-2 rounded-full border px-2.5 py-0.5 font-mono text-[9px] tracking-widest ${
            wire ? "border-accent/40 text-transparent" : "border-line text-muted"
          }`}
        >
          mustafadev.org
        </span>
        <span
          className={`ml-auto font-mono text-[8px] tracking-[0.16em] text-accent2 ${t}`}
        >
          200 OK
        </span>
      </div>

      {/* The page itself */}
      <div className="flex flex-1 flex-col justify-between gap-3.5 p-4 sm:gap-4 sm:p-5">
        {/* Nav */}
        <div className="relative flex items-center justify-between gap-2">
          {wire ? <span className="std-tag -top-2.5 left-0">{"<nav>"}</span> : null}
          <span className={`flex items-center gap-1.5 ${t}`}>
            <span className="grid h-4 w-4 place-items-center rounded-[3px] bg-accent font-mono text-[7px] font-bold text-accent-ink">
              M
            </span>
            <span className="text-[11px] font-semibold leading-none text-ink">
              Mustafa
              <span className="font-mono text-[7px] font-medium text-accent2">
                dev
              </span>
            </span>
          </span>
          <span
            className={`flex items-center gap-2.5 text-[8px] font-medium text-muted ${t}`}
          >
            <span>Services</span>
            <span>Work</span>
            <span className="hidden sm:inline">Process</span>
            <span className="hidden sm:inline">Insights</span>
            <span className="rounded-full bg-accent px-2.5 py-1 text-[7.5px] font-semibold leading-none text-accent-ink">
              Start a Project
            </span>
          </span>
        </div>

        {/* Hero: headline + a real project screenshot */}
        <div className="relative grid grid-cols-[1.45fr_1fr] items-end gap-3">
          {wire ? <span className="std-tag -top-2.5 left-0">{"<h1>"}</span> : null}
          <div className="flex min-w-0 flex-col gap-1.5">
            <span
              className={`font-mono text-[6.5px] tracking-[0.2em] text-accent2 ${t}`}
            >
              WEB DEVELOPMENT &amp; SEO — LAHORE
            </span>
            <span
              className={`display text-[15px] leading-[1.06] tracking-tight text-ink sm:text-[19px] ${t}`}
            >
              Websites that look <em>incredible</em>.
              <br />
              Built to be <em>found</em>.
            </span>
            <span className={`text-[7.5px] leading-[1.55] text-muted ${t}`}>
              Design, code, structure and speed — engineered together, not
              bolted on afterwards.
            </span>
            <span className="mt-0.5 flex items-center gap-1.5">
              <span
                className={`rounded-full bg-accent px-2.5 py-1 text-[7.5px] font-semibold leading-none text-accent-ink ${t}`}
              >
                Build My Website
              </span>
              <span
                className={`rounded-full border border-line2 px-2.5 py-1 text-[7.5px] leading-none text-ink ${t}`}
              >
                Explore My Work
              </span>
            </span>
          </div>

          <div
            className={`relative h-[86px] overflow-hidden rounded-lg border sm:h-[106px] ${
              wire ? "std-wire-x border-accent/45" : "border-line2"
            }`}
          >
            {wire ? (
              <span className="std-tag left-1 top-1">{"<img alt>"}</span>
            ) : (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/work/citygate-financial-planning.webp"
                  alt="Citygate Financial Planning website, built and optimised by Fakhar e Mustafa"
                  width={880}
                  height={1320}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
                <span className="std-shot-fade" />
                <span className="absolute inset-x-1.5 bottom-1.5">
                  <span className="block font-mono text-[5.5px] tracking-[0.22em] text-accent2">
                    CASE STUDY
                  </span>
                  <span className="block text-[7.5px] font-semibold leading-tight text-ink">
                    Citygate Financial Planning
                  </span>
                </span>
              </>
            )}
          </div>
        </div>

        {/* Stats strip */}
        <div
          className={`relative grid grid-cols-4 gap-2 rounded-lg border px-3 py-2 ${
            wire ? "border-accent/45" : "border-line bg-surface2/70"
          }`}
        >
          {wire ? (
            <span className="std-tag -top-2.5 left-0">{"<section>"}</span>
          ) : null}
          {SPECIMEN_STATS.map((s) => (
            <span key={s.k} className={`flex flex-col gap-1 ${t}`}>
              <span className="display text-[13px] leading-none text-ink">
                {s.v}
              </span>
              <span className="font-mono text-[5.5px] tracking-[0.2em] text-muted">
                {s.k}
              </span>
            </span>
          ))}
        </div>

        {/* Feature row — three real service cards */}
        <div className="relative grid grid-cols-3 gap-2.5">
          {wire ? (
            <span className="std-tag -top-2.5 right-0">schema.org/Service</span>
          ) : null}
          {SPECIMEN_CARDS.map((c) => (
            <span
              key={c.label}
              className={`flex flex-col gap-1 rounded-lg px-2 py-2 ${box}`}
            >
              <span className={`flex items-start gap-1 ${t}`}>
                <svg
                  viewBox="0 0 12 12"
                  className="mt-[1px] h-2 w-2 shrink-0 text-accent2"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d={c.icon}
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-[7.5px] font-semibold leading-tight text-ink">
                  {c.label}
                </span>
              </span>
              <span className={`text-[6.5px] leading-[1.45] text-muted ${t}`}>
                {c.body}
              </span>
            </span>
          ))}
        </div>

        {/* Markup row — the page's own JSON-LD beside its crawl list */}
        <div className="relative grid grid-cols-[1.55fr_1fr] gap-2.5">
          {wire ? (
            <span className="std-tag -top-2.5 left-0">application/ld+json</span>
          ) : null}
          <span
            className={`flex flex-col gap-[1px] rounded-lg px-2.5 py-2 font-mono text-[6.5px] leading-[1.5] ${box}`}
          >
            {SPECIMEN_CODE.map((l, i) => (
              <span key={i} className={`flex gap-2 ${t}`}>
                <span className="w-1.5 shrink-0 text-right text-faint">
                  {i + 1}
                </span>
                <span
                  className="min-w-0 truncate text-muted"
                  style={{ paddingLeft: l.ind * 8 }}
                >
                  {l.raw ? (
                    l.raw
                  ) : (
                    <>
                      <span className="text-accent2">{`"${l.k}"`}</span>
                      {": "}
                      <span className={l.hi ? "text-accent" : "text-ink"}>
                        {`"${l.v}"`}
                      </span>
                      {l.last ? "" : ","}
                    </>
                  )}
                </span>
              </span>
            ))}
          </span>

          <span
            className={`flex flex-col justify-between gap-[3px] rounded-lg px-2 py-2 ${box}`}
          >
            <span
              className={`font-mono text-[5.5px] tracking-[0.2em] text-muted ${t}`}
            >
              CRAWL
            </span>
            {SPECIMEN_URLS.map((u) => (
              <span
                key={u}
                className={`flex items-center justify-between gap-1 font-mono text-[6.5px] leading-none ${t}`}
              >
                <span className="truncate text-ink">{u}</span>
                <span className="shrink-0 text-accent2">200</span>
              </span>
            ))}
          </span>
        </div>

        {/* Footer */}
        <div
          className={`relative flex items-center justify-between gap-2 border-t pt-2.5 ${
            wire ? "border-accent/40" : "border-line"
          }`}
        >
          {wire ? (
            <span className="std-tag -top-2.5 left-0">{"<footer>"}</span>
          ) : null}
          <span
            className={`flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[7.5px] text-muted ${t}`}
          >
            {SPECIMEN_FOOTER.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </span>
          <span
            className={`shrink-0 font-mono text-[6px] tracking-[0.14em] text-faint ${t}`}
          >
            © MUSTAFADEV · LAHORE, PK
          </span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------- instruments ------------------------------ */

const RULER_X = [0, 64, 128, 192, 256, 320, 384, 448, 512, 576, 640, 704];
const RULER_Y = [64, 128, 192, 256, 320, 384, 448, 512];

const VITALS = [
  { k: "LCP", v: "1.1s", pct: 44 },
  { k: "INP", v: "42ms", pct: 21 },
  { k: "CLS", v: "0.00", pct: 6 },
] as const;

const WATERFALL = [
  { file: "document", ms: "0.09s", off: 0, len: 15 },
  { file: "space-grotesk.woff2", ms: "0.21s", off: 15, len: 19 },
  { file: "app.css", ms: "0.06s", off: 16, len: 10 },
  { file: "citygate.webp", ms: "0.44s", off: 26, len: 38 },
  { file: "main.js", ms: "0.13s", off: 34, len: 17 },
] as const;

const XRAY_FACTS = [
  "H1 ×1",
  "H2 ×3",
  "SECTION ×5",
  "NAV · MAIN · FOOTER",
  "IMG ALT 1/1",
] as const;

export function ValueTrio() {
  const [active, setActive] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const [inView, setInView] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  /* Watch visibility continuously — gates the idle cycle and the CSS sweeps */
  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Idle auto-advance: only while on screen, never after the user steps in */
  useEffect(() => {
    if (!inView || interacted) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(
      () => setActive((a) => (a + 1) % STANDARDS.length),
      4200,
    );
    return () => window.clearInterval(id);
  }, [inView, interacted]);

  const select = (i: number) => {
    setInteracted(true);
    setActive(i);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    let next: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      next = (active + 1) % STANDARDS.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      next = (active + STANDARDS.length - 1) % STANDARDS.length;
    } else if (e.key === "Home") {
      next = 0;
    } else if (e.key === "End") {
      next = STANDARDS.length - 1;
    }
    if (next === null) return;
    e.preventDefault();
    select(next);
    tabRefs.current[next]?.focus();
  };

  const current = STANDARDS[active];

  return (
    <section className="overflow-x-clip border-t border-line" aria-labelledby="value-heading">
      <div className="container-x section-pad">
        <div
          ref={rootRef}
          className={`grid items-start gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-x-16 lg:gap-y-10 ${
            inView ? "std-live" : ""
          }`}
        >
          {/* Section opener */}
          <div className="max-w-2xl lg:col-start-1 lg:row-start-1">
            <Reveal>
              <p className="label-mono label-mono--accent">
                <span aria-hidden>01 / </span>
                The Standard
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2
                id="value-heading"
                className="display mt-5 text-[clamp(2rem,4.6vw,3.6rem)]"
              >
                Your website should do more than <em>look good</em>.
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                Most websites are judged in seconds — by people and by search
                engines. I build for both, from the first line of code.
              </p>
            </Reveal>
          </div>

          {/* The specimen under inspection */}
          <Reveal
            delay={140}
            className="lg:col-span-1 lg:col-start-2 lg:row-span-2 lg:row-start-1"
          >
            <div
              role="tabpanel"
              id="std-specimen-panel"
              aria-labelledby={`std-tab-${current.key}`}
              tabIndex={0}
            >
              <p className="sr-only">{current.sr}</p>

              <div className="mx-auto w-full max-w-[680px]">
                <div
                  className="mb-5 flex items-center justify-between gap-4"
                  aria-hidden
                >
                  <span className="label-mono">
                    <span className="text-ink">Homepage</span>
                  </span>
                  <span className="label-mono label-mono--faint">
                    Scale 1:2.4
                  </span>
                </div>

                <div className="std-rig" aria-hidden>
                  <span className="std-mark std-mark--tl" />
                  <span className="std-mark std-mark--tr" />
                  <span className="std-mark std-mark--bl" />
                  <span className="std-mark std-mark--br" />
                  <span className="std-pool" />

                  <div className="std-plate">
                    <div className="relative min-h-[440px] overflow-hidden rounded-xl border border-line2 bg-surface/95 sm:min-h-[520px]">
                      {/* The built page */}
                      <div
                        className={`std-page ${active === 2 ? "std-page--dim" : ""}`}
                      >
                        <SpecimenPage />
                      </div>

                      {/* 01 Beautiful — 8pt grid, rulers, dimensions */}
                      <div className={`std-ov ${active === 0 ? "std-ov--on" : ""}`}>
                        <span className="std-grid8" />
                        <i className="std-ticks std-ticks--minor" />
                        <i className="std-ticks std-ticks--major" />
                        <div className="std-ruler-x">
                          {RULER_X.map((n) => (
                            <span key={n}>{n}</span>
                          ))}
                        </div>
                        <div className="std-ruler-y">
                          {RULER_Y.map((n) => (
                            <span key={n}>{n}</span>
                          ))}
                        </div>
                        <div className="std-dim-y">
                          <i />
                          <span>64</span>
                          <i />
                        </div>
                        <div className="std-panel std-panel--amber absolute bottom-3 right-3">
                          <span className="std-panel-h">Design grid</span>
                          <span className="std-panel-row">
                            <b>BASE</b> 8 PT
                          </span>
                          <span className="std-panel-row">
                            <b>CANVAS</b> 1440 · 12 COL · 24 GUTTER
                          </span>
                          <span className="std-panel-row">
                            <b>TYPE</b> 72 / 40 / 18 / 11
                          </span>
                        </div>
                      </div>

                      {/* 02 Fast — traces, first paint, waterfall, vitals */}
                      <div className={`std-ov ${active === 1 ? "std-ov--on" : ""}`}>
                        <i
                          className="std-trace"
                          style={{ top: "22%", animationDuration: "2.2s" }}
                        />
                        <i
                          className="std-trace"
                          style={{
                            top: "48%",
                            animationDuration: "2.7s",
                            animationDelay: "0.45s",
                          }}
                        />
                        <i
                          className="std-trace"
                          style={{
                            top: "71%",
                            animationDuration: "2.4s",
                            animationDelay: "0.9s",
                          }}
                        />

                        <span className="std-marker" style={{ left: "34%" }}>
                          <span className="std-marker-l">FIRST PAINT 0.4s</span>
                        </span>

                        <div className="std-panel absolute right-3 top-3 w-[128px]">
                          <span className="std-panel-h">Core Web Vitals</span>
                          {VITALS.map((m) => (
                            <span key={m.k} className="std-vital">
                              <span className="std-vital-k">
                                <b>{m.k}</b>
                                <em>{m.v}</em>
                              </span>
                              <span className="std-meter">
                                <i style={{ width: `${m.pct}%` }} />
                              </span>
                            </span>
                          ))}
                          <span className="std-panel-row std-panel-row--live">
                            <span className="pulse-dot" />
                            SAMPLING
                          </span>
                        </div>

                        <div className="std-panel absolute bottom-3 left-3 w-[64%] max-w-[300px]">
                          <span className="std-panel-h">Network waterfall</span>
                          {WATERFALL.map((r) => (
                            <span key={r.file} className="std-wf">
                              <span className="std-wf-name">{r.file}</span>
                              <span className="std-wf-track">
                                <i
                                  className="std-wf-bar"
                                  style={{
                                    left: `${r.off}%`,
                                    width: `${r.len}%`,
                                  }}
                                />
                              </span>
                              <span className="std-wf-ms">{r.ms}</span>
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* 03 Discoverable — semantic x-ray over the live page */}
                      <div className={`std-ov ${active === 2 ? "std-ov--on" : ""}`}>
                        <SpecimenPage wire />
                        <div className="std-strip">
                          <span className="std-strip-k">SEMANTIC X-RAY</span>
                          {XRAY_FACTS.map((f) => (
                            <span key={f}>{f}</span>
                          ))}
                          <span className="std-strip-ok">
                            JSON-LD ProfessionalService
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bench readout strip */}
                <div className="mt-8 flex items-center justify-between gap-4 border-t border-line pt-3.5">
                  <span className="label-mono">
                    <span className="text-accent2">{current.mode}</span>
                  </span>
                  <span className="label-mono label-mono--faint" aria-hidden>
                    0{active + 1} / 03
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* The three standards — numbered ledger / segmented control */}
          <div className="lg:col-start-1 lg:row-start-2">
            <Reveal delay={220}>
              <div
                role="tablist"
                aria-label="The three standards"
                className="std-tabs"
                onKeyDown={onKeyDown}
                onFocus={() => setInteracted(true)}
              >
                {STANDARDS.map((v, i) => (
                  <button
                    key={v.key}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`std-tab-${v.key}`}
                    aria-selected={active === i}
                    aria-controls="std-specimen-panel"
                    tabIndex={active === i ? 0 : -1}
                    className="std-tab"
                    onClick={() => select(i)}
                  >
                    <span className="std-tab-n" aria-hidden>
                      {v.n}
                    </span>
                    <span className="std-tab-main">
                      <span className="std-tab-title display">{v.title}</span>
                      <span className="std-tab-body">{v.body}</span>
                    </span>
                  </button>
                ))}
              </div>
              {/* On mobile the ledger collapses to titles; the active body lives here */}
              <p className="mt-5 text-base leading-relaxed text-muted lg:hidden">
                {current.body}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
