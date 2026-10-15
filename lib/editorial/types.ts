export interface BlogPost {
  id: string;
  title: string;
  category: string;
  publishedDate: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  videoUrl: string | null;
  isActive: boolean;
}

export interface CareerJob {
  id: string;
  title: string;
  department: string;
  location: string;
  employmentType: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  applicationEmail: string;
  isActive: boolean;
  sortOrder: number;
}
