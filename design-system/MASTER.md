# KamranDev Design System — MASTER

Single source of truth for the kamrandev.com rebuild. Every page and component follows this.

## Concept

**"Engineering luxury."** A precision-built dark studio site: Bugatti-grade restraint (huge type,
one subject per screen, deep blacks) fused with a technical laboratory layer (hairline grids,
mono annotations, measurement ticks, live-feeling instrumentation). The site itself is the
portfolio piece: it must *demonstrate* design, performance and SEO — not just claim them.

Signature interaction: a floating CSS-3D browser in the hero that rebuilds itself through the
five build phases — Design → Develop → SEO → Performance → Live — driven by scroll, tilted by
the pointer. No three.js. No blobs, spheres, particles-for-particles'-sake, neon cyberpunk or
purple gradients.

## Color (semantic tokens only — never raw hex in components)

| Token        | Value                  | Use |
|--------------|------------------------|-----|
| `bg`         | `#0d0b0a`              | Page ground |
| `bg2`        | `#12100e`              | Alternate section ground |
| `surface`    | `#1a1714`              | Cards, browser chrome |
| `surface2`   | `#221e1a`              | Hover / raised |
| `line`       | `rgba(243, 236, 226,.09)`| Hairlines, borders |
| `line2`      | `rgba(243, 236, 226,.16)`| Hover borders |
| `ink`        | `#f3ece2`              | Primary text (warm off-white) |
| `muted`      | `#b3aa9d`              | Secondary text (≥ 4.5:1 on bg) |
| `faint`      | `#6b645b`              | Decorative/meta only, never body text |
| `accent`     | `#ff8a3d`              | Brand copper — taken straight from the logo mark |
| `accent2`    | `#ffab73`              | Accent hover / glow tint / emphasized serif words |
| `amber`      | `#e8c872`              | Rare secondary highlight (design phase, warnings) |

Rule: one accent per screen. Amber appears at most once per viewport. Contrast ≥ 4.5:1 for all
text; `faint` only for decorative annotations at ≥ 14px mono uppercase.

## Typography

- **Display + body:** Space Grotesk (400/500/600/700). H1 `clamp(2.8rem, 7.5vw, 6.5rem)`,
  line-height 0.98, letter-spacing −0.03em.
- **Editorial accent:** Instrument Serif *italic* — single emphasized words inside display
  headlines ("incredible", "found"). Never for body.
- **Technical:** JetBrains Mono 400/500 — section labels (`SEC.03 — SERVICES`), metrics, code,
  chips. 11–13px, uppercase, tracking +0.12em.
- Base body 16–18px, line-height 1.6. All fonts via `next/font` (self-hosted, zero CLS).

## Layout

- Max width 1400px, fluid 12-col. Horizontal padding `clamp(1.25rem, 4vw, 4rem)`.
- Section rhythm `clamp(5.5rem, 11vw, 10rem)`. Hairline dividers between sections.
- Every section carries a mono margin annotation: index + name (lab notebook feel).
- Texture: 1px hairline grid at 3–4% opacity + SVG noise at 2%. No raster backgrounds.

## Motion

- Reveals: IntersectionObserver → `opacity/transform` only, 650ms `cubic-bezier(.22,1,.36,1)`,
  60–90ms stagger. Trigger at 12% visibility, once.
- Hero tilt: pointer → rAF-lerped `rotateX/rotateY` ≤ 7°, disabled on touch + reduced-motion.
- Scroll morph: sticky hero track (~280vh desktop). Mobile: auto-cycling phases, no tall track.
- Canvas signal-field: ≤ 44 nodes, DPR cap 1.5, paused off-viewport & when tab hidden,
  skipped under reduced-motion.
- `prefers-reduced-motion`: kill tilt/morph/canvas/marquee; reveals become instant opacity.
- Never animate width/height/top/left. Pause everything off-screen.

## Components

- **Logo:** faceted copper K mark (arms double as a `>` cursor, diamond full stop) + `Kamran` wordmark with
  `dev` set small in mono beneath it, left-aligned. Brackets ease open on hover and blink open
  once every 7s at idle; `dev` tracks wider on hover. All transform-only, killed by reduced-motion.
- **Buttons:** pill. Primary = accent fill + `#2a1200` text. Ghost = hairline border, ink text.
  Min target 44×44. Visible focus ring (`accent`, 2px offset).
- **Cards:** `surface` + hairline border; hover = border→`line2`, translateY(−2px), 200ms.
- **Chips:** mono 11px uppercase, hairline pill.
- **Links:** underline on hover, descriptive anchor text always (SEO).

## Accessibility & performance floors

WCAG AA contrast · keyboard navigable · skip-link · semantic landmarks · one H1/page ·
alt text on all imagery · SVG icons only (no emoji) · 16px+ body · no horizontal scroll ·
CLS < 0.1 · lazy sections · static export (every page pre-rendered HTML).

## Voice

Confident, precise, zero hype-jargon. Short declaratives. "I build websites that look
incredible, load fast, and are built to be found." Never fabricate metrics, reviews or results.
