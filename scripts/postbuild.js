/* Mirrors the static export into build/ after every build.
   Hostinger's deployment pipeline has the project pegged as Create React
   App, so it collects the output from `build/` — while Next.js exports to
   `out/`. Rather than depend on anyone keeping the panel's framework
   setting correct, the build simply provides both: `out/` stays the source
   of truth (the local server serves it), `build/` is an exact copy for the
   deploy pipeline to pick up. */
const fs = require("fs");

fs.rmSync("build", { recursive: true, force: true });
fs.cpSync("out", "build", { recursive: true });

const pages = fs.readdirSync("build").filter((f) => f.endsWith(".html")).length;
console.log(`postbuild: mirrored out/ -> build/ for the deploy pipeline (${pages} root html files)`);
