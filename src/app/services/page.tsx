import type { Metadata } from "next";
import Link from "next/link";
import { services, site } from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";
import { FinalCta } from "@/components/FinalCta";

export const metadata: Metadata = {
  title: "Website Development & SEO Services",
  description:
    "Website development and SEO, WordPress and WooCommerce builds, website design, performance, custom web apps and redesigns — one developer, end to end.",
  alternates: { canonical: "/services/" },
  openGraph: {
    title: "Website Development & SEO Services — MustafaDev",
    description:
      "Website development and SEO, WordPress builds, custom web apps, redesigns and performance optimization.",
    url: "/services/",
  },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services/" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": `${site.url}/services/`,
            url: `${site.url}/services/`,
            name: "Website Development & SEO Services",
            isPartOf: { "@id": `${site.url}/#website` },
          },
        ]}
      />

      <PageHero
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services/" },
        ]}
        ghost="Services"
        kicker="The full index"
        title={
          <>
            Everything a website needs — <em>from one developer</em>
          </>
        }
        lede="Development, SEO, design, performance and infrastructure. WordPress
          is my core development specialty. No vendor chains, no handoffs —
          one person who owns the outcome from the first wireframe to the
          server it runs on."
        aside={
          <nav className="ph-board" aria-label="Jump to a service">
            <p className="ph-board-head">
              <span>Service index</span>
              <b>All engineered together</b>
            </p>
            <ol>
              {services.map((s, i) => (
                <li key={s.slug}>
                  <Link href={`/${s.slug}/`}>
                    <i>{String(i + 1).padStart(2, "0")}</i>
                    <span>{s.name}</span>
                    <b aria-hidden />
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        }
      />

      {/* The numbered ledger with hover preview plates — the homepage original,
          promoted here when the homepage moved to the build line. */}
      <ServicesGrid />

      <FinalCta />
    </>
  );
}
