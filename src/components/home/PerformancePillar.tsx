import Link from "next/link";
import type { CSSProperties } from "react";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";

/* Same readouts as the hero's vitals panel — one instrument, one standard.
   `good` / `warn` / `poor` are Google's published Core Web Vitals thresholds
   expressed as a share of the scale drawn beneath each meter — nothing here
   is invented, and `mark` is simply where this build's value sits on it. */
const vitals = [
  {
    key: "LCP",
    name: "Largest Contentful Paint",
    target: "under 2.5s",
    value: "1.1s",
    scale: [
      { at: 0, label: "0" },
      { at: 50, label: "2.5s" },
      { at: 80, label: "4.0s" },
    ],
    good: 50,
    warn: 30,
    poor: 20,
    mark: 22,
    desc: "How fast your main content appears. Optimized images, clean markup and smart loading order keep it low.",
  },
  {
    key: "INP",
    name: "Interaction to Next Paint",
    target: "under 200ms",
    value: "42ms",
    scale: [
      { at: 0, label: "0" },
      { at: 33.3, label: "200ms" },
      { at: 83.3, label: "500ms" },
    ],
    good: 33.3,
    warn: 50,
    poor: 16.7,
    mark: 7,
    desc: "How fast the site responds when people tap and click. Efficient code and minimal JavaScript keep it instant.",
  },
  {
    key: "CLS",
    name: "Cumulative Layout Shift",
    target: "under 0.1",
    value: "0.00",
    scale: [
      { at: 0, label: "0" },
      { at: 33.3, label: "0.10" },
      { at: 83.3, label: "0.25" },
    ],
    good: 33.3,
    warn: 50,
    poor: 16.7,
    mark: 1.5,
    desc: "How stable the page is while loading. Reserved space and disciplined layout mean nothing jumps around.",
  },
];

/* True of this website, and of every build I ship. */
const buildNotes = [
  "static export · pre-rendered HTML",
  "no render-blocking JavaScript",
  "self-hosted fonts · zero layout shift",
  "webp + responsive image sizes",
];

/* 270° gauge geometry: radius 80, from 135° through the top to 405°. */
const gaugeTicks = Array.from({ length: 28 }, (_, i) => {
  const a = ((135 + i * 10) * Math.PI) / 180;
  const major = i % 3 === 0;
  const r1 = major ? 87 : 90;
  const r2 = 95;
  return {
    major,
    x1: +(100 + r1 * Math.cos(a)).toFixed(2),
    y1: +(100 + r1 * Math.sin(a)).toFixed(2),
    x2: +(100 + r2 * Math.cos(a)).toFixed(2),
    y2: +(100 + r2 * Math.sin(a)).toFixed(2),
  };
});
const ARC_D = "M 43.43 156.57 A 80 80 0 1 1 156.57 156.57";

function delayStyle(ms: number): CSSProperties {
  return { "--d": `${ms}ms` } as CSSProperties;
}

