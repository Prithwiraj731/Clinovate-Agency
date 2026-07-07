# Clinovate — Premium Digital Agency Website

Clinovate is a state-of-the-art marketing and digital development agency platform designed with a high-end, responsive design system. The site showcases custom web development, local marketing, and digital security hardening services.

Live Url: **[https://clinovate-agency-alpha.vercel.app/](https://clinovate-agency-alpha.vercel.app/)**

---

## ✨ Features

- **Premium Visual Aesthetics**: Gold-on-emerald charcoal color schemes with SVG noise textures, glassmorphic structures, and smooth micro-animations.
- **Fluid Micro-Interactions**: Custom spring-damped tracking mouse cursor, hover physics, and GSAP ScrollTriggered timelines.
- **Interactive Security Analyzer**: A mock client scanner widget supported by a backend serverless function (`api/scan.js`) which parses HTTP response headers (CSP, HSTS, X-Frame-Options) on demand.
- **Cal.com Modal Overlay**: Interactive scheduling directly inside the page without redirecting users (powered by `@calcom/embed-react`).
- **Flexible Email Routing**: Contact forms routed directly to `prithwi1016@gmail.com` using a secure FormSubmit.co fallback if custom API keys are omitted.
- **Secure Database Layers**: Integration-ready with Supabase Row Level Security (RLS) policies for write-only lead recording.
- **State-Based Custom Router**: Embedded Privacy Policy and Terms of Service layouts with smooth section resets.

---

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://gsap.com/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Scheduler**: [@calcom/embed-react](https://cal.com)

---

## 🚀 Local Development Setup

To run this project locally, make sure you have [Node.js](https://nodejs.org/) installed:

1. Clone or navigate to the directory:
   ```bash
   cd agency-site
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the dev server:
   ```bash
   npm run dev
   ```

The application will run locally at `http://localhost:5173`.

---

## 🔑 Environment Variables Configuration

Copy `.env.example` to `.env` inside `agency-site/` and fill in the parameters to customize production integrations:

```ini
# Supabase Database Configuration
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# EmailJS Service Keys (Optional fallback to FormSubmit active by default)
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key_here

# Custom Calendar Booking URL
VITE_CALENDAR_URL=https://cal.com/prithwi1016/custom-meeting
```

---

## 📁 Repository Structure

```
Clinovate/
├── agency-site/
│   ├── api/                   # Serverless edge function routes (scan.js)
│   ├── src/
│   │   ├── components/        # Layout, Section, and UI primitives
│   │   ├── data/              # Static content configurations (FAQs, pricing, etc.)
│   │   ├── lib/               # Third-party integrations (Supabase, EmailJS)
│   │   ├── styles/            # Tailwind Global styles & noise structures
│   │   ├── App.jsx            # Main app router & custom cursor logic
│   │   └── main.jsx           # App entrypoint
│   ├── tailwind.config.js     # Tailwind layout tokens
│   └── vercel.json            # Strict security headers and CORS configurations
├── .gitignore                 # VCS exclusion list
└── README.md                  # Project documentation
```

---

## 🔒 Security Headers

The site is built under security-hardened standards. The production [vercel.json](file:///c:/Users/USER/Desktop/Clinovate/agency-site/vercel.json) applies the following rules:
- **Content-Security-Policy (CSP)**: Restrictions preventing unauthorized script/style injection.
- **HSTS (Strict-Transport-Security)**: Enforces SSL access.
- **X-Frame-Options**: Prevents clickjacking attacks.
- **Referrer-Policy**: Restricts referrer info leaks.
