"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ArrowDown, ArrowUp, CheckCircle2, Car, Loader2, Save, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MAX_HOME_VEHICLES, homepageVehicles, mergeVehicles } from "@/lib/home/vehicles";
import type { Vehicle } from "@/lib/vehicles/types";

function vehicleTitle(vehicle: Vehicle): string {
  return vehicle.displayTitle ?? `${vehicle.make} ${vehicle.model} ${vehicle.variant} ${vehicle.year}`;
}

function imageSrc(vehicle: Vehicle): string | null {
  const first = vehicle.images[0];
  if (!first) return null;
  return typeof first === "string" ? first : (first as { src: string }).src;
}

/** Picks which vehicles (built-in or admin-added) the homepage shows. */
export function HomeVehiclesPicker() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    void Promise.all([
      fetch("/api/vehicle-products", { cache: "no-store" })
        .then((response) => (response.ok ? (response.json() as Promise<Vehicle[]>) : []))
        .catch(() => [] as Vehicle[]),
      fetch("/api/home-vehicles", { cache: "no-store" })
        .then((response) => (response.ok ? (response.json() as Promise<{ slugs: string[] }>) : { slugs: [] }))
        .catch(() => ({ slugs: [] as string[] }))
    ]).then(([managed, home]) => {
      const all = mergeVehicles(managed);
      setVehicles(all);
      // Start from what the homepage shows today (defaults included).
      setSelected(homepageVehicles(all, home.slugs).map((vehicle) => vehicle.slug));
      setLoading(false);
    });
  }, []);

  const bySlug = useMemo(() => new Map(vehicles.map((vehicle) => [vehicle.slug, vehicle])), [vehicles]);
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return query ? vehicles.filter((vehicle) => vehicleTitle(vehicle).toLowerCase().includes(query)) : vehicles;
  }, [search, vehicles]);

  function toggle(slug: string) {
    setMessage("");
    setError("");
    setSelected((current) => {
      if (current.includes(slug)) return current.filter((item) => item !== slug);
      if (current.length >= MAX_HOME_VEHICLES) {
        setError(`Only ${MAX_HOME_VEHICLES} vehicles can be shown on the homepage. Remove one first.`);
        return current;
      }
      return [...current, slug];
    });
  }

  function move(index: number, offset: number) {
    setSelected((current) => {
      const next = [...current];
      const target = index + offset;
      if (target < 0 || target >= next.length) return current;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  async function save() {
    setSaving(true);
    setError("");
    setMessage("");
    try {
      const response = await fetch("/api/admin/home-vehicles", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slugs: selected })
      });
      const body = (await response.json().catch(() => ({}))) as { message?: string | string[] };
      if (!response.ok) {
        throw new Error(Array.isArray(body.message) ? body.message[0] : body.message || "Could not save.");
      }
      setMessage("Homepage vehicles saved.");
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Could not save.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-64 items-center justify-center rounded-2xl bg-white">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {(error || message) && (
        <div className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold ${error ? "border-red-200 bg-red-50 text-red-700" : "border-emerald-200 bg-emerald-50 text-emerald-700"}`}>
          {!error && <CheckCircle2 className="h-4 w-4" />}
          {error || message}
        </div>
      )}

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-sm font-black text-slate-900">On the homepage</h2>
            <p className="mt-1 text-xs text-slate-500">
              {selected.length} / {MAX_HOME_VEHICLES} selected · shown in this order. Add new vehicles from the Vehicles Page admin.
            </p>
          </div>
          <Button type="button" onClick={() => void save()} disabled={saving} className="gap-2 bg-slate-950">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {saving ? "Saving..." : "Save homepage vehicles"}
          </Button>
        </div>
        {selected.length === 0 ? (
          <p className="mt-4 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4 text-center text-xs text-slate-500">
            No vehicles selected. The homepage will show the default first {MAX_HOME_VEHICLES} vehicles.
          </p>
        ) : (
          <ol className="mt-4 space-y-2">
            {selected.map((slug, index) => {
              const vehicle = bySlug.get(slug);
              return (
                <li key={slug} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                  <span className="w-5 text-center text-xs font-black text-slate-400">{index + 1}</span>
                  <span className="min-w-0 flex-1 truncate text-sm font-semibold text-slate-800">
                    {vehicle ? vehicleTitle(vehicle) : slug}
                  </span>
                  <button type="button" onClick={() => move(index, -1)} disabled={index === 0} aria-label="Move up" className="rounded p-1 text-slate-500 hover:bg-slate-200 disabled:opacity-30">
                    <ArrowUp className="h-4 w-4" />
                  </button>
                  <button type="button" onClick={() => move(index, 1)} disabled={index === selected.length - 1} aria-label="Move down" className="rounded p-1 text-slate-500 hover:bg-slate-200 disabled:opacity-30">
                    <ArrowDown className="h-4 w-4" />
                  </button>
                  <button type="button" onClick={() => toggle(slug)} className="rounded-md px-2 py-1 text-xs font-bold text-red-600 hover:bg-red-50">
                    Remove
                  </button>
                </li>
              );
            })}
          </ol>
        )}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <h2 className="text-sm font-black text-slate-900">All vehicles ({vehicles.length})</h2>
          <div className="relative w-full sm:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search vehicles" className="h-10 pl-9" />
          </div>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((vehicle) => {
            const position = selected.indexOf(vehicle.slug);
            const isSelected = position >= 0;
            const src = imageSrc(vehicle);
            return (
              <article key={vehicle.slug} className={`overflow-hidden rounded-xl border bg-white transition ${isSelected ? "border-emerald-400 ring-2 ring-emerald-100" : "border-slate-200"}`}>
                <div className="relative h-32 bg-slate-100">
                  {src ? (
                    <Image src={src} alt={vehicleTitle(vehicle)} fill sizes="300px" className="object-cover" unoptimized={src.startsWith("http://localhost:")} />
                  ) : (
                    <div className="flex h-full items-center justify-center text-slate-300"><Car className="h-8 w-8" /></div>
                  )}
                  {isSelected && (
                    <span className="absolute left-2 top-2 rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-black text-white">
                      Homepage #{position + 1}
                    </span>
                  )}
                </div>
                <div className="p-3">
                  <p className="line-clamp-2 min-h-[2.5rem] text-xs font-bold text-slate-800">{vehicleTitle(vehicle)}</p>
                  <Button
                    type="button"
                    size="sm"
                    variant={isSelected ? "outline" : "primary"}
                    onClick={() => toggle(vehicle.slug)}
                    disabled={!isSelected && selected.length >= MAX_HOME_VEHICLES}
                    className="mt-2 w-full text-xs"
                  >
                    {isSelected ? "Remove from homepage" : "Show on homepage"}
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
