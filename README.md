# mustafadev.org — rebuild

Premium personal-brand website for **Fakhar e Mustafa** — web developer & SEO expert
(WordPress is the core development specialty). Built with Next.js 15 (App Router,
TypeScript, Tailwind v4), fully statically
exported: every page is pre-rendered HTML that can be hosted on any server, including a VPS
with plain nginx.

## Commands

```bash
npm run dev     # local development at http://localhost:3000
npm run build   # production build + static export into ./out
```

> Note: stop the dev server before running `npm run build` — they share the `.next` folder.

## What's inside

- **Design system** — `design-system/MASTER.md` is the source of truth (tokens, type,
  motion rules). Colors/typography live in `src/app/globals.css` as semantic tokens.
- **Signature hero** — `src/components/home/Hero.tsx`: a CSS-3D browser that rebuilds
  itself through Design → Develop → SEO → Performance → Live, scroll-driven on desktop,
  auto-cycling on mobile, fully disabled under `prefers-reduced-motion`. No three.js.
- **Content** — `src/lib/site.ts` (identity, services, projects, experience) and
  `src/lib/content/*.ts` (service pages, case studies, articles). All facts come from the
  resume; no fabricated metrics anywhere.
- **SEO** — unique titles/descriptions/canonicals per page, Open Graph + Twitter cards,
  JSON-LD (Person, WebSite, ProfessionalService, Service, FAQPage, Article,
  BreadcrumbList), `sitemap.xml`, `robots.txt`, custom 404, semantic HTML, visible
  breadcrumbs.

## Deploying to a VPS (nginx)

1. `npm run build` — output lands in `out/`.
2. Upload `out/` to the server (e.g. `/var/www/mustafadev`).
3. nginx site config essentials:

```nginx
server {
    listen 443 ssl http2;
    server_name mustafadev.org www.mustafadev.org;
    root /var/www/mustafadev;
    index index.html;

    # trailing-slash URLs resolve to directory index.html automatically
    location / {
        try_files $uri $uri/ /404.html;
    }
    error_page 404 /404.html;

    # cache static assets hard, HTML soft
    location /_next/static/ { expires 1y; add_header Cache-Control "public, immutable"; }
    location ~* \.(png|svg|ico|woff2)$ { expires 30d; }
}
```

4. Redirect `www` → apex (or vice versa) and HTTP → HTTPS at the server level.
5. After DNS cutover: verify the property in Google Search Console, submit
   `https://mustafadev.org/sitemap.xml`, and map any old URLs to their new equivalents
   with 301s in nginx (`rewrite ^/old-path$ /new-path/ permanent;`).

## Editing content

- Services/projects/experience: `src/lib/site.ts`
- Long-form page copy: `src/lib/content/services.ts`, `cases.ts`, `articles.ts`
- Add an insights article: append to `articles.ts` — the route, sitemap entry, listing
  card and Article schema are generated automatically.
