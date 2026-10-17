"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CheckCircle2, Eye, EyeOff, ImagePlus, Loader2, Pencil, Plus, Save, Trash2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { adminFetch } from "@/lib/admin/admin-fetch";
import { MAX_HOME_SUPPLIERS, supplierImageSrc, type HomeSupplier } from "@/lib/home/suppliers";

const blank = {
  title: "",
  tag: "Automotive Parts, Body Kits, Tyres",
  experience: "",
  countries: "",
  linkUrl: "/brands",
  showOnHome: false
};
type Draft = typeof blank;

function errorMessage(body: unknown, fallback: string): string {
  const message = (body as { message?: string | string[] })?.message;
  return Array.isArray(message) ? message[0] : message || fallback;
}

/** Admin list for the homepage "Automotive Suppliers" cards. */
export function HomeSuppliersManager() {
  const [suppliers, setSuppliers] = useState<HomeSupplier[]>([]);
  const [draft, setDraft] = useState<Draft>(blank);
  const [image, setImage] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);

  const homeCount = suppliers.filter((supplier) => supplier.showOnHome).length;

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const response = await adminFetch("/api/admin/home-suppliers", { cache: "no-store" });
      const body: unknown = await response.json();
      if (!response.ok) throw new Error(errorMessage(body, "Unable to load suppliers."));
      setSuppliers(body as HomeSupplier[]);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load suppliers.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  function reset() {
    setDraft(blank);
    setImage(null);
    setEditingId(null);
    if (fileInput.current) fileInput.current.value = "";
  }

  function edit(supplier: HomeSupplier) {
    setEditingId(supplier.id);
    setDraft({
      title: supplier.title,
      tag: supplier.tag,
      experience: supplier.experience,
      countries: supplier.countries,
      linkUrl: supplier.linkUrl,
      showOnHome: supplier.showOnHome
    });
    setImage(null);
    setError("");
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!editingId && !image) {
      setError("Choose a supplier image.");
      return;
    }
    setSaving(true);
    setError("");
    setMessage("");
    const data = new FormData();
    Object.entries(draft).forEach(([key, value]) => data.set(key, String(value)));
    if (image) data.set("image", image);
    try {
      const response = await adminFetch(
        editingId ? `/api/admin/home-suppliers/${editingId}` : "/api/admin/home-suppliers",
        { method: editingId ? "PATCH" : "POST", body: data }
      );
      const body: unknown = await response.json();
      if (!response.ok) throw new Error(errorMessage(body, "Unable to save supplier."));
      setMessage(editingId ? "Supplier updated." : "Supplier added.");
      reset();
      await load();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Unable to save supplier.");
    } finally {
      setSaving(false);
    }
  }

  async function setOnHome(supplier: HomeSupplier, showOnHome: boolean) {
    setError("");
    setMessage("");
    const data = new FormData();
    data.set("showOnHome", String(showOnHome));
    const response = await adminFetch(`/api/admin/home-suppliers/${supplier.id}`, { method: "PATCH", body: data });
    const body: unknown = await response.json();
    if (!response.ok) {
      setError(errorMessage(body, "Unable to update supplier."));
      return;
    }
    setMessage(showOnHome ? "Supplier is now on the homepage." : "Supplier removed from the homepage.");
    await load();
  }

  async function remove(supplier: HomeSupplier) {
    if (!window.confirm(`Delete "${supplier.title}" permanently?`)) return;
    setError("");
    const response = await adminFetch(`/api/admin/home-suppliers/${supplier.id}`, { method: "DELETE" });
    if (!response.ok) {
      setError("Unable to delete supplier.");
      return;
    }
    if (editingId === supplier.id) reset();
    setMessage("Supplier deleted.");
    await load();
  }

  const field = (label: string, key: "title" | "tag" | "experience" | "countries" | "linkUrl", placeholder: string, max: number) => (
    <div>
      <Label htmlFor={`supplier-${key}`} className="text-xs font-bold text-slate-700">{label}</Label>
      <Input
        id={`supplier-${key}`}
        value={draft[key]}
        onChange={(event) => setDraft((current) => ({ ...current, [key]: event.target.value }))}
        placeholder={placeholder}
        maxLength={max}
        required={key !== "linkUrl"}
        className="mt-1.5 h-11"
      />
    </div>
  );

  return (
    <div className="space-y-6">
      {(error || message) && (
        <div className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold ${error ? "border-red-200 bg-red-50 text-red-700" : "border-emerald-200 bg-emerald-50 text-emerald-700"}`}>
          {!error && <CheckCircle2 className="h-4 w-4" />}
          {error || message}
        </div>
      )}

      <form onSubmit={submit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-black text-slate-900">{editingId ? "Edit supplier" : "Add supplier"}</h2>
          {editingId && (
            <button type="button" onClick={reset} className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-900">
              <X className="h-3.5 w-3.5" /> Cancel edit
            </button>
          )}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {field("Supplier / market name", "title", "Automotive Body Kits Market", 191)}
          {field("Tag on image", "tag", "Automotive Parts, Body Kits, Tyres", 191)}
          {field("Experience", "experience", "10+ year Experience", 100)}
          {field("Countries served", "countries", "Serving 25+ Countries", 100)}
          <div>
            <Label htmlFor="supplier-image" className="text-xs font-bold text-slate-700">
              {editingId ? "Replace image (optional)" : "Image *"}
            </Label>
            <Input
              id="supplier-image"
              ref={fileInput}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(event) => setImage(event.target.files?.[0] ?? null)}
              className="mt-1.5 h-11 cursor-pointer bg-white text-xs"
            />
            <p className="mt-1.5 flex items-center gap-1 text-[10px] text-slate-400"><ImagePlus className="h-3 w-3" /> JPG, PNG or WebP · Maximum 10 MB</p>
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <input
            type="checkbox"
            checked={draft.showOnHome}
            disabled={!draft.showOnHome && homeCount >= MAX_HOME_SUPPLIERS && !suppliers.find((s) => s.id === editingId)?.showOnHome}
            onChange={(event) => setDraft((current) => ({ ...current, showOnHome: event.target.checked }))}
          />
          Show on homepage ({homeCount} / {MAX_HOME_SUPPLIERS} used)
        </label>
        <Button type="submit" disabled={saving} className="gap-2 bg-slate-950">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : editingId ? <Save className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {saving ? "Saving..." : editingId ? "Save supplier" : "Add supplier"}
        </Button>
      </form>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-black text-slate-900">All suppliers</h2>
          <span className="text-xs font-semibold text-slate-500">
            {homeCount} / {MAX_HOME_SUPPLIERS} on homepage · {suppliers.length} total
          </span>
        </div>
        {loading ? (
          <div className="flex h-40 items-center justify-center text-slate-400"><Loader2 className="h-5 w-5 animate-spin" /></div>
        ) : suppliers.length === 0 ? (
          <p className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-500">No suppliers yet.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {suppliers.map((supplier) => {
              const src = supplierImageSrc(supplier.imageUrl);
              return (
                <article key={supplier.id} className={`overflow-hidden rounded-xl border bg-white ${supplier.showOnHome ? "border-emerald-400" : "border-slate-200"}`}>
                  <div className="relative h-36 bg-slate-100">
                    <Image src={src} alt={supplier.title} fill sizes="320px" className="object-cover" unoptimized={typeof src === "string" && src.startsWith("http://localhost:")} />
                    <span className={`absolute left-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-black ${supplier.showOnHome ? "bg-emerald-600 text-white" : "bg-slate-900/80 text-white"}`}>
                      {supplier.showOnHome ? "On homepage" : "Not on homepage"}
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="truncate text-sm font-bold text-slate-900">{supplier.title}</p>
                    <p className="mt-1 text-xs text-slate-500">{supplier.experience} · {supplier.countries}</p>
                    <div className="mt-3 flex gap-2 border-t border-slate-100 pt-3">
                      {supplier.showOnHome ? (
                        <Button type="button" variant="outline" size="sm" onClick={() => void setOnHome(supplier, false)} className="flex-1 gap-1.5 text-xs">
                          <EyeOff className="h-3.5 w-3.5" /> Remove
                        </Button>
                      ) : (
                        <Button type="button" size="sm" onClick={() => void setOnHome(supplier, true)} disabled={homeCount >= MAX_HOME_SUPPLIERS} title={homeCount >= MAX_HOME_SUPPLIERS ? `Only ${MAX_HOME_SUPPLIERS} can be on the homepage` : undefined} className="flex-1 gap-1.5 bg-emerald-600 text-xs text-white hover:bg-emerald-700">
                          <Eye className="h-3.5 w-3.5" /> Show on homepage
                        </Button>
                      )}
                      <Button type="button" variant="outline" size="sm" onClick={() => edit(supplier)} aria-label={`Edit ${supplier.title}`}>
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button type="button" variant="outline" size="sm" onClick={() => void remove(supplier)} aria-label={`Delete ${supplier.title}`} className="text-red-600 hover:bg-red-50">
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
