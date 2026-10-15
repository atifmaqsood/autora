export type MarketingPageKey =
  | "shipping"
  | "how-it-works"
  | "dubai-automotive"
  | "customer-reviews"
  | "blogs";

export interface MarketingPageSection {
  id: string;
  pageKey: MarketingPageKey;
  sectionKey: string;
  eyebrow: string | null;
  title: string | null;
  body: string | null;
  imageUrl: string | null;
  videoUrl: string | null;
  primaryButtonText: string | null;
  primaryButtonHref: string | null;
  secondaryButtonText: string | null;
  secondaryButtonHref: string | null;
  sortOrder: number;
}
