import { VehicleCard } from "@/components/vehicles/vehicle-card";
import {
  RevealEyebrow,
  RevealHeading,
  RevealStagger,
} from "@/components/ui/scroll-reveal";
import type { Vehicle } from "@/lib/vehicles/types";

const MAX_RELATED = 3;

/**
 * Other admin vehicles most like this one: same make first, then the same
 * category or body type, then the rest, keeping the admin's order in each.
 */
export function relatedVehicles(vehicle: Vehicle, all: Vehicle[]): Vehicle[] {
  const same = (a: string | undefined, b: string | undefined) =>
    Boolean(a) && a?.trim().toLowerCase() === b?.trim().toLowerCase();
  const score = (other: Vehicle) =>
    same(other.make, vehicle.make)
      ? 0
      : same(other.category, vehicle.category) ||
          same(other.bodyType, vehicle.bodyType)
        ? 1
        : 2;
  return all
    .filter((other) => other.slug !== vehicle.slug)
    .map((other, index) => ({ other, index, rank: score(other) }))
    .sort((a, b) => a.rank - b.rank || a.index - b.index)
    .slice(0, MAX_RELATED)
    .map(({ other }) => other);
}

export function RelatedVehicles({
  vehicle,
  vehicles,
}: {
  vehicle: Vehicle;
  vehicles: Vehicle[];
}) {
  const related = relatedVehicles(vehicle, vehicles);
  if (related.length === 0) return null;

  return (
    <section aria-labelledby="related-vehicles-heading" className="pt-16 sm:pt-20">
      <RevealEyebrow>
        <div className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.28em] text-[#FDBA74]">
          <span
            style={{ backgroundColor: "var(--agtp-secondary)" }}
            className="h-px w-8"
          />
          More like this
        </div>
      </RevealEyebrow>
      <RevealHeading>
        <h2
          id="related-vehicles-heading"
          className="mt-4 max-w-4xl font-[family-name:var(--font-sora)] text-[32px] font-extrabold leading-[1.1] tracking-tight text-white md:text-[45px] lg:text-[57px]"
        >
          Related {vehicle.make.toUpperCase()} Vehicles
        </h2>
      </RevealHeading>
      <RevealStagger
        staggerDelay={70}
        className="mt-10 grid grid-cols-1 gap-6 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3"
      >
        {related.map((item) => (
          <VehicleCard key={item.id} vehicle={item} />
        ))}
      </RevealStagger>
    </section>
  );
}
