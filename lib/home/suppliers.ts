import type { StaticImageData } from "next/image";

import { agtpAssets } from "@/src/assets";

export interface HomeSupplier {
  id: string;
  title: string;
  tag: string;
  experience: string;
  countries: string;
  linkUrl: string;
  imageUrl: string;
  showOnHome: boolean;
  sortOrder: number;
}

/** The homepage "Automotive Suppliers" grid shows at most this many cards. */
export const MAX_HOME_SUPPLIERS = 6;

/** Images for the seeded suppliers ("builtin:*" keys stored by the API). */
export const supplierBuiltinImages: Record<string, StaticImageData> = {
  "builtin:supplier-escalade": agtpAssets.cadillacEscaladeCard,
  "builtin:supplier-bmw760": agtpAssets.bmw760Card,
  "builtin:supplier-cclass": agtpAssets.mercedesCclassCard,
  "builtin:supplier-byd": agtpAssets.bydDestroyerCard,
  "builtin:supplier-bmwx2": agtpAssets.bmwX2Card,
  "builtin:supplier-parts": agtpAssets.sparePartsHero
};

export function supplierImageSrc(imageUrl: string): string | StaticImageData {
  return supplierBuiltinImages[imageUrl] ?? imageUrl;
}

const defaultTag = "Automotive Parts, Body Kits, Tyres";

/** Shown if the API is unreachable; mirrors the seeded suppliers. */
export const fallbackSuppliers: HomeSupplier[] = [
  ["Automotive Body Kits Market Location 6", "18+ year Experience", "Serving 25+ Countries", "builtin:supplier-escalade"],
  ["Automotive Body Kits Market Location 5", "10+ year Experience", "Serving 14+ Countries", "builtin:supplier-bmw760"],
  ["Automotive Body Kits Market Location 2", "10+ year Experience", "Serving 25+ Countries", "builtin:supplier-cclass"],
  ["Automotive Body Kits Market Location 3", "13+ year Experience", "Serving 20+ Countries", "builtin:supplier-byd"],
  ["Automotive Body Kits Market Location 4", "12+ year Experience", "Serving 15+ Countries", "builtin:supplier-bmwx2"],
  ["Automotive Parts Market Location 10", "10+ year Experience", "Serving 25+ Countries", "builtin:supplier-parts"]
].map(([title, experience, countries, imageUrl], index) => ({
  id: `fallback-${index}`,
  title,
  tag: defaultTag,
  experience,
  countries,
  linkUrl: "/brands",
  imageUrl,
  showOnHome: true,
  sortOrder: index + 1
}));