export function PerformancePillar() {
  return (
    <section className="border-t border-line" aria-labelledby="perf-heading">
      <div className="container-x section-pad">
        <SectionHead
          index="09"
          label="Performance"
          id="perf-heading"
          title={
            <>
              Fast websites <em>win</em>
            </>
          }
          lede="Speed is a ranking factor, a conversion factor and a first impression — all at once. I treat Google’s Core Web Vitals as a build requirement, not an afterthought."
        />

        {/* ------------------- the instrument cluster ---------------------- */}
        <Reveal delay={140}>
          <div className="relative mt-14 rounded-2xl border border-line2 bg-surface/90 shadow-[0_40px_90px_-50px_rgba(0,0,0,0.95)] backdrop-blur-sm">
            {/* Header strip */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-6 py-4 sm:px-8">
              <span className="label-mono label-mono--faint">Core Web Vitals</span>
              <span className="flex items-center gap-2.5">
                <span aria-hidden className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent" />
                <span className="label-mono">reference build · this website</span>
              </span>
            </div>

            {/* Gauge + vitals meters */}
            <div className="grid gap-10 px-6 py-9 sm:px-8 lg:grid-cols-[minmax(230px,300px)_1fr] lg:gap-16">
              <div className="flex flex-col justify-center gap-7">
                <div className="relative mx-auto w-full max-w-[300px]">
                  <svg viewBox="0 0 200 200" className="block w-full" role="img" aria-label="Performance gauge sweeping to a score of 100">
                    {gaugeTicks.map((t, i) => (
                      <line
                        key={i}
                        x1={t.x1}
                        y1={t.y1}
                        x2={t.x2}
                        y2={t.y2}
                        strokeWidth={1}
                        className={t.major ? "stroke-line2" : "stroke-line"}
                      />
                    ))}
                    <path d={ARC_D} fill="none" strokeWidth={7} strokeLinecap="round" className="stroke-line" />
                    <path
                      d={ARC_D}
                      fill="none"
                      strokeWidth={7}
                      strokeLinecap="round"
                      pathLength={100}
                      strokeDasharray={100}
                      className="perf-arc stroke-accent"
                      style={{ strokeDashoffset: 0 }}
                    />
                    <text x="40" y="178" fontSize="8" className="fill-faint" style={{ fontFamily: "var(--font-mono)" }}>
                      0
                    </text>
                    <text x="146" y="178" fontSize="8" className="fill-faint" style={{ fontFamily: "var(--font-mono)" }}>
                      100
                    </text>
                  </svg>
                  <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                    <span className="perf-late label-mono label-mono--faint" style={delayStyle(200)}>
                      target
                    </span>
                    <span className="perf-late display mt-1 text-[3.4rem] leading-none text-ink" style={delayStyle(260)} aria-hidden>
                      100
                    </span>
                    <span className="perf-late label-mono mt-1.5" style={delayStyle(380)}>
                      build standard
                    </span>
                  </div>
                </div>

                {/* Build notes — the gauge column carries its own readout */}
                <ul className="mx-auto w-full max-w-[300px] border-t border-line">
                  {buildNotes.map((n, i) => (
                    <li
                      key={n}
                      className="perf-late flex items-center gap-2.5 border-b border-line py-2"
                      style={delayStyle(520 + i * 90)}
                    >
                      <span aria-hidden className="perf-tick" />
                      <span className="font-mono text-[11px] tracking-[0.08em] text-muted">{n}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col justify-center gap-8">
                {vitals.map((v, i) => (
                  <div key={v.key} className="grid grid-cols-[3.4rem_1fr] gap-x-4 sm:grid-cols-[4rem_1fr]">
                    <span className="font-mono text-xl font-medium text-accent2 sm:text-2xl" aria-hidden>
                      {v.key}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                        <h3 className="text-base font-medium text-ink">{v.name}</h3>
                        <span className="label-mono">
                          good: <span className="text-accent2">{v.target}</span>
                        </span>
                      </div>

                      {/* Threshold meter — Google's own good / needs-work /
                          poor bands, with this build's value marked on them. */}
                      <div className="mt-3 flex items-start gap-3">
                        <div className="perf-meter flex-1">
                          <div className="perf-track" aria-hidden>
                            <span className="perf-zone perf-zone--good" style={{ width: `${v.good}%` }} />
                            <span className="perf-zone perf-zone--warn" style={{ width: `${v.warn}%` }} />
                            <span className="perf-zone perf-zone--poor" style={{ width: `${v.poor}%` }} />
                          </div>
                          <span
                            className="perf-needle"
                            aria-hidden
                            style={{ "--x": `${v.mark}%`, "--d": `${420 + i * 160}ms` } as CSSProperties}
                          >
                            <span className="perf-mark" />
                          </span>
                          <div className="perf-scale" aria-hidden>
                            {v.scale.map((s) => (
                              <span key={s.label} className="perf-scale-t" style={{ left: `${s.at}%` }}>
                                {s.label}
                              </span>
                            ))}
                            <span className="perf-scale-t perf-scale-t--end">poor</span>
                          </div>
                        </div>
                        <span className="font-mono text-sm leading-none text-ink">{v.value}</span>
                      </div>

                      <p className="mt-2.5 text-base leading-relaxed text-muted">{v.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-8">
            <Link href="/website-performance/" className="btn btn-ghost">
              Performance optimization
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
