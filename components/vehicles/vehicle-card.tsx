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

      <div className="flex min-h-[242px] flex-col p-5">
        <Link href={`/vehicles/${vehicle.slug}`}>
          <h3 className="h-[57px] overflow-hidden text-[17px] font-black uppercase leading-[1.12] tracking-normal text-white transition-colors group-hover:text-[#FDBA74]">
            {fullTitle}
          </h3>
        </Link>

        <div className="mt-5 h-px bg-[#315671]" />

        <div className="mt-4 grid grid-cols-2 gap-3 text-[14px] font-medium text-slate-300">
            <span className="flex min-w-0 items-center gap-2 truncate">
              <Zap className="h-4 w-4 text-[#FDBA74]" />
              {vehicle.engineSize || "4.4P"}
            </span>
            <span className="flex min-w-0 items-center gap-2 truncate">
              <Clock className="h-4 w-4 text-[#FDBA74]" />
              {vehicle.transmission || "Automatic"}
            </span>
        </div>

        <Link
          href={`/vehicles/${vehicle.slug}`}
          className="mt-auto flex h-10 items-center justify-center rounded-full border border-[#3D6480] text-[14px] font-extrabold text-white transition-colors hover:border-[#F97316] hover:bg-[#F97316]"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}


