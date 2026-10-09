"use client";

import { useEffect, useState } from "react";
import { ROOM_EVENT } from "./KnxBus";

/* App screens of the reference project; the one the KNX diagram just addressed lights up. */
export default function Rooms({ rooms }: { rooms: string[] }) {
  const [on, setOn] = useState<string | null>(null);

  useEffect(() => {
    const handler = (e: Event) => setOn((e as CustomEvent<string>).detail);
    window.addEventListener(ROOM_EVENT, handler);
    return () => window.removeEventListener(ROOM_EVENT, handler);
  }, []);

  return (
    <ul className="rooms">
      {rooms.map((r) => (
        <li key={r} className={r === on ? "on" : undefined}>
          {r}
        </li>
      ))}
    </ul>
  );
}
