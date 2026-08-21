import { createContext, useContext, useState, useCallback, lazy, Suspense, type ReactNode } from "react";
import { MotionConfig } from "motion/react";
import Navbar from "./Navbar";
import ScrollProgress from "./ScrollProgress";
import { trackEvent } from "../lib/analytics";

const Footer = lazy(() => import("./Footer"));
const ContactModal = lazy(() => import("./ContactModal"));

const WA_NUMBER = "919818726094";
const WA_PREFILL = encodeURIComponent("Hi Webwala Studio! 👋 I visited your website and I'm interested in getting a website built for my business. Can you help me?");

interface ContactModalContextValue {
  openContact: (planFocus?: string | null) => void;
}

const ContactModalContext = createContext<ContactModalContextValue | null>(null);

/** Lets any content inside <PageShell> trigger the contact modal without prop-drilling. */
export function useContactModal(): ContactModalContextValue {
  const ctx = useContext(ContactModalContext);
  if (!ctx) throw new Error("useContactModal must be used within a PageShell");
  return ctx;
}

interface PageShellProps {
  children: ReactNode;
  /** Analytics source tag for the floating WhatsApp button's click event. */
  whatsAppSource: string;
}

/**
 * Shared page chrome (ScrollProgress, Navbar, floating WhatsApp button, Footer,
 * ContactModal) — every top-level route (home, FAQ, and future service/location/
 * blog pages) wraps its content in this instead of re-forking the boilerplate.
 */
export default function PageShell({ children, whatsAppSource }: PageShellProps) {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [prefilledPlan, setPrefilledPlan] = useState<string | null>(null);

  const openContact = useCallback((planFocus: string | null = null) => {
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
      <ContactModalContext.Provider value={{ openContact }}>
        <div className="relative min-h-screen bg-bg-cream selection:bg-primary/20 selection:text-brand-navy flex flex-col justify-between">
          <ScrollProgress />

          <Navbar onOpenContact={() => openContact(null)} />

          <main className="flex-1 w-full flex flex-col items-stretch">
            {children}
          </main>

          <Suspense fallback={null}>
            <Footer />
          </Suspense>

          {/* FLOATING WHATSAPP BUTTON */}
          <div className="wa-wrapper" style={{ position: "fixed", bottom: 24, right: 24, zIndex: 50 }}>
            <span className="wa-ring" />
            <span className="wa-ring wa-ring-2" />
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
              onClick={() => trackEvent("whatsapp_click", { source: whatsAppSource })}
              className="bg-[#25D366] text-white p-3.5 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-transform duration-200"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
          </div>

          <Suspense fallback={null}>
            <ContactModal
              isOpen={isContactOpen}
              onClose={() => setIsContactOpen(false)}
              prefilledPlan={prefilledPlan}
            />
          </Suspense>
        </div>
      </ContactModalContext.Provider>
    </MotionConfig>
  );
}
