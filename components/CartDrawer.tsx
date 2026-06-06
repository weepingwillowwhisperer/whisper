"use client";

import React from "react";
import { Product } from "../lib/data";

interface CartItem extends Product {
  qty: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  total: number;
  count: number;
  onRemove: (id: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  total,
  count,
  onRemove,
}) => {
  if (!isOpen) return null;

  return (
    <>
      <button
        aria-label="Close cart"
        onClick={onClose}
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
              {count === 0
                ? "Empty for now"
                : `${count} ${count === 1 ? "item" : "items"}`}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full border border-stone-700 px-3 py-1.5 text-xs text-stone-200 transition-colors hover:bg-stone-900"
          >
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="mt-12 rounded-2xl border border-stone-800 bg-stone-900/60 p-6 text-sm leading-7 text-stone-400">
              Nothing here yet. Start with a pillar and pick what fits the
              week you are in.
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((item) => (
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
                    onClick={() => onRemove(item.id)}
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
            <span className="text-stone-100">${total}</span>
          </div>
          <p className="mt-2 text-xs text-stone-500">
            Instant download · personal use license
          </p>
          <button
            disabled={items.length === 0}
            className="mt-4 w-full rounded-full bg-stone-100 px-5 py-3 text-sm font-medium text-stone-950 transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
          >
            {items.length === 0
              ? "Cart is empty"
              : "Proceed to checkout"}
          </button>
        </div>
      </aside>
    </>
  );
};
