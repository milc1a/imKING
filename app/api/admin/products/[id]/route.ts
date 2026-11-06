import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin";
import { stripe } from "@/lib/stripe";

// Izdelek se v Stripe arhivira (ne prikazuje se več v trgovini; naročila ostanejo).
export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Ni dostopa" }, { status: 401 });
  try {
    const { id } = await params;
    await stripe("POST", `/products/${encodeURIComponent(id)}`, { active: false });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Napaka" }, { status: 500 });
  }
}
