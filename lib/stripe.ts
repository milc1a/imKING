/* Minimalen odjemalec za Stripe REST API (brez dodatnih paketov). */
const API = "https://api.stripe.com/v1";

type Params = Record<string, string | number | boolean | undefined>;

export const stripeConfigured = () => Boolean(process.env.STRIPE_SECRET_KEY);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function stripe(method: "GET" | "POST", path: string, params: Params = {}): Promise<any> {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY ni nastavljen");
  const body = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) if (v !== undefined) body.append(k, String(v));
  const qs = method === "GET" && body.toString() ? `?${body.toString()}` : "";
  const res = await fetch(`${API}${path}${qs}`, {
    method,
    headers: {
      Authorization: `Bearer ${key}`,
      ...(method === "POST" ? { "Content-Type": "application/x-www-form-urlencoded" } : {}),
    },
    body: method === "POST" ? body : undefined,
    cache: "no-store",
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json?.error?.message || `Stripe napaka ${res.status}`);
  return json;
}

export type Product = {
  id: string;
  name: string;
  description: string;
  image: string | null;
  amount: number; // v centih
  currency: string;
  ship: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toProduct(p: any): Product | null {
  const price = p.default_price;
  if (!price || typeof price !== "object" || price.unit_amount == null) return null;
  return {
    id: p.id,
    name: p.name,
    description: p.description || "",
    image: Array.isArray(p.images) && p.images[0] ? p.images[0] : null,
    amount: price.unit_amount,
    currency: price.currency,
    ship: p.metadata?.ship === "1",
  };
}

export async function listProducts(): Promise<Product[]> {
  const r = await stripe("GET", "/products", { active: true, limit: 100, "expand[0]": "data.default_price" });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (r.data as any[]).map(toProduct).filter((p): p is Product => p !== null);
}

export async function getProduct(id: string): Promise<{ product: Product; priceId: string } | null> {
  const p = await stripe("GET", `/products/${encodeURIComponent(id)}`, { "expand[0]": "default_price" });
  if (!p.active) return null;
  const product = toProduct(p);
  return product ? { product, priceId: p.default_price.id } : null;
}

export function formatPrice(amount: number, currency = "eur") {
  return new Intl.NumberFormat("sl-SI", { style: "currency", currency: currency.toUpperCase() }).format(amount / 100);
}
