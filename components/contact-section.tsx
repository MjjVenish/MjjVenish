"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  Github,
  Linkedin,
} from "lucide-react";
import { profile } from "@/lib/profile-data";
import { Reveal, Eyebrow } from "@/components/section-shell";

const contactInfo = [
  { icon: Mail, value: profile.email, href: `mailto:${profile.email}` },
  { icon: Phone, value: profile.phone, href: profile.phoneHref },
  { icon: MapPin, value: profile.location, href: null },
];

const projectTypes = [
  "Full-time opportunity",
  "Freelance project",
  "Performance / SEO audit",
  "Collaboration",
  "Just saying hi",
];

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

const empty: FormData = { name: "", email: "", subject: "", message: "" };

const fieldClass =
  "w-full rounded-xl border border-white bg-white/70 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 shadow-sm transition focus:border-primary/50 focus:ring-2 focus:ring-primary/20 focus:outline-none disabled:opacity-50";

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>(empty);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [responseMessage, setResponseMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<string[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors.length > 0) setFieldErrors([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setFieldErrors([]);
    setResponseMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setResponseMessage(data.message);
        setFormData(empty);
        setTimeout(() => {
          setStatus("idle");
          setResponseMessage("");
        }, 5000);
      } else {
        setStatus("error");
        setFieldErrors(data.errors || ["Something went wrong."]);
      }
    } catch {
      setStatus("error");
      setFieldErrors(["Network error. Please check your connection and try again."]);
    }
  };

  const busy = status === "submitting";

  return (
    <section id="contact" className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
      <Reveal className="glass grid gap-10 rounded-3xl p-6 sm:p-10 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <Eyebrow>Let&apos;s Connect</Eyebrow>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Have a project in mind?
            <br />
            Let&apos;s build something fast together.
          </h2>

          <ul className="mt-8 flex flex-col gap-4">
            {contactInfo.map(({ icon: Icon, value, href }) => (
              <li key={value} className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/80 text-primary shadow-sm">
                  <Icon className="h-4 w-4" />
                </span>
                {href ? (
                  <a href={href} className="transition hover:text-foreground">
                    {value}
                  </a>
                ) : (
                  value
                )}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex gap-3">
            {[
              { href: profile.github, Icon: Github, label: "GitHub" },
              { href: profile.linkedin, Icon: Linkedin, label: "LinkedIn" },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-muted-foreground shadow-sm transition hover:bg-foreground hover:text-background"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="glass-strong rounded-2xl p-5 sm:p-6">
          {fieldErrors.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-3"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
              <div className="flex flex-col gap-1">
                {fieldErrors.map((err) => (
                  <p key={err} className="text-sm text-destructive">
                    {err}
                  </p>
                ))}
              </div>
            </motion.div>
          )}

          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 p-3"
            >
              <CheckCircle className="h-4 w-4 shrink-0 text-primary" />
              <p className="text-sm text-primary">{responseMessage}</p>
            </motion.div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="sr-only">Your name</span>
              <input name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Your Name" disabled={busy} className={fieldClass} required />
            </label>
            <label className="block">
              <span className="sr-only">Your email</span>
              <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Your Email" disabled={busy} className={fieldClass} required />
            </label>
          </div>
          <label className="mt-4 block">
            <span className="sr-only">What is this about?</span>
            <select name="subject" value={formData.subject} onChange={handleChange} disabled={busy} className={`${fieldClass} ${formData.subject ? "" : "text-muted-foreground/70"}`} required>
              <option value="" disabled>
                What is this about?
              </option>
              {projectTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
          <label className="mt-4 block">
            <span className="sr-only">Your message</span>
            <textarea name="message" rows={5} value={formData.message} onChange={handleChange} placeholder="Your Message" disabled={busy} className={`${fieldClass} resize-none`} required />
          </label>

          <button
            type="submit"
            disabled={busy || status === "success"}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-foreground px-6 py-3 text-sm font-medium text-background shadow-lg shadow-foreground/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:min-w-52"
          >
            {busy ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : status === "success" ? (
              <>
                <CheckCircle className="h-4 w-4" />
                Message Sent!
              </>
            ) : (
              <>
                Send Message
                <Send className="h-4 w-4" />
              </>
            )}
          </button>
        </form>
      </Reveal>
    </section>
  );
}
