"use client";

import { useEffect, useRef } from "react";

/** Thin accent beam along the very top of the viewport showing how far
    through the article the reader is. Sits above the header glass. */
export function ReadProgress() {
  const barRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const paint = () => {
      raf = 0;
      const doc = document.documentElement;
      const span = doc.scrollHeight - window.innerHeight;
      const p = span > 0 ? Math.min(1, Math.max(0, window.scrollY / span)) : 0;
      bar.style.transform = `scaleX(${p.toFixed(4)})`;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };
    paint();
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
    };
  }, []);

  return (
    <div className="art-progress" aria-hidden>
      <b ref={barRef} />
    </div>
  );
}
