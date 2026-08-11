import { notFound } from "next/navigation";
import { BusinessSolutionDetail } from "@/components/agtp/business-solution-detail";
import { businessSolutions } from "@/lib/agtp/content";

interface BusinessSolutionPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return businessSolutions.map((solution) => ({ slug: solution.slug }));
}

export default async function BusinessSolutionDetailPage({ params }: BusinessSolutionPageProps) {
  const { slug } = await params;
  const solution = businessSolutions.find((item) => item.slug === slug);

  if (!solution) notFound();

  return <BusinessSolutionDetail solution={solution} />;
}
