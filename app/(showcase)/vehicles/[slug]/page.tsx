import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Car,
  ChevronRight,
  MapPin,
  ShieldCheck,
  Zap,
  PhoneCall,
  FileText,
  Share2,
  Calendar,
  Layers,
  Sparkles
} from "lucide-react";
import {
  getVehicleBySlug,
  getAllVehicles,
  getRelatedVehicles
} from "@/lib/vehicles/data";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VehicleGallery } from "@/components/vehicles/vehicle-gallery";
import { VehicleSpecs } from "@/components/vehicles/vehicle-specs";
import { VehicleFeatures } from "@/components/vehicles/vehicle-features";
import { VehicleCard } from "@/components/vehicles/vehicle-card";
import { VehicleInquirySection } from "./vehicle-inquiry-section";

interface VehiclePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params
}: VehiclePageProps): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);

  if (!vehicle) {
    return {
      title: "Vehicle Not Found | AUTORA Showcase"
    };
  }

  return {
    title: `${vehicle.make} ${vehicle.model} ${vehicle.variant} (${vehicle.year}) Specifications | AUTORA Showcase`,
    description: `Complete technical specifications, engine horsepower (${vehicle.horsepower} HP), ${vehicle.transmission} transmission, and equipment details for the ${vehicle.year} ${vehicle.make} ${vehicle.model}.`
  };
}

export async function generateStaticParams() {
  const vehicles = getAllVehicles();
  return vehicles.map((v) => ({
    slug: v.slug
  }));
}

export default async function VehicleDetailPage({ params }: VehiclePageProps) {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);

  if (!vehicle) {
    notFound();
  }

  const relatedVehicles = getRelatedVehicles(vehicle, 3);

  return (
    <div className="space-y-12 pb-20">
      {/* Breadcrumb Navigation Bar */}
      <div className="bg-slate-900 text-slate-300 py-3 border-b border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-x-auto">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
            <Link href="/vehicles" className="hover:text-white transition-colors">
              Vehicles
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
            <Link
              href={`/categories/${vehicle.category.toLowerCase()}`}
              className="hover:text-white transition-colors"
            >
              {vehicle.category}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
            <span className="text-amber-400 font-semibold truncate">
              {vehicle.make} {vehicle.model}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-slate-400">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              {vehicle.location}
            </span>
          </div>
        </div>
      </div>

      {/* Vehicle Hero Header Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            {/* Title & Badges */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="gold" className="text-xs">
                  {vehicle.make.toUpperCase()}
                </Badge>
                <Badge variant="secondary" className="text-xs bg-slate-100 font-semibold">
                  {vehicle.category}
                </Badge>
                {vehicle.isNew && <Badge variant="new" className="text-xs">NEW {vehicle.year}</Badge>}
                {vehicle.isFeatured && <Badge variant="featured" className="text-xs">FLAGSHIP FEATURED</Badge>}
                <span className="text-xs font-semibold text-slate-500 bg-slate-50 px-2.5 py-0.5 rounded border border-slate-200">
                  {vehicle.condition}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-sans">
                {vehicle.make} {vehicle.model}
              </h1>
              <p className="text-base sm:text-lg font-bold text-amber-600">
                {vehicle.variant}
              </p>
            </div>

            {/* Price / MSRP & Inquiry Header Action */}
            <div className="bg-slate-950 text-white p-6 rounded-2xl border border-slate-800 space-y-3 min-w-[280px] shadow-lg">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                Starting Showroom MSRP
              </span>
              <div className="text-3xl font-black text-white font-sans">
                {formatPrice(vehicle.price, vehicle.currency)}
              </div>
              <div className="text-[11px] text-amber-400 flex items-center gap-1 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Factory Pricing & Spec Sheet
              </div>
            </div>
          </div>

          {/* Main Layout Grid: Gallery on left, Overview & Specs on right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
            {/* Left Column: Image Gallery */}
            <div className="lg:col-span-7">
              <VehicleGallery
                images={vehicle.images}
                vehicleTitle={`${vehicle.make} ${vehicle.model}`}
              />
            </div>

            {/* Right Column: Vehicle Description & Instant Action Card */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
                  Vehicle Overview & Design Philosophy
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {vehicle.description}
                </p>

                {/* Quick Summary Grid */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Body Type
                    </span>
                    <span className="text-xs font-bold text-slate-900">
                      {vehicle.bodyType}
                    </span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Seating Capacity
                    </span>
                    <span className="text-xs font-bold text-slate-900">
                      {vehicle.seatingCapacity} Passengers ({vehicle.doors} Doors)
                    </span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Exterior Color
                    </span>
                    <span className="text-xs font-bold text-slate-900">
                      {vehicle.exteriorColor}
                    </span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Interior Color
                    </span>
                    <span className="text-xs font-bold text-slate-900">
                      {vehicle.interiorColor}
                    </span>
                  </div>
                </div>
              </div>

              {/* Inquiry Action Component */}
              <VehicleInquirySection
                vehicleId={vehicle.id}
                vehicleTitle={`${vehicle.make} ${vehicle.model} ${vehicle.variant}`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Complete Vehicle Technical Specifications Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <VehicleSpecs vehicle={vehicle} />
      </section>

      {/* Vehicle Features & Equipment Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <VehicleFeatures features={vehicle.features} />
      </section>

      {/* Related Vehicles Section ("You May Also Like") */}
      {relatedVehicles.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <div className="flex items-center justify-between mb-6 border-b border-slate-200 pb-3">
            <div>
              <h3 className="text-2xl font-black text-slate-900">
                You May Also Like
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Similar vehicles in {vehicle.category} category or from {vehicle.make}
              </p>
            </div>
            <Link
              href={`/categories/${vehicle.category.toLowerCase()}`}
              className="text-xs font-bold text-amber-600 hover:underline flex items-center gap-1"
            >
              Explore All {vehicle.category} Vehicles
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedVehicles.map((rel) => (
              <VehicleCard key={rel.id} vehicle={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
