import type { CSSProperties } from "react";
import Link from "next/link";
import { services } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

/* ------------------------------------------------------------------------ *
 *  THE SERVICE LEDGER
 *
 *  Nine numbered rows, hairline-ruled — an editorial index page, not a
 *  card grid. Each row: big mono index, the service name in display type,
 *  a one-line mono scope (the service's own chips), and an arrow that
 *  slides on hover. On pointer devices a preview plate floats up at the
 *  row's right edge — not a placeholder vignette but a small working
 *  interface: a real search result, a real block editor, a real vitals
 *  instrument, a real answer-engine exchange. Every plate carries legible
 *  words and numbers; nothing in here is a grey bar.
 * ------------------------------------------------------------------------ */

type Family = "serp" | "build" | "wire" | "meter" | "shop" | "app" | "ai";

/** slug → { visual family, mono tag on the preview plate } */
const PLATE: Record<string, { fam: Family; tag: string }> = {
  "website-development": { fam: "build", tag: "Build" },
  seo: { fam: "serp", tag: "Serp" },
  "wordpress-development": { fam: "build", tag: "Blocks" },
  "website-design": { fam: "wire", tag: "Wireframe" },
  "website-performance": { fam: "meter", tag: "Vitals" },
  "woocommerce-development": { fam: "shop", tag: "Catalogue" },
  "web-application-development": { fam: "app", tag: "Panels" },
  "ai-solutions": { fam: "ai", tag: "Answers" },
  "website-redesign": { fam: "wire", tag: "Rebuild" },
};

/* --- the working faces, one per family — pure divs, zero imagery -------- */

