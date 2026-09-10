import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services, site } from "@/lib/site";
import { serviceContent } from "@/lib/content/services";
import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";
import { ServiceVisual } from "@/components/ServiceVisual";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";
import { FinalCta } from "@/components/FinalCta";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

function getData(slug: string) {
  const meta = services.find((s) => s.slug === slug);
  const content = serviceContent.find((c) => c.slug === slug);
  if (!meta || !content) return null;
  return { meta, content };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = getData(slug);
  if (!data) return {};
  return {
    title: { absolute: `${data.content.metaTitle}` },
    description: data.content.metaDescription,
    alternates: { canonical: `/${slug}/` },
    openGraph: {
      title: data.content.metaTitle,
      description: data.content.metaDescription,
      url: `/${slug}/`,
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const data = getData(slug);
  if (!data) notFound();
  const { meta, content } = data;
  const related = services.filter((s) => content.related.includes(s.slug));

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services/" },
    { name: meta.name, path: `/${slug}/` },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": `${site.url}/${slug}/#service`,
            name: meta.title,
            description: content.metaDescription,
            url: `${site.url}/${slug}/`,
            serviceType: meta.title,
            provider: { "@id": `${site.url}/#person` },
            areaServed: "Worldwide",
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: content.faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line pt-[72px]">
        <div className="grid-bg absolute inset-0" aria-hidden />
        <div className="ph-glow" aria-hidden />
        <div className="container-x relative py-16 sm:py-24">
          <div className="ph-rise" style={{ "--d": "0ms" } as CSSProperties}>
            <Breadcrumbs items={crumbs} />
          </div>
          <div className="mt-8 grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
            <div>
              <p className="ph-rise label-mono label-mono--accent" style={{ "--d": "110ms" } as CSSProperties}>
                Service — {meta.name}
              </p>
              <h1 className="ph-rise display mt-4 text-[clamp(2.3rem,5.4vw,4.2rem)]" style={{ "--d": "220ms" } as CSSProperties}>
                {meta.title}
              </h1>
              <p className="ph-rise mt-6 max-w-xl text-lg leading-relaxed text-muted" style={{ "--d": "330ms" } as CSSProperties}>
                {content.heroLede}
              </p>
              <div className="ph-rise mt-7 flex flex-wrap gap-1.5" style={{ "--d": "420ms" } as CSSProperties}>
                {meta.chips.map((c) => (
                  <span key={c} className="chip">
                    {c}
                  </span>
                ))}
              </div>
              <div className="ph-rise mt-8 flex flex-wrap gap-4" style={{ "--d": "500ms" } as CSSProperties}>
                <Link href="/contact/" className="btn btn-primary">
                  Start Your Website
                </Link>
                <Link href="/work/" className="btn btn-ghost">
                  View My Work
                </Link>
              </div>
            </div>
            <div className="ph-rise" style={{ "--d": "440ms" } as CSSProperties}>
              <TiltCard max={4}>
                <ServiceVisual slug={slug} />
              </TiltCard>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="container-x section-pad !pb-0">
        <div className="max-w-3xl">
          {content.intro.map((p, i) => (
            <Reveal key={i} delay={i * 70}>
              <p className={`leading-relaxed ${i === 0 ? "text-xl text-ink" : "mt-5 text-lg text-muted"}`}>
                {p}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Content sections */}
      <section className="container-x section-pad !pb-0">
        <div className="flex flex-col gap-16 lg:gap-20">
          {content.sections.map((sec, i) => (
            <Reveal key={sec.heading}>
              <div className="grid gap-8 lg:grid-cols-[220px_1fr] lg:gap-16">
                <p className="label-mono label-mono--accent pt-2">
                  {String(i + 1).padStart(2, "0")} / {meta.name}
                </p>
                <div className="max-w-3xl">
                  <h2 className="display text-2xl sm:text-3xl">{sec.heading}</h2>
                  {sec.paragraphs.map((p, j) => (
                    <p key={j} className="mt-5 leading-relaxed text-muted">
                      {p}
                    </p>
                  ))}
                  {sec.bullets && (
                    <ul className="mt-6 flex flex-col gap-3">
                      {sec.bullets.map((b) => (
                        <li key={b} className="flex gap-3 leading-relaxed text-muted">
                          <svg width="15" height="15" viewBox="0 0 14 14" fill="none" aria-hidden className="mt-1.5 shrink-0 text-accent">
                            <path d="M2.5 7.5 5.5 10.5 11.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Deliverables */}
      <section className="container-x section-pad !pb-0" aria-labelledby="deliverables-heading">
        <Reveal>
          <div className="card !bg-surface p-8 sm:p-10">
            <h2 id="deliverables-heading" className="display text-2xl sm:text-3xl">
              What you get
            </h2>
            <ul className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {content.deliverables.map((d) => (
                <li key={d} className="flex gap-3 leading-relaxed">
                  <svg width="15" height="15" viewBox="0 0 14 14" fill="none" aria-hidden className="mt-1.5 shrink-0 text-accent">
                    <path d="M2.5 7.5 5.5 10.5 11.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-muted">{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* FAQ — visible, matching the FAQPage schema */}
      <section className="container-x section-pad !pb-0" aria-labelledby="faq-heading">
        <div className="grid gap-8 lg:grid-cols-[220px_1fr] lg:gap-16">
          <h2 id="faq-heading" className="label-mono label-mono--accent pt-2">
            Questions
          </h2>
          <div className="max-w-3xl">
            {content.faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 60}>
                <details className="group border-b border-line py-2">
                  <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 py-3 text-lg font-medium [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className="shrink-0 text-accent2 transition-transform duration-300 group-open:rotate-45">
                      <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </summary>
                  <p className="pb-5 leading-relaxed text-muted">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Related services */}
      <section className="container-x section-pad" aria-labelledby="related-heading">
        <h2 id="related-heading" className="label-mono mb-6">
          Related services
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {related.map((r) => (
            <Link key={r.slug} href={`/${r.slug}/`} className="card group p-6">
              <h3 className="font-semibold transition-colors group-hover:text-accent2">{r.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{r.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      <FinalCta />
    </>
  );
}
