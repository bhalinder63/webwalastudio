import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, CalendarCheck } from "lucide-react";
import { services, SERVICES_INDEX_TITLE, SERVICES_INDEX_DESCRIPTION } from "../data/services";
import { useSeoMeta, useJsonLd } from "../hooks/useSeoMeta";
import { buildBreadcrumbSchema } from "../lib/schema";
import PageShell, { useContactModal } from "../components/PageShell";

function ServicesIndexContent() {
  const { openContact } = useContactModal();

  useSeoMeta({ title: SERVICES_INDEX_TITLE, description: SERVICES_INDEX_DESCRIPTION, path: "/services" });
  useJsonLd(buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
  ]));

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
            <span className="section-label">SERVICES</span>
            <h1
              className="font-display font-black mb-5"
              style={{ fontSize: "clamp(32px, 4vw, 52px)", letterSpacing: "-1.8px", color: "#1E1B4B" }}
            >
              Website Design, Tailored to Your Industry
            </h1>
            <p className="font-sans mb-8" style={{ fontSize: 17, color: "#4B5563", lineHeight: 1.75 }}>
              Every industry needs different things from a website. Pick yours below.
            </p>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: "60px 5% 100px", background: "#F8FAFF" }}>
        <div className="max-w-[1000px] mx-auto grid sm:grid-cols-2 gap-5">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: idx * 0.03 }}
              >
                <Link
                  to={`/services/${service.slug}`}
                  className="liquid-glass flex flex-col gap-3"
                  style={{ borderRadius: 16, padding: "24px", textDecoration: "none", height: "100%" }}
                >
                  <div
                    className="inline-flex items-center justify-center"
                    style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(124,58,237,0.1)" }}
                  >
                    <Icon style={{ width: 22, height: 22, color: "#7C3AED" }} />
                  </div>
                  <span className="font-display font-bold" style={{ fontSize: 17, color: "#1E1B4B" }}>{service.title}</span>
                  <p className="font-sans" style={{ fontSize: 14, color: "#4B5563", lineHeight: 1.6, flex: 1 }}>
                    {service.shortDescription}
                  </p>
                  <span className="font-sans font-bold inline-flex items-center gap-1.5" style={{ fontSize: 13, color: "#7C3AED" }}>
                    Learn more <ArrowRight style={{ width: 14, height: 14 }} />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

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
            <span className="section-label">DON'T SEE YOUR INDUSTRY?</span>
            <h2 className="font-display font-black mb-4" style={{ fontSize: "clamp(24px, 3vw, 36px)", letterSpacing: "-1px", color: "#1E1B4B" }}>
              We build for any business
            </h2>
            <p className="font-sans mb-8" style={{ fontSize: 16, color: "#4B5563", lineHeight: 1.7 }}>
              These are just our most common builds. If you have a business and need a professional online presence, we can help.
            </p>
            <button
              onClick={() => openContact()}
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

export default function ServicesIndexPage() {
  return (
    <PageShell whatsAppSource="services_index">
      <ServicesIndexContent />
    </PageShell>
  );
}
