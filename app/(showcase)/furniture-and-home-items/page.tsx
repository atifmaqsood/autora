import { BusinessSolutionDetail } from "@/components/agtp/business-solution-detail";
import { businessSolutions } from "@/lib/agtp/content";

export default function FurnitureAndHomeItemsPage() {
  return <BusinessSolutionDetail solution={businessSolutions.find((item) => item.slug === "furniture-and-home-items")!} />;
}
