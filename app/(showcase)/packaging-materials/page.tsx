import { BusinessSolutionDetail } from "@/components/agtp/business-solution-detail";
import { businessSolutions } from "@/lib/agtp/content";

export default function PackagingMaterialsPage() {
  return <BusinessSolutionDetail solution={businessSolutions.find((item) => item.slug === "packaging-materials")!} />;
}
