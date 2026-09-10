"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { site } from "@/lib/site";
import { SignalField } from "./SignalField";

/**
 * One project in the browser reel. `image` is a real screenshot of the live
 * site, cropped to a 2:3 ratio from the top — hero plus the sections under it
 * — so a single -50% scroll reveals the second screenful for every slide.
 */
export type Showcase = {
  slug: string;
  name: string;
  industry: string;
  image: string;
  url: string;
};

/* ------------------------------------------------------------------------ *
 *  The build chamber.
 *
 *  A website is not one surface — it is a stack. The blueprint, the code,
 *  the semantics, the instrumentation and the finished page all occupy the
 *  same rectangle, at different depths. So the hero renders them that way:
 *  five sheets held apart in a single 3D space, exploded like an engineering
 *  drawing, collapsible back into the one page a visitor actually sees.
 * ------------------------------------------------------------------------ */

type Layer = {
  key: string;
  n: string;
  label: string;
  /** Exploded offset in the shared 3D space (scaled by --depth per breakpoint) */
  sx: string;
  sy: string;
  sz: string;
  /** Stagger for the explode choreography */
  sd: number;
  /** Resting opacity — the finished page stays solid, the sheets read as ghosts */
  rest: number;
  status: string;
  caption: string;
};

const LAYERS: Layer[] = [
  {
    key: "design",
    n: "01",
    label: "Design",
    sx: "15%",
    sy: "-34%",
    sz: "-330px",
    sd: 200,
    rest: 0.5,
    status: "Wireframe → hi-fi · 8pt grid",
    caption: "Wireframe first. Layout, hierarchy and the one action the page is built around.",
  },
  {
    key: "develop",
    n: "02",
    label: "Develop",
    sx: "9%",
    sy: "-22%",
    sz: "-220px",
    sd: 110,
    rest: 0.58,
    status: "npm run build — compiled clean",
    caption: "Semantic HTML and a real component system. Clean architecture, no page-builder debt.",
  },
  {
    key: "seo",
    n: "03",
    label: "SEO",
    sx: "4%",
    sy: "-10.5%",
    sz: "-112px",
    sd: 40,
    rest: 0.66,
    status: "Schema valid — crawlable, indexable",
    caption: "Structure search engines can read: one H1, schema markup, internal links, clean sitemap.",
  },
  {
    key: "perf",
    n: "04",
    label: "Performance",
    sx: "-8%",
    sy: "10%",
    sz: "150px",
    sd: 300,
    rest: 0.95,
    status: "Core Web Vitals in the green",
    caption: "Measured, not assumed. Core Web Vitals tracked until the numbers hold on real devices.",
  },
  {
    key: "live",
    n: "05",
    label: "Live",
    sx: "0%",
    sy: "0%",
    sz: "0px",
    sd: 0,
    rest: 1,
    status: "Deployed — SSL active, indexed",
    caption: "Shipped to production: SSL, backups, Search Console and analytics wired in.",
  },
];

const LIVE = LAYERS.length - 1;

/* ------------------------------------------------------------------------ *
 *  Scroll budget, in viewport heights. Kept deliberately tight — a project
 *  should turn over in a flick of the wheel, not half a page of scrolling.
 * ------------------------------------------------------------------------ */
const MORPH_VH = 0.42; // panel leaves its column and takes the screen
const SLIDE_VH = 0.4; // one per project
const EXIT_VH = 0.2; // a brief hold on the last project before it releases
/** Fraction of a slide spent crossfading into the next one. */
const CROSSFADE = 0.14;
/** Breathing room between the panel and the edges of its band. */
const PAD = 12;
/** The screenshots are 880px wide. Past this the upscale starts to show. */
const MAX_UPSCALE = 1.35;
const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);
const smooth = (n: number) => n * n * (3 - 2 * n);

