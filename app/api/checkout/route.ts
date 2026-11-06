import { NextResponse } from "next/server";
import { getProduct, stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const origin = process.env.SITE_URL || new URL(req.url).origin;
  try {
    const form = await req.formData();
    const id = String(form.get("productId") || "");
    const qty = Math.min(10, Math.max(1, parseInt(String(form.get("qty") || "1"), 10) || 1));
    const found = id ? await getProduct(id) : null;
    if (!found) return NextResponse.redirect(new URL("/trgovina?napaka=1", origin), 303);

    const params: Record<string, string | number | boolean> = {
      mode: "payment",
      locale: "sl",
      "line_items[0][price]": found.priceId,
      "line_items[0][quantity]": qty,
      "phone_number_collection[enabled]": true,
      billing_address_collection: "required",
      success_url: `${origin}/trgovina/hvala`,
      cancel_url: `${origin}/trgovina`,
    };
    if (found.product.ship) {
      ["SI", "AT", "HR", "IT", "DE", "HU"].forEach((c, i) => (params[`shipping_address_collection[allowed_countries][${i}]`] = c));
      const ship = Number(process.env.SHIPPING_EUR || 0);
      if (ship > 0) {
        params["shipping_options[0][shipping_rate_data][type]"] = "fixed_amount";
        params["shipping_options[0][shipping_rate_data][display_name]"] = "Dostava";
        params["shipping_options[0][shipping_rate_data][fixed_amount][amount]"] = Math.round(ship * 100);
        params["shipping_options[0][shipping_rate_data][fixed_amount][currency]"] = "eur";
      }
    }
    const session = await stripe("POST", "/checkout/sessions", params);
    return NextResponse.redirect(session.url, 303);
  } catch {
    return NextResponse.redirect(new URL("/trgovina?napaka=1", origin), 303);
  }
}
