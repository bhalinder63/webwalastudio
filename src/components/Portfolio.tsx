import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    name: "Vrise Global",
    category: "EdTech / VR Learning",
    description: "360° VR immersive learning platform connecting schools with virtual reality experiences across India.",
    url: "https://vriseglobal.co.in",
    domain: "vriseglobal.co.in",
    screenshot: "/screenshot-vrise.webp",
    accentFrom: "#0EA5E9",
    accentTo: "#7C3AED",
    tag: "EdTech",
  },
  {
    name: "FeX Foundry Alloys",
    category: "Industrial / Manufacturing",
    description: "Global foundry alloys manufacturer serving 40+ countries with ISO 9001:2015 certified quality and 25,000 MT annual capacity.",
    url: "https://www.fexalloys.com",
    domain: "fexalloys.com",
    screenshot: "/screenshot-fex.webp",
    accentFrom: "#F59E0B",
    accentTo: "#EF4444",
    tag: "Manufacturing",
  },
];

function BrowserFrame({ screenshot, domain, accentFrom, accentTo }: {
  screenshot: string;
  domain: string;
  accentFrom: string;
  accentTo: string;
}) {
  return (
    <div
      style={{
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "0 32px 80px rgba(0,0,0,0.14), 0 0 0 1px rgba(224,231,255,0.8)",
      }}
    >
      {/* Browser chrome */}
      <div
        style={{
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(224,231,255,0.8)",
          padding: "10px 14px",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div style={{ display: "flex", gap: 5, flexShrink: 0 }}>
          <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#FF5F57" }} />
          <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#FFBD2E" }} />
          <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#28C840" }} />
        </div>
        {/* URL bar */}
        <div
          style={{
            flex: 1,
            height: 22,
            borderRadius: 20,
            background: "rgba(238,242,255,0.8)",
            display: "flex",
            alignItems: "center",
            paddingLeft: 10,
            gap: 6,
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${accentFrom}, ${accentTo})`,
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontSize: 10,
              fontWeight: 600,
              color: "#4B5563",
              fontFamily: "inherit",
              letterSpacing: "0.1px",
            }}
          >
            {domain}
          </span>
        </div>
      </div>

      {/* Scrolling screenshot */}
      <div style={{ height: 340, overflow: "hidden", background: "#f8f8f8" }}>
        <img
          src={screenshot}
          alt={`${domain} website screenshot`}
          loading="lazy"
          decoding="async"
          className="scroll-portfolio"
          style={{
            width: "100%",
            display: "block",
            transformOrigin: "top center",
          }}
        />
      </div>
    </div>
  );
}

export default function Portfolio() {
  return (
    <section
      id="portfolio"
      className="relative overflow-hidden py-24 scroll-mt-10"
      style={{ background: "#F8FAFF" }}
    >
      {/* Glass sphere orbs */}
      <div
        className="glass-sphere-blue orb-float absolute pointer-events-none"
        style={{ top: "-8%", right: "-4%", width: 440, height: 440 }}
      />
      <div
        className="glass-sphere orb-float-2 absolute pointer-events-none"
        style={{ bottom: "-8%", left: "-4%", width: 380, height: 380 }}
      />

      <div className="max-w-[1200px] mx-auto px-[5%] relative z-10">
        {/* Heading */}
        <motion.div
          className="text-center mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <span className="section-label">OUR WORK</span>
          <h2
            className="font-display font-black mb-4"
            style={{
              fontSize: "clamp(26px, 3.2vw, 42px)",
              letterSpacing: "-1.2px",
              color: "#1E1B4B",
            }}
          >
            Sites We've Built
          </h2>
          <p className="font-sans" style={{ fontSize: 16, color: "#4B5563", lineHeight: 1.7 }}>
            Real businesses, live on the web. From VR edtech to global manufacturing — each site
            built and launched in under 7 days.
          </p>
        </motion.div>

        {/* Project cards */}
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: idx * 0.14, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              {/* Browser frame */}
              <motion.div
                whileHover={{ y: -6, boxShadow: "0 40px 100px rgba(0,0,0,0.16)" }}
                transition={{ duration: 0.25 }}
              >
                <BrowserFrame
                  screenshot={project.screenshot}
                  domain={project.domain}
                  accentFrom={project.accentFrom}
                  accentTo={project.accentTo}
                />
              </motion.div>

              {/* Project info */}
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  {/* Category tag */}
                  <div
                    style={{
                      display: "inline-block",
                      background: `linear-gradient(135deg, ${project.accentFrom}18, ${project.accentTo}18)`,
                      border: `1px solid ${project.accentFrom}33`,
                      borderRadius: 30,
                      padding: "3px 10px",
                      fontSize: 10,
                      fontWeight: 800,
                      color: project.accentFrom,
                      letterSpacing: "0.6px",
                      textTransform: "uppercase",
                      marginBottom: 8,
                    }}
                  >
                    {project.tag}
                  </div>
                  <div
                    className="font-display font-black"
                    style={{ fontSize: 18, color: "#1E1B4B", marginBottom: 4 }}
                  >
                    {project.name}
                  </div>
                  <p
                    className="font-sans"
                    style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.6, maxWidth: 340 }}
                  >
                    {project.description}
                  </p>
                </div>

                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-sans font-bold shrink-0 transition-all"
                  style={{
                    fontSize: 13,
                    color: "white",
                    background: `linear-gradient(135deg, ${project.accentFrom}, ${project.accentTo})`,
                    padding: "8px 14px",
                    borderRadius: 50,
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    boxShadow: `0 4px 16px ${project.accentFrom}40`,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-2px)")}
                  onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Visit Site
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
