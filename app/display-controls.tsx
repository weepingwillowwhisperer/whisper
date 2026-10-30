"use client";

import { useEffect, useState } from "react";

export function DisplayControls() {
  const [dark, setDark] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    setDark(prefersDark);
    setReduced(prefersReduced);
    document.documentElement.dataset.theme = prefersDark ? "dark" : "light";
    document.documentElement.dataset.motion = prefersReduced ? "reduced" : "full";
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
  }

  function toggleMotion() {
    const next = !reduced;
    setReduced(next);
    document.documentElement.dataset.motion = next ? "reduced" : "full";
  }

  return (
    <div className="controls" aria-label="Display controls">
      <button
        className="control"
        type="button"
        aria-pressed={reduced}
        onClick={toggleMotion}
      >
        {reduced ? "Motion reduced" : "Reduce motion"}
      </button>
      <button className="control" type="button" aria-pressed={dark} onClick={toggleTheme}>
        {dark ? "Light mode" : "Dark mode"}
      </button>
    </div>
  );
}
