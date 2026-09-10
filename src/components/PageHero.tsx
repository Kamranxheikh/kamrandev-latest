import type { CSSProperties, ReactNode } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";

/* ---------------------------------------------------------------------------
   Shared sub-page hero. Grid ground, a soft corner light, the page's name as
   a huge outlined ghost word, and a staggered CSS entrance (js-gated — the
   no-JS render simply shows everything). An optional right column carries a
   page-specific set piece.
--------------------------------------------------------------------------- */

const rise = (i: number): CSSProperties =>
  ({ "--d": `${i * 110}ms` }) as CSSProperties;

export function PageHero({
  crumbs,
  kicker,
  title,
  lede,
  ghost,
  aside,
  children,
  compact = false,
}: {
  crumbs: { name: string; path: string }[];
  kicker?: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
  /** The huge outlined word behind the hero — the page's name as set dressing. */
  ghost?: string;
  /** Right-column set piece (identity board, screenshot fan, index board…). */
  aside?: ReactNode;
  /** Extra full-width content under the lede (spec strips, CTAs, chips). */
  children?: ReactNode;
  compact?: boolean;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line pt-[72px]">
      <div className="grid-bg absolute inset-0" aria-hidden />
      <div className="ph-glow" aria-hidden />
      {ghost && (
        <span className="ph-ghost" aria-hidden>
          {ghost}
        </span>
      )}

      <div
        className={`container-x relative ${compact ? "py-10 sm:py-20" : "py-14 sm:py-28"}`}
      >
        <div className="ph-rise" style={rise(0)}>
          <Breadcrumbs items={crumbs} />
        </div>

        <div
          className={`mt-8 ${aside ? "grid items-center gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16" : ""}`}
        >
          <div>
            {kicker && (
              <p className="ph-rise label-mono label-mono--accent" style={rise(1)}>
                {kicker}
              </p>
            )}
            <h1
              className={`ph-rise display max-w-4xl text-[clamp(2.4rem,6vw,4.6rem)] ${kicker ? "mt-5" : ""}`}
              style={rise(2)}
            >
              {title}
            </h1>
            {lede && (
              <p
                className="ph-rise mt-6 max-w-2xl text-lg leading-relaxed text-muted"
                style={rise(3)}
              >
                {lede}
              </p>
            )}
            {children && (
              <div className="ph-rise" style={rise(4)}>
                {children}
              </div>
            )}
          </div>

          {aside && (
            <div className="ph-rise" style={rise(4)}>
              {aside}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
