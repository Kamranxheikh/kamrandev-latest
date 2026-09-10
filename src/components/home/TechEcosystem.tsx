import type { CSSProperties } from "react";
import { techEcosystem } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

/* Toolchain schematic, read left to right the way the lede reads:
   infrastructure feeds the build, the build feeds SEO & measurement.
   A bus rail across the top ties the three into one stack; a feedback rail
   underneath carries measurement data back into the build. */
const clusters = [
  {
    cls: "eco-c1",
    idx: "01",
    name: "Infrastructure",
    desc: "Servers, DNS, SSL/TLS and security — the foundation everything runs on.",
    items: techEcosystem.infrastructure,
    ports: ["IN ← hosting", "OUT → 02 build"],
  },
  {
    cls: "eco-c2",
    idx: "02",
    name: "Build",
    desc: "The code and platforms — WordPress at the core, custom code beside it.",
    items: techEcosystem.development,
    ports: ["IN ← 01 infra", "OUT → 03 seo"],
  },
  {
    cls: "eco-c3",
    idx: "03",
    name: "SEO & Measure",
    desc: "How the site is crawled, measured and found — in Google and AI search.",
    items: techEcosystem.seo,
    ports: ["IN ← 02 build", "OUT → search"],
  },
] as const;

type Cluster = (typeof clusters)[number];

/** The one chip that is a documented fact rather than a preference. */
const CORE = "WordPress";

function ClusterPanel({ c, delay }: { c: Cluster; delay: number }) {
  return (
    <div
      className={`eco-cluster ${c.cls}`}
      style={{ "--eco-d": `${delay}ms` } as CSSProperties}
    >
      <div className="eco-in">
        <header className="eco-head">
          <span className="eco-idx" aria-hidden>
            {c.idx}
          </span>
          <h3 className="eco-name">{c.name}</h3>
          <span className="eco-count" aria-hidden>
            {String(c.items.length).padStart(2, "0")} tools
          </span>
        </header>
        <p className="eco-desc">{c.desc}</p>
        <ul className="eco-chips">
          {c.items.map((t) => (
            <li key={t} className={`eco-chip${t === CORE ? " eco-chip--core" : ""}`}>
              {t}
              {t === CORE ? <span className="eco-core-tag">core</span> : null}
            </li>
          ))}
        </ul>
        <p className="eco-ports" aria-hidden>
          {c.ports.map((p) => (
            <span key={p}>{p}</span>
          ))}
        </p>
      </div>
    </div>
  );
}

/* Signal trace between two clusters. Horizontal with an arrowhead on desktop;
   the same link turns vertical once the board stacks. */
function Trace({ cls, label, delay }: { cls: string; label: string; delay: string }) {
  const style = { "--eco-td": delay } as CSSProperties;
  return (
    <div aria-hidden className="eco-link" style={style}>
      <div className="eco-link-h">
        <svg width="64" height="12" viewBox="0 0 64 12" fill="none">
          <path className={`eco-trace ${cls}`} d="M0 6h56" pathLength={1} />
          <path className={`eco-head-a ${cls}`} d="M52 2.5 58 6l-6 3.5" pathLength={1} />
        </svg>
        <span className={`eco-link-lab ${cls}`}>{label}</span>
      </div>
      <div className="eco-link-v">
        <svg width="12" height="42" viewBox="0 0 12 42" fill="none">
          <path className={`eco-trace ${cls}`} d="M6 0v34" pathLength={1} />
          <path className={`eco-head-a ${cls}`} d="M2.5 30 6 36l3.5-6" pathLength={1} />
        </svg>
        <span className={`eco-link-lab ${cls}`}>{label}</span>
      </div>
    </div>
  );
}

type RailCell = {
  line: "left" | "right" | "full";
  drop?: string;
};

const RAIL_CELLS: RailCell[] = [
  { line: "right", drop: "eco-j1" },
  { line: "full" },
  { line: "full", drop: "eco-j2" },
  { line: "full" },
  { line: "left", drop: "eco-j3" },
];

/** A bus rail with junction nodes dropping into each cluster column. */
function Rail({ dir }: { dir: "down" | "up" }) {
  return (
    <div className={`eco-rail eco-grid eco-rail--${dir}`} aria-hidden>
      {RAIL_CELLS.map((cell, i) => (
        <div className="eco-rc" key={i}>
          <span className={`eco-rl eco-rl--${cell.line}`} />
          {cell.drop ? (
            <>
              <span className={`eco-rd ${cell.drop}`} />
              <span className={`eco-rn ${cell.drop}`} />
            </>
          ) : null}
          {dir === "up" && cell.line === "full" && !cell.drop ? (
            <svg className="eco-arw" width="9" height="9" viewBox="0 0 9 9" fill="none">
              <path d="M6.5 1 2 4.5 6.5 8" />
            </svg>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export function TechEcosystem() {
  return (
    <section className="border-t border-line" aria-labelledby="tech-heading">
      <div className="container-x section-pad">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="label-mono label-mono--accent">
              <span aria-hidden>07 / </span>
              Tech Ecosystem
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 id="tech-heading" className="display mt-5 text-[clamp(2rem,4.6vw,3.6rem)]">
              One connected technical system
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              Not a logo wall — a toolchain. Infrastructure makes the code fast, code makes
              the SEO possible, SEO makes the build discoverable.
            </p>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="eco-board mt-16">
            <p className="eco-rail-lab eco-rail-lab--top" aria-hidden>
              <span className="eco-rail-tag">Bus</span>
              One stack, one owner — end to end
            </p>
            <Rail dir="down" />

            <div className="eco-grid eco-row">
              <ClusterPanel c={clusters[0]} delay={0} />
              <Trace cls="eco-t1" label="powers" delay="0.28s" />
              <ClusterPanel c={clusters[1]} delay={130} />
              <Trace cls="eco-t2" label="feeds" delay="0.52s" />
              <ClusterPanel c={clusters[2]} delay={260} />
            </div>

            <Rail dir="up" />
            <p className="eco-rail-lab eco-rail-lab--bot" aria-hidden>
              <span className="eco-rail-tag">Feedback</span>
              Search Console &amp; GA4 data returns to the build
            </p>
          </div>
        </Reveal>

        <Reveal delay={220}>
          <p className="label-mono label-mono--faint mt-10 text-center">
            Output — a website that is fast, secure and found
          </p>
        </Reveal>
      </div>
    </section>
  );
}
