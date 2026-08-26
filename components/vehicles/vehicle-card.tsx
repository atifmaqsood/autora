"use client";

import Image from "next/image";
import Link from "next/link";
import { Fuel, Gauge } from "lucide-react";
import { Vehicle } from "@/lib/vehicles/types";
import { agtpAssets } from "@/src/assets";

interface VehicleCardProps {
  vehicle: Vehicle;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const fullTitle = `(LHD) ${vehicle.make.toUpperCase()} ${vehicle.model.toUpperCase()} ${
    vehicle.variant ? vehicle.variant.toUpperCase() : ""
  } MY${vehicle.year} - ${(vehicle.exteriorColor || "BLACK").toUpperCase()}`;

  const formattedMileage = vehicle.mileage === 0 || !vehicle.mileage ? "0 Miles" : `${vehicle.mileage.toLocaleString()} Miles`;

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

      <div className="flex min-h-[250px] flex-col p-5">
        <Link href={`/vehicles/${vehicle.slug}`}>
          <h3 className="h-[57px] overflow-hidden text-[17px] font-black uppercase leading-[1.12] tracking-normal text-white transition-colors group-hover:text-[#FDBA74]">
            {fullTitle}
          </h3>
        </Link>

        <div className="mt-5 h-px bg-[#315671]" />

        <div className="my-4 grid grid-cols-3 gap-1 text-center text-[13px] font-medium text-slate-300">
          <div className="flex flex-col items-center justify-center min-w-0">
            <Gauge className="h-4 w-4 text-slate-300 mb-1.5 shrink-0" />
            <span className="truncate w-full">{formattedMileage}</span>
          </div>
          <div className="flex flex-col items-center justify-center min-w-0 border-x border-[#315671]/60 px-1">
            <Fuel className="h-4 w-4 text-slate-300 mb-1.5 shrink-0" />
            <span className="truncate w-full">{vehicle.fuelType || "Hybrid"}</span>
          </div>
          <div className="flex flex-col items-center justify-center min-w-0">
            <TransmissionIcon className="h-4 w-4 text-slate-300 mb-1.5 shrink-0" />
            <span className="truncate w-full">{vehicle.transmission || "Automatic"}</span>
          </div>
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

function TransmissionIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 4v16M12 4v16M18 4v16M6 12h12" />
      <circle cx="6" cy="4" r="1.2" fill="currentColor" />
      <circle cx="12" cy="4" r="1.2" fill="currentColor" />
      <circle cx="18" cy="4" r="1.2" fill="currentColor" />
      <circle cx="6" cy="20" r="1.2" fill="currentColor" />
      <circle cx="12" cy="20" r="1.2" fill="currentColor" />
      <circle cx="18" cy="20" r="1.2" fill="currentColor" />
    </svg>
  );
}


