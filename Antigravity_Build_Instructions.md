Build Brief  •  For Antigravity / AI Coding Agent

# Clinovate Agency Website — Technical Build Instructions

A precise, self-contained brief to hand directly to an AI coding agent so it can scaffold,
design, and build the project correctly from the first prompt — no back-and-forth needed
to establish basics.

Target agent: **Antigravity (or equivalent agentic IDE)**

Version 1.0  |  July 2026

# 1\. Project Summary (Give This Context First)

Build a premium, dark-themed marketing website for a two-person web development and
digital marketing agency that specializes in building websites, WordPress sites,
marketing, and hardened security for local service businesses — starting with clinics,
later cafés and restaurants. The site must feel luxurious, distinctive, and technically
impressive, since it is itself a sales tool: visitors will judge the agency's competence
by the quality of this site.

**Non-negotiable requirement:** the site must be fully responsive from 375px to 1920px+
wide, must implement real security headers (not just claim to), and must use genuine
Supabase Row Level Security — this project is explicitly meant to demonstrate the agency's
security expertise, so security shortcuts are not acceptable anywhere in the codebase.

# 2\. Tech Stack (Use Exactly This)

Layer| Technology  
---|---  
Framework| React (Vite, not Create React App)  
Styling| Tailwind CSS  
Animation| Framer Motion (primary), GSAP + ScrollTrigger (for the Process timeline only)  
Backend/runtime| Node.js (for any server-side function needs, e.g. Vercel/Netlify
serverless functions)  
Database| Supabase (Postgres + RLS)  
Email delivery| EmailJS (client-side contact form submission)  
Version control| Git, hosted on GitHub  
Deployment target| Vercel or Netlify  
Edge/security layer| Cloudflare (assume DNS proxy will sit in front of the deployed
domain)  
  
# 3\. Design System — Implement Exactly

## 3.1 Color Tokens (add to Tailwind config)

// tailwind.config.js — theme.extend.colors colors: { bg: { DEFAULT: '#0B0B0F', // primary
background surface: '#15151C', // card / elevated surface }, accent: { gold: '#C9A227', //
primary luxury accent emerald: '#10B981', // security / trust accent }, text: { primary:
'#F5F5F0', muted: '#9A9AA5', } }

## 3.2 Typography

  * Headings: **Fraunces** (Google Fonts) — weight 600/700
  * Body: **Inter** (Google Fonts) — weight 400/500
  * Load both via @fontsource packages or a Google Fonts <link> in index.html — do not use system font fallbacks as the primary look.

## 3.3 Motion Rules

  * Use Framer Motion for: hero entrance animation, scroll-triggered fade/slide-up reveals on each section, magnetic hover effect on primary CTA buttons.
  * Use GSAP ScrollTrigger only for the Process timeline (Section 6 below) where scroll-scrubbed progress is needed.
  * Respect prefers-reduced-motion: reduce — disable non-essential animation for users who set this.
  * Add a subtle custom cursor (desktop only, disable on touch devices) and a low-opacity noise/grain texture overlay on the background.

## 3.4 Layout Rules

  * Mobile-first Tailwind breakpoints. Test explicitly at 375px, 768px, 1024px, 1440px, 1920px.
  * Services and "Why Us" sections use an asymmetric bento-grid layout (CSS grid with varying cell spans) — not equal-width three-column cards.
  * Security and AI Automation sections use a glassmorphism card style: backdrop-blur \+ semi-transparent surface + soft gradient blob behind it.
  * No stock photography anywhere. Use abstract SVG/3D-style illustrations or gradient shapes instead.

# 4\. Project Folder Structure

agency-site/ ├── src/ │ ├── components/ │ │ ├── layout/ (Navbar, Footer, Container) │ │
├── sections/ (Hero, Services, WhyUs, Process, │ │ │ CaseStudies, SecuritySection, │ │ │
Pricing, Testimonials, FAQ, Contact) │ │ ├── ui/ (Button, Card, Badge, GlassCard, │ │ │
BentoGrid, SectionHeading) │ │ └── widgets/ │ │ └── SecurityScanWidget.jsx │ ├── lib/ │ │
├── supabaseClient.js │ │ └── emailjs.js │ ├── hooks/ │ ├── data/ (services.js,
pricing.js, faq.js — static content) │ ├── styles/ │ │ └── globals.css │ ├── App.jsx │ └──
main.jsx ├── public/ ├── .env.example ├── tailwind.config.js ├── vite.config.js └──
package.json

# 5\. Environment Variables

Create a .env.example file with these keys (never commit actual values):

VITE_SUPABASE_URL= VITE_SUPABASE_ANON_KEY= VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID= VITE_EMAILJS_PUBLIC_KEY=

Never expose the Supabase _service role_ key on the client. Only the anon key, protected
by RLS policies, should ever reach the browser.

# 6\. Page Sections — Build in This Order

### 6.1 Navbar + Hero

  * Sticky navbar, transparent over hero, solid background on scroll.
  * Hero headline (serif, large), subheading, primary CTA button ("Book a Free Consultation") and secondary CTA ("Try the Free Security Scan" — scrolls to widget).
  * Embed the SecurityScanWidget directly in or just below the hero.

### 6.2 Security Scan Widget (Lead Magnet)

  * Input field for a URL.
  * On submit, perform basic client-safe checks: whether the URL resolves over HTTPS, presence/absence of common security headers via a HEAD request (note: full header inspection may require a small serverless function to avoid CORS issues — implement one Node serverless function for this if needed).
  * Display a simple score (e.g. out of 100) with 2–3 specific findings and a CTA: "Get a full report — book a call."
  * Log each scan request (URL + timestamp) to a Supabase table for lead tracking (see schema below).

