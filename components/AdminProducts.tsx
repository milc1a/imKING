"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Item = { id: string; name: string; image: string | null; price: string };

async function shrink(file: File): Promise<Blob> {
  try {
    const bmp = await createImageBitmap(file);
    const s = Math.min(1, 1600 / Math.max(bmp.width, bmp.height));
    const c = document.createElement("canvas");
    c.width = Math.round(bmp.width * s);
    c.height = Math.round(bmp.height * s);
    c.getContext("2d")!.drawImage(bmp, 0, 0, c.width, c.height);
    return await new Promise<Blob>((res) => c.toBlob((b) => res(b || file), "image/jpeg", 0.86));
  } catch {
    return file;
  }
}

export default function AdminProducts({ items }: { items: Item[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setBusy(true);
    setMsg("");
    try {
      const fd = new FormData(form);
      const f = fd.get("image");
      if (f instanceof File && f.size > 0) fd.set("image", await shrink(f), "slika.jpg");
      else fd.delete("image");
      const res = await fetch("/api/admin/products", { method: "POST", body: fd });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.error || "Napaka pri shranjevanju");
      form.reset();
      setMsg("Izdelek je dodan in viden v trgovini.");
      router.refresh();
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Napaka");
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Odstranim izdelek iz trgovine?")) return;
    const res = await fetch(`/api/admin/products/${encodeURIComponent(id)}`, { method: "DELETE" });
    if (res.ok) router.refresh();
    else setMsg("Odstranjevanje ni uspelo");
  }

  return (
    <>
      <h2>Nov izdelek</h2>
      <form className="sh-form" onSubmit={submit}>
        <label>
          Ime izdelka
          <input className="sh-in" name="name" required maxLength={120} />
        </label>
        <label>
          Opis
          <textarea className="sh-in" name="description" maxLength={2000} />
        </label>
        <label>
          Cena v € (z DDV)
          <input className="sh-in" name="price" inputMode="decimal" placeholder="49,90" required />
        </label>
        <label>
          Slika
          <input className="sh-in" name="image" type="file" accept="image/*" />
        </label>
        <label className="sh-chk">
          <input name="ship" type="checkbox" defaultChecked /> Fizičen izdelek (zbere naslov za dostavo)
        </label>
        <button className="sh-btn" type="submit" disabled={busy}>
          {busy ? "Nalagam …" : "Dodaj izdelek"}
        </button>
        {msg && <p className="sh-note">{msg}</p>}
      </form>

      <h2>Izdelki v trgovini ({items.length})</h2>
      <div>
        {items.map((p) => (
          <div className="sh-row" key={p.id}>
            {p.image ? <img src={p.image} alt="" /> : <img alt="" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" />}
            <div>
              <b>{p.name}</b>
              <span>{p.price}</span>
            </div>
            <button className="sh-btn alt" type="button" onClick={() => remove(p.id)}>
              Odstrani
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
