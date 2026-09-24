import type { StaticImageData } from "next/image";
import { Car, Cog, Package, type LucideIcon } from "lucide-react";
import { agtpAssets } from "@/src/assets";

export interface DubaiAutomotiveCategory {
  slug: string;
  title: string;
  subtitle: string;
  image: StaticImageData;
  icon: LucideIcon;
  products: readonly DubaiAutomotiveProduct[];
}

export interface DubaiAutomotiveProduct {
  slug: string;
  title: string;
  image: StaticImageData;
  gallery: readonly StaticImageData[];
}

const demoImages = [
  agtpAssets.sparePartsHero,
  agtpAssets.mercedesCclassCard,
  agtpAssets.cadillacEscaladeCard,
  agtpAssets.bmwX2Card,
  agtpAssets.bydDestroyerCard,
  agtpAssets.bmw760Card,
  agtpAssets.pickups,
  agtpAssets.suvs
] as const;

function toSlug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export const dubaiAutomotiveFeatures = [
  "Industry",
  "Specialization",
  "Warehouse Size",
  "Export Experience",
  "Serving Countries",
  "Inspection Rate Pass"
] as const;

function createProducts(names: readonly string[], offset: number): readonly DubaiAutomotiveProduct[] {
  return names.map((title, index) => {
    const image = demoImages[(index + offset) % demoImages.length];
    return {
      slug: toSlug(title),
      title,
      image,
      gallery: Array.from({ length: 8 }, (_, galleryIndex) => demoImages[(index + offset + galleryIndex) % demoImages.length])
    };
  });
}

export const dubaiAutomotiveCategories: readonly DubaiAutomotiveCategory[] = [
  {
    slug: "parts-accessories",
    title: "Parts & Accessories",
    subtitle: "Genuine, OEM, aftermarket and upgrade products for worldwide supply.",
    image: agtpAssets.sparePartsHero,
    icon: Package,
    products: createProducts(
      ["Premium Brake Kit", "Engine Service Filter Set", "LED Headlight Assembly", "Genuine Battery Pack", "All-Weather Floor Mat Set", "Smart Android Head Unit"],
      0
    )
  },
  {
    slug: "engines-transmissions",
    title: "Engines & Transmissions",
    subtitle: "Diesel, petrol, hybrid and mechanical assemblies for global export.",
    image: agtpAssets.mercedesCclassCard,
    icon: Cog,
    products: createProducts(
      ["Complete Diesel Engine", "Automatic Transmission Assembly", "Hybrid Drive Unit", "Turbocharger System", "Cylinder Head Assembly", "Heavy-Duty Clutch Kit"],
      2
    )
  },
  {
    slug: "tyres-rims-body-kits",
    title: "Tyres, Rims & Body Kits",
    subtitle: "Performance, styling and protection products for modern vehicles.",
    image: agtpAssets.bmwX2Card,
    icon: Car,
    products: createProducts(
      ["All-Terrain Tyre Set", "Forged Alloy Wheel Set", "Performance Body Kit", "LED Off-Road Light Bar", "Premium Side Step Set", "Sport Front Bumper"],
      4
    )
  }
];

export function getDubaiAutomotiveCategory(slug: string) {
  return dubaiAutomotiveCategories.find((category) => category.slug === slug);
}

export function getDubaiAutomotiveProduct(categorySlug: string, productSlug: string) {
  const category = getDubaiAutomotiveCategory(categorySlug);
  const product = category?.products.find((item) => item.slug === productSlug);
  return category && product ? { category, product } : undefined;
}
