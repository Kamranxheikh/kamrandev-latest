/* Serves the static export (out/) in production.
   The site is `output: "export"` — `next start` refuses to run it, which is
   exactly how a Node host ends up serving a stale build. This tiny server
   reads PORT from the environment in Node itself, so it behaves the same
   under any shell (Hostinger's Linux runtime, local Windows, anywhere).

   It also owns the host/caching policy the platform layer would otherwise
   need (.htaccess is not welcome in the web-app pipeline):
   - www.mustafadev.org is 301'd to the bare domain — one canonical host,
     matching every canonical tag on the site.
   - HTML always revalidates, so a fresh deployment shows up on refresh;
     the content-hashed build assets are cached forever. */
const http = require("http");
const handler = require("serve-handler");

const PORT = Number(process.env.PORT) || 3000;
const CANONICAL_HOST = "mustafadev.org";

const server = http.createServer((req, res) => {
  const host = String(req.headers.host || "").toLowerCase();
  if (host === `www.${CANONICAL_HOST}`) {
    res.writeHead(301, { Location: `https://${CANONICAL_HOST}${req.url}` });
    res.end();
    return;
  }

  return handler(req, res, {
    public: "out",
    cleanUrls: true,
    trailingSlash: true,
    directoryListing: false,
    headers: [
      {
        source: "_next/static/**",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "**/*.html",
        headers: [{ key: "Cache-Control", value: "public, max-age=0, must-revalidate" }],
      },
    ],
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`mustafadev static export serving on http://0.0.0.0:${PORT}`);
});
