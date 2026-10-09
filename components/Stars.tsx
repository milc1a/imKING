"use client";

import { useEffect, useRef } from "react";

type Star = { x: number; y: number; r: number; p: number; s: number };

/* A few dozen stars that twinkle over the night sky. Pauses when the hero is off screen. */
export default function Stars() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let stars: Star[] = [];
    let visible = true;
    let raf = 0;

    const size = () => {
      const r = c.getBoundingClientRect();
      c.width = r.width * dpr;
      c.height = r.height * dpr;
      const n = Math.round((r.width * r.height) / 9000);
      stars = Array.from({ length: n }, () => ({
        x: Math.random() * r.width,
        y: Math.random() * r.height * 0.48,
        r: Math.random() + 0.4,
        p: Math.random() * Math.PI * 2,
        s: 0.6 + Math.random() * 1.6,
      }));
    };

    const draw = (t: number) => {
      if (visible) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.fillStyle = "#dfe8ff";
        for (const st of stars) {
          ctx.globalAlpha = Math.max(0, Math.sin((t / 1000) * st.s + st.p)) * 0.85;
          ctx.beginPath();
          ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(draw);
    };

    size();
    window.addEventListener("resize", size);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(c);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", size);
    };
  }, []);

  return <canvas ref={ref} className="night-only" />;
}
