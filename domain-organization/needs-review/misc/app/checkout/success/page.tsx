"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function CheckoutSuccess() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [isLoading, setIsLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState<{
    email?: string;
    amount?: number;
    products?: string[];
  } | null>(null);

  useEffect(() => {
    // In production, verify the session with your backend
    // For now, just show success message
    setIsLoading(false);
  }, [sessionId]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-stone-950 text-stone-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(173,185,138,0.08),transparent_38%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[36rem] bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03),transparent)]" />

      <Header cartCount={0} onCartClick={() => {}} />

      <main className="relative mx-auto max-w-2xl px-6 py-24">
        <div className="rounded-2xl border border-stone-800 bg-stone-900/50 p-8 md:p-12 backdrop-blur-sm text-center">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-willow-300/10">
            <svg
              className="h-8 w-8 text-willow-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-4xl font-light">Thank you.</h1>
          <p className="mt-4 text-stone-400">
            Your order has been received. Check your email for download links and receipt.
          </p>

          <div className="mt-8 rounded-lg border border-stone-800 bg-stone-950/50 p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
              What's next
            </p>
            <ul className="mt-4 space-y-3 text-sm text-stone-300">
              <li className="flex items-start gap-3">
                <span className="text-willow-300 mt-1">✓</span>
                <span>Download links sent to your email</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-willow-300 mt-1">✓</span>
                <span>Re-download anytime from your receipt</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-willow-300 mt-1">✓</span>
                <span>All PDFs are yours to keep forever</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row justify-center">
            <Link
              href="/"
              className="rounded-full bg-stone-100 px-6 py-3 text-sm font-medium text-stone-950 transition-transform hover:-translate-y-0.5"
            >
              Return to store
            </Link>
            <Link
              href="/whisper"
              className="rounded-full border border-stone-700 px-6 py-3 text-sm font-medium text-stone-100 transition-colors hover:bg-stone-900"
            >
              Explore Whisper
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