/** SEO — a real search result: query, URL, coloured title, snippet, sitelinks. */
function SerpFace() {
  return (
    <div className="svc-face">
      <div className="flex items-center gap-2 rounded-full border border-line2 bg-ink/[0.05] px-2.5 py-1.5">
        <svg width="9" height="9" viewBox="0 0 12 12" fill="none" className="shrink-0 text-muted">
          <circle cx="5" cy="5" r="3.6" stroke="currentColor" strokeWidth="1.3" />
          <path d="M7.8 7.8 11 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
        <span className="truncate text-[8px] leading-none text-ink">
          seo expert and web developer lahore
        </span>
        <span className="ml-auto font-mono text-[6.5px] tracking-[0.14em] text-faint">
          ALL · 0.31S
        </span>
      </div>

      <div className="mt-2 flex items-center gap-1.5">
        <span className="rounded-[2px] border border-amber/60 px-1 py-[1px] font-mono text-[6px] leading-none tracking-[0.14em] text-amber">
          AI OVERVIEW
        </span>
        <span className="font-mono text-[6px] leading-none tracking-[0.12em] text-faint">
          SOURCE 1 OF 3
        </span>
      </div>

      <div className="mt-2 flex items-center gap-1.5">
        <span className="grid h-3.5 w-3.5 shrink-0 place-items-center rounded-[3px] bg-accent font-mono text-[6px] font-bold leading-none text-accent-ink">
          M
        </span>
        <span className="min-w-0 leading-none">
          <span className="block truncate text-[7px] leading-none text-ink">
            mustafadev.org
          </span>
          <span className="block truncate font-mono text-[6px] leading-[1.5] text-muted">
            https://mustafadev.org › seo
          </span>
        </span>
      </div>

      <p className="mt-1 text-[11px] font-medium leading-tight text-accent2">
        SEO &amp; AI Search Visibility
      </p>
      <p className="mt-1 text-[7px] leading-[1.55] text-muted">
        Technical SEO, on-page structure, schema and AEO/GEO — engineered into
        your website by the developer who builds it. Crawlability, Core Web
        Vitals and entity data handled in the same pass.
      </p>

      <div className="mt-auto grid grid-cols-2 gap-x-2 gap-y-[3px] border-t border-line pt-1.5">
        {["Technical SEO", "Schema markup", "AEO / GEO", "Search Console"].map((l) => (
          <span key={l} className="truncate text-[6.5px] leading-none text-accent2">
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Real projects, drawn as the editor's query-loop preview. */
const WORK_TILES = [
  { name: "Citygate", kind: "FINANCE", hue: "198" },
  { name: "Huckleberrys", kind: "RESTAURANT", hue: "38" },
  { name: "AI Tool Camp", kind: "SAAS", hue: "212" },
];

/** Development / WordPress — a real block editor with a selected block. */
function BuildFace() {
  const inserter = ["Cover", "Heading", "Columns", "Image", "Buttons", "Query Loop"];
  return (
    <div className="svc-face !p-0">
      {/* editor chrome */}
      <div className="flex items-center gap-1.5 border-b border-line px-2 py-1.5">
        <span className="grid h-3.5 w-3.5 place-items-center rounded-[3px] bg-accent font-mono text-[8px] font-bold leading-none text-accent-ink">
          +
        </span>
        <span className="font-mono text-[6.5px] tracking-[0.14em] text-muted">
          HOME — DRAFT
        </span>
        <span className="ml-auto rounded-full bg-accent px-1.5 py-[2px] text-[6.5px] font-semibold leading-none text-accent-ink">
          Update
        </span>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-[62px_1fr]">
        {/* inserter rail */}
        <div className="flex flex-col gap-[3px] border-r border-line px-1.5 py-1.5">
          <span className="font-mono text-[5.5px] tracking-[0.18em] text-faint">
            BLOCKS
          </span>
          {inserter.map((b, i) => (
            <span
              key={b}
              className={`flex items-center gap-1 rounded-[2px] px-1 py-[1.5px] text-[6.5px] leading-none ${
                i === 2 ? "bg-accent/20 text-accent2" : "text-muted"
              }`}
            >
              <span
                className={`h-[5px] w-[5px] shrink-0 rounded-[1px] border ${
                  i === 2 ? "border-accent bg-accent/60" : "border-ink/40"
                }`}
              />
              {b}
            </span>
          ))}
        </div>

        {/* canvas */}
        <div className="flex min-w-0 flex-col gap-1.5 bg-ink/[0.04] p-2">
          <div className="rounded-[3px] border border-line2 bg-bg px-2 py-1.5">
            <span className="block text-[9px] font-semibold leading-tight text-ink">
              Websites that look incredible.
            </span>
            <span className="mt-[2px] block text-[6.5px] leading-none text-muted">
              Built to perform. Designed to be found.
            </span>
          </div>

          {/* the selected block */}
          <div className="relative rounded-[3px] border border-accent bg-accent/[0.07] px-2 py-1.5">
            <span className="absolute -top-[7px] left-1.5 rounded-[2px] bg-accent px-1 py-[1px] font-mono text-[5.5px] leading-none tracking-[0.12em] text-accent-ink">
              COLUMNS
            </span>
            <span className="grid grid-cols-3 gap-1.5 pt-[3px]">
              {["Design", "Develop", "Rank"].map((c) => (
                <span
                  key={c}
                  className="rounded-[2px] border border-accent/45 px-1 py-[3px] text-center text-[6.5px] leading-none text-accent2"
                >
                  {c}
                </span>
              ))}
            </span>
          </div>

          <div className="flex items-center gap-1.5 rounded-[3px] border border-line2 bg-bg px-2 py-1.5">
            <span className="rounded-full bg-accent px-1.5 py-[2px] text-[6.5px] font-semibold leading-none text-accent-ink">
              Start a project
            </span>
            <span className="font-mono text-[6px] leading-none text-faint">
              BUTTONS
            </span>
          </div>

          {/* The canvas keeps going — an editor that stops halfway down reads
              as an empty plate, which is the note this whole pass is fixing. */}
          <div className="relative min-h-0 flex-1 rounded-[3px] border border-line2 bg-bg p-1.5">
            <span className="absolute -top-[7px] left-1.5 rounded-[2px] border border-line2 bg-bg px-1 py-[1px] font-mono text-[5.5px] leading-none tracking-[0.12em] text-faint">
              QUERY LOOP
            </span>
            <span className="grid h-full grid-cols-3 gap-1.5 pt-[3px]">
              {WORK_TILES.map((t) => (
                <span
                  key={t.name}
                  className="flex min-h-0 flex-col overflow-hidden rounded-[2px] border border-line"
                >
                  <span className="svc-tile-img" style={{ "--h": t.hue } as CSSProperties} />
                  <span className="block px-1 pb-1 pt-[3px] text-[6px] font-medium leading-tight text-ink">
                    {t.name}
                  </span>
                  <span className="block px-1 pb-1 font-mono text-[5px] leading-none tracking-wider text-faint">
                    {t.kind}
                  </span>
                </span>
              ))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Design / redesign — an annotated wireframe with a live type + colour spec. */
function WireFace() {
  return (
    <div className="svc-face">
      <div className="flex items-center justify-between font-mono text-[6px] tracking-[0.16em] text-faint">
        <span>W—01 · HOMEPAGE</span>
        <span className="text-amber">1440 × AUTO</span>
      </div>

      <div className="mt-1.5 flex min-h-0 flex-1 flex-col gap-1.5 rounded-[3px] border border-dashed border-ink/35 p-1.5">
        <div className="flex items-center gap-1 border-b border-dashed border-ink/25 pb-1">
          <span className="h-[7px] w-[14px] rounded-[2px] border border-ink/45" />
          <span className="ml-auto flex gap-1.5 text-[6px] leading-none text-muted">
            <span>Work</span>
            <span>Services</span>
            <span>Contact</span>
          </span>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-[1.35fr_1fr] gap-1.5">
          <div className="flex flex-col justify-center gap-[3px]">
            <span className="font-mono text-[5.5px] leading-none tracking-[0.14em] text-amber">
              H1 — VALUE PROPOSITION
            </span>
            <span className="text-[9px] font-semibold leading-[1.1] text-ink">
              Built to be found.
            </span>
            <span className="text-[6.5px] leading-[1.45] text-muted">
              One job per page, one obvious next step.
            </span>
            <span className="mt-[2px] flex items-center gap-1">
              <span className="rounded-full border border-amber/70 px-1.5 py-[2px] text-[6.5px] leading-none text-amber">
                Get a quote
              </span>
              <span className="font-mono text-[5.5px] leading-none text-faint">
                ↕ 48PX
              </span>
            </span>
          </div>
          <div className="relative grid place-items-center rounded-[2px] border border-dashed border-ink/30">
            <span
              className="absolute inset-1 rounded-[2px] opacity-70"
              style={{
                background:
                  "linear-gradient(150deg, rgba(0,230,255,0.30), rgba(240,180,41,0.20) 70%, rgba(244,243,239,0.06))",
              }}
            />
            <span className="relative font-mono text-[5.5px] leading-none tracking-[0.14em] text-ink">
              16:9
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-1.5">
          {["Services", "Proof", "FAQ"].map((s) => (
            <span
              key={s}
              className="rounded-[2px] border border-dashed border-ink/30 py-[3px] text-center text-[6px] leading-none text-muted"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-1.5 flex items-center gap-1.5">
        <span className="h-[9px] w-[9px] rounded-full bg-accent" />
        <span className="h-[9px] w-[9px] rounded-full bg-ink" />
        <span className="h-[9px] w-[9px] rounded-full bg-amber" />
        <span className="ml-auto font-mono text-[6px] leading-none tracking-[0.14em] text-muted">
          CONTRAST AA · 8PT GRID
        </span>
      </div>
    </div>
  );
}

/** Performance — the vitals instrument, measured values against thresholds. */
function MeterFace() {
  const rows = [
    { k: "LCP", v: "1.1s", t: "GOOD < 2.5s", w: "88%" },
    { k: "INP", v: "42ms", t: "GOOD < 200ms", w: "94%" },
    { k: "CLS", v: "0.00", t: "GOOD < 0.10", w: "100%" },
  ];
  return (
    <div className="svc-face">
      <div className="flex items-center justify-between font-mono text-[6px] tracking-[0.16em] text-faint">
        <span className="text-muted">CORE WEB VITALS — MOBILE</span>
        <span className="flex items-center gap-1 text-accent2">
          <span className="h-[5px] w-[5px] rounded-full bg-accent" />
          LIVE
        </span>
      </div>

      <div className="mt-2 flex min-h-0 flex-1 flex-col justify-center gap-2.5">
        {rows.map((r) => (
          <div key={r.k} className="flex flex-col gap-1">
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono text-[8px] tracking-[0.16em] text-muted">
                {r.k}
              </span>
              <span className="font-mono text-[13px] font-medium leading-none text-ink">
                {r.v}
              </span>
              <span className="ml-auto font-mono text-[6px] leading-none tracking-[0.12em] text-accent2">
                {r.t}
              </span>
            </div>
            <span className="relative block h-[5px] rounded-full bg-ink/15">
              <span
                className="absolute inset-y-0 left-0 rounded-full bg-accent"
                style={{ width: r.w }}
              />
            </span>
          </div>
        ))}
      </div>

      <div className="mt-1.5 flex items-center justify-between border-t border-line pt-1.5 font-mono text-[6px] tracking-[0.12em] text-faint">
        <span>MEASURED ON REAL TEMPLATES</span>
        <span className="text-muted">PSI · FIELD DATA</span>
      </div>
    </div>
  );
}

/** WooCommerce — a real catalogue row with prices, cart and checkout. */
function ShopFace() {
  const items = [
    { n: "Roast Blend 250g", p: "£14.00", g: "linear-gradient(150deg,rgba(240,180,41,.55),rgba(120,70,30,.45))" },
    { n: "Ceramic Mug", p: "£19.00", g: "linear-gradient(150deg,rgba(0,230,255,.42),rgba(30,80,110,.5))" },
    { n: "Gift Box", p: "£42.00", g: "linear-gradient(150deg,rgba(244,243,239,.34),rgba(90,95,105,.5))" },
  ];
  return (
    <div className="svc-face">
      <div className="flex items-center gap-1.5">
        <span className="font-mono text-[6.5px] tracking-[0.16em] text-muted">
          SHOP — ALL PRODUCTS
        </span>
        <span className="ml-auto flex items-center gap-1 rounded-full border border-line2 px-1.5 py-[2px]">
          <svg width="8" height="8" viewBox="0 0 12 12" fill="none" className="text-muted">
            <path
              d="M1 1.6h1.7l1.4 6h5.2M4.1 7.6 3.4 3.2h7.2l-.9 4.4"
              stroke="currentColor"
              strokeWidth="1.1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-mono text-[6px] leading-none text-accent2">3</span>
        </span>
      </div>

      <div className="mt-2 grid min-h-0 flex-1 grid-cols-3 gap-1.5">
        {items.map((it, i) => (
          <div
            key={it.n}
            className={`flex min-h-0 flex-col overflow-hidden rounded-[3px] border ${
              i === 0 ? "border-accent/55 bg-accent/[0.06]" : "border-line2 bg-ink/[0.04]"
            }`}
          >
            <span className="min-h-0 flex-1" style={{ background: it.g }} />
            <span className="px-1 pb-1 pt-[3px] leading-none">
              <span className="block truncate text-[6.5px] leading-tight text-ink">
                {it.n}
              </span>
              <span className="mt-[2px] block font-mono text-[7px] leading-none text-accent2">
                {it.p}
              </span>
            </span>
          </div>
        ))}
      </div>

      <div className="mt-2 flex items-center gap-1.5 border-t border-line pt-1.5">
        <span className="font-mono text-[6.5px] leading-none text-muted">
          SUBTOTAL
        </span>
        <span className="font-mono text-[9px] leading-none text-ink">£75.00</span>
        <span className="ml-auto rounded-full bg-accent px-2 py-[3px] text-[6.5px] font-semibold leading-none text-accent-ink">
          Checkout
        </span>
      </div>
    </div>
  );
}

/** Web applications — a real product dashboard: nav, chart, request log. */
function AppFace() {
  const nav = ["Overview", "Records", "API", "Settings"];
  const log = [
    ["GET", "/api/listings", "200", "14ms"],
    ["POST", "/api/leads", "201", "22ms"],
    ["GET", "/api/agents", "200", "9ms"],
  ];
  return (
    <div className="svc-face !p-0">
      <div className="grid min-h-0 flex-1 grid-cols-[64px_1fr]">
        <div className="flex flex-col gap-[3px] border-r border-line px-1.5 py-2">
          <span className="mb-1 flex items-center gap-1">
            <span className="h-[7px] w-[7px] rounded-[2px] bg-accent" />
            <span className="font-mono text-[5.5px] tracking-[0.14em] text-muted">
              PROPHERO
            </span>
          </span>
          {nav.map((n, i) => (
            <span
              key={n}
              className={`rounded-[2px] px-1 py-[2px] text-[6.5px] leading-none ${
                i === 0 ? "bg-accent/20 text-accent2" : "text-muted"
              }`}
            >
              {n}
            </span>
          ))}
          <span className="mt-auto font-mono text-[5.5px] leading-[1.4] text-faint">
            NEXT.JS
            <br />
            NODE.JS
          </span>
        </div>

        <div className="flex min-w-0 flex-col p-2">
          <div className="flex items-center gap-1.5">
            <span className="text-[8px] font-semibold leading-none text-ink">
              Overview
            </span>
            <span className="ml-auto font-mono text-[6px] leading-none tracking-[0.12em] text-faint">
              LAST 24H
            </span>
          </div>

          <div className="relative mt-1.5 min-h-0 flex-1 rounded-[3px] border border-line2 bg-ink/[0.04] p-1">
            <svg viewBox="0 0 200 64" preserveAspectRatio="none" className="h-full w-full">
              <defs>
                <linearGradient id="svc-app-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(0,230,255,0.42)" />
                  <stop offset="100%" stopColor="rgba(0,230,255,0)" />
                </linearGradient>
              </defs>
              <path
                d="M0,52 L26,44 L52,48 L78,30 L104,34 L130,16 L156,22 L200,8 L200,64 L0,64 Z"
                fill="url(#svc-app-fill)"
              />
              <polyline
                points="0,52 26,44 52,48 78,30 104,34 130,16 156,22 200,8"
                fill="none"
                stroke="#00E6FF"
                strokeWidth="1.6"
                vectorEffect="non-scaling-stroke"
                strokeLinejoin="round"
              />
            </svg>
            <span className="absolute bottom-[2px] left-1 right-1 flex justify-between font-mono text-[5px] leading-none text-faint">
              <span>00</span>
              <span>06</span>
              <span>12</span>
              <span>18</span>
              <span>24</span>
            </span>
          </div>

          <div className="mt-1.5 flex flex-col gap-[2px] font-mono text-[6px] leading-none">
            {log.map(([m, path, code, ms]) => (
              <span key={path} className="flex items-center gap-1">
                <span className="w-[18px] shrink-0 text-accent2">{m}</span>
                <span className="min-w-0 flex-1 truncate text-muted">{path}</span>
                <span className="text-ink">{code}</span>
                <span className="w-[22px] shrink-0 text-right text-faint">{ms}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** AI Solutions — an answer-engine exchange that cites the site. */
function AiFace() {
  return (
    <div className="svc-face">
      <div className="flex items-center gap-1.5">
        <span className="grid h-3.5 w-3.5 place-items-center rounded-[3px] border border-accent/60 bg-accent/15">
          <span className="h-[5px] w-[5px] rotate-45 bg-accent" />
        </span>
        <span className="font-mono text-[6px] tracking-[0.16em] text-muted">
          ANSWER ENGINE
        </span>
        <span className="ml-auto font-mono text-[6px] tracking-[0.14em] text-accent2">
          AEO / GEO
        </span>
      </div>

      <div className="mt-2 rounded-[4px] border border-line2 bg-ink/[0.05] px-2 py-1.5">
        <span className="block text-[7.5px] leading-tight text-ink">
          Who builds SEO-ready WordPress sites in Lahore?
        </span>
      </div>

      <p className="mt-2 text-[7.5px] leading-[1.6] text-muted">
        Fakhar e Mustafa is a web developer and SEO expert in Lahore who builds
        WordPress sites with technical SEO engineered into the build
        <span className="align-super font-mono text-[6px] text-accent2">[1]</span>
        {" "}— Elementor Pro and WooCommerce front ends, schema markup and Core
        Web Vitals handled by the same developer.
      </p>

      <div className="mt-auto flex items-center gap-1.5 border-t border-line pt-1.5">
        <span className="flex items-center gap-1 rounded-full border border-accent/55 bg-accent/12 px-1.5 py-[2px]">
          <span className="grid h-[9px] w-[9px] place-items-center rounded-[2px] bg-accent font-mono text-[5px] font-bold leading-none text-accent-ink">
            M
          </span>
          <span className="font-mono text-[6px] leading-none text-accent2">
            mustafadev.org
          </span>
        </span>
        <span className="font-mono text-[6px] leading-none tracking-[0.12em] text-faint">
          CITED · SOURCE 1
        </span>
      </div>
    </div>
  );
}

const FACES: Record<Family, () => React.ReactNode> = {
  serp: SerpFace,
  build: BuildFace,
  wire: WireFace,
  meter: MeterFace,
  shop: ShopFace,
  app: AppFace,
  ai: AiFace,
};

/** The floating preview plate: blueprint sheet + registration corners. */
function Plate({ slug }: { slug: string }) {
  const spec = PLATE[slug] ?? { fam: "build" as Family, tag: "Build" };
  const Face = FACES[spec.fam];
  return (
    <div className="svc-plate" aria-hidden>
      <div className="svc-plate-in">
        <span className="svc-mark -left-px -top-px border-l border-t" />
        <span className="svc-mark -right-px -top-px border-r border-t" />
        <span className="svc-mark -bottom-px -left-px border-b border-l" />
        <span className="svc-mark -bottom-px -right-px border-b border-r" />
        <Face />
      </div>
      <span className="svc-plate-tag">{spec.tag}</span>
    </div>
  );
}

export function ServicesGrid() {
  return (
    <section
      id="services"
      className="border-t border-line bg-bg2"
      aria-labelledby="services-heading"
    >
      <div className="container-x section-pad">
        {/* Opener — ledger heading, index count, all-services link */}
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-8">
          <div className="max-w-3xl">
            <Reveal>
              <p className="label-mono label-mono--accent">The full index</p>
            </Reveal>
            <Reveal delay={80}>
              <h2
                id="services-heading"
                className="display mt-5 text-[clamp(2.2rem,5vw,4rem)]"
              >
                What I <em>build</em>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                Business websites, WooCommerce stores, custom web applications
                and AI-based SaaS — every build ships with SEO and performance
                engineered in.
              </p>
            </Reveal>
          </div>

        </div>

        {/* Column captions — the ledger's ruled header */}
        <Reveal delay={120}>
          <div
            className="svc-cols mt-16 pb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-faint"
            aria-hidden
          >
            <span>N°</span>
            <span>Service</span>
            <span className="hidden md:block">Scope</span>
            <span className="hidden md:block" />
          </div>
        </Reveal>

        {/* The ledger */}
        {/* role restated because list-style:none drops list semantics in Safari/VoiceOver */}
        <ul className="list-none" role="list">
          {services.map((s, i) => (
            <Reveal key={s.slug} as="li" className="svc-row" delay={i * 60}>
              <Link href={`/${s.slug}/`} className="svc-link svc-cols group">
                <span className="svc-idx" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="svc-name">{s.name}</span>
                <span className="svc-meta hidden md:block">
                  {s.chips.join(" · ")}
                </span>
                <span className="svc-arrow" aria-hidden>
                  <svg width="26" height="12" viewBox="0 0 26 12" fill="none">
                    <path
                      d="M1 6h23M19 1l5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
              <Plate slug={s.slug} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
