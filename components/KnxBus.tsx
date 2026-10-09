"use client";

import { useEffect, useRef, useState } from "react";
import { devices, initialLog, telegrams, type DeviceKey } from "@/lib/content";

type LogRow = { id: number; pa: string; ga: string; txt: string; v: string };
type Point = [number, number];

export const ROOM_EVENT = "knx:room";

const BUS_Y = 150;
const keys = Object.keys(devices) as DeviceKey[];

/* Route of a telegram: sender's drop → along the bus → receiver's drop. */
function route(from: DeviceKey, to: DeviceKey): Point[] {
  const a = devices[from];
  const b = devices[to];
  const ay = a.top ? 96 : 204;
  const by = b.top ? 96 : 204;
  return [
    [a.x, ay],
    [a.x, BUS_Y],
    [b.x, BUS_Y],
    [b.x, by],
  ];
}

function pointAt(P: Point[], t: number): Point {
  const lens = P.slice(1).map((p, i) => Math.abs(p[0] - P[i][0]) + Math.abs(p[1] - P[i][1]));
  let d = t * lens.reduce((s, l) => s + l, 0);
  for (let k = 0; k < lens.length; k++) {
    if (d <= lens[k] || k === lens.length - 1) {
      const r = lens[k] ? Math.min(d / lens[k], 1) : 1;
      return [P[k][0] + (P[k + 1][0] - P[k][0]) * r, P[k][1] + (P[k + 1][1] - P[k][1]) * r];
    }
    d -= lens[k];
  }
  return P[P.length - 1];
}

const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

export default function KnxBus() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pulseRef = useRef<SVGCircleElement>(null);
  const haloRef = useRef<SVGCircleElement>(null);
  const trailRef = useRef<SVGPathElement>(null);

  const [tx, setTx] = useState<DeviceKey | null>(null);
  const [rx, setRx] = useState<{ key: DeviceKey; value: string } | null>(null);
  const [log, setLog] = useState<LogRow[]>(initialLog.map((r, i) => ({ ...r, id: -i - 1 })));

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const svg = svgRef.current;
    const pulse = pulseRef.current;
    const halo = haloRef.current;
    const trail = trailRef.current;
    if (!svg || !pulse || !halo || !trail) return;

    let visible = true;
    let n = 0;
    let raf = 0;
    const timers: number[] = [];
    const later = (fn: () => void, ms: number) => timers.push(window.setTimeout(fn, ms));

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(svg);

    const run = () => {
      if (!visible || document.hidden) return later(run, 600);
      const ev = telegrams[n % telegrams.length];
      const id = n++;
      const P = route(ev.f, ev.t);
      let start: number | null = null;

      setTx(ev.f);
      pulse.setAttribute("opacity", "1");
      halo.setAttribute("opacity", "1");

      const frame = (ts: number) => {
        if (start === null) start = ts;
        const t = Math.min((ts - start) / 1500, 1);
        const p = pointAt(P, ease(t));
        const q = pointAt(P, Math.max(ease(t) - 0.12, 0));
        pulse.setAttribute("cx", String(p[0]));
        pulse.setAttribute("cy", String(p[1]));
        halo.setAttribute("cx", String(p[0]));
        halo.setAttribute("cy", String(p[1]));
        trail.setAttribute("d", `M${q[0]} ${q[1]} L${p[0]} ${p[1]}`);
        if (t < 1) {
          raf = requestAnimationFrame(frame);
          return;
        }
        pulse.setAttribute("opacity", "0");
        halo.setAttribute("opacity", "0");
        trail.setAttribute("d", "");
        setTx(null);
        setRx({ key: ev.t, value: ev.v.toLowerCase() });
        setLog((rows) => [{ id, pa: devices[ev.f].pa, ga: ev.ga, txt: ev.txt, v: ev.v }, ...rows].slice(0, 3));
        window.dispatchEvent(new CustomEvent(ROOM_EVENT, { detail: ev.room }));
        later(() => setRx(null), 1400);
        later(run, 1700);
      };
      raf = requestAnimationFrame(frame);
    };

    later(run, 1600);
    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      io.disconnect();
    };
  }, []);

  return (
    <figure className="bus">
      <svg
        ref={svgRef}
        viewBox="0 0 520 270"
        role="img"
        aria-label="Shema vodila KNX: šest naprav na skupnem dvožilnem vodilu si izmenjuje sporočila, brez centralne enote."
      >
        <text className="bl" x="20" y="22">
          KNX TP · 30 V DC
        </text>
        <text className="bl" x="500" y="22" textAnchor="end">
          VODILO AKTIVNO
        </text>
        <rect className="node" x="20" y="128" width="64" height="44" rx="8" />
        <text className="ns" x="52" y="154" textAnchor="middle">
          PSU
        </text>
        <path className="w1 draw" pathLength={1} d="M84 145 H500" />
        <path className="w2 draw b" pathLength={1} d="M84 155 H500" />

        {keys.map((k, i) => {
          const d = devices[k];
          const w = d.w ?? 92;
          const y = d.top ? 44 : 204;
          const tapY = d.top ? 145 : 155;
          const state = tx === k ? "tx" : rx?.key === k ? "rx" : "";
          const sub = tx === k ? "pošilja" : rx?.key === k ? rx.value : d.sub;
          return (
            <g key={k} className={`dev ${state}`.trim()} style={{ animationDelay: `${0.5 + i * 0.08}s` }}>
              <path className="drop" d={`M${d.x} ${tapY} V${d.top ? 96 : 204}`} />
              <circle className="tap" cx={d.x} cy={tapY} r="3" />
              <rect className="node" x={d.x - w / 2} y={y} width={w} height="52" rx="8" />
              <text className="nt" x={d.x} y={y + 23} textAnchor="middle">
                {d.name}
              </text>
              <text className="ns" x={d.x} y={y + 40} textAnchor="middle">
                {sub}
              </text>
            </g>
          );
        })}

        <path ref={trailRef} className="trail" d="" />
        <circle ref={haloRef} className="halo" r="9" cx="0" cy="0" opacity="0" />
        <circle ref={pulseRef} className="pulse" r="3.5" cx="0" cy="0" opacity="0" />
      </svg>

      <ol className="log mono" aria-live="off">
        {log.map((r) => (
          <li key={r.id} className={r.id >= 0 ? "new" : undefined}>
            <span>{r.pa}</span>
            <span className="t">{r.ga}</span>
            <span>{r.txt}</span>
            <span className="val">{r.v}</span>
          </li>
        ))}
      </ol>
    </figure>
  );
}
