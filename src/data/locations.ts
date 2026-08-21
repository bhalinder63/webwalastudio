export const LOCATIONS_INDEX_TITLE = "Website Design Across Delhi NCR | Webwala Studio";
export const LOCATIONS_INDEX_DESCRIPTION = "Website design agency serving Gurugram, Delhi, Noida, Faridabad & Ghaziabad. Professional websites live in 7 days, from ₹12,000 / $149.";

export interface LocationPageData {
  slug: string;
  cityName: string;
  region: string;
  seoDescription: string;
  heroHeading: string;
  intro: string[];
  relatedSlugs: string[];
}

export const locations: LocationPageData[] = [
  {
    slug: "gurugram",
    cityName: "Gurugram",
    region: "Haryana",
    seoDescription: "Website design agency in Gurugram. Schools, clinics, restaurants & retailers — professional websites live in 7 days, from ₹12,000 / $149.",
    heroHeading: "Website Design in Gurugram",
    intro: [
      "We're based in Gurugram, which means client meetings, site walkthroughs, and revisions happen in person when it's useful — not just over email. We've built for schools, clinics, restaurants, and corporate offices across the city, from DLF Phase locations to Sohna Road.",
      "Being local also means we understand what a Gurugram audience actually expects from a business website: fast, mobile-first, and credible enough to compete with the corporate brands headquartered here.",
    ],
    relatedSlugs: ["delhi", "faridabad"],
  },
  {
    slug: "delhi",
    cityName: "Delhi",
    region: "Delhi",
    seoDescription: "Website design agency serving Delhi. Schools, clinics, law firms & retailers — professional websites live in 7 days, from ₹12,000 / $149.",
    heroHeading: "Website Design in Delhi",
    intro: [
      "Delhi's market is dense and competitive across nearly every industry we work with — schools, clinics, law firms, and retail. A website that looks and loads like an afterthought gets filtered out fast by a Delhi audience used to comparing several options before making contact.",
      "We build for Delhi businesses the same way we build for our Gurugram base: fast, mobile-first, and structured around whatever action actually drives your business — a booking, an inquiry, or a sale.",
    ],
    relatedSlugs: ["gurugram", "noida"],
  },
  {
    slug: "noida",
    cityName: "Noida",
    region: "Uttar Pradesh",
    seoDescription: "Website design agency serving Noida. Corporate, retail, real estate & e-commerce — professional websites live in 7 days, from ₹12,000 / $149.",
    heroHeading: "Website Design in Noida",
    intro: [
      "Noida's mix of corporate offices, retail, and real estate developers means the businesses we work with here often need a site that does more than look good — it needs to capture leads, list properties, or run an online store. We build accordingly, not with a one-size-fits-all template.",
      "As part of Delhi NCR, Noida clients get the same 7-day delivery timeline and remote-friendly process as the rest of our NCR base.",
    ],
    relatedSlugs: ["ghaziabad", "delhi"],
  },
  {
    slug: "faridabad",
    cityName: "Faridabad",
    region: "Haryana",
    seoDescription: "Website design agency serving Faridabad. Schools, clinics & manufacturers — professional websites live in 7 days, from ₹12,000 / $149.",
    heroHeading: "Website Design in Faridabad",
    intro: [
      "Faridabad's manufacturing and industrial base, alongside its schools and clinics, means a lot of the businesses we build for here haven't had a proper website before — just a listing on a directory or a Facebook page. We build a real, professional site that actually represents the business.",
      "Same process as the rest of NCR: a 7-day build, mobile-first, with maintenance included after launch.",
    ],
    relatedSlugs: ["gurugram", "ghaziabad"],
  },
  {
    slug: "ghaziabad",
    cityName: "Ghaziabad",
    region: "Uttar Pradesh",
    seoDescription: "Website design agency serving Ghaziabad. Retail, education & healthcare — professional websites live in 7 days, from ₹12,000 / $149.",
    heroHeading: "Website Design in Ghaziabad",
    intro: [
      "Ghaziabad's retail, education, and healthcare businesses are increasingly competing for customers who search online first — a missing or outdated website is the easiest way to lose that comparison before it starts. We build sites that hold up against that scrutiny.",
      "Ghaziabad clients get the same 7-day timeline, remote-friendly process, and post-launch maintenance as every other city we serve in NCR.",
    ],
    relatedSlugs: ["noida", "delhi"],
  },
];

export function getLocationBySlug(slug: string): LocationPageData | undefined {
  return locations.find((location) => location.slug === slug);
}
