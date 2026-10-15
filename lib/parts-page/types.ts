export interface PartsPageSection {
  id: string;
  sectionKey:
    | `category-${string}`
    | "landscape"
    | "cta";
  eyebrow: string | null;
  title: string | null;
  accentTitle: string | null;
  body: string | null;
  imageUrl: string;
  badgeTitle: string | null;
  badgeSubtitle: string | null;
  primaryButtonText: string | null;
  primaryButtonHref: string | null;
  secondaryButtonText: string | null;
  secondaryButtonHref: string | null;
  sortOrder: number;
}
