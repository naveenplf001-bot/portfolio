import type { NextConfig } from "next";
import { fileURLToPath } from "url";
import { dirname } from "path";

const nextConfig: NextConfig = {
  // Pin the workspace root to this folder so the build is fully self-contained
  // and ignores the parent dynamic project's lockfile.
  turbopack: { root: dirname(fileURLToPath(import.meta.url)) },
  // Produce a fully static site (HTML/CSS/JS) in the `out/` folder on build.
  // No Node server, database, or API routes are required to serve it.
  output: "export",
  // The default next/image optimizer needs a server; disable it so plain
  // <img> usage and any static assets work on any static host.
  images: { unoptimized: true },
  // Emit `path/index.html` style routes so the export serves cleanly from
  // static file hosts (e.g. GitHub Pages, S3, nginx, `serve`).
  trailingSlash: true,
  // `next dev` only: allow loading dev resources (the JS that hydrates the
  // page) when the site is opened from another device on the LAN, e.g. a phone
  // at http://192.168.68.118:3000. Without this, Next.js blocks those requests
  // (HTTP 403), so the page can't hydrate and every scroll-reveal section stays
  // invisible/blank. Add your machine's LAN IP(s) here if it changes.
  // This setting has NO effect on the production static export in `out/`.
  allowedDevOrigins: ["192.168.68.118"],
};

export default nextConfig;
