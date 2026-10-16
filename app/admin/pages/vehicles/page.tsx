"use client";
import Image from "next/image";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Car, CheckCircle2, ImagePlus, Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { VehiclePageCta } from "@/lib/vehicle-page/types";
import { VehicleProductsManager } from "@/components/admin/vehicle-products-manager";
import { adminFetch } from "@/lib/admin/admin-fetch";
export default function VehiclesPageAdmin() {
  const [item, setItem] = useState<VehiclePageCta | null>(null);
  const [draft, setDraft] = useState({
    title: "",
    description: "",
    buttonText: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  async function load() {
    setLoading(true);
    setError("");
    try {
      const response = await adminFetch("/api/admin/vehicles/cta", {
        cache: "no-store",
      });
      const body = await response.json();
      if (!response.ok)
        throw new Error(body.message ?? "Unable to load content.");
      setItem(body);
      setDraft({
        title: body.title,
        description: body.description,
        buttonText: body.buttonText,
      });
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : "Unable to load content.",
      );
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    void load();
  }, []);
  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!item) return;
    setSaving(true);
    setError("");
    setMessage("");
    const data = new FormData();
    data.set("title", draft.title.trim());
    data.set("description", draft.description.trim());
    data.set("buttonText", draft.buttonText.trim());
    if (image) data.set("image", image);
    try {
      const response = await adminFetch(`/api/admin/vehicles/cta/${item.id}`, {
        method: "PATCH",
        body: data,
      });
      const body = await response.json();
      if (!response.ok)
        throw new Error(
          Array.isArray(body.message)
            ? body.message[0]
            : (body.message ?? "Unable to save CTA."),
        );
      setImage(null);
      setMessage("Vehicle request section updated successfully.");
      await load();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to save CTA.");
    } finally {
      setSaving(false);
    }
  }
  const source =
    item?.imageUrl === "builtin:vehicle-spec-banner"
      ? "/images/spec-banner-bg.jpg"
      : (item?.imageUrl ?? "");
  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-12">
      <header className="border-b border-slate-200 pb-5">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-blue-700">
          <Car className="h-4 w-4" />
          Vehicles page content
        </div>
        <h1 className="mt-2 text-3xl font-black text-slate-950">
          Vehicles Page
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Manage the vehicle request section without changing its layout.
        </p>
      </header>
      {(error || message) && (
        <div
          className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold ${error ? "border-red-200 bg-red-50 text-red-700" : "border-emerald-200 bg-emerald-50 text-emerald-700"}`}
        >
          {!error && <CheckCircle2 className="h-4 w-4" />}
          {error || message}
        </div>
      )}
      {loading ? (
        <div className="flex min-h-64 items-center justify-center rounded-2xl bg-white">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : item ? (
        <form
          onSubmit={submit}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <div className="relative h-80 bg-slate-950">
            <Image
              src={source}
              alt="Vehicle request CTA"
              fill
              className="object-cover"
              sizes="1000px"
            />
          </div>
          <div className="space-y-4 p-5">
            <div>
              <Label className="text-xs font-bold">Heading</Label>
              <Input
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                maxLength={191}
                required
                className="mt-1.5 h-11"
              />
            </div>
            <div>
              <Label className="text-xs font-bold">Description</Label>
              <textarea
                value={draft.description}
                onChange={(e) =>
                  setDraft({ ...draft, description: e.target.value })
                }
                maxLength={2000}
                required
                rows={5}
                className="mt-1.5 w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900"
              />
            </div>
            <div>
              <Label className="text-xs font-bold">Button text</Label>
              <Input
                value={draft.buttonText}
                onChange={(e) =>
                  setDraft({ ...draft, buttonText: e.target.value })
                }
                maxLength={100}
                required
                className="mt-1.5 h-11"
              />
            </div>
            <div>
              <Label className="text-xs font-bold">
                Replace background image
              </Label>
              <Input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setImage(e.target.files?.[0] ?? null)
                }
                className="mt-1.5 h-11"
              />
              <p className="mt-1 text-[10px] text-slate-400">
                <ImagePlus className="mr-1 inline h-3 w-3" />
                JPG, PNG or WebP · Maximum 5 MB
              </p>
            </div>
            <Button disabled={saving} className="gap-2 bg-slate-950">
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              {saving ? "Saving..." : "Save section"}
            </Button>
          </div>
        </form>
      ) : null}
      <VehicleProductsManager />
    </div>
  );
}
