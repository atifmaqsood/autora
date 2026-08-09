import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/page-hero";
import { VehicleGrid } from "@/components/vehicles/vehicle-grid";
import {
  CATEGORIES_LIST,
  getAllVehicles
} from "@/lib/vehicles/data";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = CATEGORIES_LIST.find((c) => c.slug.toLowerCase() === slug.toLowerCase());

  if (!category) {
    return {
      title: "Category Not Found | AUTORA Showcase"
    };
  }

  return {
    title: `${category.name} Vehicle Showcase & Specifications | AUTORA`,
    description: category.description
  };
}

export async function generateStaticParams() {
  return CATEGORIES_LIST.map((c) => ({
    slug: c.slug
  }));
}

export default async function CategoryDetailPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = CATEGORIES_LIST.find((c) => c.slug.toLowerCase() === slug.toLowerCase());

  if (!category) {
    notFound();
  }

  const allVehicles = getAllVehicles();
  const categoryVehicles = allVehicles.filter(
    (v) => v.category.toLowerCase() === category.name.toLowerCase()
  );

  return (
    <div className="space-y-8 pb-16">
      <PageHero
        badge="CATEGORY SHOWCASE"
        title={`${category.name} Vehicles`}
        subtitle={category.description}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-700">
            Showing <strong className="text-slate-900">{categoryVehicles.length}</strong> {category.name} models in showcase catalog
          </span>
        </div>

        <VehicleGrid vehicles={categoryVehicles} />
      </div>
    </div>
  );
}
