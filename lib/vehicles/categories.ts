"use client";

import { useEffect, useState } from "react";
import type { HomeIndustryCard } from "@/lib/home-industries/types";

/**
 * Vehicle categories: the titles of the homepage "Industries We Serve" cards,
 * as managed in the admin panel. Empty until loaded.
 */
export function useVehicleCategories(): string[] {
  const [categories, setCategories] = useState<string[]>([]);
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/home/industry-cards", {
      signal: controller.signal,
      cache: "no-store",
    })
      .then((response) =>
        response.ok ? (response.json() as Promise<HomeIndustryCard[]>) : [],
      )
      .then((cards) =>
        setCategories(
          cards.map((card) => card.title.trim()).filter(Boolean),
        ),
      )
      .catch(() => undefined);
    return () => controller.abort();
  }, []);
  return categories;
}
