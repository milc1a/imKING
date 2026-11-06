import type { Metadata } from "next";
import AdminProducts from "@/components/AdminProducts";
import ShopBar from "@/components/ShopBar";
import { isAdmin } from "@/lib/admin";
import { formatPrice, listProducts, stripeConfigured } from "@/lib/stripe";
import "../trgovina/trgovina.css";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Skrbnik trgovine | imKING", robots: { index: false, follow: false } };

export default async function Admin({ searchParams }: { searchParams: Promise<{ napaka?: string }> }) {
  const { napaka } = await searchParams;
  const authed = await isAdmin();
  const missing = [
    !process.env.ADMIN_PASSWORD && "ADMIN_PASSWORD",
    !stripeConfigured() && "STRIPE_SECRET_KEY",
    !process.env.BLOB_READ_WRITE_TOKEN && "BLOB_READ_WRITE_TOKEN",
  ].filter(Boolean);

  return (
    <div className="sh">
      <ShopBar />
      <main className="sh-main">
        <h1>Skrbnik trgovine</h1>
        {missing.length > 0 && (
          <p className="sh-note" style={{ margin: "16px 0" }}>
            V Vercelu (Settings → Environment Variables) manjka: {missing.join(", ")}.
          </p>
        )}
        {!authed ? (
          <form className="sh-form" method="post" action="/api/admin/login">
            {napaka && <p className="sh-err">Napačno geslo.</p>}
            <label>
              Geslo
              <input className="sh-in" type="password" name="password" required autoFocus />
            </label>
            <button className="sh-btn" type="submit">
              Prijava
            </button>
          </form>
        ) : (
          <Loaded />
        )}
      </main>
    </div>
  );
}

async function Loaded() {
  let items: { id: string; name: string; image: string | null; price: string }[] = [];
  let err = "";
  if (stripeConfigured()) {
    try {
      items = (await listProducts()).map((p) => ({ id: p.id, name: p.name, image: p.image, price: formatPrice(p.amount, p.currency) }));
    } catch (e) {
      err = e instanceof Error ? e.message : "Napaka pri branju iz Stripe";
    }
  }
  return (
    <>
      <form method="post" action="/api/admin/logout" style={{ margin: "8px 0 24px" }}>
        <button className="sh-btn alt" type="submit">
          Odjava
        </button>
      </form>
      {err && <p className="sh-err">{err}</p>}
      <AdminProducts items={items} />
    </>
  );
}
