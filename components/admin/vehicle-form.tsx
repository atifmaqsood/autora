"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Plus, Trash2, CheckCircle2, Car, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Vehicle } from "@/lib/vehicles/types";
import { slugify } from "@/lib/utils";

interface VehicleFormProps {
  initialData?: Vehicle;
  isEdit?: boolean;
}

export function VehicleForm({ initialData, isEdit = false }: VehicleFormProps) {
  const router = useRouter();
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState<Partial<Vehicle>>({
    id: initialData?.id || `v-${Date.now()}`,
    slug: initialData?.slug || "",
    make: initialData?.make || "Toyota",
    model: initialData?.model || "",
    variant: initialData?.variant || "",
    year: initialData?.year || 2025,
    category: initialData?.category || "SUV",
    bodyType: initialData?.bodyType || "SUV",
    condition: initialData?.condition || "New",
    price: initialData?.price || 95000,
    currency: initialData?.currency || "$",
    mileage: initialData?.mileage || 0,
    fuelType: initialData?.fuelType || "Petrol",
    transmission: initialData?.transmission || "Automatic",
    driveType: initialData?.driveType || "4WD",
    engine: initialData?.engine || "3.5L V6 Twin-Turbo",
    engineSize: initialData?.engineSize || "3.5L",
    horsepower: initialData?.horsepower || 400,
    torque: initialData?.torque || "600 Nm",
    topSpeed: initialData?.topSpeed || "210 km/h",
    acceleration: initialData?.acceleration || "6.5s (0-100 km/h)",
    seatingCapacity: initialData?.seatingCapacity || 7,
    doors: initialData?.doors || 5,
    exteriorColor: initialData?.exteriorColor || "Pearl White",
    interiorColor: initialData?.interiorColor || "Black Leather",
    description: initialData?.description || "",
    images: initialData?.images || [
      "https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&w=1200&q=80"
    ],
    features: initialData?.features || [
      "360-Degree Camera",
      "Adaptive Cruise Control",
      "Wireless Apple CarPlay",
      "Leather Seats"
    ],
    specifications: initialData?.specifications || [
      {
        groupName: "Performance & Engine",
        items: {
          "Engine": "3.5L V6 Twin-Turbo",
          "Horsepower": "400 HP",
          "Torque": "600 Nm"
        }
      }
    ],
    location: initialData?.location || "Main Showroom - Dubai Hub",
    isFeatured: initialData?.isFeatured ?? false,
    isNew: initialData?.isNew ?? true,
    status: initialData?.status || "Available"
  });

  const [featureInput, setFeatureInput] = useState("");
  const [imageInput, setImageInput] = useState("");

  const handleAddFeature = () => {
    if (!featureInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      features: [...(prev.features || []), featureInput.trim()]
    }));
    setFeatureInput("");
  };

  const handleRemoveFeature = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      features: (prev.features || []).filter((_, i) => i !== idx)
    }));
  };

  const handleAddImage = () => {
    if (!imageInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      images: [...(prev.images || []), imageInput.trim()]
    }));
    setImageInput("");
  };

  const handleRemoveImage = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      images: (prev.images || []).filter((_, i) => i !== idx)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalSlug = formData.slug || slugify(`${formData.make} ${formData.model} ${formData.year}`);

    // Frontend demo notification state
    setSaved(true);
    setTimeout(() => {
      router.push("/admin/vehicles");
    }, 1200);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Action Bar */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="gap-1 text-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Vehicles
          </Button>
          <h1 className="text-xl font-black text-slate-900">
            {isEdit ? `Edit Vehicle: ${initialData?.make} ${initialData?.model}` : "Create New Vehicle Specification"}
          </h1>
        </div>

        <Button type="submit" variant="primary" size="sm" className="gap-2 font-bold shadow-sm">
          <Save className="w-4 h-4" />
          {saved ? "Saved Successfully!" : isEdit ? "Update Vehicle" : "Publish Vehicle"}
        </Button>
      </div>

      {saved && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex items-center gap-3 text-sm font-semibold animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Vehicle specification saved into local prototype showcase data! Redirecting...</span>
        </div>
      )}

      {/* Section 1: Basic Information */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
          <Car className="w-4 h-4 text-amber-500" />
          Basic Vehicle Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="make" className="text-xs">Manufacturer / Make *</Label>
            <Input
              id="make"
              required
              value={formData.make}
              onChange={(e) => setFormData({ ...formData, make: e.target.value })}
              className="mt-1 text-sm"
            />
          </div>

          <div>
            <Label htmlFor="model" className="text-xs">Model Name *</Label>
            <Input
              id="model"
              required
              placeholder="e.g. Land Cruiser 300"
              value={formData.model}
              onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              className="mt-1 text-sm"
            />
          </div>

          <div>
            <Label htmlFor="variant" className="text-xs">Trim / Variant</Label>
            <Input
              id="variant"
              placeholder="e.g. VXR 3.5L Twin-Turbo"
              value={formData.variant}
              onChange={(e) => setFormData({ ...formData, variant: e.target.value })}
              className="mt-1 text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="year" className="text-xs">Model Year</Label>
            <Input
              id="year"
              type="number"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
              className="mt-1 text-sm"
            />
          </div>

          <div>
            <Label htmlFor="category" className="text-xs">Body Style / Category</Label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
              className="w-full h-10 px-3 mt-1 rounded-md border border-slate-300 bg-white text-sm"
            >
              <option value="SUV">SUV</option>
              <option value="Luxury">Luxury</option>
              <option value="Sports">Sports</option>
              <option value="Electric">Electric</option>
              <option value="Pickup">Pickup</option>
              <option value="Sedan">Sedan</option>
              <option value="Coupe">Coupe</option>
              <option value="Off-road">Off-road</option>
            </select>
          </div>

          <div>
            <Label htmlFor="condition" className="text-xs">Condition</Label>
            <select
              id="condition"
              value={formData.condition}
              onChange={(e) => setFormData({ ...formData, condition: e.target.value as any })}
              className="w-full h-10 px-3 mt-1 rounded-md border border-slate-300 bg-white text-sm"
            >
              <option value="New">New</option>
              <option value="Used">Used</option>
              <option value="Certified Pre-Owned">Certified Pre-Owned</option>
            </select>
          </div>

          <div>
            <Label htmlFor="price" className="text-xs">Starting MSRP / Price ($)</Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              className="mt-1 text-sm"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="desc" className="text-xs">Vehicle Overview & Description</Label>
          <Textarea
            id="desc"
            rows={4}
            placeholder="Detailed narrative describing engineering highlights, luxury interior refinements, and performance profile..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="mt-1 text-sm"
          />
        </div>
      </div>

      {/* Section 2: Technical Specifications */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          Technical & Drivetrain Specifications
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="engine" className="text-xs">Engine Specs</Label>
            <Input
              id="engine"
              placeholder="e.g. 3.5L Twin-Turbo V6"
              value={formData.engine}
              onChange={(e) => setFormData({ ...formData, engine: e.target.value })}
              className="mt-1 text-sm"
            />
          </div>

          <div>
            <Label htmlFor="hp" className="text-xs">Horsepower (HP)</Label>
            <Input
              id="hp"
              type="number"
              value={formData.horsepower}
              onChange={(e) => setFormData({ ...formData, horsepower: Number(e.target.value) })}
              className="mt-1 text-sm"
            />
          </div>

          <div>
            <Label htmlFor="torque" className="text-xs">Torque (Nm / lb-ft)</Label>
            <Input
              id="torque"
              placeholder="e.g. 650 Nm"
              value={formData.torque}
              onChange={(e) => setFormData({ ...formData, torque: e.target.value })}
              className="mt-1 text-sm"
            />
          </div>

          <div>
            <Label htmlFor="transmission" className="text-xs">Transmission</Label>
            <select
              id="transmission"
              value={formData.transmission}
              onChange={(e) => setFormData({ ...formData, transmission: e.target.value as any })}
              className="w-full h-10 px-3 mt-1 rounded-md border border-slate-300 bg-white text-sm"
            >
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
              <option value="Dual-Clutch">Dual-Clutch</option>
              <option value="CVT">CVT</option>
            </select>
          </div>

          <div>
            <Label htmlFor="fuel" className="text-xs">Fuel / Powertrain</Label>
            <select
              id="fuel"
              value={formData.fuelType}
              onChange={(e) => setFormData({ ...formData, fuelType: e.target.value as any })}
              className="w-full h-10 px-3 mt-1 rounded-md border border-slate-300 bg-white text-sm"
            >
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Plug-in Hybrid">Plug-in Hybrid</option>
            </select>
          </div>

          <div>
            <Label htmlFor="drive" className="text-xs">Drive Type</Label>
            <select
              id="drive"
              value={formData.driveType}
              onChange={(e) => setFormData({ ...formData, driveType: e.target.value as any })}
              className="w-full h-10 px-3 mt-1 rounded-md border border-slate-300 bg-white text-sm"
            >
              <option value="AWD">AWD</option>
              <option value="4WD">4WD</option>
              <option value="RWD">RWD</option>
              <option value="FWD">FWD</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          <div>
            <Label htmlFor="topSpeed" className="text-xs">Top Speed</Label>
            <Input
              id="topSpeed"
              placeholder="e.g. 210 km/h"
              value={formData.topSpeed}
              onChange={(e) => setFormData({ ...formData, topSpeed: e.target.value })}
              className="mt-1 text-sm"
            />
          </div>

          <div>
            <Label htmlFor="accel" className="text-xs">0-100 km/h Time</Label>
            <Input
              id="accel"
              placeholder="e.g. 6.7s"
              value={formData.acceleration}
              onChange={(e) => setFormData({ ...formData, acceleration: e.target.value })}
              className="mt-1 text-sm"
            />
          </div>

          <div>
            <Label htmlFor="seats" className="text-xs">Seating Capacity</Label>
            <Input
              id="seats"
              type="number"
              value={formData.seatingCapacity}
              onChange={(e) => setFormData({ ...formData, seatingCapacity: Number(e.target.value) })}
              className="mt-1 text-sm"
            />
          </div>

          <div>
            <Label htmlFor="location" className="text-xs">Showroom Location Hub</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="mt-1 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Section 3: Equipment Features */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
          Certified Equipment & Features Manager
        </h3>

        <div className="flex gap-2">
          <Input
            placeholder="Add new feature e.g., Panoramic Sunroof, Head-Up Display..."
            value={featureInput}
            onChange={(e) => setFeatureInput(e.target.value)}
            className="text-sm"
          />
          <Button type="button" onClick={handleAddFeature} variant="outline" className="gap-1 text-xs shrink-0">
            <Plus className="w-4 h-4" />
            Add Feature
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {formData.features?.map((feat, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-800 rounded-full text-xs font-medium border border-slate-200"
            >
              {feat}
              <button
                type="button"
                onClick={() => handleRemoveFeature(idx)}
                className="text-slate-400 hover:text-red-600"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Section 4: Image URLs */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
          Gallery Image URLs
        </h3>

        <div className="flex gap-2">
          <Input
            placeholder="Paste high-res vehicle image URL (Unsplash / web URL)..."
            value={imageInput}
            onChange={(e) => setImageInput(e.target.value)}
            className="text-sm"
          />
          <Button type="button" onClick={handleAddImage} variant="outline" className="gap-1 text-xs shrink-0">
            <Plus className="w-4 h-4" />
            Add Image
          </Button>
        </div>

        <div className="space-y-2">
          {formData.images?.map((url, idx) => (
            <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs">
              <span className="truncate max-w-xl text-slate-600">{url}</span>
              <Button type="button" variant="ghost" size="sm" onClick={() => handleRemoveImage(idx)} className="text-red-600 hover:text-red-700 h-7 text-xs">
                Remove
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Section 5: Publishing & Showcase Toggles */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
          Showcase Visibility & Publishing Toggles
        </h3>

        <div className="flex flex-wrap items-center gap-6">
          <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isFeatured}
              onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
              className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
            />
            Highlight as Flagship Featured Vehicle
          </label>

          <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isNew}
              onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
            />
            Tag as NEW Model Year Release
          </label>
        </div>
      </div>
    </form>
  );
}


