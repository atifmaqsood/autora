"use client";

import { Vehicle } from "@/lib/vehicles/types";
import { VehicleCard } from "./vehicle-card";
import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RevealStagger } from "@/components/ui/scroll-reveal";

interface VehicleGridProps {
  vehicles: Vehicle[];
  onClearFilters?: () => void;
}

export function VehicleGrid({ vehicles, onClearFilters }: VehicleGridProps) {
  if (vehicles.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center my-8 shadow-sm space-y-4">
        <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
          <SearchX className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">
          No Vehicles Match Your Search Filters
        </h3>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          Try expanding your search query, clearing specific vehicle make or category filters, or selecting a different model year.
        </p>
        {onClearFilters && (
          <Button variant="outline" onClick={onClearFilters} className="font-semibold mt-2">
            Clear All Showcase Filters
          </Button>
        )}
      </div>
    );
  }

  return (
    <RevealStagger staggerDelay={80} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {vehicles.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </RevealStagger>
  );
}


