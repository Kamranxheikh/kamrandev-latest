"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
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
const SCRUB = 6.3;
/** World-space x of each station anchor, in px. */
const STATION_X = [1300, 2420, 3540, 4660, 5780, 6900, 8020];
/** World-space x of the closing card. */
const END_X = 9200;
/** The focus point sits at this fraction of the viewport width. */
const FOCUS = 0.42;
/** A station is at full strength within this distance of focus. */
const FALLOFF = 540;

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

/** The line: a gentle swell around the stage's lower middle. */
const lineY = (x: number, vh: number) =>
  0.56 * vh + Math.min(76, Math.max(44, 0.07 * vh)) * Math.sin((x - 400) / 560);

/** The seven stations, in the site's service order: web applications and AI
    lead, then website development and SEO. One line each — no paragraphs;
    the scope chips carry the detail. Each station docks a real build from
    the portfolio (`shot`) that demonstrates the service — the same
    screenshots the Work section uses. */
const STATIONS = [
  {
    slug: "web-application-development",
    name: "Web Application Development",
    line: "Custom apps and SaaS — Next.js, Laravel and Node.js.",
    shot: { src: "/work/onlinetoolpot.webp", name: "OnlineToolPot", href: "/work/onlinetoolpot/" },
  },
  {
    slug: "ai-solutions",
    name: "AI Solutions",
    line: "AI SaaS builds, integrations and AI-search visibility.",
    shot: { src: "/work/resumaic.webp", name: "Resumaic", href: "/work/resumaic/" },
  },
  {
    slug: "website-development",
    name: "Website Development",
    line: "Strategy, build and launch — end to end.",
    shot: { src: "/work/prophero-real-estate-crm.webp", name: "Prophero CRM", href: "/work/prophero-real-estate-crm/" },
  },
  {
    slug: "seo",
    name: "SEO & AI Search",
    line: "Technical SEO, AEO and GEO engineered in.",
    shot: { src: "/work/ai-tool-camp.webp", name: "AI Tool Camp", href: "/work/ai-tool-camp/" },
  },
  {
    slug: "wordpress-development",
    name: "WordPress Development",
    line: "My core specialty — Elementor Pro and custom code.",
    shot: { src: "/work/huckleberrys-restaurant.webp", name: "Huckleberry’s", href: "/work/huckleberrys-restaurant/" },
  },
  {
    slug: "website-design",
    name: "Website Design",
    line: "Conversion-first design shaped around your brand.",
    shot: { src: "/work/rose-wealth.webp", name: "Rose Wealth", href: "/work/rose-wealth/" },
  },
  {
    slug: "website-performance",
    name: "Website Performance",
    line: "Core Web Vitals as a build requirement.",
    shot: { src: "/work/citygate-financial-planning.webp", name: "Citygate", href: "/work/citygate-financial-planning/" },
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
                    browser frame — the window itself opens the case study. */}
                <div className="flw-art">
                  <div className="flw-art-bob">
                    <Shot shot={s.shot} onFocus={() => scrollToStation(i)} />
                  </div>
                </div>

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
                  <p className="flw-from">
                    From the work — <b>{s.shot.name}</b>
                  </p>
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
              <p className="flw-from">
                From the work — <b>{s.shot.name}</b>
              </p>
              <p className="flw-chips">
                {chipsFor(s.slug).map((c) => (
                  <span key={c}>{c}</span>
                ))}
              </p>
              <Shot shot={s.shot} className="mt-4" />
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
  onFocus,
}: {
  shot: { src: string; name: string; href: string };
  className?: string;
  onFocus?: () => void;
}) {
  return (
    <Link
      href={shot.href}
      className={`flw-shot ${className}`}
      aria-label={`${shot.name} — view the case study`}
      onFocus={onFocus}
    >
      <span className="flw-shot-bar">
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
      </span>
      <span className="flw-shot-view">
        <img src={shot.src} alt="" loading="lazy" decoding="async" />
      </span>
    </Link>
  );
}
