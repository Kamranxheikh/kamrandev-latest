import { Reveal } from "@/components/Reveal";
import type { ReactNode } from "react";

type Props = {
  index: string;
  label: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
};

/** Standard section opener: mono lab annotation + display headline + lede. */
export function SectionHead({ index, label, title, lede, align = "left" }: Props) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <Reveal>
        <p className="label-mono label-mono--accent">
          <span aria-hidden>{index} / </span>
          {label}
        </p>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="display mt-5 text-[clamp(2rem,4.6vw,3.6rem)]">{title}</h2>
      </Reveal>
      {lede ? (
        <Reveal delay={160}>
          <p className="mt-6 text-lg leading-relaxed text-muted">{lede}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
