import type { Metadata } from "next";
import Link from "next/link";
import { experience, site, techEcosystem } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import { LogoMark } from "@/components/Logo";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";
import { FinalCta } from "@/components/FinalCta";

export const metadata: Metadata = {
  title: `About — ${site.role} in Lahore`,
  description:
    "Muhammad Kamran: software developer with 2 years of experience building modern web applications and AI-enabled products — React, Next.js, TypeScript, Laravel, REST APIs and SQL, plus Python, OpenCV and PyTorch for applied AI and computer vision. Based in Lahore, working worldwide.",
  alternates: { canonical: "/about/" },
  openGraph: {
    title: "About Muhammad Kamran — KamranDev",
    description: `${site.role}. ${site.yearsExperience} years of building web applications and AI-enabled products, with ${site.devSpecialty}, React and Python as my core stack.`,
    url: "/about/",
  },
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about/" },
];

const skillGroups = [
  {
    name: "Development",
    items: techEcosystem.development,
  },
  {
    name: "SEO & Performance",
    items: [
      "On-Page SEO",
      "Programmatic SEO",
      "Dynamic Metadata",
      "Canonical Tags",
      "Structured Data",
      "XML Sitemaps",
      "Core Web Vitals (LCP, CLS, TTFB)",
      "ISR",
      "On-Demand Revalidation",
      "Technical SEO",
      "Off-Page SEO",
      "Local SEO",
      "Keyword Research",
      "Schema Markup",
      "AEO",
      "GEO",
      "AI Overviews",
    ],
  },
  {
    name: "Tools & Infrastructure",
    items: techEcosystem.infrastructure,
  },
  {
    name: "AI / ML & Computer Vision",
    items: techEcosystem.aiMl,
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "@id": `${site.url}/about/`,
            url: `${site.url}/about/`,
            name: "About Muhammad Kamran",
            mainEntity: { "@id": `${site.url}/#person` },
            isPartOf: { "@id": `${site.url}/#website` },
          },
        ]}
      />

      <PageHero
        crumbs={crumbs}
        ghost="About"
        kicker={`${site.person} · ${site.location.city}, ${site.location.country}`}
        title={
          <>
            I build web applications — <em>and the AI that goes inside them</em>
          </>
        }
        lede={
          <>
            Software developer with {site.yearsExperience} years of experience
            building modern web applications and AI-enabled products. A strong
            full-stack foundation in React, {site.devSpecialty}, TypeScript,
            Laravel/PHP, REST APIs and SQL, with hands-on Python for applied AI
            and computer-vision work. One person, the whole stack — from the
            first component to the API behind it to the model it calls.
          </>
        }
        aside={
          <div className="ab-id" aria-label="Profile summary">
            <div className="ab-id-head">
              <LogoMark className="h-8 w-8" />
              <b>
                Kamran<span className="ml-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-accent2">dev</span>
              </b>
              <span>
                <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                Open to projects
              </span>
            </div>
            <div className="ab-id-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/about/muhammad-kamran-wide.webp"
                alt={`${site.person} — ${site.role}, ${site.location.city}`}
                width={1000}
                height={625}
                loading="eager"
                decoding="async"
              />
              <span className="ab-id-photo-cap" aria-hidden>
                {site.person}
              </span>
            </div>
            <dl className="ab-id-rows">
              {[
                ["Name", site.person],
                ["Role", site.role],
                ["Core stack", `React · ${site.devSpecialty} · TypeScript · Laravel · Python`],
                ["Base", `${site.location.city}, ${site.location.country} — clients worldwide`],
                ["Experience", `${site.yearsExperience}+ years · ${site.projectsShipped}+ projects`],
                ["Education", "BS Information Technology, University of Education, Lahore"],
                ["Certification", "Diploma in Machine Learning & Deep Learning — NAVTTC / CORVIT"],
                ["Languages", "English (fluent) · Urdu (native)"],
              ].map(([k, v]) => (
                <div key={k} className="ab-id-row">
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <div className="ab-id-foot">
              {["Next.js", "React", "Laravel", "Python", "Computer Vision"].map((c) => (
                <span key={c} className="chip">
                  {c}
                </span>
              ))}
            </div>
          </div>
        }
      />

      {/* Story */}
      <section className="container-x section-pad !pb-0">
        <div className="grid gap-8 lg:grid-cols-[220px_1fr] lg:gap-16">
          <p className="label-mono label-mono--accent pt-2">01 / The short version</p>
          <div className="max-w-3xl">
            <p className="text-xl leading-relaxed">
              Most products are built by a frontend team, wired up by a backend
              team, and handed to someone else for the AI part. Every handoff
              loses something.
            </p>
            <p className="mt-5 leading-relaxed text-muted">
              I work across all of it. At Cross Media Sole I develop and
              maintain production applications in React, Next.js, TypeScript
              and Tailwind CSS, build the REST APIs behind them in Laravel/PHP
              and Node.js, and manage state with Redux and React Query. I
              implemented ISR with on-demand revalidation so dashboard changes
              reach live pages instantly, took a mobile PageSpeed score from
              about 55 to about 90, and put technical and programmatic SEO
              across production pages — on OnlineToolPot, that became an
              architecture for more than 130 tool pages.
            </p>
            <p className="mt-5 leading-relaxed text-muted">
              The AI side is hands-on, not theoretical. On Resumaic I shipped
              AI-powered resume and cover-letter generation alongside a Node.js
              microservice for ATS scoring, with Google OAuth and Stripe
              subscriptions. In applied computer vision I developed experimental
              workflows for real-estate photography — dataset preparation,
              scene classification, image comparison, mask-based analysis and
              image-quality signals such as color, exposure, similarity and HDR
              differences — using Python, OpenCV, PyTorch, NumPy, Pandas,
              Jupyter and Google Colab to support AI-assisted quality control.
            </p>
            <p className="mt-5 leading-relaxed text-muted">
              I started with a five-month frontend internship at Social Swirl,
              building reusable React and TypeScript components for social-media
              management tools. Behind that: a BS in Information Technology at
              the University of Education, Lahore, and a diploma in Machine
              Learning and Deep Learning from NAVTTC and CORVIT. I work in
              English (fluent) and Urdu (native).
            </p>
          </div>
        </div>
      </section>

      {/* Experience timeline */}
      <section className="container-x section-pad !pb-0" aria-labelledby="exp-heading">
        <div className="grid gap-8 lg:grid-cols-[220px_1fr] lg:gap-16">
          <h2 id="exp-heading" className="label-mono label-mono--accent pt-2">
            02 / Experience
          </h2>
          <ol className="flex max-w-3xl flex-col gap-12 border-l border-line pl-8">
            {experience.map((job, i) => (
              <Reveal key={job.company} delay={i * 100} as="li">
                <div className="relative">
                  <span
                    aria-hidden
                    className={`absolute -left-[37px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-bg ${
                      job.period.endsWith("Present") ? "bg-accent" : "bg-line2"
                    }`}
                  />
                  <p className="label-mono">{job.period}</p>
                  <h3 className="mt-2 text-2xl font-semibold">{job.company}</h3>
                  <p className="mt-1 text-accent2">{job.role}</p>
                  <ul className="mt-4 flex flex-col gap-2">
                    {job.points.map((pt) => (
                      <li key={pt} className="flex gap-3 leading-relaxed text-muted">
                        <span aria-hidden className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent/70" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Education & certification */}
      <section className="container-x section-pad !pb-0" aria-labelledby="edu-heading">
        <div className="grid gap-8 lg:grid-cols-[220px_1fr] lg:gap-16">
          <h2 id="edu-heading" className="label-mono label-mono--accent pt-2">
            03 / Education
          </h2>
          <ol className="flex max-w-3xl flex-col gap-8 border-l border-line pl-8">
            {[
              {
                period: "2023 — 2026",
                title: "BS Information Technology",
                place: "University of Education, Lahore",
              },
              {
                period: "Sep — Nov 2025",
                title: "Diploma in Machine Learning & Deep Learning",
                place: "NAVTTC — CORVIT",
              },
              {
                period: "2020 — 2022",
                title: "ICS — Intermediate in Computer Science",
                place: "BISE Lahore",
              },
              {
                period: "2018 — 2020",
                title: "Matriculation (Science)",
                place: "BISE Lahore",
              },
            ].map((e, i) => (
              <Reveal key={e.title} delay={i * 80} as="li">
                <div className="relative">
                  <span
                    aria-hidden
                    className="absolute -left-[37px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-bg bg-line2"
                  />
                  <p className="label-mono">{e.period}</p>
                  <h3 className="mt-2 text-xl font-semibold">{e.title}</h3>
                  <p className="mt-1 text-muted">{e.place}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Skills */}
      <section className="container-x section-pad" aria-labelledby="skills-heading">
        <div className="grid gap-8 lg:grid-cols-[220px_1fr] lg:gap-16">
          <h2 id="skills-heading" className="label-mono label-mono--accent pt-2">
            04 / Toolbox
          </h2>
          <div className="grid max-w-3xl gap-5 sm:grid-cols-2">
            {skillGroups.map((g, i) => (
              <Reveal key={g.name} delay={i * 80}>
                <div className="card h-full p-6">
                  <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-accent2">
                    {g.name}
                  </h3>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {g.items.map((s) => (
                      <li key={s} className="chip">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-links */}
      <section className="border-t border-line bg-bg2">
        <div className="container-x flex flex-wrap items-center justify-between gap-6 py-12">
          <p className="text-lg text-muted">
            See how this shows up in practice —{" "}
            <Link href="/work/" className="text-accent2 underline underline-offset-4 hover:text-accent">
              browse my work
            </Link>{" "}
            or{" "}
            <Link href="/process/" className="text-accent2 underline underline-offset-4 hover:text-accent">
              read my process
            </Link>
            .
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={site.github} target="_blank" rel="noopener" className="btn btn-ghost">
              GitHub
            </a>
            <a href={site.linkedin} target="_blank" rel="noopener" className="btn btn-ghost">
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
