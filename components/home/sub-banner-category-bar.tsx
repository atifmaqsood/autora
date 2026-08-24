"use client";

import Link from "next/link";
import { Car, ChevronRight, Cog, Disc, Package, Truck, Wrench } from "lucide-react";

const subBannerCategories = [
  { name: "Sedans & SUVs", href: "/vehicles?category=sedan-suv", icon: Car },
  { name: "Pickups & trucks", href: "/vehicles?category=pickup-truck", icon: Truck },
  { name: "Vans & buses", href: "/vehicles?category=van-bus", icon: Truck },
  { name: "Fire Apparatus & Ambulance", href: "/vehicles?category=emergency", icon: Package },
  { name: "Parts & accessories", href: "/spare-parts", icon: Wrench },
  { name: "Engines & Gears", href: "/spare-parts?category=engine-gear", icon: Cog },
  { name: "Modifications", href: "/contact-us?inquiry=modifications", icon: Disc }
];

export function SubBannerCategoryBar() {
  return (
    <section className="relative z-30 border-y border-[#315671] bg-[#102941] shadow-2xl">
      <div className="mx-auto max-w-[1735px] px-4 sm:px-6 lg:px-8">
        <div className="no-scrollbar flex items-center overflow-x-auto py-3.5 md:justify-between md:py-4">
          {subBannerCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div key={cat.name} className="flex shrink-0 items-center">
                <Link
                  href={cat.href}
                  className="group flex items-center gap-2.5 rounded-full border border-transparent px-4 py-2 text-[13px] font-extrabold text-slate-200 transition-all duration-300 hover:border-[#F97316]/60 hover:bg-[#14314B] hover:text-[#FDBA74] md:text-[14px]"
                >
                  <Icon className="h-4 w-4 text-[#F97316] transition-transform duration-300 group-hover:scale-110" />
                  <span className="whitespace-nowrap">{cat.name}</span>
                </Link>
                {idx < subBannerCategories.length - 1 && (
                  <span className="mx-2 hidden h-4 w-px bg-[#315671]/70 md:block" aria-hidden="true" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
