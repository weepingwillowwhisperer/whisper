"use client";

import { useCallback, useMemo, useState } from "react";
import { products, Product } from "../../lib/data";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { CartDrawer } from "../../components/CartDrawer";

export default function WhisperPage() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [cartOpen, setCartOpen] = useState(false);

  const whisperProducts = useMemo(
    () => products.filter((p) => p.unit === "Whisper"),
    []
  );

  const cartItems = useMemo(() => {
    return Object.entries(cart)
      .map(([id, qty]) => {
        const product = whisperProducts.find((p) => p.id === id);
        if (!product) return null;
        return { ...product, qty };
      })
      .filter((item): item is Product & { qty: number } => item !== null);
  }, [cart, whisperProducts]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
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

  const coreProducts = whisperProducts.filter((p) =>
    ["whisper-code-cards", "whisper-messages", "whisper-agreement"].includes(
      p.id
    )
  );

  const supportProducts = whisperProducts.filter((p) =>
    [
      "whisper-wallet-card",
      "whisper-guide-reading",
      "whisper-guide-cost",
    ].includes(p.id)
  );

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-stone-950 text-stone-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(173,185,138,0.08),transparent_38%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[36rem] bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03),transparent)]" />

      <Header cartCount={cartCount} onCartClick={() => setCartOpen((v) => !v)} />

      <main className="relative">
        {/* Hero Section */}
        <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <div className="max-w-4xl">
            <p className="mb-5 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-stone-400">
              <span
                aria-hidden
                className="inline-block h-px w-8 bg-stone-600"
              />
              Separate Unit
            </p>
            <h1 className="text-balance text-5xl font-light leading-[1.02] tracking-tight md:text-7xl">
              Whisper.
            </h1>
            <p className="mt-4 text-base uppercase tracking-[0.2em] text-willow-300">
              A language system for people who live quietly.
            </p>
            <p className="mt-8 max-w-2xl text-base leading-8 text-stone-300 md:text-lg">
              Depression is hidden by inaccurate language. Every product in
              Whisper exists to reduce the burden of explanation — to let a
              person say something without saying everything, and to teach the
              people around them to read what is barely said.
            </p>
          </div>
        </section>

        {/* The Thesis */}
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-willow-300/90">
                <span
                  aria-hidden
                  className="inline-block h-px w-8 bg-willow-300/70"
                />
                The System
              </p>
              <h2 className="mt-4 text-3xl font-light tracking-tight md:text-4xl">
                Every product does one of three things.
              </h2>
            </div>
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-medium text-stone-100">Signal</h3>
                <p className="mt-2 text-stone-400">
                  Let a person say something without saying everything. A word
                  or image that stands in for what is too expensive to explain.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-stone-100">Translate</h3>
                <p className="mt-2 text-stone-400">
                  Teach the people around them to read what is barely visible.
                  What quiet behavior can actually mean.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-stone-100">
                  Reduce Cost
                </h3>
                <p className="mt-2 text-stone-400">
                  Lower the price of communication on days when words are
                  expensive. Pre-written messages, protocols, agreements.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Products */}
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-12">
            <p className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-willow-300/90">
              <span
                aria-hidden
                className="inline-block h-px w-8 bg-willow-300/70"
              />
              The Foundation
            </p>
            <h2 className="mt-4 text-3xl font-light tracking-tight md:text-4xl">
              Three core products, working together.
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {coreProducts.map((product) => (
              <div
                key={product.id}
                className="group rounded-xl border border-stone-800 bg-stone-900/50 p-8 backdrop-blur-sm transition-all hover:border-willow-300/50 hover:bg-stone-900"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-willow-300/70">
                      {product.format}
                    </p>
                    <h3 className="mt-3 text-xl font-light leading-tight text-stone-100">
                      {product.title}
                    </h3>
                  </div>
                  {product.tag && (
                    <span className="rounded-full bg-willow-300/10 px-3 py-1 text-xs font-medium text-willow-300">
                      {product.tag}
                    </span>
                  )}
                </div>
                <p className="text-sm leading-6 text-stone-400">
                  {product.description}
                </p>
                <div className="mt-6 flex items-end justify-between border-t border-stone-800/50 pt-6">
                  <div className="text-2xl font-light text-stone-100">
                    ${product.price}
                  </div>
                  <button
                    onClick={() => addToCart(product.id)}
                    className="rounded-full bg-willow-300 px-4 py-2 text-sm font-medium text-stone-950 transition-transform hover:-translate-y-0.5"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* The Code Cards Detail */}
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="rounded-2xl border border-stone-800 bg-stone-900/50 p-8 md:p-12 backdrop-blur-sm">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <h2 className="text-3xl font-light tracking-tight md:text-4xl">
                  The Code Cards
                </h2>
                <p className="mt-6 leading-8 text-stone-400">
                  Two decks working together. The first is for the person —
                  each card is a signal that can be shown, sent, or left
                  somewhere visible. The second is for the people who love them
                  — each card corrects one specific misreading.
                </p>
                <p className="mt-4 leading-8 text-stone-400">
                  Bone paper, Willow Green ink, Cormorant Garamond. Small enough
                  for a wallet, a bedside drawer, a therapy room table.
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-stone-200">Deck One: Signals</h3>
                  <p className="mt-2 text-sm text-stone-400">
                    Front carries the signal. Back carries the translation.
                    Showing the card is the telling.
                  </p>
                  <ul className="mt-3 space-y-1 text-sm text-stone-500">
                    <li>· whisper.</li>
                    <li>· low capacity day.</li>
                    <li>· answering is expensive today.</li>
                    <li>· do not ask me to rank it.</li>
                    <li>· + 8 more</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-stone-200">
                    Deck Two: Readings
                  </h3>
                  <p className="mt-2 text-sm text-stone-400">
                    What misreadings actually mean. The machinery of distortion,
                    taken apart one piece at a time.
                  </p>
                  <ul className="mt-3 space-y-1 text-sm text-stone-500">
                    <li>· Quiet is not control.</li>
                    <li>· Exhaustion is not disinterest.</li>
                    <li>· Withdrawal is not rejection.</li>
                    <li>· Functioning is not proof.</li>
                    <li>· + 6 more</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Support Products */}
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-12">
            <p className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-willow-300/90">
              <span
                aria-hidden
                className="inline-block h-px w-8 bg-willow-300/70"
              />
              Expansion
            </p>
            <h2 className="mt-4 text-3xl font-light tracking-tight md:text-4xl">
              Portable, practical, precise.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {supportProducts.map((product) => (
              <div
                key={product.id}
                className="rounded-lg border border-stone-800 bg-stone-900/30 p-6 transition-colors hover:bg-stone-900/50"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-willow-300/70">
                  {product.format}
                </p>
                <h3 className="mt-2 text-lg font-light text-stone-100">
                  {product.title}
                </h3>
                <p className="mt-3 text-sm text-stone-400">
                  {product.description}
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-lg font-light text-stone-100">
                    ${product.price}
                  </span>
                  <button
                    onClick={() => addToCart(product.id)}
                    className="text-sm font-medium text-willow-300 transition-colors hover:text-willow-200"
                  >
                    Add →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Boundary Line / Disclaimer */}
        <section className="mx-auto max-w-2xl px-6 py-20">
          <div className="rounded-xl border border-stone-800/50 bg-stone-950 p-8 text-center">
            <p className="text-sm leading-7 text-stone-400">
              <span className="block font-medium text-stone-300 mb-2">
                Whisper is a language system, not a crisis service.
              </span>
              Some moments need more than a code — a person, a professional, an
              emergency line. Reaching for them is not a failure of the code. It
              is what the code is for.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mx-auto max-w-7xl px-6 pb-24">
          <div className="rounded-2xl border border-stone-800 bg-stone-900/80 p-8 md:p-12">
            <div className="max-w-2xl">
              <p className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-willow-300/90">
                <span
                  aria-hidden
                  className="inline-block h-px w-8 bg-willow-300/70"
                />
                Ready
              </p>
              <h2 className="mt-4 text-3xl font-light tracking-tight md:text-4xl">
                Begin with a signal.
              </h2>
              <p className="mt-6 max-w-xl leading-8 text-stone-300">
                Choose what feels right. The Code Cards work best as a
                foundation, but you can start anywhere — with a wallet card, a
                guide, a protocol, or pre-written messages.
              </p>
              <a
                href="#"
                className="mt-8 inline-block rounded-full bg-stone-100 px-6 py-3 text-sm font-medium text-stone-950 transition-transform hover:-translate-y-0.5"
              >
                Explore all Whisper products
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
