export interface AboutPageSection {
  id: string;
  sectionKey: "story" | "difference" | "cta";
  eyebrow: string | null;
  title: string | null;
  accentTitle: string | null;
  body: string | null;
  imageUrl: string;
  badgeTitle: string | null;
  badgeSubtitle: string | null;
  sortOrder: number;
}
