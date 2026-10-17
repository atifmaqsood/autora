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
