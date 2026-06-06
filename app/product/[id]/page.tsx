"use client";

import { useCallback, useState, useEffect } from "react";
import { allProducts } from "../../../lib/data";
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";
import { CartDrawer } from "../../../components/CartDrawer";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ProductPage() {
  const params = useParams();
  const productId = params?.id as string;
  const product = allProducts.find((p) => p.id === productId);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [cartOpen, setCartOpen] = useState(false);

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

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const p = allProducts.find((x) => x.id === id);
    return sum + (p?.price ?? 0) * qty;
  }, 0);

  const relatedProducts = product
    ? allProducts.filter((p) => p.pillar === product.pillar && p.id !== product.id)
    : [];

  const cartItems = Object.entries(cart)
    .map(([id, qty]) => {
      const p = allProducts.find((x) => x.id === id);
      return p ? { ...p, qty } : null;
    })
    .filter((item): item is typeof product & { qty: number } => item !== null);

  if (!product) {
    return (
      <div className="relative min-h-screen overflow-x-hidden bg-stone-950 text-stone-100">
        <Header cartCount={cartCount} onCartClick={() => setCartOpen(!cartOpen)} />
        <main className="mx-auto max-w-7xl px-6 py-24">
          <div className="text-center">
            <h1 className="text-3xl font-light">Product not found</h1>
            <p className="mt-4 text-stone-400">
              This product doesn't exist or has been removed.
            </p>
            <Link
              href="/"
              className="mt-8 inline-block rounded-full bg-stone-100 px-6 py-3 text-sm font-medium text-stone-950 transition-transform hover:-translate-y-0.5"
            >
              Return to shop
            </Link>
          </div>
        </main>
        <Footer />
        <CartDrawer
          isOpen={cartOpen}
          onClose={() => setCartOpen(false)}
          items={[]}
          total={0}
          count={0}
          onRemove={removeFromCart}
        />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-stone-950 text-stone-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(173,185,138,0.08),transparent_38%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[36rem] bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03),transparent)]" />

      <Header
        cartCount={cartCount}
        onCartClick={() => setCartOpen((v) => !v)}
      />

      <main className="relative">
        {/* Breadcrumb */}
        <nav className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex items-center gap-2 text-sm text-stone-500">
            <Link href="/" className="transition-colors hover:text-stone-300">
              Willow
            </Link>
            <span>/</span>
            {product.pillar === "Whisper" ? (
              <>
                <Link
                  href="/whisper"
                  className="transition-colors hover:text-stone-300"
                >
                  Whisper
                </Link>
                <span>/</span>
              </>
            ) : null}
            <span className="text-stone-300">{product.title}</span>
          </div>
        </nav>

        {/* Product Hero */}
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Image placeholder */}
            <div className="flex items-center justify-center rounded-2xl border border-stone-800 bg-gradient-to-br from-stone-900 to-stone-950 p-12">
              <div className="text-center">
                <p className="text-stone-600">{product.title}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-stone-700">
                  {product.format}
                </p>
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center">
              <div className="mb-6">
                <p className="text-xs uppercase tracking-[0.2em] text-willow-300/70">
                  {product.pillar}
                </p>
                <h1 className="mt-4 text-4xl font-light leading-tight md:text-5xl">
                  {product.title}
                </h1>
              </div>

              <p className="text-lg leading-8 text-stone-300">
                {product.description}
              </p>

              <div className="mt-8 border-t border-stone-800 pt-8">
                <div className="flex items-baseline gap-4">
                  <span className="text-5xl font-light text-stone-100">
                    ${product.price}
                  </span>
                  <span className="text-sm text-stone-500">
                    One-time purchase
                  </span>
                </div>

                <div className="mt-8 space-y-2 text-sm text-stone-400">
                  <div className="flex items-center gap-3">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-willow-300" />
                    {product.pages > 0 ? `${product.pages} pages` : "Digital product"}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-willow-300" />
                    Instant download
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-willow-300" />
                    Yours to keep forever
                  </div>
                </div>

                <button
                  onClick={() => addToCart(product.id)}
                  className="mt-8 w-full rounded-full bg-willow-300 py-4 text-base font-medium text-stone-950 transition-transform hover:-translate-y-0.5"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Product Details Section */}
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="rounded-2xl border border-stone-800 bg-stone-900/50 p-8 md:p-12 backdrop-blur-sm">
            <h2 className="text-2xl font-light">What's included</h2>
            <p className="mt-4 leading-8 text-stone-400">
              You'll receive a high-resolution PDF designed for printing or
              digital use. Everything you need, nothing you don't. Download it
              immediately and re-download anytime from your receipt.
            </p>

            {product.pillar === "Whisper" && (
              <div className="mt-8 rounded-lg border border-stone-800/50 bg-stone-950/50 p-6">
                <p className="text-sm font-medium text-willow-300">
                  Part of the Whisper system
                </p>
                <p className="mt-3 text-sm text-stone-400">
                  This product works best as part of an integrated language
                  system. Learn more about how Whisper products work together.
                </p>
                <Link
                  href="/whisper"
                  className="mt-4 inline-block text-sm font-medium text-willow-300 transition-colors hover:text-willow-200"
                >
                  Explore the full system →
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mx-auto max-w-7xl px-6 py-20">
            <h2 className="text-3xl font-light">Related products</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.slice(0, 3).map((p) => (
                <Link
                  key={p.id}
                  href={`/product/${p.id}`}
                  className="group rounded-lg border border-stone-800 bg-stone-900/30 p-6 transition-colors hover:bg-stone-900/50"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-willow-300/70">
                    {p.format}
                  </p>
                  <h3 className="mt-3 text-lg font-light text-stone-100">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-stone-400">{p.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-light text-stone-100">
                      ${p.price}
                    </span>
                    <span className="text-stone-600 transition-colors group-hover:text-stone-400">
                      →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
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
