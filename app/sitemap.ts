import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://imking.si/",
      lastModified: new Date("2026-11-04"),
      changeFrequency: "monthly",
      priority: 1,
      images: ["https://imking.si/images/hero-day.jpg"],
    },
  ];
}
