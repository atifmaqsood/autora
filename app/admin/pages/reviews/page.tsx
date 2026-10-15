"use client";

import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import Image from "next/image";
import {
  CheckCircle2,
  Eye,
  EyeOff,
  ImagePlus,
  Loader2,
  Pencil,
  Plus,
  Save,
  Star,
  Trash2,
  Video,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Review } from "@/lib/reviews/types";
import { agtpAssets } from "@/src/assets";
import { MarketingPageEditor } from "@/components/admin/marketing-page-editor";

const builtins: Record<string, string> = {
  "builtin:review-r1": agtpAssets.reviewR1.src,
  "builtin:review-r2": agtpAssets.reviewR2.src,
  "builtin:review-r3": agtpAssets.reviewR3.src,
  "builtin:review-r4": agtpAssets.reviewR4.src,
};
const blank = {
  name: "",
  role: "",
  company: "",
  country: "",
  flag: "",
  tag: "",
  quote: "",
  rating: 5,
  videoUrl: "",
  isActive: true,
  showOnHome: false,
  homeSortOrder: 0,
};
type Draft = typeof blank;

export default function ReviewsAdminPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [draft, setDraft] = useState<Draft>(blank);
  const [image, setImage] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const featuredCount = reviews.filter(
    (review) => review.isActive && review.showOnHome,
  ).length;
  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/reviews", { cache: "no-store" });
      const body = await response.json();
      if (!response.ok)
        throw new Error(body.message ?? "Unable to load reviews.");
      setReviews(body);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to load reviews.");
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    void load();
  }, [load]);
  const set = <K extends keyof Draft>(key: K, value: Draft[K]) =>
    setDraft((current) => ({ ...current, [key]: value }));
  function edit(review: Review) {
    setEditingId(review.id);
    setDraft({
      name: review.name,
      role: review.role,
      company: review.company ?? "",
      country: review.country,
      flag: review.flag,
      tag: review.tag,
      quote: review.quote,
      rating: review.rating,
      videoUrl: review.videoUrl ?? "",
      isActive: review.isActive,
      showOnHome: review.showOnHome,
      homeSortOrder: review.homeSortOrder,
    });
    setImage(null);
    setVideo(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function reset() {
    setEditingId(null);
    setDraft(blank);
    setImage(null);
    setVideo(null);
  }
  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!editingId && !image) {
      setError("Customer image is required.");
      return;
    }
    setSaving(true);
    setError("");
    setMessage("");
    const data = new FormData();
    data.set("name", draft.name.trim());
    data.set("role", draft.role.trim());
    data.set("company", draft.company.trim());
    data.set("country", draft.country.trim());
    data.set("flag", draft.flag.trim());
    data.set("tag", draft.tag.trim());
    data.set("quote", draft.quote.trim());
    data.set("rating", String(draft.rating));
    data.set("isActive", String(draft.isActive));
    data.set("showOnHome", String(draft.showOnHome));
    const order = Number(draft.homeSortOrder);
    data.set(
      "homeSortOrder",
      String(Number.isInteger(order) ? Math.min(10, Math.max(0, order)) : 0),
    );
    if (editingId || draft.videoUrl.trim())
      data.set("videoUrl", draft.videoUrl.trim());
    if (image) data.set("image", image);
    if (video) data.set("video", video);
    try {
      const response = await fetch(
        editingId ? `/api/admin/reviews/${editingId}` : "/api/admin/reviews",
        { method: editingId ? "PATCH" : "POST", body: data },
      );
      const body = await response.json();
      if (!response.ok)
        throw new Error(
          Array.isArray(body.message)
            ? body.message[0]
            : (body.message ?? "Unable to save review."),
        );
      setMessage(
        editingId
          ? "Review updated successfully."
          : "Review added successfully.",
      );
      reset();
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to save review.");
    } finally {
      setSaving(false);
    }
  }
  async function remove(review: Review) {
    if (!window.confirm(`Delete ${review.name}'s review?`)) return;
    setError("");
    const response = await fetch(`/api/admin/reviews/${review.id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const body = await response.json();
      setError(body.message ?? "Unable to delete review.");
      return;
    }
    if (editingId === review.id) reset();
    setMessage("Review deleted.");
    await load();
  }
  async function toggleFeatured(review: Review) {
    if (!review.showOnHome && featuredCount >= 10) {
      setError(
        "Homepage already has the maximum 10 reviews. Remove one first.",
      );
      return;
    }
    const data = new FormData();
    data.set("showOnHome", String(!review.showOnHome));
    if (!review.showOnHome) data.set("isActive", "true");
    data.set(
      "homeSortOrder",
      String(!review.showOnHome ? featuredCount + 1 : review.homeSortOrder),
    );
    const response = await fetch(`/api/admin/reviews/${review.id}`, {
      method: "PATCH",
      body: data,
    });
    const body = response.status === 204 ? null : await response.json();
    if (!response.ok) {
      setError(body?.message ?? "Unable to update homepage selection.");
      return;
    }
    setMessage(
      !review.showOnHome
        ? "Review is now active and visible on the homepage."
        : "Review removed from homepage.",
    );
    await load();
  }
  async function toggleActive(review: Review) {
    setError("");
    setMessage("");
    const data = new FormData();
    data.set("isActive", String(!review.isActive));
    const response = await fetch(`/api/admin/reviews/${review.id}`, {
      method: "PATCH",
      body: data,
    });
    const body = await response.json();
    if (!response.ok) {
      setError(
        Array.isArray(body.message)
          ? body.message[0]
          : (body.message ?? "Unable to change review status."),
      );
      return;
    }
    const updated = body as Review;
    if (editingId === review.id)
      setDraft((current) => ({
        ...current,
        isActive: updated.isActive,
        showOnHome: updated.showOnHome,
      }));
    setMessage(
      updated.isActive
        ? "Review activated."
        : "Review deactivated and removed from homepage.",
    );
    await load();
  }
  const field = (label: string, key: keyof Draft, placeholder = "") => (
    <div>
      <Label className="text-xs font-bold text-slate-700">
        {key === "homeSortOrder" ? "Homepage order (0–10)" : label}
      </Label>
      <Input
        type={
          key === "homeSortOrder" || key === "rating"
            ? "number"
            : key === "videoUrl"
              ? "url"
              : "text"
        }
        value={String(draft[key])}
        onChange={(e) =>
          set(
            key,
            (key === "homeSortOrder" || key === "rating"
              ? Number(e.target.value)
              : e.target.value) as never,
          )
        }
        placeholder={placeholder}
        maxLength={key === "flag" ? 16 : undefined}
        min={key === "homeSortOrder" ? 0 : key === "rating" ? 1 : undefined}
        max={key === "homeSortOrder" ? 10 : key === "rating" ? 5 : undefined}
        className="mt-1.5 h-11"
      />
    </div>
  );

  return (
    <div className="mx-auto max-w-6xl space-y-6 pb-12">
      <header className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.16em] text-blue-700">
            Pages / Customer reviews
          </p>
          <h1 className="mt-2 text-3xl font-black text-slate-950">
            Reviews Page
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Add customer reviews and choose the best ones for the homepage
            without changing the website design.
          </p>
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-black text-amber-800">
          <Star className="mr-2 inline h-4 w-4 fill-amber-500" />
          {featuredCount} / 10 on homepage
        </div>
      </header>
      {(error || message) && (
        <div
          className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold ${error ? "border-red-200 bg-red-50 text-red-700" : "border-emerald-200 bg-emerald-50 text-emerald-700"}`}
        >
          {!error && <CheckCircle2 className="h-4 w-4" />}
          {error || message}
        </div>
      )}
      <form
        onSubmit={submit}
        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-black text-slate-900">
            {editingId ? "Edit review" : "Add a review"}
          </h2>
          {editingId && (
            <Button type="button" variant="ghost" size="sm" onClick={reset}>
              <X className="mr-1 h-4 w-4" />
              Cancel
            </Button>
          )}
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {field("Customer name", "name", "Mr. Customer")}
          {field("Role", "role", "Business Owner")}
          {field("Company (optional)", "company")}
          {field("Country", "country", "Angola")}
          {field("Flag emoji", "flag", "🇦🇴")}
          {field("Review tag", "tag", "Verified Delivery")}
          {field("Rating (1–5)", "rating", "5")}
          <div className="lg:col-span-3">
            <Label className="text-xs font-bold text-slate-700">
              Review text
            </Label>
            <textarea
              value={draft.quote}
              onChange={(e) => set("quote", e.target.value)}
              required
              rows={4}
              className="mt-1.5 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-500"
            />
          </div>
          <div className="md:col-span-2">
            {field("Video URL (optional)", "videoUrl", "https://...")}
          </div>
          <div>
            <Label className="text-xs font-bold text-slate-700">
              Upload video (optional)
            </Label>
            <Input
              type="file"
              accept="video/mp4,video/webm,video/quicktime"
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setVideo(event.target.files?.[0] ?? null)
              }
              className="mt-1.5 h-11 cursor-pointer bg-white text-xs"
            />
            <p className="mt-1 text-[10px] text-slate-400">
              <Video className="mr-1 inline h-3 w-3" />
              MP4, WebM or MOV · Maximum 100 MB
            </p>
          </div>
          {field("Homepage order", "homeSortOrder", "1")}
          <div className="md:col-span-2">
            <Label className="text-xs font-bold text-slate-700">
              {editingId
                ? "Replace customer image (optional)"
                : "Customer image"}
            </Label>
            <Input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setImage(e.target.files?.[0] ?? null)
              }
              className="mt-1.5 h-11 cursor-pointer bg-white text-xs"
            />
            <p className="mt-1 text-[10px] text-slate-400">
              <ImagePlus className="mr-1 inline h-3 w-3" />
              JPG, PNG or WebP · Maximum 5 MB
            </p>
          </div>
          <div className="flex flex-col justify-end gap-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={draft.isActive}
                onChange={(event) =>
                  setDraft((current) => ({
                    ...current,
                    isActive: event.target.checked,
                    showOnHome: event.target.checked
                      ? current.showOnHome
                      : false,
                  }))
                }
              />
              Visible on Reviews Page
            </label>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={draft.showOnHome}
                disabled={!draft.showOnHome && featuredCount >= 10}
                onChange={(event) =>
                  setDraft((current) => ({
                    ...current,
                    showOnHome: event.target.checked,
                    isActive: event.target.checked ? true : current.isActive,
                  }))
                }
              />
              Show on homepage
            </label>
          </div>
        </div>
        <Button disabled={saving} className="mt-5 gap-2 bg-slate-950">
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : editingId ? (
            <Save className="h-4 w-4" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
          {saving ? "Saving..." : editingId ? "Save review" : "Add review"}
        </Button>
      </form>
      {loading ? (
        <div className="flex min-h-52 items-center justify-center rounded-2xl bg-white">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="relative h-56 bg-slate-900">
                <Image
                  src={builtins[review.imageUrl] ?? review.imageUrl}
                  alt={review.name}
                  fill
                  className="object-cover"
                  sizes="400px"
                />
                <button
                  type="button"
                  onClick={() => void toggleActive(review)}
                  className={`absolute right-3 top-3 z-10 flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-black shadow-lg backdrop-blur ${review.isActive ? "border-emerald-300 bg-emerald-50/95 text-emerald-700" : "border-slate-300 bg-slate-900/90 text-white"}`}
                >
                  {review.isActive ? (
                    <Eye className="h-3.5 w-3.5" />
                  ) : (
                    <EyeOff className="h-3.5 w-3.5" />
                  )}
                  {review.isActive ? "Active" : "Inactive"}
                </button>
              </div>
              <div className="space-y-3 p-4">
                <div>
                  <h3 className="font-black text-slate-900">{review.name}</h3>
                  <p className="text-xs font-semibold text-slate-500">
                    {review.role} · {review.country} {review.flag}
                  </p>
                </div>
                <p className="line-clamp-3 text-sm leading-6 text-slate-600">
                  {review.quote}
                </p>
                <button
                  type="button"
                  onClick={() => void toggleFeatured(review)}
                  className={`flex w-full items-center justify-center gap-2 rounded-lg border px-3 py-2 text-xs font-black ${review.showOnHome ? "border-amber-300 bg-amber-50 text-amber-800" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}
                >
                  {review.showOnHome ? (
                    <Star className="h-4 w-4 fill-amber-500" />
                  ) : (
                    <Star className="h-4 w-4" />
                  )}
                  {review.showOnHome
                    ? `Homepage #${review.homeSortOrder}`
                    : "Add to homepage"}
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => edit(review)}
                  >
                    <Pencil className="mr-1 h-3.5 w-3.5" />
                    Edit
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="text-red-600"
                    onClick={() => void remove(review)}
                  >
                    <Trash2 className="mr-1 h-3.5 w-3.5" />
                    Delete
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
      <div className="border-t border-slate-200 pt-10">
        <MarketingPageEditor
          pageKey="customer-reviews"
          title="Customer Reviews CTA"
          description="Manage the bottom call-to-action image, content and buttons."
          definitions={[
            {
              key: "cta",
              label: "Confidence CTA",
              description: "Background image, content and buttons",
            },
          ]}
          builtinImages={{
            "builtin:customer-reviews-cta": agtpAssets.inventoryHero.src,
          }}
        />
      </div>
    </div>
  );
}
