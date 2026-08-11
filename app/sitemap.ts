import { MetadataRoute } from "next";
import { getAllVehicles, CATEGORIES_LIST } from "@/lib/vehicles/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://agtpgroup.com";
  const vehicles = getAllVehicles();

  const vehicleUrls = vehicles.map((v) => ({
    url: `${baseUrl}/vehicles/${v.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8
  }));

  const categoryUrls = CATEGORIES_LIST.map((c) => ({
    url: `${baseUrl}/categories/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7
  }));

  const agtpUrls = [
    "/brands",
    "/faqs",
    "/contact-us",
    "/about-us",
    "/business-solutions",
    "/automotive",
    "/construction-materials",
    "/furniture-and-home-items",
    "/general-merchandise",
    "/industrial-equipment",
    "/packaging-materials",
    "/apparel-and-textiles",
    "/electronics"
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0
    },
    {
      url: `${baseUrl}/vehicles`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9
    },
    {
      url: `${baseUrl}/spare-parts`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5
    },
    {
      url: `${baseUrl}/locations`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6
    },
    ...agtpUrls,
    ...categoryUrls,
    ...vehicleUrls
  ];
}


