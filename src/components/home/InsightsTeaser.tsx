import Link from "next/link";
import { articles } from "@/lib/content/articles";
import { services } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";

/** First related service, resolved to its display name — the row's topic tag. */
function topicFor(slugs: readonly string[]): string | null {
  const match = services.find((s) => s.slug === slugs[0]);
  return match ? match.name : null;
}

/** Editorial index — articles as ledger rows, not cards. */
export function InsightsTeaser() {
  const featured = articles.slice(0, 4);
  if (featured.length === 0) return null;

  return (
    <section className="border-t border-line" aria-labelledby="insights-heading">
      <div className="container-x section-pad">
        <SectionHead
          index="12"
          label="Insights"
          id="insights-heading"
          title="Thinking out loud"
          lede="Practical guides on website development, SEO, WordPress and performance — written for people deciding what to build."
          aside={
            <Link href="/insights/" className="btn btn-ghost mb-2">
              All insights
            </Link>
          }
        />

        <div className="mt-16 border-b border-line">
          {featured.map((a, i) => {
            const topic = topicFor(a.relatedServices);
            return (
              <Reveal key={a.slug} delay={i * 80}>
                <Link href={`/insights/${a.slug}/`} className="ins-row group">
                  <span aria-hidden className="ins-num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="ins-body">
                    <h3 className="ins-title">
                      <span className="ins-title-line">{a.title}</span>
                    </h3>
                    <span className="ins-meta label-mono">
                      <time dateTime={a.datePublished}>
                        {a.datePublished.split("-").join(".")}
                      </time>
                      {topic ? <span aria-hidden> · </span> : null}
                      {topic}
                    </span>
                  </div>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 15 15"
                    fill="none"
                    aria-hidden
                    className="ins-arrow shrink-0"
                  >
                    <path
                      d="M2 7.5h10M8.5 3.5l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
