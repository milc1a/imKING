import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Ni dostopa" }, { status: 401 });
  try {
    const form = await req.formData();
    const name = String(form.get("name") || "").trim();
    const description = String(form.get("description") || "").trim();
    const euros = Number(String(form.get("price") || "").replace(",", "."));
    const cents = Math.round(euros * 100);
    if (!name) return NextResponse.json({ error: "Vpišite ime izdelka" }, { status: 400 });
    if (!Number.isFinite(cents) || cents < 50) return NextResponse.json({ error: "Cena mora biti vsaj 0,50 €" }, { status: 400 });

    let imageUrl: string | undefined;
    const file = form.get("image");
    if (file instanceof File && file.size > 0) {
      if (!file.type.startsWith("image/")) return NextResponse.json({ error: "Datoteka ni slika" }, { status: 400 });
      if (file.size > 4_000_000) return NextResponse.json({ error: "Slika je prevelika (največ 4 MB)" }, { status: 400 });
      const safe = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) || "izdelek";
      const blob = await put(`trgovina/${safe}.jpg`, file, { access: "public", addRandomSuffix: true, contentType: file.type });
      imageUrl = blob.url;
    }

    const product = await stripe("POST", "/products", {
      name,
      description: description || undefined,
      "images[0]": imageUrl,
      "metadata[ship]": form.get("ship") ? "1" : "0",
      "default_price_data[currency]": "eur",
      "default_price_data[unit_amount]": cents,
    });
    return NextResponse.json({ ok: true, id: product.id });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Napaka" }, { status: 500 });
  }
}
