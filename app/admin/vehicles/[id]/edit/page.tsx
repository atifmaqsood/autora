import { notFound } from "next/navigation";
import { VehicleForm } from "@/components/admin/vehicle-form";
import { getVehicleById } from "@/lib/vehicles/data";

interface EditPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditVehiclePage({ params }: EditPageProps) {
  const { id } = await params;
  const vehicle = getVehicleById(id);

  if (!vehicle) {
    notFound();
  }

  return <VehicleForm initialData={vehicle} isEdit={true} />;
}
