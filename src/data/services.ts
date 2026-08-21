import type { LucideIcon } from "lucide-react";
import {
  School, HeartPulse, Briefcase, Scissors,
  Coffee, ShoppingBag, Building2, Scale, Calculator,
} from "lucide-react";

export const SERVICES_INDEX_TITLE = "Website Design Services | Webwala Studio";
export const SERVICES_INDEX_DESCRIPTION = "Website design services for schools, clinics, restaurants, retailers, law firms, and e-commerce across Delhi NCR, USA, Canada & UAE — live in 7 days.";

export interface ServicePageData {
  slug: string;
  /** Matches the `id` used in src/components/Services.tsx's homepage teaser grid. */
  homepageId: string;
  title: string;
  icon: LucideIcon;
  /** Short teaser line, reused from the homepage Services section for consistency. */
  shortDescription: string;
  /** Meta description — keep under ~160 characters. */
  seoDescription: string;
  heroHeading: string;
  intro: string[];
  features: string[];
  relatedSlugs: string[];
}

export const services: ServicePageData[] = [
  {
    slug: "schools-institutes",
    homepageId: "education",
    title: "Schools & Institutes",
    icon: School,
    shortDescription: "Notice boards, admission forms, gallery, and parent portals structured for educational clarity.",
    seoDescription: "Website design for schools & educational institutes in Delhi NCR. Admission forms, parent portals, notice boards — live in 7 days, from ₹12,000 / $149.",
    heroHeading: "Website Design for Schools & Institutes",
    intro: [
      "Parents research a school online long before they visit in person — an outdated or missing website quietly costs admissions before a single call comes in. We build school and institute websites that make admissions, notice boards, and academic information easy to find on any device.",
      "Every school site we build is structured around how parents and administrators actually use it: fee collection that doesn't require a phone call, a notice board that's simple enough for office staff to update, and a gallery that shows the campus off properly.",
    ],
    features: ["Parent Portal Registration", "Virtual Notice Board", "Online Fee Collections", "Academic Gallery Page"],
    relatedSlugs: ["corporate-business", "law-firms"],
  },
  {
    slug: "medical-clinics",
    homepageId: "medical",
    title: "Medical & Clinics",
    icon: HeartPulse,
    shortDescription: "Appointment booking, doctor profiles, and testimonials designed to build trust.",
    seoDescription: "Website design for clinics & medical practices in Delhi NCR. Appointment booking, doctor profiles, patient trust — live in 7 days, from ₹12,000 / $149.",
    heroHeading: "Website Design for Clinics & Medical Practices",
    intro: [
      "Patients decide whether to trust a clinic within seconds of landing on its website. We design medical and clinic websites that lead with credibility — clear doctor profiles, real patient feedback, and an appointment process that doesn't make someone pick up the phone during work hours.",
      "Whether you run a single clinic or a multi-doctor practice, the site is built to reduce front-desk workload: patients can see who they're booking with, what's treated, and request a slot directly from the page.",
    ],
    features: ["Doctor Scheduling Form", "Patient Feedback Logs", "Clinical Services Index", "Emergency Telehealth Portal"],
    relatedSlugs: ["salons-spas", "ca-accounting-firms"],
  },
  {
    slug: "corporate-business",
    homepageId: "corporate",
    title: "Corporate Business",
    icon: Briefcase,
    shortDescription: "Professional portfolios, team directories, and lead generation forms.",
    seoDescription: "Corporate website design for businesses in Delhi NCR & internationally. Lead capture, team pages, service catalogs — live in 7 days, from ₹12,000 / $149.",
    heroHeading: "Corporate Website Design",
    intro: [
      "A corporate website is often the first — and sometimes only — impression a prospect forms of your business before a sales call. We build corporate sites that read as established and credible from the first scroll, structured to actually generate leads instead of just sitting online.",
      "We work with businesses across Delhi NCR and internationally in the USA, Canada, and UAE, so every corporate build accounts for a professional, globally-legible tone rather than a purely local one.",
    ],
    features: ["Lead Capture CRM Form", "Interactive Service Catalog", "Office Team Bios", "Annual Report Resource"],
    relatedSlugs: ["law-firms", "ca-accounting-firms"],
  },
  {
    slug: "salons-spas",
    homepageId: "beauty",
    title: "Salons & Spas",
    icon: Scissors,
    shortDescription: "Visual-heavy galleries, service menus, and easy online booking.",
    seoDescription: "Website design for salons & spas in Delhi NCR. Booking, service menus, before/after galleries — live in 7 days, from ₹12,000 / $149.",
    heroHeading: "Website Design for Salons & Spas",
    intro: [
      "Salon and spa clients decide based on what they can see — your website needs to sell the experience visually before someone ever books a slot. We build image-forward sites with real before-and-after work, a clear service and pricing menu, and booking that doesn't dead-end at a phone number.",
      "A Google Maps integration and stylist-level booking mean walk-in and returning clients both find exactly what they need without messaging you directly for basic information.",
    ],
    features: ["Service Pricing Sheet", "Stylist Slot Booking", "Before & After Gallery", "Google Maps Integration"],
    relatedSlugs: ["restaurants-cafes", "medical-clinics"],
  },
  {
    slug: "restaurants-cafes",
    homepageId: "restaurant",
    title: "Restaurants & Cafes",
    icon: Coffee,
    shortDescription: "Digital menus, reservation forms, and vibrant photo galleries.",
    seoDescription: "Website design for restaurants & cafes in Delhi NCR. Digital menus, reservations, food photography — live in 7 days, from ₹12,000 / $149.",
    heroHeading: "Website Design for Restaurants & Cafes",
    intro: [
      "Most diners check a restaurant's menu and photos online before deciding where to eat — a site that looks dated or is missing a menu costs covers you'll never know you lost. We build contactless-menu-ready restaurant sites with real food photography, reservation requests, and a place to run seasonal offers.",
      "Everything is built mobile-first, since the overwhelming majority of restaurant searches happen on a phone, often minutes before someone decides where to walk in.",
    ],
    features: ["Interactive Contactless Menu", "Reservation Slot Checker", "Special Offer Promos", "Visual Chef Gallery"],
    relatedSlugs: ["salons-spas", "ecommerce-stores"],
  },
  {
    slug: "real-estate-builders",
    homepageId: "realestate",
    title: "Real Estate & Builders",
    icon: Building2,
    shortDescription: "Property listings, EMI calculators, and virtual tours built for serious buyers.",
    seoDescription: "Website design for real estate & builders in Delhi NCR. Property listings, EMI calculators, virtual tours — live in 7 days, from ₹12,000 / $149.",
    heroHeading: "Website Design for Real Estate & Builders",
    intro: [
      "Serious property buyers filter dozens of listings online before ever calling an agent or builder — your site needs to hold its own next to the major portals, not just point back to them. We build real estate websites with proper listing grids, an EMI/loan calculator buyers actually use, and virtual tour embeds that keep them on your site.",
      "A direct site-visit booking form turns a browsing visitor into a scheduled appointment without a back-and-forth over WhatsApp or phone.",
    ],
    features: ["Property Listing Grid", "EMI / Loan Calculator", "Virtual Tour Embed", "Site Visit Booking Form"],
    relatedSlugs: ["corporate-business", "law-firms"],
  },
  {
    slug: "law-firms",
    homepageId: "legal",
    title: "Law Firms",
    icon: Scale,
    shortDescription: "Practice area pages, attorney profiles, and confidential case inquiry forms that build credibility.",
    seoDescription: "Website design for law firms in Delhi NCR. Practice area pages, attorney profiles, confidential inquiries — live in 7 days, from ₹12,000 / $149.",
    heroHeading: "Website Design for Law Firms",
    intro: [
      "Prospective clients researching a lawyer online are looking for one thing above all: credibility. We build law firm websites around clearly organized practice area pages, real attorney profiles, and a confidential inquiry form that respects how sensitive the first contact usually is.",
      "A legal resource section — FAQs, explainers, recent matters — also gives the site something worth ranking for beyond the firm's own name, which is where most law firm sites fall short.",
    ],
    features: ["Practice Area Pages", "Attorney Profile Directory", "Confidential Case Inquiry Form", "Legal Resource Blog"],
    relatedSlugs: ["ca-accounting-firms", "corporate-business"],
  },
  {
    slug: "ca-accounting-firms",
    homepageId: "accounting",
    title: "CA & Accounting Firms",
    icon: Calculator,
    shortDescription: "Service breakdowns, secure document uploads, and appointment booking for tax season traffic.",
    seoDescription: "Website design for CA & accounting firms in Delhi NCR. Secure document upload, tax appointment booking — live in 7 days, from ₹12,000 / $149.",
    heroHeading: "Website Design for CA & Accounting Firms",
    intro: [
      "Tax season traffic spikes fast, and a site that can't handle secure document sharing or appointment requests just pushes that load back onto phone calls and email threads. We build CA and accounting firm websites with a secure document upload portal, clear fee breakdowns by service, and direct appointment booking for filing season.",
      "A GST and compliance resource hub also gives existing clients a reason to keep coming back to the site between filing periods, rather than only during a scramble.",
    ],
    features: ["Secure Document Upload Portal", "Tax Filing Appointment Booking", "Service Fee Breakdown", "GST / Compliance Resource Hub"],
    relatedSlugs: ["law-firms", "corporate-business"],
  },
  {
    slug: "ecommerce-stores",
    homepageId: "ecommerce",
    title: "E-Commerce Stores",
    icon: ShoppingBag,
    shortDescription: "Full product catalogs, shopping carts, secure payment gateways, and inventory management setups.",
    seoDescription: "E-commerce website design for small retailers in Delhi NCR & internationally. Payment gateway, product catalog, inventory — live in 7 days, from ₹55,000 / $699.",
    heroHeading: "E-Commerce Website Design",
    intro: [
      "Selling online means competing with marketplaces that customers already trust by default — your store has to make up that trust gap fast, on the first product page they land on. We build e-commerce sites with a real product catalog grid, secure payment gateway integration, and a shopping cart flow that doesn't lose customers at checkout.",
      "A dynamic stock tracker keeps listings accurate as inventory moves, so you're not manually editing product pages every time something sells out.",
    ],
    features: ["Stripe / PayPal Gateway Setup", "Product Catalog Grid", "Shopping Cart Overlay", "Dynamic Stock Tracker UI"],
    relatedSlugs: ["restaurants-cafes", "corporate-business"],
  },
];

export function getServiceBySlug(slug: string): ServicePageData | undefined {
  return services.find((service) => service.slug === slug);
}
