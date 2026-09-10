import Link from "next/link";
import { Reveal } from "@/components/Reveal";

/* `route` is the label of the page each cell links to — printed in the cell so
   the reader knows where the row goes before clicking. */
const types = [
  {
    name: "Business Website",
    desc: "For companies that need a professional digital presence.",
    href: "/website-development/",
    route: "Website Development",
  },
  {
    name: "Service Business",
    desc: "For agencies, consultants and professional services.",
    href: "/website-design/",
    route: "Website Design",
  },
  {
    name: "E-Commerce Store",
    desc: "For businesses selling products online.",
    href: "/woocommerce-development/",
    route: "WooCommerce Development",
  },
  {
    name: "Personal Brand",
    desc: "For professionals, creators and experts.",
    href: "/website-design/",
    route: "Website Design",
  },
  {
    name: "Startup / Web App",
    desc: "For new products, SaaS ideas and AI-powered tools.",
    href: "/web-application-development/",
    route: "Web Application Development",
  },
  {
    name: "Website Redesign",
    desc: "For businesses stuck with an outdated website.",
    href: "/website-redesign/",
    route: "Website Redesign",
  },
];

export function ClientTypes() {
  return (
    <section className="border-t border-line" aria-labelledby="types-heading">
      <div className="container-x section-pad">
        <div className="max-w-3xl">
          <Reveal>
            <p className="label-mono label-mono--accent">
              <span aria-hidden>11 / </span>
              Start Here
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 id="types-heading" className="display mt-5 text-[clamp(2rem,4.6vw,3.6rem)]">
              What kind of website are you building?
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              Pick the closest match — each path explains exactly how I&apos;d approach it.
            </p>
          </Reveal>
        </div>

        {/* Matrix — cells collapse onto a single-hairline lattice via gap-px */}
        <Reveal delay={120}>
          <ul className="cli-matrix mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {types.map((t, i) => (
              <li key={t.name} className="flex bg-bg">
                <Link href={t.href} className="cli-cell">
                  <span className="cli-top">
                    <span className="cli-idx" aria-hidden>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="cli-arrow" aria-hidden>
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                        <path
                          d="M2.5 12.5 12 3M5 3h7v7"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="square"
                        />
                      </svg>
                    </span>
                  </span>
                  <span className="cli-body">
                    <span className="cli-name">{t.name}</span>
                    <span className="cli-desc">{t.desc}</span>
                  </span>
                  <span className="cli-route" aria-hidden>
                    {t.route}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
