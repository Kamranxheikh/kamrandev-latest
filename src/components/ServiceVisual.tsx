/* Per-service abstract visual for service-page heroes. Pure CSS/SVG, no images. */

function Frame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div aria-hidden className="relative overflow-hidden rounded-2xl border border-line bg-surface">
      <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
        <span className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-line2" />
          <span className="h-2 w-2 rounded-full bg-line2" />
          <span className="h-2 w-2 rounded-full bg-line2" />
        </span>
        <span className="ml-2 font-mono text-[10px] tracking-[0.12em] text-faint">{label}</span>
      </div>
      <div className="relative aspect-[4/3] p-5 sm:p-6">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(120% 90% at 85% 0%, rgba(255, 138, 61,0.10), transparent 60%)",
          }}
        />
        <div className="relative h-full">{children}</div>
      </div>
    </div>
  );
}

const Bar = ({ w, tone = "line" }: { w: string; tone?: "line" | "ink" | "accent" }) => (
  <span
    className={`block h-2.5 rounded ${
      tone === "ink" ? "bg-ink/60" : tone === "accent" ? "bg-accent/80" : "bg-line2"
    }`}
    style={{ width: w }}
  />
);

export function ServiceVisual({ slug }: { slug: string }) {
  switch (slug) {
    case "website-design":
      return (
        <Frame label="design / layout system">
          <div className="grid h-full grid-cols-[1.4fr_1fr] gap-3">
            <div className="flex flex-col justify-center gap-3 rounded-lg border border-dashed border-line2 p-4">
              <Bar w="80%" tone="ink" />
              <Bar w="55%" tone="ink" />
              <Bar w="100%" />
              <Bar w="85%" />
              <span className="mt-2 h-8 w-28 rounded-full bg-accent/90" />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                {["#ff8a3d", "#f3ece2", "#e8c872"].map((c) => (
                  <span key={c} className="h-8 w-8 rounded-full" style={{ background: c }} />
                ))}
              </div>
              <span className="rounded-lg border border-dashed border-line2 p-3 font-mono text-[10px] leading-relaxed text-faint">
                type scale
                <br />
                8pt grid
                <br />
                contrast AA
              </span>
              <span className="flex-1 rounded-lg border border-dashed border-line2" />
            </div>
          </div>
        </Frame>
      );

    case "wordpress-development":
      return (
        <Frame label="wp-admin / build">
          <div className="grid h-full grid-cols-[80px_1fr] gap-3">
            <div className="flex flex-col gap-2 rounded-lg bg-bg p-2.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <span key={i} className="flex items-center gap-1.5">
                  <span className={`h-1.5 w-1.5 rounded-full ${i === 1 ? "bg-accent" : "bg-line2"}`} />
                  <span className="h-1.5 flex-1 rounded bg-line2" />
                </span>
              ))}
            </div>
            <div className="flex flex-col gap-2.5">
              {["Elementor Pro", "WooCommerce", "JetEngine"].map((t, i) => (
                <span
                  key={t}
                  className="flex items-center justify-between rounded-lg border border-line bg-bg px-3 py-2.5 font-mono text-[10px] text-muted"
                  style={{ opacity: 1 - i * 0.18 }}
                >
                  {t}
                  <span className="text-accent">✓</span>
                </span>
              ))}
              <span className="mt-auto rounded-lg border border-accent/30 bg-bg px-3 py-2 font-mono text-[10px] text-accent2">
                lean plugins
              </span>
            </div>
          </div>
        </Frame>
      );

    case "web-application-development":
      return (
        <Frame label="app / dashboard">
          <div className="flex h-full flex-col gap-3">
            <div className="grid grid-cols-3 gap-2.5">
              {["Next.js", "Node.js", "API"].map((t) => (
                <span key={t} className="rounded-lg border border-line bg-bg px-2 py-3 text-center font-mono text-[10px] text-muted">
                  {t}
                </span>
              ))}
            </div>
            <div className="relative flex-1 rounded-lg border border-line bg-bg p-3">
              <svg viewBox="0 0 200 90" className="h-full w-full" preserveAspectRatio="none">
                <polyline
                  points="0,72 30,58 60,64 90,38 120,44 150,20 200,10"
                  fill="none"
                  stroke="#ff8a3d"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                />
                <polyline
                  points="0,82 30,76 60,78 90,66 120,70 150,58 200,52"
                  fill="none"
                  stroke="rgba(243, 236, 226,0.2)"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>
          </div>
        </Frame>
      );

    case "woocommerce-development":
      return (
        <Frame label="store / checkout">
          <div className="grid h-full grid-cols-2 gap-3">
            <div className="grid grid-cols-2 gap-2.5">
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className="flex flex-col gap-1.5 rounded-lg border border-line bg-bg p-2">
                  <span className="flex-1 rounded bg-line/60" />
                  <span className="h-1.5 w-4/5 rounded bg-line2" />
                  <span className="h-1.5 w-1/2 rounded bg-accent/70" />
                </span>
              ))}
            </div>
            <div className="flex flex-col justify-center gap-2.5 rounded-lg border border-line bg-bg p-4">
              <span className="font-mono text-[10px] text-faint">CART</span>
              <Bar w="90%" />
              <Bar w="70%" />
              <span className="my-1 h-px bg-line" />
              <Bar w="55%" tone="ink" />
              <span className="mt-1 h-8 rounded-full bg-accent/90" />
            </div>
          </div>
        </Frame>
      );

    case "website-redesign":
      return (
        <Frame label="before / after">
          <div className="grid h-full grid-cols-2 gap-3">
            <div className="flex flex-col gap-2 rounded-lg border border-dashed border-line2 p-3 opacity-45">
              <span className="font-mono text-[9px] text-faint">BEFORE</span>
              <Bar w="70%" />
              <Bar w="90%" />
              <Bar w="60%" />
              <span className="mt-auto h-6 w-16 rounded bg-line2" />
            </div>
            <div className="relative flex flex-col gap-2.5 rounded-lg border border-accent/40 bg-bg p-3">
              <span className="font-mono text-[9px] text-accent2">AFTER</span>
              <Bar w="80%" tone="ink" />
              <Bar w="100%" />
              <Bar w="65%" />
              <span className="mt-auto h-7 w-24 rounded-full bg-accent/90" />
              <span className="absolute -left-[13px] top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border border-accent/50 bg-bg font-mono text-[10px] text-accent2">
                →
              </span>
            </div>
          </div>
        </Frame>
      );

    case "ai-solutions":
      return (
        <Frame label="answer engine / model layer">
          <div className="grid h-full grid-cols-[1.25fr_1fr] gap-3">
            {/* The exchange: a real question, a real answer, a real citation */}
            <div className="flex flex-col gap-2 rounded-lg border border-line bg-bg p-3.5">
              <span className="font-mono text-[9px] tracking-[0.16em] text-faint">
                ANSWER ENGINE
              </span>
              <span className="rounded-md border border-line2 bg-surface px-2.5 py-1.5 text-[11px] leading-snug text-ink">
                Who builds SEO-ready Next.js apps in Lahore?
              </span>
              <span className="text-[11px] leading-relaxed text-muted">
                Muhammad Kamran is a software developer in Lahore who builds
                Next.js and React applications with technical SEO engineered
                into the build
                <span className="align-super font-mono text-[8px] text-accent2">
                  [1]
                </span>
                .
              </span>
              <span className="mt-auto flex items-center gap-2">
                <span className="flex items-center gap-1.5 rounded-full border border-accent/50 bg-accent/12 px-2 py-1">
                  <span className="grid h-3 w-3 place-items-center rounded-[3px] bg-accent font-mono text-[7px] font-bold leading-none text-accent-ink">
                    M
                  </span>
                  <span className="font-mono text-[9px] leading-none text-accent2">
                    kamrandev.com
                  </span>
                </span>
                <span className="font-mono text-[9px] leading-none text-faint">
                  CITED
                </span>
              </span>
            </div>

            {/* What actually gets built underneath the answer */}
            <div className="flex flex-col gap-2.5">
              {[
                ["AI SaaS builds", "Next.js · Node.js"],
                ["AI in WordPress", "search · summaries"],
                ["AEO / GEO", "schema · entities"],
              ].map(([t, sub]) => (
                <span
                  key={t}
                  className="flex flex-col rounded-lg border border-line bg-bg px-3 py-2"
                >
                  <span className="flex items-center gap-1.5 text-[11px] text-ink">
                    <span className="text-accent">✓</span>
                    {t}
                  </span>
                  <span className="font-mono text-[9px] text-muted">{sub}</span>
                </span>
              ))}
              <span className="mt-auto rounded-lg border border-accent/30 bg-bg px-3 py-2 font-mono text-[9px] leading-relaxed text-accent2">
                model APIs · cost caps
                <br />
                fallbacks · data limits
              </span>
            </div>
          </div>
        </Frame>
      );

    case "seo":
      return (
        <Frame label="search + ai answers">
          <div className="grid h-full grid-cols-[1.3fr_1fr] gap-3">
            {/* A real result, not three grey bars */}
            <div className="flex flex-col gap-2 rounded-lg border border-line bg-bg p-3.5">
              <span className="flex items-center gap-1.5">
                <span className="rounded border border-amber/60 px-1.5 py-0.5 font-mono text-[8px] tracking-[0.14em] text-amber">
                  AI OVERVIEW
                </span>
                <span className="font-mono text-[8px] tracking-[0.12em] text-faint">
                  SOURCE 1 OF 3
                </span>
              </span>
              <span className="flex items-center gap-2">
                <span className="grid h-4 w-4 shrink-0 place-items-center rounded-[4px] bg-accent font-mono text-[8px] font-bold leading-none text-accent-ink">
                  M
                </span>
                <span className="min-w-0 leading-tight">
                  <span className="block truncate text-[10px] text-ink">
                    kamrandev.com
                  </span>
                  <span className="block truncate font-mono text-[8px] text-muted">
                    https://kamrandev.com › seo
                  </span>
                </span>
              </span>
              <span className="text-[13px] font-medium leading-tight text-accent2">
                SEO &amp; AI Search Visibility
              </span>
              <span className="text-[10px] leading-relaxed text-muted">
                Technical SEO, on-page structure, schema and AEO/GEO —
                engineered into your website by the developer who builds it.
              </span>
              <span className="mt-auto flex flex-wrap gap-x-3 gap-y-1 border-t border-line pt-2 text-[9px] text-accent2">
                <span>Technical SEO</span>
                <span>Schema markup</span>
                <span>AEO / GEO</span>
              </span>
            </div>
            <div className="flex flex-col justify-center gap-2 rounded-lg border border-line bg-bg p-3 font-mono text-[10px] text-muted">
              {["/", "/services/", "/work/", "/insights/"].map((p) => (
                <span key={p} className="flex items-center gap-1.5">
                  <span className="text-accent">✓</span>
                  {p}
                </span>
              ))}
              <span className="mt-1 text-faint">crawled · indexed</span>
            </div>
          </div>
        </Frame>
      );

    case "website-performance":
      return (
        <Frame label="core web vitals">
          <div className="flex h-full flex-col items-center justify-center gap-6">
            <div className="flex gap-6 sm:gap-9">
              {[
                ["LCP", "< 2.5s"],
                ["INP", "< 200ms"],
                ["CLS", "< 0.1"],
              ].map(([k, v], i) => (
                <div key={k} className="flex flex-col items-center gap-2">
                  <svg viewBox="0 0 72 72" className="h-16 w-16 -rotate-90">
                    <circle cx="36" cy="36" r="30" fill="none" strokeWidth="5" className="stroke-line" />
                    <circle
                      cx="36"
                      cy="36"
                      r="30"
                      fill="none"
                      strokeWidth="5"
                      strokeLinecap="round"
                      pathLength={100}
                      strokeDasharray={100}
                      strokeDashoffset={6 + i * 3}
                      className="stroke-accent"
                    />
                  </svg>
                  <span className="font-mono text-[11px] text-ink">{k}</span>
                  <span className="font-mono text-[9px] text-muted">{v}</span>
                </div>
              ))}
            </div>
            <span className="rounded-full border border-accent/30 px-4 py-1.5 font-mono text-[10px] tracking-wide text-accent2">
              measured on real templates
            </span>
          </div>
        </Frame>
      );

    default:
      // website-development — the flagship: build stack coming together
      return (
        <Frame label="build / from idea to live">
          <div className="flex h-full flex-col gap-2.5">
            {[
              ["01", "Discover", 100],
              ["02", "Design", 88],
              ["03", "Develop", 76],
              ["04", "Optimize", 64],
              ["05", "Launch", 52],
            ].map(([n, name, w], i) => (
              <span
                key={n as string}
                className="flex items-center gap-3 rounded-lg border border-line bg-bg px-3 py-2"
                style={{ width: `${w}%`, opacity: 1 - i * 0.1 }}
              >
                <span className="font-mono text-[10px] text-accent2">{n}</span>
                <span className="text-xs text-muted">{name}</span>
                <span className="ml-auto h-1.5 w-8 rounded bg-accent/60" />
              </span>
            ))}
          </div>
        </Frame>
      );
  }
}
