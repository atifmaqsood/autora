export interface PageBanner {
  id: string;
  pageKey: string;
  sectionKey: string;
  title: string | null;
  altText: string;
  mediaType: "image" | "video";
  mediaUrl: string;
  /** Backward-compatible API field. */
  imageUrl: string;
  sortOrder: number;
  isActive: boolean;
}
