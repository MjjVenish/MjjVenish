import type { Metadata, Viewport } from "next";
import { Inter, Fira_Code } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
});

export const metadata: Metadata = {
  title: "Venish M | Full-Stack Developer",
  description:
    "Venish M — Full-Stack Developer (React.js, Next.js, Node.js, TypeScript) in Chennai with 3+ years building and scaling e-commerce platforms.",
};

export const viewport: Viewport = {
  themeColor: "#f5f4fc",
  colorScheme: "only light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${firaCode.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
