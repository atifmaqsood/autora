"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode
} from "react";
import { usePathname } from "next/navigation";

import type { PageBanner } from "@/lib/banners/types";

interface PageBannerContextValue {
  banners: PageBanner[];
  /** Called by PageHero so admin banners render inside it, not above it. */
  registerHero: () => () => void;
}

const PageBannerContext = createContext<PageBannerContextValue>({
  banners: [],
  registerHero: () => () => undefined
});

/** Admin-managed banners for the current page (empty when none are set). */
export function usePageBanners(): PageBanner[] {
  const { banners, registerHero } = useContext(PageBannerContext);
  useEffect(() => registerHero(), [registerHero]);
  return banners;
}

/**
 * Loads the admin banners for the current route. Pages with a PageHero show
 * them as the hero background; other pages get a standalone banner strip.
 */
export function PageBannerProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [banners, setBanners] = useState<PageBanner[]>([]);
  const [heroCount, setHeroCount] = useState(0);
  const [registerHero] = useState(() => () => {
    setHeroCount((count) => count + 1);
    return () => setHeroCount((count) => count - 1);
  });

  useEffect(() => {
    const controller = new AbortController();
    setBanners([]);
    if (pathname === "/") return () => controller.abort();
    fetch(`/api/banners?pageKey=${encodeURIComponent(pathname)}`, {
      signal: controller.signal,
      cache: "no-store"
    })
      .then((response) => (response.ok ? response.json() : []))
      .then((data: PageBanner[]) => setBanners(data))
      .catch(() => undefined);
    return () => controller.abort();
  }, [pathname]);

  return (
    <PageBannerContext.Provider value={{ banners, registerHero }}>
      {heroCount === 0 && banners.length > 0 && (
        <section
          className="relative h-[220px] overflow-hidden bg-slate-950 sm:h-[300px] lg:h-[380px]"
          aria-label="Page banner"
        >
          <BannerSlides banners={banners} showTitles />
        </section>
      )}
      {children}
    </PageBannerContext.Provider>
  );
}

/** Cross-fading banner media that fills its positioned parent. */
export function BannerSlides({
  banners,
  showTitles = false
}: {
  banners: PageBanner[];
  showTitles?: boolean;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
    if (banners.length < 2) return;
    const timer = window.setInterval(
      () => setActiveIndex((index) => (index + 1) % banners.length),
      6000
    );
    return () => window.clearInterval(timer);
  }, [banners]);

  return (
    <>
      {banners.map((banner, index) => {
        const url = banner.mediaUrl || banner.imageUrl;
        return (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            {banner.mediaType === "video" ? (
              <video
                src={url}
                autoPlay
                muted
                loop
                playsInline
                aria-label={banner.altText}
                className="h-full w-full object-cover"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element -- admin uploads live on the API host
              <img src={url} alt={banner.altText} className="h-full w-full object-cover" />
            )}
            {showTitles && (
              <>
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-950/25 to-transparent" />
                {banner.title && (
                  <div className="relative mx-auto flex h-full max-w-7xl items-end px-5 pb-8 sm:px-8 sm:pb-12">
                    <h2 className="max-w-3xl text-2xl font-black tracking-tight text-white drop-shadow-lg sm:text-4xl lg:text-5xl">
                      {banner.title}
                    </h2>
                  </div>
                )}
              </>
            )}
          </div>
        );
      })}

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
    </>
  );
}
