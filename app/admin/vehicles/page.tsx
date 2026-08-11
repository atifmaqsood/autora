"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Car,
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  Sparkles,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { getAllVehicles } from "@/lib/vehicles/data";
import { Vehicle } from "@/lib/vehicles/types";

export default function AdminVehiclesPage() {
  const initialVehicles = useMemo(() => getAllVehicles(), []);
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      const matchSearch =
        !search ||
        v.make.toLowerCase().includes(search.toLowerCase()) ||
        v.model.toLowerCase().includes(search.toLowerCase()) ||
        v.variant.toLowerCase().includes(search.toLowerCase());

      const matchCategory =
        categoryFilter === "all" ||
        v.category.toLowerCase() === categoryFilter.toLowerCase();

      return matchSearch && matchCategory;
    });
  }, [vehicles, search, categoryFilter]);

  const toggleFeatured = (id: string) => {
    setVehicles((prev) =>
      prev.map((v) => (v.id === id ? { ...v, isFeatured: !v.isFeatured } : v))
    );
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}" from the vehicle showcase?`)) {
      setVehicles((prev) => prev.filter((v) => v.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Vehicle Showcase Catalog Management
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Manage vehicles, edit engine specifications, toggle flagship featured badges, and add new inventory items.
          </p>
        </div>

        <Link href="/admin/vehicles/new">
          <Button variant="primary" size="sm" className="gap-2 font-semibold shadow-sm">
            <Plus className="w-4 h-4" />
            Add New Vehicle
          </Button>
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search make, model, variant..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 text-xs"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="h-9 px-3 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-800"
          >
            <option value="all">All Categories</option>
            <option value="SUV">SUV</option>
            <option value="Luxury">Luxury</option>
            <option value="Sports">Sports</option>
            <option value="Electric">Electric</option>
            <option value="Pickup">Pickup</option>
            <option value="Sedan">Sedan</option>
            <option value="Coupe">Coupe</option>
            <option value="Off-road">Off-road</option>
          </select>

          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 shrink-0">
            {filteredVehicles.length} Vehicles
          </span>
        </div>
      </div>

      {/* Vehicles Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="admin-table text-xs">
            <thead>
              <tr>
                <th>Image</th>
                <th>Vehicle Model & Variant</th>
                <th>Category</th>
                <th>Year</th>
                <th>Powertrain</th>
                <th>Status</th>
                <th>Featured</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVehicles.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-slate-500">
                    No vehicles found matching search parameters.
                  </td>
                </tr>
              ) : (
                filteredVehicles.map((v) => (
                  <tr key={v.id} className="hover:bg-slate-50/80 transition-colors">
                    <td>
                      <div className="relative w-16 h-11 rounded-lg overflow-hidden bg-slate-900 border border-slate-200 shrink-0">
                        <Image
                          src={v.images[0] || "https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&w=300&q=80"}
                          alt={v.model}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                    </td>

                    <td className="font-semibold text-slate-900">
                      <div className="text-xs font-bold text-slate-900">
                        {v.make} {v.model}
                      </div>
                      <div className="text-[10px] text-slate-500 font-normal">
                        {v.variant}
                      </div>
                    </td>

                    <td>
                      <Badge variant="secondary" className="text-[10px] bg-slate-100 text-slate-800">
                        {v.category}
                      </Badge>
                    </td>

                    <td className="font-bold text-slate-700">{v.year}</td>

                    <td className="text-slate-600 font-medium">
                      <div>{v.horsepower} HP • {v.fuelType}</div>
                      <div className="text-[10px] text-slate-400">{v.transmission}</div>
                    </td>

                    <td>
                      <span
                        className={
                          v.status === "Available"
                            ? "admin-status-green"
                            : v.status === "Reserved"
                            ? "admin-status-orange"
                            : "admin-status-gray"
                        }
                      >
                        {v.status}
                      </span>
                    </td>

                    <td>
                      <button
                        onClick={() => toggleFeatured(v.id)}
                        className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition-colors flex items-center gap-1 ${
                          v.isFeatured
                            ? "bg-amber-100 text-amber-900 border border-amber-300"
                            : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                        }`}
                      >
                        <Sparkles className="w-3 h-3 text-amber-500" />
                        {v.isFeatured ? "Featured" : "Regular"}
                      </button>
                    </td>

                    <td className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/vehicles/${v.slug}`} target="_blank">
                          <button
                            className="admin-action admin-action-view"
                            title="Preview Live Page"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </Link>

                        <Link href={`/admin/vehicles/${v.id}/edit`}>
                          <button
                            className="admin-action admin-action-edit"
                            title="Edit Vehicle Specs"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        </Link>

                        <button
                          onClick={() => handleDelete(v.id, `${v.make} ${v.model}`)}
                          className="admin-action admin-action-delete"
                          title="Delete Vehicle"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


