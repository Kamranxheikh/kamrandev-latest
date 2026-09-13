"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Reveal } from "@/components/Reveal";

/* ------------------------------------------------------------------------ *
 *  THE CROSS-SECTION
 *
 *  "Most developers build websites. I build websites that get found."
 *  Made literal: two specimens on a shared bench. Specimen A — the one
 *  plate most agencies ship: a complete, competent page, drained of
 *  colour. Specimen B — the same rectangle split into its five engineered
 *  layers (the hero's own vocabulary: ghost sheets, corner marks, cyan
 *  edge light), each carrying a face you can actually read: real code
 *  with line numbers, the semantic outline, a live vitals instrument, and
 *  the finished page in full colour. When the bench scrolls into view,
 *  the sheets slide out of the finished page with a stagger.
 * ------------------------------------------------------------------------ */

type SheetSpec = {
  key: string;
  n: string;
  label: string;
  /** Exploded offsets — the resting state the stack opens into */
  dx: string;
  dy: string;
  dz: string;
  /** Resting opacity: recessed sheets sit back, but stay legible */
  op: number;
  /** Transition delay for the staggered spread */
  dd: number;
};

/* Same spatial grammar as the hero's LAYERS, scaled to a specimen. */
const SHEETS: SheetSpec[] = [
  { key: "design", n: "01", label: "Design", dx: "17%", dy: "-40%", dz: "-96px", op: 0.82, dd: 300 },
  { key: "develop", n: "02", label: "Develop", dx: "11%", dy: "-26%", dz: "-64px", op: 0.86, dd: 220 },
  { key: "seo", n: "03", label: "SEO", dx: "5%", dy: "-13%", dz: "-32px", op: 0.9, dd: 140 },
  { key: "perf", n: "04", label: "Performance", dx: "-8%", dy: "10%", dz: "30px", op: 0.96, dd: 380 },
  { key: "live", n: "05", label: "Live", dx: "0%", dy: "0%", dz: "0px", op: 1, dd: 60 },
];

/* --- the faces, one per layer — real content, pure divs ----------------- */

/** 02 — Develop: the actual markup, line-numbered and syntax-coloured. */
type Tok = [string, string];
const CODE: Tok[][] = [
  [
    ["export ", "text-accent2"],
    ["function ", "text-accent2"],
    ["Hero", "text-amber"],
    ["() {", "text-muted"],
  ],
  [
    ["  return", "text-accent2"],
    [" (", "text-muted"],
  ],
  [
    ["    <section ", "text-accent"],
    ["id", "text-amber"],
    ['="hero"', "text-ink"],
    [">", "text-accent"],
  ],
  [
    ["      <h1", "text-accent"],
    [">", "text-accent"],
    ["Websites that", "text-ink"],
  ],
  [
    ["      look incredible.", "text-ink"],
    ["</h1>", "text-accent"],
  ],
  [
    ["      <Link ", "text-accent"],
    ["href", "text-amber"],
    ['="/contact/"', "text-ink"],
    ["/>", "text-accent"],
  ],
  [
    ["    </section>", "text-accent"],
  ],
  [
    ["  );", "text-muted"],
  ],
];

const VITALS = [
  { k: "LCP", v: "1.1s", t: "GOOD", w: "88%" },
  { k: "INP", v: "42ms", t: "GOOD", w: "94%" },
  { k: "CLS", v: "0.00", t: "GOOD", w: "100%" },
];

