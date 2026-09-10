import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles } from "@/lib/content/articles";
import { services, site } from "@/lib/site";
import { readingMinutes } from "@/lib/reading";
import { ReadProgress } from "@/components/ReadProgress";
import { Reveal } from "@/components/Reveal";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";
import { FinalCta } from "@/components/FinalCta";

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: { absolute: article.metaTitle },
    description: article.metaDescription,
    alternates: { canonical: `/insights/${slug}/` },
    openGraph: {
      type: "article",
      title: article.metaTitle,
      description: article.metaDescription,
      url: `/insights/${slug}/`,
      publishedTime: article.datePublished,
      authors: [site.person],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  const related = services.filter((s) => article.relatedServices.includes(s.slug));
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Insights", path: "/insights/" },
    { name: article.title, path: `/insights/${slug}/` },
  ];
  const moreArticles = articles.filter((a) => a.slug !== slug).slice(0, 2);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "Article",
            "@id": `${site.url}/insights/${slug}/#article`,
            headline: article.title,
            description: article.metaDescription,
            datePublished: article.datePublished,
            dateModified: article.datePublished,
            url: `${site.url}/insights/${slug}/`,
            author: { "@id": `${site.url}/#person` },
            publisher: { "@id": `${site.url}/#person` },
            mainEntityOfPage: `${site.url}/insights/${slug}/`,
            inLanguage: "en",
          },
        ]}
      />

      <ReadProgress />

      <article>
        <header className="relative overflow-hidden border-b border-line pt-[72px]">
          <div className="grid-bg absolute inset-0" aria-hidden />
          <div className="ph-glow" aria-hidden />
          <div className="container-x relative py-16 sm:py-20">
            <div className="ph-rise" style={{ "--d": "0ms" } as CSSProperties}>
              <Breadcrumbs items={crumbs} />
            </div>
            <p className="ph-rise ins-meta mt-8" style={{ "--d": "110ms" } as CSSProperties}>
              <i>Guide</i>
              <span>{article.datePublished}</span>
              <span>by {site.person}</span>
              <span>{readingMinutes(article)} min read</span>
            </p>
            <h1
              className="ph-rise display mt-4 max-w-4xl text-[clamp(2.1rem,5vw,3.8rem)]"
              style={{ "--d": "220ms" } as CSSProperties}
            >
              {article.title}
            </h1>
            <p
              className="ph-rise mt-6 max-w-2xl text-lg leading-relaxed text-muted"
              style={{ "--d": "330ms" } as CSSProperties}
            >
              {article.excerpt}
            </p>
          </div>
        </header>

        <div className="container-x section-pad grid gap-14 lg:grid-cols-[1fr_300px]">
          {/* Body */}
          <div className="max-w-3xl">
            {article.sections.map((sec, si) => (
              <Reveal key={sec.heading}>
                <section className="mt-14 first:mt-0">
                  <p className="label-mono label-mono--faint">
                    {String(si + 1).padStart(2, "0")}
                    <span className="text-faint"> / {String(article.sections.length).padStart(2, "0")}</span>
                  </p>
                  <h2 className="display mt-2 text-2xl sm:text-3xl">{sec.heading}</h2>
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
                </section>
              </Reveal>
            ))}
          </div>

          {/* Sidebar */}
          <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
            <div className="card p-6">
              <p className="label-mono label-mono--accent mb-4">Key takeaways</p>
              <ul className="flex flex-col gap-3">
                {article.keyTakeaways.map((t) => (
                  <li key={t} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden className="mt-1 shrink-0 text-accent">
                      <path d="M2.5 7.5 5.5 10.5 11.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-6">
              <p className="label-mono mb-4">Related services</p>
              <ul className="flex flex-col gap-2.5">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link href={`/${r.slug}/`} className="text-sm font-medium text-accent2 hover:text-accent">
                      {r.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-6">
              <p className="label-mono mb-3">Planning a website?</p>
              <p className="text-sm leading-relaxed text-muted">
                I build and rank websites with all of this handled from day one.
              </p>
              <Link href="/contact/" className="btn btn-primary mt-4 w-full text-sm">
                Start Your Project
              </Link>
            </div>
          </aside>
        </div>

        {/* More reading */}
        <div className="container-x pb-20">
          <p className="label-mono mb-6">Keep reading</p>
          <div className="grid gap-4 md:grid-cols-2">
            {moreArticles.map((a) => (
              <Link key={a.slug} href={`/insights/${a.slug}/`} className="card group p-7">
                <p className="label-mono">{a.datePublished}</p>
                <h3 className="mt-3 text-xl font-semibold transition-colors group-hover:text-accent2">
                  {a.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{a.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </article>

      <FinalCta />
    </>
  );
}
