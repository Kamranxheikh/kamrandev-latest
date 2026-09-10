// Central site configuration — single source of truth for identity, nav and data.
// All facts here come from Fakhar e Mustafa's resume / existing site. Never invent.

export const site = {
  name: "MustafaDev",
  domain: "mustafadev.org",
  url: "https://mustafadev.org",
  person: "Fakhar e Mustafa",
  /** Primary positioning — web development and SEO lead everywhere on the site. */
  role: "Web Developer & SEO Expert",
  /** Prime expertise inside development; leads every development-side list. */
  devSpecialty: "WordPress",
  tagline: "Websites that look incredible. Built to perform. Designed to be found.",
  description:
    "Fakhar e Mustafa — web developer and SEO expert in Lahore, Pakistan. I build high-performance websites and make them rank: web development and technical SEO as one job, with WordPress as my core development specialty, plus WooCommerce, custom builds, Core Web Vitals and AI search visibility engineered in from day one.",
  email: "info@mustafadev.org",
  phone: "+92 313 1483233",
  phoneHref: "tel:+923131483233",
  whatsapp: "https://wa.me/923131483233",
  location: { city: "Lahore", region: "Punjab", country: "Pakistan" },
  linkedin: "https://www.linkedin.com/in/fakharemustafa/",
  yearsExperience: 3,
  /** Total client projects delivered, incl. agency work not listed in `projects`. */
  projectsShipped: 200,
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services/" },
  { label: "Work", href: "/work/" },
  { label: "Process", href: "/process/" },
  { label: "About", href: "/about/" },
  { label: "Insights", href: "/insights/" },
  { label: "Contact", href: "/contact/" },
] as const;

export type ServiceMeta = {
  slug: string;
  /** Short name used in nav/cards */
  name: string;
  /** Full H1 used on the service page */
  title: string;
  /** One-liner for cards + meta descriptions */
  blurb: string;
  /** Mono chip keywords shown on cards */
  chips: string[];
};

// Order is deliberate and drives the services page, the homepage grid, the
// footer and the sitemap: web development and SEO lead, WordPress heads the
// development side, everything else follows.
export const services: ServiceMeta[] = [
  {
    slug: "website-development",
    name: "Website Development",
    title: "Website Development",
    blurb:
      "End-to-end website development — strategy, design, build and launch — engineered for users, search engines and long-term growth.",
    chips: ["Strategy", "Build", "Launch"],
  },
  {
    slug: "seo",
    name: "SEO & AI Search",
    title: "SEO & AI Search Visibility",
    blurb:
      "Technical SEO, on-page SEO, AEO and GEO — so your website is understood by Google and by AI-powered search experiences.",
    chips: ["Technical SEO", "AEO", "GEO"],
  },
  {
    slug: "wordpress-development",
    name: "WordPress Development",
    title: "WordPress Development",
    blurb:
      "My core development specialty: WordPress websites built with Elementor Pro, JetEngine and custom code — fast, secure and easy to manage.",
    chips: ["WordPress", "Elementor Pro", "Custom Code"],
  },
  {
    slug: "website-design",
    name: "Website Design",
    title: "Website Design",
    blurb:
      "Modern, conversion-focused website design shaped around your brand, your users and the action you want visitors to take.",
    chips: ["UI/UX", "Brand", "Conversion"],
  },
  {
    slug: "website-performance",
    name: "Website Performance",
    title: "Website Performance Optimization",
    blurb:
      "Core Web Vitals, speed and asset optimization, caching and server-level tuning — because fast websites win.",
    chips: ["Core Web Vitals", "Speed", "Caching"],
  },
  {
    slug: "woocommerce-development",
    name: "E-Commerce & WooCommerce",
    title: "WooCommerce Development",
    blurb:
      "WooCommerce stores built to sell — fast product pages, clean checkout flows and an SEO-ready catalogue structure.",
    chips: ["WooCommerce", "Online Store", "Checkout"],
  },
  {
    slug: "web-application-development",
    name: "Web Application Development",
    title: "Web Application Development",
    blurb:
      "Custom web applications and AI-based SaaS products built with Next.js, Node.js and modern custom code.",
    chips: ["Next.js", "Node.js", "AI SaaS"],
  },
  {
    slug: "ai-solutions",
    name: "AI Solutions",
    title: "AI Solutions",
    blurb:
      "AI-based SaaS products, AI features built into WordPress and web apps, and AEO/GEO work so AI answer engines can cite you.",
    chips: ["AI SaaS", "Integration", "AEO/GEO"],
  },
  {
    slug: "website-redesign",
    name: "Website Redesign",
    title: "Website Redesign",
    blurb:
      "Transform an outdated website into a modern, fast, conversion-focused experience — without losing the rankings you already have.",
    chips: ["Modernize", "Migrate", "Preserve SEO"],
  },
];

