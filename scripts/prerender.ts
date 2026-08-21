/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Generates dist/<route>/index.html for every non-home route, patching the
// built dist/index.html's <head> (title, description, canonical, OG/Twitter)
// and injecting page-specific JSON-LD, so crawlers that don't execute JS still
// see correct per-route metadata. The client-side useSeoMeta/useJsonLd hooks
// (src/hooks/useSeoMeta.ts) keep the same tags in sync during SPA navigation.
// Also generates dist/sitemap.xml from the same expanded page list, so it can't
// go stale independently of the actual content (see public/robots.txt for the
// canonical Sitemap: reference — no more hand-edited public/sitemap.xml).
//
// Extend PAGE_META below when a new route group (e.g. blog) gets real content —
// this file is the one place that maps a route to its prerendered <head> content.
// routes.ts is NOT used here for page-content purposes (it only holds nav
// metadata + parameterized path patterns like "/services/:slug", which aren't
// real, concrete URLs) — the services/locations data modules are the source of
// truth for the concrete page list, same as the client routes read them.

import fs from "fs";
import path from "path";
import { faqs, FAQ_TITLE, FAQ_DESCRIPTION } from "../src/data/faqs";
import { services, SERVICES_INDEX_TITLE, SERVICES_INDEX_DESCRIPTION } from "../src/data/services";
import { locations, LOCATIONS_INDEX_TITLE, LOCATIONS_INDEX_DESCRIPTION } from "../src/data/locations";
import { blogPosts } from "../src/data/blog-posts.generated";
import { BLOG_INDEX_TITLE, BLOG_INDEX_DESCRIPTION } from "../src/data/blogMeta";
import { buildFaqPageSchema, buildServiceSchema, buildLocationSchema, buildBlogPostingSchema, buildBreadcrumbSchema } from "../src/lib/schema";

const SITE_URL = "https://www.webwalastudio.com";

interface PageMeta {
  path: string;
  title: string;
  description: string;
  jsonLd: object | object[];
  /** Sitemap priority — defaults to 0.7 if omitted. */
  priority?: string;
  /** Sitemap lastmod — defaults to today's build date if omitted. */
  lastmod?: string;
}

const PAGE_META: PageMeta[] = [
  {
    path: "/faq",
    title: FAQ_TITLE,
    description: FAQ_DESCRIPTION,
    jsonLd: buildFaqPageSchema(faqs),
  },
  {
    path: "/services",
    title: SERVICES_INDEX_TITLE,
    description: SERVICES_INDEX_DESCRIPTION,
    jsonLd: buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]),
    priority: "0.8",
  },
  ...services.map((service): PageMeta => ({
    path: `/services/${service.slug}`,
    title: `${service.heroHeading} | Webwala Studio`,
    description: service.seoDescription,
    jsonLd: [
      buildServiceSchema({ name: service.title, description: service.seoDescription, path: `/services/${service.slug}` }),
      buildBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
        { name: service.title, path: `/services/${service.slug}` },
      ]),
    ],
    priority: "0.8",
  })),
  {
    path: "/locations",
    title: LOCATIONS_INDEX_TITLE,
    description: LOCATIONS_INDEX_DESCRIPTION,
    jsonLd: buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Locations", path: "/locations" }]),
    priority: "0.8",
  },
  ...locations.map((location): PageMeta => ({
    path: `/locations/${location.slug}`,
    title: `${location.heroHeading} | Webwala Studio`,
    description: location.seoDescription,
    jsonLd: [
      buildLocationSchema({ cityName: location.cityName, region: location.region, path: `/locations/${location.slug}`, description: location.seoDescription }),
      buildBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Locations", path: "/locations" },
        { name: location.cityName, path: `/locations/${location.slug}` },
      ]),
    ],
    priority: "0.8",
  })),
  {
    path: "/blog",
    title: BLOG_INDEX_TITLE,
    description: BLOG_INDEX_DESCRIPTION,
    jsonLd: buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }]),
    priority: "0.7",
  },
  ...blogPosts.map((post): PageMeta => ({
    path: `/blog/${post.slug}`,
    title: `${post.title} | Webwala Studio`,
    description: post.metaDescription,
    jsonLd: [
      buildBlogPostingSchema({ title: post.title, description: post.metaDescription, path: `/blog/${post.slug}`, datePublished: post.date }),
      buildBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
        { name: post.title, path: `/blog/${post.slug}` },
      ]),
    ],
    priority: "0.6",
    lastmod: post.date,
  })),
];

const distPath = path.join(process.cwd(), "dist");
const sourceHtmlPath = path.join(distPath, "index.html");

if (!fs.existsSync(sourceHtmlPath)) {
  console.error("prerender: dist/index.html not found — run vite build first.");
  process.exit(1);
}

const sourceHtml = fs.readFileSync(sourceHtmlPath, "utf-8");

// Function replacers only, never string patterns — page copy can contain a literal
// "$" + digits (e.g. "$149"), which String.replace would misread as a backreference.
function swap(html: string, re: RegExp, value: string): string {
  return html.replace(re, (_match, p1: string, p2: string) => p1 + value + p2);
}

for (const page of PAGE_META) {
  const url = `${SITE_URL}${page.path}`;
  let html = sourceHtml;

  html = html.replace(/<title>.*?<\/title>/s, `<title>${page.title}</title>`);
  html = swap(html, /(<meta\s+name="description"\s+content=")[^"]*(")/, page.description);
  html = swap(html, /(<link\s+rel="canonical"\s+href=")[^"]*(")/, url);
  html = swap(html, /(<meta\s+property="og:url"\s+content=")[^"]*(")/, url);
  html = swap(html, /(<meta\s+property="og:title"\s+content=")[^"]*(")/, page.title);
  html = swap(html, /(<meta\s+property="og:description"\s+content=")[^"]*(")/, page.description);
  html = swap(html, /(<meta\s+name="twitter:title"\s+content=")[^"]*(")/, page.title);
  html = swap(html, /(<meta\s+name="twitter:description"\s+content=")[^"]*(")/, page.description);

  const jsonLdEntries = Array.isArray(page.jsonLd) ? page.jsonLd : [page.jsonLd];
  const jsonLdScripts = jsonLdEntries
    .map((entry) => `<script type="application/ld+json">${JSON.stringify(entry)}</script>`)
    .join("\n  ");
  html = html.replace(/<\/head>/, `${jsonLdScripts}\n  </head>`);

  const outDir = path.join(distPath, page.path);
  const outHtmlPath = path.join(outDir, "index.html");
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outHtmlPath, html, "utf-8");
}
console.log(`prerender: wrote ${PAGE_META.length} route(s) under dist/`);

// --- Sitemap ---

const today = new Date().toISOString().slice(0, 10);

const sitemapEntries = [
  { path: "/", priority: "1.0", lastmod: today },
  ...PAGE_META.map((page) => ({ path: page.path, priority: page.priority ?? "0.7", lastmod: page.lastmod ?? today })),
];

const sitemapUrls = sitemapEntries
  .map(({ path: p, priority, lastmod }) => (
    `  <url>\n    <loc>${SITE_URL}${p}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${priority}</priority>\n  </url>`
  ))
  .join("\n");

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls}\n</urlset>\n`;

const sitemapPath = path.join(distPath, "sitemap.xml");
fs.writeFileSync(sitemapPath, sitemapXml, "utf-8");
console.log(`prerender: wrote ${path.relative(process.cwd(), sitemapPath)} (${sitemapEntries.length} urls)`);
