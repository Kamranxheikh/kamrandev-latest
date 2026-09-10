/* Ambient declaration for plain global-stylesheet imports (`import "./x.css"`).
   Next's bundled types only declare `*.module.css`; TypeScript 5.9+ (which
   VS Code bundles) checks side-effect imports for resolvability (ts2882) and
   flags plain .css imports without this. The more specific `*.module.css`
   declarations from Next still win for CSS modules. */
declare module "*.css";
