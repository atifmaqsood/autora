"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Zap } from "lucide-react";
import { Vehicle } from "@/lib/vehicles/types";
import { agtpAssets } from "@/src/assets";

interface VehicleCardProps {
  vehicle: Vehicle;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const fullTitle = `(LHD) ${vehicle.make.toUpperCase()} ${vehicle.model.toUpperCase()} ${
    vehicle.variant ? vehicle.variant.toUpperCase() : ""
  } MY${vehicle.year} - ${(vehicle.exteriorColor || "BLACK").toUpperCase()}`;

  return (
    <article className="group overflow-hidden rounded-[22px] border border-[#24445F] bg-[#14314B] shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#3D6480]">
      <Link href={`/vehicles/${vehicle.slug}`} className="block">
        <div className="relative aspect-[1024/575] overflow-hidden bg-white">
          <Image
            src={vehicle.images[0] || agtpAssets.bmw760Card}
            alt={`${vehicle.make} ${vehicle.model}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <span className="absolute right-4 top-5 rounded-full bg-[#242733]/95 px-5 py-2.5 text-[12px] font-black uppercase tracking-wider text-white shadow-xl">
            {vehicle.category === "Luxury" ? "Sedan" : vehicle.category}
          </span>
        </div>
      </Link>

      <div className="space-y-5 p-6">
        <Link href={`/vehicles/${vehicle.slug}`}>
          <h3 className="line-clamp-2 min-h-[52px] text-[19px] font-black uppercase leading-[1.08] tracking-normal text-white transition-colors group-hover:text-[#FDBA74]">
            {fullTitle}
          </h3>
        </Link>

        <div className="h-px bg-[#315671]" />

        <div className="flex items-center justify-between gap-5">
          <div className="flex min-w-0 items-center gap-5 text-[15px] font-medium text-slate-400">
            <span className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-[#FDBA74]" />
              {vehicle.engineSize || "4.4P"}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#FDBA74]" />
              {vehicle.transmission || "Automatic"}
            </span>
          </div>

          <Link
            href={`/vehicles/${vehicle.slug}`}
            className="rounded-full border border-[#3D6480] px-6 py-2.5 text-[16px] font-extrabold text-white transition-colors hover:border-[#F97316] hover:bg-[#F97316]"
          >
            View
          </Link>
        </div>
      </div>
    </article>
  );
}


