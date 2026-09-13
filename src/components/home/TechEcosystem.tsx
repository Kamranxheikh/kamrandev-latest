import type { CSSProperties } from "react";
import { techEcosystem } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";

/* Toolchain schematic, read left to right the way the lede reads:
   infrastructure feeds the build, the build feeds SEO & measurement.
   Two signal traces link the three panels into one board. */
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
    desc: "The code and platforms — Next.js and React at the core, Laravel and Node.js behind them.",
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
const CORE = "Next.js";

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

export function TechEcosystem() {
  return (
    <section className="border-t border-line" aria-labelledby="tech-heading">
      <div className="container-x section-pad">
        <SectionHead
          index="07"
          label="Tech Ecosystem"
          id="tech-heading"
          title="One connected technical system"
          lede="Not a logo wall — a toolchain. Infrastructure makes the code fast, code makes the SEO possible, SEO makes the build discoverable."
        />

        <Reveal delay={120}>
          <div className="eco-board mt-14">
            <div className="eco-grid eco-row">
              <ClusterPanel c={clusters[0]} delay={0} />
              <Trace cls="eco-t1" label="powers" delay="0.28s" />
              <ClusterPanel c={clusters[1]} delay={130} />
              <Trace cls="eco-t2" label="feeds" delay="0.52s" />
              <ClusterPanel c={clusters[2]} delay={260} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
