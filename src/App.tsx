/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback, lazy, Suspense } from "react";
import { MotionConfig } from "motion/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ScrollProgress from "./components/ScrollProgress";
import { CalendarCheck } from "lucide-react";
import { trackEvent } from "./lib/analytics";

const Services      = lazy(() => import("./components/Services"));
const HowItWorks    = lazy(() => import("./components/HowItWorks"));
const Portfolio     = lazy(() => import("./components/Portfolio"));
const Pricing       = lazy(() => import("./components/Pricing"));
const Testimonials  = lazy(() => import("./components/Testimonials"));
const Footer        = lazy(() => import("./components/Footer"));
const ContactModal  = lazy(() => import("./components/ContactModal"));

function SectionShimmer() {
  return <div className="section-shimmer" style={{ minHeight: "60vh", width: "100%" }} />;
}

const WA_NUMBER = "919818726094";
const WA_PREFILL = encodeURIComponent("Hi Webwala Studio! 👋 I visited your website and I'm interested in getting a website built for my business. Can you help me?");

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [prefilledPlan, setPrefilledPlan] = useState<string | null>(null);

  const handleOpenContact = useCallback((planFocus: string | null = null) => {
    setPrefilledPlan(planFocus);
    setIsContactOpen(true);
    trackEvent("consultation_open", {
      source: planFocus?.startsWith("Final") ? "final_cta"
            : planFocus ? "pricing_card"
            : "general",
      plan: planFocus ?? "none",
    });
  }, []);

  return (
    <MotionConfig reducedMotion="user">
    <div className="relative min-h-screen bg-bg-cream selection:bg-primary/20 selection:text-brand-navy flex flex-col justify-between">
      {/* SCROLL PROGRESS */}
      <ScrollProgress />

      {/* HEADER NAVBAR */}
      <Navbar
        onOpenContact={() => handleOpenContact(null)}
      />

      {/* CORE BODY SECTIONS */}
      <main className="flex-1 w-full flex flex-col items-stretch">

        {/* HERO HEADER */}
        <Hero
          onOpenContact={() => handleOpenContact(null)}
        />

        <Suspense fallback={<SectionShimmer />}>
          {/* SERVICES FOCUS */}
          <Services />

          {/* TIMELINE PROCESS */}
          <HowItWorks />

          {/* CLIENT PORTFOLIO */}
          <Portfolio />

          {/* CLIENT TESTIMONIALS */}
          <Testimonials />

          {/* PRICING PLANS CHART */}
          <Pricing onOpenContact={handleOpenContact} />

          {/* FINAL CTA BANNER */}
          <section
            className="relative overflow-hidden text-center"
            style={{
              padding: "110px 5% 130px",
              background: "linear-gradient(160deg, #EFF6FF 0%, #F5F3FF 50%, #EDE9FE 100%)",
              borderTop: "1.5px solid #E0E7FF",
            }}
          >
            {/* Dot grid */}
            <div className="dot-grid-light absolute inset-0 pointer-events-none" />
            {/* Glass sphere orbs */}
            <div className="glass-sphere-blue orb-float absolute pointer-events-none" style={{ top: "-20%", right: "-5%", width: 400, height: 400 }} />
            <div className="glass-sphere orb-float-2 absolute pointer-events-none" style={{ bottom: "-20%", left: "-5%", width: 360, height: 360 }} />

            <div className="max-w-[1200px] mx-auto relative z-10 flex flex-col items-center">
              <span className="section-label">READY TO LAUNCH</span>
              <h2
                className="font-display font-black mb-6 max-w-2xl"
                style={{ fontSize: "clamp(26px, 3.2vw, 48px)", letterSpacing: "-1.5px", color: "#1E1B4B" }}
              >
                Ready to Get Your Website Live{" "}
                <span className="grad">in 7 Days?</span>
              </h2>
              <p
                className="font-sans mb-10 max-w-xl leading-relaxed font-semibold"
                style={{ fontSize: 16, color: "#4B5563" }}
              >
                Join businesses across India, the USA, Canada & UAE that upgraded their digital presence with Webwala Studio and started seeing real results fast.
              </p>
              <button
                onClick={() => handleOpenContact("Final CTA - Ready to Go Live")}
                className="btn-shine btn-gradient inline-flex items-center justify-center gap-2 font-sans font-bold"
                style={{ fontSize: 15, padding: "15px 36px", borderRadius: 50, boxShadow: "0 6px 30px rgba(124,58,237,0.32)" }}
              >
                <CalendarCheck className="h-5 w-5" />
                Book a Free Consultation
              </button>
            </div>

            {/* Wave divider → Footer */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none">
              <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-[56px] md:h-[80px]">
                <path d="M0,80 C360,10 1080,10 1440,80 L1440,80 L0,80 Z" fill="#1E1B4B" />
              </svg>
            </div>
          </section>

          {/* FOOTER BAR */}
          <Footer onOpenContact={handleOpenContact} />
        </Suspense>

      </main>

      {/* FLOATING WHATSAPP BUTTON */}
      <div className="wa-wrapper" style={{ position: "fixed", bottom: 24, right: 24, zIndex: 50 }}>
        {/* Pulse rings */}
        <span className="wa-ring" />
        <span className="wa-ring wa-ring-2" />
        {/* Tooltip */}
        <div
          className="wa-tooltip"
          style={{
            position: "absolute", right: "calc(100% + 10px)", top: "50%",
            transform: "translateY(-50%)",
            background: "#1E1B4B", color: "white",
            fontSize: 12, fontWeight: 700, fontFamily: "inherit",
            padding: "6px 12px", borderRadius: 20,
            whiteSpace: "nowrap", pointerEvents: "none",
            boxShadow: "0 4px 16px rgba(30,27,75,0.18)",
          }}
        >
          Chat with us
        </div>
        <a
          href={`https://wa.me/${WA_NUMBER}?text=${WA_PREFILL}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          style={{ position: "relative", display: "flex" }}
          onClick={() => trackEvent("whatsapp_click", { source: "floating_button" })}
          className="bg-[#25D366] text-white p-3.5 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-transform duration-200"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
      </div>

      {/* OVERLAYS AND MODALS */}
      <Suspense fallback={null}>
        <ContactModal
          isOpen={isContactOpen}
          onClose={() => setIsContactOpen(false)}
          prefilledPlan={prefilledPlan}
        />
      </Suspense>
    </div>
    </MotionConfig>
  );
}
