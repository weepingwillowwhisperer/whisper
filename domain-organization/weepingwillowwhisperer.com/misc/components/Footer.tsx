"use client";

import React from "react";

export const Footer: React.FC = () => {
  return (
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
  );
};
