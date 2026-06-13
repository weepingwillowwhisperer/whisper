"use client";

import React from "react";
import { Pillar, pillars, Product } from "../lib/data";

interface ShopSectionProps {
  activePillar: "All" | Pillar;
  onPillarChange: (pillar: "All" | Pillar) => void;
  visibleProducts: Product[];
  cart: Record<string, number>;
  onAddToCart: (id: string) => void;
}

export const ShopSection: React.FC<ShopSectionProps> = ({
  activePillar,
  onPillarChange,
  visibleProducts,
  cart,
  onAddToCart,
}) => {
  return (
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
                    onClick={() => onPillarChange(pillar)}
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
                      onClick={() => onAddToCart(product.id)}
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
  );
};
