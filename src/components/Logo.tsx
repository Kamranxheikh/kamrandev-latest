import type { CSSProperties } from "react";

/* ---------------------------------------------------------------------------
   Brand mark — the faceted K. A bold monogram cut into flat copper facets
   with a short dark extrusion behind it, so it reads as a solid object on
   the dark ground (the same language as the 3D hero). The two arms also
   read as a ">" — the prompt cursor of a developer's terminal.
   Inlined (never an <img>) so it can be sized, keeps its own palette and
   animates without a network round-trip or a flash.
--------------------------------------------------------------------------- */

/** [path, fill, isHighlight] — highlights are the bright facets that drift. */
type Facet = readonly [string, string, 1?];

const MARK: readonly Facet[] = [
  // extrusion (offset copy of the silhouette, dark umber)
  ["M50 34 L106 34 L106 128 L214 34 L250 34 L250 62 L146 152 L250 224 L250 242 L210 242 L106 164 L106 242 L50 242 Z", "#3A2115"],
  // stem — upper and lower facets, split on a diagonal
  ["M40 24 L96 24 L96 128 L40 140 Z", "#E7A37B", 1],
  ["M40 140 L96 128 L96 232 L40 232 Z", "#BC6735"],
  // joint — the small wedge where the arms meet the stem
  ["M96 128 L134 146 L96 156 Z", "#F0B48C", 1],
  // upper arm — outer (bright) and inner (mid) facets
  ["M96 128 L204 24 L240 24 L240 40 L134 146 Z", "#DF956A", 1],
  ["M240 40 L240 56 L142 152 L134 146 Z", "#D37F4E"],
  // lower arm — inner (mid) and outer (dark) facets
  ["M96 156 L134 146 L240 214 L240 226 L206 232 Z", "#9A5B24"],
  ["M134 146 L142 152 L240 226 L240 214 Z", "#B86A31"],
  // cursor diamond — the "full stop" the 3D hero also carries
  ["M232 128 L246 114 L256 128 L246 142 Z", "#FFB86B", 1],
];

/** The mark on its own. Keeps its own palette — a brand mark is not a token. */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 256 256"
      className={`logo-mark ${className}`}
      aria-hidden
      focusable="false"
    >
      {MARK.map(([d, fill, highlight], i) => (
        <path
          key={i}
          d={d}
          fill={fill}
          className={highlight ? "logo-facet" : undefined}
          style={highlight ? ({ "--f": i % 6 } as CSSProperties) : undefined}
        />
      ))}
    </svg>
  );
}

/** Full lockup: mark + "Kamran" with "dev" set small in mono beneath it. */
export function Logo({ size = "md" }: { size?: "md" | "lg" }) {
  const mark = size === "lg" ? "h-12 w-12" : "h-10 w-10";
  const word = size === "lg" ? "text-2xl" : "text-xl";
  const sub = size === "lg" ? "text-[10px]" : "text-[9px]";

  return (
    <span className="logo-lockup flex items-center gap-2.5">
      <LogoMark className={mark} />
      <span className="flex flex-col leading-none">
        <span className={`logo-name ${word} font-semibold tracking-tight text-ink`}>
          Kamran
        </span>
        <span className={`logo-tag ${sub} mt-1 self-start font-mono uppercase text-accent`}>
          dev
        </span>
      </span>
    </span>
  );
}
