import type { Metadata } from "next";
import ShopBar from "@/components/ShopBar";
import { formatPrice, listProducts, stripeConfigured, type Product } from "@/lib/stripe";
import "./trgovina.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Trgovina | imKING",
  description: "Spletna trgovina imKING – izdelki za pametno hišo in KNX inštalacije.",
  alternates: { canonical: "https://www.imking.si/trgovina" },
};

export default async function Trgovina({ searchParams }: { searchParams: Promise<{ napaka?: string }> }) {
  const { napaka } = await searchParams;
  let products: Product[] = [];
  let failed = false;
  if (stripeConfigured()) {
    try {
      products = await listProducts();
    } catch {
      failed = true;
    }
  }

  return (
    <div className="sh">
      <ShopBar active="trgovina" />
      <main className="sh-main">
        <h1>Trgovina</h1>
        {napaka && <p className="sh-err">Nakupa ni bilo mogoče začeti. Poskusite znova.</p>}
        {failed && <p className="sh-note">Trgovine trenutno ni mogoče naložiti. Poskusite znova čez nekaj trenutkov.</p>}
        {!failed && products.length === 0 && <p className="sh-note">Trenutno neaktivno</p>}
        <div className="sh-grid">
          {products.map((p) => (
            <article className="sh-card" key={p.id}>
              {p.image ? <img className="sh-img" src={p.image} alt={p.name} loading="lazy" /> : <div className="sh-img" />}
              <div className="sh-body">
                <h2 className="sh-name">{p.name}</h2>
                {p.description && <p className="sh-desc">{p.description}</p>}
                <div className="sh-price">{formatPrice(p.amount, p.currency)}</div>
                <form className="sh-buy" method="post" action="/api/checkout">
                  <input type="hidden" name="productId" value={p.id} />
                  <select name="qty" aria-label="Količina" defaultValue="1">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                  <button className="sh-btn" type="submit">
                    Kupi
                  </button>
                </form>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