export function Hero({ showcase }: { showcase: Showcase[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const zoneRef = useRef<HTMLElement>(null);
  const rigRef = useRef<HTMLDivElement>(null);
  const chamberRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const holdRef = useRef<HTMLDivElement>(null);
  const stickRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const panelUiRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const footRef = useRef<HTMLDivElement>(null);
  const perfRef = useRef<HTMLDivElement>(null);
  const schemaRef = useRef<HTMLSpanElement>(null);
  const sslRef = useRef<HTMLSpanElement>(null);
  const scrimRef = useRef<HTMLSpanElement>(null);
  const wrapRefs = useRef<(HTMLDivElement | null)[]>([]);
  const shotRefs = useRef<(HTMLImageElement | null)[]>([]);
  const reduced = useRef(false);
  const touched = useRef(false);
  /** Scrub progress through the morph, read by the idle tour. */
  const morphed = useRef(0);

  const [collapsed, setCollapsed] = useState(true);
  const [focus, setFocus] = useState(LIVE);
  const [mounted, setMounted] = useState(false);
  const [shot, setShot] = useState(0);
  /** "on" = scroll drives the reel. "off" = reduced motion, timed instead. */
  const [mode, setMode] = useState<"off" | "on">("off");

  const slides = Math.max(showcase.length, 1);
  // One viewport for the sticky panel itself, plus the scrub distance.
  const trackVh = 1 + MORPH_VH + slides * SLIDE_VH + EXIT_VH;
  const scrubVh = MORPH_VH + slides * SLIDE_VH + EXIT_VH;
  const morphEnd = MORPH_VH / scrubVh;
  const exitStart = (MORPH_VH + slides * SLIDE_VH) / scrubVh;

  /* Load choreography: the page arrives whole, then comes apart ----------- */
  useEffect(() => {
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setMounted(true);

    const sync = () => {
      reduced.current = motionMq.matches;
      setMode(motionMq.matches ? "off" : "on");
      if (motionMq.matches) setCollapsed(false);
    };
    sync();
    motionMq.addEventListener("change", sync);

    const t = motionMq.matches
      ? undefined
      : setTimeout(() => setCollapsed(false), 820);

    return () => {
      if (t) clearTimeout(t);
      motionMq.removeEventListener("change", sync);
    };
  }, []);

  /* Idle tour of the stack — stops the moment the visitor takes over ------ */
  useEffect(() => {
    if (reduced.current) return;
    const zone = zoneRef.current;
    if (!zone) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver(
      (entries) => {
        // Entries batch oldest-first — only the last reflects current visibility.
        const entry = entries[entries.length - 1];
        clearInterval(timer);
        if (entry.isIntersecting && !touched.current) {
          timer = setInterval(() => {
            if (touched.current) {
              clearInterval(timer);
              return;
            }
            // A pinned section never leaves the viewport, so the observer
            // can't pause this — skip once the rail has morphed away.
            if (morphed.current > 0.05) return;
            setFocus((f) => (f + 1) % LAYERS.length);
          }, 3200);
        }
      },
      { threshold: 0.25 },
    );
    io.observe(zone);
    return () => {
      clearInterval(timer);
      io.disconnect();
    };
  }, []);

  /* Reduced motion keeps a gentle timed reel; otherwise scroll drives it -- */
  useEffect(() => {
    if (mode !== "off" || reduced.current || showcase.length < 2) return;
    const zone = zoneRef.current;
    if (!zone) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[entries.length - 1];
        clearInterval(timer);
        if (entry.isIntersecting) {
          timer = setInterval(
            () => setShot((s) => (s + 1) % showcase.length),
            4600,
          );
        }
      },
      { threshold: 0.25 },
    );
    io.observe(zone);
    return () => {
      clearInterval(timer);
      io.disconnect();
    };
  }, [mode, showcase.length]);

  /* ---------------------------------------------------------------------- *
   *  The scroll scrub.
   *
   *  Mode A pins the hero: the copy fades, the panel flies out of its column
   *  to the centre of the screen, squares up to the viewer and grows while
   *  the blueprint sheets collapse into the finished page. Mode B skips that
   *  and simply sticks the panel where it already sits.
   *
   *  From there both modes share the same reel: one short slice of scroll per
   *  project, each scrolling that screenshot from its hero to the section
   *  beneath before crossfading to the next. After the last one the panel
   *  lifts, scales back and fades out, handing over to the next section.
   * ---------------------------------------------------------------------- */
  useEffect(() => {
    if (mode === "off") return;
    const scroller = holdRef.current;
    const chamber = chamberRef.current;
    const card = cardRef.current;
    const rig = rigRef.current;
    const stick = stickRef.current;
    if (!scroller || !chamber || !card || !rig || !stick) return;

    const copy = copyRef.current;
    const tabs = tabsRef.current;
    const scrim = scrimRef.current;
    const perf = perfRef.current;
    const schema = schemaRef.current;
    const ssl = sslRef.current;
    // The "Fig.01" label row and the rotating caption step aside at centre so
    // the work itself can fill the screen. The tabs stay.
    const asides = [...chamber.parentElement!.querySelectorAll("[data-aside]")];
    const wraps = wrapRefs.current;
    const shots = shotRefs.current;

    // All geometry is kept relative to the sticky wrapper, which is exactly
    // one viewport tall and pinned at top: 0. That makes every number below
    // independent of scroll position, so measuring is safe at any moment.
    let originX = 0, originY = 0; // chamber centre — the transform origin
    let panelX = 0, panelY = 0;   // centre of the panel's whole visual extent
    let targetX = 0, targetY = 0; // where that centre should land
    let grow = 1;
    /** How far the tab strip climbs to come to rest on the card itself. */
    let tabsShift = 0;
    /** …and how far the vitals panel and schema chip climb to stay clear. */
    let perfLift = 0, schemaLift = 0, sslLift = 0;
    let raf = 0;
    let lastIndex = -1;
    let lastP = 0;
    /** Damped progress, chasing the raw scroll position. */
    let eased: number | null = null;
    /** Project the reel is currently resting on — the scroll run starts here. */
    let base = 0;
    /** True once scroll owns the reel and the timed transitions are off. */
    let scrubbing = false;
    /** Viewport the current geometry was solved for. */
    let mw = 0, mh = 0;

    /* The panel is not just the browser card — the SSL and schema chips sit
       outside its edges and the vitals panel hangs off its corner, so the
       flight path is solved against the union of those boxes rather than the
       card alone, or the overhang would run off the screen.

       The tab strip is deliberately NOT in that union. Below the card it would
       scale up with it and swallow a fifth of the height budget — and height
       is exactly what limits the width. At centre it climbs onto the card
       instead, over a scrim, where it costs nothing and still reads as part of
       the panel. */
    const measure = () => {
      const prevT = chamber.style.transform;
      const prevO = chamber.style.opacity;
      const prevF = rig.style.getPropertyValue("--flat");
      const prevOp = rig.style.getPropertyValue("--open");
      chamber.style.transform = "";
      chamber.style.opacity = "1";
      // Measure the panel as it will look at centre — flat and collapsed —
      // because that is the footprint the scale has to fit. Measuring it
      // angled and exploded would reserve room for a shape it never takes,
      // and the card would end up needlessly small.
      //
      // The sheets ease between depths over about a second, and a rect read
      // mid-transition is the shape they are passing through, not the one they
      // are heading for. is-scrubbing kills that transition for the duration
      // of the read, so the numbers below are the real collapsed footprint.
      rig.classList.add("is-scrubbing");
      rig.style.setProperty("--flat", "0");
      rig.style.setProperty("--open", "0");

      const sr = stick.getBoundingClientRect();
      const cr = chamber.getBoundingClientRect();
      // Base the footprint on the card, not the chamber: the label row and
      // caption retire at centre, so reserving their height would keep the
      // card needlessly small on a laptop.
      const prevTabs = tabs ? tabs.style.transform : "";
      if (tabs) tabs.style.transform = "";

      const kr0 = card.getBoundingClientRect();

      // Park the strip just above the card's status bar — on the work, not
      // under it. Measured against the card so it lands correctly whatever
      // the caption and label row are doing above.
      const foot = footRef.current?.getBoundingClientRect();
      const barTop = (foot ? foot.top : kr0.bottom) - 14;
      let stripTop = barTop;
      if (tabs) {
        const tr = tabs.getBoundingClientRect();
        tabsShift = Math.max(0, tr.bottom - barTop);
        stripTop = barTop - tr.height;
        tabs.style.transform = prevTabs;
      }

      // Flattened, the vitals panel and the schema chip both collapse into the
      // same bottom-right corner the tab strip is about to occupy — three
      // things stacked on one another, which is what read as a jumble. Solve
      // each one a corner of its own: the panel clears the strip, the chip
      // climbs to the top edge opposite the SSL one, and the SSL chip drops
      // back to the card's shoulder from the height it flies at in the rail.
      for (const el of [perf, schema, ssl]) {
        if (el) el.style.setProperty("--ui-lift", "0px");
      }
      if (perf) {
        perfLift = Math.max(0, perf.getBoundingClientRect().bottom - (stripTop - 18));
      }
      if (schema) {
        schemaLift = Math.max(0, schema.getBoundingClientRect().top - (kr0.top + 96));
      }
      if (ssl) {
        // Negative: it travels down, not up.
        sslLift = ssl.getBoundingClientRect().top - (kr0.top - 14);
      }

      // Only now measure the footprint, with every instrument sitting where it
      // will actually sit at centre. Measured at their resting spots instead,
      // the SSL chip flying high above the card would reserve height the panel
      // never uses there — and height is what caps the width.
      if (perf) perf.style.setProperty("--ui-lift", `${perfLift}px`);
      if (schema) schema.style.setProperty("--ui-lift", `${schemaLift}px`);
      if (ssl) ssl.style.setProperty("--ui-lift", `${sslLift}px`);

      let left = kr0.left, right = kr0.right, top = kr0.top, bottom = kr0.bottom;
      // Scoped to the rig, not the chamber: the "Explode view" chip in the
      // rail below is also a .chip, and letting it into the union pinned the
      // footprint ~70px lower than the panel actually reaches.
      rig.querySelectorAll(".layer, .chip").forEach((el) => {
        const q = el.getBoundingClientRect();
        if (!q.width || !q.height) return;
        left = Math.min(left, q.left);
        right = Math.max(right, q.right);
        top = Math.min(top, q.top);
        bottom = Math.max(bottom, q.bottom);
      });

      chamber.style.transform = prevT;
      chamber.style.opacity = prevO;
      if (prevF) rig.style.setProperty("--flat", prevF);
      else rig.style.removeProperty("--flat");
      if (prevOp) rig.style.setProperty("--open", prevOp);
      else rig.style.removeProperty("--open");
      rig.classList.remove("is-scrubbing");

      const w = right - left;
      const h = bottom - top;
      if (!w || !h) return;

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      mw = vw;
      mh = vh;

      originX = cr.left + cr.width / 2 - sr.left;
      originY = cr.top + cr.height / 2 - sr.top;
      panelX = (left + right) / 2 - sr.left;
      panelY = (top + bottom) / 2 - sr.top;

      // The site header is fixed at the top of the screen, so the usable band
      // starts under it. Centring on the raw viewport is what was sliding the
      // browser chrome behind the nav — the panel was not too tall, it was
      // aimed too high.
      const head = document.querySelector("header");
      const bandTop = (head ? head.getBoundingClientRect().height : 0) + PAD;
      const bandBottom = vh - PAD;

      // The wrapper pins at top: 0, so viewport coordinates and wrapper-
      // relative ones coincide vertically once it is stuck.
      targetX = vw / 2 - sr.left;
      targetY = (bandTop + bandBottom) / 2;
      // The largest scale at which the whole panel still fits that band. It
      // can land below 1: the panel is taller than a short laptop viewport at
      // its resting size, so there it settles to centre slightly smaller
      // rather than hanging off both edges. Bounded so it never shrinks to
      // the point of being unreadable — and never blows the screenshots up
      // far enough past their native width for the softness to show.
      const shotW = shots[0]?.naturalWidth || 880;
      grow = Math.max(
        0.72,
        Math.min(
          (shotW * MAX_UPSCALE) / kr0.width,
          // Two width limits, and the tighter one wins. The whole panel may
          // reach the very edges of the screen, but the card — the part that
          // is actually the work — keeps a 2% margin. Sizing on the union
          // alone made a phone shrink the card at centre to make room for
          // decorative chips, which is backwards.
          Math.min((vw * 0.99) / w, (vw * 0.96) / kr0.width),
          (bandBottom - bandTop) / h,
        ),
      );
    };

    const paint = () => {
      raf = 0;
      const vh = window.innerHeight;
      // A phone hiding its URL bar mid-scroll changes the viewport without
      // always firing resize. Geometry solved for the old one would scale the
      // panel wrongly for the rest of the reel, so re-solve on sight.
      if (window.innerWidth !== mw || vh !== mh) measure();
      const rect = scroller.getBoundingClientRect();

      // The panel sticks for exactly holderHeight - one viewport, and the
      // wrapper is pinned at top: 0, so progress is simply how far the
      // holder's top has travelled past the top of the screen.
      const span = rect.height - vh;
      if (span <= 0) return;
      const raw = clamp01(-rect.top / span);
      // Damped follow rather than tracking the wheel one-to-one. Scroll input
      // is steppy — a trackpad flick or a wheel notch arrives as a jump — and
      // easing toward it is what separates a cinematic section from one that
      // snaps around. The loop keeps running until it has caught up.
      if (eased === null) eased = raw;
      const gap = raw - eased;
      eased += Math.abs(gap) < 0.0004 ? gap : gap * 0.12;
      const p = eased;
      const settled = Math.abs(raw - eased) < 0.0004;

      lastP = p;
      // Once the reader is driving, retire the idle tour for good. Beyond
      // being redundant, its focus changes resize the card through the
      // perspective, which would shift the panel off centre mid-scrub.
      if (raw > 0.01) touched.current = true;

      /* Phase 1 — the panel leaves its column and takes the screen */
      const m = smooth(clamp01(p / morphEnd));
      morphed.current = m;

      /* Phase 3 — the panel simply holds on the last project and then scrolls
         away with the page. No fade, no scale-down: the sticky wrapper
         releasing is the transition. */
      const start = exitStart;

      // Solve the translation against the CURRENT scale: the transform maps a
      // point P to origin + T + s*(P - origin), so a T solved at scale 1 would
      // miss centre once the panel grows.
      // Start at 1 normally. Where the panel is taller than the viewport even
      // at rest — short laptops — start already fitted, so the sheets are not
      // clipped before the reader has scrolled.
      const base = Math.min(1, grow);
      const s = base + (grow - base) * m;
      const wantX = panelX + (targetX - panelX) * m;
      // Vertically the panel is centred from the very start. The sticky
      // wrapper centres the chamber, but the sheets fan above it and the
      // vitals panel hangs below, so without this the fan is clipped by the
      // top of the screen before the reader has scrolled at all. At rest that
      // is the raw viewport centre, exactly as the hero has always sat; the
      // shift down into the header-free band is spent over the morph.
      const wantY = vh / 2 + (targetY - vh / 2) * m;
      const tx = wantX - originX - s * (panelX - originX);
      const ty = wantY - originY - s * (panelY - originY);
      chamber.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${s})`;

      // Square up and flatten as it takes centre: the angle and the depth
      // both bow out, leaving one clean plane facing the reader. The chips,
      // vitals panel and tabs travel with it; only the blueprint sheets
      // (.layer--ghost) fade, since they are what the flattening removes.
      rig.style.setProperty("--flat", String(1 - m));
      rig.style.setProperty("--open", String(1 - m));
      rig.style.setProperty("--fade", String(1 - m));
      for (const el of asides) {
        (el as HTMLElement).style.opacity = String(1 - clamp01(m * 1.6));
      }
      if (tabs) {
        tabs.style.transform = `translateY(${-tabsShift * m}px)`;
        // Flush to the card edge is right in the rail, where the strip is the
        // width of the card. Blown up over the work it wants a margin.
        const inset = `${16 * m}px`;
        tabs.style.paddingLeft = inset;
        tabs.style.paddingRight = inset;
      }
      // The strip lands on the screenshot, so the screenshot dims under it.
      if (scrim) scrim.style.opacity = String(m);
      // Run the instruments apart faster than the panel flattens: on the
      // shared curve the vitals panel is still crossing the tab strip when
      // the two are nearly on top of each other.
      const uiM = smooth(clamp01(m * 1.5));
      if (perf) perf.style.setProperty("--ui-lift", `${perfLift * uiM}px`);
      if (schema) schema.style.setProperty("--ui-lift", `${schemaLift * uiM}px`);
      if (ssl) ssl.style.setProperty("--ui-lift", `${sslLift * uiM}px`);

      if (copy) {
        const gone = m > 0.5;
        copy.style.opacity = String(1 - clamp01(m * 1.35));
        copy.style.transform = `translate3d(${-56 * m}px, 0, 0)`;
        // Retired copy must leave the tab order and stop swallowing clicks.
        copy.style.pointerEvents = gone ? "none" : "";
        copy.toggleAttribute("inert", gone);
      }

      /* Phase 2 — one short slice of scroll per project.

         Below a hair of scroll the resting tour still owns the reel, and
         writing over it here would cancel its crossfade every time the page
         twitched. */
      if (p <= 0.002) {
        if (!settled) raf = requestAnimationFrame(paint);
        return;
      }
      // Timed transitions have to go the moment scroll drives the values,
      // or every frame would ease toward the last one and lag behind.
      if (!scrubbing) {
        scrubbing = true;
        for (const w of wraps) if (w) w.style.transition = "";
        for (const img of shots) if (img) img.style.transition = "";
      }

      const q = clamp01((p - morphEnd) / (start - morphEnd));
      const exact = q * slides;
      const slot = Math.min(slides - 1, Math.floor(exact));
      const within = clamp01(exact - slot);
      // Crossfade the last stretch of each slice into the next one, so the
      // hand-over is tied to the scroll rather than a fixed timer.
      const over = within > 1 - CROSSFADE ? (within - (1 - CROSSFADE)) / CROSSFADE : 0;

      for (let i = 0; i < wraps.length; i++) {
        const wrap = wraps[i];
        const img = shots[i];
        // Position in this run, counting from whichever project the resting
        // tour had reached — so the scroll picks up where it left off rather
        // than snapping back to the first one.
        const rel = (i - base + slides) % slides;
        if (wrap) {
          // The last slide has nothing to hand over to, so it simply holds.
          const last = slot === slides - 1;
          let op = 0;
          if (rel === slot) op = last ? 1 : 1 - over;
          else if (rel === slot + 1) op = over;
          wrap.style.opacity = String(op);
        }
        if (img) {
          // Past slides rest at their end and future ones at their start, so
          // a fast flick never reveals a half-scrolled screenshot.
          const u = rel === slot ? within : rel < slot ? 1 : 0;
          img.style.transform = `translate3d(0, ${-50 * u}%, 0)`;
        }
      }

      const index = (base + slot) % slides;
      if (index !== lastIndex) {
        lastIndex = index;
        setShot(index);
      }

      // Keep animating until the damped value has caught the real one.
      if (!settled) raf = requestAnimationFrame(paint);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const onResize = () => {
      measure();
      if (!raf) raf = requestAnimationFrame(paint);
    };

    /* ------------------------------------------------------------------ *
     *  The resting tour.
     *
     *  Sitting in the hero, nothing has been scrolled, so nothing drives the
     *  reel — it would hold on one project indefinitely. A timer cycles it
     *  instead, with the same move each scroll slice makes: crossfade in,
     *  then scroll the screenshot from its hero to the section beneath. The
     *  project it reaches is where the scroll run then starts.
     * ------------------------------------------------------------------ */
    const showRest = () => {
      for (let i = 0; i < wraps.length; i++) {
        const wrap = wraps[i];
        const img = shots[i];
        const on = i === base;
        if (wrap) {
          wrap.style.transition = "opacity 700ms ease";
          wrap.style.opacity = on ? "1" : "0";
        }
        if (img) {
          img.style.transition = on ? "transform 4.4s linear 0.25s" : "none";
          img.style.transform = on
            ? "translate3d(0, -50%, 0)"
            : "translate3d(0, 0, 0)";
        }
      }
      setShot(base);
    };

    const tour = setInterval(() => {
      // Once the panel has begun taking the screen, scroll owns the reel.
      if (morphed.current > 0.02 || slides < 2) return;
      base = (base + 1) % slides;
      scrubbing = false;
      lastIndex = -1;
      showRest();
    }, 4600);

    measure();
    showRest();
    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    // Fonts and screenshots land after mount and shift the layout, so keep
    // re-measuring — but only while the scrub is still parked at the start.
    // Re-measuring mid-scrub would jump the progress under the reader.
    const ro = new ResizeObserver(() => {
      if (lastP <= 0.001) onResize();
    });
    ro.observe(card);
    ro.observe(stick);
    // Deferred passes. The stack starts collapsed, so at mount every sheet
    // sits exactly on the card and the panel measures far smaller than it
    // ends up. It explodes at 820ms over a 1.05s transition, so the last of
    // these lands after the sheets have reached their real positions.
    const settles = [400, 1100, 2200].map((ms) =>
      setTimeout(() => {
        if (lastP <= 0.001) onResize();
      }, ms),
    );

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(tour);
      for (const t of settles) clearTimeout(t);
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      morphed.current = 0;
      chamber.style.transform = "";
      chamber.style.opacity = "";
      if (copy) {
        copy.style.opacity = "";
        copy.style.transform = "";
        copy.style.pointerEvents = "";
        copy.removeAttribute("inert");
      }
      for (const el of asides) (el as HTMLElement).style.opacity = "";
      if (tabs) {
        tabs.style.transform = "";
        tabs.style.paddingLeft = "";
        tabs.style.paddingRight = "";
      }
      if (scrim) scrim.style.opacity = "";
      for (const w of wraps) if (w) {
        w.style.opacity = "";
        w.style.transition = "";
      }
      for (const img of shots) if (img) {
        img.style.transform = "";
        img.style.transition = "";
      }
      for (const el of [perf, schema, ssl]) {
        if (el) el.style.removeProperty("--ui-lift");
      }
    };
  }, [mode, morphEnd, exitStart, slides]);

  /* Pointer tilt — rAF-lerped, transform-only, fine pointers only --------- */
  useEffect(() => {
    if (reduced.current) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const zone = zoneRef.current;
    const rig = rigRef.current;
    if (!zone || !rig) return;

    let raf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    let running = false; // exactly one rAF chain, ever

    const loop = () => {
      cx += (tx - cx) * 0.07;
      cy += (ty - cy) * 0.07;
      rig.style.setProperty("--ry", `${cx.toFixed(3)}deg`);
      rig.style.setProperty("--rx", `${cy.toFixed(3)}deg`);
      if (Math.abs(tx - cx) > 0.01 || Math.abs(ty - cy) > 0.01) {
        raf = requestAnimationFrame(loop);
      } else {
        running = false;
      }
    };
    const kick = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    };
    const onMove = (e: PointerEvent) => {
      const r = zone.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 9;
      ty = -((e.clientY - r.top) / r.height - 0.5) * 6;
      kick();
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
      kick();
    };

    zone.addEventListener("pointermove", onMove);
    zone.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      zone.removeEventListener("pointermove", onMove);
      zone.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const take = useCallback((i: number) => {
    touched.current = true;
    setFocus(i);
  }, []);

  const current = LAYERS[focus];
  // Safe even if every showcase slug lookup fails upstream.
  const reel: Showcase = showcase[shot] ??
    showcase[0] ?? {
      slug: "",
      name: site.name,
      industry: "Portfolio",
      image: "",
      url: "mustafadev.org/work/",
    };

  /* Depth transform + emphasis for one sheet ------------------------------ */
  const layerStyle = (l: Layer, i: number): CSSProperties => {
    const isFocus = focus === i;
    const lift = collapsed ? "0px" : isFocus ? (i === LIVE ? "34px" : "66px") : "0px";
    return {
      "--sx": l.sx,
      "--sy": l.sy,
      "--sz": l.sz,
      "--sd": `${collapsed ? 0 : l.sd}ms`,
      "--lift": lift,
      "--op": collapsed && i !== LIVE ? 0 : isFocus ? 1 : l.rest,
    } as CSSProperties;
  };

  return (
    <div
      ref={trackRef}
      className="hero-track"
      style={{ "--track": trackVh } as CSSProperties}
    >
    <section
      ref={zoneRef}
      aria-label="Introduction"
      className="relative pt-[72px]"
    >
      {/* --------- ground: rides with the panel, adds no layout height ------- */}
      <div className="bg-stick" aria-hidden>
        <div>
          <div className="grid-bg absolute inset-0" />
          <SignalField />
          <div className="floor">
            <div className="floor-plane">
              <div className="floor-grid" />
            </div>
          </div>
          <div className="horizon absolute top-[42%]" />
          <div
            className="absolute right-[-14%] top-[38%] h-[64vmin] w-[64vmin] -translate-y-1/2 rounded-full opacity-[0.09]"
            style={{
              background:
                "radial-gradient(circle, var(--color-accent) 0%, transparent 62%)",
            }}
          />
        </div>
      </div>

      <div className="container-x relative z-10 grid w-full gap-14 pb-24 lg:grid-cols-[1fr_1.02fr] lg:gap-12 lg:pb-0">
        {/* ------------------------------ copy ------------------------------ */}
        {/* min-w-0: grid tracks size to min-content by default, and without
            this the column is dragged wider than a phone screen. */}
        <div className="copy-stick min-w-0">
        <div ref={copyRef} className="w-full will-change-[transform,opacity]">
          <p className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="pulse-dot absolute inset-0 rounded-full bg-accent" />
              <span className="absolute inset-0 rounded-full bg-accent/40 blur-[3px]" />
            </span>
            <span className="label-mono label-mono--accent">{site.role}</span>
          </p>

          <h1 className="kin display mt-5 text-[clamp(2.6rem,6.6vw,5.2rem)]">
            <W i={0}>Websites</W> <W i={1}>that</W> <W i={2}>look</W>{" "}
            <W i={3}>
              <em>incredible</em>.
            </W>
            <br />
            <W i={4}>Built</W> <W i={5}>to</W> <W i={6}>be</W>{" "}
            <W i={7}>
              <em>found</em>.
            </W>
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
            Every website I build is five layers deep — design, code, structure,
            speed and everything that keeps it live. Most agencies ship you the
            top one.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/contact/" className="btn btn-primary">
              Build My Website
              <ArrowIcon />
            </Link>
            <Link href="/work/" className="btn btn-ghost">
              Explore My Work
            </Link>
          </div>

          {/* Facts, not claims */}
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-px overflow-hidden border-t border-line pt-5">
            <Stat value={`${site.yearsExperience}+`} label="Years building" />
            <Stat
              value={`${site.projectsShipped}+`}
              label="Projects shipped worldwide"
            />
            <Stat value={`${site.location.city}, PK`} label="Based in" small />
          </dl>
        </div>
        </div>

        {/* ----------------------------- the rig -----------------------------
            reel-hold is several viewports tall; the sticky wrapper inside it
            is exactly one, holding the panel on the middle line of the screen
            while the holder scrolls past. */}
        <div ref={holdRef} className="reel-hold min-w-0">
        <div ref={stickRef} className="reel-stick">
        {/* Left-aligned in its column so the fan has room to open right */}
        <div
          ref={chamberRef}
          className="chamber relative mx-auto w-full max-w-[520px] will-change-[transform,opacity] lg:ml-0 lg:mr-auto"
        >
          {/* Headroom for the sheets that fan up and out of the stack */}
          <div
            ref={rigRef}
            className={`rig mt-14 sm:mt-16 lg:mt-10 ${collapsed ? "is-collapsed" : ""}`}
          >
            <div className="light-pool" aria-hidden />

            {/* -- 01 Design — the blueprint sheet -- */}
            <div className="layer layer--ghost" style={layerStyle(LAYERS[0], 0)} aria-hidden>
              <Sheet layer={LAYERS[0]} focused={focus === 0} accent="amber">
                <DesignPlate />
              </Sheet>
            </div>

            {/* -- 02 Develop — the code sheet -- */}
            <div className="layer layer--ghost" style={layerStyle(LAYERS[1], 1)} aria-hidden>
              <Sheet layer={LAYERS[1]} focused={focus === 1}>
                <DevelopPlate />
              </Sheet>
            </div>

            {/* -- 03 SEO — the semantic sheet -- */}
            <div className="layer layer--ghost" style={layerStyle(LAYERS[2], 2)} aria-hidden>
              <Sheet layer={LAYERS[2]} focused={focus === 2}>
                <SeoPlate />
              </Sheet>
            </div>

            {/* -- 05 Live — the finished page, in flow, sets the rig size -- */}
            <div
              className="layer !relative"
              style={layerStyle(LAYERS[LIVE], LIVE)}
              aria-hidden
            >
              <div
                ref={cardRef}
                className={`overflow-hidden rounded-2xl border bg-surface shadow-[0_50px_110px_-40px_rgba(0,0,0,0.95)] transition-colors duration-300 ${
                  focus === LIVE ? "border-accent/45" : "border-line2"
                }`}
              >
                <BrowserChrome url={reel.url} n={current.n} />
                {/* 7:5. Taller than a real browser viewport on purpose: at
                    rest the card is only ~510px wide and a wide window left it
                    looking squat. Every pixel of height here is a pixel of
                    width lost at centre — the panel is height-bound there. */}
                <div className="relative aspect-[7/5] overflow-hidden bg-bg2">
                  {showcase.map((p, i) => (
                    <div
                      key={p.slug}
                      ref={(el) => {
                        wrapRefs.current[i] = el;
                      }}
                      className={`absolute inset-0 overflow-hidden ${
                        // Scroll drives the crossfade; a CSS transition would
                        // only lag behind it.
                        mode === "off" ? "transition-opacity duration-700" : ""
                      }`}
                      style={
                        mode === "off" || !mounted
                          ? { opacity: i === shot ? 1 : 0 }
                          : undefined
                      }
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        ref={(el) => {
                          shotRefs.current[i] = el;
                        }}
                        src={p.image}
                        alt={`${p.name} website — built by ${site.person}`}
                        width={880}
                        height={1320}
                        loading={i === 0 ? "eager" : "lazy"}
                        decoding="async"
                        className="site-shot absolute left-0 top-0 h-auto w-full"
                        style={
                          // Scroll modes write the transform directly. Only
                          // reduced motion keeps the timed version, and before
                          // mount every slide renders unscrolled.
                          mode !== "off" || !mounted
                            ? undefined
                            : {
                                transform:
                                  i === shot
                                    ? "translateY(-50%)"
                                    : "translateY(0)",
                                transition:
                                  i === shot
                                    ? "transform 4.4s linear 0.25s"
                                    : "transform 0s linear 0.8s",
                              }
                        }
                      />
                    </div>
                  ))}
                  <span className="scan" aria-hidden />
                  {/* Bed for the layer tabs once they climb onto the card */}
                  <span
                    ref={scrimRef}
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-[46%] opacity-0"
                    style={{
                      background:
                        "linear-gradient(to top, var(--color-bg) 38%, color-mix(in srgb, var(--color-bg) 84%, transparent) 70%, transparent 100%)",
                    }}
                  />
                </div>
                <div
                  ref={footRef}
                  className="flex items-center justify-between gap-3 border-t border-line px-4 py-2.5"
                >
                  <span className="flex min-w-0 items-center gap-2 font-mono text-[11px] tracking-wide text-muted">
                    <span className="pulse-dot h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span className="truncate">
                      {reel.name}
                      <span className="hidden text-faint sm:inline">
                        {" "}
                        — {reel.industry}
                      </span>
                    </span>
                  </span>
                  <span className="label-mono hidden shrink-0 sm:block">
                    {current.label}
                  </span>
                </div>
              </div>
            </div>

            {/* -- 04 Performance — instrument panel floating in front -- */}
            <div
              className="layer pointer-events-none"
              style={layerStyle(LAYERS[3], 3)}
              aria-hidden
            >
              <PerfPanel ref={perfRef} mounted={mounted} focused={focus === 3} />
            </div>

            {/* Instrument chips, held out at depth */}
            <div
              className="layer pointer-events-none"
              style={
                {
                  "--sx": "0%",
                  "--sy": "0%",
                  "--sz": "230px",
                  "--op": collapsed ? 0 : 1,
                  transitionDelay: "360ms",
                } as CSSProperties
              }
              aria-hidden
            >
              <span
                ref={sslRef}
                className="ui-lift absolute -left-4 -top-10 sm:-left-10"
              >
                <span className="hover-z chip border-line2 bg-bg/85">
                  <Dot /> SSL/TLS active
                </span>
              </span>
              {/* Collapsed flat at centre, this chip, the vitals panel and the
                  tab strip all land in the same bottom-right corner and read as
                  one jumble. ui-lift walks it up to the opposite corner as the
                  panel squares up. */}
              <span
                ref={schemaRef}
                className="ui-lift absolute -right-3 bottom-32 sm:-right-8"
              >
                <span className="hover-z chip border-line2 bg-bg/85">
                  <Dot /> Schema valid
                </span>
              </span>
            </div>
          </div>

          {/* --------------- rail — retires once the panel takes over -------- */}
          <div ref={panelUiRef}>
          <div data-aside className="mt-8 flex items-center justify-between gap-3">
            <span className="label-mono label-mono--faint hidden sm:block" aria-hidden>
              Anatomy of a build
            </span>
            <button
              type="button"
              aria-pressed={!collapsed}
              onClick={() => {
                touched.current = true;
                setCollapsed((c) => !c);
              }}
              className="chip group min-h-[36px] gap-2 !border-line2 transition-colors hover:!border-accent hover:!text-accent2"
            >
              <ExplodeIcon collapsed={collapsed} />
              {collapsed ? "Explode view" : "Assemble"}
            </button>
          </div>

          {/* z-20: at centre this strip sits over the card, not beside it */}
          <div ref={tabsRef} className="relative z-20 mt-4 flex items-stretch gap-1 sm:gap-2">
            {LAYERS.map((l, i) => (
              <button
                key={l.key}
                type="button"
                aria-pressed={focus === i}
                onClick={() => take(i)}
                onPointerEnter={() => take(i)}
                onFocus={() => take(i)}
                className={`group flex min-h-[44px] min-w-0 flex-1 flex-col items-start gap-1 border-t-2 pt-2.5 text-left transition-colors ${
                  focus === i ? "border-accent" : "border-line hover:border-line2"
                }`}
              >
                <span
                  className={`font-mono text-[10px] tracking-[0.14em] transition-colors ${
                    focus === i ? "text-accent2" : "text-faint group-hover:text-muted"
                  }`}
                >
                  {l.n}
                </span>
                <span
                  className={`text-[11px] font-medium leading-tight transition-colors sm:text-sm ${
                    focus === i ? "text-ink" : "text-muted"
                  }`}
                >
                  {l.label}
                </span>
              </button>
            ))}
          </div>

          {/* Fixed height, not min-height: the caption swaps as the tour
              cycles, and a reflowing panel would shift the scroll scrub. */}
          <p data-aside className="mt-4 h-[5rem] max-w-[46ch] text-sm leading-relaxed text-muted sm:h-[3.25rem]">
            {current.caption}
          </p>
          </div>
        </div>
        </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        aria-hidden
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-3 lg:flex"
      >
        <span className="label-mono label-mono--faint">Scroll</span>
        <span className="block h-8 w-px overflow-hidden bg-line">
          <span className="block h-3 w-px animate-pulse bg-accent" />
        </span>
      </div>
    </section>
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/*  Shell pieces                                                             */
/* ------------------------------------------------------------------------ */

/** One kinetic headline word. */
function W({ i, children }: { i: number; children: ReactNode }) {
  return (
    <span className="kin-w" style={{ animationDelay: `${120 + i * 55}ms` }}>
      {children}
    </span>
  );
}

function Stat({
  value,
  label,
  small,
}: {
  value: string;
  label: string;
  small?: boolean;
}) {
  return (
    <div className="border-l border-line pl-3 first:border-l-0 first:pl-0">
      <dt className="sr-only">{label}</dt>
      <dd
        className={`display text-ink ${small ? "text-lg sm:text-xl" : "text-2xl sm:text-[1.75rem]"}`}
      >
        {value}
      </dd>
      <span className="label-mono label-mono--faint mt-1 block !text-[10px]">
        {label}
      </span>
    </div>
  );
}

/** A blueprint sheet: hairline card + registration marks + edge label. */
function Sheet({
  layer,
  focused,
  accent,
  children,
}: {
  layer: Layer;
  focused: boolean;
  accent?: "amber";
  children: ReactNode;
}) {
  return (
    <div className={`ghost relative h-full w-full ${focused ? "is-focus" : ""}`}>
      <span
        className={`absolute -top-3 left-4 rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] transition-colors ${
          focused
            ? "border-accent/60 bg-bg text-accent2"
            : "border-line2 bg-bg text-faint"
        }`}
      >
        {layer.n} · {layer.label}
      </span>
      <Marks accent={accent} />
      <div className="h-full w-full p-4 sm:p-5">{children}</div>
    </div>
  );
}

function Marks({ accent }: { accent?: "amber" }) {
  const c = accent === "amber" ? "border-amber" : "border-accent";
  return (
    <>
      <span className={`mark ${c} -left-px -top-px border-l border-t`} />
      <span className={`mark ${c} -right-px -top-px border-r border-t`} />
      <span className={`mark ${c} -bottom-px -left-px border-b border-l`} />
      <span className={`mark ${c} -bottom-px -right-px border-b border-r`} />
    </>
  );
}

function BrowserChrome({ url, n }: { url: string; n: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-line px-4 py-3">
      <span className="flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber" />
        <span className="h-2.5 w-2.5 rounded-full bg-accent" />
      </span>
      <span className="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-bg px-3.5 py-1.5">
        <LockIcon />
        <span className="truncate font-mono text-[11px] tracking-wide text-muted">
          {url}
        </span>
      </span>
      <span className="label-mono hidden sm:block">{n}/05</span>
    </div>
  );
}

function Dot() {
  return <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent" />;
}

/* ------------------------------------------------------------------------ */
/*  The blueprint plates — pure CSS/SVG, no imagery                          */
/* ------------------------------------------------------------------------ */

function DesignPlate() {
  return (
    <div className="grid h-full grid-rows-[auto_1fr_auto] gap-3">
      <div className="flex items-center justify-between rounded-lg border border-dashed border-line2 px-3 py-2">
        <span className="h-2 w-10 rounded bg-amber/70" />
        <span className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-2 w-8 rounded bg-line2" />
          ))}
        </span>
      </div>
      <div className="grid grid-cols-[1.3fr_1fr] gap-3">
        <div className="flex flex-col justify-center gap-2.5 rounded-lg border border-dashed border-line2 p-4">
          <span className="h-3.5 w-4/5 rounded bg-line2" />
          <span className="h-3.5 w-3/5 rounded bg-line2" />
          <span className="mt-2 h-2 w-full rounded bg-line" />
          <span className="h-2 w-5/6 rounded bg-line" />
          <span className="mt-3 h-7 w-24 rounded-full border border-amber/70" />
        </div>
        <div className="relative rounded-lg border border-dashed border-line2 p-3">
          <span className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-amber/60" />
          <span className="absolute -top-px left-3 font-mono text-[9px] tracking-widest text-amber/80">
            1440
          </span>
          <span className="absolute -right-1 top-1/2 -translate-y-1/2 rotate-90 font-mono text-[9px] tracking-widest text-amber/80">
            64
          </span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-10 rounded-lg border border-dashed border-line2" />
        ))}
      </div>
    </div>
  );
}

const CODE_LINES: [number, string][][] = [
  [[3, "text"], [10, "blue"], [8, "green"]],
  [[6, "muted"], [14, "text"], [6, "amber"]],
  [[10, "green"], [12, "muted"]],
  [[4, "muted"], [8, "blue"], [10, "text"], [5, "green"]],
  [[12, "text"], [7, "amber"]],
  [[8, "blue"], [14, "muted"]],
  [[5, "muted"], [10, "green"], [8, "text"]],
];

function DevelopPlate() {
  const color = (c: string) =>
    c === "green"
      ? "bg-accent/70"
      : c === "blue"
        ? "bg-sky-400/60"
        : c === "amber"
          ? "bg-amber/60"
          : c === "muted"
            ? "bg-line2"
            : "bg-ink/50";
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border border-line bg-bg/70">
      <div className="flex items-center gap-2 border-b border-line px-3 py-2">
        <span className="font-mono text-[10px] tracking-wide text-muted">page.tsx</span>
        <span className="font-mono text-[10px] tracking-wide text-faint">components/</span>
      </div>
      <div className="flex flex-1 flex-col justify-center gap-2.5 px-3 py-3">
        {CODE_LINES.map((line, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <span className="w-4 shrink-0 text-right font-mono text-[9px] text-faint">
              {i + 1}
            </span>
            <span style={{ width: i % 3 === 1 ? 16 : 0 }} />
            {line.map(([w, c], j) => (
              <span
                key={j}
                className={`h-2 rounded-sm ${color(c)}`}
                style={{ width: `${w * 4}%`, maxWidth: w * 9 }}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="border-t border-line px-3 py-2 font-mono text-[10px] tracking-wide text-accent">
        $ npm run build — compiled in 1.2s
      </div>
    </div>
  );
}

function SeoPlate() {
  return (
    <div className="grid h-full grid-cols-[1.5fr_1fr] gap-3">
      <div className="relative flex flex-col gap-2.5 rounded-lg border border-line bg-surface/70 p-4">
        <span className="chip w-fit !border-accent/50 !normal-case !text-accent2">
          &lt;h1&gt;
        </span>
        <span className="h-3.5 w-4/5 rounded bg-ink/50" />
        <span className="h-2 w-full rounded bg-line2" />
        <span className="h-2 w-5/6 rounded bg-line2" />
        <span className="chip mt-2 w-fit !border-accent/50 !normal-case !text-accent2">
          &lt;section&gt;
        </span>
        <span className="h-2 w-3/4 rounded bg-line2" />
        <span className="h-2 w-2/3 rounded bg-line2" />
      </div>
      <div className="flex flex-col justify-center gap-2 rounded-lg border border-line bg-bg/70 p-3 font-mono text-[10px] leading-relaxed text-muted">
        <span className="text-accent2">/sitemap.xml</span>
        {["/", "/services/", "/work/", "/about/", "/contact/"].map((path) => (
          <span key={path} className="flex items-center gap-1.5">
            <span className="text-accent">✓</span> {path}
          </span>
        ))}
        <span className="mt-1 text-faint">crawled · indexed</span>
      </div>
    </div>
  );
}

/* ---- 04: the instrument panel that floats in front of the finished page ---- */

function PerfPanel({
  mounted,
  focused,
  ref,
}: {
  mounted: boolean;
  focused: boolean;
  ref?: React.Ref<HTMLDivElement>;
}) {
  return (
    <div
      ref={ref}
      className={`ui-lift absolute bottom-[4%] right-[-5%] w-[58%] max-w-[236px] rounded-xl border bg-surface/90 p-3.5 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)] backdrop-blur-sm transition-colors duration-300 sm:right-[-9%] ${
        focused ? "border-accent/55" : "border-line2"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="label-mono label-mono--faint !text-[9px]">Core Web Vitals</span>
        <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent" />
      </div>

      <div className="mt-2.5 flex items-center gap-3">
        <div className="relative flex h-14 w-14 shrink-0 items-center justify-center">
          <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
            <circle cx="50" cy="50" r="43" fill="none" strokeWidth="7" className="stroke-line" />
            <circle
              cx="50"
              cy="50"
              r="43"
              fill="none"
              strokeWidth="7"
              strokeLinecap="round"
              pathLength={100}
              strokeDasharray={100}
              className="stroke-accent"
              style={{
                strokeDashoffset: mounted ? 0 : 100,
                transition: "stroke-dashoffset 1.6s cubic-bezier(0.22,1,0.36,1) 900ms",
              }}
            />
          </svg>
          <span className="display text-lg text-accent2">100</span>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <Meter label="LCP" target="1.1s" pct={88} mounted={mounted} delay={1100} />
          <Meter label="INP" target="42ms" pct={94} mounted={mounted} delay={1250} />
          <Meter label="CLS" target="0.00" pct={100} mounted={mounted} delay={1400} />
        </div>
      </div>
    </div>
  );
}

