import { BusinessSolutionDetail } from "@/components/agtp/business-solution-detail";
import { businessSolutions } from "@/lib/agtp/content";

export default function AutomotivePage() {
  return <BusinessSolutionDetail solution={businessSolutions.find((item) => item.slug === "automotive")!} />;
}
