import { BusinessSolutionDetail } from "@/components/agtp/business-solution-detail";
import { businessSolutions } from "@/lib/agtp/content";

export default function ApparelAndTextilesPage() {
  return <BusinessSolutionDetail solution={businessSolutions.find((item) => item.slug === "apparel-and-textiles")!} />;
}
