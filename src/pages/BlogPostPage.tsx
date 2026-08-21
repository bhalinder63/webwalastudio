import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { CalendarCheck } from "lucide-react";
import { getBlogPostBySlug, type BlogPost } from "../data/blog-posts.generated";
import { useSeoMeta, useJsonLd } from "../hooks/useSeoMeta";
import { buildBlogPostingSchema, buildBreadcrumbSchema } from "../lib/schema";
import PageShell, { useContactModal } from "../components/PageShell";

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function NotFoundContent() {
  return (
    <section className="relative overflow-hidden text-center" style={{ padding: "160px 5% 120px" }}>
      <div className="relative z-10 max-w-xl mx-auto">
        <h1 className="font-display font-black mb-5" style={{ fontSize: "clamp(28px, 3.6vw, 44px)", letterSpacing: "-1.5px", color: "#1E1B4B" }}>
          Post not found
        </h1>
        <Link
          to="/blog"
          className="btn-shine btn-gradient inline-flex items-center justify-center gap-2 font-sans font-bold"
          style={{ fontSize: 15, padding: "14px 32px", borderRadius: 50, textDecoration: "none" }}
        >
          View all posts
        </Link>
      </div>
    </section>
  );
}

function BlogPostContent({ post }: { post: BlogPost }) {
  const { openContact } = useContactModal();

  useSeoMeta({ title: `${post.title} | Webwala Studio`, description: post.metaDescription, path: `/blog/${post.slug}` });
  useJsonLd([
    buildBlogPostingSchema({ title: post.title, description: post.metaDescription, path: `/blog/${post.slug}`, datePublished: post.date }),
    buildBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: post.title, path: `/blog/${post.slug}` },
    ]),
  ]);

  return (
    <>
      <section
        className="relative overflow-hidden text-center"
        style={{
          padding: "140px 5% 60px",
          background: "linear-gradient(160deg, #EFF6FF 0%, #F5F3FF 50%, #EDE9FE 100%)",
        }}
      >
        <div className="dot-grid-light absolute inset-0 pointer-events-none" />
        <div className="glass-sphere-blue orb-float absolute pointer-events-none" style={{ top: "-15%", right: "-5%", width: 400, height: 400 }} />
        <div className="glass-sphere orb-float-2 absolute pointer-events-none" style={{ bottom: "-15%", left: "-5%", width: 350, height: 350 }} />

        <div className="relative z-10 max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <span className="section-label">{formatDate(post.date)}</span>
            <h1
              className="font-display font-black mb-4"
              style={{ fontSize: "clamp(28px, 3.6vw, 46px)", letterSpacing: "-1.6px", color: "#1E1B4B" }}
            >
              {post.title}
            </h1>
            <p className="font-sans" style={{ fontSize: 16, color: "#4B5563", lineHeight: 1.7 }}>
              {post.excerpt}
            </p>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: "50px 5% 80px", background: "#F8FAFF" }}>
        <div
          className="max-w-[720px] mx-auto blog-prose"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
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
            <span className="section-label">READY TO START</span>
            <h2 className="font-display font-black mb-4" style={{ fontSize: "clamp(24px, 3vw, 36px)", letterSpacing: "-1px", color: "#1E1B4B" }}>
              Ready to talk specifics?
            </h2>
            <p className="font-sans mb-8" style={{ fontSize: 16, color: "#4B5563", lineHeight: 1.7 }}>
              Book a free 15-minute call — we'll answer any questions this raised for your specific business.
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

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  return (
    <PageShell whatsAppSource="blog_post">
      {post ? <BlogPostContent post={post} /> : <NotFoundContent />}
    </PageShell>
  );
}
