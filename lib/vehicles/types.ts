export type FuelType = "Petrol" | "Diesel" | "Electric" | "Hybrid" | "Plug-in Hybrid";
export type TransmissionType = "Automatic" | "Manual" | "Dual-Clutch" | "CVT";
export type DriveType = "AWD" | "4WD" | "RWD" | "FWD";
export type VehicleCondition = "New" | "Used" | "Certified Pre-Owned";
export type VehicleCategory =
  | "SUV"
  | "Sedan"
  | "Coupe"
  | "Pickup"
  | "Truck"
  | "Van"
  | "Luxury"
  | "Electric"
  | "Hybrid"
  | "Off-road"
  | "Sports";

export interface SpecificationGroup {
  groupName: string;
  items: Record<string, string>;
}

export interface Vehicle {
  id: string;
  slug: string;
  make: string;
  model: string;
  variant: string;
  year: number;
  category: VehicleCategory;
  bodyType: string;
  condition: VehicleCondition;
  price: number;
  currency: string;
  mileage: number;
  fuelType: FuelType;
  transmission: TransmissionType;
  driveType: DriveType;
  engine: string;
  engineSize: string;
  horsepower: number;
  torque: string;
  topSpeed: string;
  acceleration: string;
  seatingCapacity: number;
  doors: number;
  exteriorColor: string;
  interiorColor: string;
  description: string;
  images: string[];
  features: string[];
  specifications: SpecificationGroup[];
  location: string;
  isFeatured: boolean;
  isNew: boolean;
  status: "Available" | "Reserved" | "Upcoming";
}

export interface VehicleFilterState {
  search: string;
  category: string;
  make: string;
  year: string;
  fuelType: string;
  transmission: string;
  bodyType: string;
  driveType: string;
  sortBy: "newest" | "oldest" | "name-asc" | "name-desc" | "hp-desc" | "price-asc" | "price-desc";
}

export interface CategoryInfo {
  id: string;
  name: VehicleCategory;
  slug: string;
  description: string;
  image: string;
  count?: number;
}

export interface VehicleInquiry {
  id: string;
  vehicleId: string;
  vehicleName: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
  status: "Pending" | "Contacted" | "Closed";
}


