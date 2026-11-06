import { NextResponse } from "next/server";
import { ADMIN_COOKIE, makeToken, passwordOk } from "@/lib/admin";

export async function POST(req: Request) {
  const form = await req.formData();
  const ok = passwordOk(String(form.get("password") || ""));
  if (!ok) {
    await new Promise((r) => setTimeout(r, 800));
    return NextResponse.redirect(new URL("/admin?napaka=1", req.url), 303);
  }
  const res = NextResponse.redirect(new URL("/admin", req.url), 303);
  res.cookies.set(ADMIN_COOKIE, makeToken(), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 3600,
  });
  return res;
}
