"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  Eye,
  EyeOff,
  ImagePlus,
  Images,
  Loader2,
  Search,
  Trash2,
  Upload
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { bannerPages } from "@/lib/banners/pages";
import type { PageBanner } from "@/lib/banners/types";
import { adminFetch } from "@/lib/admin/admin-fetch";

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<PageBanner[]>([]);
  const [selectedPage, setSelectedPage] = useState(bannerPages[0].key);
  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("");
  const [altText, setAltText] = useState("");
  const [media, setMedia] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadBanners = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await adminFetch("/api/admin/page-banners", { cache: "no-store" });
      if (!response.ok) throw new Error("Unable to load banners.");
      setBanners((await response.json()) as PageBanner[]);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load banners.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadBanners();
  }, [loadBanners]);

  const selectedDefinition = bannerPages.find((page) => page.key === selectedPage)!;
  const selectedBanners = banners.filter((banner) => banner.pageKey === selectedPage);
  const filteredPages = useMemo(() => {
    const query = search.trim().toLowerCase();
    return query
      ? bannerPages.filter(
          (page) =>
            page.label.toLowerCase().includes(query) || page.key.toLowerCase().includes(query)
        )
      : bannerPages;
  }, [search]);
  const groupedPages = useMemo(
    () =>
      Object.entries(
        filteredPages.reduce<Record<string, typeof bannerPages>>((groups, page) => {
          (groups[page.group] ??= []).push(page);
          return groups;
        }, {})
      ),
    [filteredPages]
  );

  async function uploadBanner(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!media) {
      setError(selectedPage === "/" ? "Choose an image or video first." : "Choose an image first.");
      return;
    }

    setIsUploading(true);
    setError("");
    setMessage("");
    const formData = new FormData();
    formData.set("pageKey", selectedPage);
    formData.set("sectionKey", "hero");
    formData.set("title", title);
    formData.set("altText", altText || `${selectedDefinition.label} banner`);
    formData.set("sortOrder", String(selectedBanners.length));
    formData.set("image", media);

    try {
      const response = await adminFetch("/api/admin/page-banners", {
        method: "POST",
        body: formData
      });
      const body = (await response.json()) as PageBanner | { message?: string };
      if (!response.ok) {
        throw new Error("message" in body ? body.message : "Upload failed.");
      }
      setTitle("");
      setAltText("");
      setMedia(null);
      setMessage("Banner uploaded and published successfully.");
      await loadBanners();
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload failed.");
    } finally {
      setIsUploading(false);
    }
  }

  async function toggleBanner(banner: PageBanner) {
    setError("");
    const response = await adminFetch(`/api/admin/page-banners/${banner.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !banner.isActive })
    });
    if (!response.ok) {
      setError("Could not update the banner.");
      return;
    }
    await loadBanners();
  }

  async function deleteBanner(banner: PageBanner) {
    if (!window.confirm("Delete this banner permanently?")) return;
    setError("");
    const response = await adminFetch(`/api/admin/page-banners/${banner.id}`, {
      method: "DELETE"
    });
    if (!response.ok) {
      setError("Could not delete the banner.");
      return;
    }
    setMessage("Banner deleted.");
    await loadBanners();
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 pb-12">
      <header className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-blue-700">
            <Images className="h-4 w-4" /> Media management
          </div>
          <h1 className="text-3xl font-black tracking-tight text-slate-950">Page banners</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-500">
            Upload page-specific banners. Homepage supports an image or video without changing its existing hero design.
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 shadow-sm">
          {banners.length} banner{banners.length === 1 ? "" : "s"} configured
        </div>
      </header>

      {(error || message) && (
        <div
          className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold ${
            error
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-emerald-200 bg-emerald-50 text-emerald-700"
          }`}
        >
          {!error && <CheckCircle2 className="h-4 w-4" />}
          {error || message}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)]">
          <div className="border-b border-slate-100 p-4">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Find a page..."
                className="h-10 bg-slate-50 pl-9 text-xs"
              />
            </div>
          </div>
          <div className="h-full overflow-y-auto p-3 pb-24">
            {groupedPages.map(([group, pages]) => (
              <div key={group} className="mb-4">
                <p className="px-2 pb-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  {group}
                </p>
                {pages.map((page) => {
                  const count = banners.filter((banner) => banner.pageKey === page.key).length;
                  return (
                    <button
                      key={page.key}
                      type="button"
                      onClick={() => {
                        setSelectedPage(page.key);
                        setMedia(null);
                        setError("");
                        setMessage("");
                      }}
                      className={`mb-1 flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-xs font-semibold transition ${
                        selectedPage === page.key
                          ? "bg-slate-950 text-white"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                      }`}
                    >
                      <span>{page.label}</span>
                      {count > 0 && (
                        <span className={`rounded-full px-2 py-0.5 text-[10px] ${selectedPage === page.key ? "bg-white/15" : "bg-blue-50 text-blue-700"}`}>
                          {count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </aside>

        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-blue-700">
                  {selectedDefinition.group}
                </p>
                <h2 className="mt-1 text-xl font-black text-slate-950">{selectedDefinition.label}</h2>
                <code className="mt-1 block text-xs text-slate-400">{selectedDefinition.key}</code>
              </div>
              <ImagePlus className="h-6 w-6 text-slate-300" />
            </div>

            <form onSubmit={uploadBanner} className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="banner-image" className="text-xs font-bold text-slate-700">
                  {selectedPage === "/" ? "Hero image or video" : "Banner image"}
                </Label>
                <Input
                  key={selectedPage}
                  id="banner-image"
                  type="file"
                  accept={selectedPage === "/" ? "image/jpeg,image/png,image/webp,video/mp4,video/webm,video/quicktime" : "image/jpeg,image/png,image/webp"}
                  onChange={(event) => setMedia(event.target.files?.[0] ?? null)}
                  className="mt-1.5 h-11 cursor-pointer bg-white text-xs file:mr-3 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-1.5 file:font-semibold"
                  required
                />
                <p className="mt-1.5 text-[10px] text-slate-400">
                  {selectedPage === "/"
                    ? "JPG, PNG, WebP (5 MB) or MP4/WebM/MOV (50 MB) · Recommended 1920×1080"
                    : "JPG, PNG or WebP · Maximum 5 MB · Recommended 1920×600"}
                </p>
              </div>
              <div>
                <Label htmlFor="banner-alt" className="text-xs font-bold text-slate-700">Image description</Label>
                <Input
                  id="banner-alt"
                  value={altText}
                  onChange={(event) => setAltText(event.target.value)}
                  placeholder={`${selectedDefinition.label} banner`}
                  className="mt-1.5 h-11"
                />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="banner-title" className="text-xs font-bold text-slate-700">Overlay heading (optional)</Label>
                <Input
                  id="banner-title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Add an optional heading over the banner"
                  className="mt-1.5 h-11"
                />
              </div>
              <div className="sm:col-span-2 flex justify-end">
                <Button type="submit" variant="default" className="h-10 gap-2 bg-slate-950 px-5" disabled={isUploading}>
                  {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                  {isUploading ? "Uploading..." : "Upload banner"}
                </Button>
              </div>
            </form>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-sm font-black text-slate-900">Configured banners</h3>
              <span className="text-xs font-semibold text-slate-400">{selectedBanners.length} total</span>
            </div>

            {isLoading ? (
              <div className="flex h-40 items-center justify-center text-slate-400"><Loader2 className="h-5 w-5 animate-spin" /></div>
            ) : selectedBanners.length === 0 ? (
              <div className="flex min-h-44 flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 text-center">
                <Images className="mb-3 h-7 w-7 text-slate-300" />
                <p className="text-sm font-bold text-slate-600">No banners for this page</p>
                <p className="mt-1 text-xs text-slate-400">Upload the first image using the form above.</p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {selectedBanners.map((banner) => (
                  <article key={banner.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                    {banner.mediaType === "video" ? (
                      <video
                        src={banner.mediaUrl ?? banner.imageUrl}
                        className="h-40 w-full bg-slate-950 object-cover"
                        muted
                        playsInline
                        controls
                      />
                    ) : (
                      <div
                        role="img"
                        aria-label={banner.altText}
                        className="h-40 bg-slate-100 bg-cover bg-center"
                        style={{ backgroundImage: `url(${JSON.stringify(banner.mediaUrl ?? banner.imageUrl).slice(1, -1)})` }}
                      />
                    )}
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-slate-900">{banner.title || banner.altText}</p>
                          <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">Order {banner.sortOrder + 1}</p>
                        </div>
                        <span className={`rounded-full px-2 py-1 text-[10px] font-bold ${banner.isActive ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                          {banner.isActive ? "Active" : "Hidden"}
                        </span>
                      </div>
                      <div className="mt-4 flex gap-2 border-t border-slate-100 pt-3">
                        <Button type="button" variant="outline" size="sm" onClick={() => void toggleBanner(banner)} className="flex-1 gap-1.5">
                          {banner.isActive ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                          {banner.isActive ? "Hide" : "Publish"}
                        </Button>
                        <Button type="button" variant="outline" size="sm" onClick={() => void deleteBanner(banner)} className="text-red-600 hover:border-red-200 hover:bg-red-50 hover:text-red-700">
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
