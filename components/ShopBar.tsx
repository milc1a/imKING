export default function ShopBar({ active }: { active?: "trgovina" }) {
  return (
    <div className="sh-bar">
      <a className="sh-logo" href="/">
        IM<span>KING</span>
      </a>
      <nav className="sh-nav" aria-label="Glavni meni">
        <a href="/#reference">Reference</a>
        <a href="/#kontakt">Kontakt</a>
        <a href="/trgovina" aria-current={active === "trgovina" ? "page" : undefined}>
          Trgovina
        </a>
      </nav>
    </div>
  );
}
