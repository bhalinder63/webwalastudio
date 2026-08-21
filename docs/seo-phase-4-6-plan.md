# SEO Plan — Phase 4, 5 & 6

These are the three phases that follow the technical/content work already shipped (Phase 1–3: technical foundation, service/location pages, blog). Nothing here is code — it's Google Business Profile access, outreach, and account dashboards, so it needs you (or whoever holds those accounts), not another build.

Context: Phases 1–3 gave the site 28 real, indexable pages (home, FAQ, 9 service pages, 5 location pages, 10 blog posts) with correct technical SEO. That work makes the site *rankable*. Phases 4–6 are what actually moves rank — local presence, external trust signals, and knowing what's working so effort goes where it pays off.

---

## Phase 4 — Google Business Profile (GBP)

Since you already have a GBP listing, this is optimization, not setup. Local-pack ranking (the map + 3-listing block above organic results) responds to this faster than almost anything else — expect visible movement in 4–8 weeks if done properly.

### NAP consistency (do this first)
"NAP" = Name, Address, Phone — and it needs to match **exactly**, character for character, across every place your business appears online.

- [ ] Compare your GBP listing's business name, address, and phone against the website's footer and the `LocalBusiness` schema in `index.html` (currently: "Webwala Studio", Gurugram/Haryana, +91-98187-26094).
- [ ] Check specifically for "Gurugram" vs "Gurgaon" — pick one and use it everywhere. Mismatches here are one of the most common reasons a listing quietly underperforms.
- [ ] Check phone number formatting matches (+91 98187 26094 vs 09818726094 vs other variants) across GBP, website, and any directory listing you already have.

### Categories & services
- [ ] Set your primary GBP category to the closest match (e.g., "Website designer" or "Web design company").
- [ ] Add secondary categories if relevant (e.g., "Marketing agency").
- [ ] In the GBP "Services" section, list the same 9 industries the site now has dedicated pages for — Schools & Institutes, Medical & Clinics, Corporate Business, Salons & Spas, Restaurants & Cafes, Real Estate & Builders, Law Firms, CA & Accounting Firms, E-Commerce Stores. Matching your GBP services to your website's service pages reinforces relevance signals for both.

### Service area
- [ ] Set GBP's service area to the 5 NCR cities the site targets: Gurugram, Delhi, Noida, Faridabad, Ghaziabad.

### Website links
- [ ] Point the GBP website field at the homepage.
- [ ] If GBP allows multiple links (e.g., an appointment/booking URL), point one at `/faq` (where the "Book a Free Consultation" CTA lives) or a relevant `/services/...` page if you're running a category-specific promotion.

### Photos
- [ ] Upload real project screenshots — the same ones used in the site's Portfolio section — not stock imagery. Real work builds more trust on GBP than anywhere else.
- [ ] Add a logo photo and a cover photo if not already set.
- [ ] Add a few "team at work" or office photos if available — listings with a mix of photo types tend to get more profile views.

### Posts
- [ ] Start posting roughly **biweekly** — GBP rewards active profiles in ranking. Good post content: a recently launched client site (with a screenshot), a new blog post link, a seasonal offer, or a reminder of the 7-day turnaround.

### Reviews
This is the highest-leverage, lowest-cost thing you can do for local ranking — and it's ongoing, not a one-time task.

- [ ] Build the "ask for a review" moment into your existing handoff process — you already walk clients through their finished site and hand over credentials; add "if you're happy with this, a Google review helps us a lot" at that exact moment.
- [ ] Send a direct Google review link (not just "search us on Google") to make it a 30-second action, not a scavenger hunt.
- [ ] Aim for steady velocity over a one-time push — a handful of new reviews every month outperforms 20 reviews collected once and then nothing for a year.
- [ ] Respond to every review, positive or negative. A reply signals an active, attentive business — to both prospects and to Google.

