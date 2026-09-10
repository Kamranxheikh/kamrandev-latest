import type { Project } from "@/lib/site";
import { ProjectArt } from "@/components/ProjectArt";

/* ---------------------------------------------------------------------------
   A real build in a minimal browser frame — the same chrome the homepage
   gallery ships (wrk- classes in craft.css). Screenshots are 880x1320
   top-of-page crops; on fine pointers the window pans to the second
   screenful on hover (via .wrk-plate ancestor). Projects without a
   screenshot fall back to the drawn preview.
--------------------------------------------------------------------------- */

/** Slugs with a real screenshot in /public/work/. */
const SHOT_SLUGS = new Set([
  "huckleberrys-restaurant",
  "ai-tool-camp",
  "prophero-real-estate-crm",
  "citygate-financial-planning",
  "rose-wealth",
  "alif-ai-solutions",
  "canaima-electric",
  "elite-property-management",
  "faizi-homes-flooring",
  "future-green-ai",
  "grua-plus",
  "nrc-freight",
  "pit-pilot",
  "superior-trades",
  "the-village-events",
  "tennessee-family-guide",
  "silence-by-k-photos",
  "blue-it-technologies",
  "zillearn",
  "webinfites",
  "aim-counseling",
]);

export const hasShot = (slug: string) => SHOT_SLUGS.has(slug);

export function ShotFrame({ project: p }: { project: Project }) {
  if (!hasShot(p.slug)) return <ProjectArt project={p} />;

  return (
    <div className="wrk-frame">
      <div className="wrk-chrome">
        <span className="wrk-dots" aria-hidden>
          <span />
          <span />
          <span />
        </span>
        <span className="wrk-url" aria-hidden>
          <svg width="8" height="10" viewBox="0 0 8 10" fill="none">
            <path
              d="M2 4V2.6A2 2 0 0 1 6 2.6V4"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <rect x="0.5" y="4" width="7" height="5.5" rx="1.2" fill="currentColor" opacity="0.85" />
          </svg>
          <span>
            mustafadev.org<b>/work/{p.slug}</b>
          </span>
        </span>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden className="shrink-0 text-muted">
          <path
            d="M4 1H1v8h8V6M6 1h3v3M9 1 4.5 5.5"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className="wrk-view">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/work/${p.slug}.webp`}
          alt={`${p.name} website — built by Fakhar e Mustafa`}
          width={880}
          height={1320}
          loading="lazy"
          decoding="async"
          className="wrk-shot"
        />
      </div>
    </div>
  );
}