function Meter({
  label,
  target,
  pct,
  mounted,
  delay,
}: {
  label: string;
  target: string;
  pct: number;
  mounted: boolean;
  delay: number;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-6 shrink-0 font-mono text-[9px] tracking-wide text-faint">
        {label}
      </span>
      <span className="h-1 flex-1 overflow-hidden rounded-full bg-line">
        <span
          className="block h-full rounded-full bg-accent"
          style={{
            transform: `scaleX(${mounted ? pct / 100 : 0})`,
            transformOrigin: "left",
            transition: `transform 1s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
          }}
        />
      </span>
      <span className="shrink-0 font-mono text-[9px] tracking-wide text-muted">
        {target}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------------ */

function ArrowIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
      <path
        d="M2 7.5h10M8.5 3.5l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ExplodeIcon({ collapsed }: { collapsed: boolean }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <rect
        x="1"
        y="1"
        width="6"
        height="6"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.2"
        style={{
          transform: collapsed ? "none" : "translate(-0.5px, -0.5px)",
          transition: "transform .35s cubic-bezier(0.22,1,0.36,1)",
        }}
      />
      <rect
        x="5"
        y="5"
        width="6"
        height="6"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.2"
        style={{
          transform: collapsed ? "translate(-1.5px, -1.5px)" : "translate(0.5px, 0.5px)",
          transition: "transform .35s cubic-bezier(0.22,1,0.36,1)",
        }}
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      width="10"
      height="12"
      viewBox="0 0 10 12"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <rect x="1" y="5" width="8" height="6" rx="1.5" className="fill-accent" />
      <path
        d="M3 5V3.5a2 2 0 1 1 4 0V5"
        stroke="var(--color-accent)"
        strokeWidth="1.4"
        fill="none"
      />
    </svg>
  );
}
