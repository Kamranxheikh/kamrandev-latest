/* One-off generator: strips helvetiker_bold down to the six glyphs the
   Monument hero actually extrudes (M U S T A F), so the browser fetches a
   few KB instead of the whole alphabet. Output is committed; re-run only
   if the hero word changes:  node scripts/subset-font.js */
const fs = require("fs");
const path = require("path");

const SRC = path.join(__dirname, "helvetiker_bold.typeface.json");
const OUT = path.join(__dirname, "..", "public", "fonts", "monument-glyphs.json");
const KEEP = [...new Set("KAMRAN")];

const src = JSON.parse(fs.readFileSync(SRC, "utf8"));
const glyphs = {};
for (const ch of KEEP) {
  if (!src.glyphs[ch]) throw new Error(`glyph missing from source font: ${ch}`);
  glyphs[ch] = src.glyphs[ch];
}
delete src.original_font_information;
fs.writeFileSync(OUT, JSON.stringify({ ...src, glyphs }));

const kb = (f) => (fs.statSync(f).size / 1024).toFixed(1) + " KB";
console.log(`subset ${KEEP.join("")} → ${OUT}`);
console.log(`  source ${kb(SRC)}  →  subset ${kb(OUT)}`);
