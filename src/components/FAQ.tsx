import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "How long does it take to build my website?",
    a: "Most websites are designed, built, and launched within 7 days. The timeline depends on how quickly you can share your content (text, images, logo). Once we have everything, we move fast.",
  },
  {
    q: "What do I need to provide to get started?",
    a: "Just your business name, logo (if you have one), a rough idea of what you want, and any photos or text you'd like on the site. No logo? No problem — we can help you with that too. We guide you through the entire process.",
  },
  {
    q: "Is the website mobile-friendly?",
    a: "Yes, 100%. Every website we build is fully responsive — it looks great and works perfectly on phones, tablets, and desktops. Mobile-first design is a core part of our process, not an afterthought.",
  },
  {
    q: "Do you offer website maintenance after launch?",
    a: "Yes. All plans include free maintenance — 1 month with Starter, 2 months with Professional, and 3 months with Business Pro. After that, we offer affordable annual maintenance packages so your site stays fast, secure, and up to date.",
  },
  {
    q: "Are there any hidden fees?",
    a: "No. The price you see is what you pay for the build. The only additional costs are domain name (₹800–1,500/year) and hosting (₹3,000–6,000/year) if you don't already have them — and we'll guide you through setting those up.",
  },
  {
    q: "What types of businesses do you work with?",
    a: "We work with schools, clinics, restaurants, retailers, manufacturers, consultants, NGOs, and more. If you have a business and need a professional online presence, we can help — regardless of industry.",
  },
  {
    q: "Do you work with international clients (USA, Canada, UAE)?",
    a: "Yes. Alongside clients across India, we regularly build for businesses in the USA, Canada, and UAE. Everything — briefing, design reviews, and delivery — is handled remotely over email and video calls, with pricing available in both INR and USD. We work async-friendly across time zones, so distance is never a blocker.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative overflow-hidden py-24 scroll-mt-10"
      style={{
        background: "linear-gradient(160deg, #EFF6FF 0%, #F5F3FF 50%, #EDE9FE 100%)",
        borderTop: "1.5px solid #E0E7FF",
      }}
    >
      {/* Glass sphere orbs */}
      <div className="glass-sphere-blue orb-float absolute pointer-events-none" style={{ top: "-10%", right: "-6%", width: 480, height: 480 }} />
      <div className="glass-sphere orb-float-2 absolute pointer-events-none" style={{ bottom: "-10%", left: "-6%", width: 400, height: 400 }} />
      <div className="dot-grid-light absolute inset-0 pointer-events-none" />

      <div className="max-w-[860px] mx-auto px-[5%] relative z-10">
        {/* Heading */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <span className="section-label">FAQ</span>
          <h2
            className="font-display font-black mb-4"
            style={{ fontSize: "clamp(26px, 3.2vw, 42px)", letterSpacing: "-1.2px", color: "#1E1B4B" }}
          >
            Got Questions?
          </h2>
          <p className="font-sans" style={{ fontSize: 16, color: "#4B5563", lineHeight: 1.7 }}>
            Everything you need to know before getting started. Can't find your answer?{" "}
            <a href="https://wa.me/919818726094" target="_blank" rel="noopener noreferrer"
              style={{ color: "#7C3AED", fontWeight: 700, textDecoration: "none" }}>
              Chat with us on WhatsApp.
            </a>
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.45, delay: idx * 0.05, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="liquid-glass focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                style={{
                  borderRadius: 16,
                  overflow: "hidden",
                  cursor: "pointer",
                }}
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${idx}`}
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setOpenIndex(isOpen ? null : idx);
                  }
                }}
              >
                {/* Question row */}
                <div
                  className="flex items-center justify-between gap-4"
                  style={{ padding: "20px 24px" }}
                >
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
                      flexShrink: 0,
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: isOpen
                        ? "linear-gradient(135deg, #0EA5E9, #7C3AED)"
                        : "rgba(124,58,237,0.08)",
                      transition: "background 0.22s",
                    }}
                  >
                    <Plus
                      style={{
                        width: 15,
                        height: 15,
                        color: isOpen ? "white" : "#7C3AED",
                        strokeWidth: 2.5,
                        transition: "color 0.22s",
                      }}
                    />
                  </motion.div>
                </div>

                {/* Answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
                      style={{ overflow: "hidden" }}
                      id={`faq-answer-${idx}`}
                    >
                      <div
                        style={{
                          padding: "0 24px 22px",
                          borderTop: "1px solid rgba(224,231,255,0.6)",
                          paddingTop: 16,
                        }}
                      >
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
      </div>
    </section>
  );
}
