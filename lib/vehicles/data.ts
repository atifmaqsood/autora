import vehiclesData from "@/data/vehicles.json";
import {
  Vehicle,
  VehicleCategory,
  CategoryInfo,
  VehicleFilterState,
  VehicleInquiry
} from "./types";

export const CATEGORIES_LIST: CategoryInfo[] = [
  {
    id: "cat-suv",
    name: "SUV",
    slug: "suv",
    description: "Versatile, commanding luxury and off-road capability",
    image: "https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "cat-luxury",
    name: "Luxury",
    slug: "luxury",
    description: "Elite automotive refinement, prestige, and executive comfort",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "cat-sports",
    name: "Sports",
    slug: "sports",
    description: "High-revving performance, aerodynamics, and track engineering",
    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "cat-electric",
    name: "Electric",
    slug: "electric",
    description: "Zero-emission instant torque and cutting-edge EV technology",
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "cat-pickup",
    name: "Pickup",
    slug: "pickup",
    description: "Heavy-duty utility, towing strength, and desert off-road endurance",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "cat-sedan",
    name: "Sedan",
    slug: "sedan",
    description: "Sleek executive sedans with twin-turbo performance and quiet cabins",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "cat-coupe",
    name: "Coupe",
    slug: "coupe",
    description: "Dynamic two-door grand tourers and track-ready coupes",
    image: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "cat-offroad",
    name: "Off-road",
    slug: "off-road",
    description: "Purpose-built 4WD expedition vehicles designed for extreme terrain",
    image: "https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?auto=format&fit=crop&w=600&q=80"
  }
];

export function getAllVehicles(): Vehicle[] {
  return vehiclesData as Vehicle[];
}

export function getFeaturedVehicles(): Vehicle[] {
  return getAllVehicles().filter((v) => v.isFeatured);
}

export function getNewVehicles(): Vehicle[] {
  return getAllVehicles().filter((v) => v.isNew);
}

export function getVehicleBySlug(slug: string): Vehicle | null {
  const vehicle = getAllVehicles().find(
    (v) => v.slug.toLowerCase() === slug.toLowerCase()
  );
  return vehicle || null;
}

export function getVehicleById(id: string): Vehicle | null {
  const vehicle = getAllVehicles().find((v) => v.id === id);
  return vehicle || null;
}

export function getRelatedVehicles(currentVehicle: Vehicle, limit: number = 4): Vehicle[] {
  return getAllVehicles()
    .filter(
      (v) =>
        v.id !== currentVehicle.id &&
        (v.category === currentVehicle.category || v.make === currentVehicle.make)
    )
    .slice(0, limit);
}

export function getCategoriesWithCounts(): CategoryInfo[] {
  const vehicles = getAllVehicles();
  return CATEGORIES_LIST.map((cat) => {
    const count = vehicles.filter(
      (v) => v.category.toLowerCase() === cat.name.toLowerCase()
    ).length;
    return { ...cat, count };
  });
}

export function getMakesList(): string[] {
  const vehicles = getAllVehicles();
  const makes = Array.from(new Set(vehicles.map((v) => v.make))).sort();
  return makes;
}

export function filterVehicles(vehicles: Vehicle[], filters: Partial<VehicleFilterState>): Vehicle[] {
  let result = [...vehicles];

  if (filters.search && filters.search.trim()) {
    const q = filters.search.toLowerCase().trim();
    result = result.filter(
      (v) =>
        v.make.toLowerCase().includes(q) ||
        v.model.toLowerCase().includes(q) ||
        v.variant.toLowerCase().includes(q) ||
        v.category.toLowerCase().includes(q) ||
        v.engine.toLowerCase().includes(q) ||
        v.description.toLowerCase().includes(q)
    );
  }

  if (filters.category && filters.category !== "all") {
    result = result.filter(
      (v) => v.category.toLowerCase() === filters.category?.toLowerCase()
    );
  }

  if (filters.make && filters.make !== "all") {
    result = result.filter((v) => v.make.toLowerCase() === filters.make?.toLowerCase());
  }

  if (filters.fuelType && filters.fuelType !== "all") {
    result = result.filter(
      (v) => v.fuelType.toLowerCase() === filters.fuelType?.toLowerCase()
    );
  }

  if (filters.transmission && filters.transmission !== "all") {
    result = result.filter(
      (v) => v.transmission.toLowerCase() === filters.transmission?.toLowerCase()
    );
  }

  if (filters.driveType && filters.driveType !== "all") {
    result = result.filter(
      (v) => v.driveType.toLowerCase() === filters.driveType?.toLowerCase()
    );
  }

  if (filters.year && filters.year !== "all") {
    result = result.filter((v) => v.year.toString() === filters.year);
  }

  if (filters.sortBy) {
    switch (filters.sortBy) {
      case "newest":
        result.sort((a, b) => b.year - a.year);
        break;
      case "oldest":
        result.sort((a, b) => a.year - b.year);
        break;
      case "name-asc":
        result.sort((a, b) => `${a.make} ${a.model}`.localeCompare(`${b.make} ${b.model}`));
        break;
      case "name-desc":
        result.sort((a, b) => `${b.make} ${b.model}`.localeCompare(`${a.make} ${a.model}`));
        break;
      case "hp-desc":
        result.sort((a, b) => b.horsepower - a.horsepower);
        break;
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
  }

  return result;
}

// Dummy inquiries for admin showcase
export const DUMMY_INQUIRIES: VehicleInquiry[] = [
  {
    id: "inq-101",
    vehicleId: "v-001",
    vehicleName: "Toyota Land Cruiser 300 VXR 2025",
    name: "Alexander Vance",
    email: "alexander.vance@example.com",
    phone: "+971 50 123 4567",
    message: "Requesting full specification sheet and export shipping details to Munich.",
    createdAt: "2026-08-07T14:20:00Z",
    status: "Pending"
  },
  {
    id: "inq-102",
    vehicleId: "v-003",
    vehicleName: "Porsche 911 GT3 RS Weissach 2024",
    name: "Elena Rostova",
    email: "elena.rostova@example.com",
    phone: "+44 7700 900077",
    message: "Inquiring about showroom viewing availability for the GT3 RS in Munich.",
    createdAt: "2026-08-06T09:45:00Z",
    status: "Contacted"
  },
  {
    id: "inq-103",
    vehicleId: "v-002",
    vehicleName: "Lexus LX 600 Ultra Luxury 2025",
    name: "Tariq Al-Mansoor",
    email: "tariq.mansoor@example.com",
    phone: "+971 55 987 6543",
    message: "Please send quotation for VIP armoring options and Tokyo delivery timeline.",
    createdAt: "2026-08-05T16:10:00Z",
    status: "Closed"
  }
];
