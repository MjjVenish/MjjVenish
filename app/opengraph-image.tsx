import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { profile, impact } from "@/lib/profile-data";

export const alt = `${profile.name} — ${profile.role} (React, Next.js, Node.js)`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Social share card shown on LinkedIn, WhatsApp, X, Slack, etc.
export default async function OpengraphImage() {
  const photo = await readFile(join(process.cwd(), "public/images/venish.jpg"));
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "64px 72px",
          background:
            "linear-gradient(135deg, #f5f3ff 0%, #eef2ff 45%, #e0f2fe 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 640 }}>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: 6,
              color: "#7c3aed",
              fontWeight: 700,
            }}
          >
            PORTFOLIO
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 88,
              fontWeight: 800,
              color: "#14142b",
              marginTop: 12,
              lineHeight: 1,
            }}
          >
            {profile.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 46,
              fontWeight: 700,
              marginTop: 14,
              backgroundImage: "linear-gradient(90deg, #7c3aed, #4f7cf7)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {profile.role}
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#4b4b63", marginTop: 22 }}>
            {profile.tagline}
          </div>

          <div style={{ display: "flex", gap: 14, marginTop: 40 }}>
            {impact.slice(0, 3).map((m) => (
              <div
                key={m.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "14px 20px",
                  borderRadius: 18,
                  background: "rgba(255,255,255,0.8)",
                  border: "1px solid rgba(255,255,255,1)",
                }}
              >
                <div style={{ display: "flex", fontSize: 32, fontWeight: 800, color: "#6d28d9" }}>
                  {m.value}
                </div>
                <div style={{ display: "flex", fontSize: 18, color: "#5b5b73" }}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", fontSize: 22, color: "#5b5b73", marginTop: 34 }}>
            {profile.location}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            padding: 12,
            borderRadius: 40,
            background: "rgba(255,255,255,0.65)",
            border: "2px solid rgba(255,255,255,0.95)",
            boxShadow: "0 30px 60px -20px rgba(91, 33, 182, 0.35)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photoSrc}
            alt=""
            width={360}
            height={480}
            style={{ borderRadius: 30, objectFit: "cover" }}
          />
        </div>
      </div>
    ),
    size
  );
}
