import type { MetadataRoute } from "next";
import { COUNTRY_CODES } from "@/lib/countries";
import { TOOLS } from "@/lib/tools";

const BASE_URL = "https://calculio.net";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  for (const country of COUNTRY_CODES) {
    entries.push({
      url: `${BASE_URL}/${country}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    });
    for (const tool of TOOLS) {
      if (tool.availableIn.includes(country)) {
        entries.push({
          url: `${BASE_URL}/${country}/${tool.slug}`,
          lastModified: now,
          changeFrequency: "monthly",
          priority: 0.7,
        });
      }
    }
  }

  for (const path of ["mentions-legales", "confidentialite", "sources"]) {
    entries.push({
      url: `${BASE_URL}/${path}`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    });
  }

  return entries;
}
