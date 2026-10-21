import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import SkillsSection, { ServicesSection } from "@/components/skills-section";
import ExperienceSection from "@/components/experience-section";
import ProjectsSection from "@/components/projects-section";
import ProcessSection from "@/components/process-section";
import BlogSection from "@/components/blog-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import { profile, experience } from "@/lib/profile-data";
import { siteConfig, siteUrl } from "@/lib/site";

// Structured data so search engines understand who this site is about
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: profile.name,
      jobTitle: profile.role,
      description: siteConfig.description,
      url: siteUrl,
      image: `${siteUrl}${profile.photo}`,
      email: `mailto:${profile.email}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Chennai",
        addressRegion: "Tamil Nadu",
        addressCountry: "IN",
      },
      worksFor: { "@type": "Organization", name: experience.company },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "PET Engineering College",
      },
      knowsAbout: [
        "React.js",
        "Next.js",
        "Node.js",
        "TypeScript",
        "Express.js",
        "PostgreSQL",
        "MySQL",
        "Supabase",
        "Core Web Vitals",
        "SEO",
      ],
      sameAs: [profile.github, profile.linkedin],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteConfig.name,
      description: siteConfig.description,
      publisher: { "@id": `${siteUrl}/#person` },
      inLanguage: "en-IN",
    },
  ],
};

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <ProcessSection />
      <BlogSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
