import type { Metadata } from "next";
import ShopBar from "@/components/ShopBar";
import "../trgovina.css";

export const metadata: Metadata = { title: "Hvala za nakup | imKING", robots: { index: false } };

export default function Hvala() {
  return (
    <div className="sh">
      <ShopBar active="trgovina" />
      <main className="sh-main">
        <h1>Hvala za nakup!</h1>
        <p className="sh-lead">Plačilo je uspelo. Potrdilo o nakupu prejmete na vaš e-poštni naslov.</p>
        <a className="sh-btn" href="/trgovina">
          Nazaj v trgovino
        </a>
      </main>
    </div>
  );
}
