// Single source of truth for portfolio content (mirrors the latest resume).

export const profile = {
  name: "Venish M",
  firstName: "Venish",
  role: "Full-Stack Developer",
  tagline: "React.js · Next.js · Node.js · TypeScript",
  location: "Chennai, Tamil Nadu, India",
  email: "venishmjj1018@gmail.com",
  phone: "+91 87541 53042",
  phoneHref: "tel:+918754153042",
  resume: "/VenishResume.pdf",
  photo: "/images/venish.jpg",
  github: "https://github.com/MjjVenish",
  linkedin: "https://www.linkedin.com/in/venish-m-911977248/",
};

export const stats = [
  { value: "3+", label: "Years Experience" },
  { value: "9", label: "Localised Sites Shipped" },
  { value: "20+", label: "Production Bugs Fixed" },
];

export const impact = [
  { value: "-35%", label: "Page load time" },
  { value: "-25%", label: "API response time" },
  { value: "+12", label: "Lighthouse mobile" },
  { value: "+20%", label: "Customer satisfaction" },
];

export const services = [
  {
    key: "frontend",
    title: "Frontend Engineering",
    description:
      "Fast, responsive React & Next.js interfaces — product pages, search, cart and checkout that convert.",
  },
  {
    key: "backend",
    title: "APIs & Backend",
    description:
      "RESTful Node.js / Express APIs with caching, query indexing and JWT auth on PostgreSQL & MySQL.",
  },
  {
    key: "performance",
    title: "Performance & SEO",
    description:
      "Core Web Vitals tuning, code splitting, lazy loading, JSON-LD schema and technical SEO.",
  },
  {
    key: "integrations",
    title: "Analytics & Integrations",
    description:
      "Amplitude, GA4 and ad pixels, payments (card, PayPal, Bacs), reviews, chat and design editors.",
  },
] as const;

export const technologies = [
  { name: "React.js", short: "Re", color: "#149eca" },
  { name: "Next.js", short: "N", color: "#111111" },
  { name: "TypeScript", short: "TS", color: "#3178c6" },
  { name: "JavaScript", short: "JS", color: "#d4b106" },
  { name: "Node.js", short: "No", color: "#5fa04e" },
  { name: "Express.js", short: "Ex", color: "#444444" },
  { name: "Tailwind CSS", short: "Tw", color: "#06b6d4" },
  { name: "PostgreSQL", short: "Pg", color: "#336791" },
  { name: "MySQL", short: "My", color: "#00758f" },
  { name: "Supabase", short: "Sb", color: "#3ecf8e" },
  { name: "C# / ASP.NET", short: "C#", color: "#7a3ec9" },
  { name: "Vercel", short: "▲", color: "#000000" },
];

export const toolbelt = [
  "Git & GitHub",
  "Postman",
  "BrowserStack",
  "New Relic",
  "Amplitude",
  "GA4",
  "JWT Auth",
  "JSON-LD",
  "Localization",
];

export const experience = {
  role: "Full-Stack Developer",
  company: "BM e-Solutions",
  client: "Rocaba Group",
  location: "Erode, Tamil Nadu",
  period: "Sep 2023 – Present",
  highlights: [
    "Built and maintain one multi-tenant Next.js codebase running 9 localised e-commerce sites, shipping 10+ features across product pages, search, cart and checkout.",
    "Built the “Quote to Order” workflow — product selection, artwork upload, delivery and payment (card, PayPal, Bacs).",
    "Redesigned header, footer, menus and product pages; built the new “Printed Bags Online” ordering experience with dynamic pricing and Fast Track options.",
    "Fixed CLS/LCP, lazy-loaded third-party scripts, split bundles and added an LRU cache — cutting page load time by 35%.",
    "Optimised Express.js APIs for product, cart and order flows with query indexing and response caching — 25% faster responses.",
    "Improved SEO with JSON-LD, canonical/meta tags, proper 404s, robots.txt and llms.txt.",
    "Set up Amplitude (events & session replay), GA4, Bing, Pinterest, TikTok and OpenAI Ads tracking.",
    "Integrated Feefo & Trustpilot reviews, the Polotno design editor, WhatsApp/Freshchat and consent-aware reCAPTCHA.",
    "Kept the platform secure with dependency & Node.js upgrades, bot blocking and New Relic monitoring; resolved 20+ production bugs.",
  ],
  stack: ["Next.js", "React.js", "Node.js", "Express.js", "New Relic", "Amplitude"],
};

export const projects = [
  {
    title: "StreetScore — Cricket Live Score",
    type: "Web App · Next.js App Router",
    description:
      "Real-time cricket scoring for street teams: ball-by-ball live scoring with no-ball rules, teams, players, statistics and leaderboards, backed by Supabase.",
    stack: ["Next.js", "Tailwind CSS", "Supabase"],
    live: "https://mysocre.netlify.app/",
    repo: null,
    preview: "cricket",
  },
  {
    title: "CarrierBag E-commerce",
    type: "Full-Stack · In Production",
    description:
      "Live e-commerce platform I own front-to-back — React/Next.js client with a Node.js/Express REST API, proper loading and error states.",
    stack: ["Next.js", "Node.js", "Express.js"],
    live: null,
    repo: "https://github.com/MjjVenish/CarrierBag",
    preview: "shop",
  },
  {
    title: "Multi-tenant Storefronts",
    type: "Client Work · Rocaba Group",
    description:
      "One Next.js codebase powering 9 localised e-commerce sites, with a Quote-to-Order flow and Printed Bags Online configurator.",
    stack: ["Next.js", "Localization", "Payments"],
    live: null,
    repo: null,
    preview: "tenants",
  },
] as const;

export const process = [
  { title: "Discover", description: "Understand the goal, users and constraints." },
  { title: "Plan", description: "Shape the data model, APIs and UI flow." },
  { title: "Build", description: "Ship typed, tested features end-to-end." },
  { title: "Optimise", description: "Measure Core Web Vitals, SEO and API speed." },
  { title: "Monitor", description: "Track analytics, errors and iterate." },
];