### Q&A section
- [ ] Seed the GBP Q&A section yourself with the questions you already answer constantly — timeline, pricing, maintenance. (You can literally reuse the FAQ content from the site's `/faq` page.) Pre-answered Q&A reduces friction for someone comparing you against a competitor's listing on the spot.

---

## Phase 5 — Backlinks (off-page authority)

GBP + local citations get you into the local pack. Backlinks are what push *organic* (non-map) rankings for terms like "website design agency Gurugram" above competitors. Realistic timeline: 3–6 months of consistent work before this shows up clearly in rankings.

### Directory & profile listings
Each of these is a legitimate backlink *and* a citation that reinforces NAP consistency — do them once, properly, rather than rushing.

- [ ] **Clutch** — agency-focused directory, commonly checked by prospects comparing vendors.
- [ ] **GoodFirms** — similar to Clutch, agency/service directory.
- [ ] **DesignRush** — design-agency-specific directory.
- [ ] **JustDial** — high-traffic Indian local business directory.
- [ ] **Sulekha** — Indian local services directory, especially relevant for NCR searches.
- [ ] **IndiaMART** — worth doing if you want inbound leads from that platform too, not just the backlink.
- [ ] **Behance / Dribbble** — upload actual project case studies (redesigns you've delivered) with a link back to the site. These also double as portfolio pieces you can point prospects to directly.

For each one: use the exact same NAP as your (now-corrected) GBP listing, and link to the homepage or the most relevant page (e.g., link a school-website case study to `/services/schools-institutes`).

### Client backlinks
This is the highest-quality backlink source you have, and it's already built into your existing pipeline — you deliver a finished site to every client.

- [ ] Ask each client, as part of the handoff conversation, whether they'd add a small "Website by Webwala Studio" credit link in their site's footer, linking back to `webwalastudio.com`.
- [ ] Not every client will say yes — that's fine. Even a 30–40% acceptance rate compounds meaningfully over time as you deliver more sites.
- [ ] Keep a simple log (a spreadsheet is enough) of which clients have added the link, so you can follow up with the ones who haven't yet.

### Local partnerships & guest content
One relevant, high-trust backlink from a real local organization is worth more than a dozen generic directory links.

- [ ] Look into Gurugram/Delhi NCR chambers of commerce or local business associations — many list member businesses with a link.
- [ ] Reach out to school administrator networks, clinic/medical associations, or local retailer groups you've already built for — offer a short guest post ("How we helped [type of business] launch in 7 days") in exchange for a backlink.
- [ ] If any client is a prominent local business, ask if they'd be open to a short case-study writeup on your blog with a quote from them — this gives them a reason to share/link back too.

### Social profile consistency
- [ ] Confirm the bio links on Instagram, Facebook, and LinkedIn all point to the live site (these are already referenced in the site's `sameAs` structured data, so keeping them live and correct matters for entity consistency, not just traffic).

### Tracking
- [ ] Keep a simple spreadsheet: site name, date submitted, status (pending/live/rejected), URL of the resulting listing. This takes five minutes per entry and saves you from re-doing work or losing track of what's outstanding.

---

## Phase 6 — Measurement & Iteration

Everything above is wasted effort if you can't tell what's working. This phase is a recurring rhythm, not a one-time checklist — treat it as a monthly (or biweekly, early on) habit.

### Google Search Console
- [ ] Confirm the property is verified (it already is — via the meta tag in `index.html`).
- [ ] Submit the sitemap: `https://www.webwalastudio.com/sitemap.xml` (Search Console → Sitemaps). This is auto-generated at every build now, so it always reflects the current 28+ pages.
- [ ] Weekly: check **Coverage** — are new pages (services, locations, blog posts) actually getting indexed? A page that isn't indexed after a couple of weeks is worth investigating rather than ignoring.
- [ ] Weekly/biweekly: check **Performance** — which queries are gaining impressions and clicks. This is where your *next* blog topics should come from — real search queries beat guessing.

### Google Analytics 4
- [ ] Confirm `consultation_open` and `whatsapp_click` (already tracked via `src/lib/analytics.ts`) are marked as **Key events / conversions** in GA4 — otherwise you're tracking activity without tracking what actually matters (leads).
- [ ] Set up a simple monthly check: traffic by landing page (are the new service/location/blog pages actually pulling visitors?), and conversions by source.

### Core Web Vitals / page speed
- [ ] Monthly: run the homepage and a couple of new pages through [PageSpeed Insights](https://pagespeed.web.dev/). The build already flags a ~535KB main JS chunk — watch that this doesn't creep up further as more content gets added.

### Rank tracking
- [ ] Pick 15–20 target keywords to track monthly — a mix of service+city combinations (e.g., "website design Gurugram", "clinic website design NCR", "school website Delhi") plus a couple of the harder generic terms ("web design agency Gurugram").
- [ ] Free option: Search Console's Performance tab shows real position data for queries you're already getting impressions on — start here before paying for a tool.
- [ ] Paid options if you want more (competitor tracking, keyword discovery): Ahrefs, SEMrush, or the cheaper Ubersuggest — only worth it once you have enough content/backlink activity for the extra detail to matter.

### Realistic expectations
- **4–8 weeks**: local-pack visibility improvements from GBP work (Phase 4) — this moves fastest.
- **3–6 months**: organic rankings for service+city long-tail terms, assuming consistent blog output (2 posts/month minimum) and steady backlink work.
- **6–12+ months**: competitive, generic terms ("web design agency India") — and even then, ranking #1 for these may require disproportionate authority-building spend relative to the return. The service+location+blog long-tail strategy is the actually-achievable path to compounding traffic — don't judge the whole effort by whether you're #1 for the hardest possible term.

---

## Quick-start priority order

If you only do five things this month, do these — they're the highest-leverage, lowest-effort items across all three phases:

1. Fix any NAP mismatches between GBP and the website (Phase 4).
2. Build "ask for a Google review" into your existing client handoff (Phase 4).
3. Submit the sitemap in Search Console (Phase 6) — takes five minutes, unlocks everything else.
4. List the business on Clutch and GoodFirms (Phase 5).
5. Mark `consultation_open` and `whatsapp_click` as GA4 conversions (Phase 6) — otherwise you won't be able to tell if any of this is working.
