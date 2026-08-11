"use client";

import { Search, RotateCcw, Filter, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { VehicleFilterState } from "@/lib/vehicles/types";

interface VehicleFiltersProps {
  filters: VehicleFilterState;
  onFilterChange: (key: keyof VehicleFilterState, value: string) => void;
  onReset: () => void;
  makesList: string[];
  totalResults: number;
}

export function VehicleFilters({
  filters,
  onFilterChange,
  onReset,
  makesList,
  totalResults
}: VehicleFiltersProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
      {/* Top Bar: Search & Quick Reset & Count */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Field */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Search make, model, variant, engine..."
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            className="pl-10 h-10 bg-slate-50 border-slate-200 focus:bg-white text-sm"
          />
        </div>

        {/* Count & Reset Actions */}
        <div className="flex items-center justify-between w-full md:w-auto gap-4">
          <div className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
            Showing <strong className="text-slate-900">{totalResults}</strong> Vehicles
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider hidden sm:inline">
              Sort:
            </span>
            <select
              value={filters.sortBy}
              onChange={(e) => onFilterChange("sortBy", e.target.value as any)}
              className="h-9 px-3 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950"
            >
              <option value="newest">Newest Year First</option>
              <option value="hp-desc">Horsepower (Highest First)</option>
              <option value="price-desc">MSRP (High to Low)</option>
              <option value="price-asc">MSRP (Low to High)</option>
              <option value="name-asc">Make & Model (A-Z)</option>
              <option value="name-desc">Make & Model (Z-A)</option>
            </select>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="text-xs text-slate-600 hover:text-slate-900 gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </Button>
        </div>
      </div>

      {/* Filter Selectors Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-3 border-t border-slate-100">
        {/* Category */}
        <div>
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => onFilterChange("category", e.target.value)}
            className="w-full h-9 px-2.5 rounded-lg border border-slate-200 bg-slate-50 text-xs font-medium text-slate-800 focus:bg-white focus:outline-none"
          >
            <option value="all">All Categories</option>
            <option value="SUV">SUV</option>
            <option value="Luxury">Luxury</option>
            <option value="Sports">Sports</option>
            <option value="Electric">Electric</option>
            <option value="Pickup">Pickup</option>
            <option value="Sedan">Sedan</option>
            <option value="Coupe">Coupe</option>
            <option value="Off-road">Off-road</option>
          </select>
        </div>

        {/* Make */}
        <div>
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Make
          </label>
          <select
            value={filters.make}
            onChange={(e) => onFilterChange("make", e.target.value)}
            className="w-full h-9 px-2.5 rounded-lg border border-slate-200 bg-slate-50 text-xs font-medium text-slate-800 focus:bg-white focus:outline-none"
          >
            <option value="all">All Makes</option>
            {makesList.map((make) => (
              <option key={make} value={make}>
                {make}
              </option>
            ))}
          </select>
        </div>

        {/* Fuel Type */}
        <div>
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Fuel Type
          </label>
          <select
            value={filters.fuelType}
            onChange={(e) => onFilterChange("fuelType", e.target.value)}
            className="w-full h-9 px-2.5 rounded-lg border border-slate-200 bg-slate-50 text-xs font-medium text-slate-800 focus:bg-white focus:outline-none"
          >
            <option value="all">All Fuel Types</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Plug-in Hybrid">Plug-in Hybrid</option>
          </select>
        </div>

        {/* Transmission */}
        <div>
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Transmission
          </label>
          <select
            value={filters.transmission}
            onChange={(e) => onFilterChange("transmission", e.target.value)}
            className="w-full h-9 px-2.5 rounded-lg border border-slate-200 bg-slate-50 text-xs font-medium text-slate-800 focus:bg-white focus:outline-none"
          >
            <option value="all">All Transmissions</option>
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
            <option value="Dual-Clutch">Dual-Clutch</option>
            <option value="CVT">CVT</option>
          </select>
        </div>

        {/* Drive Type */}
        <div>
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Drive Type
          </label>
          <select
            value={filters.driveType}
            onChange={(e) => onFilterChange("driveType", e.target.value)}
            className="w-full h-9 px-2.5 rounded-lg border border-slate-200 bg-slate-50 text-xs font-medium text-slate-800 focus:bg-white focus:outline-none"
          >
            <option value="all">All Drive Types</option>
            <option value="AWD">AWD</option>
            <option value="4WD">4WD</option>
            <option value="RWD">RWD</option>
            <option value="FWD">FWD</option>
          </select>
        </div>
      </div>
    </div>
  );
}


