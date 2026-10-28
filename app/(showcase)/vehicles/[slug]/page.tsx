import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { PartsGallery } from "@/components/parts/parts-gallery";
import { PartsQuoteForm } from "@/components/parts/parts-quote-form";
import { VehicleDetailInfo } from "@/components/vehicles/vehicle-detail-info";
import { RelatedVehicles } from "@/components/vehicles/related-vehicles";
import { BrochureViewer } from "@/components/parts/brochure-viewer";
import {
  Reveal,
  RevealButton,
  RevealEyebrow,
  RevealHeading,
} from "@/components/ui/scroll-reveal";
import type { Vehicle } from "@/lib/vehicles/types";

interface VehiclePageProps {
  params: Promise<{ slug: string }>;
}

const apiUrl = process.env.API_URL ?? "http://localhost:3101/api";

/** All active admin vehicles, for the related vehicles section. */
async function managedVehicles(): Promise<Vehicle[]> {
  try {
    const response = await fetch(`${apiUrl}/vehicle-products`, {
      cache: "no-store",
    });
    return response.ok ? ((await response.json()) as Vehicle[]) : [];
  } catch {
    return [];
  }
}

async function managedVehicle(slug: string): Promise<Vehicle | null> {
  try {
    const response = await fetch(
      `${apiUrl}/vehicle-products/${encodeURIComponent(slug)}`,
      { cache: "no-store" },
    );
    return response.ok ? ((await response.json()) as Vehicle | null) : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: VehiclePageProps): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = await managedVehicle(slug);
  if (!vehicle) return { title: "Vehicle Not Found | AGTP GROUP" };
  const title =
    vehicle.displayTitle ??
    `${vehicle.make} ${vehicle.model} ${vehicle.variant} ${vehicle.year}`;
  return { title: `${title} | AGTP GROUP`, description: vehicle.description };
}

export default async function VehicleDetailPage({ params }: VehiclePageProps) {
  const { slug } = await params;
  // Only admin-managed vehicles have a page.
  const [vehicle, vehicles] = await Promise.all([
    managedVehicle(slug),
    managedVehicles(),
  ]);
  if (!vehicle) notFound();

  const title =
    vehicle.displayTitle ??
    `${vehicle.make} ${vehicle.model} ${vehicle.variant} ${vehicle.year}`;

  return (
    <div className="min-h-screen bg-[#060709] pb-24 pt-[144px] text-white lg:pt-[158px]">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex flex-wrap items-center gap-2 text-xs text-slate-400"
        >
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/vehicles" className="hover:text-white">
            Vehicles
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span aria-current="page" className="text-white">
            {vehicle.make} {vehicle.model}
          </span>
        </nav>

        <Reveal key={`gallery-${vehicle.slug}`}>
          <PartsGallery
            images={vehicle.images}
            title={title}
            contain={Boolean(vehicle.imageNote)}
          />
        </Reveal>
        {vehicle.imageNote && (
          <p className="mt-2 text-xs text-slate-400">{vehicle.imageNote}</p>
        )}

        <div className="mt-10 sm:mt-12">
          <RevealEyebrow>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--agtp-secondary)]">
              {vehicle.category}
            </p>
          </RevealEyebrow>
          <RevealHeading>
            <h1 className="mt-3 max-w-5xl text-3xl font-black uppercase leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl">
              {title}
            </h1>
          </RevealHeading>
          <RevealButton>
            <div className="mt-7 flex flex-wrap items-center gap-5">
              <span className="text-xl font-bold">
                {vehicle.price > 0
                  ? formatPrice(vehicle.price, vehicle.currency)
                  : "On Request"}
              </span>
              <a
                href="#request-quote"
                className="inline-flex items-center gap-3 rounded-full bg-[var(--agtp-secondary)] px-6 py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
              >
                Request a Quote <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </RevealButton>
        </div>

        <Reveal key={`details-${vehicle.slug}`}>
          <VehicleDetailInfo vehicle={vehicle} />
        </Reveal>

        {/* Only when the admin uploaded a brochure for this vehicle. */}
        {vehicle.brochureUrl && (
          <Reveal className="pt-8">
            <BrochureViewer url={vehicle.brochureUrl} title={title} />
          </Reveal>
        )}

        <Reveal className="pt-8">
          <PartsQuoteForm
            key={`quote-${vehicle.slug}`}
            category={title}
            slug={vehicle.slug}
            vehicle={{
              id: vehicle.id,
              make: vehicle.make,
              model: vehicle.model,
            }}
          />
        </Reveal>

        <RelatedVehicles vehicle={vehicle} vehicles={vehicles} />
      </main>
    </div>
  );
}
