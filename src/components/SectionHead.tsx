import { Children, isValidElement, type ReactNode } from "react";
import { Reveal } from "@/components/Reveal";

type Props = {
  /** Two-digit ledger index, e.g. "07". */
  index: string;
  label: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  /** id for the h2 so the section can `aria-labelledby` it. */
  id?: string;
  /** Optional right-hand column (a paragraph, a CTA) — two columns from lg up. */
  aside?: ReactNode;
  className?: string;
};

/**
 * Splits a headline into words so each can rise out of its own clip mask.
 * Strings become one span per word; elements (the italic <em>) stay whole so
 * their glyphs are never cut mid-word. `--i` carries the stagger index.
 */
function splitWords(node: ReactNode, counter: { i: number }): ReactNode[] {
  const out: ReactNode[] = [];
  Children.forEach(node, (child) => {
    if (typeof child === "string" || typeof child === "number") {
      const parts = String(child).split(/(\s+)/);
      for (const part of parts) {
        if (!part) continue;
        if (/^\s+$/.test(part)) {
          out.push(" ");
          continue;
        }
        out.push(
          <span className="sw" key={`w${counter.i}`}>
            <span style={{ "--i": counter.i } as React.CSSProperties}>{part}</span>
          </span>,
        );
        counter.i += 1;
      }
    } else if (isValidElement(child)) {
      out.push(
        <span className="sw" key={`e${counter.i}`}>
          <span style={{ "--i": counter.i } as React.CSSProperties}>{child}</span>
        </span>,
      );
      counter.i += 1;
    } else if (child != null) {
      out.push(child);
    }
  });
  return out;
}

/** Standard section opener: mono lab annotation + display headline + lede. */
export function SectionHead({
  index,
  label,
  title,
  lede,
  align = "left",
  id,
  aside,
  className = "",
}: Props) {
  const words = splitWords(title, { i: 0 });
  const head = (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <Reveal>
        <p className="label-mono label-mono--accent">
          <span aria-hidden>{index} / </span>
          {label}
        </p>
      </Reveal>
      <Reveal delay={60} className="reveal-words">
        <h2 id={id} className="display mt-5 text-[clamp(2rem,4.6vw,3.6rem)]">
          {words}
        </h2>
      </Reveal>
      {lede ? (
        <Reveal delay={200}>
          <p className="mt-6 text-lg leading-relaxed text-muted">{lede}</p>
        </Reveal>
      ) : null}
    </div>
  );

  if (!aside) return className ? <div className={className}>{head}</div> : head;

  return (
    <div
      className={`grid gap-x-16 gap-y-8 lg:grid-cols-[1.15fr_1fr] lg:items-end ${className}`}
    >
      {head}
      <Reveal delay={240}>{aside}</Reveal>
    </div>
  );
}
