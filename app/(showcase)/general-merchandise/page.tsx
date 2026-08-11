import { BusinessSolutionDetail } from "@/components/agtp/business-solution-detail";
import { businessSolutions } from "@/lib/agtp/content";

export default function GeneralMerchandisePage() {
  return <BusinessSolutionDetail solution={businessSolutions.find((item) => item.slug === "general-merchandise")!} />;
}
