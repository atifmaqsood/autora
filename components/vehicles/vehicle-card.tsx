"use client";

import Image from "next/image";
import Link from "next/link";
import { Zap, Fuel, Gauge, Sliders, ChevronRight, ShieldCheck, MapPin } from "lucide-react";
import { Vehicle } from "@/lib/vehicles/types";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface VehicleCardProps {
  vehicle: Vehicle;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  return (
    <div className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative aspect-[16/10] w-full bg-slate-900 overflow-hidden">
        <Image
          src={vehicle.images[0] || "https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&w=800&q=80"}
          alt={`${vehicle.make} ${vehicle.model}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {vehicle.isFeatured && (
            <Badge variant="featured" className="text-[10px]">
              FEATURED
            </Badge>
          )}
          {vehicle.isNew && (
            <Badge variant="new" className="text-[10px]">
              NEW {vehicle.year}
            </Badge>
          )}
          <Badge variant="secondary" className="text-[10px] bg-slate-900/80 text-slate-200 border-slate-700 backdrop-blur-md">
            {vehicle.category}
          </Badge>
        </div>

        {/* Bottom Image Overlay Specs */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white z-10 font-medium">
          <span className="flex items-center gap-1 text-slate-200 bg-slate-950/70 px-2 py-0.5 rounded backdrop-blur-sm">
            <MapPin className="w-3 h-3 text-amber-400" />
            {vehicle.location.split("-")[0]}
          </span>
          <span className="bg-amber-500/90 text-slate-950 font-bold px-2 py-0.5 rounded backdrop-blur-sm">
            {vehicle.condition}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">
            <span>{vehicle.make}</span>
            <span>{vehicle.year}</span>
          </div>

          <Link href={`/vehicles/${vehicle.slug}`}>
            <h3 className="text-lg font-extrabold text-slate-900 line-clamp-1 group-hover:text-amber-600 transition-colors">
              {vehicle.model}
            </h3>
            <p className="text-xs text-slate-500 font-medium line-clamp-1 mt-0.5">
              {vehicle.variant}
            </p>
          </Link>

          {/* Key Specifications Grid */}
          <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-100 text-xs">
            <div className="flex items-center gap-1.5 text-slate-700 bg-slate-50 p-2 rounded-lg">
              <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span className="truncate font-semibold">{vehicle.horsepower} HP</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-700 bg-slate-50 p-2 rounded-lg">
              <Fuel className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              <span className="truncate font-semibold">{vehicle.fuelType}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-700 bg-slate-50 p-2 rounded-lg">
              <Sliders className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span className="truncate font-semibold">{vehicle.transmission}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-700 bg-slate-50 p-2 rounded-lg">
              <Gauge className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span className="truncate font-semibold">{vehicle.driveType}</span>
            </div>
          </div>
        </div>

        {/* Footer & CTA */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
              Starting MSRP / Price
            </span>
            <span className="text-lg font-black text-slate-950 font-sans">
              {formatPrice(vehicle.price, vehicle.currency)}
            </span>
          </div>

          <Link href={`/vehicles/${vehicle.slug}`}>
            <Button size="sm" variant="default" className="gap-1 bg-slate-900 group-hover:bg-amber-600 transition-colors font-semibold">
              View Specs
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