export type Project = {
  slug: string;
  name: string;
  industry: string;
  role: string;
  services: string[];
  stack: string[];
  blurb: string;
  /** Accent hue used by the generated preview art */
  hue: number;
  caseStudy: boolean;
};

// Real projects only (resume + existing portfolio). No invented metrics anywhere.
export const projects: Project[] = [
  {
    slug: "huckleberrys-restaurant",
    name: "Huckleberry's Restaurant",
    industry: "Restaurant · United Kingdom",
    role: "WordPress Developer & Local SEO",
    services: ["Website Development", "Local SEO", "Schema Markup"],
    stack: ["WordPress", "Elementor Pro", "Schema.org"],
    blurb:
      "A UK restaurant website with local SEO built in — structured data, Google Business Profile alignment and search visibility for a physical business.",
    hue: 24,
    caseStudy: true,
  },
  {
    slug: "ai-tool-camp",
    name: "AI Tool Camp",
    industry: "AI Tools · Content Platform",
    role: "SEO & Content Architecture",
    services: ["SEO Strategy", "Content Structure", "On-Page SEO"],
    stack: ["WordPress", "GSC", "Ahrefs"],
    blurb:
      "Large-scale content and SEO architecture for an AI tools review platform — keyword strategy, on-page SEO and content structuring for organic visibility.",
    hue: 152,
    caseStudy: true,
  },
  {
    slug: "prophero-real-estate-crm",
    name: "Prophero Real Estate CRM",
    industry: "Real Estate · SaaS",
    role: "Web Development",
    services: ["Web Application UI", "Website Development"],
    stack: ["WordPress", "Custom Code", "JavaScript"],
    blurb:
      "A real-estate CRM product presence — translating a complex software product into a clear, credible web experience.",
    hue: 210,
    caseStudy: true,
  },
  {
    slug: "citygate-financial-planning",
    name: "Citygate Financial Planning",
    industry: "Financial Services",
    role: "Website Development",
    services: ["Business Website", "Performance"],
    stack: ["WordPress", "Elementor Pro"],
    blurb:
      "A financial planning firm's website — trust-first design, clear service architecture and a professional presence built to convert enquiries.",
    hue: 205,
    caseStudy: true,
  },
  {
    slug: "rose-wealth",
    name: "Rose Wealth",
    industry: "Financial Services",
    role: "WordPress Developer & SEO",
    services: ["Website Development", "SEO"],
    stack: ["WordPress", "Elementor Pro", "GSC"],
    blurb:
      "Financial services website development with SEO optimization — clean structure, fast pages and search-ready content.",
    hue: 340,
    caseStudy: true,
  },
  {
    slug: "silence-by-k-photos",
    name: "Silence by K Photos",
    industry: "Photography · Portfolio",
    role: "Website Development & Performance",
    services: ["Business Website", "Performance Optimization"],
    stack: ["WordPress", "Elementor Pro"],
    blurb:
      "A photography business website where the images stay the hero — image-heavy pages tuned for fast loading and clean presentation.",
    hue: 268,
    caseStudy: true,
  },
  {
    slug: "zillearn",
    name: "Zillearn",
    industry: "Education · E-Learning",
    role: "Custom WordPress Development & SEO",
    services: ["Custom WordPress", "SEO Implementation"],
    stack: ["WordPress", "Custom Code", "PHP"],
    blurb:
      "Custom WordPress development and SEO implementation for an e-learning platform.",
    hue: 190,
    caseStudy: false,
  },
  {
    slug: "aim-counseling",
    name: "Aim Counseling",
    industry: "Health · Professional Services",
    role: "Website Development & Technical SEO",
    services: ["Service Website", "Technical SEO"],
    stack: ["WordPress", "Elementor Pro"],
    blurb:
      "A service-based counseling website with technical SEO improvements — approachable design with a sound crawlable foundation.",
    hue: 165,
    caseStudy: false,
  },
  {
    slug: "alif-ai-solutions",
    name: "Alif AI Solutions",
    industry: "AI · Technology",
    role: "Website Development",
    services: ["Business Website"],
    stack: ["WordPress", "Elementor Pro"],
    blurb:
      "A technology company website for an AI solutions provider — modern, credible and structured for a technical audience.",
    hue: 145,
    caseStudy: false,
  },
  {
    slug: "canaima-electric",
    name: "Canaima Electric",
    industry: "Electrical Services · United States",
    role: "WordPress Development",
    services: ["Business Website", "Lead Generation"],
    stack: ["WordPress", "Elementor Pro"],
    blurb:
      "A residential and commercial electrical services website for an Indiana contractor — services, quote requests and contact flows built to convert calls.",
    hue: 356,
    caseStudy: false,
  },
  {
    slug: "elite-property-management",
    name: "Elite Property Management",
    industry: "Real Estate · United States",
    role: "WordPress Development",
    services: ["Business Website", "Lead Generation"],
    stack: ["WordPress", "Elementor Pro"],
    blurb:
      "A San Diego property management and investments site — clean editorial layout, service breakdowns and rental-evaluation enquiry flow.",
    hue: 205,
    caseStudy: false,
  },
  {
    slug: "faizi-homes-flooring",
    name: "Faizi Homes Flooring",
    industry: "Construction · United Kingdom",
    role: "WordPress Development",
    services: ["Business Website", "Project Gallery"],
    stack: ["WordPress", "Elementor Pro"],
    blurb:
      "A UK flooring and home-extensions company site — services, before/after project gallery and quote requests for a family-run trade business.",
    hue: 215,
    caseStudy: false,
  },
  {
    slug: "future-green-ai",
    name: "Future Green AI",
    industry: "Green Infrastructure · United States",
    role: "WordPress Development",
    services: ["Corporate Website", "Press & Contact"],
    stack: ["WordPress", "Elementor Pro"],
    blurb:
      "A corporate site for a Texas green-infrastructure initiative — data center, waste-to-energy and clean-water programs presented for investors and partners.",
    hue: 110,
    caseStudy: false,
  },
  {
    slug: "grua-plus",
    name: "Grúa Plus",
    industry: "Roadside Assistance · Venezuela",
    role: "WordPress Development",
    services: ["Service Website", "Membership Plans"],
    stack: ["WordPress", "Elementor Pro"],
    blurb:
      "A Spanish-language towing and roadside-assistance membership site for Gran Caracas — plans, coverage and FAQs in a bold two-tone identity.",
    hue: 45,
    caseStudy: false,
  },
  {
    slug: "nrc-freight",
    name: "NRC Freight",
    industry: "Freight & Logistics · United States",
    role: "WordPress Development",
    services: ["Business Website", "Quote Forms"],
    stack: ["WordPress", "Elementor Pro"],
    blurb:
      "A Georgia freight brokerage site — LTL, FTL, flatbed and dry-van services with quote flows engineered toward a 24-hour response promise.",
    hue: 2,
    caseStudy: false,
  },
  {
    slug: "pit-pilot",
    name: "Pit Pilot",
    industry: "Motorsport Events · New Zealand",
    role: "WordPress Development",
    services: ["Events Directory", "Newsletter Signup"],
    stack: ["WordPress", "Elementor Pro"],
    blurb:
      "New Zealand's motorsport and automotive events hub — an events directory with submissions and a weekly event-guide newsletter.",
    hue: 268,
    caseStudy: false,
  },
  {
    slug: "superior-trades",
    name: "Superior Trades",
    industry: "Freight & Logistics · United States",
    role: "WordPress Development",
    services: ["Business Website", "Partner Network"],
    stack: ["WordPress", "Elementor Pro"],
    blurb:
      "A Houston logistics brand connecting shippers and carriers — brokerage, carrier services and contracts presented under one trusted identity.",
    hue: 220,
    caseStudy: false,
  },
  {
    slug: "the-village-events",
    name: "The Village Events",
    industry: "Event Planning · United States",
    role: "WordPress Development",
    services: ["Business Website", "Gallery"],
    stack: ["WordPress", "Elementor Pro"],
    blurb:
      "A Minneapolis event planning and design studio site — soft editorial identity, service showcases, testimonials and a rich event gallery.",
    hue: 95,
    caseStudy: false,
  },
  {
    slug: "tennessee-family-guide",
    name: "The Family Guide",
    industry: "Family Services · United States",
    role: "WordPress Development",
    services: ["Service Website", "Resources & Events"],
    stack: ["WordPress", "Elementor Pro"],
    blurb:
      "An East Tennessee guidance service for estate planning, Medicare and elder care — workshops, resources and consultation booking for families.",
    hue: 25,
    caseStudy: false,
  },
  {
    slug: "webinfites",
    name: "Webinfites",
    industry: "Agency · Client Portfolio",
    role: "SEO Specialist & WordPress Developer",
    services: ["Technical SEO Audits", "Core Web Vitals", "VPS Deployment"],
    stack: ["WordPress", "WooCommerce", "Linux VPS"],
    blurb:
      "Ongoing agency work: technical SEO audits, on-page and off-page optimization, Core Web Vitals improvements and VPS deployments across client websites.",
    hue: 45,
    caseStudy: false,
  },
  {
    slug: "blue-it-technologies",
    name: "Blue-IT Technologies",
    industry: "Agency · International Clients",
    role: "WordPress Developer & SEO Specialist",
    services: ["WordPress Development", "On-Page SEO"],
    stack: ["WordPress", "Elementor Pro", "PHP"],
    blurb:
      "Responsive WordPress websites and custom Elementor interfaces for international clients — development first, then full on-page SEO implementation.",
    hue: 220,
    caseStudy: false,
  },
];

