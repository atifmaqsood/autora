import { BusinessSolutionDetail } from "@/components/agtp/business-solution-detail";
import { businessSolutions } from "@/lib/agtp/content";

export default function IndustrialEquipmentPage() {
  return <BusinessSolutionDetail solution={businessSolutions.find((item) => item.slug === "industrial-equipment")!} />;
}
