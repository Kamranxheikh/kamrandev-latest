import type { CSSProperties } from "react";

/* ---------------------------------------------------------------------------
   Brand mark — the low-poly wolf. 37 flat facets, mint muzzle through to a
   slate-navy jaw. Inlined (never an <img>) so it can be sized, coloured by the
   file's own palette and animated without a network round-trip or a flash.
--------------------------------------------------------------------------- */

/** [path, fill, isHighlight] — highlights are the mint facets that drift. */
type Facet = readonly [string, string, 1?];

const WOLF: readonly Facet[] = [
  ["M14 150 L44 130 L74 112 L98 102 L106 82 L94 16 L138 64 L150 74 L180 12 L200 86 L208 128 L230 152 L206 170 L234 204 L198 218 L210 250 L148 252 L116 220 L102 190 L84 182 L52 176 L20 168 Z", "#24919A"],
  ["M14 150 L44 130 L66 132 Z", "#6ADFC6", 1],
  ["M44 130 L74 112 L66 132 Z", "#5FDCC2", 1],
  ["M74 112 L96 96 L66 132 Z", "#4ED3B8", 1],
  ["M74 112 L98 102 L96 96 Z", "#7BE7CE", 1],
  ["M14 150 L66 132 L20 168 Z", "#35BCA6"],
  ["M20 168 L66 132 L52 176 Z", "#2FB39A"],
  ["M52 176 L66 132 L84 182 Z", "#2A9E92"],
  ["M84 182 L66 132 L108 140 Z", "#249490"],
  ["M66 132 L96 96 L108 140 Z", "#2FB39A"],
  ["M98 102 L106 82 L96 96 Z", "#6ADFC6", 1],
  ["M106 82 L94 16 L138 64 Z", "#5FDCC2", 1],
  ["M106 82 L138 64 L120 90 Z", "#3FC3AB", 1],
  ["M138 64 L150 74 L120 90 Z", "#35BCA6"],
  ["M150 74 L180 12 L200 86 Z", "#4ED3B8", 1],
  ["M150 74 L200 86 L150 110 Z", "#2FB39A"],
  ["M150 74 L150 110 L120 90 Z", "#29A79C"],
  ["M106 82 L120 90 L96 96 Z", "#4ED3B8", 1],
  ["M96 96 L120 90 L150 110 Z", "#2A8E96"],
  ["M96 96 L150 110 L108 140 Z", "#22798A"],
  ["M200 86 L208 128 L150 110 Z", "#1E7F8C"],
  ["M208 128 L230 152 L150 164 Z", "#1B4C6E"],
  ["M208 128 L150 164 L150 110 Z", "#215C7C"],
  ["M150 110 L150 164 L108 140 Z", "#1E6480"],
  ["M230 152 L206 170 L150 164 Z", "#1E4162"],
  ["M206 170 L234 204 L150 164 Z", "#1A3555"],
  ["M234 204 L198 218 L150 164 Z", "#17304C"],
  ["M198 218 L210 250 L148 252 Z", "#101F36"],
  ["M198 218 L148 252 L150 164 Z", "#142743"],
  ["M148 252 L116 220 L128 196 Z", "#182B4A"],
  ["M148 252 L128 196 L150 164 Z", "#1A3555"],
  ["M116 220 L102 190 L128 196 Z", "#1E4162"],
  ["M102 190 L108 140 L128 196 Z", "#22587A"],
  ["M108 140 L150 164 L128 196 Z", "#1E4A66"],
  ["M84 182 L108 140 L102 190 Z", "#1E7F8C"],
  ["M84 114 L100 118 L86 126 Z", "#0E1117"],
  ["M14 150 L32 156 L20 168 Z", "#0E1117"],
];

/** The wolf on its own. Keeps its own palette — a brand mark is not a token. */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 256 256"
      className={`logo-wolf ${className}`}
      aria-hidden
      focusable="false"
    >
      {WOLF.map(([d, fill, highlight], i) => (
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

/** Full lockup: wolf + "Mustafa" with "dev" set small in mono beneath it. */
export function Logo({ size = "md" }: { size?: "md" | "lg" }) {
  const mark = size === "lg" ? "h-12 w-12" : "h-10 w-10";
  const word = size === "lg" ? "text-2xl" : "text-xl";
  const sub = size === "lg" ? "text-[10px]" : "text-[9px]";

  return (
    <span className="logo-lockup flex items-center gap-2.5">
      <LogoMark className={mark} />
      <span className="flex flex-col leading-none">
        <span className={`logo-name ${word} font-semibold tracking-tight text-ink`}>
          Mustafa
        </span>
        <span className={`logo-tag ${sub} mt-1 self-start font-mono uppercase text-accent`}>
          dev
        </span>
      </span>
    </span>
  );
}
