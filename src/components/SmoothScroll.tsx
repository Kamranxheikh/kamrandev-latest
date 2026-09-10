"use client";

import { useEffect } from "react";
import type Lenis from "lenis";

/* Site-wide inertia scrolling (Lenis). Wheel input is eased along an
   exponential curve; touch stays native — phones already scroll smoothly
   and hijacking touch is what makes sites feel broken. Reduced motion
   means no smoothing at all. Elements that scroll internally opt out
   with data-lenis-prevent (the overlay menu panel does). */

export function SmoothScroll() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lenis: Lenis | null = null;
    let rafId = 0;
    let disposed = false;

    (async () => {
      const { default: LenisImpl } = await import("lenis");
      if (disposed) return;
      lenis = new LenisImpl({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        syncTouch: false,
      });
      const raf = (time: number) => {
        lenis!.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    })();

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, []);

  return null;
}
