"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees */
  max?: number;
};

/**
 * Pointer-tracked 3D tilt. rAF-lerped, transform-only. Inert on touch
 * devices and under prefers-reduced-motion.
 */
export function TiltCard({ children, className = "", max = 5 }: Props) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    let raf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    let running = false;

    const loop = () => {
      cx += (tx - cx) * 0.1;
      cy += (ty - cy) * 0.1;
      inner.style.transform = `rotateX(${cy}deg) rotateY(${cx}deg)`;
      if (Math.abs(tx - cx) > 0.01 || Math.abs(ty - cy) > 0.01 || running) {
        raf = requestAnimationFrame(loop);
      }
    };
    const onMove = (e: PointerEvent) => {
      const r = outer.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * max * 2;
      ty = -((e.clientY - r.top) / r.height - 0.5) * max * 2;
      if (!running) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
      running = false;
    };

    outer.addEventListener("pointermove", onMove);
    outer.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      outer.removeEventListener("pointermove", onMove);
      outer.removeEventListener("pointerleave", onLeave);
    };
  }, [max]);

  return (
    <div ref={outerRef} className={`persp ${className}`}>
      <div ref={innerRef} className="preserve-3d will-change-transform">
        {children}
      </div>
    </div>
  );
}
