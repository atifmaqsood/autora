"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, ArrowRight, ChevronRight, Calendar } from "lucide-react";
import { VehicleCard } from "@/components/vehicles/vehicle-card";
import { VehicleInquiryModal } from "@/components/vehicles/vehicle-inquiry-modal";
import { getAllVehicles, filterVehicles } from "@/lib/vehicles/data";
import { VehicleFilterState } from "@/lib/vehicles/types";
import { RevealStagger, Reveal } from "@/components/ui/scroll-reveal";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { agtpAssets } from "@/src/assets";

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

  const filteredVehicles = useMemo(() => {
    return filterVehicles(allVehicles, filters);
  }, [allVehicles, filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 bg-[#0B1F33] text-white">
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
          500 vehicles available
        </span>
      </div>

      {filteredVehicles.length > 0 ? (
        <RevealStagger staggerDelay={80} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVehicles.map((vehicle) => (
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

      <div className="flex items-center justify-center gap-2 pt-8">
        {[1, 2, 3, "...", 9].map((p, idx) => (
          <button
            key={idx}
            onClick={() => typeof p === "number" && setActivePage(p)}
            className={`w-9 h-9 rounded-full text-xs font-bold transition-all flex items-center justify-center ${
              activePage === p
                ? "bg-[#F97316] text-white shadow-lg"
                : "bg-[#102941] border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
            }`}
          >
            {p}
          </button>
        ))}
        <button className="px-4 h-9 rounded-full bg-[#102941] border border-slate-800 text-slate-400 text-xs font-bold hover:text-white hover:border-slate-700 transition-all flex items-center gap-1">
          <span>Next</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <Reveal duration={700}>
        <div className="relative bg-[#102941] border border-slate-800 rounded-3xl p-10 sm:p-14 text-center overflow-hidden shadow-2xl mt-16">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight font-sans">
              CAN&apos;T FIND THE EXACT SPEC?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We source to order. Tell us the make, model and destination — we&apos;ll find it and quote it.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setInquiryModalOpen(true)}
                className="bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs px-8 py-3.5 rounded-full shadow-lg transition-all inline-flex items-center gap-2"
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
    <div className="space-y-0 pb-20 bg-[#0B1F33] min-h-screen">
      <section className="relative min-h-[440px] bg-[#081A2B] border-b border-slate-800/80 text-white overflow-hidden flex flex-col justify-center pt-40 pb-16">
        <ParallaxImage
          src={agtpAssets.inventoryHero}
          alt="Inventory Header"
          overlayOpacity="opacity-45"
          speed={0.25}
          className="absolute inset-0 w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#081A2B]/90 via-[#081A2B]/60 to-transparent z-10" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
            <Link href="/" className="hover:text-white transition-colors">HOME</Link>
            <span>/</span>
            <span className="text-[#F97316]">INVENTORY</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white font-sans drop-shadow-lg">
            AVAILABLE VEHICLES
          </h1>

          <p className="text-sm sm:text-base text-slate-200 max-w-xl leading-relaxed drop-shadow-md">
            Search every vehicle in stock, then request a fixed, all-in quote.
          </p>
        </div>
      </section>

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
