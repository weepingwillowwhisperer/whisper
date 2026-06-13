"use client";

import { useCallback, useMemo, useState } from "react";

type Pillar = "Nest" | "Academy" | "Workshop" | "Wayfinder" | "Studio";

type Product = {
  id: string;
  title: string;
  pillar: Pillar;
  price: number;
  format: string;
  pages: number;
  tag?: string;
  description: string;
};

const pillars: {
  name: Pillar;
  tagline: string;
  description: string;
  items: string[];
}[] = [
  {
    name: "Nest",
    tagline: "For home, rhythm, and restoration",
    description:
      "Guides and checklists for making a home feel habitable — written for people who need softer systems, not stricter ones.",
    items: ["Home Reset Guides", "Room-by-Room PDFs", "Gentle Systems"],
  },
  {
    name: "Academy",
    tagline: "For learning with depth",
    description:
      "Essays, frameworks, and reading packs that clarify complex ideas without flattening them. Slow knowledge, kept legible.",
    items: ["Teaching PDFs", "Deep-Dive Workbooks", "Research Packs"],
  },
  {
    name: "Workshop",
    tagline: "For making, building, and refining",
    description:
      "Templates, toolkits, and working sheets for shaping something tangible — from a first sketch to a finished thing.",
    items: ["Templates", "Toolkits", "Build Sheets"],
  },
  {
    name: "Wayfinder",
    tagline: "For orientation in nonlinear seasons",
    description:
      "Reflective workbooks and decision maps for transition, uncertainty, and the long quiet stretch between who you were and who you are becoming.",
    items: ["Reflection Guides", "Decision Maps", "Reset PDFs"],
  },
  {
    name: "Studio",
    tagline: "For brand, language, and creative direction",
    description:
      "Editorial tools, writing packs, and strategic PDFs for shaping a body of work with emotional precision and a recognizable voice.",
    items: ["Brand Guides", "Writing Packs", "Strategy PDFs"],
  },
];

const products: Product[] = [
  {
    id: "nest-edit",
    title: "The Nest Edit",
    pillar: "Nest",
    price: 32,
    format: "PDF Bundle",
    pages: 64,
    tag: "Bestseller",
    description:
      "A layered set of home reset documents for atmosphere, order, and lived-in ease.",
  },
  {
    id: "academy-reader-1",
    title: "Academy Reader Vol. 1",
    pillar: "Academy",
    price: 22,
    format: "PDF Reader",
    pages: 48,
    tag: "New",
    description:
      "A compact digital reader for people who want depth without academic drag.",
  },
  {
    id: "workshop-toolkit",
    title: "Workshop Toolkit",
    pillar: "Workshop",
    price: 29,
    format: "Toolkit",
    pages: 38,
    tag: "Popular",
    description:
      "Templates and working pages that help ideas leave the fog and take form.",
  },
  {
    id: "wayfinder-reset",
    title: "Wayfinder Reset",
    pillar: "Wayfinder",
    price: 26,
    format: "Workbook",
    pages: 42,
    tag: "Essential",
    description:
      "A recalibration workbook for moments of uncertainty, transition, and emotional static.",
  },
  {
    id: "studio-messaging",
    title: "Studio Messaging Maps",
    pillar: "Studio",
    price: 34,
    format: "Strategy PDF",
    pages: 56,
    tag: "Editor's pick",
    description:
      "Frameworks for shaping voice, positioning, and emotional clarity across your work.",
  },
  {
    id: "nest-room-notes",
    title: "Nest Room Notes",
    pillar: "Nest",
    price: 18,
    format: "Mini Guide",
    pages: 24,
    tag: "Small format",
    description:
      "A focused guide for adjusting one room at a time without overhauling everything.",
  },
  {
    id: "workshop-build",
    title: "Workshop Build Sheets",
    pillar: "Workshop",
    price: 16,
    format: "Template Set",
    pages: 18,
    tag: "Utility",
    description:
      "Simple working sheets for sketching, organizing, and refining active projects.",
  },
  {
    id: "wayfinder-decisions",
    title: "Wayfinder Decision Maps",
    pillar: "Wayfinder",
    price: 20,
    format: "Decision PDF",
    pages: 28,
    tag: "Clarity",
    description:
      "A gentle framework for navigating choices when energy and certainty are both limited.",
  },
];

