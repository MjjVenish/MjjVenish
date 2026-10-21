import type { MetadataRoute } from "next";
import { profile } from "@/lib/profile-data";
import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: profile.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f5f4fc",
    theme_color: "#f5f4fc",
    icons: [{ src: "/apple-icon", sizes: "180x180", type: "image/png" }],
  };
}
