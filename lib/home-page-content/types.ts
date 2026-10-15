export interface HomePageContentItem {
  id: string;
  sectionKey: string;
  itemKey: string;
  label: string | null;
  title: string | null;
  subtitle: string | null;
  imageUrl: string | null;
  sortOrder: number;
}