### 6.3 Services Section

Bento grid with 5 items: Website Development, WordPress Development, Marketing, Security
Hardening (Site Shield), AI Automation. Make the Security and AI Automation tiles visually
larger/highlighted since they are the differentiators.

### 6.4 Why Us Section

Render as a comparison table or two-column layout: "Typical Freelancer" vs. "Us" across
rows: Security, Ongoing Support, AI/Automation, Industry Specialization.

### 6.5 Process Timeline

5 steps: Discover → Design → Build → Secure → Launch & Grow. Use GSAP ScrollTrigger to
animate a progress line as the user scrolls through this section.

### 6.6 Case Studies / Demos

Card grid, each linking to a live demo or screenshot. Include a way to actually try the AI
receptionist demo (link/embed) if available.

### 6.7 Security Section (Dedicated)

This section needs its own visual identity (emerald accent, glass cards). Include:

  * The Site Shield baseline checklist (see Project Plan document, Section 5.1)
  * The WordPress-specific hardening list (Section 5.2)
  * The Maintain & Protect retainer description (Section 5.3)
  * A visual "Typical Freelancer vs. Site Shield" comparison table

### 6.8 Pricing

Three tiers: Starter, Growth, Premium. Highlight Growth as "Most Popular." Pull tier
contents from the Project Plan document, Section 9.

### 6.9 Testimonials, FAQ, Contact

  * Testimonials: build the component to accept an empty/placeholder state gracefully since none exist yet.
  * FAQ: accordion component, keyboard accessible.
  * Contact: EmailJS-powered form (name, email, business type, message) + WhatsApp click-to-chat button + embedded calendar booking link.

# 7\. Supabase Schema

\-- leads table: captures contact form + security scan submissions create table leads ( id uuid primary key default gen_random_uuid(), name text, email text, business_type text, message text, source text, -- 'contact_form' | 'security_scan' scanned_url text, -- populated only for security_scan source created_at timestamptz default now() ); \-- Enable Row Level Security alter table leads enable row level security; \-- Allow anonymous INSERT only (no read/update/delete from client) create policy "Allow public insert" on leads for insert to anon with check (true); \-- No select/update/delete policy is created for anon — \-- this means the client can only ever write, never read back other leads.

**Security requirement:** Do not create a broad "allow all" policy. The anon role must
only be able to INSERT into the leads table — never SELECT, UPDATE, or DELETE. Any
dashboard or admin view of leads must use a separate authenticated route, never the public
anon key.

# 8\. Security Implementation Checklist (Must Actually Be Implemented, Not Just Described)

  * Configure HTTPS redirect + HSTS header at the hosting/edge level (Vercel/Netlify + Cloudflare)
  * Set Content-Security-Policy, X-Frame-Options, X-Content-Type-Options, and Referrer-Policy headers (via hosting config, e.g. vercel.json headers block)
  * Validate and sanitize all form inputs client-side and, where a serverless function is used, server-side as well
  * Add basic rate limiting to any serverless function endpoint (e.g. simple IP-based throttling)
  * Confirm Supabase RLS policies match Section 7 exactly before considering the backend complete
  * Ensure no API keys or secrets appear in client-side bundles — audit with a production build check
  * Run npm audit before final delivery and resolve high/critical vulnerabilities

# 9\. Coding Conventions

  * Functional React components with hooks only — no class components.
  * One component per file, named exports preferred for shared UI components, default export for pages/sections.
  * Tailwind utility classes directly in JSX; extract to a component when a pattern repeats more than twice.
  * Keep animation variants (Framer Motion) defined as constants at the top of each section file, not inline, for readability.
  * Commit convention: Conventional Commits style (feat:, fix:, chore:, style:).
  * Branch strategy: main (production) + dev (integration) + short-lived feature/* branches.

# 10\. Build Order Summary (Suggested Prompt Sequence for the Agent)

Step 1 — Scaffold Vite + React + Tailwind project, install Framer Motion, GSAP, Supabase
client, EmailJS SDK. Set up folder structure exactly as in Section 4.

Step 2 — Implement design tokens (Section 3) in tailwind.config.js and globals.css, load
fonts.

Step 3 — Build Navbar, Footer, and shared UI primitives (Button, Card, GlassCard,
BentoGrid, SectionHeading).

Step 4 — Build Hero + Security Scan Widget, wire up Supabase insert for scan logging.

Step 5 — Build Services, Why Us, Process sections in order.

Step 6 — Build Case Studies and the dedicated Security section.

Step 7 — Build Pricing, Testimonials, FAQ, Contact (EmailJS wiring).

Step 8 — Apply the full security checklist from Section 8, run npm audit, test
responsiveness at all five breakpoints.

Step 9 — Deploy to Vercel/Netlify, connect domain, configure Cloudflare in front of it.

# 11\. Acceptance Criteria (Definition of Done)

  * Site scores 90+ on Lighthouse for Performance, Accessibility, and Best Practices on both mobile and desktop
  * All security headers present and verifiable via a live header-check tool
  * Supabase RLS confirmed to block anonymous SELECT/UPDATE/DELETE on the leads table
  * Fully functional on Chrome, Safari, and Firefox at all five tested breakpoints
  * Contact form and Security Scan widget both successfully write to Supabase and trigger EmailJS notifications
  * No console errors in production build; no secrets present in client bundle

Hand this document to the AI coding agent alongside the Project Plan document for full
context before the first build prompt.