function SheetFace({ layer }: { layer: string }) {
  switch (layer) {
    /* 01 — Design: an annotated wireframe, dimensioned like a drawing. */
    case "design":
      return (
        <div className="dif-face">
          <div className="flex items-center justify-between font-mono text-[6px] leading-none tracking-[0.16em] text-faint">
            <span>W—01 HOMEPAGE</span>
            <span className="text-amber">8PT GRID</span>
          </div>
          <div className="mt-1.5 flex min-h-0 flex-1 flex-col gap-1.5 rounded-[3px] border border-dashed border-ink/35 p-1.5">
            <div className="flex items-center gap-1 border-b border-dashed border-ink/25 pb-1">
              <span className="h-[7px] w-[13px] rounded-[2px] border border-ink/50" />
              <span className="ml-auto flex gap-1.5 text-[6px] leading-none text-muted">
                <span>Work</span>
                <span>Services</span>
                <span>Contact</span>
              </span>
            </div>
            <div className="grid min-h-0 flex-1 grid-cols-[1.4fr_1fr] gap-1.5">
              <div className="flex flex-col justify-center gap-[3px]">
                <span className="font-mono text-[5.5px] leading-none tracking-[0.14em] text-amber">
                  H1 — VALUE PROP
                </span>
                <span className="text-[8.5px] font-semibold leading-[1.1] text-ink">
                  Built to be found.
                </span>
                <span className="text-[6px] leading-[1.45] text-muted">
                  One job per page. One obvious next step.
                </span>
                <span className="mt-[2px] w-fit rounded-full border border-amber/70 px-1.5 py-[2px] text-[6px] leading-none text-amber">
                  Get a quote
                </span>
              </div>
              <div className="relative grid place-items-center rounded-[2px] border border-dashed border-ink/30">
                <span
                  className="absolute inset-1 rounded-[2px]"
                  style={{
                    background:
                      "linear-gradient(150deg, rgba(255, 138, 61,0.28), rgba(232, 200, 114,0.18) 70%, rgba(243, 236, 226,0.06))",
                  }}
                />
                <span className="relative font-mono text-[5.5px] leading-none tracking-[0.14em] text-ink">
                  16:9
                </span>
              </div>
            </div>
          </div>
        </div>
      );

    /* 02 — Develop: real code, line numbers, syntax colour. */
    case "develop":
      return (
        <div className="dif-face">
          <div className="flex items-center gap-1 font-mono text-[6px] leading-none tracking-[0.14em] text-faint">
            <span className="h-[5px] w-[5px] rounded-full bg-accent" />
            <span className="text-muted">HERO.TSX</span>
            <span className="ml-auto">TS · JSX</span>
          </div>
          <div className="mt-1.5 flex min-h-0 flex-1 flex-col justify-center gap-[2px] font-mono text-[6px] leading-[1.35]">
            {CODE.map((line, i) => (
              <span key={i} className="flex gap-1.5 whitespace-pre">
                <span className="w-2 shrink-0 text-right text-faint">{i + 1}</span>
                <span className="min-w-0 truncate">
                  {line.map(([t, cls], j) => (
                    <span key={j} className={cls}>
                      {t}
                    </span>
                  ))}
                </span>
              </span>
            ))}
          </div>
        </div>
      );

    /* 03 — SEO: the semantic outline plus validated structured data. */
    case "seo":
      return (
        <div className="dif-face">
          <div className="font-mono text-[6px] leading-none tracking-[0.16em] text-muted">
            SEMANTIC OUTLINE
          </div>
          <div className="mt-1.5 flex min-h-0 flex-1 flex-col justify-center gap-[3px]">
            {[
              ["h1", "Websites that look incredible.", "pl-0"],
              ["h2", "What I build", "pl-2"],
              ["h2", "The difference", "pl-2"],
              ["h3", "SEO-ready development", "pl-4"],
            ].map(([tag, text, pad]) => (
              <span key={text} className={`flex items-center gap-1 ${pad}`}>
                <span className="shrink-0 rounded-[2px] border border-accent/50 bg-accent/10 px-1 py-[1px] font-mono text-[5.5px] leading-none text-accent2">
                  {tag}
                </span>
                <span className="min-w-0 truncate text-[6.5px] leading-none text-ink">
                  {text}
                </span>
              </span>
            ))}
          </div>
          <div className="mt-1.5 flex flex-wrap items-center gap-1 border-t border-line pt-1.5 font-mono text-[5.5px] leading-none">
            <span className="rounded-[2px] border border-accent/50 px-1 py-[2px] text-accent2">
              JSON-LD · Service
            </span>
            <span className="rounded-[2px] border border-line2 px-1 py-[2px] text-muted">
              sitemap.xml
            </span>
            <span className="ml-auto text-accent">VALID ✓</span>
          </div>
        </div>
      );

    /* 04 — Performance: the instrument, with the numbers on it. */
    case "perf":
      return (
        <div className="dif-face">
          <div className="flex items-center justify-between font-mono text-[6px] leading-none tracking-[0.16em]">
            <span className="text-muted">CORE WEB VITALS</span>
            <span className="flex items-center gap-1 text-accent2">
              <span className="h-[5px] w-[5px] rounded-full bg-accent" />
              MOBILE
            </span>
          </div>
          <div className="mt-1.5 flex min-h-0 flex-1 flex-col justify-center gap-2">
            {VITALS.map((v) => (
              <div key={v.k} className="flex flex-col gap-[3px]">
                <span className="flex items-baseline gap-1.5">
                  <span className="font-mono text-[6.5px] leading-none tracking-[0.14em] text-muted">
                    {v.k}
                  </span>
                  <span className="font-mono text-[11px] leading-none text-ink">
                    {v.v}
                  </span>
                  <span className="ml-auto rounded-[2px] border border-accent/50 px-1 py-[1px] font-mono text-[5.5px] leading-none text-accent2">
                    {v.t}
                  </span>
                </span>
                <span className="relative block h-[4px] rounded-full bg-ink/15">
                  <span
                    className="absolute inset-y-0 left-0 rounded-full bg-accent"
                    style={{ width: v.w }}
                  />
                </span>
              </div>
            ))}
          </div>
        </div>
      );

    /* 05 — Live: the finished page, in colour. */
    default:
      return <MiniPage live />;
  }
}

