import { agtpAssets } from "@/src/assets";

/** Built-in cover images referenced by seeded blog posts ("builtin:*"). */
export const blogBuiltinImages: Record<string, string> = {
  "builtin:blog-export-port": agtpAssets.exportPort.src,
  "builtin:blog-spare-parts": agtpAssets.sparePartsHero.src,
  "builtin:blog-about": agtpAssets.aboutHero.src,
  "builtin:blog-newsletter": agtpAssets.exportPort.src
};

export function blogImageSrc(imageUrl: string): string {
  return blogBuiltinImages[imageUrl] ?? imageUrl;
}
