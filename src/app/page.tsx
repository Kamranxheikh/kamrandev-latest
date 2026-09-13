import type { Metadata } from "next";
import { HeroMonument } from "@/components/home/HeroMonument";
import { ServicesFlow } from "@/components/home/ServicesFlow";
import { Differentiator } from "@/components/home/Differentiator";
import { ProcessRail } from "@/components/home/ProcessRail";
import { WorkShowcase } from "@/components/home/WorkShowcase";
import { WhyMe } from "@/components/home/WhyMe";
import { TechEcosystem } from "@/components/home/TechEcosystem";
import { SeoAdvantage } from "@/components/home/SeoAdvantage";
import { PerformancePillar } from "@/components/home/PerformancePillar";
import { AiSearch } from "@/components/home/AiSearch";
import { ClientTypes } from "@/components/home/ClientTypes";
import { ExperienceTeaser } from "@/components/home/ExperienceTeaser";
import { InsightsTeaser } from "@/components/home/InsightsTeaser";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: `${site.person} — ${site.role} in Lahore`,
  },
  description:
    "Software developer across AI/ML and the full stack — web applications and AI-enabled products with React, Next.js, TypeScript, Laravel and Node.js, Python for applied AI and computer vision, and SEO built in.",
  alternates: { canonical: "/" },
  openGraph: {
    title: `${site.person} — ${site.role}`,
    description: site.tagline,
    url: "/",
  },
};

const homeJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${site.url}/#service`,
  name: "KamranDev — Full Stack Development & SEO",
  url: site.url,
  // Service order matches `services` in src/lib/site.ts.
  description:
    "Web application development, AI solutions, website development, SEO, WordPress, website design and WooCommerce by Muhammad Kamran.",
  founder: { "@id": `${site.url}/#person` },
  address: {
    "@type": "PostalAddress",
    addressLocality: site.location.city,
    addressRegion: site.location.region,
    addressCountry: "PK",
  },
  areaServed: "Worldwide",
  telephone: site.phone,
  email: `mailto:${site.email}`,
  priceRange: "$$",
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={homeJsonLd} />
      <HeroMonument />
      <ClientTypes />
      <ServicesFlow />
      <Differentiator />
      <ProcessRail />
      <WorkShowcase />
      <WhyMe />
      <TechEcosystem />
      <SeoAdvantage />
      <PerformancePillar />
      <AiSearch />
      <ExperienceTeaser />
      <InsightsTeaser />
      <FinalCta />
    </>
  );
}
