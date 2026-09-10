import type { articles } from "@/lib/content/articles";

type Article = (typeof articles)[number];

/** Honest reading time from an article's actual word count. */
export const readingMinutes = (a: Article) => {
  const words = [
    a.excerpt,
    ...a.sections.flatMap((s) => [...s.paragraphs, ...(s.bullets ?? [])]),
  ]
    .join(" ")
    .split(/\s+/).length;
  return Math.max(2, Math.round(words / 220));
};
