import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, services, site } from "@/lib/site";
import { caseStudies } from "@/lib/content/cases";
import { ShotFrame, hasShot } from "@/components/ShotFrame";
import { TiltCard } from "@/components/TiltCard";
import { Reveal } from "@/components/Reveal";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";
import { FinalCta } from "@/components/FinalCta";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

type Props = { params: Promise<{ slug: string }> };

function getData(slug: string) {
  const project = projects.find((p) => p.slug === slug);
  const study = caseStudies.find((c) => c.slug === slug);
  if (!project || !study) return null;
  return { project, study };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = getData(slug);
  if (!data) return {};
  return {
    title: { absolute: data.study.metaTitle },
    description: data.study.metaDescription,
    alternates: { canonical: `/work/${slug}/` },
    openGraph: {
      title: data.study.metaTitle,
      description: data.study.metaDescription,
      url: `/work/${slug}/`,
    },
  };
}

const SECTION_ORDER = [
  ["The Challenge", "challenge"],
  ["The Strategy", "strategy"],
  ["The Design", "design"],
  ["The Development", "development"],
  ["The SEO", "seo"],
  ["The Performance", "performance"],
  ["The Result", "result"],
] as const;

// Which services to surface under a case study. Membership only — the display
// order always comes from the `services` array in site.ts.
const SERVICES_BEHIND = new Set([
  "website-development",
  "seo",
  "wordpress-development",
  "website-performance",
]);

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const data = getData(slug);
  if (!data) notFound();
  const { project, study } = data;

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Work", path: "/work/" },
    { name: project.name, path: `/work/${slug}/` },
  ];

  // Next case study for continuous browsing
  const idx = caseStudies.findIndex((c) => c.slug === slug);
  const nextStudy = caseStudies[(idx + 1) % caseStudies.length];
  const nextProject = projects.find((p) => p.slug === nextStudy.slug);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": `${site.url}/work/${slug}/`,
            url: `${site.url}/work/${slug}/`,
            name: study.metaTitle,
            description: study.metaDescription,
            isPartOf: { "@id": `${site.url}/#website` },
            author: { "@id": `${site.url}/#person` },
          },
        ]}
      />

      <section className="relative overflow-hidden border-b border-line pt-[72px]">
        <div className="grid-bg absolute inset-0" aria-hidden />
        <div className="ph-glow" aria-hidden />
        <div className="container-x relative py-16 sm:py-20">
          <div className="ph-rise" style={{ "--d": "0ms" } as CSSProperties}>
            <Breadcrumbs items={crumbs} />
          </div>
          <div className="mt-8 grid items-center gap-12 lg:grid-cols-2">
            <div className="min-w-0">
              <p className="ph-rise label-mono label-mono--accent" style={{ "--d": "110ms" } as CSSProperties}>
                Case study — {project.industry}
              </p>
              <h1 className="ph-rise display mt-4 text-[clamp(2.2rem,5.4vw,4rem)]" style={{ "--d": "220ms" } as CSSProperties}>
                {project.name}
              </h1>
              <p className="ph-rise mt-5 max-w-xl text-lg leading-relaxed text-muted" style={{ "--d": "330ms" } as CSSProperties}>
                {study.summary}
              </p>
              <dl className="ph-rise ph-spec max-w-xl" style={{ "--d": "440ms" } as CSSProperties}>
                {(
                  [
                    ["Role", project.role],
                    ["Services", project.services.join(" · ")],
                    ["Stack", project.stack.join(" · ")],
                  ] as const
                ).map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="ph-rise wrk-plate min-w-0" style={{ "--d": "440ms" } as CSSProperties}>
              <TiltCard max={3}>
                <ShotFrame project={project} />
              </TiltCard>
              {hasShot(project.slug) && (
                <p className="mt-3 text-right font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                  Live build — hover to pan
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="container-x section-pad">
        <div className="flex flex-col gap-16 lg:gap-20">
          {SECTION_ORDER.map(([title, key], i) => {
            const paragraphs = study[key];
            if (!paragraphs || paragraphs.length === 0) return null;
            return (
              <Reveal key={key}>
                <div className="grid gap-6 lg:grid-cols-[220px_1fr] lg:gap-16">
                  <div className="pt-1.5">
                    <p className="label-mono label-mono--accent">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h2 className="mt-2 text-xl font-semibold">{title}</h2>
                  </div>
                  <div className="max-w-3xl">
                    {paragraphs.map((p, j) => (
                      <p key={j} className={`leading-relaxed text-muted ${j > 0 ? "mt-5" : ""}`}>
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Services used → internal links back to service pages */}
        <Reveal>
          <div className="mt-20 border-t border-line pt-10">
            <p className="label-mono mb-5">Services behind this project</p>
            <div className="flex flex-wrap gap-3">
              {services
                .filter((s) => SERVICES_BEHIND.has(s.slug))
                .map((s) => (
                  <Link key={s.slug} href={`/${s.slug}/`} className="btn btn-ghost text-sm">
                    {s.name}
                  </Link>
                ))}
            </div>
          </div>
        </Reveal>

        {/* Next project */}
        {nextProject && (
          <Reveal>
            <Link
              href={`/work/${nextStudy.slug}/`}
              className="card group mt-10 flex items-center justify-between gap-6 overflow-hidden p-8"
            >
              <div>
                <p className="label-mono">Next case study</p>
                <p className="mt-2 text-2xl font-semibold transition-colors group-hover:text-accent2">
                  {nextProject.name}
                </p>
                <p className="label-mono !text-faint mt-2">{nextProject.industry}</p>
              </div>
              <div className="flex shrink-0 items-center gap-6">
                {hasShot(nextProject.slug) && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={`/work/${nextProject.slug}.webp`}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="hidden h-24 w-36 rounded-lg border border-line2 object-cover object-top transition-transform duration-500 group-hover:scale-[1.04] sm:block"
                  />
                )}
                <svg width="24" height="24" viewBox="0 0 15 15" fill="none" aria-hidden className="shrink-0 text-accent2 transition-transform duration-300 group-hover:translate-x-1.5">
                  <path d="M2 7.5h10M8.5 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </Link>
          </Reveal>
        )}
      </section>

      <FinalCta />
    </>
  );
}
