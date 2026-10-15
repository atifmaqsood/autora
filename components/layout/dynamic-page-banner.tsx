"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import type { PageBanner } from "@/lib/banners/types";

export function DynamicPageBanner() {
  const pathname = usePathname();
  const [banners, setBanners] = useState<PageBanner[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setActiveIndex(0);
    if (pathname === "/") {
      setBanners([]);
      return () => controller.abort();
    }
    fetch(`/api/banners?pageKey=${encodeURIComponent(pathname)}`, {
      signal: controller.signal,
      cache: "no-store"
    })
      .then((response) => (response.ok ? response.json() : []))
      .then((data: PageBanner[]) => setBanners(data))
      .catch(() => setBanners([]));
    return () => controller.abort();
  }, [pathname]);

  useEffect(() => {
    if (banners.length < 2) return;
    const timer = window.setInterval(
      () => setActiveIndex((index) => (index + 1) % banners.length),
      6000
    );
    return () => window.clearInterval(timer);
  }, [banners.length]);

  if (pathname === "/" || banners.length === 0) return null;

  return (
    <section className="relative h-[220px] overflow-hidden bg-slate-950 sm:h-[300px] lg:h-[380px]" aria-label="Page banner">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          role="img"
          aria-label={banner.altText}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
            index === activeIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${JSON.stringify(banner.imageUrl).slice(1, -1)})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-950/25 to-transparent" />
          {banner.title && (
            <div className="relative mx-auto flex h-full max-w-7xl items-end px-5 pb-8 sm:px-8 sm:pb-12">
              <h2 className="max-w-3xl text-2xl font-black tracking-tight text-white drop-shadow-lg sm:text-4xl lg:text-5xl">
                {banner.title}
              </h2>
            </div>
          )}
        </div>
      ))}

      {banners.length > 1 && (
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {banners.map((banner, index) => (
            <button
              key={banner.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show banner ${index + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                index === activeIndex ? "w-8 bg-white" : "w-3 bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
