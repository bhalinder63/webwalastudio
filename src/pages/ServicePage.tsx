import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { CalendarCheck, Check, ArrowRight } from "lucide-react";
import { getServiceBySlug, services } from "../data/services";
import { useSeoMeta, useJsonLd } from "../hooks/useSeoMeta";
import { buildServiceSchema, buildBreadcrumbSchema } from "../lib/schema";
import PageShell, { useContactModal } from "../components/PageShell";

function NotFoundContent() {
  return (
    <section className="relative overflow-hidden text-center" style={{ padding: "160px 5% 120px" }}>
      <div className="relative z-10 max-w-xl mx-auto">
        <h1 className="font-display font-black mb-5" style={{ fontSize: "clamp(28px, 3.6vw, 44px)", letterSpacing: "-1.5px", color: "#1E1B4B" }}>
          Service not found
        </h1>
        <p className="font-sans mb-8" style={{ fontSize: 16, color: "#4B5563", lineHeight: 1.75 }}>
          We couldn't find that service page.
        </p>
        <Link
          to="/services"
          className="btn-shine btn-gradient inline-flex items-center justify-center gap-2 font-sans font-bold"
          style={{ fontSize: 15, padding: "14px 32px", borderRadius: 50, textDecoration: "none" }}
        >
          View all services
        </Link>
      </div>
    </section>
  );
}

function ServicePageContent({ slug }: { slug: string }) {
  const { openContact } = useContactModal();
  const service = getServiceBySlug(slug)!;
  const Icon = service.icon;
  const related = services.filter((s) => service.relatedSlugs.includes(s.slug));

  useSeoMeta({ title: `${service.heroHeading} | Webwala Studio`, description: service.seoDescription, path: `/services/${service.slug}` });
  useJsonLd([
    buildServiceSchema({ name: service.title, description: service.seoDescription, path: `/services/${service.slug}` }),
    buildBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: service.title, path: `/services/${service.slug}` },
    ]),
  ]);

  return (
    <>
      {/* Hero */}
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
              <Icon style={{ width: 28, height: 28, color: "#7C3AED" }} />
            </div>
            <span className="section-label">SERVICES</span>
            <h1
              className="font-display font-black mb-5"
              style={{ fontSize: "clamp(30px, 3.8vw, 48px)", letterSpacing: "-1.8px", color: "#1E1B4B" }}
            >
              {service.heroHeading}
            </h1>
            <p className="font-sans mb-8" style={{ fontSize: 17, color: "#4B5563", lineHeight: 1.75 }}>
              {service.shortDescription}
            </p>
            <button
              onClick={() => openContact(`${service.title} Website Consult`)}
              className="btn-shine btn-gradient inline-flex items-center justify-center gap-2 font-sans font-bold"
              style={{ fontSize: 15, padding: "14px 32px", borderRadius: 50 }}
            >
              <CalendarCheck className="h-5 w-5" />
              Book a Free Consultation
            </button>
          </motion.div>
        </div>
      </section>

      {/* Intro + features */}
      <section style={{ padding: "70px 5% 80px", background: "#F8FAFF" }}>
        <div className="max-w-[860px] mx-auto">
          {service.intro.map((paragraph, idx) => (
            <p key={idx} className="font-sans mb-6" style={{ fontSize: 16, color: "#374151", lineHeight: 1.8 }}>
              {paragraph}
            </p>
          ))}

          <h2 className="font-display font-black mt-10 mb-6" style={{ fontSize: "clamp(20px, 2.4vw, 28px)", letterSpacing: "-0.8px", color: "#1E1B4B" }}>
            What's included
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {service.features.map((feature) => (
              <div
                key={feature}
                className="liquid-glass flex items-center gap-3"
                style={{ borderRadius: 14, padding: "16px 18px" }}
              >
                <Check style={{ width: 18, height: 18, color: "#7C3AED", flexShrink: 0 }} />
                <span className="font-sans font-semibold" style={{ fontSize: 14, color: "#1E1B4B" }}>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related services */}
      {related.length > 0 && (
        <section style={{ padding: "60px 5% 80px", background: "white" }}>
          <div className="max-w-[860px] mx-auto">
            <h2 className="font-display font-black mb-6" style={{ fontSize: "clamp(20px, 2.4vw, 28px)", letterSpacing: "-0.8px", color: "#1E1B4B" }}>
              Related services
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={`/services/${r.slug}`}
                  className="liquid-glass flex items-center justify-between gap-3"
                  style={{ borderRadius: 14, padding: "18px 20px", textDecoration: "none" }}
                >
                  <span className="font-sans font-bold" style={{ fontSize: 14, color: "#1E1B4B" }}>{r.title}</span>
                  <ArrowRight style={{ width: 16, height: 16, color: "#7C3AED", flexShrink: 0 }} />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
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
              Ready for your {service.title.toLowerCase()} website?
            </h2>
            <p className="font-sans mb-8" style={{ fontSize: 16, color: "#4B5563", lineHeight: 1.7 }}>
              Book a free 15-minute call — we'll walk you through pricing, timeline, and what we'd need from you.
            </p>
            <button
              onClick={() => openContact(`${service.title} Website Consult`)}
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

export default function ServicePage() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceBySlug(slug) : undefined;

  return (
    <PageShell whatsAppSource="service_page">
      {service ? <ServicePageContent slug={service.slug} /> : <NotFoundContent />}
    </PageShell>
  );
}
