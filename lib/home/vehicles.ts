import { getAllVehicles } from "@/lib/vehicles/data";
import type { Vehicle } from "@/lib/vehicles/types";

/** The homepage "Automotive Vehicles" grid shows at most this many cards. */
export const MAX_HOME_VEHICLES = 6;

/**
 * Every vehicle on the site, as on the /vehicles page: admin-managed
 * vehicles first, then built-in ones whose slug isn't overridden.
 */
export function mergeVehicles(managed: Vehicle[]): Vehicle[] {
  const managedSlugs = new Set(managed.map((vehicle) => vehicle.slug));
  return [...managed, ...getAllVehicles().filter((vehicle) => !managedSlugs.has(vehicle.slug))];
}

/**
 * Vehicles for the homepage: the admin's picks in their order, or the first
 * built-in vehicles when nothing has been picked yet.
 */
export function homepageVehicles(all: Vehicle[], slugs: string[]): Vehicle[] {
  if (slugs.length === 0) return getAllVehicles().slice(0, MAX_HOME_VEHICLES);
  const bySlug = new Map(all.map((vehicle) => [vehicle.slug, vehicle]));
  return slugs
    .map((slug) => bySlug.get(slug))
    .filter((vehicle): vehicle is Vehicle => Boolean(vehicle))
    .slice(0, MAX_HOME_VEHICLES);
}
