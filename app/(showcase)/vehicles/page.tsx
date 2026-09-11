"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Search, ArrowRight, ChevronRight, ChevronLeft, Calendar } from "lucide-react";
import { VehicleCard } from "@/components/vehicles/vehicle-card";
import { VehicleInquiryModal } from "@/components/vehicles/vehicle-inquiry-modal";
import { getAllVehicles, filterVehicles } from "@/lib/vehicles/data";
import { VehicleFilterState } from "@/lib/vehicles/types";
import { RevealStagger, Reveal } from "@/components/ui/scroll-reveal";
import { PageHero } from "@/components/ui/page-hero";
import { agtpAssets } from "@/src/assets";

const PAGE_SIZE = 15;

function CatalogContent() {
  const searchParams = useSearchParams();
  const allVehicles = useMemo(() => getAllVehicles(), []);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);

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

  const [activePage, setActivePage] = useState(1);

  // Reset pagination to page 1 whenever filters change
  useEffect(() => {
    setActivePage(1);
  }, [filters]);

  const filteredVehicles = useMemo(() => {
    return filterVehicles(allVehicles, filters);
  }, [allVehicles, filters]);

  const totalPages = Math.max(1, Math.ceil(filteredVehicles.length / PAGE_SIZE));

  const paginatedVehicles = useMemo(() => {
    const startIndex = (activePage - 1) * PAGE_SIZE;
    return filteredVehicles.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredVehicles, activePage]);

  const scrollToGrid = () => {
    const gridElem = document.getElementById("vehicle-catalog-grid");
    if (gridElem) {
      gridElem.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div id="vehicle-catalog-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 bg-[#060709] text-white">
      {/* Dark Filter Bar */}
      <div className="bg-[#102941] border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search make, model, VIN, stock number..."
            value={filters.search}
            onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
            className="w-full bg-[#0B1F33] border border-slate-800 text-xs text-white placeholder-slate-500 pl-11 pr-4 py-3 rounded-xl focus:outline-none focus:border-[#F97316] font-medium"
          />
        </div>

        <div className="relative w-full md:w-48">
          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <select
            value={filters.year}
            onChange={(e) => setFilters((prev) => ({ ...prev, year: e.target.value }))}
            className="w-full bg-[#0B1F33] border border-slate-800 text-xs text-white pl-11 pr-8 py-3 rounded-xl focus:outline-none focus:border-[#F97316] font-medium appearance-none cursor-pointer"
          >
            <option value="all">Any year</option>
            <option value="2026">2026</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>
        </div>

        <button
          onClick={() => setActivePage(1)}
          className="w-full md:w-auto bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs px-8 py-3 rounded-full flex items-center justify-center gap-2 shadow-lg transition-all shrink-0"
        >
          <span>Search</span>
          <Search className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-400">
          {filteredVehicles.length} vehicles available
        </span>
      </div>

      {paginatedVehicles.length > 0 ? (
        <RevealStagger key={activePage} staggerDelay={80} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </RevealStagger>
      ) : (
        <div className="text-center py-20 bg-[#102941] border border-slate-800 rounded-2xl space-y-4">
          <p className="text-base text-slate-300 font-bold">No vehicles found matching your criteria</p>
          <button
            onClick={() => setFilters({ search: "", category: "all", make: "all", year: "all", fuelType: "all", transmission: "all", bodyType: "all", driveType: "all", sortBy: "newest" })}
            className="text-xs font-bold text-[#F97316] hover:text-[#FDBA74] underline"
          >
            Reset all filters
          </button>
        </div>
      )}

      {/* Pagination (15 vehicles per page) */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-8">
          <button
            onClick={() => {
              setActivePage((prev) => Math.max(prev - 1, 1));
              scrollToGrid();
            }}
            disabled={activePage === 1}
            className={`px-4 h-9 rounded-full border text-xs font-bold transition-all flex items-center gap-1 ${activePage === 1 ? "border-slate-800 text-slate-600 cursor-not-allowed bg-[#0B1F33]/40" : "border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 bg-[#102941]"}`}
            aria-label="Previous Page"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Prev</span>
          </button>

          {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((p) => (
            <button
              key={p}
              onClick={() => {
                setActivePage(p);
                scrollToGrid();
              }}
              className={`w-9 h-9 rounded-full text-xs font-bold transition-all flex items-center justify-center ${activePage === p ? "bg-[#F97316] text-white shadow-lg" : "bg-[#102941] border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"}`}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => {
              setActivePage((prev) => Math.min(prev + 1, totalPages));
              scrollToGrid();
            }}
            disabled={activePage === totalPages}
            className={`px-4 h-9 rounded-full border text-xs font-bold transition-all flex items-center gap-1 ${activePage === totalPages ? "border-slate-800 text-slate-600 cursor-not-allowed bg-[#0B1F33]/40" : "border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 bg-[#102941]"}`}
            aria-label="Next Page"
          >
            <span>Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* CAN'T FIND THE EXACT SPEC? Banner Section */}
      <Reveal duration={700}>
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#1e2b45] shadow-2xl mt-16 min-h-[380px] sm:min-h-[460px] flex items-center justify-center p-8 sm:p-14 text-center">
          {/* Dark luxury garage background photo */}
          <Image
            src="/images/spec-banner-bg.jpg"
            alt="Luxury vehicles showroom"
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover object-center"
            priority={false}
          />

          {/* Atmospheric dark overlay for readability */}
          <div className="absolute inset-0 bg-black/60 bg-gradient-to-t from-black/85 via-black/50 to-black/70" />

          {/* Top-left accent dot */}
          <div className="absolute top-6 left-8 sm:top-8 sm:left-12 w-2 h-2 rounded-full bg-white/90 shadow-sm shadow-white/40" />

          {/* Banner Content */}
          <div className="relative z-10 w-full max-w-4xl lg:max-w-5xl mx-auto space-y-4 px-4">
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-[54px] font-black text-white uppercase tracking-tight font-sans leading-[1.1]">
              <span className="block">CAN&apos;T FIND THE EXACT</span>
              <span className="block">SPEC?</span>
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
              We source to order. Tell us the make, model and destination — we&apos;ll find it and quote it.
            </p>
            <div className="pt-3">
              <button
                onClick={() => setInquiryModalOpen(true)}
                className="bg-[#4361EE] hover:bg-[#3651D4] text-white font-bold text-xs sm:text-sm px-8 py-3.5 rounded-full shadow-lg shadow-blue-600/30 transition-all inline-flex items-center gap-2 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Request a Vehicle</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </Reveal>

      <VehicleInquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
      />
    </div>
  );
}

export default function VehiclesCatalogPage() {
  return (
    <div className="space-y-0 pb-20 bg-[#060709] min-h-screen text-white">
      <PageHero
        breadcrumbs={[
          { label: "HOME", href: "/" },
          { label: "VEHICLES" }
        ]}
        badge={{
          text: "READY FOR EXPORT — WORLDWIDE SHIPPING"
        }}
        title="FIND YOUR NEXT VEHICLE"
        subtitle="Explore available vehicles and receive a clear quote with worldwide export and shipping options."
        imageSrc={agtpAssets.inventoryHero}
        imageAlt="Available Vehicles Inventory"
      />

      <Suspense fallback={
        <div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-500">
          Loading inventory...
        </div>
      }>
        <CatalogContent />
      </Suspense>
    </div>
  );
}
