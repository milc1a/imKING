import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "imking_admin";

function sign(exp: string) {
  return createHmac("sha256", process.env.ADMIN_PASSWORD || "").update(exp).digest("hex");
}

export function passwordOk(input: string) {
  const a = Buffer.from(input);
  const b = Buffer.from(process.env.ADMIN_PASSWORD || "");
  return b.length > 0 && a.length === b.length && timingSafeEqual(a, b);
}

export function makeToken() {
  const exp = String(Date.now() + 7 * 24 * 3600 * 1000);
  return `${exp}.${sign(exp)}`;
}

function tokenOk(token?: string) {
  if (!token || !process.env.ADMIN_PASSWORD) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  const good = sign(exp);
  return sig.length === good.length && timingSafeEqual(Buffer.from(sig), Buffer.from(good));
}

export async function isAdmin() {
  return tokenOk((await cookies()).get(ADMIN_COOKIE)?.value);
}
