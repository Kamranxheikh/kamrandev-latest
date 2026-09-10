"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { site } from "@/lib/site";

/* ---------------------------------------------------------------------------
   Hero — "The Monument". The name as giant silver letterforms under one
   overhead lamp: the light snaps on, the monuments rise, the camera pulls
   back, letters lift under the cursor. The interface stays a thin overlay
   along the bottom edge.

   Load path is tuned for first paint: the three.js chunk, gsap and the
   6-glyph font JSON all start downloading the moment this module is
   evaluated (hydration), in parallel — not serially inside the effect.
   No WebGL (or a scene error) hides the canvas and simply reveals the
   overlay on the dark ground; a failsafe timer force-shows the copy if
   loading ever stalls, and without JS everything is visible by default.
--------------------------------------------------------------------------- */

const boot =
  typeof window === "undefined"
    ? null
    : {
        gsap: import("gsap").then((m) => m.default),
        scene: import("./monument-scene"),
        font: fetch("/fonts/monument-glyphs.json").then((r) => {
          if (!r.ok) throw new Error(`font ${r.status}`);
          return r.json() as Promise<unknown>;
        }),
      };

export function HeroMonument() {
  const rootRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas || !boot) return;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    let webgl = false;
    try {
      const probe = document.createElement("canvas");
      webgl = !!(probe.getContext("webgl2") || probe.getContext("webgl"));
    } catch {
      webgl = false;
    }

    let disposed = false;
    let revealed = false;
    let scene: { intro(): unknown; dispose(): void } | null = null;
    const cleanups: (() => void)[] = [];

    /* If anything stalls (slow network, chunk error), the copy must not
       stay hidden — force it visible without waiting for gsap. */
    const forceShow = () => {
      if (revealed) return;
      revealed = true;
      root.querySelectorAll<HTMLElement>("[data-io]").forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      const arc = root.querySelector<SVGCircleElement>(".mh-vitals-arc");
      if (arc) arc.style.strokeDashoffset = "0";
    };
    const failsafe = window.setTimeout(forceShow, 3200);
    cleanups.push(() => window.clearTimeout(failsafe));

    (async () => {
      const gsap = await boot.gsap;
      if (disposed) return;

      /* NOTE: never call gsap.ticker.lagSmoothing(0) here. Scene setup +
         first shader compile is one long main-thread task; a timeline
         created at its tail would start "in the past" and the whole
         entrance would be skipped. Default lag smoothing forgives that
         jump, and the wall-clock failsafe above covers real stalls. */
      const q = gsap.utils.selector(root);

      /* The copy is CSS-hidden from first paint (.js-gated), so the scene
         always owns the opening frame; fromTo drives it to an explicit
         visible end state on top of that base. */
      const revealOverlay = (delay: number) => {
        if (revealed) return; // failsafe already showed everything
        revealed = true;
        window.clearTimeout(failsafe);
        const arc = root.querySelector<SVGCircleElement>(".mh-vitals-arc");
        if (reduced) {
          if (arc) arc.style.strokeDashoffset = "0";
          return;
        }
        const tl = gsap
          .timeline({ defaults: { ease: "power4.out" } })
          .fromTo(
            q("[data-io]"),
            { y: 22, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9, stagger: 0.09 },
            delay,
          )
          .to(
            q(".mh-vitals-arc"),
            { strokeDashoffset: 0, duration: 1.3, ease: "power2.inOut" },
            delay + 0.35,
          );
        cleanups.push(() => tl.kill());
      };

      /* magnetic primary CTA (clamped pull) */
      if (!reduced && matchMedia("(pointer: fine)").matches) {
        root.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
          const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
          const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });
          const move = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            xTo((e.clientX - r.left - r.width / 2) * 0.3);
            yTo((e.clientY - r.top - r.height / 2) * 0.3);
          };
          const leave = () => {
            xTo(0);
            yTo(0);
          };
          el.addEventListener("pointermove", move);
          el.addEventListener("pointerleave", leave);
          cleanups.push(() => {
            el.removeEventListener("pointermove", move);
            el.removeEventListener("pointerleave", leave);
          });
        });
      }

      if (!webgl) {
        canvas.style.display = "none";
        revealOverlay(0.1);
        return;
      }

      try {
        const [{ createMonumentScene }, fontData] = await Promise.all([
          boot.scene,
          boot.font,
        ]);
        if (disposed) return;
        scene = createMonumentScene(canvas, reduced, fontData);
        if (reduced) {
          revealOverlay(0);
          scene.intro();
        } else {
          /* 3D strictly first — but only once the dark stage has actually
             PAINTED (two rAFs put us past the setup task, with gsap's
             clock fresh), and only when the hero is on screen: if the
             browser restored a mid-page scroll position, the entrance
             waits and plays when the hero scrolls back into view instead
             of running unseen. */
          const startIntro = () => {
            requestAnimationFrame(() =>
              requestAnimationFrame(() => {
                if (disposed) return;
                scene?.intro();
                revealOverlay(1.9);
              }),
            );
          };
          if (typeof IntersectionObserver === "undefined") {
            startIntro();
          } else {
            const io = new IntersectionObserver(
              (entries) => {
                if (entries.some((e) => e.isIntersecting)) {
                  io.disconnect();
                  startIntro();
                }
              },
              { threshold: 0.2 },
            );
            io.observe(canvas);
            cleanups.push(() => io.disconnect());
          }
        }
      } catch {
        canvas.style.display = "none";
        revealOverlay(0.1);
      }
    })().catch(forceShow);

    return () => {
      disposed = true;
      cleanups.forEach((fn) => fn());
      scene?.dispose();
    };
  }, []);

  return (
    <section ref={rootRef} className="mh-hero" id="hero" aria-label="Introduction">
      {/* the monument scene owns the whole viewport */}
      <canvas ref={canvasRef} className="mh-stage" aria-hidden />

      <div className="mh-floorfade" aria-hidden />

      {/* minimal overlay: the 3D is the hero */}
      <div className="mh-overlay">
        <p className="mh-signal" data-io>
          <span className="mh-signal-dot" aria-hidden />
          Available
        </p>

        <div className="mh-left">
          <p className="mh-eyebrow" data-io>
            {site.role}
          </p>
          <h1 className="mh-title" data-io>
            Websites that look <em>incredible</em>. Built to be <em>found</em>.
          </h1>
          <p className="mh-meta" data-io>
            {site.yearsExperience}+ years&nbsp;&nbsp;·&nbsp;&nbsp;
            {site.projectsShipped}+ projects shipped&nbsp;&nbsp;·&nbsp;&nbsp;
            {site.location.city}, PK
          </p>
          <div className="mh-ctas" data-io>
            <Link className="btn btn-primary" href="/contact/" data-magnetic>
              Build My Website
              <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden>
                <path
                  d="M2 8h11M9.5 3.5 14 8l-4.5 4.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <Link className="btn btn-ghost" href="/work/">
              Explore My Work
            </Link>
          </div>
        </div>

        <div className="mh-right" data-io>
          <div
            className="mh-vitals"
            role="img"
            aria-label="Lighthouse performance 100. Largest Contentful Paint 1.1 seconds, Interaction to Next Paint 42 milliseconds, Cumulative Layout Shift zero."
          >
            <div className="mh-vitals-score">
              <svg viewBox="0 0 44 44" aria-hidden>
                <circle className="mh-vitals-track" cx="22" cy="22" r="19" />
                <circle className="mh-vitals-arc" cx="22" cy="22" r="19" />
              </svg>
              <span className="mh-vitals-num">100</span>
            </div>
            <dl className="mh-vitals-rows" aria-hidden>
              <div className="mh-vitals-row">
                <dt>LCP</dt>
                <dd>1.1s</dd>
              </div>
              <div className="mh-vitals-row">
                <dt>INP</dt>
                <dd>42ms</dd>
              </div>
              <div className="mh-vitals-row">
                <dt>CLS</dt>
                <dd>0.00</dd>
              </div>
            </dl>
          </div>
        </div>

        <p className="mh-scrollhint" data-io aria-hidden>
          <span className="mh-scrollhint-line" />
          Scroll
        </p>
      </div>
    </section>
  );
}
