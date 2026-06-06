"use client";

import React from "react";
import Link from "next/link";
import { featured, collectionFilters } from "../lib/data";

interface FeaturedSectionProps {
  onAddToCart: (id: string) => void;
}

export const FeaturedSection: React.FC<FeaturedSectionProps> = ({
  onAddToCart,
}) => {
  return (
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
              <Link
                href={`/product/${item.id}`}
                key={item.id}
              >
                <article
                  className="flex h-full flex-col rounded-2xl border border-stone-800 bg-stone-950 p-5 transition-all hover:border-willow-300/50 hover:bg-stone-900"
                >
                  <p className="text-xs uppercase tracking-[0.25em] text-willow-300/90">
                    {item.pillar}
                  </p>
                  <h4 className="mt-3 text-xl font-light text-white">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-sm text-stone-400">
                    {item.format} · {item.pages > 0 ? `${item.pages} pages` : "Digital"}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-stone-300">
                    {item.description}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-6">
                    <p className="text-sm text-stone-200">${item.price}</p>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        onAddToCart(item.id);
                      }}
                      className="rounded-full border border-stone-700 px-4 py-2 text-sm transition-colors hover:border-willow-300/60 hover:bg-stone-900 hover:text-willow-100"
                    >
                      Add to cart
                    </button>
                  </div>
                </article>
              </Link>
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
            <p className="pb-4 border-b border-stone-800">
              <span className="text-sm font-medium text-stone-400">Willow — Five Pillars</span>
            </p>
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
            <p className="pt-4 border-t border-stone-800 mt-4">
              <span className="text-sm font-medium text-stone-400">Separate Unit</span>
            </p>
            <p>
              <span className="text-willow-100">Whisper</span> — a language
              system for depression, communication, and quiet clarity.
            </p>
          </div>
          <div className="mt-8 rounded-2xl border border-stone-800 bg-stone-950 p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-stone-500">
              Browse by collection
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {collectionFilters.map((collection) => (
                <button
                  key={collection}
                  className="rounded-full border border-stone-800 px-4 py-2 text-xs text-stone-400 transition-colors hover:border-willow-300/60 hover:text-willow-100"
                >
                  {collection}
                </button>
              ))}
            </div>
          </div>

        </aside>
      </div>
    </section>
  );
};
