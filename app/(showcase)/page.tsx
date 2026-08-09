"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Globe,
  FileText,
  PhoneCall,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VehicleCard } from "@/components/vehicles/vehicle-card";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { VehicleInquiryModal } from "@/components/vehicles/vehicle-inquiry-modal";
import { useContent } from "@/lib/content/context";
import {
  getFeaturedVehicles,
  getCategoriesWithCounts,
  getAllVehicles
} from "@/lib/vehicles/data";
import { formatPrice } from "@/lib/utils";
import { useState } from "react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  shield: ShieldCheck,
  globe: Globe,
  file: FileText
};

const iconBgMap: Record<string, string> = {
  shield: "bg-amber-500/10 text-amber-600",
  globe: "bg-blue-500/10 text-blue-600",
  file: "bg-emerald-500/10 text-emerald-600"
};

export default function HomePage() {
  const { content } = useContent();
  const { featuredSection, categorySection, spotlightSection, whySection, ctaBanner } = content;

  const featuredVehicles = getFeaturedVehicles();
  const categories = getCategoriesWithCounts();
  const allVehicles = getAllVehicles();
  const spotlightVehicle = featuredVehicles[0] || allVehicles[0];

  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);

  return (
    <div className="space-y-0 pb-16">
      {/* ── Hero Carousel ─────────────────────────────────────────────── */}
      <HeroCarousel />

      {/* ── Featured Vehicles ─────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-1 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              {featuredSection.eyebrow}
            </div>
            <h2 className="text-3xl font-black text-slate-900">{featuredSection.heading}</h2>
            {featuredSection.subheading && (
              <p className="text-sm text-slate-500 mt-1">{featuredSection.subheading}</p>
            )}
          </div>
          <Link
            href={featuredSection.ctaHref}
            className="inline-flex items-center gap-1 text-sm font-bold text-slate-900 hover:text-amber-600 transition-colors shrink-0"
          >
            {featuredSection.ctaLabel} ({allVehicles.length} Vehicles)
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredVehicles.slice(0, 6).map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </section>

      {/* ── Vehicle Categories Grid ───────────────────────────────────── */}
      <section className="bg-slate-900 text-white py-16 mt-16 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-amber-400">
              {categorySection.eyebrow}
            </h2>
            <p className="text-3xl font-black text-white">{categorySection.heading}</p>
            <p className="text-sm text-slate-400">{categorySection.subheading}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="group relative rounded-xl overflow-hidden aspect-[4/3] bg-slate-800 border border-slate-700 hover:border-amber-500 transition-all duration-300 flex flex-col justify-end p-5 shadow-lg"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover opacity-50 group-hover:opacity-75 group-hover:scale-105 transition-all duration-500"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="relative z-10 space-y-1">
                  <div className="flex items-center justify-between text-white">
                    <h3 className="text-lg font-black group-hover:text-amber-400 transition-colors">
                      {cat.name}
                    </h3>
                    <span className="text-xs font-bold bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full">
                      {cat.count}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 line-clamp-1">{cat.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Flagship Spotlight ─────────────────────────────────────────── */}
      {spotlightVehicle && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="text-center max-w-xl mx-auto mb-8">
            <div className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-1">
              {spotlightSection.eyebrow}
            </div>
            <h2 className="text-3xl font-black text-slate-900">{spotlightSection.heading}</h2>
            {spotlightSection.subheading && (
              <p className="text-sm text-slate-500 mt-1">{spotlightSection.subheading}</p>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12">
            <div className="relative lg:col-span-6 min-h-[340px] lg:min-h-[480px] bg-slate-950">
              <Image
                src={spotlightVehicle.images[0]}
                alt={spotlightVehicle.model}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute top-4 left-4 z-10">
                <Badge variant="gold" className="text-xs">
                  {spotlightSection.badge}
                </Badge>
              </div>
            </div>

            <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="text-xs font-bold text-amber-600 uppercase tracking-widest">
                  {spotlightVehicle.make} • {spotlightVehicle.year} • {spotlightVehicle.category}
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                  {spotlightVehicle.model}
                </h3>
                <p className="text-sm font-semibold text-slate-500">{spotlightVehicle.variant}</p>
                <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {spotlightVehicle.description}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  {[
                    ["Engine", spotlightVehicle.engine],
                    ["Horsepower", `${spotlightVehicle.horsepower} HP`],
                    ["Transmission", spotlightVehicle.transmission],
                    ["0-100 km/h", spotlightVehicle.acceleration],
                    ["Top Speed", spotlightVehicle.topSpeed],
                    ["Starting MSRP", formatPrice(spotlightVehicle.price, spotlightVehicle.currency)]
                  ].map(([label, val]) => (
                    <div key={label} className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        {label}
                      </span>
                      <span className="text-xs font-black text-slate-900 truncate block">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-100">
                <Link href={`/vehicles/${spotlightVehicle.slug}`} className="w-full sm:w-auto">
                  <Button variant="default" className="w-full font-bold gap-2 bg-slate-900">
                    View Complete Specifications
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto font-semibold text-slate-700"
                  onClick={() => setInquiryModalOpen(true)}
                >
                  Request Official Spec Sheet
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Why Autora Pillars ─────────────────────────────────────────── */}
      <section className="bg-slate-100 py-16 mt-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto space-y-2 mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-amber-600">
              {whySection.eyebrow}
            </h2>
            <p className="text-3xl font-black text-slate-900">{whySection.heading}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whySection.pillars.map((p) => {
              const Icon = iconMap[p.icon] ?? ShieldCheck;
              return (
                <div
                  key={p.id}
                  className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3 shadow-sm"
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold ${iconBgMap[p.icon] ?? "bg-slate-100 text-slate-600"}`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{p.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{p.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white rounded-2xl p-8 md:p-12 border border-slate-800 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <Badge variant="gold" className="text-xs">{ctaBanner.badge}</Badge>
            <h3 className="text-2xl md:text-3xl font-black text-white">
              {ctaBanner.heading}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">{ctaBanner.subheading}</p>
          </div>
          <Button
            variant="primary"
            size="lg"
            className="font-bold gap-2 text-sm shadow-xl shrink-0"
            onClick={() => setInquiryModalOpen(true)}
          >
            <PhoneCall className="w-4 h-4" />
            {ctaBanner.ctaLabel}
          </Button>
        </div>
      </section>

      <VehicleInquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
      />
    </div>
  );
}
