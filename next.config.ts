import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  // Domača stran (/) postreže statično stran Pametna inštalacija - KNX
  // (public/pametna-hisa.html). Prejšnja Next.js stran ostaja v app/page.tsx.
  async rewrites() {
    return {
      beforeFiles: [{ source: "/", destination: "/pametna-hisa.html" }],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
