import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, CalendarCheck } from "lucide-react";
import { faqs, FAQ_TITLE, FAQ_DESCRIPTION } from "../data/faqs";
import { useSeoMeta, useJsonLd } from "../hooks/useSeoMeta";
import { buildFaqPageSchema } from "../lib/schema";
import PageShell, { useContactModal } from "../components/PageShell";

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-3">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.04, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="liquid-glass focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
            style={{ borderRadius: 16, overflow: "hidden", cursor: "pointer" }}
            role="button"
            tabIndex={0}
            aria-expanded={isOpen}
            aria-controls={`faqpage-answer-${idx}`}
            onClick={() => setOpenIndex(isOpen ? null : idx)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setOpenIndex(isOpen ? null : idx);
              }
            }}
          >
            <div className="flex items-center justify-between gap-4" style={{ padding: "20px 24px" }}>
              <span
                className="font-display font-bold"
                style={{ fontSize: 15, color: isOpen ? "#7C3AED" : "#1E1B4B", lineHeight: 1.4, transition: "color 0.2s" }}
              >
                {faq.q}
              </span>
              <motion.div
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.22, ease: [0.21, 0.47, 0.32, 0.98] }}
                style={{
                  flexShrink: 0, width: 28, height: 28, borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: isOpen ? "linear-gradient(135deg, #0EA5E9, #7C3AED)" : "rgba(124,58,237,0.08)",
                  transition: "background 0.22s",
                }}
              >
                <Plus style={{ width: 15, height: 15, color: isOpen ? "white" : "#7C3AED", strokeWidth: 2.5, transition: "color 0.22s" }} />
              </motion.div>
            </div>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
                  style={{ overflow: "hidden" }}
                  id={`faqpage-answer-${idx}`}
                >
                  <div style={{ padding: "0 24px 22px", borderTop: "1px solid rgba(224,231,255,0.6)", paddingTop: 16 }}>
                    <p className="font-sans" style={{ fontSize: 14, color: "#4B5563", lineHeight: 1.75 }}>
                      {faq.a}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

function FAQPageContent() {
  const { openContact } = useContactModal();

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
            <span className="section-label">FAQ</span>
            <h1
              className="font-display font-black mb-5"
              style={{ fontSize: "clamp(32px, 4vw, 52px)", letterSpacing: "-1.8px", color: "#1E1B4B" }}
            >
              Got Questions?
            </h1>
            <p className="font-sans mb-8" style={{ fontSize: 17, color: "#4B5563", lineHeight: 1.75 }}>
              Everything you need to know before getting started.{" "}
              Can't find your answer?{" "}
              <a href="https://wa.me/919818726094" target="_blank" rel="noopener noreferrer"
                style={{ color: "#7C3AED", fontWeight: 700, textDecoration: "none" }}>
                Chat with us on WhatsApp.
              </a>
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ accordion */}
      <section style={{ padding: "60px 5% 80px", background: "#F8FAFF" }}>
        <div className="max-w-[860px] mx-auto">
          <FAQAccordion />
        </div>
      </section>

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
              Still have questions?
            </h2>
            <p className="font-sans mb-8" style={{ fontSize: 16, color: "#4B5563", lineHeight: 1.7 }}>
              Book a free 15-minute call and we'll answer everything — no pressure, no commitment.
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

export default function FAQPage() {
  useSeoMeta({ title: FAQ_TITLE, description: FAQ_DESCRIPTION, path: "/faq" });
  useJsonLd(buildFaqPageSchema(faqs));

  return (
    <PageShell whatsAppSource="faq_page">
      <FAQPageContent />
    </PageShell>
  );
}
