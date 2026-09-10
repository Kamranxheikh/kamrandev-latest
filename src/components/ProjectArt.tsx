import type { Project } from "@/lib/site";

/**
 * Stylized, CSS-generated website preview for a project — no fake
 * screenshots, no image weight. Each project gets its own hue so the
 * portfolio reads varied but cohesive.
 */
export function ProjectArt({ project }: { project: Project }) {
  const h = project.hue;
  return (
    <div
      aria-hidden
      className="relative overflow-hidden rounded-xl border border-line bg-surface"
    >
      {/* chrome */}
      <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
        <span className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-line2" />
          <span className="h-2 w-2 rounded-full bg-line2" />
          <span className="h-2 w-2 rounded-full bg-line2" />
        </span>
        <span className="ml-1 h-4 flex-1 rounded-full bg-bg" />
      </div>
      {/* page */}
      <div className="relative aspect-[16/10] p-5 sm:p-6">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: `radial-gradient(120% 90% at 80% 0%, hsl(${h} 70% 22% / 0.55), transparent 55%)`,
          }}
        />
        <div className="relative flex h-full flex-col">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: `hsl(${h} 75% 55%)` }} />
              <span className="h-2 w-14 rounded bg-ink/50" />
            </span>
            <span className="flex gap-2">
              <span className="h-1.5 w-8 rounded bg-line2" />
              <span className="h-1.5 w-8 rounded bg-line2" />
              <span className="h-1.5 w-8 rounded bg-line2" />
            </span>
          </div>
          <div className="mt-auto flex flex-col gap-2.5 pb-4">
            <span className="h-3.5 w-3/5 rounded bg-ink/70" />
            <span className="h-3.5 w-2/5 rounded bg-ink/40" />
            <span
              className="mt-1 h-6 w-24 rounded-full"
              style={{ background: `hsl(${h} 70% 50%)`, opacity: 0.9 }}
            />
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="h-10 rounded-md border border-line sm:h-14"
                style={{
                  background: `linear-gradient(150deg, hsl(${h} 45% ${18 - i * 3}% / 0.9), hsl(${h} 40% 9%))`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
