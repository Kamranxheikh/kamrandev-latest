import type { Metadata } from "next";
import { HeroMonument } from "@/components/home/HeroMonument";
import { ValueTrio } from "@/components/home/ValueTrio";
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
    "I build high-performance websites and make them rank — web development and SEO as one job, with WordPress, WooCommerce and custom Next.js builds.",
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
  name: "MustafaDev — Website Development & SEO",
  url: site.url,
  // Service order matches `services` in src/lib/site.ts.
  description:
    "Website development, SEO, WordPress development, SEO-friendly web development, website design, WooCommerce and custom web applications by Fakhar e Mustafa.",
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
      <ValueTrio />
      <ServicesFlow />
      <Differentiator />
      <ProcessRail />
      <WorkShowcase />
      <WhyMe />
      <TechEcosystem />
      <SeoAdvantage />
      <PerformancePillar />
      <AiSearch />
      <ClientTypes />
      <ExperienceTeaser />
      <InsightsTeaser />
      <FinalCta />
    </>
  );
}
