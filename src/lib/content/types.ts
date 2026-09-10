export type ContentSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type ServiceContent = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  heroLede: string;
  intro: string[];
  sections: ContentSection[];
  deliverables: string[];
  faqs: { q: string; a: string }[];
  related: string[];
};

export type CaseStudyContent = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  challenge: string[];
  strategy: string[];
  design: string[];
  development: string[];
  seo: string[];
  performance: string[];
  result: string[];
};

export type ArticleContent = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  datePublished: string;
  sections: ContentSection[];
  keyTakeaways: string[];
  relatedServices: string[];
};
