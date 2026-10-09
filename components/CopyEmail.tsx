"use client";

import { useRef, useState } from "react";

export default function CopyEmail({ email }: { email: string }) {
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<"idle" | "copied" | "selected">("idle");

  const select = () => {
    if (!ref.current) return;
    const range = document.createRange();
    range.selectNodeContents(ref.current);
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
    setState("selected");
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
      setTimeout(() => setState("idle"), 1800);
    } catch {
      select();
    }
  };

  return (
    <div className="mail">
      <code ref={ref}>{email}</code>
      <button className={`copy ${state === "copied" ? "ok" : ""}`.trim()} type="button" onClick={copy}>
        {state === "copied" ? "Kopirano" : state === "selected" ? "Označeno" : "Kopiraj"}
      </button>
    </div>
  );
}
