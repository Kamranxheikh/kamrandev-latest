import type { CaseStudyContent } from "./types";

// Generated content — reviewed and assembled from the content pipeline.
export const caseStudies: CaseStudyContent[] = [
  {
    "slug": "resumaic",
    "metaTitle": "Resumaic Case Study | AI Resume & Career SaaS Platform",
    "metaDescription": "How I built Resumaic, a full-stack SaaS for AI-powered resume creation, cover letters and ATS analysis — Next.js, Laravel, Node.js, Stripe billing, Google OAuth and ISR with on-demand revalidation.",
    "summary": "Resumaic is a full-stack SaaS platform for AI-powered resume creation, cover letter generation and ATS compatibility analysis. I built the product end to end: a React and Next.js frontend in TypeScript and Tailwind CSS, a Laravel backend with a Node.js microservice for ATS scoring and resume parsing, Stripe subscription billing, Google OAuth, and ISR with on-demand revalidation so content edited in the admin dashboard goes live instantly.",
    "challenge": [
      "A resume builder competes on two fronts at once. The product has to feel fast and reliable while it generates, scores and exports documents, and the marketing side has to rank for the searches job seekers actually make. Both sides live on the same domain, so a slow page or a rebuild that takes minutes hurts the business twice.",
      "The technical brief was demanding for a small team: AI generation for resumes and cover letters, an ATS scoring engine that parses uploaded resumes, subscription billing, social login, and an admin dashboard whose changes should appear on the live site without waiting for a deployment."
    ],
    "strategy": [
      "I split the system by responsibility. The Next.js frontend owns the experience and the SEO surface, the Laravel API owns accounts, billing and content, and a dedicated Node.js microservice owns the heavy parsing and ATS scoring so it can scale and fail independently of the main app.",
      "For content, I chose Incremental Static Regeneration with on-demand revalidation. Public pages are served as static HTML for speed and crawlability, and a revalidation API lets the dashboard purge exactly the pages that changed — no full rebuilds, no stale content."
    ],
    "design": [
      "The interface follows the same rule as the resumes it produces: clear hierarchy, generous spacing and nothing competing with the primary action. The builder is a focused, step-based flow with live preview, so users always see what the AI is producing.",
      "Marketing pages were designed around search intent — a strong headline, a direct explanation of what the tool does, and immediate access to the builder. Tailwind CSS kept the design system consistent between the product and the public site."
    ],
    "development": [
      "The frontend is React and Next.js in TypeScript, with Redux for application state and React Query for server state, caching and background refetching. Tailwind CSS drives the UI. Authentication uses Google OAuth alongside email accounts, and Stripe handles subscription plans, checkout and webhooks.",
      "The Laravel backend exposes a REST API for users, documents, plans and CMS content. The Node.js microservice parses uploaded resumes and computes ATS compatibility scores, called from the API so the frontend never talks to it directly. The frontend deploys to Vercel."
    ],
    "seo": [
      "Every public page ships with dynamic metadata, canonical tags and structured data generated from the CMS, plus an XML sitemap that updates as content is added. Blog and landing pages are pre-rendered through ISR so search engines receive complete HTML.",
      "On-demand revalidation was the key SEO win: editors can fix a title or publish an article and the live page updates within seconds, so the site never serves outdated content to crawlers or users."
    ],
    "performance": [
      "Static generation with ISR gives near-instant first loads on public pages. Inside the app, React Query caching and lazy-loaded components keep interactions responsive while the AI and scoring calls run in the background.",
      "Heavy work — parsing, scoring, document generation — runs server-side in the microservice, keeping the client bundle lean and Core Web Vitals healthy on mobile."
    ],
    "result": [
      "Resumaic launched as a complete SaaS: AI resume and cover letter generation, ATS scoring, subscription billing and an admin dashboard whose changes reflect on the live site instantly. The architecture separates concerns cleanly enough that each part can evolve on its own.",
      "The same patterns — ISR with on-demand revalidation, a typed React frontend, a REST backend and isolated services for heavy work — are what I bring to every SaaS build."
    ]
  },
  {
    "slug": "onlinetoolpot",
    "metaTitle": "OnlineToolPot Case Study | Programmatic SEO for a 130+ Tool Platform",
    "metaDescription": "How I built OnlineToolPot, a Next.js multi-tool platform with programmatic SEO across 130+ tool pages, ISR with revalidation APIs, and a mobile PageSpeed score improved from ~55 to ~90.",
    "summary": "OnlineToolPot is a scalable multi-tool web platform — text tools, file converters, calculators and AI-powered utilities — built with Next.js, React and TypeScript. I designed the programmatic SEO architecture behind 130+ tool pages, implemented ISR with revalidation APIs so admin updates go live instantly, and raised the mobile PageSpeed score from around 55 to around 90.",
    "challenge": [
      "A tool platform lives on organic search. Each of the 130+ tools needs its own page that ranks for its own query, and every one of those pages has to load fast on a phone, because that is where most tool searches happen.",
      "The starting point had two problems. Tool pages were not structured for search at scale, and the mobile PageSpeed score sat around 55 — duplicate icon libraries, eager-loaded components and unoptimized fonts were dragging every page down."
    ],
    "strategy": [
      "I treated the catalogue as a programmatic SEO system rather than a set of hand-built pages. One template, driven by structured tool data, generates a complete page for every tool: title, description, canonical tag, structured data, related tools and content sections.",
      "Performance was tackled as an engineering task with a measurable target. Every fix — dependency cleanup, lazy loading, font optimization — was checked against PageSpeed Insights so the score reflected real improvements, not guesses."
    ],
    "design": [
      "Tool pages follow a consistent layout: the tool itself above the fold, a clear explanation beneath it, and related tools and guides after that. Users get to the tool instantly; search engines get a complete, well-structured page.",
      "The homepage acts as a discovery surface — search, categories and featured tools — with Tailwind CSS keeping the visual system consistent across dozens of tool types."
    ],
    "development": [
      "The platform is Next.js and React in TypeScript, with Redux for shared state and React Query for data fetching and caching. Tool pages are generated with ISR from structured data, and revalidation APIs let the admin dashboard update any page on the live site without a rebuild.",
      "Performance work included removing duplicate icon-library loading, lazy-loading heavier components with next/dynamic, and optimizing font loading — the changes that moved mobile PageSpeed from ~55 to ~90."
    ],
    "seo": [
      "Every tool page ships with dynamic metadata, canonical tags, structured data and internal links to related tools, and the XML sitemap is generated from the same data. That is what makes 130+ pages crawlable and distinct rather than duplicates of each other.",
      "Because pages are pre-rendered and revalidated on demand, search engines always receive fast, complete HTML — the foundation programmatic SEO depends on."
    ],
    "performance": [
      "The mobile PageSpeed score improved from around 55 to around 90 through dependency cleanup, lazy-loaded components and font optimization, with Core Web Vitals — LCP, CLS and TTFB — tracked throughout.",
      "ISR keeps time to first byte low across the whole catalogue, and React Query caching keeps in-app interactions responsive."
    ],
    "result": [
      "OnlineToolPot runs as a single, scalable system: one template and one data model produce 130+ optimized tool pages, admin updates appear instantly, and the platform loads fast on mobile.",
      "Programmatic SEO with ISR is the approach I recommend for any catalogue-style product — it compounds as the catalogue grows instead of fragmenting."
    ]
  },
  {
    "slug": "real-estate-image-qc",
    "metaTitle": "Real-Estate Image QC Case Study | Computer Vision Experiments in Python",
    "metaDescription": "Experimental computer-vision workflows for real-estate photography — dataset preparation, scene classification, image comparison, mask-based analysis and image-quality signals with Python, OpenCV and PyTorch to support AI-assisted quality control.",
    "summary": "An applied computer-vision project for real-estate photography: I developed experimental workflows that prepare and preprocess image datasets, classify scenes, compare edited images against references and analyse image-quality signals — color, exposure, similarity and HDR/enhancement differences — to identify failure cases and support AI-assisted quality-control logic. Built with Python, OpenCV, PyTorch, NumPy, Pandas, Jupyter and Google Colab, and focused on testing and QC rather than production-model training.",
    "challenge": [
      "Real-estate photography goes through editing at volume — exposure correction, HDR blending, color work — and quality control is usually a person comparing the edited image against the original. That is slow, inconsistent and hard to scale across thousands of images.",
      "The question was whether image-quality signals could flag likely failures automatically: over- or under-exposed edits, color shifts, HDR artefacts, or edits that drifted too far from the reference. Before any model is trained, someone has to prove which signals actually separate good edits from bad ones."
    ],
    "strategy": [
      "I treated this as an experimentation and QC problem, not a model-training project. The first job was a clean dataset: collecting edited and reference pairs, preprocessing them consistently and organising them so every experiment ran on the same inputs.",
      "From there I worked signal by signal — scene classification to route images to the right checks, image comparison and similarity to measure drift from the reference, and mask-based analysis to focus on the regions that matter, such as windows and skies where HDR problems show up."
    ],
    "design": [
      "The workflows were designed as reproducible notebooks: each experiment loads the same prepared dataset, computes one family of signals and writes results as tables that can be compared across runs.",
      "Outputs were kept visual wherever possible — side-by-side comparisons, difference maps and masked regions — so failure cases could be inspected by eye and used to refine the QC rules."
    ],
    "development": [
      "Preprocessing, masks and image-quality analysis were built with Python and OpenCV; PyTorch handled scene classification and image-similarity features; NumPy and Pandas managed the numeric signals and result tables. Experiments ran in Jupyter locally and on Google Colab when they needed more compute.",
      "Image-quality checks covered color and exposure statistics, similarity between edited and reference images, and HDR/enhancement differences — the signals that most often explain why an edit fails review."
    ],
    "seo": [
      "This project had no public web surface, so there was no search work. Its value is in the data and the QC logic it produced."
    ],
    "performance": [
      "Benchmarking was part of the work: measuring how each signal performs at separating passing from failing images, and how long each check takes, so the QC logic stays fast enough to run across large batches."
    ],
    "result": [
      "The experiments produced a prepared dataset, a set of reproducible evaluation notebooks and a clear picture of which image-quality signals identify failure cases — the groundwork for AI-assisted QC logic in a real-estate photo pipeline.",
      "It is also where my web and AI work meet: the same discipline of measurable checks that I apply to Core Web Vitals and SEO, applied to images instead of pages."
    ]
  },
  {
    "slug": "ertakcham",
    "metaTitle": "Ertakcham Case Study | Production Content Platform on Next.js",
    "metaDescription": "How I designed and built Ertakcham, a production-grade content platform for a client — SEO architecture, Core Web Vitals optimization, responsive design and scalable components, delivered end to end on Next.js and Vercel.",
    "summary": "Ertakcham is a production content platform I designed and developed as a freelance project for a client in Uzbekistan. The focus was SEO architecture, Core Web Vitals optimization, responsive design and scalable components — delivered end to end, from design through deployment on Vercel.",
    "challenge": [
      "The client needed a content platform that would perform in search and convert visitors, built by one person from design to deployment. It had to be fast on mobile, easy to extend as content grew, and structured so search engines could understand it from day one.",
      "Freelance delivery raises the bar on clarity: with no separate design, development and SEO teams, every decision had to serve all three at once."
    ],
    "strategy": [
      "I started with the SEO architecture — URL structure, page templates and internal linking — before designing a single screen. That kept the design and the code aligned with how the content would be discovered.",
      "Scalable components were a deliberate priority. Reusable sections mean new content and new page types can be added without rebuilding the site."
    ],
    "design": [
      "The design is bold and mobile-first, with clear calls to action and content sections that reuse a small set of components. Consistency across sections keeps the site coherent as it grows.",
      "Layouts were built responsive from the smallest screen up, with images and media sized for each breakpoint."
    ],
    "development": [
      "Built with Next.js and TypeScript, styled with Tailwind CSS and deployed on Vercel. Page templates are component-driven so new content fits the existing system.",
      "Semantic HTML, correct heading structure and optimized assets were part of the build, not a later pass."
    ],
    "seo": [
      "Every page carries purposeful metadata, canonical tags and structured data, with a clean URL structure and internal links that follow the content architecture.",
      "The pre-rendered Next.js output gives search engines complete HTML and fast responses."
    ],
    "performance": [
      "Core Web Vitals were a build requirement: optimized images, no layout shift while loading, and minimal client-side JavaScript on content pages.",
      "Vercel's edge network and Next.js static output keep time to first byte low for the platform's audience."
    ],
    "result": [
      "The client received a production-grade content platform with SEO, performance and responsive design engineered in, delivered end to end by one developer.",
      "It is the same standard I hold on every freelance build: architecture first, then design, then a codebase that can keep growing."
    ]
  },
  {
    "slug": "huckleberrys-restaurant",
    "metaTitle": "Huckleberry's Restaurant Case Study | Local SEO & WordPress Optimization",
    "metaDescription": "How I optimized a UK restaurant's WordPress website for local search: on-page SEO, schema markup, and Google Business Profile alignment, engineered into the site itself.",
    "summary": "Huckleberry's Restaurant is a UK-based restaurant whose WordPress website needed to earn local search visibility, not just exist. I handled local SEO and on-page optimization, implemented schema markup, and aligned the website with the Google Business Profile so search engines could confirm one consistent identity. The work treated the website as the technical foundation of local search, which is how I approach every restaurant build.",
    "challenge": [
      "Restaurants live or die on local search. When someone nearby searches for a place to eat, the results they see are assembled from three sources: the website, the Google Business Profile, and the structured data that connects them. If those three disagree on the name, address, hours, or menu, search engines hedge, and the restaurant loses visibility to competitors whose signals are cleaner.",
      "Huckleberry's Restaurant had a WordPress website, but the site was not doing that connective work. Pages were not structured around the local queries diners actually type, machine-readable data about the business was missing, and the website and Google Business Profile were not telling search engines the same story. The task was to turn the existing site into a coherent local search asset."
    ],
    "strategy": [
      "My strategy for local businesses starts from a simple rule: the website is the source of truth, and everything else must match it. So the first step was an audit of what the site said about the business versus what Google Business Profile said, and what neither said in a form search engines could parse. That produced a concrete list: which pages to optimize, which entities to mark up with schema, and which profile fields to align.",
      "I prioritized the signals that matter most for a restaurant. Location and identity consistency came first, because it underpins every local ranking factor. On-page optimization came second, mapping real pages to real local intent. Schema markup came third, because structured data is how a restaurant tells Google its hours, cuisine, and location without ambiguity. Each layer builds on the one before it."
    ],
    "design": [
      "This project centered on optimization rather than a redesign, so design decisions served findability. A restaurant page has one job: let a hungry visitor confirm this is the right place and act. That means the essentials, location, hours, menu access, and contact, must be visible and consistent, because those are also the elements search engines extract and match against the Google Business Profile.",
      "On restaurant projects I keep page structure deliberately simple. One clear heading hierarchy per page, content organized around what a diner asks before visiting, and no essential information buried in images or sliders where crawlers cannot read it. Clean structure is a design choice that pays out in both usability and rankings."
    ],
    "development": [
      "The site runs on WordPress, which is where I do most of my work, and the optimization was implemented in the build itself rather than bolted on. That means metadata written per page, heading structure corrected in the templates, internal links pointing local queries at the right pages, and schema markup added as structured JSON-LD rather than plugin defaults left on autopilot.",
      "This is the difference between SEO as a service and SEO as engineering. When the markup, the metadata, and the page structure live in the site's code and configuration, they survive content updates and theme changes. I build WordPress sites this way from day one, and on existing sites like this one I retrofit the same standards."
    ],
    "seo": [
      "The SEO work had three threads. First, on-page optimization: page titles and meta descriptions rewritten around genuine local search intent, headings restructured so each page targets a distinct query, and internal linking arranged so authority flows to the pages that need to rank. Second, schema markup: restaurant-specific structured data covering the business identity, location, and operating details, so search engines read facts instead of inferring them.",
      "Third, Google Business Profile alignment. I made the profile and the website consistent, the same name, address, and business details expressed the same way in both places, with the profile linking to the pages that answer the searcher's next question. For a local business this consistency is not cosmetic; it is the trust signal that local rankings are built on. The outcome of the engagement was improved search visibility for the restaurant's local queries."
    ],
    "performance": [
      "Local search rewards fast pages, because most diners search on phones, often on cellular connections, minutes before deciding where to go. My standard on WordPress projects is to treat Core Web Vitals as a requirement: compressed and properly sized images, no render-blocking excess, and a page weight that respects a mobile connection.",
      "I verify rather than assume. Google Search Console and field data show how real visitors experience the site, and I use those tools to confirm that optimization work holds up outside the lab. A restaurant site that loads slowly at 7 p.m. on a Friday is failing at the exact moment it matters most, so that is the scenario I engineer for."
    ],
    "result": [
      "Huckleberry's Restaurant came out of the engagement with a WordPress site that works as a local search asset: pages optimized around real diner intent, restaurant schema in place, and a website and Google Business Profile that finally tell search engines one consistent story. Search visibility for the restaurant improved as those signals took effect.",
      "Just as important is what the work leaves behind. Because the optimization is built into the site's structure, metadata, and markup rather than applied as a surface layer, it persists as the site is updated. That is the standard I hold on every project: the website itself should be the strongest SEO asset the business owns."
    ]
  },
  {
    "slug": "ai-tool-camp",
    "metaTitle": "AI Tool Camp Case Study: SEO for an AI Tools Review Platform",
    "metaDescription": "Keyword strategy, on-page SEO, and content structuring across a large AI tools review catalogue. How I optimize content platforms for organic and AI search.",
    "summary": "AI Tool Camp is a review platform covering AI tools, with a large article catalogue competing in a crowded, fast-moving niche. I ran a large-scale content and SEO program: keyword strategy, on-page optimization, and content structuring built to earn organic visibility across the whole catalogue, including AI-driven search surfaces.",
    "challenge": [
      "AI Tool Camp is a review platform covering AI tools. The category is crowded and it moves fast. New tools launch constantly, publishers chase the same keywords, and a large article catalogue is only an asset if search engines can understand it.",
      "The real problem was scale. Optimizing one article is easy. Optimizing a large catalogue requires a system: consistent structure, a deliberate keyword map, and internal linking that tells search engines which page answers which query. My job was to build that system and apply it across the site."
    ],
    "strategy": [
      "I started with keyword strategy, not content edits. I mapped the catalogue against real search demand using SEMrush, Ahrefs, and Google Search Console data: tool-name queries, category queries, comparison queries, and informational questions. Each article was assigned a primary query and a clear intent, so no two pages competed for the same term.",
      "Then I defined a repeatable on-page standard. At catalogue scale, one-off optimization does not hold up. A documented structure — how titles are written, how headings break down a review, where internal links point — means every article gets the same treatment and future content stays consistent."
    ],
    "design": [
      "My work on this project was content and search, so design here meant content design. A review page has one job: help a reader decide whether a tool fits, fast. That calls for a scannable structure — what the tool does, who it is for, pricing, strengths, limits — in a predictable order on every review.",
      "That structure serves search as much as readers. Clear heading hierarchies and answer-shaped sections are exactly what search engines and AI assistants extract when they cite a source. On a platform like this, good content design and good SEO are the same discipline."
    ],
    "development": [
      "Development effort went where the SEO program needed it: clean, crawlable page structure at scale. That means valid heading hierarchies in the markup, schema markup for articles and reviews, and page structures that enforce the on-page standard instead of relying on editors to remember it.",
      "On a catalogue this size, structure has to live at the template level, not in individual edits. When the standard is baked into how pages are built, every new article ships already optimized. That is my default approach on any large content build."
    ],
    "seo": [
      "On-page work covered the full catalogue: titles and meta descriptions rewritten against the keyword map, heading structures aligned to query intent, and content restructured so each article leads with the answer its target query is asking. I audited the site with Screaming Frog to surface duplication, thin sections, and orphaned pages, then fixed them systematically rather than page by page.",
      "Internal linking carried the strategy. Reviews link to their category pages, comparisons link to the individual reviews they draw on, and informational articles funnel readers to the tools they discuss. I also structured content for AI search surfaces — direct answers near the top, clearly defined entities, explicit comparisons — because discovery in the AI tools niche increasingly happens through AI Overviews and assistants, not just traditional results."
    ],
    "performance": [
      "On a content site, speed is part of search. My standard is to hold every page against Core Web Vitals: fast initial render, stable layout while images and embeds load, and no scripts blocking the main content. A review platform lives or dies on how quickly an article becomes readable.",
      "I monitor field data through Google Search Console rather than relying on one-off lab tests. Field data shows which pages real users experience as slow, and those pages get fixed first."
    ],
    "result": [
      "The engagement delivered a catalogue that works as a system rather than a pile of articles. Every page follows a defined on-page standard, targets a specific query, and connects to the rest of the site through deliberate internal linking. Schema and answer-first structure position the content for both traditional search results and AI-generated answers.",
      "Just as important, the framework outlives the engagement. The keyword map and on-page standard give the platform a repeatable process for every new tool it covers, so the catalogue compounds instead of fragmenting. I do not publish traffic claims I cannot verify; what I can show is the method, and it is the same method I bring to every large content build."
    ]
  },
  {
    "slug": "prophero-real-estate-crm",
    "metaTitle": "Prophero Real Estate CRM — Website Development Case Study",
    "metaDescription": "How I built the website for Prophero, a real estate CRM: clear presentation of a complex software product, with SEO and Core Web Vitals engineered in from day one.",
    "summary": "Prophero is a real estate CRM. My job was the website: take a complex software product and present it clearly enough that a busy agent or brokerage owner understands what it does and why to trust it. This case study covers how I structured, designed, and built that site with SEO and performance engineered in from the start.",
    "challenge": [
      "Software websites usually fail in one of two ways. They drown the visitor in feature lists, or they hide the product behind vague marketing language. A real estate CRM is a genuinely complex product — contact management, pipelines, follow-up workflows — and its buyers are agents and brokerage owners, not software people.",
      "The challenge was translation. The site had to explain what Prophero does in plain terms, make a screenshot-heavy product look credible rather than cluttered, and do it fast, because a visitor comparing CRM options gives each site seconds, not minutes."
    ],
    "strategy": [
      "I started with structure, not visuals. Before any page was designed, I mapped what a prospective buyer needs to know and in what order: the problem the CRM solves, how it works, who it is for, and what to do next. Each page got one job.",
      "Plain language was a deliberate decision. Feature names mean nothing to someone who has never used the product, so every capability is framed as the task it replaces. That same discipline shaped the SEO plan — pages were organized around the questions real estate professionals actually ask when they look for software, which is groundwork you cannot bolt on later."
    ],
    "design": [
      "Presenting software is a framing problem. Product screenshots carry the credibility, so the design gives them room: clean sections, generous spacing, and short captions that tell the visitor what they are looking at. Nothing competes with the product for attention.",
      "The typography and layout follow a strict hierarchy — one idea per section, a clear heading, two or three supporting sentences, then evidence. That restraint is what makes a complex product feel simple. When every element shouts, nothing reads."
    ],
    "development": [
      "I built the site the way I build every product marketing site: WordPress with a controlled, minimal setup. That means reusable templates instead of one-off pages, a short plugin list, and semantic HTML underneath the visual layer, so the markup means something to browsers and crawlers alike.",
      "Deployment followed my standard VPS process — SSL/TLS, server-level caching, automated backups, and security hardening including a web application firewall. A product site is a business asset. It should be as maintainable and as protected as the product it sells."
    ],
    "seo": [
      "SEO was engineered in during the build, not added after. Every page shipped with purposeful metadata, a logical heading structure, clean URLs, and internal links that mirror how a buyer moves from problem to product. Schema markup describes the site's content to search engines in their own vocabulary.",
      "I also structured the content for how search is changing. Answer-ready sections — direct questions, direct answers — give AI-driven search results something they can cite accurately. For a software product, being described correctly in an AI overview matters as much as ranking for a keyword."
    ],
    "performance": [
      "A CRM's website has to feel as fast as the software claims to be. I treated Core Web Vitals as build requirements: images sized and compressed before upload, scripts limited to what each page actually uses, and layouts built so nothing shifts while loading.",
      "Server configuration did the rest — caching at the VPS level, TLS everywhere, and post-launch monitoring through Google Search Console. Speed is not a launch-day number. It is a property you maintain."
    ],
    "result": [
      "Prophero got what a software company actually needs from its website: a clear, credible presentation of a complex product, built on a foundation the team can maintain. The pages explain the CRM in the buyer's language, the markup and schema make it legible to search engines and AI answers, and the infrastructure behind it is secured and backed up.",
      "If you are evaluating a developer for a product site of your own, check exactly these layers: does the page structure match how your buyers think, does the site hold up under a speed test, and is there a real deployment process behind it. That is the standard this build was held to."
    ]
  },
  {
    "slug": "citygate-financial-planning",
    "metaTitle": "Citygate Financial Planning — Website Case Study",
    "metaDescription": "How I built a trust-first WordPress website for a financial planning firm: clear service architecture, enquiry-focused design, and SEO built in from day one.",
    "summary": "Citygate Financial Planning needed a business website that could do what a financial firm's site must do: establish trust quickly, explain services clearly, and turn interest into enquiries. I built it as a WordPress site with a deliberate service architecture, a restrained professional design, and SEO-friendly development baked in from the first template.",
    "challenge": [
      "A financial planning firm sells trust before it sells anything else. Visitors arrive cautious. They are evaluating whether this is a firm they would hand their finances to, and they make that judgment in seconds, from the design, the clarity of the writing, and how easily they can find what the firm actually does. A site that looks generic or buries its services costs the firm enquiries it never sees.",
      "The brief for Citygate Financial Planning was a business website built around exactly that problem: trust-first presentation, a clear service architecture, and a structure where every page moves a serious visitor toward making an enquiry. The site is not a brochure. It is the firm's first meeting with every prospective client."
    ],
    "strategy": [
      "I started with the service architecture, because in financial services that is the site. Each service needed its own clearly defined page rather than a single crowded list, so a visitor looking for one specific thing lands on a page about that thing. That structure serves people first, but it is also what search engines need: one page, one topic, one clear purpose.",
      "The conversion model was deliberately quiet. Financial planning is not an impulse decision, so instead of aggressive pop-ups the strategy was a consistent, low-pressure path to contact: a visible enquiry route on every page, contact details that are easy to find, and copy that answers questions before asking for anything. The measure of success for a site like this is simple — does a qualified visitor know what the firm does and how to reach it."
    ],
    "design": [
      "The design language is restraint. Financial audiences read polish as competence and clutter as risk, so the layout relies on generous white space, a disciplined type hierarchy, and a limited, professional palette. Nothing on the page competes with the content; the firm's credibility is the visual message.",
      "Every template was built responsive from the start. A large share of first visits to a local service business happen on a phone, so navigation, service pages, and enquiry forms were designed and tested at mobile sizes rather than adapted down from desktop as an afterthought."
    ],
    "development": [
      "I built the site on WordPress with Elementor, which gives the firm a professional custom interface and a back end its own team can update without a developer. The build is deliberately lean: only the plugins the site needs, reusable templates for service pages so the structure stays consistent as the firm grows, and clean, semantic markup underneath the page builder.",
      "My standard deployment practice applied here as it does on every build: SSL/TLS configured correctly, scheduled backups, and security hardening at the server level. For a firm whose entire business is trust, a padlock in the address bar and a site that stays up are not optional details."
    ],
    "seo": [
      "SEO on this project was not a phase after launch; it was a property of how the site was built. The service architecture doubles as the keyword architecture — each service page targets the language a real client would search with. After the build I implemented on-page fundamentals across every page: titles and meta descriptions written for humans, a logical heading structure, and internal links that connect related services.",
      "I added structured data so search engines understand the site as a business, not just a set of pages — organization details, services, and contact information marked up in schema. That groundwork is also what newer AI-driven search surfaces draw on, so the site is positioned for how people find firms now, not just how they did five years ago."
    ],
    "performance": [
      "Performance was treated as a trust signal, because for this audience it is one. A financial site that loads slowly reads as a firm that is careless with details. The build followed my standard Core Web Vitals discipline: compressed and properly sized images, no plugin bloat, caching configured at the server, and Elementor used with restraint so the page weight stays honest.",
      "I verify this kind of build against Core Web Vitals thresholds rather than a subjective sense of 'feels fast.' Loading, interactivity, and layout stability are checked page by page, on mobile first, before the site is called done."
    ],
    "result": [
      "Citygate Financial Planning launched with a website that does its actual job: it presents the firm credibly, lays out every service on its own clear page, and gives a prospective client an obvious, low-friction way to enquire. The firm's team can maintain the content themselves, and the site runs on hardened, backed-up infrastructure.",
      "Just as important is what the site is set up to do next. With Search Console and Analytics in place and the SEO groundwork built into the architecture, the firm can see how people find it and which services draw interest — and every future page inherits a structure that was engineered for search from day one."
    ]
  },
  {
    "slug": "rose-wealth",
    "metaTitle": "Rose Wealth Case Study | Financial Services Website Development & SEO",
    "metaDescription": "How I built and optimized the Rose Wealth website: a trust-focused WordPress build for a financial services business, with technical SEO, schema, and Core Web Vitals engineered in from day one.",
    "summary": "Rose Wealth is a financial services business that needed a website capable of earning trust before the first conversation. I handled the project end to end: website development on WordPress and full SEO optimization. The result is a fast, secure, search-ready site where credibility is built into the structure, not bolted on afterward.",
    "challenge": [
      "Financial services is a trust business. Visitors arrive cautious, compare quietly, and leave the moment a site feels slow, generic, or vague about what the firm actually does. Rose Wealth needed a website that could carry that first impression on its own.",
      "The brief covered two jobs that are usually split between vendors: build the website, and make it visible in search. Splitting them is where most projects go wrong, because SEO retrofitted onto a finished build means compromises everywhere. My job was to deliver both as one engineered outcome."
    ],
    "strategy": [
      "My approach on every build, and on this one, is to treat SEO as an input to development rather than a phase after it. Before any design work, I map the site structure around what a prospective client actually checks: what the firm offers, who is behind it, and how to start a conversation. Each service gets its own page with a clear purpose, so search engines and visitors both understand what lives where.",
      "Keyword research shapes that structure from the start. I use tools like SEMrush and Ahrefs to find the terms real prospects use for financial services, then assign one clear topic to each page. That mapping decides the navigation, the headings, and the internal linking before a single section is designed."
    ],
    "design": [
      "For a financial services brand, restraint is the design language. That means a controlled palette, generous whitespace, strong typographic hierarchy, and no decorative noise competing with the message. Every page answers three questions quickly: what is this service, why this firm, and what happens next.",
      "I designed the interface with Elementor Pro, building custom layouts rather than leaning on templates. Service pages are scannable, contact paths are visible from every screen, and the mobile experience is designed first, not adapted later. Trust signals, clear service descriptions, straightforward language, and an obvious way to get in touch are structural, not cosmetic."
    ],
    "development": [
      "The site is built on WordPress with Elementor Pro, kept deliberately lean. I limit plugins to what the site genuinely needs, because every unnecessary plugin is a performance cost and a security surface. Page structure stays clean so the markup search engines crawl matches what visitors see.",
      "Deployment followed my standard infrastructure checklist: SSL/TLS configured correctly, DNS set up cleanly, automated backups in place, and server-level security hardening applied. For a business handling financial relationships, a secure and reliable foundation is not optional, so I treat hosting and server configuration as part of the build, not someone else's problem."
    ],
    "seo": [
      "Once the build was complete, I implemented the full on-page layer: page titles and meta descriptions written for real search intent, a logical heading hierarchy, and internal links that pass relevance between related service pages. Schema markup describes the business and its services in structured data, which helps search engines classify a financial services site correctly and supports richer search results.",
      "I also set up Google Search Console and GA4 so indexing, queries, and visitor behavior are measurable from day one. Content is structured with direct answers and clear entity information, which is how I prepare sites for AI-driven search surfaces like AI Overviews, not just the traditional ten blue links. Technical SEO checks, crawlability, canonical URLs, XML sitemap, and clean URL structure, closed out the process."
    ],
    "performance": [
      "Speed is part of trust, so Core Web Vitals were a build constraint rather than a post-launch fix. I optimize images to modern formats, keep scripts minimal, and configure caching at the server level. The layouts are built to avoid layout shift, and above-the-fold content is prioritized so the largest element renders quickly.",
      "I verify performance against real Core Web Vitals metrics, LCP, CLS, and INP, rather than a single vanity score. A financial services site that loads fast on a mid-range phone over a mobile connection is the standard I build to, because that is where cautious prospects actually make their first judgment."
    ],
    "result": [
      "Rose Wealth launched with a website that does its job: it presents the firm's services clearly, loads fast, runs on hardened infrastructure, and is structured for search visibility from the first crawl. The SEO foundation, keyword-mapped pages, schema, internal linking, and full analytics tracking, was delivered as part of the build, not as a separate engagement.",
      "The honest measure of a project like this is what the client owns at handover. Rose Wealth owns a maintainable WordPress site, a measurable search presence through Search Console and GA4, and a technical foundation that will not need to be rebuilt when the business grows. That is what SEO-driven development means in practice."
    ]
  },
  {
    "slug": "silence-by-k-photos",
    "metaTitle": "Silence by K Photos Case Study | Photography Website Development",
    "metaDescription": "How I built and optimized a business website for Silence by K Photos — a photography brand with image-heavy pages that had to load fast and rank well.",
    "summary": "Silence by K Photos is a photography business whose website is its portfolio, its sales pitch, and its booking channel in one. I built the business website and then focused on the hardest problem photography sites face: keeping image-heavy pages fast. The result is a site where the photography stays front and center without dragging down load times or search visibility.",
    "challenge": [
      "A photography website has a built-in conflict. The images are the product, so they have to look sharp at full quality — but full-quality images are exactly what makes pages slow. Most photography sites pick one side: they either compress the work until it looks flat, or they load beautiful galleries that take seconds to appear and lose visitors before the first photo renders.",
      "Silence by K Photos needed both. The brief was a business website that presents the photography properly and converts visitors into inquiries, on pages that stay fast enough for real-world connections and for Google's Core Web Vitals thresholds. Speed was not a nice-to-have here; on an image-heavy site it is the difference between a portfolio people browse and one they abandon."
    ],
    "strategy": [
      "My approach on projects like this is to treat performance as an architecture decision, not a cleanup task. If image handling, page structure, and hosting are decided before the first gallery is built, optimization is not something you bolt on later — it is how the site works. So the plan started with how images would be sized, compressed, delivered, and loaded, and the design was built around those constraints.",
      "The second decision was scope discipline. A photography business site needs a small number of pages that each do one job: show the work, explain the services, and make contact easy. Fewer, stronger pages are easier to keep fast, easier to maintain, and clearer for search engines to understand."
    ],
    "design": [
      "The design principle was simple: the photographs carry the site, so the interface stays out of their way. That means restrained typography, generous spacing, and layouts where galleries get the full width they deserve. Decoration competes with the work; I removed it.",
      "I built the interface in WordPress with Elementor, structured so that galleries, service sections, and contact points follow a consistent visual rhythm across pages. Everything was built responsive from the start — a photography portfolio gets judged on phones as often as on desktops, and images have to be composed and cropped sensibly at every breakpoint, not just scaled down."
    ],
    "development": [
      "The build is WordPress with a custom Elementor interface, kept deliberately lean. On image-heavy sites, plugin bloat and heavy page builders are where performance quietly dies, so I limit the stack to what the site actually needs and keep templates clean. Page structure, navigation, and contact flows were built so the business can update its portfolio without breaking layout or performance.",
      "Image handling got the most engineering attention. That means serving images in modern compressed formats, generating appropriately sized versions rather than shipping full-resolution files to every screen, lazy-loading everything below the fold, and making sure gallery markup does not block rendering. This is standard practice in my builds, and it matters more here than on any other type of site."
    ],
    "seo": [
      "SEO on this project was engineered into the build rather than added afterward, which is how I work on every site. Each page got clean heading structure, purposeful metadata, descriptive image alt text, and internal linking that connects services to the portfolio work that proves them. On a photography site, image SEO is not an afterthought — properly named, described, and structured images are an additional way the work gets found.",
      "I also implemented schema markup so search engines understand what the business is and what it offers, and set up Google Search Console monitoring so indexing issues surface early instead of silently. The goal is straightforward: when someone searches for the kind of photography this business does, the site should be technically ready to compete."
    ],
    "performance": [
      "Performance optimization was the core of this engagement. I audited the image-heavy pages against Core Web Vitals — Largest Contentful Paint, layout stability, and interactivity — and worked through the causes rather than the symptoms: oversized image payloads, render-blocking assets, missing dimensions that cause layout shift, and uncached responses. Caching and compression were configured at the server level, not just through a plugin.",
      "The test I hold image-heavy pages to is practical: the first meaningful image should appear quickly on an average mobile connection, nothing should jump around while the page loads, and scrolling through a gallery should feel immediate. That is what the optimization work on this site was aimed at, and it is what I verify before calling a build done."
    ],
    "result": [
      "Silence by K Photos now has a business website that does what a photography site must do: present the work at full visual quality on pages engineered to stay fast. The image pipeline, caching, and page structure mean the portfolio can grow without the site slowing down, and the SEO foundation means the work is discoverable, not just displayed.",
      "For the business, the practical outcome is a site they can run — updating galleries and services without touching code — built on infrastructure and markup that will not need rescuing in a year. That is the standard I build to: the launch is the starting point, and the architecture is what keeps it fast after I hand it over."
    ]
  }
];
