import {
  ArrowLeftRight,
  CalendarDays,
  Car,
  Contrast,
  CircleDot,
  Crosshair,
  Fuel,
  Info,
  Armchair,
  Cog,
  Tag,
  type LucideIcon,
} from "lucide-react";
import type { Vehicle } from "@/lib/vehicles/types";

export interface VehicleFeatureField {
  key: keyof Vehicle;
  label: string;
  icon: LucideIcon;
}

/**
 * The only details a vehicle shows in its Features tab, in display order.
 * The admin form has one input per field.
 */
export const vehicleFeatureFields: VehicleFeatureField[] = [
  { key: "make", label: "Make", icon: Car },
  { key: "model", label: "Model", icon: Car },
  { key: "bodyType", label: "Body", icon: Tag },
  { key: "year", label: "Year", icon: CalendarDays },
  { key: "transmission", label: "Transmission", icon: Cog },
  { key: "engine", label: "Engine", icon: CircleDot },
  { key: "exteriorColor", label: "Exterior Color", icon: Contrast },
  { key: "interiorColor", label: "Interior Color", icon: Contrast },
  { key: "fuelType", label: "Fuel Type", icon: Fuel },
  { key: "steering", label: "LHD/RHD", icon: ArrowLeftRight },
  { key: "driveType", label: "Drivetrain", icon: Crosshair },
  { key: "seatingCapacity", label: "Seats", icon: Armchair },
  { key: "status", label: "Availability", icon: Info },
  { key: "condition", label: "Condition", icon: Info },
  { key: "variantCode", label: "Variant Code", icon: Tag },
];

/** The vehicle's filled-in feature fields (empty text and 0 are skipped). */
export function vehicleFeatures(vehicle: Vehicle) {
  return vehicleFeatureFields.flatMap((field) => {
    const raw = vehicle[field.key];
    const value =
      typeof raw === "number" ? (raw > 0 ? String(raw) : "") : String(raw ?? "").trim();
    return value ? [{ ...field, value }] : [];
  });
}
