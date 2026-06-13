"use client";

import React from "react";

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ cartCount, onCartClick }) => {
  return (
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

        <nav className="hidden items-center gap-6 text-sm text-stone-300 md:flex">
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

          <div className="h-4 w-px bg-stone-700" />

          <a href="/whisper" className="font-light text-willow-300/90 transition-colors hover:text-willow-100">
            Whisper
          </a>

          <button
            onClick={onCartClick}
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
          onClick={onCartClick}
          className="inline-flex items-center gap-2 rounded-full border border-stone-700 px-3 py-1.5 text-sm md:hidden"
        >
          Cart
          <span className="inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-willow-300 px-1.5 text-xs text-stone-950">
            {cartCount}
          </span>
        </button>
      </div>
    </header>
  );
};
