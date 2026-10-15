export interface Faq {
  id: string;
  question: string;
  answer: string;
  category: string;
  linkText: string | null;
  linkUrl: string | null;
  sortOrder: number;
  isActive: boolean;
}
export const faqCategories = [
  "Vehicles",
  "Spare Parts",
  "Orders & Payments",
  "Shipping & Export",
  "Refunds & Support",
] as const;
