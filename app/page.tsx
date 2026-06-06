"use client";

import { useCallback, useMemo, useState } from "react";
import { Pillar, allProducts, products, Product } from "../lib/data";
import { Header } from "../components/Header";
import { PillarGrid } from "../components/PillarGrid";
import { FeaturedSection } from "../components/FeaturedSection";
import { ShopSection } from "../components/ShopSection";
import { CartDrawer } from "../components/CartDrawer";
import { Footer } from "../components/Footer";

export default function WillowPdfStore() {
  const [activePillar, setActivePillar] = useState<"All" | Pillar>("All");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [cartOpen, setCartOpen] = useState(false);

  const visibleProducts = useMemo(() => {
    if (activePillar === "All") return products;
    return products.filter((p) => p.pillar === activePillar);
  }, [activePillar]);

  const cartItems = useMemo(() => {
    return Object.entries(cart)
      .map(([id, qty]) => {
        const product = allProducts.find((p) => p.id === id);
        if (!product) return null;
        return { ...product, qty };
      })
      .filter((item): item is Product & { qty: number } => item !== null);
  }, [cart]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );

  const addToCart = useCallback((id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
    setCartOpen(true);
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-stone-950 text-stone-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(173,185,138,0.08),transparent_38%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[36rem] bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03),transparent)]" />

      <Header cartCount={cartCount} onCartClick={() => setCartOpen((v) => !v)} />

      <main id="top" className="relative">
        {/* Hero Section */}
        <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div className="max-w-5xl">
              <p className="mb-5 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-willow-300/90">
                <span
                  aria-hidden
                  className="inline-block h-px w-8 bg-willow-300/70"
                />
                Five pillars · one quiet store
              </p>
              <h2 className="max-w-5xl text-balance text-5xl font-light leading-[1.02] tracking-tight md:text-7xl">
                PDFs for restoring, learning, building, orienting, and shaping a
                body of work.
              </h2>
              <p className="mt-8 max-w-2xl text-base leading-8 text-stone-300 md:text-lg">
                Willow is a small library of downloadable PDFs — workbooks,
                templates, guides, and reading packs — organized into five
                pillars so you can find what you actually need without
                scrolling through a feed.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#shop"
                  className="rounded-full bg-stone-100 px-6 py-3 text-sm font-medium text-stone-950 transition-transform hover:-translate-y-0.5"
                >
                  Browse the shop
                </a>
                <a
                  href="#pillars"
                  className="rounded-full border border-stone-700 px-6 py-3 text-sm font-medium text-stone-100 transition-colors hover:bg-stone-900"
                >
                  Explore the pillars
                </a>
              </div>

              <dl className="mt-12 grid max-w-2xl grid-cols-3 gap-6 border-t border-stone-800/70 pt-8 text-sm">
                <div>
                  <dt className="text-xs uppercase tracking-[0.28em] text-stone-500">
                    Format
                  </dt>
                  <dd className="mt-2 text-stone-200">High-resolution PDF</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.28em] text-stone-500">
                    Delivery
                  </dt>
                  <dd className="mt-2 text-stone-200">Instant download</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.28em] text-stone-500">
                    Use
                  </dt>
                  <dd className="mt-2 text-stone-200">Yours to keep</dd>
                </div>
              </dl>
            </div>

            <aside className="rounded-[2rem] border border-stone-800 bg-stone-900/70 p-8 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.35em] text-stone-500">
                A note from Willow
              </p>
              <h3 className="mt-4 text-2xl font-light tracking-tight md:text-3xl">
                Made for people who think slowly and feel a lot.
              </h3>
              <p className="mt-5 text-sm leading-7 text-stone-300">
                Every PDF here is written from lived experience — neurodivergent,
                grounded, and edited until each page earns its place. Nothing
                bloated. Nothing performative. Just resources you can actually
                use on a tired Tuesday.
              </p>
              <div className="mt-6 rounded-2xl border border-stone-800 bg-stone-950 p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-stone-500">
                  What you get
                </p>
                <ul className="mt-3 space-y-2 text-sm text-stone-200">
                  <li>· Print-ready PDF, no app required</li>
                  <li>· Re-download anytime from your receipt</li>
                  <li>· Personal use license included</li>
                </ul>
              </div>
            </aside>
          </div>
        </section>

        <PillarGrid onPillarSelect={setActivePillar} />
        
        <FeaturedSection onAddToCart={addToCart} />

        {/* Whisper Spotlight */}
        <section className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="rounded-[2rem] border border-willow-300/20 bg-gradient-to-br from-willow-300/5 to-stone-900 p-8 md:p-12">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <p className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-willow-300/90">
                  <span
                    aria-hidden
                    className="inline-block h-px w-8 bg-willow-300/70"
                  />
                  New
                </p>
                <h2 className="mt-4 text-3xl font-light tracking-tight md:text-4xl">
                  Whisper: A language system for people who live quietly.
                </h2>
              </div>
              <div className="space-y-6 text-stone-300">
                <p>
                  Depression is hidden by inaccurate language. Whisper is a
                  system of cards, guides, and protocols that let people say
                  what is barely visible — and teach those around them to read
                  it.
                </p>
                <p>
                  Code cards that signal and translate. Messages that cost
                  less to send. Agreements decided in clear moments for dark
                  ones.
                </p>
                <a
                  href="/whisper"
                  className="inline-block rounded-full bg-willow-300 px-6 py-3 text-sm font-medium text-stone-950 transition-transform hover:-translate-y-0.5"
                >
                  Explore Whisper
                </a>
              </div>
            </div>
          </div>
        </section>

        <ShopSection 
          activePillar={activePillar}
          onPillarChange={setActivePillar}
          visibleProducts={visibleProducts}
          cart={cart}
          onAddToCart={addToCart}
        />

        {/* About Section */}
        <section id="about" className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <p className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-willow-300/90">
                <span
                  aria-hidden
                  className="inline-block h-px w-8 bg-willow-300/70"
                />
                About
              </p>
              <h3 className="mt-4 text-3xl font-light tracking-tight md:text-4xl">
                Not a generic download shop. A store with a spine.
              </h3>
            </div>
            <div className="space-y-6 leading-8 text-stone-300">
              <p>
                Willow is built around five pillars so each PDF has a real
                place to live. You should know, at a glance, whether something
                is here to help you restore, learn, build, orient, or shape a
                body of work.
              </p>
              <p>
                Everything is written, edited, and designed by Willow — a
                neurodivergent writer working from lived experience. No
                ghostwritten filler, no recycled templates, no influencer tone.
              </p>
              <p>
                The pillars also leave room to grow. New PDFs, bundles, and
                small courses can be added later without the store losing
                shape.
              </p>
            </div>
          </div>
        </section>

        {/* Bottom CTA Section */}
        <section className="mx-auto max-w-7xl px-6 pb-24">
          <div className="rounded-[2rem] border border-stone-800 bg-stone-900/80 p-8 md:p-12">
            <p className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-willow-300/90">
              <span
                aria-hidden
                className="inline-block h-px w-8 bg-willow-300/70"
              />
              Begin where it is quiet
            </p>
            <h3 className="mt-4 max-w-3xl text-3xl font-light tracking-tight md:text-5xl">
              A storefront that can grow without losing its shape.
            </h3>
            <p className="mt-6 max-w-2xl leading-8 text-stone-300">
              Choose a pillar, open a PDF, and let the rest of the store wait
              for you.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#shop"
                className="rounded-full bg-stone-100 px-6 py-3 text-sm font-medium text-stone-950 transition-transform hover:-translate-y-0.5"
              >
                Open the shop
              </a>
              <a
                href="#pillars"
                className="rounded-full border border-stone-700 px-6 py-3 text-sm font-medium transition-colors hover:bg-stone-950"
              >
                Revisit the pillars
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <CartDrawer 
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        total={cartTotal}
        count={cartCount}
        onRemove={removeFromCart}
      />
    </div>
  );
}
