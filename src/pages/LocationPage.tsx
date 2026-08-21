import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { CalendarCheck, MapPin, ArrowRight } from "lucide-react";
import { getLocationBySlug, locations } from "../data/locations";
import { services } from "../data/services";
import { useSeoMeta, useJsonLd } from "../hooks/useSeoMeta";
import { buildLocationSchema, buildBreadcrumbSchema } from "../lib/schema";
import PageShell, { useContactModal } from "../components/PageShell";

function NotFoundContent() {
  return (
    <section className="relative overflow-hidden text-center" style={{ padding: "160px 5% 120px" }}>
      <div className="relative z-10 max-w-xl mx-auto">
        <h1 className="font-display font-black mb-5" style={{ fontSize: "clamp(28px, 3.6vw, 44px)", letterSpacing: "-1.5px", color: "#1E1B4B" }}>
          Location not found
        </h1>
        <Link
          to="/locations"
          className="btn-shine btn-gradient inline-flex items-center justify-center gap-2 font-sans font-bold"
          style={{ fontSize: 15, padding: "14px 32px", borderRadius: 50, textDecoration: "none" }}
        >
          View all locations
        </Link>
      </div>
    </section>
  );
}

function LocationPageContent({ slug }: { slug: string }) {
  const { openContact } = useContactModal();
  const location = getLocationBySlug(slug)!;
  const related = locations.filter((l) => location.relatedSlugs.includes(l.slug));
  const featuredServices = services.slice(0, 6);

  useSeoMeta({ title: `${location.heroHeading} | Webwala Studio`, description: location.seoDescription, path: `/locations/${location.slug}` });
  useJsonLd([
    buildLocationSchema({ cityName: location.cityName, region: location.region, path: `/locations/${location.slug}`, description: location.seoDescription }),
    buildBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Locations", path: "/locations" },
      { name: location.cityName, path: `/locations/${location.slug}` },
    ]),
  ]);

  return (
    <>
      <section
        className="relative overflow-hidden text-center"
        style={{
          padding: "140px 5% 80px",
          background: "linear-gradient(160deg, #EFF6FF 0%, #F5F3FF 50%, #EDE9FE 100%)",
        }}
      >
        <div className="dot-grid-light absolute inset-0 pointer-events-none" />
        <div className="glass-sphere-blue orb-float absolute pointer-events-none" style={{ top: "-15%", right: "-5%", width: 400, height: 400 }} />
        <div className="glass-sphere orb-float-2 absolute pointer-events-none" style={{ bottom: "-15%", left: "-5%", width: 350, height: 350 }} />

        <div className="relative z-10 max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <div
              className="inline-flex items-center justify-center mb-5"
              style={{ width: 56, height: 56, borderRadius: 16, background: "rgba(124,58,237,0.1)" }}
            >
              <MapPin style={{ width: 28, height: 28, color: "#7C3AED" }} />
            </div>
            <span className="section-label">{location.region.toUpperCase()}</span>
            <h1
              className="font-display font-black mb-5"
              style={{ fontSize: "clamp(30px, 3.8vw, 48px)", letterSpacing: "-1.8px", color: "#1E1B4B" }}
            >
              {location.heroHeading}
            </h1>
            <button
              onClick={() => openContact(`${location.cityName} Website Consult`)}
              className="btn-shine btn-gradient inline-flex items-center justify-center gap-2 font-sans font-bold"
              style={{ fontSize: 15, padding: "14px 32px", borderRadius: 50 }}
            >
              <CalendarCheck className="h-5 w-5" />
              Book a Free Consultation
            </button>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: "70px 5% 80px", background: "#F8FAFF" }}>
        <div className="max-w-[860px] mx-auto">
          {location.intro.map((paragraph, idx) => (
            <p key={idx} className="font-sans mb-6" style={{ fontSize: 16, color: "#374151", lineHeight: 1.8 }}>
              {paragraph}
            </p>
          ))}

          <h2 className="font-display font-black mt-10 mb-6" style={{ fontSize: "clamp(20px, 2.4vw, 28px)", letterSpacing: "-0.8px", color: "#1E1B4B" }}>
            Websites we build in {location.cityName}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {featuredServices.map((service) => (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                className="liquid-glass flex items-center justify-between gap-3"
                style={{ borderRadius: 14, padding: "16px 18px", textDecoration: "none" }}
              >
                <span className="font-sans font-semibold" style={{ fontSize: 14, color: "#1E1B4B" }}>{service.title}</span>
                <ArrowRight style={{ width: 16, height: 16, color: "#7C3AED", flexShrink: 0 }} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section style={{ padding: "60px 5% 80px", background: "white" }}>
          <div className="max-w-[860px] mx-auto">
            <h2 className="font-display font-black mb-6" style={{ fontSize: "clamp(20px, 2.4vw, 28px)", letterSpacing: "-0.8px", color: "#1E1B4B" }}>
              Nearby locations
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {related.map((l) => (
                <Link
                  key={l.slug}
                  to={`/locations/${l.slug}`}
                  className="liquid-glass flex items-center justify-between gap-3"
                  style={{ borderRadius: 14, padding: "18px 20px", textDecoration: "none" }}
                >
                  <span className="font-sans font-bold" style={{ fontSize: 14, color: "#1E1B4B" }}>{l.cityName}</span>
                  <ArrowRight style={{ width: 16, height: 16, color: "#7C3AED", flexShrink: 0 }} />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section
        className="relative overflow-hidden text-center"
        style={{
          padding: "80px 5% 100px",
          background: "linear-gradient(160deg, #EFF6FF 0%, #F5F3FF 50%, #EDE9FE 100%)",
          borderTop: "1.5px solid #E0E7FF",
        }}
      >
        <div className="dot-grid-light absolute inset-0 pointer-events-none" />
        <div className="relative z-10 max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <span className="section-label">READY TO START</span>
            <h2 className="font-display font-black mb-4" style={{ fontSize: "clamp(24px, 3vw, 36px)", letterSpacing: "-1px", color: "#1E1B4B" }}>
              Ready for your {location.cityName} website?
            </h2>
            <p className="font-sans mb-8" style={{ fontSize: 16, color: "#4B5563", lineHeight: 1.7 }}>
              Book a free 15-minute call — we'll walk you through pricing, timeline, and what we'd need from you.
            </p>
            <button
              onClick={() => openContact(`${location.cityName} Website Consult`)}
              className="btn-shine btn-gradient inline-flex items-center justify-center gap-2 font-sans font-bold"
              style={{ fontSize: 15, padding: "14px 32px", borderRadius: 50 }}
            >
              <CalendarCheck className="h-5 w-5" />
              Book a Free Consultation
            </button>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default function LocationPage() {
  const { slug } = useParams<{ slug: string }>();
  const location = slug ? getLocationBySlug(slug) : undefined;

  return (
    <PageShell whatsAppSource="location_page">
      {location ? <LocationPageContent slug={location.slug} /> : <NotFoundContent />}
    </PageShell>
  );
}
