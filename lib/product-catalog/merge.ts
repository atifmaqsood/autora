import type { DubaiAutomotiveCategory } from "@/lib/dubai-automotive/data";
import type { MarketingPageSection } from "@/lib/marketing-page-content/types";
import type { PartsCategory } from "@/lib/parts/data";
import type { PartsPageSection } from "@/lib/parts-page/types";
import type { CatalogCategory, CatalogItem } from "@/lib/product-catalog/types";

/**
 * A fixed parts category built only from admin data: its card text and image
 * from the parts page section (the image the admin edits; a category's old
 * catalogue cover is ignored) and its catalogue products. Nothing comes from the built-in demo data except
 * the bundled photo a "builtin:" image key stands for. Empty until loaded.
 */
export function managedPartsCategory(
  card: PartsCategory,
  section: PartsPageSection | undefined,
  managed: CatalogCategory | undefined,
  productNames: (product: CatalogItem) => string[],
): PartsCategory {
  const image = !section?.imageUrl
    ? ""
    : section.imageUrl.startsWith("builtin:")
      ? card.image
      : section.imageUrl;
  const products = managed?.products ?? [];
  return {
    ...card,
    title: section?.title ?? "",
    subtitle: section?.body ?? "",
    image,
    gallery: [
      ...(image ? [image] : []),
      ...products.flatMap((product) => product.images),
    ],
    products: products.flatMap(productNames),
    // Only an uploaded brochure; no generated one.
    brochureUrl:
      products.find((product) => product.brochureUrl)?.brochureUrl ?? undefined,
  };
}

/**
 * A fixed Dubai Automotive category built only from admin data: the title,
 * text and image of its card on the Dubai Automotive page (a category's old
 * catalogue cover is ignored) and its catalogue products (no demo ones).
 */
export function managedDubaiCategory(
  fixed: DubaiAutomotiveCategory,
  section: MarketingPageSection | undefined,
  managed: CatalogCategory | undefined,
) {
  const image = !section?.imageUrl
    ? ""
    : section.imageUrl.startsWith("builtin:")
      ? fixed.image
      : section.imageUrl;
  return {
    slug: fixed.slug,
    icon: fixed.icon,
    title: section?.title ?? "",
    subtitle: section?.body ?? "",
    image,
    products: (managed?.products ?? []).map((product) => ({
      ...product,
      image: product.images[0] ?? "",
      gallery: product.images,
    })),
  };
}

/** Loads what a Dubai Automotive category page needs from the admin panel. */
export async function loadDubaiCategory(slug: string) {
  const list = async <T>(url: string): Promise<T[]> => {
    try {
      const response = await fetch(url, { cache: "no-store" });
      return response.ok ? ((await response.json()) as T[]) : [];
    } catch {
      return [];
    }
  };
  const [catalog, sections] = await Promise.all([
    list<CatalogCategory>("/api/product-catalog/dubai"),
    list<MarketingPageSection>("/api/page-content/dubai-automotive"),
  ]);
  return {
    managed: catalog.find((item) => item.slug === slug),
    section: sections.find((item) => item.sectionKey === `market-${slug}`),
  };
}
