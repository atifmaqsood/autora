import { agtpAssets } from "@/src/assets";
import { Settings, Wrench, Disc, Car, Package, LucideIcon } from "lucide-react";

export interface PartsCategory {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  image: any;
  layout?: string;
  products: string[];
}

export const partsCategories: PartsCategory[] = [
  {
    id: "services-maintenance",
    slug: "services-maintenance",
    title: "Services & Maintenance",
    subtitle: "Filters, brakes, fluids, batteries & scheduled maintenance essentials",
    icon: Settings,
    image: agtpAssets.sparePartsHero,
    layout: "min-h-[360px] xl:col-span-5 xl:row-span-2 xl:min-h-[540px]",
    products: [
      "Oil Filters",
      "Air Filters",
      "Fuel Filters",
      "Cabin / AC Filters",
      "Brake Pads",
      "Brake Discs / Rotors",
      "Spark Plugs",
      "Glow Plugs",
      "Engine Oil",
      "Transmission Fluid",
      "Coolant / Antifreeze",
      "Brake Fluid",
      "Batteries",
      "Wiper Blades",
      "Belts & Tensioners"
    ]
  },
  {
    id: "engine-mechanical",
    slug: "engine-mechanical",
    title: "Engine & Mechanical",
    subtitle: "Engines, transmissions & mechanical components",
    icon: Wrench,
    image: agtpAssets.mercedesCclassCard,
    layout: "min-h-[250px] xl:col-span-4 xl:min-h-[260px]",
    products: [
      "Engines",
      "Transmission Assemblies",
      "Cylinder Heads",
      "Turbochargers",
      "Fuel Injectors",
      "Water Pumps",
      "Oil Pumps",
      "Timing Kits",
      "Engine Mounts",
      "Transmission Mounts",
      "Clutch Kits",
      "Flywheels",
      "Gaskets & Seals",
      "Starter Motors",
      "Alternators"
    ]
  },
  {
    id: "tyres-wheels",
    slug: "tyres-wheels",
    title: "Tyres & Wheels",
    subtitle: "Tyres, rims & related wheel components",
    icon: Disc,
    image: agtpAssets.cadillacEscaladeCard,
    layout: "min-h-[250px] xl:col-span-3 xl:min-h-[260px]",
    products: [
      "Passenger Car Tyres",
      "SUV Tyres",
      "4×4 Tyres",
      "Light Truck Tyres",
      "Commercial Vehicle Tyres",
      "All-Terrain Tyres",
      "Mud-Terrain Tyres",
      "Run-Flat Tyres",
      "Alloy Wheels",
      "Steel Wheels",
      "Wheel Rims",
      "Wheel Spacers",
      "Wheel Bolts & Nuts",
      "Wheel Balancers",
      "Tyre Valves"
    ]
  },
  {
    id: "body-exterior",
    slug: "body-exterior",
    title: "Body & Exterior",
    subtitle: "Bumpers, lamps, panels & exterior components",
    icon: Car,
    image: agtpAssets.bmwX2Card,
    layout: "min-h-[250px] xl:col-span-3 xl:min-h-[260px]",
    products: [
      "Front Bumpers",
      "Rear Bumpers",
      "Fenders",
      "Bonnet / Hood",
      "Doors",
      "Grilles",
      "Headlights",
      "Tail Lights",
      "Side Mirrors",
      "Door Handles",
      "Side Steps",
      "Running Boards",
      "Mud Flaps",
      "Radiator Grilles",
      "Exterior Trim & Mouldings"
    ]
  },
  {
    id: "accessories-modifications",
    slug: "accessories-modifications",
    title: "Accessories & Modifications",
    subtitle: "Interior, exterior, off-road & upgrade products",
    icon: Package,
    image: agtpAssets.bydDestroyerCard,
    layout: "min-h-[250px] xl:col-span-4 xl:min-h-[260px]",
    products: [
      "Floor Mats",
      "Seat Covers",
      "Steering Wheel Covers",
      "Roof Racks",
      "Roof Boxes",
      "Bull Bars",
      "Skid Plates",
      "LED Light Bars",
      "Off-Road Lights",
      "Reverse Cameras",
      "Parking Sensors",
      "Dash Cameras",
      "Android Head Units",
      "Window Visors",
      "Exterior Styling Kits"
    ]
  }
];

export function getAllPartsCategories(): PartsCategory[] {
  return partsCategories;
}

export function getPartsCategoryBySlug(slug: string): PartsCategory | undefined {
  const normalized = slug.toLowerCase().trim();
  if (normalized === "service-maintenance") {
    return partsCategories.find((c) => c.slug === "services-maintenance");
  }
  return partsCategories.find(
    (c) => c.slug === normalized || c.id === normalized
  );
}
