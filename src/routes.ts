/**
 * Single source of truth for top-level route METADATA — drives Navbar.tsx's
 * top-level nav links + active-state highlighting, and (via path only)
 * main.tsx's route registration. Homepage in-page section anchors
 * (Home/Services/Portfolio/Reviews/Pricing) are a separate, homepage-only
 * concern and aren't represented here.
 *
 * Deliberately holds NO component references: main.tsx maps path -> component
 * itself. Navbar imports this module, and Navbar sits underneath every page
 * component (via PageShell) — if this file imported page components directly,
 * any page reachable from here would form an import cycle back to Navbar
 * (routes.ts -> App.tsx -> PageShell.tsx -> Navbar.tsx -> routes.ts), which
 * crashes at runtime with a "Cannot access before initialization" TDZ error.
 *
 * Future route groups (services, locations, blog) get added as entries here —
 * Navbar and the build-time prerender script (scripts/prerender.ts) both read
 * this list, so adding a page type doesn't require touching either by hand.
 */
export type RouteGroup = "home" | "faq" | "services" | "locations" | "blog";

export interface RouteDescriptor {
  path: string;
  group: RouteGroup;
  /** Whether this route gets a top-level Navbar link (homepage is linked via its anchors instead). */
  navVisible: boolean;
  label: string;
}

export const routes: RouteDescriptor[] = [
  { path: "/", group: "home", navVisible: false, label: "Home" },
  { path: "/faq", group: "faq", navVisible: true, label: "FAQs" },
  // Services/Locations aren't top-nav links: the homepage already has a "Services"
  // anchor (/#services) for the on-page teaser, and these SEO landing pages are
  // reached via the Footer's link block and cross-links instead (navVisible: false).
  { path: "/services", group: "services", navVisible: false, label: "Services" },
  { path: "/services/:slug", group: "services", navVisible: false, label: "Services" },
  { path: "/locations", group: "locations", navVisible: false, label: "Locations" },
  { path: "/locations/:slug", group: "locations", navVisible: false, label: "Locations" },
  // Blog IS a top-nav link (unlike Services/Locations) — it's ongoing new
  // content worth browsing directly, not just a search-entry-point landing page.
  { path: "/blog", group: "blog", navVisible: true, label: "Blog" },
  { path: "/blog/:slug", group: "blog", navVisible: false, label: "Blog" },
];

/** Exact match for leaf routes; startsWith for future group roots (e.g. "/blog"). */
export function isActiveRoute(pathname: string, routePath: string): boolean {
  if (routePath === "/") return pathname === "/";
  return pathname === routePath || pathname.startsWith(`${routePath}/`);
}
