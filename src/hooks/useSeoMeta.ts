import { useEffect } from "react";

const SITE_URL = "https://www.webwalastudio.com";

interface SeoMetaOptions {
  title: string;
  description: string;
  /** Route path this page lives at, e.g. "/" or "/faq" — used to build the canonical/OG URL. */
  path: string;
}

function swapAttr(el: Element | null, attr: string, value: string): (() => void) | null {
  if (!el) return null;
  const prev = el.getAttribute(attr) ?? "";
  el.setAttribute(attr, value);
  return () => el.setAttribute(attr, prev);
}

/**
 * Keeps document title, meta description, canonical link, and OG/Twitter tags in sync
 * during client-side route navigation. The build-time prerender script (scripts/prerender.ts)
 * patches the same tags statically per route for crawlers that don't execute JS — this hook
 * covers the SPA-navigation case so both paths agree.
 */
export function useSeoMeta({ title, description, path }: SeoMetaOptions) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    const prevTitle = document.title;
    document.title = title;

    const restores = [
      swapAttr(document.querySelector('meta[name="description"]'), "content", description),
      swapAttr(document.querySelector('link[rel="canonical"]'), "href", url),
      swapAttr(document.querySelector('meta[property="og:url"]'), "content", url),
      swapAttr(document.querySelector('meta[property="og:title"]'), "content", title),
      swapAttr(document.querySelector('meta[property="og:description"]'), "content", description),
      swapAttr(document.querySelector('meta[name="twitter:title"]'), "content", title),
      swapAttr(document.querySelector('meta[name="twitter:description"]'), "content", description),
    ];

    return () => {
      document.title = prevTitle;
      restores.forEach((restore) => restore?.());
    };
  }, [title, description, path]);
}

/**
 * Injects one or more JSON-LD <script> tags into <head> for the lifetime of the component.
 * The build-time prerender script injects the same schema statically per route.
 */
export function useJsonLd(schema: object | object[]) {
  const serialized = JSON.stringify(schema);

  useEffect(() => {
    const schemas = Array.isArray(schema) ? schema : [schema];
    const scripts = schemas.map((entry) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.text = JSON.stringify(entry);
      document.head.appendChild(script);
      return script;
    });

    return () => {
      scripts.forEach((script) => document.head.removeChild(script));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serialized]);
}
