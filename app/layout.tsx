import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://wwilloww.ai";
const siteTitle = "Willow — A quiet PDF store";
const siteDescription =
  "Digital PDFs for restoring the home, learning with depth, building with care, orienting through transition, and shaping a body of work. Five pillars, one quiet storefront.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s — Willow",
  },
  description: siteDescription,
  keywords: [
    "Willow",
    "PDF store",
    "digital downloads",
    "Nest",
    "Academy",
    "Workshop",
    "Wayfinder",
    "Studio",
    "neurodivergent",
    "workbooks",
    "templates",
  ],
  authors: [{ name: "Willow" }],
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: "Willow",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
