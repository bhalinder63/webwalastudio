import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import {
  School, HeartPulse, Briefcase, Scissors,
  Coffee, ShoppingBag,
} from "lucide-react";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  size: "lg" | "sm";
}

const services: ServiceItem[] = [
  {
    id: "education",
    title: "Schools & Institutes",
    description: "Notice boards, admission forms, gallery, and parent portals structured for educational clarity.",
    icon: School,
    features: ["Parent Portal Registration", "Virtual Notice Board", "Online Fee Collections", "Academic Gallery Page"],
    size: "lg",
  },
  {
    id: "medical",
    title: "Medical & Clinics",
    description: "Appointment booking, doctor profiles, and testimonials designed to build trust.",
    icon: HeartPulse,
    features: ["Doctor Scheduling Form", "Patient Feedback Logs", "Clinical Services Index", "Emergency Telehealth Portal"],
    size: "sm",
  },
  {
    id: "corporate",
    title: "Corporate Business",
    description: "Professional portfolios, team directories, and lead generation forms.",
    icon: Briefcase,
    features: ["Lead Capture CRM Form", "Interactive Service Catalog", "Office Team Bios", "Annual Report Resource"],
    size: "sm",
  },
  {
    id: "beauty",
    title: "Salons & Spas",
    description: "Visual-heavy galleries, service menus, and easy online booking.",
    icon: Scissors,
    features: ["Service Pricing Sheet", "Stylist Slot Booking", "Before & After Gallery", "Google Maps Integration"],
    size: "sm",
  },
  {
    id: "restaurant",
    title: "Restaurants & Cafes",
    description: "Digital menus, reservation forms, and vibrant photo galleries.",
    icon: Coffee,
    features: ["Interactive Contactless Menu", "Reservation Slot Checker", "Special Offer Promos", "Visual Chef Gallery"],
    size: "sm",
  },
  {
    id: "ecommerce",
    title: "E-Commerce Stores",
    description: "Full product catalogs, shopping carts, secure payment gateways, and inventory management setups.",
    icon: ShoppingBag,
    features: ["Stripe / PayPal Gateway Setup", "Product Catalog Grid", "Shopping Cart Overlay", "Dynamic Stock Tracker UI"],
    size: "lg",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-white scroll-mt-10" style={{ borderBottom: "1px solid var(--border)" }}>
      <div className="max-w-[1200px] mx-auto px-[5%]">
        {/* Title */}
        <motion.div
          className="text-center mb-14 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 32, rotateX: 6 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          style={{ transformPerspective: 800 }}
        >
          <span className="section-label">OUR SERVICES</span>
          <h2
            className="font-display font-black mb-4"
            style={{ fontSize: "clamp(26px, 3.2vw, 42px)", letterSpacing: "-1.2px", color: "var(--text-dark)" }}
          >
            Tailored Solutions for Every Industry
          </h2>
          <p className="font-sans" style={{ fontSize: 16, color: "#4B5563", lineHeight: 1.7 }}>
            We understand that a clinic needs different features than a restaurant. Here's exactly
            what's built into your website, by industry.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="services-bento">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isLarge = service.size === "lg";

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.06, ease: [0.21, 0.47, 0.32, 0.98] }}
                style={{
                  position: "relative",
                  overflow: "hidden",
                  background: "white",
                  border: "1.5px solid var(--border)",
                  borderRadius: "var(--radius)",
                  padding: isLarge ? "32px" : "24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: isLarge ? 20 : 14,
                }}
              >
                <span
                  aria-hidden="true"
                  style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #0EA5E9, #7C3AED)" }}
                />

                {/* Icon + label block */}
                <div className="flex items-center gap-3">
                  <div
                    className="flex items-center justify-center shrink-0"
                    style={{ width: isLarge ? 52 : 44, height: isLarge ? 52 : 44, borderRadius: 12, background: "var(--surface)", border: "1px solid var(--border)" }}
                  >
                    <Icon className={isLarge ? "h-6 w-6" : "h-5 w-5"} style={{ color: "var(--violet-mid)" }} />
                  </div>
                  <div>
                    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase" as const, color: "var(--blue-mid)" }}>
                      Custom Spec
                    </span>
                    <h3
                      className="font-display font-extrabold"
                      style={{ fontSize: isLarge ? 22 : 16, color: "var(--text-dark)", lineHeight: 1.25 }}
                    >
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Description + features */}
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <p className="font-sans" style={{ fontSize: isLarge ? 15 : 13.5, color: "#4B5563", lineHeight: 1.65 }}>
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature) => (
                      <span
                        key={feature}
                        className="font-sans font-semibold"
                        style={{ fontSize: 12, color: "var(--text-dark)", background: "var(--surface)", border: "1px solid var(--border)", padding: "6px 12px", borderRadius: 50 }}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
