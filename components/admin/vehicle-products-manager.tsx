"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import {
  CarFront,
  Eye,
  EyeOff,
  Loader2,
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Vehicle } from "@/lib/vehicles/types";
import { adminFetch } from "@/lib/admin/admin-fetch";
import { useVehicleCategories } from "@/lib/vehicles/categories";
import { YOUTUBE_URL } from "@/lib/youtube";

const blank = {
  slug: "",
  make: "",
  model: "",
  variant: "",
  variantCode: "",
  youtubeUrl: "",
  displayTitle: "",
  year: new Date().getFullYear(),
  category: "",
  bodyType: "SUV",
  condition: "New",
  price: 0,
  currency: "$",
  mileage: 0,
  fuelType: "Petrol",
  transmission: "Automatic",
  driveType: "4WD",
  engine: "",
  engineSize: "",
  horsepower: 0,
  torque: "",
  topSpeed: "",
  acceleration: "",
  seatingCapacity: 5,
  doors: 4,
  exteriorColor: "",
  interiorColor: "",
  steering: "LHD",
  description: "",
  features: "",
  specifications: "",
  location: "Dubai, UAE",
  status: "On Request",
  isFeatured: false,
  isNew: true,
  isActive: true,
  sortOrder: 0,
};
type Draft = typeof blank;
type ManagedVehicle = Vehicle & { isActive: boolean; sortOrder: number };
const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export function VehicleProductsManager() {
  const [vehicles, setVehicles] = useState<ManagedVehicle[]>([]);
  const [draft, setDraft] = useState<Draft>(blank);
  const [images, setImages] = useState<File[]>([]);
  const [brochure, setBrochure] = useState<File | null>(null);
  const [currentBrochure, setCurrentBrochure] = useState<string | null>(null);
  const [removeBrochure, setRemoveBrochure] = useState(false);
  // One video per vehicle: an uploaded file or a YouTube link.
  const [video, setVideo] = useState<File | null>(null);
  const [currentVideo, setCurrentVideo] = useState<string | null>(null);
  const [removeVideo, setRemoveVideo] = useState(false);
  // Which kind of video the admin is adding; only that input is shown.
  const [videoSource, setVideoSource] = useState<"file" | "youtube">("file");
  // Bumped to clear the file pickers after a save or when editing.
  const [fileKey, setFileKey] = useState(0);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  // The homepage "Industries We Serve" cards; an older vehicle keeps its
  // current category as an option so editing it doesn't clear it.
  const categories = useVehicleCategories();
  const categoryOptions =
    draft.category && !categories.includes(draft.category)
      ? [...categories, draft.category]
      : categories;
  const load = useCallback(async () => {
    setLoading(true);
    try {
      const response = await adminFetch("/api/admin/vehicle-products", {
        cache: "no-store",
      });
      const body = await response.json();
      if (!response.ok)
        throw new Error(body.message ?? "Unable to load vehicle products.");
      setVehicles(body);
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Unable to load vehicle products.",
      );
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    void load();
  }, [load]);
  const set = <K extends keyof Draft>(key: K, value: Draft[K]) =>
    setDraft((current) => ({ ...current, [key]: value }));
  const errorMessage = (
    body: { message?: string | string[] },
    fallback: string,
  ) =>
    Array.isArray(body.message) ? body.message[0] : (body.message ?? fallback);
  function reset() {
    setEditingId(null);
    setDraft(blank);
    setImages([]);
    setBrochure(null);
    setCurrentBrochure(null);
    setRemoveBrochure(false);
    setVideo(null);
    setCurrentVideo(null);
    setRemoveVideo(false);
    setVideoSource("file");
    setFileKey((key) => key + 1);
  }
  function edit(vehicle: ManagedVehicle) {
    setEditingId(vehicle.id);
    setDraft({
      slug: vehicle.slug,
      make: vehicle.make,
      model: vehicle.model,
      variant: vehicle.variant,
      variantCode: vehicle.variantCode ?? "",
      youtubeUrl: vehicle.youtubeUrl ?? "",
      displayTitle: vehicle.displayTitle ?? `${vehicle.make} ${vehicle.model}`,
      year: vehicle.year,
      category: vehicle.category,
      bodyType: vehicle.bodyType,
      condition: vehicle.condition,
      price: vehicle.price,
      currency: vehicle.currency,
      mileage: vehicle.mileage,
      fuelType: vehicle.fuelType,
      transmission: vehicle.transmission,
      driveType: vehicle.driveType,
      engine: vehicle.engine,
      engineSize: vehicle.engineSize,
      horsepower: vehicle.horsepower,
      torque: vehicle.torque,
      topSpeed: vehicle.topSpeed,
      acceleration: vehicle.acceleration,
      seatingCapacity: vehicle.seatingCapacity,
      doors: vehicle.doors,
      exteriorColor: vehicle.exteriorColor,
      interiorColor: vehicle.interiorColor,
      steering: vehicle.steering ?? "LHD",
      description: vehicle.description,
      features: vehicle.features.join("\n"),
      specifications: vehicle.specifications
        .flatMap((group) =>
          Object.entries(group.items).map(([key, value]) => `${key}: ${value}`),
        )
        .join("\n"),
      location: vehicle.location,
      status: vehicle.status,
      isFeatured: vehicle.isFeatured,
      isNew: vehicle.isNew,
      isActive: vehicle.isActive,
      sortOrder: vehicle.sortOrder,
    });
    setImages([]);
    setBrochure(null);
    setCurrentBrochure(vehicle.brochureUrl ?? null);
    setVideo(null);
    setCurrentVideo(vehicle.videoUrl ?? null);
    setRemoveVideo(false);
    setVideoSource(vehicle.youtubeUrl ? "youtube" : "file");
    setFileKey((key) => key + 1);
    setRemoveBrochure(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  async function submit(event: FormEvent) {
    event.preventDefault();
    if (
      videoSource === "youtube" &&
      draft.youtubeUrl.trim() &&
      !YOUTUBE_URL.test(draft.youtubeUrl.trim())
    ) {
      setError("Enter a valid YouTube video link (youtube.com or youtu.be).");
      return;
    }
    if (!editingId && !images.length) {
      setError("At least one vehicle image is required.");
      return;
    }
    setSaving(true);
    setError("");
    const data = new FormData();
    Object.entries(draft).forEach(([key, value]) =>
      data.set(key, String(value)),
    );
    images.forEach((file) => data.append("images", file));
    if (brochure) data.set("brochure", brochure);
    else if (editingId && removeBrochure) data.set("removeBrochure", "true");
    if (editingId && removeVideo) {
      data.set("removeVideo", "true");
      data.set("youtubeUrl", "");
    } else if (videoSource === "file") {
      // Only the file is sent; without a new one the current video stays.
      data.delete("youtubeUrl");
      if (video) data.set("video", video);
    }
    try {
      const response = await adminFetch(
        editingId
          ? `/api/admin/vehicle-products/${editingId}`
          : "/api/admin/vehicle-products",
        { method: editingId ? "PATCH" : "POST", body: data },
      );
      const body = await response.json();
      if (!response.ok)
        throw new Error(errorMessage(body, "Unable to save vehicle."));
      setNotice(editingId ? "Vehicle updated." : "Vehicle added.");
      reset();
      await load();
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : "Unable to save vehicle.",
      );
    } finally {
      setSaving(false);
    }
  }
  async function patch(vehicle: ManagedVehicle) {
    const data = new FormData();
    data.set("isActive", String(!vehicle.isActive));
    const response = await adminFetch(`/api/admin/vehicle-products/${vehicle.id}`, {
      method: "PATCH",
      body: data,
    });
    const body = await response.json();
    if (!response.ok) {
      setError(errorMessage(body, "Unable to update vehicle."));
      return;
    }
    setNotice(vehicle.isActive ? "Vehicle hidden." : "Vehicle activated.");
    await load();
  }
  async function remove(vehicle: ManagedVehicle) {
    if (!window.confirm(`Delete “${vehicle.displayTitle}”?`)) return;
    const response = await adminFetch(`/api/admin/vehicle-products/${vehicle.id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const body = await response.json();
      setError(errorMessage(body, "Unable to delete vehicle."));
      return;
    }
    setNotice("Vehicle deleted.");
    await load();
  }
  // General listing details (not shown in the Features tab).
  const basicFields: Array<[string, keyof Draft, "text" | "number"]> = [
    ["Display title", "displayTitle", "text"],
    ["URL slug", "slug", "text"],
    ["Variant", "variant", "text"],
    ["Price", "price", "number"],
    ["Currency", "currency", "text"],
    ["Mileage", "mileage", "number"],
    ["Location", "location", "text"],
    ["Display order", "sortOrder", "number"],
  ];
  // Exactly the details shown in the website's Features tab.
  const featureFields: Array<[string, keyof Draft, "text" | "number"]> = [
    ["Make", "make", "text"],
    ["Model", "model", "text"],
    ["Body", "bodyType", "text"],
    ["Year", "year", "number"],
    ["Transmission", "transmission", "text"],
    ["Engine", "engine", "text"],
    ["Exterior Color", "exteriorColor", "text"],
    ["Interior Color", "interiorColor", "text"],
    ["Fuel Type", "fuelType", "text"],
    ["Drivetrain", "driveType", "text"],
    ["Seats", "seatingCapacity", "number"],
    ["Availability", "status", "text"],
    ["Condition", "condition", "text"],
    ["Variant Code", "variantCode", "text"],
  ];
  const requiredKeys: Array<keyof Draft> = [
    "displayTitle",
    "slug",
    "category",
    "currency",
    "location",
    "make",
    "model",
    "year",
  ];
  const field = ([label, key, type]: [string, keyof Draft, "text" | "number"]) => (
    <div key={key}>
      <Label>
        {label}
        {requiredKeys.includes(key) && " *"}
      </Label>
      <Input
        type={type}
        min={type === "number" ? 0 : undefined}
        required={requiredKeys.includes(key)}
        // A 0 shows as an empty box (placeholder "0") so typing a number
        // doesn't leave a leading zero.
        value={
          type === "number"
            ? Number(draft[key]) || ""
            : String(draft[key])
        }
        placeholder={type === "number" ? "0" : undefined}
        onChange={(e) => {
          set(
            key,
            (type === "number" ? Number(e.target.value) : e.target.value) as never,
          );
          if (key === "displayTitle" && !editingId)
            set("slug", slugify(e.target.value));
        }}
        className="mt-1.5 bg-white text-slate-950"
      />
    </div>
  );
  return (
    <section className="space-y-6 border-t border-slate-200 pt-8">
      <header>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-blue-700">
          <CarFront className="h-4 w-4" />
          Full vehicle product catalogue
        </div>
        <h2 className="mt-2 text-2xl font-black text-slate-950">
          Vehicle Products
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Manage complete vehicle detail pages, galleries, technical data and
          availability.
        </p>
      </header>
      {(error || notice) && (
        <div
          className={`rounded-xl border px-4 py-3 text-sm font-semibold ${error ? "border-red-200 bg-red-50 text-red-700" : "border-emerald-200 bg-emerald-50 text-emerald-700"}`}
        >
          {error || notice}
        </div>
      )}
      <form
        onSubmit={submit}
        className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5"
      >
        <div className="flex justify-between">
          <h3 className="font-black text-slate-950">
            {editingId ? "Edit vehicle" : "Add vehicle"}
          </h3>
          {editingId && (
            <Button type="button" variant="outline" size="sm" onClick={reset}>
              <X className="mr-1 h-4 w-4" />
              Cancel
            </Button>
          )}
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <Label>Category *</Label>
            <select
              required
              value={draft.category}
              onChange={(e) => set("category", e.target.value)}
              className="mt-1.5 h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-950"
            >
              <option value="">Select category</option>
              {categoryOptions.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          {basicFields.map(field)}
          <div>
            <Label>
              Gallery images {editingId ? "(replaces gallery)" : "*"}
            </Label>
            <Input
              key={`file-${fileKey}`}
              type="file"
              multiple
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => setImages(Array.from(e.target.files ?? []))}
              className="mt-1.5 bg-white text-slate-950"
            />
          </div>
          <div>
            <Label>
              Brochure (PDF){currentBrochure ? " — replaces current" : ""}
            </Label>
            <Input
              key={`file-${fileKey}`}
              type="file"
              accept="application/pdf"
              onChange={(e) => setBrochure(e.target.files?.[0] ?? null)}
              className="mt-1.5 bg-white text-slate-950"
            />
            {currentBrochure && !brochure && (
              <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs">
                <a
                  href={currentBrochure}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-blue-700 underline"
                >
                  View current brochure
                </a>
                <label className="flex items-center gap-1.5 text-slate-600">
                  <input
                    type="checkbox"
                    checked={removeBrochure}
                    onChange={(e) => setRemoveBrochure(e.target.checked)}
                  />
                  Remove brochure
                </label>
              </div>
            )}
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <h4 className="font-black text-slate-950">Video</h4>
          <p className="mt-0.5 text-xs text-slate-500">
            Shown next to the brochure on the vehicle page, playing muted on a
            loop. Choose one: upload a video or add a YouTube link.
          </p>
          <div
            role="radiogroup"
            aria-label="Video source"
            className="mt-3 flex flex-wrap gap-2"
          >
            {(
              [
                ["file", "Upload from computer"],
                ["youtube", "YouTube link"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={videoSource === value}
                onClick={() => {
                  setVideoSource(value);
                  if (value === "youtube") setVideo(null);
                }}
                className={`rounded-full border px-4 py-1.5 text-sm font-bold transition-colors ${videoSource === value ? "border-slate-950 bg-slate-950 text-white" : "border-slate-300 bg-white text-slate-700 hover:border-slate-500"}`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="mt-3 max-w-xl">
            {videoSource === "file" ? (
              <div>
                <Label>
                  Video file (MP4, WebM, MOV — max 200 MB)
                  {currentVideo || draft.youtubeUrl ? " — replaces current" : ""}
                </Label>
                <Input
                  key={`video-${fileKey}`}
                  type="file"
                  accept="video/mp4,video/webm,video/quicktime"
                  onChange={(e) => setVideo(e.target.files?.[0] ?? null)}
                  className="mt-1.5 bg-white text-slate-950"
                />
              </div>
            ) : (
              <div>
                <Label>
                  YouTube link{currentVideo ? " — replaces the uploaded video" : ""}
                </Label>
                <Input
                  type="url"
                  placeholder="https://www.youtube.com/watch?v=…"
                  value={draft.youtubeUrl}
                  onChange={(e) => set("youtubeUrl", e.target.value)}
                  className="mt-1.5 bg-white text-slate-950"
                />
              </div>
            )}
          </div>
          {(currentVideo || draft.youtubeUrl) && editingId && !video && (
            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs">
              {currentVideo && (
                <a
                  href={currentVideo}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-blue-700 underline"
                >
                  View current video
                </a>
              )}
              <label className="flex items-center gap-1.5 text-slate-600">
                <input
                  type="checkbox"
                  checked={removeVideo}
                  onChange={(e) => setRemoveVideo(e.target.checked)}
                />
                Remove video
              </label>
            </div>
          )}
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <h4 className="font-black text-slate-950">Features</h4>
          <p className="mt-0.5 text-xs text-slate-500">
            Shown in the vehicle&apos;s Features tab. Empty fields show as &quot;-&quot;.
          </p>
          <div className="mt-3 grid gap-4 md:grid-cols-3">
            {featureFields.slice(0, 9).map(field)}
            <div>
              <Label>LHD/RHD</Label>
              <select
                value={draft.steering}
                onChange={(e) => set("steering", e.target.value)}
                className="mt-1.5 h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-950"
              >
                <option>LHD</option>
                <option>RHD</option>
              </select>
            </div>
            {featureFields.slice(9).map(field)}
          </div>
        </div>
        <div>
          <Label>Description</Label>
          <textarea
            required
            rows={5}
            value={draft.description}
            onChange={(e) => set("description", e.target.value)}
            className="mt-1.5 w-full rounded-md border border-slate-200 p-3 text-sm text-slate-950"
          />
        </div>
        <div className="flex flex-wrap gap-5">
          {(["isFeatured", "isNew", "isActive"] as const).map((key) => (
            <label
              key={key}
              className="flex gap-2 text-sm font-semibold text-slate-700"
            >
              <input
                type="checkbox"
                checked={draft[key]}
                onChange={(e) => set(key, e.target.checked)}
              />
              {key === "isFeatured"
                ? "Featured"
                : key === "isNew"
                  ? "New badge"
                  : "Visible on website"}
            </label>
          ))}
        </div>
        <Button disabled={saving} className="gap-2 bg-slate-950">
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
          Save vehicle
        </Button>
      </form>
      {loading ? (
        <Loader2 className="h-6 w-6 animate-spin" />
      ) : (
        <div className="space-y-3">
          {vehicles.map((vehicle) => (
            <article
              key={vehicle.id}
              className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h3 className="font-black text-slate-950">
                  {vehicle.displayTitle}
                </h3>
                <p className="text-xs text-slate-500">
                  {vehicle.year} · {vehicle.category} · {vehicle.status} ·{" "}
                  {vehicle.isActive ? "Active" : "Hidden"}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => void patch(vehicle)}
                >
                  {vehicle.isActive ? (
                    <EyeOff className="mr-1 h-4 w-4" />
                  ) : (
                    <Eye className="mr-1 h-4 w-4" />
                  )}
                  {vehicle.isActive ? "Hide" : "Show"}
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => edit(vehicle)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="text-red-600"
                  onClick={() => void remove(vehicle)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
