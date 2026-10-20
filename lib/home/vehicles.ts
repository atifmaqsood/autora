import type { Vehicle } from "@/lib/vehicles/types";

/** The homepage "Automotive Vehicles" grid shows at most this many cards. */
export const MAX_HOME_VEHICLES = 6;

/**
 * Vehicles for the homepage, all admin-managed: the admin's picks in their
 * order, or the first vehicles when nothing has been picked yet.
 */
export function homepageVehicles(all: Vehicle[], slugs: string[]): Vehicle[] {
  if (slugs.length === 0) return all.slice(0, MAX_HOME_VEHICLES);
  const bySlug = new Map(all.map((vehicle) => [vehicle.slug, vehicle]));
  return slugs
    .map((slug) => bySlug.get(slug))
    .filter((vehicle): vehicle is Vehicle => Boolean(vehicle))
    .slice(0, MAX_HOME_VEHICLES);
}
