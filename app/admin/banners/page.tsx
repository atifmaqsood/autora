"use client";

import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CheckCircle2, Eye, EyeOff, ImagePlus, Images, Loader2, Search, Trash2, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { adminFetch } from "@/lib/admin/admin-fetch";
import { bannerPages } from "@/lib/banners/pages";
import type { PageBanner } from "@/lib/banners/types";

const IMAGE_LIMIT_MB = 15;
const VIDEO_LIMIT_MB = 50;

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<PageBanner[]>([]);
  const [selectedPage, setSelectedPage] = useState(bannerPages[0].key);
  const [search, setSearch] = useState("");
  const [media, setMedia] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);

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

  // A page has one banner. Mirror the site's choice for older data that
  // still has several: newest published, else newest (API lists oldest first).
  const currentBanner = useMemo(() => {
    const forPage = banners.filter((banner) => banner.pageKey === selectedPage);
    const published = forPage.filter((banner) => banner.isActive);
    return published[published.length - 1] ?? forPage[forPage.length - 1] ?? null;
  }, [banners, selectedPage]);
  const pagesWithBanner = useMemo(() => new Set(banners.map((banner) => banner.pageKey)), [banners]);

  const selectedDefinition = bannerPages.find((page) => page.key === selectedPage)!;
  const groupedPages = useMemo(() => {
    const query = search.trim().toLowerCase();
    const pages = query ? bannerPages.filter((page) => page.label.toLowerCase().includes(query)) : bannerPages;
    return Object.entries(
      pages.reduce<Record<string, typeof bannerPages>>((groups, page) => {
        (groups[page.group] ??= []).push(page);
        return groups;
      }, {})
    );
  }, [search]);

  function selectPage(key: string) {
    setSelectedPage(key);
    setMedia(null);
    setError("");
    setMessage("");
    if (fileInput.current) fileInput.current.value = "";
  }

  async function uploadBanner(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!media) {
      setError("Choose an image or video to upload.");
      return;
    }
    const isVideo = media.type.startsWith("video/");
    const limit = isVideo ? VIDEO_LIMIT_MB : IMAGE_LIMIT_MB;
    if (media.size > limit * 1024 * 1024) {
      setError(`${isVideo ? "Videos" : "Images"} must be ${limit} MB or smaller.`);
      return;
    }

    setIsUploading(true);
    setError("");
    setMessage("");
    const formData = new FormData();
    formData.set("pageKey", selectedPage);
    formData.set("sectionKey", "hero");
    formData.set("altText", `${selectedDefinition.label} banner`);
    formData.set("sortOrder", "0");
    formData.set("image", media);

    try {
      const response = await adminFetch("/api/admin/page-banners", { method: "POST", body: formData });
      const body = (await response.json().catch(() => ({}))) as { message?: string | string[] };
      if (!response.ok) {
        throw new Error(Array.isArray(body.message) ? body.message[0] : body.message || "Upload failed.");
      }
      setMedia(null);
      if (fileInput.current) fileInput.current.value = "";
      setMessage(currentBanner ? "Banner replaced. The previous banner was removed." : "Banner uploaded and live on the site.");
      await loadBanners();
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload failed.");
    } finally {
      setIsUploading(false);
    }
  }

  async function setPublished(banner: PageBanner, isActive: boolean) {
    setError("");
    setMessage("");
    const response = await adminFetch(`/api/admin/page-banners/${banner.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive })
    });
    if (!response.ok) {
      setError("Could not update the banner.");
      return;
    }
    setMessage(isActive ? "Banner is now live on the site." : "Banner hidden from the site.");
    await loadBanners();
  }

  async function deleteBanner(banner: PageBanner) {
    if (!window.confirm("Delete this banner permanently?")) return;
    setError("");
    setMessage("");
    const response = await adminFetch(`/api/admin/page-banners/${banner.id}`, { method: "DELETE" });
    if (!response.ok) {
      setError("Could not delete the banner.");
      return;
    }
    setMessage("Banner deleted. The page shows its default image.");
    await loadBanners();
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 pb-12">
      <header className="border-b border-slate-200 pb-5">
        <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-blue-700">
          <Images className="h-4 w-4" /> Media management
        </div>
        <h1 className="text-3xl font-black tracking-tight text-slate-950">Page banners</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-500">
          Each page has one banner. Uploading a new one replaces the current banner.
        </p>
      </header>

      {(error || message) && (
        <div
          className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold ${
            error ? "border-red-200 bg-red-50 text-red-700" : "border-emerald-200 bg-emerald-50 text-emerald-700"
          }`}
        >
          {!error && <CheckCircle2 className="h-4 w-4" />}
          {error || message}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
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
          <div className="p-3">
            {groupedPages.map(([group, pages]) => (
              <div key={group} className="mb-4">
                <p className="px-2 pb-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400">{group}</p>
                {pages.map((page) => (
                  <button
                    key={page.key}
                    type="button"
                    onClick={() => selectPage(page.key)}
                    className={`mb-1 flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-xs font-semibold transition ${
                      selectedPage === page.key ? "bg-slate-950 text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                    }`}
                  >
                    <span>{page.label}</span>
                    {pagesWithBanner.has(page.key) && (
                      <span
                        title="Has a banner"
                        className={`h-2 w-2 rounded-full ${selectedPage === page.key ? "bg-emerald-300" : "bg-emerald-500"}`}
                      />
                    )}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </aside>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between gap-4 border-b border-slate-100 p-5 sm:p-6">
            <h2 className="text-xl font-black text-slate-950">{selectedDefinition.label}</h2>
            {currentBanner && (
              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                  currentBanner.isActive ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"
                }`}
              >
                {currentBanner.isActive ? "Live on site" : "Hidden"}
              </span>
            )}
          </div>

          <div className="p-5 sm:p-6">
            {isLoading ? (
              <div className="flex h-56 items-center justify-center text-slate-400">
                <Loader2 className="h-5 w-5 animate-spin" />
              </div>
            ) : currentBanner ? (
              <div className="overflow-hidden rounded-xl border border-slate-200">
                {currentBanner.mediaType === "video" ? (
                  <video
                    src={currentBanner.mediaUrl ?? currentBanner.imageUrl}
                    className="aspect-[21/9] w-full bg-slate-950 object-cover"
                    muted
                    playsInline
                    controls
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element -- admin uploads live on the API host
                  <img
                    src={currentBanner.mediaUrl ?? currentBanner.imageUrl}
                    alt={`${selectedDefinition.label} banner`}
                    className="aspect-[21/9] w-full bg-slate-100 object-cover"
                  />
                )}
                <div className="flex flex-wrap gap-2 border-t border-slate-100 p-3">
                  {currentBanner.isActive ? (
                    <Button type="button" variant="outline" size="sm" onClick={() => void setPublished(currentBanner, false)} className="gap-1.5">
                      <EyeOff className="h-3.5 w-3.5" /> Unpublish
                    </Button>
                  ) : (
                    <Button type="button" size="sm" onClick={() => void setPublished(currentBanner, true)} className="gap-1.5 bg-emerald-600 text-white hover:bg-emerald-700">
                      <Eye className="h-3.5 w-3.5" /> Publish
                    </Button>
                  )}
                  <Button type="button" variant="outline" size="sm" onClick={() => void deleteBanner(currentBanner)} className="gap-1.5 text-red-600 hover:border-red-200 hover:bg-red-50 hover:text-red-700">
                    <Trash2 className="h-3.5 w-3.5" /> Delete
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex aspect-[21/9] flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 text-center">
                <ImagePlus className="mb-3 h-7 w-7 text-slate-300" />
                <p className="text-sm font-bold text-slate-600">No banner for this page</p>
                <p className="mt-1 text-xs text-slate-400">The page shows its default image until you upload one.</p>
              </div>
            )}

            <form onSubmit={uploadBanner} className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end">
              <div className="flex-1">
                <Label htmlFor="banner-media" className="text-xs font-bold text-slate-700">
                  {currentBanner ? "Replace banner" : "Upload banner"}
                </Label>
                <Input
                  ref={fileInput}
                  id="banner-media"
                  type="file"
                  accept="image/jpeg,image/png,image/webp,video/mp4,video/webm,video/quicktime"
                  onChange={(event) => setMedia(event.target.files?.[0] ?? null)}
                  className="mt-1.5 h-11 cursor-pointer bg-white text-xs file:mr-3 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-1.5 file:font-semibold"
                  required
                />
                <p className="mt-1.5 text-[10px] text-slate-400">
                  JPG, PNG or WebP up to {IMAGE_LIMIT_MB} MB, or MP4/WebM/MOV up to {VIDEO_LIMIT_MB} MB · Recommended 1920×1080
                </p>
              </div>
              <Button type="submit" disabled={isUploading} className="h-11 gap-2 bg-slate-950 sm:mb-[22px]">
                {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                {isUploading ? "Uploading..." : currentBanner ? "Upload & replace" : "Upload banner"}
              </Button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
