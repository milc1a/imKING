import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.imking.si/",
      lastModified: new Date("2026-11-04"),
      changeFrequency: "monthly",
      priority: 1,
      images: ["https://www.imking.si/images/hero-day.jpg"],
    },
    {
      url: "https://www.imking.si/trgovina",
      lastModified: new Date("2026-11-06"),
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];
}
