import { profile } from "@/lib/profile-data";

// Absolute site URL used for canonical links, sitemap and Open Graph images.
// Set NEXT_PUBLIC_SITE_URL to your live domain; Netlify (URL) and Vercel
// (VERCEL_PROJECT_PRODUCTION_URL) values are picked up automatically at build.
function resolveSiteUrl() {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL &&
      `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
    "http://localhost:3000";
  return raw.replace(/\/$/, "");
}

export const siteUrl = resolveSiteUrl();

export const siteConfig = {
  name: `${profile.name} — ${profile.role}`,
  title: `${profile.name} | ${profile.role} · React, Next.js & Node.js`,
  description:
    "Venish M is a Full-Stack Developer in Chennai with 3+ years building and scaling e-commerce platforms using React.js, Next.js, Node.js and TypeScript — cutting page load time by 35% and API response time by 25%.",
  keywords: [
    "Venish M",
    "Venish",
    "Full-Stack Developer",
    "Full Stack Developer Chennai",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "TypeScript",
    "Frontend Developer India",
    "E-commerce Developer",
    "Core Web Vitals",
    "Portfolio",
  ],
  locale: "en_IN",
};
