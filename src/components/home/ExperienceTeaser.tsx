import Link from "next/link";
import { experience, site } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";

const MONTH: Record<string, number> = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
};

/** "Feb 2024" | "2023" → absolute month index (year*12 + month). */
function toMonths(token: string): number {
  const parts = token.trim().split(/\s+/);
  return parts.length === 2
    ? Number(parts[1]) * 12 + (MONTH[parts[0]] ?? 0)
    : Number(parts[0]) * 12;
}

/**
 * The career rail: employment roles as nodes on one horizontal timeline,
 * positioned proportionally by real start date, with the continuous freelance
 * track running beneath as a second, deliberately overlapping rail.
 */
export function ExperienceTeaser() {
  const now = new Date();
  const nowM = now.getFullYear() * 12 + now.getMonth();

  const jobs = experience.map((j) => {
    const [s, e] = j.period.split("—").map((t) => t.trim());
    const start = toMonths(s);
    const end = e === "Present" ? nowM : toMonths(e);
    return { ...j, start, end, current: e === "Present" };
  });

  const t0 = Math.min(...jobs.map((j) => j.start));
  const t1 = Math.max(...jobs.map((j) => j.end));
  const pct = (m: number) => ((m - t0) / (t1 - t0)) * 100;

  // Chronological left→right for the rail; site.ts order (current first) for mobile.
  const employment = jobs
    .filter((j) => String(j.company) !== "Freelance")
    .sort((a, b) => a.start - b.start);
  const employmentRecent = jobs.filter((j) => String(j.company) !== "Freelance");
  const freelance = jobs.find((j) => String(j.company) === "Freelance");

  /* Real start dates can sit only a few months apart, which on a rail a few
     hundred pixels wide puts one label on top of the next. Each node keeps
     its true position unless a neighbour is closer than MIN_GAP, in which
     case it slides right just far enough to clear it. */
  const MIN_GAP = 30;
  const placed = employment.reduce<number[]>((acc, j) => {
    const want = pct(j.start);
    const floor = acc.length ? acc[acc.length - 1] + MIN_GAP : 0;
    acc.push(Math.min(Math.max(want, floor), 100));
    return acc;
  }, []);

  const years: number[] = [];
  for (let y = Math.ceil(t0 / 12); y * 12 <= t1; y++) years.push(y);

  return (
    <section className="border-t border-line bg-bg2" aria-labelledby="exp-heading">
      <div className="container-x section-pad">
        <SectionHead
          index="11"
          label="About"
          id="exp-heading"
          title={
            <>
              {site.yearsExperience} years of building <em>and</em> ranking websites
            </>
          }
          aside={
            <>
              <p className="text-lg leading-relaxed text-muted">
                I&apos;m {site.person} — {site.role} from Lahore, Pakistan, working
                with businesses worldwide. {site.devSpecialty} is my core
                development specialty. Development, technical SEO and server
                infrastructure aren&apos;t three vendors on your invoice.
                They&apos;re one person who owns the outcome.
              </p>
              <Link href="/about/" className="btn btn-ghost mt-8">
                More about me
              </Link>
            </>
          }
        />

        {/* Desktop: horizontal career rail, time-proportional */}
        <div className="xp-rail mt-20 hidden lg:block">
          <Reveal className="xp-deco">
            <div aria-hidden>
              <span className="xp-line" />
              {freelance ? (
                <span
                  className="xp-line-free"
                  style={{ left: `${pct(freelance.start)}%` }}
                />
              ) : null}
              {years.map((y) => (
                <span key={y} className="xp-year" style={{ left: `${pct(y * 12)}%` }}>
                  {y}
                </span>
              ))}
            </div>
          </Reveal>

          <ol className="xp-nodes">
            {employment.map((job, i) => {
              const x = placed[i];
              /* The last node hangs to the left of its dot only when it is
                 far enough along the rail to have room for that. */
              const isEnd = i === employment.length - 1 && x > 60;
              return (
                <li
                  key={job.company}
                  className={`xp-node${isEnd ? " xp-node--end" : ""}`}
                  style={isEnd ? { right: `${100 - x}%` } : { left: `${x}%` }}
                >
                  <Reveal delay={200 + i * 160}>
                    <div className="xp-node-top">
                      <p className="label-mono">{job.period}</p>
                      {job.current ? <span className="chip xp-chip">Current</span> : null}
                    </div>
                    <span
                      aria-hidden
                      className={`xp-dot${job.current ? " xp-dot--live" : ""}`}
                    />
                    <h3 className="xp-role">{job.role}</h3>
                    <p className="xp-co">{job.company}</p>
                  </Reveal>
                </li>
              );
            })}
          </ol>

          {freelance ? (
            <Reveal delay={200 + employment.length * 160} className="xp-free">
              <p className="label-mono">In parallel</p>
              <p className="xp-free-role">
                {freelance.company} · {freelance.role} · {freelance.period}
              </p>
            </Reveal>
          ) : null}
        </div>

        {/* Mobile / tablet: vertical rail, same structure */}
        <div className="xp-vert mt-14 lg:hidden">
          <span aria-hidden className="xp-vline" />
          <span aria-hidden className="xp-vline-free" />
          {freelance ? (
            <span className="xp-vlabel">
              In parallel — {freelance.role} · {freelance.period}
            </span>
          ) : null}
          <ol className="flex flex-col gap-10">
            {employmentRecent.map((job, i) => (
              <Reveal key={job.company} delay={i * 120} as="li" className="xp-vnode">
                <span
                  aria-hidden
                  className={`xp-dot${job.current ? " xp-dot--live" : ""}`}
                />
                <div className="xp-node-top">
                  <p className="label-mono">{job.period}</p>
                  {job.current ? <span className="chip xp-chip">Current</span> : null}
                </div>
                <h3 className="xp-role">{job.role}</h3>
                <p className="xp-co">{job.company}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
