import Link from "next/link";
import { site } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { LogoMark } from "@/components/Logo";

/**
 * Site-wide closing CTA — the closing frame. Registration corner marks draw
 * in at the four corners, a hairline rules itself above the headline, and a
 * single soft light pool sits behind. The last page of the portfolio.
 */
export function FinalCta() {
  return (
    <section
      className="relative overflow-hidden border-t border-line"
      aria-labelledby="cta-heading"
    >
      <div className="grid-bg absolute inset-0" aria-hidden />
      <div className="cta-pool" aria-hidden />
      {/* The mark, bled off the right edge behind the frame — decoration only. */}
      <LogoMark className="logo-watermark logo-watermark--cta" />

      <Reveal className="cta-frame">
        <div aria-hidden>
          <span className="cta-corner cta-corner--tl" />
          <span className="cta-corner cta-corner--tr" />
          <span className="cta-corner cta-corner--br" />
          <span className="cta-corner cta-corner--bl" />
        </div>

        <div className="container-x section-pad relative z-10">
          <Reveal>
            <p className="cta-eyebrow">
              <LogoMark className="cta-mark" />
              <span className="label-mono label-mono--accent">
                <span aria-hidden>13 / </span>
                Next Step
              </span>
            </p>
          </Reveal>

          <div className="cta-rule mt-7" aria-hidden />

          <Reveal delay={80}>
            <h2
              id="cta-heading"
              className="display mt-9 max-w-4xl text-[clamp(2.5rem,6.5vw,5.4rem)]"
            >
              Have an idea for a <em>website</em>?
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
              Let&apos;s turn it into something people remember — and search
              engines can understand.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-10 flex flex-wrap items-center gap-x-9 gap-y-4">
              <Link href="/contact/" className="btn btn-primary">
                Start Your Project
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
                  <path
                    d="M2 7.5h10M8.5 3.5l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <a href={`mailto:${site.email}`} className="cta-mail">
                {site.email}
              </a>
            </div>
          </Reveal>
          <Reveal delay={320}>
            <div className="mt-16 flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-t border-line pt-5">
              <p className="label-mono">
                Usually replies within a day · Lahore, Pakistan · working worldwide
              </p>
              <Link href="/work/" className="cta-worklink label-mono">
                View my work
                <svg width="13" height="13" viewBox="0 0 15 15" fill="none" aria-hidden>
                  <path
                    d="M2 7.5h10M8.5 3.5l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </Reveal>
        </div>
      </Reveal>
    </section>
  );
}