// Reverse-chronological by start date. Employment ran Blue-IT → Webinfites →
// AiPixVisuals; freelancing is a separate track that has run continuously
// since 2023 and overlaps all three. Any role ending in "Present" is marked
// current on the timeline.
export const experience = [
  {
    company: "AiPixVisuals",
    role: "SEO & Marketing Manager",
    period: "Jul 2026 — Present",
    points: [
      "Lead SEO and marketing for AiPixVisuals.",
    ],
  },
  {
    company: "Webinfites",
    role: "SEO Specialist & WordPress Developer",
    period: "Jan 2025 — Jun 2026",
    points: [
      "Develop and maintain WordPress websites with Elementor Pro and WooCommerce; deploy to VPS hosting environments.",
      "Administer VPS servers end-to-end — deployments, DNS, SSL/TLS, backups, security hardening and WAF configuration.",
      "Conduct technical SEO audits and implement on-page and off-page optimization strategies.",
      "Keyword research and competitor analysis with SEMrush, Ahrefs, Moz and Ubersuggest.",
      "Monitor and improve performance via Google Search Console and GA4 — traffic, indexing and ranking trends.",
      "Apply early-stage AEO and GEO practices for visibility in AI-generated search results.",
      "Improve Core Web Vitals, page speed and overall website performance.",
    ],
  },
  {
    company: "Blue-IT Technologies",
    role: "WordPress Developer & SEO Specialist",
    period: "Feb 2024 — Mar 2026",
    points: [
      "Developed responsive WordPress websites and custom Elementor-based interfaces for international clients.",
      "After each build, implemented on-page SEO, metadata optimization, internal linking and schema markup.",
      "Performed technical SEO improvements alongside server maintenance, updates and database administration.",
      "Collaborated with clients to deliver scalable, search-optimized business solutions.",
    ],
  },
  {
    company: "Freelance",
    role: "Web Developer & SEO",
    period: "2023 — Present",
    points: [
      "Independent website development and SEO for direct clients — running continuously since 2023, alongside every agency role above.",
    ],
  },
] as const;

export const techEcosystem = {
  development: [
    "WordPress",
    "Elementor Pro",
    "WooCommerce",
    "JetEngine",
    "Next.js",
    "Node.js",
    "JavaScript",
    "PHP",
    "HTML",
    "CSS",
  ],
  seo: [
    "Google Search Console",
    "GA4",
    "Ahrefs",
    "SEMrush",
    "Screaming Frog",
    "Moz",
    "Ubersuggest",
    "Schema.org",
  ],
  infrastructure: [
    "Linux",
    "VPS Hosting",
    "DNS",
    "SSL/TLS",
    "WAF",
    "Cloud Hosting",
    "Backups",
    "Server Hardening",
  ],
} as const;

export function absoluteUrl(path: string): string {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}
