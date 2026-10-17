import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/lib/profile-data";

const socialLinks = [
  { icon: Github, href: profile.github, label: "GitHub" },
  { icon: Linkedin, href: profile.linkedin, label: "LinkedIn" },
  { icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
];

export default function Footer() {
  return (
    <footer className="mx-auto max-w-7xl px-4 pt-4 pb-8 sm:px-6">
      <div className="glass flex flex-col items-center gap-4 rounded-3xl px-6 py-6 sm:flex-row sm:justify-between">
        <a href="#home" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-foreground font-bold text-background">
            V
          </span>
          <span className="text-sm font-semibold text-foreground">{profile.name}</span>
        </a>

        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {profile.name}. Built with Next.js & Tailwind CSS.
        </p>

        <div className="flex items-center gap-2">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={link.label}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-muted-foreground transition hover:bg-foreground hover:text-background"
            >
              <link.icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
