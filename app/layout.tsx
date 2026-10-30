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

const siteUrl = "https://willowpdf.com";
const siteTitle = "Willow | Recognition over reinvention";
const siteDescription =
  "Willow creates practical tools, thoughtful products, and stories for people who feel deeply and think differently.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s — Willow",
  },
  description: siteDescription,
  keywords: [
    "Willow",
    "recognition over reinvention",
    "neurodivergent resources",
    "Nest",
    "Academy",
    "Workshop",
    "Wayfinder",
    "Studio",
    "neurodivergent",
    "invisible disability",
    "practical tools",
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
      data-theme="light"
      data-motion="full"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
