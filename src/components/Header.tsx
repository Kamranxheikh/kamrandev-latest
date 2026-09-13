"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { nav, projects, services, site } from "@/lib/site";
import { articles } from "@/lib/content/articles";
import { Logo, LogoMark } from "@/components/Logo";

/* ---------------------------------------------------------------------------
   Preview plates — one small instrument per nav destination. Every plate is
   built from real content: real service names, real project screenshots, real
   article titles, real contact lines. No placeholder bars, no empty frames —
   each plate fills its column edge to edge.

   The whole column is aria-hidden, so nothing here carries meaning the links
   beside it do not already carry.
--------------------------------------------------------------------------- */

function PlateHome() {
  const features: [string, string][] = [
    ["Design", "Conversion-first"],
    ["SEO", "Schema + AEO"],
    ["Speed", "Core Web Vitals"],
  ];

  return (
    <>
      <div className="menu-pv-in">
        <div className="menu-pv-chrome">
          <div className="menu-pv-chrome-bar">
            <span className="menu-pv-dot" />
            <span className="menu-pv-dot" />
            <span className="menu-pv-dot" />
            <span className="menu-pv-url">{site.domain}</span>
            <span className="menu-pv-tls">TLS</span>
          </div>

          <div className="menu-pv-chrome-body">
            <div className="menu-pv-nav">
              <span className="menu-pv-brand">
                <LogoMark className="menu-pv-brandmark" />
                Kamran<u>dev</u>
              </span>
              <span>Work · Services · Contact</span>
            </div>

            <p className="menu-pv-hl">
              Websites that look <em className="serif-accent">incredible</em>.
              <br />
              Built to be <em className="serif-accent">found</em>.
            </p>
            <p className="menu-pv-sub">
              Web development and technical SEO as one job — WordPress, Core Web
              Vitals and schema engineered in from day one.
            </p>

            <div className="menu-pv-ctas">
              <span className="menu-pv-cta">Start a Project</span>
              <span className="menu-pv-cta menu-pv-cta--ghost">View Work</span>
            </div>

            <div className="menu-pv-shotstrip">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/work/rose-wealth.webp"
                alt=""
                width={880}
                height={1320}
                loading="lazy"
                decoding="async"
              />
              <span className="menu-pv-photo-cap">Case study — Rose Wealth</span>
            </div>

            <div className="menu-pv-feat">
              {features.map(([k, v]) => (
                <span key={k} className="menu-pv-feat-cell">
                  <b>{k}</b>
                  <u>{v}</u>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <p className="menu-pv-cap">
        <span>Index / {site.domain}</span>
        <b>Live</b>
      </p>
    </>
  );
}

function PlateServices() {
  const rest = services.slice(6);

  return (
    <>
      <div className="menu-pv-in">
        <p className="menu-pv-head">
          <span>Service index</span>
          <b>Index</b>
        </p>

        <div className="menu-pv-svc">
          {services.slice(0, 6).map((s, i) => (
            <span
              key={s.slug}
              className={`menu-pv-svc-row ${i === 2 ? "menu-pv-svc-row--hot" : ""}`}
            >
              <i>{String(i + 1).padStart(2, "0")}</i>
              <b>{s.name}</b>
              <u>{s.chips[0]}</u>
            </span>
          ))}
        </div>

        <p className="menu-pv-note">
          + {rest.length} more — {rest.map((s) => s.name).join(" · ")}
        </p>
      </div>

      <p className="menu-pv-cap">
        <span>Dev × SEO</span>
        <b>WordPress</b>
      </p>
    </>
  );
}

function PlateWork() {
  const more = [projects[1], projects[2], projects[4]];

  return (
    <>
      <div className="menu-pv-in">
        <div className="menu-pv-shots">
          <div className="menu-pv-shot menu-pv-shot--back">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/work/huckleberrys-restaurant.webp"
              alt=""
              width={880}
              height={1320}
              loading="lazy"
              decoding="async"
            />
            <span className="menu-pv-shot-tag">Huckleberry&apos;s</span>
          </div>

          <div className="menu-pv-shot menu-pv-shot--front">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/work/citygate-financial-planning.webp"
              alt=""
              width={880}
              height={1320}
              loading="lazy"
              decoding="async"
            />
            <span className="menu-pv-shot-tag menu-pv-shot-tag--hot">
              Citygate Financial Planning
            </span>
          </div>
        </div>

        <div className="menu-pv-worklist">
          {more.map((p) => (
            <span key={p.slug} className="menu-pv-workrow">
              <b>{p.name}</b>
              <u>{p.industry}</u>
            </span>
          ))}
        </div>
      </div>

      <p className="menu-pv-cap">
        <span>Selected work</span>
        <b>{projects.length} projects</b>
      </p>
    </>
  );
}

function PlateProcess() {
  const phases: [string, string][] = [
    ["Design", "Layout, hierarchy, brand"],
    ["Develop", "WordPress · Elementor Pro"],
    ["SEO", "Schema, metadata, linking"],
    ["Performance", "Core Web Vitals, caching"],
    ["Live", "VPS deploy · SSL · backups"],
  ];

  return (
    <>
      <div className="menu-pv-in">
        <p className="menu-pv-head">
          <span>Build sequence</span>
          <b>05</b>
        </p>

        <div className="menu-pv-tl">
          {phases.map(([name, detail], i) => (
            <span
              key={name}
              className={`menu-pv-step${i === phases.length - 1 ? " menu-pv-step--live" : ""}`}
            >
              <i>{String(i + 1).padStart(2, "0")}</i>
              <b>{name}</b>
              <u>{detail}</u>
            </span>
          ))}
        </div>
      </div>

      <p className="menu-pv-cap">
        <span>One process</span>
        <b>Every build</b>
      </p>
    </>
  );
}

function PlateAbout() {
  return (
    <>
      <div className="menu-pv-in">
        <p className="menu-pv-head">
          <span>Profile</span>
          <b>Lahore · PK</b>
        </p>

        <div className="menu-pv-stats">
          <span className="menu-pv-stat">
            <b>{site.projectsShipped}+</b>
            <u>Projects shipped</u>
          </span>
          <span className="menu-pv-stat">
            <b>{site.yearsExperience}</b>
            <u>Years dev + SEO</u>
          </span>
        </div>

        <dl className="menu-pv-ledger">
          <div className="menu-pv-ledger-row">
            <dt>Name</dt>
            <dd>{site.person}</dd>
          </div>
          <div className="menu-pv-ledger-row">
            <dt>Role</dt>
            <dd>{site.role}</dd>
          </div>
          <div className="menu-pv-ledger-row">
            <dt>Core</dt>
            <dd>{site.devSpecialty}</dd>
          </div>
        </dl>

        <div className="menu-pv-chips">
          {["Next.js", "React", "TypeScript", "Laravel", "Python"].map((t) => (
            <span key={t} className="menu-pv-chip">
              {t}
            </span>
          ))}
        </div>
      </div>

      <p className="menu-pv-cap">
        <span>{site.person}</span>
        <b>Since 2023</b>
      </p>
    </>
  );
}

function PlateInsights() {
  return (
    <>
      <div className="menu-pv-in">
        <p className="menu-pv-head">
          <span>Writing</span>
          <b>{String(articles.length).padStart(2, "0")}</b>
        </p>

        <div className="menu-pv-doc">
          {articles.slice(0, 4).map((a, i) => (
            <span
              key={a.slug}
              className={`menu-pv-art${i === 0 ? " menu-pv-art--hot" : ""}`}
            >
              <i>{String(i + 1).padStart(2, "0")}</i>
              <b>{a.title}</b>
            </span>
          ))}
        </div>

        <div className="menu-pv-chips">
          <span className="menu-pv-chip menu-pv-chip--hot">SEO</span>
          <span className="menu-pv-chip">WordPress</span>
          <span className="menu-pv-chip">Core Web Vitals</span>
        </div>
      </div>

      <p className="menu-pv-cap">
        <span>Insights</span>
        <b>Plain English</b>
      </p>
    </>
  );
}

function PlateContact() {
  return (
    <>
      <div className="menu-pv-in">
        <p className="menu-pv-head">
          <span>Direct line</span>
          <b>Open</b>
        </p>

        <dl className="menu-pv-ledger menu-pv-ledger--tall">
          <div className="menu-pv-ledger-row">
            <dt>Email</dt>
            <dd>{site.email}</dd>
          </div>
          <div className="menu-pv-ledger-row">
            <dt>Phone</dt>
            <dd>{site.phone}</dd>
          </div>
          <div className="menu-pv-ledger-row">
            <dt>Base</dt>
            <dd>
              {site.location.city}, {site.location.country}
            </dd>
          </div>
          <div className="menu-pv-ledger-row">
            <dt>Reply</dt>
            <dd>Usually within a day</dd>
          </div>
        </dl>

        <div className="menu-pv-chips">
          {["Email", "WhatsApp", "LinkedIn"].map((c) => (
            <span key={c} className="menu-pv-chip">
              {c}
            </span>
          ))}
        </div>

        <span className="menu-pv-cta menu-pv-cta--wide">Start a Project</span>
      </div>

      <p className="menu-pv-cap">
        <span>Working worldwide</span>
        <b>UTC+5</b>
      </p>
    </>
  );
}

/** Plate order matches `nav` order exactly. */
const plates = [PlateHome, PlateServices, PlateWork, PlateProcess, PlateAbout, PlateInsights, PlateContact];

const exploreLinks = [
  { label: "Selected Work", href: "/work/" },
  { label: "Process", href: "/process/" },
  { label: "Insights", href: "/insights/" },
  { label: "Start a Project", href: "/contact/" },
] as const;

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [peek, setPeek] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);

  // Glass backdrop once content scrolls under the bar; transparent at the top.
  // The bar slides away while reading down the page and returns the moment
  // the visitor scrolls back up — content gets the full viewport, the menu is
  // never more than one flick away.
  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      setScrolled(y > 24);
      if (y < 120) setHidden(false);
      else if (delta > 8) setHidden(true);
      else if (delta < -8) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu on route change and lock body scroll while open.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  // Escape closes; focus moves into the panel on open, back to the trigger on close.
  useEffect(() => {
    if (open) {
      wasOpen.current = true;
      const raf = requestAnimationFrame(() => panelRef.current?.focus());
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false);
      };
      window.addEventListener("keydown", onKey);
      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("keydown", onKey);
      };
    }
    if (wasOpen.current) {
      wasOpen.current = false;
      btnRef.current?.focus();
    }
  }, [open]);

  const isActive = useCallback(
    (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href)),
    [pathname],
  );

  const openMenu = () => {
    // Open with the current page's preview showing.
    const idx = nav.findIndex((item) => isActive(item.href));
    setPeek(idx >= 0 ? idx : 0);
    setOpen(true);
  };

  // Keep Tab cycling inside the open dialog.
  const trapTab = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== "Tab") return;
    const panel = panelRef.current;
    if (!panel) return;
    const nodes = panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
    if (nodes.length === 0) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    const active = document.activeElement;
    if (e.shiftKey && (active === first || active === panel)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  }, []);

  return (
    <header
      className={`site-hdr${scrolled ? " site-hdr--glass" : ""}${
        hidden && !open ? " site-hdr--hidden" : ""
      }`}
    >
      {/* Phones: logo left, Menu right (the CTA is hidden). From sm up the
          three-column grid returns the Menu pill to dead centre. */}
      <div className="header-x grid h-[72px] grid-cols-[1fr_auto] items-center gap-4 sm:grid-cols-[1fr_auto_1fr]">
        <Link
          href="/"
          aria-label="KamranDev — home"
          className="shrink-0 justify-self-start"
        >
          <Logo />
        </Link>

        <div className="justify-self-end sm:justify-self-center">
          <button
            ref={btnRef}
            type="button"
            onClick={() => (open ? setOpen(false) : openMenu())}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-haspopup="dialog"
            className="menu-btn"
          >
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true">
              <path
                className="menu-btn-line menu-btn-line--a"
                d="M1 2h14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                className="menu-btn-line menu-btn-line--b"
                d="M1 8h14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            Menu
          </button>
        </div>

        <Link
          href="/contact/"
          className="btn btn-primary !hidden !min-h-[44px] justify-self-end whitespace-nowrap !px-5 !py-2 text-sm sm:!inline-flex"
        >
          Start a Project
        </Link>
      </div>

      {/* Floating overlay menu — fixed, so it never changes the header's height */}
      <div id="site-menu" className="menu-overlay" data-open={open ? "" : undefined} inert={!open}>
        <button
          type="button"
          className="menu-scrim"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
          tabIndex={-1}
        />

        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          tabIndex={-1}
          className="menu-panel"
          data-lenis-prevent
          onKeyDown={trapTab}
        >
          {/* top row: brand / tagline / close */}
          <div className="menu-top">
            <span className="menu-top-brand">
              <LogoMark className="menu-top-mark" />
              <span className="label-mono">{site.name}</span>
            </span>
            <p className="label-mono label-mono--faint menu-top-tag">
              Websites built to be found
            </p>
            <button
              type="button"
              className="menu-close"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M2 2l12 12M14 2L2 14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* primary links + preview column */}
          <div className="menu-main">
            <nav aria-label="Primary">
              <ul className="menu-list">
                {nav.map((item, i) => (
                  <li key={item.href} className="menu-row" style={{ "--i": i } as CSSProperties}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className="menu-link display"
                      onMouseEnter={() => setPeek(i)}
                      onFocus={() => setPeek(i)}
                    >
                      <span className="menu-idx" aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="menu-word">{item.label}</span>
                      <svg
                        className="menu-arrow"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M4 12h15M13 5l7 7-7 7"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="menu-peek" aria-hidden="true">
              {plates.map((Plate, i) => (
                <div key={i} className="menu-pv" data-active={peek === i ? "" : undefined}>
                  <Plate />
                </div>
              ))}
            </div>
          </div>

          {/* bottom: explore / connect */}
          <div className="menu-foot">
            <div className="menu-col">
              <p className="menu-col-label label-mono label-mono--faint">Explore</p>
              <ul>
                {exploreLinks.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="menu-col">
              <p className="menu-col-label label-mono label-mono--faint">Connect</p>
              <ul>
                <li>
                  <a href={`mailto:${site.email}`}>Email</a>
                </li>
                <li>
                  <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href={site.phoneHref}>{site.phone}</a>
                </li>
              </ul>
            </div>
            <p className="menu-foot-meta label-mono label-mono--faint">
              Lahore, Pakistan — working worldwide
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
