import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Zap, MapPin, Phone, Mail, Link as LinkIcon, Share2, Instagram, ArrowUp } from "lucide-react";
import { services } from "../data/services";
import { locations } from "../data/locations";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.52, delay: i * 0.08, ease: [0.21, 0.47, 0.32, 0.98] },
  }),
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "Webwala Studio", url: window.location.href });
      } catch { /* user cancelled */ }
    } else {
      handleCopyLink();
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-brand-navy pt-16 pb-8 border-t border-bg-cream/10 text-white text-left overflow-hidden">
      {/* Dot grid overlay */}
      <div className="dot-grid absolute inset-0 pointer-events-none" />

      {/* Ambient corner glows */}
      <div className="glass-sphere orb-float absolute pointer-events-none" style={{ top: "-10%", right: "-5%", width: 320, height: 320 }} />
      <div className="glass-sphere-blue orb-float-2 absolute pointer-events-none" style={{ bottom: "-10%", left: "-5%", width: 280, height: 280 }} />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-16">

          {/* ── Logo & Intro ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            custom={0}
          >
            <Link to="/" className="font-display text-2xl font-bold text-bg-cream flex items-center gap-2 mb-4" style={{ textDecoration: "none" }}>
              Webwala Studio <Zap className="h-5 w-5 text-primary fill-primary" />
            </Link>
            <p className="font-sans text-sm text-bg-cream/70 mb-6 max-w-xs leading-relaxed">
              High-end, professional web design and development for businesses that want to stand out.
            </p>

            {/* Social + share icons */}
            <div className="flex gap-3">
              {/* Instagram */}
              <motion.a
                href="https://www.instagram.com/webwalastudio/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Webwala Studio on Instagram"
                className="flex items-center justify-center border-none cursor-pointer"
                style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.6)", textDecoration: "none" }}
                whileHover={{
                  scale: 1.12,
                  backgroundColor: "rgba(225,48,108,0.22)",
                  color: "#f472b6",
                  boxShadow: "0 0 16px rgba(225,48,108,0.35)",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.18 }}
              >
                <Instagram className="h-4 w-4" />
              </motion.a>

              {/* Copy link */}
              <motion.button
                aria-label={copied ? "Link copied!" : "Copy page link"}
                onClick={handleCopyLink}
                className="flex items-center justify-center border-none cursor-pointer"
                style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(255,255,255,0.07)", color: copied ? "#38BDF8" : "rgba(255,255,255,0.6)" }}
                whileHover={{
                  scale: 1.12,
                  backgroundColor: "rgba(56,189,248,0.18)",
                  color: "#38BDF8",
                  boxShadow: "0 0 16px rgba(56,189,248,0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.18 }}
              >
                <LinkIcon className="h-4 w-4" />
              </motion.button>

              {/* Share */}
              <motion.button
                aria-label="Share this page"
                onClick={handleShare}
                className="flex items-center justify-center border-none cursor-pointer"
                style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.6)" }}
                whileHover={{
                  scale: 1.12,
                  backgroundColor: "rgba(167,139,250,0.2)",
                  color: "#A78BFA",
                  boxShadow: "0 0 16px rgba(167,139,250,0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.18 }}
              >
                <Share2 className="h-4 w-4" />
              </motion.button>
            </div>
          </motion.div>

          {/* ── Services ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            custom={1}
          >
            <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-white/50 mb-6">Services</h4>
            <ul className="space-y-4">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="group flex items-center gap-1.5 text-bg-cream/75 hover:text-primary transition-colors font-sans text-sm font-semibold"
                    style={{ textDecoration: "none" }}
                  >
                    {service.title}
                    <span className="opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-[-4px] group-hover:translate-x-0" style={{ display: "inline-block" }}>
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── Locations ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            custom={2}
          >
            <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-white/50 mb-6">Locations</h4>
            <ul className="space-y-4">
              {locations.map((location) => (
                <li key={location.slug}>
                  <Link
                    to={`/locations/${location.slug}`}
                    className="group flex items-center gap-1.5 text-bg-cream/75 hover:text-primary transition-colors font-sans text-sm font-semibold"
                    style={{ textDecoration: "none" }}
                  >
                    {location.cityName}
                    <span className="opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-[-4px] group-hover:translate-x-0" style={{ display: "inline-block" }}>
                      →
                    </span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/blog"
                  className="group flex items-center gap-1.5 text-bg-cream/75 hover:text-primary transition-colors font-sans text-sm font-semibold"
                  style={{ textDecoration: "none" }}
                >
                  Blog
                  <span className="opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-[-4px] group-hover:translate-x-0" style={{ display: "inline-block" }}>
                    →
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="group flex items-center gap-1.5 text-bg-cream/75 hover:text-primary transition-colors font-sans text-sm font-semibold"
                  style={{ textDecoration: "none" }}
                >
                  FAQs
                  <span className="opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-[-4px] group-hover:translate-x-0" style={{ display: "inline-block" }}>
                    →
                  </span>
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* ── Contact ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            custom={3}
          >
            <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-white/50 mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-bg-cream/75 font-sans text-sm">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>Gurgaon, Haryana<br />India</span>
              </li>
              <li className="flex items-center gap-3 text-bg-cream/75 font-sans text-sm">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <a href="tel:+919818726094" className="hover:text-primary transition-colors">
                  +91 98187 26094
                </a>
              </li>
              <li className="flex items-center gap-3 text-bg-cream/75 font-sans text-sm">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <a href="mailto:support@webwalastudio.com" className="hover:text-primary transition-colors">
                  support@webwalastudio.com
                </a>
              </li>
            </ul>
          </motion.div>

        </div>

        {/* ── Bottom bar ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-20px" }}
          custom={4}
          className="border-t border-bg-cream/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="font-sans text-xs text-bg-cream/50">
            © {currentYear} Webwala Studio. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <div className="flex gap-6 font-sans text-xs text-bg-cream/50">
              <button className="hover:text-bg-cream transition-colors bg-transparent border-none cursor-pointer">
                Privacy Policy
              </button>
              <button className="hover:text-bg-cream transition-colors bg-transparent border-none cursor-pointer">
                Terms of Service
              </button>
            </div>

            {/* Back to top */}
            <motion.button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="flex items-center gap-1.5 font-sans text-xs font-bold border-none cursor-pointer"
              style={{
                background: "rgba(255,255,255,0.07)",
                color: "rgba(255,255,255,0.6)",
                borderRadius: 50,
                padding: "7px 14px",
              }}
              whileHover={{
                backgroundColor: "rgba(124,58,237,0.25)",
                color: "#A78BFA",
                boxShadow: "0 0 20px rgba(124,58,237,0.25)",
                y: -2,
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.18 }}
            >
              <ArrowUp className="h-3.5 w-3.5" />
              Back to top
            </motion.button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
