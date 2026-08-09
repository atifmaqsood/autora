"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Layers, Plus, ExternalLink, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCategoriesWithCounts } from "@/lib/vehicles/data";

export default function AdminCategoriesPage() {
  const categories = useMemo(() => getCategoriesWithCounts(), []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Vehicle Category Management
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Manage showcase vehicle classifications, body styles, and metadata.
          </p>
        </div>

        <Button variant="outline" size="sm" className="gap-2 font-semibold text-xs">
          <Plus className="w-4 h-4" />
          Create Category
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between"
          >
            <div className="relative aspect-[16/9] w-full bg-slate-900">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover opacity-70"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="absolute top-3 right-3 bg-amber-500 text-slate-950 font-black text-xs px-2.5 py-0.5 rounded-full shadow">
                {cat.count} Vehicles
              </div>
            </div>

            <div className="p-5 space-y-2">
              <h3 className="text-lg font-bold text-slate-900">{cat.name}</h3>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                {cat.description}
              </p>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-400 uppercase">
                /categories/{cat.slug}
              </span>
              <Link href={`/categories/${cat.slug}`} target="_blank">
                <Button variant="ghost" size="sm" className="h-7 text-xs gap-1 text-slate-700">
                  <ExternalLink className="w-3.5 h-3.5" />
                  View
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
