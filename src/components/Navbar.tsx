import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { CalendarCheck, Menu, X } from "lucide-react";
import { routes, isActiveRoute } from "../routes";

interface NavbarProps {
  onOpenContact: () => void;
}

const topLevelLinks = routes.filter((route) => route.navVisible);

export default function Navbar({ onOpenContact }: NavbarProps) {
  const { pathname } = useLocation();
  const onHomepage = pathname === "/";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = ["home", "services", "portfolio", "testimonials", "pricing"];
    let observers: (IntersectionObserver | null)[] = [];

    const setupObservers = () => {
      observers.forEach((o) => o?.disconnect());
      observers = sections.map((id) => {
        const el = document.getElementById(id);
        if (!el) return null;
        const observer = new IntersectionObserver(
          ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
          { rootMargin: "-40% 0px -55% 0px" }
        );
        observer.observe(el);
        return observer;
      });
    };

    setupObservers();
    const timer = setTimeout(setupObservers, 800);

    return () => {
      clearTimeout(timer);
      observers.forEach((o) => o?.disconnect());
    };
  }, []);

  return (
    <>
      <header
        className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
        style={{
          height: 68,
          padding: "0 5%",
          background: scrolled
            ? "rgba(248,250,255,0.72)"
            : "rgba(255,255,255,0.55)",
          backdropFilter: "blur(32px) saturate(200%)",
          WebkitBackdropFilter: "blur(32px) saturate(200%)",
          display: "flex",
          alignItems: "center",
          boxShadow: scrolled
            ? "inset 0 1.5px 0 rgba(255,255,255,0.9), 0 8px 32px rgba(99,102,241,0.1)"
            : "inset 0 1.5px 0 rgba(255,255,255,0.8)",
        }}
      >
        {/* Iridescent bottom edge */}
        <div className="navbar-iridescent-edge" />
        <div className="w-full max-w-[1200px] mx-auto flex justify-between items-center">
          {/* LOGO */}
          <Link to="/" className="flex items-center">
            <img src="/logo.png" alt="Webwala Studio" className="h-9 w-auto" />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-6">
            {[
              { id: "home",         label: "Home",     href: "/#home" },
              { id: "services",     label: "Services", href: "/#services" },
              { id: "portfolio",    label: "Our Work", href: "/#portfolio" },
              { id: "testimonials", label: "Reviews",  href: "/#testimonials" },
              { id: "pricing",      label: "Pricing",  href: "/#pricing" },
            ].map(({ id, label, href }) => (
              <Link
                key={id}
                to={href}
                className="relative pb-1 transition-colors"
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: onHomepage && activeSection === id ? "#7C3AED" : "#4B5563",
                  textDecoration: "none",
                }}
              >
                {label}
                {onHomepage && activeSection === id && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                    style={{ background: "linear-gradient(135deg, #0EA5E9, #7C3AED)" }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            {topLevelLinks.map((route) => {
              const isActive = isActiveRoute(pathname, route.path);
              return (
                <Link
                  key={route.path}
                  to={route.path}
                  className="relative pb-1 transition-colors"
                  style={{ fontSize: 14, fontWeight: 600, color: isActive ? "#7C3AED" : "#4B5563", textDecoration: "none" }}
                >
                  {route.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                      style={{ background: "linear-gradient(135deg, #0EA5E9, #7C3AED)" }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA BUTTON */}
          <div className="hidden md:flex items-center">
            <button
              onClick={onOpenContact}
              className="btn-shine btn-gradient inline-flex items-center justify-center gap-2"
              style={{ padding: "10px 22px", borderRadius: 50, fontSize: 14 }}
            >
              <CalendarCheck className="h-4 w-4" />
              Book a Consultation
            </button>
          </div>

          {/* MOBILE TRIGGER */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            className="lg:hidden p-2 rounded-lg active:scale-95 transition-all"
            style={{ color: "#1E1B4B", background: "transparent", border: "none", cursor: "pointer" }}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* BACKDROP */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[998] lg:hidden"
            style={{ backgroundColor: "rgba(0,0,0,0.65)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
        <motion.div
          className="fixed inset-y-0 right-0 z-[999] w-72 flex flex-col px-6 py-6 lg:hidden"
          style={{ backgroundColor: "#1E1B4B" }}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <div
            className="flex items-center justify-between mb-8 pb-4"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
          >
            <span className="font-display font-extrabold text-white" style={{ fontSize: 17, letterSpacing: "-0.4px" }}>
              Webwala Studio
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-1 transition-colors border-none bg-transparent cursor-pointer"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex flex-col gap-1">
            {[
              { id: "home",         label: "Home",     href: "/#home" },
              { id: "services",     label: "Services", href: "/#services" },
              { id: "portfolio",    label: "Our Work", href: "/#portfolio" },
              { id: "testimonials", label: "Reviews",  href: "/#testimonials" },
              { id: "pricing",      label: "Pricing",  href: "/#pricing" },
              ...topLevelLinks.map((route) => ({ id: route.path, label: route.label, href: route.path })),
            ].map(({ id, label, href }) => {
              const isTopLevelLink = topLevelLinks.some((route) => route.path === href);
              const isActive = isTopLevelLink ? isActiveRoute(pathname, href) : (onHomepage && activeSection === id);
              return (
                <Link
                  key={id}
                  to={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-sans font-bold text-base py-3 px-4 rounded-lg transition-colors"
                  style={{
                    color: isActive ? "#38BDF8" : "rgba(255,255,255,0.8)",
                    background: isActive ? "rgba(56,189,248,0.1)" : "transparent",
                    textDecoration: "none",
                  }}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenContact(); }}
              className="btn-shine btn-gradient w-full inline-flex items-center justify-center gap-2 font-bold py-4 rounded-full"
              style={{ fontSize: 14 }}
            >
              <CalendarCheck className="h-5 w-5" />
              Book a Consultation
            </button>
          </div>
        </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