const featured: Product[] = [
  {
    id: "nest-reset",
    title: "Nest Reset",
    pillar: "Nest",
    price: 28,
    format: "Space + routine guide",
    pages: 36,
    description:
      "A practical PDF for softening friction at home and rebuilding daily rhythm.",
  },
  {
    id: "wayfinder-notes",
    title: "Wayfinder Notes",
    pillar: "Wayfinder",
    price: 24,
    format: "Transition workbook",
    pages: 44,
    description:
      "A guided resource for seasons that do not move in straight lines.",
  },
  {
    id: "studio-language",
    title: "Studio Language Pack",
    pillar: "Studio",
    price: 36,
    format: "Brand voice toolkit",
    pages: 52,
    description:
      "Messaging prompts, language structures, and tone-setting tools for thoughtful brands.",
  },
];

const collectionFilters = [
  "All PDFs",
  "Bundles",
  "Workbooks",
  "Mini Guides",
  "Templates",
] as const;

export default function WillowPdfStore() {
  const [activePillar, setActivePillar] = useState<"All" | Pillar>("All");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [cartOpen, setCartOpen] = useState(false);

  const allProducts = useMemo(() => [...featured, ...products], []);

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
  }, [cart, allProducts]);

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

      <header className="relative z-30 border-b border-stone-800/80 bg-stone-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="#top" className="group flex items-center gap-3">
            <span
              aria-hidden
              className="inline-block h-7 w-[2px] rounded-full bg-willow-300/80 transition-all group-hover:h-8"
            />
            <span>
              <span className="block text-[10px] uppercase tracking-[0.42em] text-stone-500">
                Willow
              </span>
              <span className="mt-0.5 block text-base font-light tracking-wide text-stone-100">
                PDF Store
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 text-sm text-stone-300 md:flex">
            <a href="#pillars" className="transition-colors hover:text-white">
              Pillars
            </a>
            <a href="#featured" className="transition-colors hover:text-white">
              Featured
            </a>
            <a href="#shop" className="transition-colors hover:text-white">
              Shop
            </a>
            <a href="#about" className="transition-colors hover:text-white">
              About
            </a>
            <button
              onClick={() => setCartOpen((v) => !v)}
              className="group relative inline-flex items-center gap-2 rounded-full border border-stone-700 px-4 py-2 transition-colors hover:bg-stone-900"
            >
              <span>Cart</span>
              <span
                className={`inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full px-1.5 text-xs transition-colors ${
                  cartCount > 0
                    ? "bg-willow-300 text-stone-950"
                    : "bg-stone-800 text-stone-300"
                }`}
              >
                {cartCount}
              </span>
            </button>
          </nav>

          <button
            onClick={() => setCartOpen((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full border border-stone-700 px-3 py-1.5 text-sm md:hidden"
          >
            Cart
            <span className="inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-willow-300 px-1.5 text-xs text-stone-950">
              {cartCount}
            </span>
          </button>
        </div>
      </header>

      <main id="top" className="relative">
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

        <section id="pillars" className="mx-auto max-w-7xl px-6 py-10 md:py-16">
          <div className="mb-12 max-w-2xl">
            <p className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-willow-300/90">
              <span
                aria-hidden
                className="inline-block h-px w-8 bg-willow-300/70"
              />
              The five pillars
            </p>
            <h3 className="mt-4 text-3xl font-light tracking-tight md:text-4xl">
              A structure that gives the store depth instead of clutter.
            </h3>
            <p className="mt-4 leading-7 text-stone-300">
              Each pillar is a different doorway. Walk in through whichever one
              matches the season you are in.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-5">
            {pillars.map((pillar) => (
              <button
                key={pillar.name}
                type="button"
                onClick={() => {
                  setActivePillar(pillar.name);
                  document
                    .getElementById("shop")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group rounded-3xl border border-stone-800 bg-stone-900/70 p-6 text-left backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-willow-700/70 hover:bg-stone-900"
              >
                <div className="flex min-h-[300px] flex-col">
                  <p className="text-xs uppercase tracking-[0.3em] text-willow-300/90">
                    {pillar.name}
                  </p>
                  <h4 className="mt-3 text-2xl font-light tracking-tight text-white">
                    {pillar.tagline}
                  </h4>
                  <p className="mt-4 text-sm leading-7 text-stone-300">
                    {pillar.description}
                  </p>
                  <div className="mt-auto pt-8">
                    <p className="mb-3 text-xs uppercase tracking-[0.28em] text-stone-500">
                      Inside
                    </p>
                    <ul className="space-y-2 text-sm text-stone-200">
                      {pillar.items.map((item) => (
                        <li key={item}>· {item}</li>
                      ))}
                    </ul>
                    <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-stone-700 px-4 py-2 text-sm transition-colors group-hover:border-willow-300/60 group-hover:text-willow-100">
                      Enter {pillar.name}
                      <span
                        aria-hidden
                        className="transition-transform group-hover:translate-x-0.5"
                      >
                        →
                      </span>
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section id="featured" className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
            <div className="rounded-[2rem] border border-stone-800 bg-stone-900 p-8 md:p-10">
              <p className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-willow-300/90">
                <span
                  aria-hidden
                  className="inline-block h-px w-8 bg-willow-300/70"
                />
                Featured
              </p>
              <h3 className="mt-4 text-3xl font-light tracking-tight md:text-5xl">
                Start with the PDFs people return to.
              </h3>
              <p className="mt-6 max-w-2xl leading-8 text-stone-300">
                Three quiet entry points. If you are not sure where to begin,
                start with whichever title makes your shoulders drop.
              </p>
              <div className="mt-10 grid gap-4 md:grid-cols-3">
                {featured.map((item) => (
                  <article
                    key={item.id}
                    className="flex flex-col rounded-2xl border border-stone-800 bg-stone-950 p-5"
                  >
                    <p className="text-xs uppercase tracking-[0.25em] text-willow-300/90">
                      {item.pillar}
                    </p>
                    <h4 className="mt-3 text-xl font-light text-white">
                      {item.title}
                    </h4>
                    <p className="mt-2 text-sm text-stone-400">
                      {item.format} · {item.pages} pages
                    </p>
                    <p className="mt-4 text-sm leading-7 text-stone-300">
                      {item.description}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-6">
                      <p className="text-sm text-stone-200">${item.price}</p>
                      <button
                        onClick={() => addToCart(item.id)}
                        className="rounded-full border border-stone-700 px-4 py-2 text-sm transition-colors hover:border-willow-300/60 hover:bg-stone-900 hover:text-willow-100"
                      >
                        Add to cart
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <aside className="rounded-[2rem] border border-stone-800 bg-stone-900/70 p-8 md:p-10">
              <p className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-willow-300/90">
                <span
                  aria-hidden
                  className="inline-block h-px w-8 bg-willow-300/70"
                />
                How the store is built
              </p>
              <h3 className="mt-4 text-2xl font-light tracking-tight md:text-3xl">
                Five pillars, one coherent storefront.
              </h3>
              <div className="mt-6 space-y-5 text-sm leading-7 text-stone-300">
                <p>
                  <span className="text-willow-100">Nest</span> — resources for
                  the home, daily rhythm, and soft restoration.
                </p>
                <p>
                  <span className="text-willow-100">Academy</span> — teaching,
                  learning, and deepening.
                </p>
                <p>
                  <span className="text-willow-100">Workshop</span> — tools,
                  templates, and active making.
                </p>
                <p>
                  <span className="text-willow-100">Wayfinder</span> —
                  orientation for transition, uncertainty, recalibration.
                </p>
                <p>
                  <span className="text-willow-100">Studio</span> — brand,
                  language, and creative direction.
                </p>
              </div>
              <div className="mt-8 rounded-2xl border border-stone-800 bg-stone-950 p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-stone-500">
                  Browse by collection
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {collectionFilters.map((item) => (
                    <a
                      key={item}
                      href="#shop"
                      className="rounded-full border border-stone-700 px-4 py-2 text-sm text-stone-200 transition-colors hover:border-willow-300/60 hover:bg-stone-900 hover:text-willow-100"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section id="shop" className="mx-auto max-w-7xl px-6 py-10 md:py-16">
          <div className="rounded-[2rem] border border-stone-800 bg-gradient-to-b from-stone-900 to-stone-950 p-8 md:p-12">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-willow-300/90">
                  <span
                    aria-hidden
                    className="inline-block h-px w-8 bg-willow-300/70"
                  />
                  Shop
                </p>
                <h3 className="mt-4 text-3xl font-light tracking-tight md:text-4xl">
                  Browse by pillar, then move inward.
                </h3>
                <p className="mt-5 leading-8 text-stone-300">
                  Filter by the pillar you need today. The shelf rearranges
                  itself around you.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {(["All", ...pillars.map((p) => p.name)] as const).map(
                  (pillar) => {
                    const isActive = activePillar === pillar;
                    return (
                      <button
                        key={pillar}
                        onClick={() => setActivePillar(pillar)}
                        className={`rounded-full px-4 py-2 text-sm transition-colors ${
                          isActive
                            ? "bg-willow-300 text-stone-950"
                            : "border border-stone-700 text-stone-200 hover:border-willow-300/60 hover:bg-stone-900 hover:text-willow-100"
                        }`}
                      >
                        {pillar}
                      </button>
                    );
                  },
                )}
              </div>
            </div>

            {visibleProducts.length === 0 ? (
              <p className="mt-12 rounded-2xl border border-stone-800 bg-stone-950 p-8 text-sm text-stone-400">
                Nothing in this pillar yet — new PDFs are added each month.
              </p>
            ) : (
              <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {visibleProducts.map((product) => {
                  const inCart = (cart[product.id] ?? 0) > 0;
                  return (
                    <article
                      key={product.id}
                      className="flex flex-col rounded-2xl border border-stone-800 bg-stone-900/70 p-5 transition-colors hover:border-willow-700/60"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs uppercase tracking-[0.25em] text-willow-300/90">
                            {product.pillar}
                          </p>
                          <h4 className="mt-3 text-xl font-light text-white">
                            {product.title}
                          </h4>
                        </div>
                        {product.tag ? (
                          <span className="rounded-full border border-stone-700 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-stone-300">
                            {product.tag}
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-3 text-sm text-stone-400">
                        {product.format} · {product.pages} pages
                      </p>
                      <p className="mt-3 text-sm leading-7 text-stone-300">
                        {product.description}
                      </p>
                      <div className="mt-auto flex items-center justify-between pt-6">
                        <span className="text-sm text-stone-200">
                          ${product.price}
                        </span>
                        <button
                          onClick={() => addToCart(product.id)}
                          className={`rounded-full px-4 py-2 text-sm transition-colors ${
                            inCart
                              ? "bg-willow-300 text-stone-950"
                              : "border border-stone-700 text-stone-100 hover:border-willow-300/60 hover:text-willow-100"
                          }`}
                        >
                          {inCart ? `In cart · ${cart[product.id]}` : "Add to cart"}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>

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

      <footer className="border-t border-stone-800/80">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 text-sm text-stone-400 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span
                aria-hidden
                className="inline-block h-6 w-[2px] rounded-full bg-willow-300/80"
              />
              <p className="text-stone-200">Willow</p>
            </div>
            <p className="mt-3 max-w-xs leading-7">
              A quiet PDF store. Nest, Academy, Workshop, Wayfinder, Studio.
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-stone-500">
              Browse
            </p>
            <ul className="mt-3 space-y-2">
              <li>
                <a href="#pillars" className="transition-colors hover:text-white">
                  Pillars
                </a>
              </li>
              <li>
                <a href="#featured" className="transition-colors hover:text-white">
                  Featured
                </a>
              </li>
              <li>
                <a href="#shop" className="transition-colors hover:text-white">
                  Shop
                </a>
              </li>
              <li>
                <a href="#about" className="transition-colors hover:text-white">
                  About
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-stone-500">
              Help
            </p>
            <ul className="mt-3 space-y-2">
              <li>
                <a href="#" className="transition-colors hover:text-white">
                  Delivery & downloads
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-white">
                  License & usage
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@wwilloww.ai"
                  className="transition-colors hover:text-white"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-stone-500">
              Legal
            </p>
            <ul className="mt-3 space-y-2">
              <li>
                <a href="#" className="transition-colors hover:text-white">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-white">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-white">
                  Refunds
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-stone-900/80">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-6 py-6 text-xs text-stone-500 md:flex-row md:items-center">
            <p>© {new Date().getFullYear()} Willow. All PDFs hand-edited.</p>
            <p>wwilloww.ai</p>
          </div>
        </div>
      </footer>

      {cartOpen ? (
        <>
          <button
            aria-label="Close cart"
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-40 bg-stone-950/60 backdrop-blur-sm"
          />
          <aside
            role="dialog"
            aria-label="Cart"
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-stone-800 bg-stone-950 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-stone-800 px-6 py-5">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-willow-300/90">
                  Your cart
                </p>
                <p className="mt-1 text-sm text-stone-400">
                  {cartCount === 0
                    ? "Empty for now"
                    : `${cartCount} ${cartCount === 1 ? "item" : "items"}`}
                </p>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="rounded-full border border-stone-700 px-3 py-1.5 text-xs text-stone-200 transition-colors hover:bg-stone-900"
              >
                Close
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cartItems.length === 0 ? (
                <div className="mt-12 rounded-2xl border border-stone-800 bg-stone-900/60 p-6 text-sm leading-7 text-stone-400">
                  Nothing here yet. Start with a pillar and pick what fits the
                  week you are in.
                </div>
              ) : (
                <ul className="space-y-3">
                  {cartItems.map((item) => (
                    <li
                      key={item.id}
                      className="rounded-2xl border border-stone-800 bg-stone-900/60 p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.25em] text-willow-300/90">
                            {item.pillar}
                          </p>
                          <p className="mt-1 text-sm text-stone-100">
                            {item.title}
                          </p>
                          <p className="mt-1 text-xs text-stone-500">
                            {item.format} · {item.pages} pages
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-stone-200">
                            ${item.price * item.qty}
                          </p>
                          <p className="text-xs text-stone-500">
                            ×{item.qty}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="mt-3 text-xs text-stone-500 underline-offset-4 transition-colors hover:text-stone-200 hover:underline"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border-t border-stone-800 px-6 py-5">
              <div className="flex items-center justify-between text-sm text-stone-300">
                <span>Subtotal</span>
                <span className="text-stone-100">${cartTotal}</span>
              </div>
              <p className="mt-2 text-xs text-stone-500">
                Instant download · personal use license
              </p>
              <button
                disabled={cartItems.length === 0}
                className="mt-4 w-full rounded-full bg-stone-100 px-5 py-3 text-sm font-medium text-stone-950 transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
              >
                {cartItems.length === 0
                  ? "Cart is empty"
                  : "Proceed to checkout"}
              </button>
            </div>
          </aside>
        </>
      ) : null}
    </div>
  );
}
