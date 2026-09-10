import type { MetadataRoute } from "next";
import { services, site } from "@/lib/site";
import { caseStudies } from "@/lib/content/cases";
import { articles } from "@/lib/content/articles";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const statics: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/services/`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/work/`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/process/`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${site.url}/about/`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${site.url}/insights/`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${site.url}/contact/`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${site.url}/${s.slug}/`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const casePages: MetadataRoute.Sitemap = caseStudies.map((c) => ({
    url: `${site.url}/work/${c.slug}/`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  const articlePages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${site.url}/insights/${a.slug}/`,
    lastModified: new Date(a.datePublished),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...statics, ...servicePages, ...casePages, ...articlePages];
}
