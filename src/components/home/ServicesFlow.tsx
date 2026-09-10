"use client";

import Link from "next/link";
import { useEffect, useRef, type ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import { services } from "@/lib/site";

/* ------------------------------------------------------------------------ *
 *  02 / Services — the build line.
 *
 *  A full-viewport stage pins while a tall track scrolls past. Inside it,
 *  one drawn line runs the width of a world several screens wide; scrolling
 *  dollies the camera along that line, and each service is a station on it —
 *  dot, dashed drop, name, one short line, and a small drawn artifact
 *  floating above. The line lights up as it is travelled, and the section
 *  releases the moment the last card reaches focus: no dead scroll.
 *
 *  The scrub follows the wheel through a damped ease (the same recipe as the
 *  hero reel), so flicks glide instead of snapping.
 *
 *  Below 1024px, without JS, or under reduced motion the same content
 *  renders as a vertical rail — nothing is lost, only the choreography.
 * ------------------------------------------------------------------------ */

/** Scrub distance in viewports. The track is (1 + SCRUB) * 100vh tall. */
const SCRUB = 5.5;
/** World-space x of each station anchor, in px. */
const STATION_X = [1300, 2420, 3540, 4660, 5780, 6900];
/** World-space x of the closing card. */
const END_X = 8080;
/** The focus point sits at this fraction of the viewport width. */
const FOCUS = 0.42;
/** A station is at full strength within this distance of focus. */
const FALLOFF = 540;

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

/** The line: a gentle swell around the stage's lower middle. */
const lineY = (x: number, vh: number) =>
  0.56 * vh + Math.min(76, Math.max(44, 0.07 * vh)) * Math.sin((x - 400) / 560);

/** The six stations. Primary services lead: development, then SEO.
    One line each — no paragraphs; the scope chips carry the detail.
    Each station also docks a real build from the portfolio (`shot`) that
    demonstrates the service — the same screenshots the Work section uses. */
const STATIONS = [
  {
    slug: "website-development",
    name: "Website Development",
    line: "Strategy, build and launch — end to end.",
    sat: "Launch-ready",
    shot: { src: "/work/prophero-real-estate-crm.webp", name: "Prophero CRM" },
  },
  {
    slug: "seo",
    name: "SEO & AI Search",
    line: "Technical SEO, AEO and GEO engineered in.",
    sat: "Schema valid",
    shot: { src: "/work/ai-tool-camp.webp", name: "AI Tool Camp" },
  },
  {
    slug: "wordpress-development",
    name: "WordPress Development",
    line: "My core specialty — Elementor Pro and custom code.",
    sat: "Elementor Pro",
    shot: { src: "/work/huckleberrys-restaurant.webp", name: "Huckleberry’s" },
  },
  {
    slug: "website-design",
    name: "Website Design",
    line: "Conversion-first design shaped around your brand.",
    sat: "8pt grid",
    shot: { src: "/work/rose-wealth.webp", name: "Rose Wealth" },
  },
  {
    slug: "website-performance",
    name: "Website Performance",
    line: "Core Web Vitals as a build requirement.",
    sat: "CWV 100",
    shot: { src: "/work/citygate-financial-planning.webp", name: "Citygate" },
  },
  {
    slug: "ai-solutions",
    name: "AI Solutions",
    line: "AI SaaS builds, integrations and AI-search visibility.",
    sat: "Cited by AI",
    shot: null,
  },
] as const;

/** Real scope chips per station, straight from site.ts. */
const chipsFor = (slug: string) =>
  services.find((x) => x.slug === slug)?.chips.slice(0, 3) ?? [];

/** The services that are not stations — named on the end card. */
const moreServices = services
  .filter((x) => !STATIONS.some((st) => st.slug === x.slug))
  .map((x) => x.name);

export function ServicesFlow() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const baseRef = useRef<SVGPathElement>(null);
  const litRef = useRef<SVGPathElement>(null);
  const echoRef = useRef<SVGPathElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const stRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tickRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const media = window.matchMedia(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
    );
    const track = trackRef.current;
    const stage = stageRef.current;
    const world = worldRef.current;
    const svg = svgRef.current;
    const base = baseRef.current;
    const lit = litRef.current;
    const echo = echoRef.current;
    const head = headRef.current;
    if (!track || !stage || !world || !svg || !base || !lit || !echo || !head)
      return;

    let travel = 1;
    let focusX = 0;
    /** Cumulative path length at every 32px of world x. */
    let cum: number[] = [];
    let totalLen = 0;
    let vh = 0;
    let raf = 0;
    let eased: number | null = null;
    let active = false;

    const measure = () => {
      active = media.matches;
      if (!active) return;
      const vw = window.innerWidth;
      vh = stage.clientHeight;
      focusX = FOCUS * vw;
      travel = END_X - focusX;
      const worldW = END_X + (vw - focusX) + 260;
      world.style.width = `${worldW}px`;

      // Sample the curve once; the path, the dash lengths and every station
      // anchor all come from the same table so nothing can disagree.
      const step = 32;
      const pts: string[] = [];
      cum = [0];
      let px = 0;
      let py = lineY(0, vh);
      pts.push(`M 0 ${py.toFixed(1)}`);
      for (let x = step; x <= worldW; x += step) {
        const y = lineY(x, vh);
        pts.push(`L ${x} ${y.toFixed(1)}`);
        cum.push(cum[cum.length - 1] + Math.hypot(x - px, y - py));
        px = x;
        py = y;
      }
      const d = pts.join(" ");
      totalLen = cum[cum.length - 1];
      svg.setAttribute("viewBox", `0 0 ${worldW} ${vh}`);
      svg.setAttribute("width", String(worldW));
      svg.setAttribute("height", String(vh));
      for (const p of [base, lit, echo]) p.setAttribute("d", d);
      for (const p of [lit, echo]) {
        p.style.strokeDasharray = String(totalLen);
        p.style.strokeDashoffset = String(totalLen);
      }

      for (let i = 0; i < STATION_X.length; i++) {
        const el = stRefs.current[i];
        if (!el) continue;
        el.style.left = `${STATION_X[i]}px`;
        el.style.top = `${lineY(STATION_X[i], vh)}px`;
      }
      if (endRef.current) {
        endRef.current.style.left = `${END_X}px`;
        endRef.current.style.top = `${lineY(END_X, vh)}px`;
      }
      // Waypoint ticks sit midway between stations, riding the same curve.
      for (let i = 0; i < STATION_X.length - 1; i++) {
        const el = tickRefs.current[i];
        if (!el) continue;
        const x = (STATION_X[i] + STATION_X[i + 1]) / 2;
        el.style.left = `${x}px`;
        el.style.top = `${lineY(x, vh)}px`;
      }
    };

    /** Path length at world x, from the sample table. */
    const lenAt = (x: number) => {
      const i = clamp01(x / 32 / (cum.length - 1)) * (cum.length - 1);
      const lo = Math.floor(i);
      const hi = Math.min(cum.length - 1, lo + 1);
      return cum[lo] + (cum[hi] - cum[lo]) * (i - lo);
    };

    const paint = () => {
      raf = 0;
      if (!active) return;
      const rect = track.getBoundingClientRect();
      const span = rect.height - vh;
      if (span <= 0) return;
      const raw = clamp01(-rect.top / span);

      // Damped follow — a flick glides in over a few frames.
      if (eased === null) eased = raw;
      const gap = raw - eased;
      eased += Math.abs(gap) < 0.0004 ? gap : gap * 0.12;
      const p = eased;
      const settled = Math.abs(raw - eased) < 0.0004;

      // Skip the work while the section is nowhere near the screen.
      if (rect.bottom < -300 || rect.top > vh + 300) {
        if (!settled) raf = requestAnimationFrame(paint);
        return;
      }

      const tx = -p * travel;
      world.style.transform = `translate3d(${tx.toFixed(2)}px, 0, 0)`;

      // The lit segment always ends just past the focus point — the line is
      // being laid as it is travelled.
      const xHead = Math.min(END_X, focusX - tx + 130);
      const ln = lenAt(xHead);
      const off = String(Math.max(0, totalLen - ln));
      lit.style.strokeDashoffset = off;
      echo.style.strokeDashoffset = off;
      head.style.transform = `translate3d(${xHead.toFixed(1)}px, ${lineY(xHead, vh).toFixed(1)}px, 0)`;

      const focusWorld = focusX - tx;
      let reached = 0;
      for (let i = 0; i < STATION_X.length; i++) {
        const el = stRefs.current[i];
        if (!el) continue;
        const f = 1 - clamp01(Math.abs(STATION_X[i] - focusWorld) / FALLOFF);
        el.style.setProperty("--f", f.toFixed(3));
        if (STATION_X[i] <= focusWorld + 240) reached = i + 1;
      }
      if (endRef.current) {
        const f = 1 - clamp01(Math.abs(END_X - focusWorld) / (FALLOFF * 1.3));
        endRef.current.style.setProperty("--f", f.toFixed(3));
      }
      if (introRef.current) {
        introRef.current.style.opacity = String(1 - clamp01(p / 0.085));
      }
      if (numRef.current) {
        numRef.current.textContent = String(Math.max(1, reached)).padStart(2, "0");
      }
      if (fillRef.current) {
        fillRef.current.style.transform = `scaleX(${p.toFixed(4)})`;
      }

      if (!settled) raf = requestAnimationFrame(paint);
    };

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const onResize = () => {
      measure();
      kick();
    };

    measure();
    kick();
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", onResize);
    media.addEventListener("change", onResize);
    // Fonts land late and change the intro's metrics; the curve never moves,
    // but a settle pass keeps the head/station geometry honest.
    const settles = [400, 1200].map((ms) => setTimeout(onResize, ms));

    return () => {
      cancelAnimationFrame(raf);
      for (const t of settles) clearTimeout(t);
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", onResize);
      media.removeEventListener("change", onResize);
    };
  }, []);

  /** Keyboard: focusing a station's link drives the scrub to that station. */
  const scrollToStation = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const media = window.matchMedia(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
    );
    if (!media.matches) return;
    const vh = window.innerHeight;
    const focusX = FOCUS * window.innerWidth;
    const p = clamp01((STATION_X[i] - focusX) / (END_X - focusX));
    const top = track.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + p * (track.offsetHeight - vh) });
  };

  return (
    <section aria-labelledby="services-heading" className="border-t border-line">
      {/* ------------------- the conveyor (wide + motion) ------------------- */}
      <div
        ref={trackRef}
        className="flw-track"
        style={{ "--flw-scrub": SCRUB } as React.CSSProperties}
      >
        <div ref={stageRef} className="flw-stage pt-[72px]">
          <div className="grid-bg absolute inset-0 opacity-60" aria-hidden />

          <div ref={worldRef} className="flw-world">
            <svg ref={svgRef} className="flw-svg" aria-hidden>
              <defs>
                <linearGradient id="flw-lit-grad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="var(--color-accent)" stopOpacity="0.1" />
                  <stop offset="0.75" stopColor="var(--color-accent)" stopOpacity="0.85" />
                  <stop offset="1" stopColor="var(--color-accent2)" />
                </linearGradient>
              </defs>
              <path ref={baseRef} fill="none" stroke="var(--color-line2)" strokeWidth="1" />
              <path
                ref={echoRef}
                className="flw-line-echo"
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <path
                ref={litRef}
                fill="none"
                stroke="url(#flw-lit-grad)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <div ref={headRef} className="flw-head" aria-hidden />

            {STATIONS.slice(0, -1).map((s2, i) => (
              <span
                key={`t-${s2.slug}`}
                ref={(el) => {
                  tickRefs.current[i] = el;
                }}
                className="flw-tick"
                aria-hidden
              />
            ))}

            {/* Title card at the head of the line */}
            <div ref={introRef} className="flw-intro">
              <p className="label-mono label-mono--accent">02 / Services</p>
              <h2
                id="services-heading"
                className="display mt-5 text-[clamp(2.2rem,3.6vw,3.6rem)]"
              >
                What I <em>build</em>.
              </h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
                One line, every service on it — SEO and performance
                engineered into each build.
              </p>
            </div>

            {/* Stations */}
            {STATIONS.map((s, i) => (
              <div
                key={s.slug}
                ref={(el) => {
                  stRefs.current[i] = el;
                }}
                className="flw-st"
              >
                <span className="flw-dot" aria-hidden />
                <span className="flw-drop" aria-hidden />

                {/* Docked above the line: a real build from the portfolio in a
                    browser frame, with the service's instrument plate riding
                    its lower corner. */}
                <div className="flw-art" aria-hidden>
                  <div className="flw-art-bob">
                    {s.shot ? <Shot shot={s.shot} /> : <AiShot />}
                    <div className="flw-art-plate">
                      <Artifact i={i} />
                    </div>
                  </div>
                </div>

                <span className="flw-sat" aria-hidden>
                  <span className="flw-sat-bob">
                    <span className="pulse-dot h-1 w-1 rounded-full bg-accent" />
                    {s.sat}
                  </span>
                </span>

                <div className="flw-cap">
                  <span className="label-mono label-mono--faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Link
                    href={`/${s.slug}/`}
                    className="flw-cap-name"
                    onFocus={() => scrollToStation(i)}
                  >
                    {s.name}
                  </Link>
                  <p className="flw-cap-line">{s.line}</p>
                  {s.shot && (
                    <p className="flw-from">
                      From the work — <b>{s.shot.name}</b>
                    </p>
                  )}
                  <p className="flw-chips">
                    {chipsFor(s.slug).map((c) => (
                      <span key={c}>{c}</span>
                    ))}
                  </p>
                </div>
              </div>
            ))}

            {/* Terminal card — arrives exactly as the scrub ends */}
            <div ref={endRef} className="flw-end">
              <div className="flw-end-card">
                <p className="label-mono label-mono--faint mb-3">
                  The full index
                </p>
                <p className="flw-end-also">
                  {moreServices.map((m) => (
                    <span key={m}>{m}</span>
                  ))}
                </p>
                <Link href="/services/" className="btn btn-ghost">
                  All services
                </Link>
              </div>
            </div>
          </div>

          {/* Stage readouts */}
          <p className="flw-hint label-mono label-mono--faint" aria-hidden>
            Scroll
          </p>
          <div className="flw-progress" aria-hidden>
            <span className="label-mono">
              <span ref={numRef}>01</span>
              <span className="text-faint"> / {String(STATIONS.length).padStart(2, "0")}</span>
            </span>
            <span className="flw-progress-bar">
              <span ref={fillRef} className="flw-progress-fill" />
            </span>
          </div>
        </div>
      </div>

      {/* ------------------- the rail (mobile / no-JS / reduced) ------------ */}
      <div className="flw-rail container-x section-pad">
        <Reveal>
          <p className="label-mono label-mono--accent">02 / Services</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="display mt-5 text-[clamp(2rem,4.6vw,3.6rem)]">
            What I <em>build</em>.
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
            One line, every service on it — SEO and performance engineered
            into each build.
          </p>
        </Reveal>

        <div className="flw-rail-list">
          {STATIONS.map((s, i) => (
            <Reveal key={s.slug} delay={i * 70} className="flw-rail-st" as="div">
              <span className="label-mono label-mono--faint">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2">
                <Link href={`/${s.slug}/`} className="flw-cap-name !mt-0">
                  {s.name}
                </Link>
              </h3>
              <p className="flw-cap-line">{s.line}</p>
              {s.shot && (
                <p className="flw-from">
                  From the work — <b>{s.shot.name}</b>
                </p>
              )}
              <p className="flw-chips">
                {chipsFor(s.slug).map((c) => (
                  <span key={c}>{c}</span>
                ))}
              </p>
              <div aria-hidden>
                {s.shot ? <Shot shot={s.shot} className="mt-4" /> : <AiShot className="mt-4" />}
                <div className="flw-plate mt-4">
                  <Artifact i={i} bare />
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <Link href="/services/" className="btn btn-ghost mt-12">
            All services
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------ *
 *  Shots — a real portfolio build in a minimal browser frame. The same
 *  screenshots the Work section ships, cropped to their opening viewport.
 * ------------------------------------------------------------------------ */

function Shot({
  shot,
  className = "",
}: {
  shot: { src: string; name: string };
  className?: string;
}) {
  return (
    <div className={`flw-shot ${className}`}>
      <div className="flw-shot-bar">
        <span className="flw-shot-dots" aria-hidden>
          <i />
          <i />
          <i />
        </span>
        <span className="flw-shot-name">{shot.name}</span>
        <svg width="9" height="9" viewBox="0 0 10 10" fill="none" className="text-accent" aria-hidden>
          <path
            d="M3 1.5h5.5V7M8.5 1.5 1.5 8.5"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className="flw-shot-view">
        <img src={shot.src} alt="" loading="lazy" decoding="async" />
      </div>
    </div>
  );
}

/* AI Solutions has no public screenshot to dock, so its window is a drawn
   product console — the shape of an AI SaaS build, no invented client. */
function AiShot({ className = "" }: { className?: string }) {
  return (
    <div className={`flw-shot ${className}`}>
      <div className="flw-shot-bar">
        <span className="flw-shot-dots" aria-hidden>
          <i />
          <i />
          <i />
        </span>
        <span className="flw-shot-name">AI product console</span>
        <span className="flex items-center gap-1 font-mono text-[7px] tracking-[0.12em] text-accent2">
          <span className="pulse-dot h-1 w-1 rounded-full bg-accent" />
          API
        </span>
      </div>
      <div className="flw-shot-view flw-shot-view--ui">
        <div className="grid h-full grid-cols-[64px_1fr]">
          <div className="flex flex-col gap-1 border-r border-line p-1.5 font-mono text-[7px] leading-none text-muted">
            {["Assistant", "Prompts", "API keys", "Usage"].map((t, j) => (
              <span
                key={t}
                className={`rounded-[3px] px-1.5 py-[3px] ${
                  j === 0 ? "bg-accent/15 text-accent2" : ""
                }`}
              >
                {t}
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-1.5 p-2">
            <span className="self-end rounded-[6px] rounded-br-[2px] border border-line2 bg-ink/8 px-2 py-1 text-[8px] leading-snug text-ink/85">
              Draft a reply to this enquiry
            </span>
            <span className="max-w-[86%] rounded-[6px] rounded-bl-[2px] border border-accent/40 bg-accent/8 px-2 py-1.5 text-[8px] leading-relaxed text-ink/80">
              Thanks for reaching out — here’s a summary of your request and
              the next step…
            </span>
            <span className="mt-auto flex items-center gap-1.5 border-t border-line pt-1.5 font-mono text-[6.5px] tracking-[0.12em] text-faint">
              <span className="text-accent2">MODEL CONNECTED</span>
              STREAMING · LOGGED
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------ *
 *  Artifacts — one small drawn instrument per station. Real words, real
 *  numbers, one saturated moment each; no grey-bar skeletons.
 * ------------------------------------------------------------------------ */

function Artifact({ i, bare = false }: { i: number; bare?: boolean }) {
  // Index-aligned with STATIONS: dev, seo, wordpress, design, perf, ai.
  const order = [2, 3, 1, 0, 4, 5];
  const faces: ReactNode[] = [
    /* 01 — Website Design: the drafting pad */
    <Plate key="d" cap="Homepage" tag="8pt grid" bare={bare}>
      <div className="relative grid gap-1.5 rounded-[4px] border border-dashed border-ink/30 p-2">
        <span className="absolute -top-2 right-2 rounded-[2px] bg-amber/90 px-1 py-[1px] font-mono text-[7px] font-medium leading-none text-bg">
          1440
        </span>
        <div className="flex items-center justify-between">
          <span className="h-[5px] w-10 rounded-sm bg-ink/45" />
          <span className="flex gap-1">
            <span className="h-[4px] w-5 rounded-sm bg-ink/25" />
            <span className="h-[4px] w-5 rounded-sm bg-ink/25" />
          </span>
        </div>
        <span className="text-[9px] font-semibold leading-tight text-ink">
          One page. One action.
        </span>
        <span className="flex gap-1.5">
          <span className="rounded-full bg-accent px-2 py-[3px] text-[7px] font-semibold leading-none text-accent-ink">
            Start
          </span>
          <span className="rounded-full border border-line2 px-2 py-[3px] text-[7px] leading-none text-muted">
            Explore
          </span>
        </span>
      </div>
    </Plate>,

    /* 02 — WordPress: the block editor */
    <Plate key="w" cap="Editor" tag="Custom blocks" bare={bare}>
      <div className="grid grid-cols-[56px_1fr] gap-1.5">
        <div className="flex flex-col gap-1 rounded-[4px] border border-line p-1 font-mono text-[7px] leading-none text-muted">
          {["Cover", "Heading", "Columns", "Query"].map((b, j) => (
            <span
              key={b}
              className={`rounded-[2px] px-1 py-[2px] ${
                j === 2 ? "bg-accent/20 text-accent2" : ""
              }`}
            >
              {b}
            </span>
          ))}
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="text-[9px] font-semibold leading-tight text-ink">
            Fast to edit. Hard to break.
          </span>
          <span className="relative rounded-[3px] border border-accent bg-accent/10 p-1.5">
            <span className="absolute -top-[6px] left-1 rounded-[2px] bg-accent px-1 font-mono text-[6px] font-semibold leading-[10px] text-accent-ink">
              COLUMNS
            </span>
            <span className="grid grid-cols-3 gap-1 pt-1">
              {["Design", "Build", "Rank"].map((c) => (
                <span
                  key={c}
                  className="rounded-[2px] border border-accent/50 py-[3px] text-center text-[7px] leading-none text-accent2"
                >
                  {c}
                </span>
              ))}
            </span>
          </span>
        </div>
      </div>
    </Plate>,

    /* 03 — Website Development: the terminal */
    <Plate key="t" cap="Terminal" tag="Compiled" bare={bare}>
      <div className="flex flex-col gap-[5px] font-mono text-[8px] leading-none">
        <span className="text-muted">
          <span className="text-accent2">$</span> npm run build
        </span>
        <span className="text-ink/70">Compiled successfully</span>
        <span className="text-ink/70">34 pages · 0 errors</span>
        <span className="mt-1 flex items-center gap-1.5 text-accent2">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Deployed — SSL active
        </span>
      </div>
    </Plate>,

    /* 04 — SEO & AI Search: the result */
    <Plate key="s" cap="Search" tag="Rich result" bare={bare}>
      <div className="flex flex-col gap-[4px] leading-none">
        <span className="font-mono text-[7px] text-faint">
          mustafadev.org › services
        </span>
        <span className="text-[10px] font-medium leading-tight text-accent2">
          SEO &amp; AI Search Visibility
        </span>
        <span className="flex items-center gap-1">
          {[0, 1, 2, 3, 4].map((k) => (
            <span
              key={k}
              className="h-[6px] w-[6px] bg-amber/90"
              style={{ clipPath: "polygon(50% 0,100% 100%,0 100%)" }}
            />
          ))}
          <span className="ml-1 font-mono text-[6.5px] text-faint">
            AI OVERVIEW · CITED
          </span>
        </span>
        <span className="text-[7.5px] leading-[1.5] text-muted">
          Schema, clean URLs and entities — readable by Google and by answer
          engines.
        </span>
      </div>
    </Plate>,

    /* 05 — Performance: the vitals cluster */
    <Plate key="p" cap="Vitals" tag="All green" bare={bare}>
      <div className="flex flex-col gap-[6px] font-mono text-[8px] leading-none">
        {[
          ["LCP", "1.1s", "86%"],
          ["INP", "42ms", "94%"],
          ["CLS", "0.00", "100%"],
        ].map(([k, v, w]) => (
          <span key={k} className="flex items-center gap-1.5">
            <span className="w-6 shrink-0 text-accent2">{k}</span>
            <span className="relative h-[4px] flex-1 overflow-hidden rounded-full bg-ink/14">
              <span
                className="absolute inset-y-0 left-0 rounded-full bg-accent"
                style={{ width: w }}
              />
            </span>
            <span className="shrink-0 text-ink/80">{v}</span>
          </span>
        ))}
      </div>
    </Plate>,

    /* 06 — AI Solutions: the answer */
    <Plate key="a" cap="Answer engine" tag="Cited" bare={bare}>
      <div className="flex flex-col gap-[5px] leading-none">
        <span className="font-mono text-[7.5px] text-faint">
          “Who builds AI-ready websites?”
        </span>
        <span className="text-[8px] leading-[1.55] text-ink/85">
          Businesses working with structured, semantic sites get cited — like
          this developer’s builds.
        </span>
        <span className="mt-[2px] flex items-center gap-1">
          <span className="rounded-full border border-accent/50 bg-accent/10 px-1.5 py-[2px] font-mono text-[6.5px] leading-none text-accent2">
            mustafadev.org
          </span>
          <span className="font-mono text-[6px] text-faint">SOURCE 1 OF 3</span>
        </span>
      </div>
    </Plate>,
  ];
  return faces[order[i] ?? i] ?? null;
}

function Plate({
  cap,
  tag,
  bare,
  children,
}: {
  cap: string;
  tag: string;
  bare?: boolean;
  children: ReactNode;
}) {
  const body = (
    <>
      <div className="flw-plate-cap">
        <span>{cap}</span>
        <b>{tag}</b>
      </div>
      <div className="p-2.5">{children}</div>
    </>
  );
  // In the rail the wrapper already provides the plate chrome.
  return bare ? body : <div className="flw-plate">{body}</div>;
}