/**
 * The finished page drawn small. Used twice: in full colour as the top
 * sheet of the five-layer stack, and — via CSS desaturation on the sheet
 * itself — as specimen A, the single plate most agencies hand over. Same
 * page either way; the only difference is what got engineered underneath.
 */
function MiniPage({ live = false }: { live?: boolean }) {
  const mark = live ? "bg-accent" : "bg-ink/45";
  const cta = live
    ? "bg-accent text-accent-ink"
    : "bg-ink/30 text-bg";
  const feat = live
    ? "border-accent/45 text-accent2"
    : "border-line2 text-muted";
  return (
    <div className="dif-face">
      {/* nav */}
      <div className="flex items-center gap-1 border-b border-line pb-1.5">
        <span className={`h-[8px] w-[8px] rounded-[2px] ${mark}`} />
        <span className="text-[7px] font-semibold leading-none text-ink">
          Kamran
        </span>
        <span className="ml-auto flex gap-1.5 text-[6px] leading-none text-muted">
          <span>Work</span>
          <span>Services</span>
          <span>Contact</span>
        </span>
      </div>

      {/* hero */}
      <div className="flex min-h-0 flex-1 flex-col justify-center py-1.5">
        <span className="block text-[11px] font-semibold leading-[1.08] tracking-[-0.02em] text-ink">
          Websites that
          <br />
          look incredible.
        </span>
        <span className="mt-1 block text-[6.5px] leading-[1.45] text-muted">
          Built to perform. Designed to be found.
        </span>
        <span className="mt-1.5 flex items-center gap-1.5">
          <span
            className={`rounded-full px-2 py-[3px] text-[6.5px] font-semibold leading-none ${cta}`}
          >
            Start a project
          </span>
          <span className="text-[6px] leading-none text-muted underline">
            View my work
          </span>
        </span>
      </div>

      {/* proof strip */}
      <div className="grid grid-cols-3 gap-1">
        {["Development", "SEO & AI", "Performance"].map((f) => (
          <span
            key={f}
            className={`truncate rounded-[2px] border px-1 py-[3px] text-center text-[5.5px] leading-none ${feat}`}
          >
            {f}
          </span>
        ))}
      </div>
      <span className="mt-1 block font-mono text-[5.5px] leading-none tracking-[0.14em] text-faint">
        KAMRANDEV.COM
      </span>
    </div>
  );
}

