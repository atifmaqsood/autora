export interface HomeIndustryCard {
  id: string;
  title: string;
  subtitle: string;
  linkUrl: string;
  imageUrl: string;
  iconKey: "car" | "truck" | "package" | "wrench";
  sortOrder: number;
  isActive: boolean;
}
