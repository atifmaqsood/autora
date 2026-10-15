export interface Review {
  id: string;
  name: string;
  role: string;
  company: string | null;
  country: string;
  flag: string;
  quote: string;
  tag: string;
  rating: number;
  imageUrl: string;
  videoUrl: string | null;
  isActive: boolean;
  showOnHome: boolean;
  homeSortOrder: number;
}
