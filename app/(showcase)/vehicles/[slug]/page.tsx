import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { getAllVehicles, getVehicleBySlug } from "@/lib/vehicles/data";
import { formatPrice } from "@/lib/utils";
import { PartsGallery } from "@/components/parts/parts-gallery";
import { PartsQuoteForm } from "@/components/parts/parts-quote-form";
import { VehicleDetailInfo } from "@/components/vehicles/vehicle-detail-info";
import { Reveal } from "@/components/ui/scroll-reveal";

interface VehiclePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: VehiclePageProps): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);
  if (!vehicle) return { title: "Vehicle Not Found | AGTP GROUP" };
  const title = vehicle.displayTitle ?? `${vehicle.make} ${vehicle.model} ${vehicle.variant} ${vehicle.year}`;
  return { title: `${title} | AGTP GROUP`, description: vehicle.description };
}

export function generateStaticParams() {
  return getAllVehicles().map((vehicle) => ({ slug: vehicle.slug }));
}

export default async function VehicleDetailPage({ params }: VehiclePageProps) {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);
  if (!vehicle) notFound();

  const title = vehicle.displayTitle ?? `${vehicle.make} ${vehicle.model} ${vehicle.variant} ${vehicle.year}`;

  return (
    <div className="min-h-screen bg-[#060709] pb-24 pt-[144px] text-white lg:pt-[158px]">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-xs text-slate-400">
          <Link href="/" className="hover:text-white">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/vehicles" className="hover:text-white">Vehicles</Link>
          <ChevronRight className="h-3 w-3" />
          <span aria-current="page" className="text-white">{vehicle.make} {vehicle.model}</span>
        </nav>

        <Reveal key={`gallery-${vehicle.slug}`} distance={40} duration={800}>
          <PartsGallery images={vehicle.images} title={title} contain={Boolean(vehicle.imageNote)} />
        </Reveal>
        {vehicle.imageNote && <p className="mt-2 text-xs text-slate-400">{vehicle.imageNote}</p>}

        <Reveal distance={24} duration={750} className="mt-10 sm:mt-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--agtp-secondary)]">{vehicle.category}</p>
          <h1 className="mt-3 max-w-5xl text-3xl font-black uppercase leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl">{title}</h1>
          <div className="mt-7 flex flex-wrap items-center gap-5">
            <span className="text-xl font-bold">{vehicle.price > 0 ? formatPrice(vehicle.price, vehicle.currency) : "On Request"}</span>
            <a href="#request-quote" className="inline-flex items-center gap-3 rounded-full bg-[var(--agtp-secondary)] px-6 py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90">
              Request a Quote <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>

        <Reveal key={`details-${vehicle.slug}`} distance={32} duration={800}>
          <VehicleDetailInfo vehicle={vehicle} />
        </Reveal>

        <Reveal distance={24} duration={800} className="pt-8">
          <PartsQuoteForm key={`quote-${vehicle.slug}`} category={title} slug={vehicle.slug} vehicle={{ id: vehicle.id, make: vehicle.make, model: vehicle.model }} />
        </Reveal>
      </main>
    </div>
  );
}
