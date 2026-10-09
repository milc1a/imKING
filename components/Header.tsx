"use client";

import { useEffect, useState } from "react";
import { nav, sectionIds } from "@/lib/content";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [overHero, setOverHero] = useState(true);
  const [active, setActive] = useState<string | null>(null);

  // Transparent over the hero photo, solid with a hairline once scrolled past it.
  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById("domov");
      const limit = (hero?.offsetHeight ?? 0) - 80;
      setOverHero(window.scrollY <= limit);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Underline the menu item of the section in the middle of the screen.
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const spy = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) spy.observe(el);
    });
    return () => spy.disconnect();
  }, []);

  return (
    <header className={overHero ? "over" : "scrolled"}>
      <div className="wrap bar">
        <a className="logo" href="#domov">
          <i aria-hidden="true" />
          <b style={{ fontWeight: "inherit" }}>
            im<span>KING</span>
          </b>
        </a>
        <div className="right">
          <nav aria-label="Glavni meni">
            <ul>
              {nav.map((item) => {
                const hide = "hideOn" in item ? (item.hideOn === "sm" ? "opt" : "opt2") : "";
                const isActive = active && item.href === `#${active}` ? "active" : "";
                return (
                  <li key={item.href}>
                    <a href={item.href} className={`${hide} ${isActive}`.trim() || undefined}>
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
