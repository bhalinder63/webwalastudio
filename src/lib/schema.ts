const SITE_URL = "https://www.webwalastudio.com";
const SITE_NAME = "Webwala Studio";
const LOGO_URL = `${SITE_URL}/logo.png`;
const PHONE = "+91-98187-26094";
const EMAIL = "support@webwalastudio.com";
const PRICE_RANGE = "₹12,000 - ₹55,000";

const NCR_CITIES = ["Gurugram", "Delhi", "Noida", "Faridabad", "Ghaziabad"];

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export interface FaqEntry {
  q: string;
  a: string;
}

export function buildFaqPageSchema(faqs: FaqEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

export interface ServiceSchemaInput {
  name: string;
  description: string;
  path: string;
}

export function buildServiceSchema({ name, description, path }: ServiceSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    name: `${name} — ${SITE_NAME}`,
    description,
    url: `${SITE_URL}${path}`,
    provider: {
      "@type": "ProfessionalService",
      name: SITE_NAME,
      url: SITE_URL,
      telephone: PHONE,
    },
    areaServed: NCR_CITIES.map((city) => ({ "@type": "City", name: city })),
  };
}

export interface LocationSchemaInput {
  cityName: string;
  region: string;
  path: string;
  description: string;
}

export function buildLocationSchema({ cityName, region, path, description }: LocationSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${SITE_NAME} — Website Design in ${cityName}`,
    image: LOGO_URL,
    url: `${SITE_URL}${path}`,
    telephone: PHONE,
    email: EMAIL,
    description,
    address: {
      "@type": "PostalAddress",
      addressLocality: cityName,
      addressRegion: region,
      addressCountry: "IN",
    },
    areaServed: { "@type": "City", name: cityName },
    priceRange: PRICE_RANGE,
  };
}

export interface BlogPostingSchemaInput {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  imageUrl?: string;
}

export function buildBlogPostingSchema({ title, description, path, datePublished, imageUrl }: BlogPostingSchemaInput) {
  const url = `${SITE_URL}${path}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url,
    datePublished,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: LOGO_URL },
    },
    image: imageUrl ?? LOGO_URL,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
}
