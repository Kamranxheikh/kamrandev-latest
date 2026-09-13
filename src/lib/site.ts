// Central site configuration — single source of truth for identity, nav and data.
// All facts here come from Muhammad Kamran's resume / existing site. Never invent.

export const site = {
  name: "KamranDev",
  domain: "kamrandev.com",
  url: "https://kamrandev.com",
  person: "Muhammad Kamran",
  /** Primary positioning — software development across AI/ML and the full stack. */
  role: "Software Developer — AI/ML & Full Stack",
  /** Prime expertise inside development; leads every development-side list. */
  devSpecialty: "Next.js",
  tagline: "Websites that look incredible. Built to perform. Designed to be found.",
  description:
    "Muhammad Kamran — software developer in Lahore, Pakistan, working across AI/ML and the full stack. I build modern web applications and AI-enabled products with React, Next.js, TypeScript, Laravel/PHP, REST APIs and SQL, and use Python, OpenCV and PyTorch for applied AI and computer-vision work — with performance, SEO and LLM integration engineered in from day one.",
  email: "kamranshakh841@gmail.com",
  phone: "+92 320 6899684",
  phoneHref: "tel:+923206899684",
  whatsapp: "https://wa.me/923206899684",
  location: { city: "Lahore", region: "Punjab", country: "Pakistan" },
  linkedin: "https://www.linkedin.com/in/kamran-professional/",
  github: "https://github.com/kamrancrossmedia",
  yearsExperience: 2,
  /** Named portfolio projects — every one of them is listed in `projects`. */
  projectsShipped: 20,
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
// footer and the sitemap: web application development (Next.js / React /
// Laravel) leads, AI solutions second, website development and SEO follow.
export const services: ServiceMeta[] = [
  {
    slug: "web-application-development",
    name: "Web Application Development",
    title: "Web Application Development",
    blurb:
      "My core specialty: custom web applications and AI-powered SaaS products built with React, Next.js, TypeScript, Laravel and Node.js.",
    chips: ["Next.js", "React", "Laravel", "AI SaaS"],
  },
  {
    slug: "ai-solutions",
    name: "AI Solutions",
    title: "AI Solutions",
    blurb:
      "AI features built into web apps and SaaS products — LLM/API integration, prompt engineering, AI pipelines and computer-vision workflows with Python, OpenCV and PyTorch — plus AEO/GEO so AI answer engines can cite you.",
    chips: ["LLM Integration", "Computer Vision", "AEO/GEO"],
  },
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
      "WordPress websites built with Elementor Pro, JetEngine and custom code — fast, secure and easy to manage.",
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
// Kamran's own products lead; the earlier portfolio follows unchanged.
export const projects: Project[] = [
  {
    slug: "resumaic",
    name: "Resumaic",
    industry: "AI Career Tools · SaaS",
    role: "Full Stack Developer",
    services: ["SaaS Platform", "AI Features", "Stripe Billing", "ISR & SEO"],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Laravel", "Node.js", "Stripe"],
    blurb:
      "An AI-powered resume and career platform — resume creation, cover letter generation and ATS compatibility analysis, with Stripe subscriptions, Google OAuth and a Node.js scoring microservice.",
    hue: 160,
    caseStudy: true,
  },
  {
    slug: "onlinetoolpot",
    name: "OnlineToolPot",
    industry: "Multi-Tool Platform · Programmatic SEO",
    role: "Full Stack Developer",
    services: ["Web Application", "Programmatic SEO", "Performance"],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Redux", "React Query"],
    blurb:
      "A scalable multi-tool platform — text tools, file converters, calculators and AI utilities — with programmatic SEO across 130+ tool pages and a mobile PageSpeed score lifted from ~55 to ~90.",
    hue: 140,
    caseStudy: true,
  },
  {
    slug: "real-estate-image-qc",
    name: "Real-Estate Image QC",
    industry: "AI · Computer Vision",
    role: "AI / Computer Vision Developer",
    services: ["Computer Vision", "Dataset Preparation", "AI-Assisted QC"],
    stack: ["Python", "OpenCV", "PyTorch", "NumPy", "Pandas", "Jupyter", "Google Colab"],
    blurb:
      "Experimental computer-vision workflows for real-estate photography — scene classification, image comparison, mask-based analysis and image-quality signals (color, exposure, similarity, HDR) to support AI-assisted quality control.",
    hue: 30,
    caseStudy: true,
  },
  {
    slug: "ertakcham",
    name: "Ertakcham",
    industry: "Content Platform · Uzbekistan",
    role: "Freelance Full Stack Developer",
    services: ["Website Development", "SEO Architecture", "Core Web Vitals"],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    blurb:
      "A production-grade content platform for a client — SEO architecture, Core Web Vitals optimization, responsive design and scalable components, delivered end to end from design to deployment.",
    hue: 290,
    caseStudy: true,
  },
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

// Reverse-chronological by start date. Any role ending in "Present" is
// marked current on the timeline.
export const experience = [
  {
    company: "Cross Media Sole",
    role: "Full Stack Developer",
    period: "Jan 2025 — Present",
    points: [
      "Developed and maintained production web applications with React, Next.js, TypeScript and Tailwind CSS — reusable interfaces, with frontend workflows integrated into backend services.",
      "Built and integrated REST APIs with Laravel/PHP and Node.js to support application data flows and full-stack product functionality.",
      "Implemented Incremental Static Regeneration with on-demand revalidation so admin and dashboard updates appear on live pages without full site rebuilds.",
      "Improved mobile PageSpeed from roughly 55 to 90 through dependency cleanup, dynamic component loading and font optimization; implemented technical and programmatic SEO across production pages.",
    ],
  },
  {
    company: "Social Swirl",
    role: "Frontend Developer Intern",
    period: "Aug 2024 — Dec 2024",
    points: [
      "Built reusable React and TypeScript UI components and responsive layouts for social-media management tools during a five-month frontend internship.",
    ],
  },
] as const;

export const techEcosystem = {
  development: [
    "Next.js",
    "React",
    "TypeScript",
    "JavaScript",
    "Python",
    "PHP",
    "SQL",
    "Tailwind CSS",
    "Redux",
    "React Query",
    "Laravel",
    "Node.js",
    "REST APIs",
    "Authentication APIs",
    "MySQL",
    "HTML5",
    "CSS3",
    "WordPress",
    "Elementor Pro",
    "WooCommerce",
    "JetEngine",
  ],
  seo: [
    "On-Page SEO",
    "Programmatic SEO",
    "Dynamic Metadata",
    "Structured Data",
    "XML Sitemaps",
    "Core Web Vitals",
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
    "Vercel",
    "ISR & Revalidation",
    "Git & GitHub",
    "Stripe",
    "Jupyter",
    "Google Colab",
    "Linux",
    "VPS Hosting",
    "DNS",
    "SSL/TLS",
    "WAF",
    "Cloud Hosting",
    "Backups",
    "Server Hardening",
  ],
  aiMl: [
    "Machine Learning",
    "Deep Learning",
    "Computer Vision",
    "OpenCV",
    "PyTorch",
    "Image Processing",
    "Image Segmentation",
    "Image Quality Analysis",
    "Scene Classification",
    "Image Similarity Analysis",
    "HDR / Image Enhancement",
    "Dataset Preparation",
    "Data Preprocessing",
    "Model Evaluation",
    "LLM / API Integration",
    "Prompt Engineering",
    "AI Pipelines",
    "NumPy",
    "Pandas",
  ],
} as const;

export function absoluteUrl(path: string): string {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}
