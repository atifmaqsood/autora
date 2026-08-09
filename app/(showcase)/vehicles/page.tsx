"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { PageHero } from "@/components/layout/page-hero";
import { VehicleFilters } from "@/components/vehicles/vehicle-filters";
import { VehicleGrid } from "@/components/vehicles/vehicle-grid";
import {
  getAllVehicles,
  getMakesList,
  filterVehicles
} from "@/lib/vehicles/data";
import { VehicleFilterState } from "@/lib/vehicles/types";

function CatalogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const allVehicles = useMemo(() => getAllVehicles(), []);
  const makesList = useMemo(() => getMakesList(), []);

  const [filters, setFilters] = useState<VehicleFilterState>({
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "all",
    make: searchParams.get("make") || "all",
    year: searchParams.get("year") || "all",
    fuelType: searchParams.get("fuelType") || "all",
    transmission: searchParams.get("transmission") || "all",
    bodyType: searchParams.get("bodyType") || "all",
    driveType: searchParams.get("driveType") || "all",
    sortBy: (searchParams.get("sortBy") as any) || "newest"
  });

  const filteredVehicles = useMemo(() => {
    return filterVehicles(allVehicles, filters);
  }, [allVehicles, filters]);

  const handleFilterChange = (key: keyof VehicleFilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: "",
      category: "all",
      make: "all",
      year: "all",
      fuelType: "all",
      transmission: "all",
      bodyType: "all",
      driveType: "all",
      sortBy: "newest"
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <VehicleFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
        makesList={makesList}
        totalResults={filteredVehicles.length}
      />

      <VehicleGrid
        vehicles={filteredVehicles}
        onClearFilters={handleResetFilters}
      />
    </div>
  );
}

export default function VehiclesCatalogPage() {
  return (
    <div className="space-y-6 pb-16">
      <PageHero
        badge="SHOWCASE CATALOG"
        title="Vehicle Catalog & Specifications"
        subtitle="Explore engineering specifications, engine outputs, and complete technical equipment across our full vehicle collection."
      />

      <Suspense fallback={
        <div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-500">
          Loading vehicle catalog...
        </div>
      }>
        <CatalogContent />
      </Suspense>
    </div>
  );
}
