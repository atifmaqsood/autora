import type { StaticImageData } from "next/image";
import { Car, Cog, Package, type LucideIcon } from "lucide-react";
import { agtpAssets } from "@/src/assets";

export interface DubaiAutomotiveCategory {
  slug: string;
  title: string;
  subtitle: string;
  image: StaticImageData;
  icon: LucideIcon;
}

export const dubaiAutomotiveFeatures = [
  "Industry",
  "Specialization",
  "Warehouse Size",
  "Export Experience",
  "Serving Countries",
  "Inspection Rate Pass"
] as const;

export const dubaiAutomotiveCategories: readonly DubaiAutomotiveCategory[] = [
  {
    slug: "parts-accessories",
    title: "Parts & Accessories",
    subtitle: "Genuine, OEM, aftermarket and upgrade products for worldwide supply.",
    image: agtpAssets.sparePartsHero,
    icon: Package
  },
  {
    slug: "engines-transmissions",
    title: "Engines & Transmissions",
    subtitle: "Diesel, petrol, hybrid and mechanical assemblies for global export.",
    image: agtpAssets.mercedesCclassCard,
    icon: Cog
  },
  {
    slug: "tyres-rims-body-kits",
    title: "Tyres, Rims & Body Kits",
    subtitle: "Performance, styling and protection products for modern vehicles.",
    image: agtpAssets.bmwX2Card,
    icon: Car
  }
];

export function getDubaiAutomotiveCategory(slug: string) {
  return dubaiAutomotiveCategories.find((category) => category.slug === slug);
}
