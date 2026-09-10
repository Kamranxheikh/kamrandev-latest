import Link from "next/link";
import { articles } from "@/lib/content/articles";
import { services } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

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
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-3xl">
            <Reveal>
              <p className="label-mono label-mono--accent">
                <span aria-hidden>13 / </span>
                Insights
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="display mt-5 text-[clamp(2rem,4.6vw,3.6rem)]">
                <span id="insights-heading">Thinking out loud</span>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                Practical guides on website development, SEO, WordPress and
                performance — written for people deciding what to build.
              </p>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <Link href="/insights/" className="btn btn-ghost mb-2">
              All insights
            </Link>
          </Reveal>
        </div>

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
