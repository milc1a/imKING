"use client";

import { useEffect } from "react";

/* Fades up every [data-reveal] element that starts below the first screen as it scrolls in.
   Content above the fold is never hidden, and nothing is hidden without JavaScript. */
export default function Reveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          el.classList.add("in");
          requestAnimationFrame(() => el.classList.remove("pre"));
          io.unobserve(el);
        }),
      { rootMargin: "0px 0px -8% 0px" },
    );

    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
      if (el.getBoundingClientRect().top <= window.innerHeight) return;
      const index = el.parentElement ? Array.from(el.parentElement.children).indexOf(el) : 0;
      el.classList.add("pre");
      el.style.transitionDelay = `${Math.min(index, 5) * 70}ms`;
      io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  return null;
}
