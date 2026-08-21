import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "motion/react";
import { CalendarCheck, Zap, Smartphone, ChevronDown, Monitor, Tablet } from "lucide-react";
import { gsap, useGSAP } from "../lib/scroll";

interface HeroProps {
  onOpenContact: () => void;
}

const words = ["that Works", "that Sells", "that Grows", "that Converts"];
const devices = ["desktop", "tablet", "mobile"] as const;
type Device = typeof devices[number];

/* ── Shared chip label ── */
function Chip({ text, color, bg }: { text: string; color: string; bg: string }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", background: bg, borderRadius: 30, padding: "2px 8px", marginBottom: 8 }}>
      <span style={{ fontSize: 7, fontWeight: 800, color, letterSpacing: "0.8px", textTransform: "uppercase", fontFamily: "inherit" }}>{text}</span>
    </div>
  );
}

/* ── Device mockups ── */
function DesktopMockup() {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ boxShadow: "0 40px 100px rgba(99,102,241,0.22), 0 8px 32px rgba(99,102,241,0.1), 0 0 0 1px rgba(224,231,255,0.9)" }}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3" style={{ background: "rgba(255,255,255,0.92)", borderBottom: "1px solid rgba(224,231,255,0.7)" }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57", flexShrink: 0 }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FFBD2E", flexShrink: 0 }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28C840", flexShrink: 0 }} />
        <div className="flex items-center gap-1.5" style={{ flex: 1, height: 20, borderRadius: 20, background: "rgba(224,231,255,0.7)", marginLeft: 10, paddingLeft: 10 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(99,102,241,0.5)", flexShrink: 0 }} />
          <div style={{ height: 6, borderRadius: 10, background: "rgba(99,102,241,0.18)", width: "55%" }} />
        </div>
      </div>

      {/* Scrollable viewport */}
      <div style={{ height: 248, overflow: "hidden", background: "linear-gradient(160deg, #EEF2FF 0%, #F0F4FF 60%, #EDE9FE 100%)" }}>
        <div className="scroll-page" style={{ padding: "14px 14px 0" }}>

          {/* USP 1 — Hero + Pricing */}
          <div style={{ background: "rgba(255,255,255,0.88)", borderRadius: 12, padding: "16px 18px 18px", marginBottom: 10 }}>
            <Chip text="Webwala Studio" color="#7C3AED" bg="rgba(124,58,237,0.1)" />
            <div style={{ height: 9, borderRadius: 20, background: "rgba(30,27,75,0.18)", width: "72%", marginBottom: 6 }} />
            <div style={{ height: 7, borderRadius: 20, background: "rgba(30,27,75,0.1)", width: "50%", marginBottom: 14 }} />
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ height: 28, width: 130, borderRadius: 50, background: "linear-gradient(135deg, #0EA5E9, #7C3AED)" }} />
              <div style={{ background: "rgba(16,185,129,0.12)", borderRadius: 30, padding: "4px 10px" }}>
                <span style={{ fontSize: 8, fontWeight: 800, color: "#059669", fontFamily: "inherit" }}>From ₹12,000</span>
              </div>
            </div>
          </div>

          {/* USP 2 — 7 Days Delivery */}
          <div style={{ background: "rgba(255,255,255,0.82)", borderRadius: 12, padding: "14px 16px", marginBottom: 10 }}>
            <Chip text="7 Days Delivery" color="#0EA5E9" bg="rgba(14,165,233,0.1)" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
              {[
                { label: "Day 1–2", title: "Discovery", color: "rgba(56,189,248,0.2)" },
                { label: "Day 3–5", title: "Design & Build", color: "rgba(124,58,237,0.18)" },
                { label: "Day 6–7", title: "Go Live 🚀", color: "rgba(16,185,129,0.18)" },
              ].map((s, i) => (
                <div key={i} style={{ background: s.color, borderRadius: 8, padding: "8px 9px" }}>
                  <div style={{ fontSize: 7, fontWeight: 800, color: "#1E1B4B", opacity: 0.6, marginBottom: 3, fontFamily: "inherit" }}>{s.label}</div>
                  <div style={{ fontSize: 8, fontWeight: 700, color: "#1E1B4B", fontFamily: "inherit" }}>{s.title}</div>
                </div>
              ))}
            </div>
          </div>

          {/* USP 3 — All Devices */}
          <div style={{ background: "rgba(255,255,255,0.82)", borderRadius: 12, padding: "14px 16px", marginBottom: 10 }}>
            <Chip text="Works on All Devices" color="#7C3AED" bg="rgba(124,58,237,0.1)" />
            <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
              {/* Desktop shape */}
              <div style={{ flex: 1.4 }}>
                <div style={{ background: "rgba(124,58,237,0.12)", borderRadius: 6, height: 42, marginBottom: 3, border: "1.5px solid rgba(124,58,237,0.2)" }} />
                <div style={{ height: 5, background: "rgba(124,58,237,0.15)", borderRadius: 2, width: "40%", margin: "0 auto" }} />
                <div style={{ fontSize: 7, textAlign: "center", color: "#7C3AED", fontWeight: 700, marginTop: 3, fontFamily: "inherit" }}>Desktop</div>
              </div>
              {/* Tablet shape */}
              <div style={{ flex: 1 }}>
                <div style={{ background: "rgba(14,165,233,0.12)", borderRadius: 5, height: 36, marginBottom: 3, border: "1.5px solid rgba(14,165,233,0.2)" }} />
                <div style={{ fontSize: 7, textAlign: "center", color: "#0EA5E9", fontWeight: 700, marginTop: 3, fontFamily: "inherit" }}>Tablet</div>
              </div>
              {/* Mobile shape */}
              <div style={{ flex: 0.6 }}>
                <div style={{ background: "rgba(16,185,129,0.12)", borderRadius: 5, height: 28, marginBottom: 3, border: "1.5px solid rgba(16,185,129,0.2)" }} />
                <div style={{ fontSize: 7, textAlign: "center", color: "#059669", fontWeight: 700, marginTop: 3, fontFamily: "inherit" }}>Mobile</div>
              </div>
            </div>
          </div>

          {/* USP 4 — Pricing cards */}
          <div style={{ background: "rgba(255,255,255,0.82)", borderRadius: 12, padding: "14px 16px", marginBottom: 10 }}>
            <Chip text="Transparent Pricing" color="#059669" bg="rgba(16,185,129,0.1)" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
              {[
                { price: "₹12K", label: "Starter", bg: "rgba(238,242,255,0.9)", accent: "#6B7280" },
                { price: "₹28K", label: "Pro", bg: "linear-gradient(135deg,#1E1B4B,#312E81)", accent: "#A78BFA" },
                { price: "₹55K", label: "Business", bg: "rgba(238,242,255,0.9)", accent: "#6B7280" },
              ].map((p, i) => (
                <div key={i} style={{ background: p.bg, borderRadius: 8, padding: "8px 9px", textAlign: "center" }}>
                  <div style={{ fontSize: 11, fontWeight: 900, color: i === 1 ? "white" : "#1E1B4B", marginBottom: 2, fontFamily: "inherit" }}>{p.price}</div>
                  <div style={{ fontSize: 7, color: p.accent, fontWeight: 700, fontFamily: "inherit" }}>{p.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA strip */}
          <div style={{ borderRadius: 10, padding: "13px 16px", background: "linear-gradient(135deg, #1E1B4B, #312E81)", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 9, fontWeight: 800, color: "rgba(255,255,255,0.9)", marginBottom: 4, fontFamily: "inherit" }}>Ready to go live?</div>
              <div style={{ fontSize: 7, color: "rgba(255,255,255,0.5)", fontFamily: "inherit" }}>Book a free consultation today</div>
            </div>
            <div style={{ height: 24, width: 72, borderRadius: 30, background: "linear-gradient(135deg, #0EA5E9, #7C3AED)", flexShrink: 0 }} />
          </div>

        </div>
      </div>
    </div>
  );
}

function TabletMockup() {
  return (
    <div style={{ width: 270, margin: "0 auto" }}>
      <div
        style={{
          borderRadius: 28,
          border: "12px solid #C8D0E2",
          overflow: "hidden",
          boxShadow: "0 32px 80px rgba(99,102,241,0.22), inset 0 0 0 1px rgba(255,255,255,0.6), 0 0 0 1px rgba(180,190,210,0.5)",
        }}
      >
        {/* Top bezel — camera */}
        <div style={{ height: 22, background: "rgba(255,255,255,0.92)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#B8C2D6" }} />
        </div>

        {/* Scrollable screen */}
        <div style={{ height: 300, overflow: "hidden", background: "linear-gradient(160deg, #EEF2FF 0%, #F0F4FF 60%, #EDE9FE 100%)" }}>
          <div className="scroll-page" style={{ padding: "8px 8px 0" }}>

            {/* Mini browser bar */}
            <div className="flex items-center gap-1 mb-2 px-2 py-1" style={{ background: "rgba(255,255,255,0.8)", borderRadius: 6 }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#FF5F57" }} />
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#FFBD2E" }} />
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#28C840" }} />
              <div style={{ flex: 1, height: 9, borderRadius: 20, background: "rgba(224,231,255,0.8)", marginLeft: 5 }} />
            </div>

            {/* USP 1 — Hero + Pricing badge */}
            <div style={{ background: "rgba(255,255,255,0.88)", borderRadius: 9, padding: "11px 12px 13px", marginBottom: 7 }}>
              <Chip text="Webwala Studio" color="#7C3AED" bg="rgba(124,58,237,0.1)" />
              <div style={{ height: 7, borderRadius: 20, background: "rgba(30,27,75,0.18)", width: "78%", marginBottom: 5 }} />
              <div style={{ height: 6, borderRadius: 20, background: "rgba(30,27,75,0.1)", width: "55%", marginBottom: 10 }} />
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <div style={{ height: 22, width: 100, borderRadius: 30, background: "linear-gradient(135deg, #0EA5E9, #7C3AED)", flexShrink: 0 }} />
                <div style={{ background: "rgba(16,185,129,0.12)", borderRadius: 30, padding: "3px 8px" }}>
                  <span style={{ fontSize: 7, fontWeight: 800, color: "#059669", fontFamily: "inherit" }}>From ₹12,000</span>
                </div>
              </div>
            </div>

            {/* USP 2 — 7 Days Delivery */}
            <div style={{ background: "rgba(255,255,255,0.82)", borderRadius: 9, padding: "10px 11px", marginBottom: 7 }}>
              <Chip text="7 Days Delivery" color="#0EA5E9" bg="rgba(14,165,233,0.1)" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 5 }}>
                {[
                  { label: "Day 1–2", title: "Discovery", color: "rgba(56,189,248,0.2)" },
                  { label: "Day 3–5", title: "Build", color: "rgba(124,58,237,0.18)" },
                  { label: "Day 6–7", title: "Go Live 🚀", color: "rgba(16,185,129,0.18)" },
                ].map((s, i) => (
                  <div key={i} style={{ background: s.color, borderRadius: 7, padding: "7px 8px" }}>
                    <div style={{ fontSize: 6, fontWeight: 800, color: "#1E1B4B", opacity: 0.6, marginBottom: 2, fontFamily: "inherit" }}>{s.label}</div>
                    <div style={{ fontSize: 7, fontWeight: 700, color: "#1E1B4B", fontFamily: "inherit" }}>{s.title}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* USP 3 — All Devices */}
            <div style={{ background: "rgba(255,255,255,0.82)", borderRadius: 9, padding: "10px 11px", marginBottom: 7 }}>
              <Chip text="All Devices" color="#7C3AED" bg="rgba(124,58,237,0.1)" />
              <div style={{ display: "flex", gap: 6, alignItems: "flex-end" }}>
                <div style={{ flex: 1.4 }}>
                  <div style={{ background: "rgba(124,58,237,0.12)", borderRadius: 5, height: 32, border: "1.5px solid rgba(124,58,237,0.2)", marginBottom: 2 }} />
                  <div style={{ fontSize: 6, textAlign: "center", color: "#7C3AED", fontWeight: 700, fontFamily: "inherit" }}>Desktop</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ background: "rgba(14,165,233,0.12)", borderRadius: 5, height: 26, border: "1.5px solid rgba(14,165,233,0.2)", marginBottom: 2 }} />
                  <div style={{ fontSize: 6, textAlign: "center", color: "#0EA5E9", fontWeight: 700, fontFamily: "inherit" }}>Tablet</div>
                </div>
                <div style={{ flex: 0.65 }}>
                  <div style={{ background: "rgba(16,185,129,0.12)", borderRadius: 5, height: 20, border: "1.5px solid rgba(16,185,129,0.2)", marginBottom: 2 }} />
                  <div style={{ fontSize: 6, textAlign: "center", color: "#059669", fontWeight: 700, fontFamily: "inherit" }}>Mobile</div>
                </div>
              </div>
            </div>

            {/* USP 4 — Pricing */}
            <div style={{ background: "rgba(255,255,255,0.82)", borderRadius: 9, padding: "10px 11px", marginBottom: 7 }}>
              <Chip text="Pricing from ₹12K" color="#059669" bg="rgba(16,185,129,0.1)" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 5 }}>
                {[
                  { price: "₹12K", label: "Starter", bg: "rgba(238,242,255,0.9)", c: "#1E1B4B", lc: "#6B7280" },
                  { price: "₹28K", label: "Pro", bg: "linear-gradient(135deg,#1E1B4B,#312E81)", c: "white", lc: "#A78BFA" },
                  { price: "₹55K", label: "Biz", bg: "rgba(238,242,255,0.9)", c: "#1E1B4B", lc: "#6B7280" },
                ].map((p, i) => (
                  <div key={i} style={{ background: p.bg, borderRadius: 7, padding: "7px 8px", textAlign: "center" }}>
                    <div style={{ fontSize: 10, fontWeight: 900, color: p.c, marginBottom: 1, fontFamily: "inherit" }}>{p.price}</div>
                    <div style={{ fontSize: 6, color: p.lc, fontWeight: 700, fontFamily: "inherit" }}>{p.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA banner */}
            <div style={{ borderRadius: 9, padding: "11px 12px", background: "linear-gradient(135deg, #1E1B4B, #312E81)", marginBottom: 7, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: 8, fontWeight: 800, color: "rgba(255,255,255,0.9)", marginBottom: 3, fontFamily: "inherit" }}>Ready to go live?</div>
                <div style={{ fontSize: 6, color: "rgba(255,255,255,0.5)", fontFamily: "inherit" }}>Book a free consultation</div>
              </div>
              <div style={{ height: 20, width: 55, borderRadius: 30, background: "linear-gradient(135deg, #0EA5E9, #7C3AED)", flexShrink: 0 }} />
            </div>

            <div style={{ height: 14 }} />
          </div>
        </div>

        {/* Bottom bezel */}
        <div style={{ height: 20, background: "rgba(255,255,255,0.92)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 52, height: 4, borderRadius: 2, background: "#B8C2D6" }} />
        </div>
      </div>
    </div>
  );
}

function MobileMockup() {
  return (
    <div style={{ width: 195, margin: "0 auto" }}>
      <div
        style={{
          borderRadius: 36,
          border: "10px solid #D4DAEA",
          overflow: "hidden",
          boxShadow: "0 32px 80px rgba(99,102,241,0.22), 0 0 0 1px rgba(224,231,255,0.6)",
        }}
      >
        {/* Dynamic island */}
        <div style={{ height: 26, background: "rgba(255,255,255,0.92)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 58, height: 8, borderRadius: 20, background: "#C8D0E0" }} />
        </div>

        {/* Scrollable screen */}
        <div style={{ height: 310, overflow: "hidden", background: "linear-gradient(160deg, #EEF2FF 0%, #F0F4FF 60%, #EDE9FE 100%)" }}>
          <div className="scroll-page" style={{ padding: "9px 9px 0" }}>

            {/* USP 1 — Hero + Price badge */}
            <div style={{ background: "rgba(255,255,255,0.88)", borderRadius: 10, padding: "11px 11px 13px", marginBottom: 7 }}>
              <Chip text="Webwala Studio" color="#7C3AED" bg="rgba(124,58,237,0.1)" />
              <div style={{ height: 7, borderRadius: 20, background: "rgba(30,27,75,0.18)", width: "88%", marginBottom: 5 }} />
              <div style={{ height: 6, borderRadius: 20, background: "rgba(30,27,75,0.1)", width: "65%", marginBottom: 10 }} />
              <div style={{ height: 24, borderRadius: 30, background: "linear-gradient(135deg, #0EA5E9, #7C3AED)", width: "100%", marginBottom: 7 }} />
              <div style={{ background: "rgba(16,185,129,0.12)", borderRadius: 30, padding: "3px 9px", display: "inline-block" }}>
                <span style={{ fontSize: 7, fontWeight: 800, color: "#059669", fontFamily: "inherit" }}>Starting at ₹12,000</span>
              </div>
            </div>

            {/* USP 2 — 7 Days Delivery */}
            <div style={{ background: "rgba(255,255,255,0.82)", borderRadius: 10, padding: "10px 11px", marginBottom: 7 }}>
              <Chip text="7 Days Delivery" color="#0EA5E9" bg="rgba(14,165,233,0.1)" />
              {[
                { label: "Day 1–2", title: "Discovery", color: "rgba(56,189,248,0.18)" },
                { label: "Day 3–5", title: "Design & Build", color: "rgba(124,58,237,0.14)" },
                { label: "Day 6–7", title: "Go Live 🚀", color: "rgba(16,185,129,0.15)" },
              ].map((s, i) => (
                <div key={i} style={{ background: s.color, borderRadius: 7, padding: "6px 9px", marginBottom: i < 2 ? 5 : 0, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: 6, fontWeight: 800, color: "#1E1B4B", opacity: 0.55, fontFamily: "inherit" }}>{s.label}</div>
                  <div style={{ fontSize: 7, fontWeight: 700, color: "#1E1B4B", fontFamily: "inherit" }}>{s.title}</div>
                </div>
              ))}
            </div>

            {/* USP 3 — All Devices */}
            <div style={{ background: "rgba(255,255,255,0.82)", borderRadius: 10, padding: "10px 11px", marginBottom: 7 }}>
              <Chip text="All Devices" color="#7C3AED" bg="rgba(124,58,237,0.1)" />
              <div style={{ display: "flex", gap: 5, alignItems: "flex-end" }}>
                <div style={{ flex: 1.4 }}>
                  <div style={{ background: "rgba(124,58,237,0.12)", borderRadius: 4, height: 26, border: "1.5px solid rgba(124,58,237,0.2)", marginBottom: 2 }} />
                  <div style={{ fontSize: 6, textAlign: "center", color: "#7C3AED", fontWeight: 700, fontFamily: "inherit" }}>Desktop</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ background: "rgba(14,165,233,0.12)", borderRadius: 4, height: 20, border: "1.5px solid rgba(14,165,233,0.2)", marginBottom: 2 }} />
                  <div style={{ fontSize: 6, textAlign: "center", color: "#0EA5E9", fontWeight: 700, fontFamily: "inherit" }}>Tablet</div>
                </div>
                <div style={{ flex: 0.65 }}>
                  <div style={{ background: "rgba(16,185,129,0.12)", borderRadius: 4, height: 16, border: "1.5px solid rgba(16,185,129,0.2)", marginBottom: 2 }} />
                  <div style={{ fontSize: 6, textAlign: "center", color: "#059669", fontWeight: 700, fontFamily: "inherit" }}>Mobile</div>
                </div>
              </div>
            </div>

            {/* USP 4 — Pricing */}
            <div style={{ background: "rgba(255,255,255,0.82)", borderRadius: 10, padding: "10px 11px", marginBottom: 7 }}>
              <Chip text="Pricing" color="#059669" bg="rgba(16,185,129,0.1)" />
              {[
                { price: "₹12,000", label: "Starter", bg: "rgba(238,242,255,0.9)", c: "#1E1B4B", lc: "#6B7280" },
                { price: "₹28,000", label: "Professional", bg: "linear-gradient(135deg,#1E1B4B,#312E81)", c: "white", lc: "#A78BFA" },
                { price: "₹55,000", label: "Business Pro", bg: "rgba(238,242,255,0.9)", c: "#1E1B4B", lc: "#6B7280" },
              ].map((p, i) => (
                <div key={i} style={{ background: p.bg, borderRadius: 7, padding: "6px 9px", marginBottom: i < 2 ? 4 : 0, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: 6, color: p.lc, fontWeight: 700, fontFamily: "inherit" }}>{p.label}</div>
                  <div style={{ fontSize: 9, fontWeight: 900, color: p.c, fontFamily: "inherit" }}>{p.price}</div>
                </div>
              ))}
            </div>

            {/* CTA banner */}
            <div style={{ borderRadius: 9, padding: "11px 12px", background: "linear-gradient(135deg, #1E1B4B, #312E81)", marginBottom: 7 }}>
              <div style={{ fontSize: 8, fontWeight: 800, color: "rgba(255,255,255,0.9)", marginBottom: 4, fontFamily: "inherit" }}>Ready to go live?</div>
              <div style={{ fontSize: 6, color: "rgba(255,255,255,0.5)", marginBottom: 9, fontFamily: "inherit" }}>Book a free consultation today</div>
              <div style={{ height: 20, borderRadius: 30, background: "linear-gradient(135deg, #0EA5E9, #7C3AED)" }} />
            </div>

            <div style={{ height: 14 }} />
          </div>
        </div>

        {/* Bottom nav */}
        <div style={{ padding: "7px 14px 3px", background: "rgba(255,255,255,0.92)", borderTop: "1px solid rgba(224,231,255,0.7)", display: "flex", justifyContent: "space-around" }}>
          {[0, 1, 2, 3].map(i => (
            <div key={i} style={{ width: 20, height: 20, borderRadius: 5, background: i === 0 ? "rgba(124,58,237,0.28)" : "rgba(124,58,237,0.07)" }} />
          ))}
        </div>
        {/* Home indicator */}
        <div style={{ display: "flex", justifyContent: "center", padding: "4px 0 6px", background: "rgba(255,255,255,0.92)" }}>
          <div style={{ width: 48, height: 4, borderRadius: 2, background: "rgba(99,102,241,0.22)" }} />
        </div>
      </div>
    </div>
  );
}

export default function Hero({ onOpenContact }: HeroProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [deviceIndex, setDeviceIndex] = useState(0);
  const direction = useRef(1); // 1 = forward, -1 = backward
  const mockupRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  /* ── Scroll parallax: blobs, copy, and mockup drift at different speeds ── */
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const exitScrub = {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      };
      gsap.utils.toArray<HTMLElement>("[data-hero-parallax]").forEach((el) => {
        gsap.to(el, {
          yPercent: parseFloat(el.dataset.heroParallax ?? "0.15") * 100,
          ease: "none",
          scrollTrigger: exitScrub,
        });
      });
      gsap.to(".hero-copy", { y: -36, ease: "none", scrollTrigger: exitScrub });
      gsap.to(".hero-mock-wrap", { y: -64, ease: "none", scrollTrigger: exitScrub });
      gsap.to(".hero-scroll-hint", {
        opacity: 0,
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "15% top", scrub: true },
      });
    });
  }, { scope: sectionRef });

  /* ── 3D tilt ── */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 160, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 160, damping: 22 });
  const rotateX = useTransform(springY, [-1, 1], [7, -7]);
  const rotateY = useTransform(springX, [-1, 1], [-9, 9]);

  const handleMouseMove = (e: { clientX: number; clientY: number }) => {
    const rect = mockupRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
    mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
  };
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  /* ── Word cycle ── */
  useEffect(() => {
    const t = setInterval(() => setWordIndex(i => (i + 1) % words.length), 2800);
    return () => clearInterval(t);
  }, []);

  /* ── Device auto-cycle (always forward) ── */
  useEffect(() => {
    const t = setInterval(() => {
      direction.current = 1;
      setDeviceIndex(i => (i + 1) % devices.length);
    }, 3200);
    return () => clearInterval(t);
  }, []);

  const goToDevice = (i: number) => {
    direction.current = i > deviceIndex ? 1 : -1;
    setDeviceIndex(i);
  };

  const currentDevice: Device = devices[deviceIndex];
  const deviceLabels = [
    { icon: Monitor, label: "Desktop" },
    { icon: Tablet, label: "Tablet" },
    { icon: Smartphone, label: "Mobile" },
  ];

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #EFF6FF 0%, #F5F3FF 50%, #EDE9FE 100%)",
        padding: "120px 5% 56px",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Dot grid */}
      <div className="dot-grid-light absolute inset-0 pointer-events-none" />

      {/* Morphing liquid glass blobs — parallax wrappers move, inner blobs morph */}
      <div data-hero-parallax="0.1" className="absolute pointer-events-none" style={{ top: "4%", right: "4%", width: 620, height: 620 }}>
        <div className="morph-blob-a" style={{ width: "100%", height: "100%", background: "radial-gradient(circle at 35% 30%, rgba(56,189,248,0.28) 0%, rgba(14,165,233,0.14) 40%, transparent 70%)" }} />
      </div>
      <div data-hero-parallax="0.22" className="absolute pointer-events-none" style={{ bottom: "-5%", left: "-3%", width: 500, height: 500 }}>
        <div className="morph-blob-b" style={{ width: "100%", height: "100%", background: "radial-gradient(circle at 38% 32%, rgba(167,139,250,0.26) 0%, rgba(124,58,237,0.12) 45%, transparent 70%)" }} />
      </div>
      <div data-hero-parallax="0.34" className="absolute pointer-events-none" style={{ top: "45%", left: "28%", width: 320, height: 320 }}>
        <div className="morph-blob-c" style={{ width: "100%", height: "100%", background: "radial-gradient(circle at 40% 35%, rgba(244,114,182,0.13) 0%, rgba(56,189,248,0.09) 50%, transparent 75%)" }} />
      </div>

      <div className="w-full max-w-[1200px] mx-auto relative z-10" style={{ flex: 1, display: "flex", alignItems: "center" }}>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center" style={{ width: "100%" }}>

          {/* ── Left copy ── */}
          <div className="hero-copy">
            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08 }}
              className="font-display font-black leading-tight mb-6"
              style={{ fontSize: "clamp(36px, 4.6vw, 60px)", letterSpacing: "-2px", color: "#1E1B4B" }}
            >
              Your Business Deserves a Website{" "}
              <span style={{ display: "inline-block" }}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIndex}
                    className="grad-shimmer"
                    initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                    transition={{ duration: 0.42, ease: [0.21, 0.47, 0.32, 0.98] }}
                    style={{ display: "inline-block" }}
                  >
                    {words[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="mb-8 max-w-xl"
              style={{ fontSize: 16, color: "#4B5563", lineHeight: 1.75 }}
            >
              We build professional, mobile-ready websites for businesses across Delhi NCR — and clients in the USA, Canada & UAE. No hassle, no hidden fees, delivered in under 7 days.
            </motion.p>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.22 }}
              className="flex items-center gap-6 mb-10"
            >
              {[
                { value: "7 Days", label: "Delivery" },
                { value: "100%", label: "Mobile First" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="liquid-glass"
                  style={{ padding: "8px 16px", borderRadius: 50 }}
                >
                  <div style={{ fontSize: 20, fontWeight: 900, color: "#1E1B4B", letterSpacing: "-0.8px", lineHeight: 1 }}>{stat.value}</div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#6B7280", marginTop: 3, letterSpacing: "0.3px" }}>{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="flex items-center flex-wrap gap-4"
            >
              <motion.button
                onClick={onOpenContact}
                className="btn-shine inline-flex items-center gap-2"
                style={{
                  background: "linear-gradient(135deg, #0EA5E9, #7C3AED)",
                  color: "white",
                  padding: "14px 30px",
                  borderRadius: 50,
                  fontSize: 14,
                  fontWeight: 700,
                  boxShadow: "0 4px 28px rgba(124,58,237,0.32)",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
                whileHover={{ y: -3, boxShadow: "0 12px 44px rgba(124,58,237,0.42)" }}
                whileTap={{ scale: 0.97 }}
              >
                <CalendarCheck className="h-4 w-4" />
                Book Free Consultation
              </motion.button>
              <Link to="/#portfolio" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 rounded" style={{ fontSize: 14, fontWeight: 700, color: "#7C3AED", textDecoration: "none" }}>
                See our work →
              </Link>
            </motion.div>
          </div>

          {/* ── Right: cycling device mockup ── */}
          <div className="hero-mock-wrap">
          <motion.div
            ref={mockupRef}
            className="relative"
            style={{ perspective: "1100px" }}
            initial={{ x: 40 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>

              {/* Slider container — fixed height prevents page jump when mockup heights differ */}
              <div style={{ height: 460, overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center", paddingBottom: 36 }}>
                <AnimatePresence mode="wait" custom={direction.current}>
                  <motion.div
                    key={currentDevice}
                    custom={direction.current}
                    variants={{
                      enter: (d: number) => ({ x: d * 80, opacity: 0, scale: 0.96 }),
                      center: { x: 0, opacity: 1, scale: 1 },
                      exit: (d: number) => ({ x: d * -80, opacity: 0, scale: 0.96 }),
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: "spring", stiffness: 260, damping: 28, mass: 0.9 }}
                  >
                    {currentDevice === "desktop" && <DesktopMockup />}
                    {currentDevice === "tablet" && <TabletMockup />}
                    {currentDevice === "mobile" && <MobileMockup />}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Floating "Site is Live!" liquid glass badge */}
              <div
                className="float-y absolute flex items-center gap-3"
                style={{
                  bottom: 6, right: currentDevice === "mobile" ? "20%" : -22,
                  background: "rgba(255,255,255,0.45)",
                  backdropFilter: "blur(24px) saturate(200%)",
                  WebkitBackdropFilter: "blur(24px) saturate(200%)",
                  borderRadius: 18,
                  padding: "12px 16px",
                  border: "1px solid rgba(255,255,255,0.72)",
                  boxShadow: "inset 0 1.5px 0 rgba(255,255,255,0.95), 0 20px 60px rgba(99,102,241,0.18), 0 2px 12px rgba(99,102,241,0.08)",
                  transition: "right 0.4s",
                }}
              >
                <div style={{ width: 40, height: 40, borderRadius: 11, background: "linear-gradient(135deg, rgba(209,250,229,0.9), rgba(110,231,183,0.85))", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: "1px solid rgba(255,255,255,0.6)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.9)" }}>
                  <Zap className="h-4 w-4" style={{ color: "#059669", fill: "#059669" }} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: "#1E1B4B", lineHeight: 1.2 }}>Site is Live!</div>
                  <div style={{ fontSize: 11, color: "#6B7280", marginTop: 2 }}>Delivered in 7 days</div>
                </div>
              </div>

            </motion.div>

            {/* Device selector strip — below the 3D tilt container so it's always flat */}
            <div className="flex items-center justify-center gap-3 mt-5">
              {deviceLabels.map(({ icon: Icon, label }, i) => (
                <button
                  key={i}
                  onClick={() => goToDevice(i)}
                  className="flex items-center gap-1.5 transition-all duration-300"
                  style={{
                    background: i === deviceIndex ? "rgba(124,58,237,0.1)" : "transparent",
                    border: `1px solid ${i === deviceIndex ? "rgba(124,58,237,0.3)" : "rgba(224,231,255,0.8)"}`,
                    borderRadius: 50,
                    padding: "10px 16px",
                    minHeight: 44,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Icon
                    className="h-3 w-3"
                    style={{ color: i === deviceIndex ? "#7C3AED" : "#6B7280" }}
                  />
                  <span style={{ fontSize: 11, fontWeight: 700, color: i === deviceIndex ? "#7C3AED" : "#6B7280" }}>
                    {label}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
          </div>

        </div>
      </div>

      {/* Trust strip */}
      <div
        className="w-full max-w-[1200px] mx-auto relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)]"
        style={{ borderTop: "1px solid var(--border)", marginTop: 48, paddingTop: 28 }}
      >
        {[
          { title: "Modern & Responsive Designs", description: "Looks great on all devices." },
          { title: "Fast Loading Websites", description: "Better user experience & higher conversions." },
          { title: "SEO Friendly Structure", description: "Built to rank higher on Google." },
          { title: "Secure & Reliable", description: "Your website and data are always protected." },
          { title: "Clear Communication & On-Time Delivery", description: "We keep you updated at every step." },
          { title: "Affordable Pricing for International Clients", description: "Great quality at fair and transparent rates." },
        ].map((item) => (
          <div key={item.title} className="text-center" style={{ padding: "12px 14px" }}>
            <h3 className="font-display font-extrabold" style={{ fontSize: 13, color: "var(--text-dark)", lineHeight: 1.3, marginBottom: 4 }}>
              {item.title}
            </h3>
            <p className="font-sans" style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.5 }}>
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-hint scroll-bounce" style={{ display: "flex", justifyContent: "center", marginTop: 20, pointerEvents: "none" }}>
        <ChevronDown className="h-5 w-5" style={{ color: "rgba(124,58,237,0.35)" }} />
      </div>
    </section>
  );
}
