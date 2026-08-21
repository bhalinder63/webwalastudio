/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense } from "react";
import Hero from "./components/Hero";
import { CalendarCheck } from "lucide-react";
import PageShell, { useContactModal } from "./components/PageShell";

const Services      = lazy(() => import("./components/Services"));
const HowItWorks    = lazy(() => import("./components/HowItWorks"));
const Portfolio     = lazy(() => import("./components/Portfolio"));
const Pricing       = lazy(() => import("./components/Pricing"));
const Testimonials  = lazy(() => import("./components/Testimonials"));

function SectionShimmer() {
  return <div className="section-shimmer" style={{ minHeight: "60vh", width: "100%" }} />;
}

function HomeContent() {
  const { openContact } = useContactModal();

  return (
    <>
      {/* HERO HEADER */}
      <Hero onOpenContact={() => openContact(null)} />

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
        <Pricing onOpenContact={openContact} />

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
              onClick={() => openContact("Final CTA - Ready to Go Live")}
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
      </Suspense>
    </>
  );
}

export default function App() {
  return (
    <PageShell whatsAppSource="floating_button">
      <HomeContent />
    </PageShell>
  );
}