/** Specimen A: the same page — desaturated by the sheet, not faded out. */
function FlatFace() {
  return <MiniPage />;
}

function Marks() {
  return (
    <>
      <span className="dif-mark -left-px -top-px border-l border-t" />
      <span className="dif-mark -right-px -top-px border-r border-t" />
      <span className="dif-mark -bottom-px -left-px border-b border-l" />
      <span className="dif-mark -bottom-px -right-px border-b border-r" />
    </>
  );
}

export function Differentiator() {
  const benchRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = benchRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setOpen(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Open on entry — or if a fast scroll already carried us past it.
          if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
            setOpen(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="border-t border-line" aria-labelledby="diff-heading">
      <div className="container-x section-pad grid items-center gap-14 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16">
        <div>
          <Reveal>
            <p className="label-mono label-mono--accent">03 / The Difference</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 id="diff-heading" className="display mt-5 text-[clamp(2rem,4.6vw,3.6rem)]">
              Most developers build websites. I build websites <em>that get found</em>.
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              Most websites are designed first — and SEO is bolted on later, if
              at all. By then, the architecture, the markup and the performance
              ceiling are already fixed.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              My development and SEO background means search considerations are
              engineered into the build itself: the structure Google crawls,
              the semantics AI answers read, and the speed users feel.
            </p>
          </Reveal>
          <Reveal delay={280}>
            <Link href="/seo/" className="btn btn-ghost mt-8">
              How SEO-ready development works
            </Link>
          </Reveal>
        </div>

        {/* THE CROSS-SECTION BENCH */}
        <Reveal delay={150}>
          <div
            ref={benchRef}
            className={`dif-bench ${open ? "dif-open" : ""}`}
          >
            <div className="dif-stage">
              {/* Specimen A — one plate, everything visible, nothing underneath */}
              <figure className="m-0">
                <div className="dif-scene" aria-hidden>
                  <div className="dif-rig dif-rig--flat">
                    <div className="dif-sheet dif-flat">
                      <span className="dif-pill">01 · 1 layer</span>
                      <FlatFace />
                    </div>
                  </div>
                </div>
                <figcaption className="mt-4">
                  <span className="label-mono label-mono--faint block">
                    What most agencies ship
                  </span>
                  <span className="mt-1.5 block text-sm leading-relaxed text-muted">
                    The visible layer only. Structure, semantics and speed left
                    for later.
                  </span>
                </figcaption>
              </figure>

              {/* Specimen B — the five-layer engineered stack */}
              <figure className="m-0">
                <div className="dif-scene" aria-hidden>
                  <div className="dif-rig">
                    {SHEETS.map((s) => (
                      <div
                        key={s.key}
                        className={`dif-sheet ${
                          s.key === "live" ? "dif-live" : "dif-ghost"
                        }`}
                        style={
                          {
                            "--dx": s.dx,
                            "--dy": s.dy,
                            "--dz": s.dz,
                            "--op": s.op,
                            "--dd": `${s.dd}ms`,
                          } as CSSProperties
                        }
                      >
                        <span
                          className={`dif-pill ${
                            s.key === "live" ? "dif-pill--live" : ""
                          }`}
                        >
                          {s.n} · {s.label}
                        </span>
                        {s.key === "live" ? <Marks /> : null}
                        <SheetFace layer={s.key} />
                      </div>
                    ))}
                  </div>
                  <div className="dif-pool" />
                </div>
                <figcaption className="mt-4">
                  <span className="label-mono label-mono--accent block">
                    What I ship
                  </span>
                  <span className="mt-1.5 block text-sm leading-relaxed text-muted">
                    Design, development, SEO, performance and launch —
                    engineered together, layer by layer.
                  </span>
                </figcaption>
              </figure>
            </div>

            {/* The shared bench rail */}
            <div className="dif-rail mt-6" aria-hidden />
            <p className="label-mono mt-4 !text-faint">
              No retrofits. No &ldquo;we&rsquo;ll handle SEO later.&rdquo;
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
