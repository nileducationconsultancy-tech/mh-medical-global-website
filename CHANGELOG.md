# CHANGELOG: Homepage Top-1% Redesign & Upgrade

All major updates across UI, UX, Content Integrity, SEO, GEO, and Compliance implemented on October 22, 2026.

---

### [2.0.0] - 2026-10-22

#### 1. Content Integrity & Single Source of Truth
- **Canonical Pricing Engine**: Consolidated all university financial data into `frontend/src/data/universitiesData.js` as the sole canonical source of truth.
  - Benchmark exchange rate: `1 USD = ₹84.50 INR` (Reserve Bank of India reference rate, October 2026).
  - Explicit formula: `6-Year Tuition = Annual Tuition × 6`.
  - Transparent all-inclusive formula: `6-Year Total = (Tuition + Hostel + Mess + Visa/Insurance) × 6 + First-Year Registration & Documentation`.
  - Resolved all contradictions:
    - 6-Year Government Tuition: **₹15.2 Lakhs to ₹19.8 Lakhs** ($18,000 – $23,400 USD).
    - 6-Year All-Inclusive Range: **₹24.9 Lakhs to ₹31.7 Lakhs** ($29,500 – $37,500 USD).
    - Tashkent Medical Academy: $3,900/yr tuition (6-Yr tuition ₹19.77L; all-inclusive ₹31.69L; up to ₹33.97L with optional annual round-trip flights).
  - Standardized flight duration across all pages, FAQs, and comparison tables: **3.5 Hours Direct Non-Stop Flight** (Delhi DEL to Tashkent TAS).
- **De-risked Regulatory Claims**:
  - Removed "Guaranteed NMC FMGL compliance support" and replaced with "NMC FMGL 2021 Eligibility Guidance".
  - Removed "#1 Destination", "Top Choice 2026", and unsourced star ratings.
  - Added a "How We Verify" 5-pillar verification methodology modal and outbound links.
- **Image Fallbacks**: Created `ImageWithFallback.jsx` with error-state handlers and clear TODO markers for authentic university campus photography.

#### 2. UI Redesign & New Sections
- **Split Hero Layout**:
  - Left column: Optimized H1, 1-line value proposition, 3 non-contradictory trust stats with animated numbers, primary CTA ("Check My Eligibility") and secondary CTA ("Calculate 6-Year Fees").
  - Right column: `HeroQuickForm.jsx` compact 3-field lead capture form (Student Name, +91 Mobile Number with OTP-readiness, NEET Score) with WhatsApp direct alternative.
  - Hero image preloaded in `index.html` with WCAG AA compliant gradient overlay.
- **Regulatory Trust Bar**: Outbound links to National Medical Commission (NMC), World Directory of Medical Schools (WDOMS / WHO), Ministry of Health of Uzbekistan, and FAIMER.
- **Key Facts Summary Box**: Structured, quotable key metrics (Course Duration 54m + 12m, 100% English medium, Tuition Range, NEET status, 3.5h Flight Time).
- **Why Uzbekistan**: 6-card benefit grid with a 45-word direct answer block for AI search engines.
- **Semantic Comparison Table**: Rebuilt `CountryComparisonSection.jsx` using a semantic `<table>` with sticky header, horizontal scroll hint on mobile, and transparent source footnotes.
- **University Cards & Compare Drawer**: Uniform height cards, consistent data rows, 3-column responsive grid, "Compare" checkbox (up to 3 colleges), and a floating `CompareDrawer.jsx` with 1-click comparison routing.
- **Fee Calculator**: Elevated to a hero feature in the fees section, featuring an INR/USD toggle, shareable URL query state (`?uni=...&curr=...`), and a lead-gated itemized PDF download CTA.
- **Eligibility Checker**: Dedicated standalone section on the homepage (no longer hidden behind a tab).
- **Delhi-to-Tashkent Route Card**: Interactive travel route card with airline details, student baggage allowance (up to 46kg), and Tashkent airport reception support.
- **Indian Mess & Hostel Living**: Detailed breakdown of North and South Indian dining (veg, Jain, halal non-veg) and 24/7 central winter heating.
- **Student Life Gallery**: Campus environment, 3D anatomy dissection suites, and student community celebrations.
- **Parents' Concerns Block**: Direct answers addressing student safety, food, financial transparency, and NExT / licensing preparation.
- **Founder & Leadership Section**: Portrait slot, credentials, LinkedIn link, short bio, and the Leadership Transparency Pledge.
- **Student Testimonials**: Verified student profiles in a 3-column desktop layout and interactive mobile carousel, without fabricated star ratings.
- **9-Step Admissions Roadmap**: Complete vertical timeline displaying all 9 steps with icons and milestone descriptions.
- **Expanded FAQ Section**: 15 comprehensive questions with all answers preserved in the static DOM for crawlers (with accessible visual accordion collapse).
- **Sticky Mobile Bottom Bar**: 3-action mobile navigation (Call Expert | WhatsApp | Eligibility) with adjusted floating widgets to prevent overlap.

#### 3. UX, Conversion & Technical SEO
- **Honeypot Spam Protection**: Integrated silent bot trap in lead capture forms.
- **Hindi Language Toggle Scaffolding**: Added `i18nHomepage.js` with bilingual dictionary structure (`EN` / `HI`).
- **Telemetry & Event Tracking**: Implemented centralized `dataLayer` dispatching (`track()`) for CTA clicks, calculator use, and form submissions.
- **Meta & Heading Hierarchy**: Exactly 1 H1 per page, logical H2/H3 cascade, title <= 60 chars, description <= 155 chars, hreflang (`en-IN`), and canonical tags.
- **SSG Prerendering**: Verified 34/34 routes statically generated with prerender script (`scripts/prerender.mjs`), expanding homepage static HTML to 215.8 KB for search engine crawlers.

#### 4. Generative Engine Optimization (GEO) & AI Search
- Added 40-60 word AI-quotable direct answers to all major homepage sections.
- JSON-LD schemas generated: `EducationalOrganization`, `WebSite`, `Person`, `FAQPage`, `BreadcrumbList`, and `CollegeOrUniversity` (NO Review/AggregateRating schemas).
- Updated `/llms.txt` and `/llms-full.txt` with canonical fee structures and regulatory facts.
- Verified AI crawler permissions in `robots.txt` (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, OAI-SearchBot).

#### 5. Compliance & Trust
- Updated footer with comprehensive advisory role disclaimer, absence of admission/visa guarantees, direct university payment policy, and company registration placeholders.
- Added `CookieConsentBanner.jsx` with `localStorage` persistence and direct link to Privacy Policy.
