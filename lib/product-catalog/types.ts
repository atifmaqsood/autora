export interface CatalogItem {
  id: string;
  categoryId: string;
  slug: string;
  title: string;
  description: string;
  features: string[];
  attributes: string[];
  priceLabel: string;
  images: string[];
  isActive: boolean;
  sortOrder: number;
}

export interface CatalogCategory {
  id: string;
  catalogType: "parts" | "dubai";
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  isActive: boolean;
  sortOrder: number;
  products: CatalogItem[];
}
