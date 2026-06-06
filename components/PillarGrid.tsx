"use client";

import React from "react";
import { Pillar, pillars } from "../lib/data";

interface PillarGridProps {
  onPillarSelect: (pillar: Pillar) => void;
}

export const PillarGrid: React.FC<PillarGridProps> = ({ onPillarSelect }) => {
  return (
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
              onPillarSelect(pillar.name);
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
  );
};
