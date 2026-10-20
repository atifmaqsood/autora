"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useContent } from "@/lib/content/context";
import { VehicleInquiryModal } from "@/components/vehicles/vehicle-inquiry-modal";
import type { PageBanner } from "@/lib/banners/types";

export function HeroCarousel() {
  const { content } = useContent();
  const activeSlides = content.heroSlides.filter((slide) => slide.active);
  const [offsetY, setOffsetY] = useState(0);
  const [videoUnavailable, setVideoUnavailable] = useState(false);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [homeBanners, setHomeBanners] = useState<PageBanner[]>([]);
  // Hold the default video back until we know whether a banner replaces it.
  const [bannerLoaded, setBannerLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < window.innerHeight) {
        setOffsetY(window.scrollY * 0.3);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/banners?pageKey=%2F", {
      signal: controller.signal,
      cache: "no-store"
    })
      .then((response) => (response.ok ? response.json() : []))
      .then((data: PageBanner[]) => {
        setHomeBanners(data);
        setBannerLoaded(true);
      })
      .catch(() => {
        if (!controller.signal.aborted) setBannerLoaded(true);
      });
    return () => controller.abort();
  }, []);

  const customBanner = homeBanners[0];
  const customMediaUrl = customBanner?.mediaUrl ?? customBanner?.imageUrl;

  useEffect(() => {
    setVideoUnavailable(false);
  }, [customBanner?.id]);

  if (activeSlides.length === 0) return null;

  return (
    <>
      <section className="relative h-screen min-h-[720px] w-full overflow-hidden bg-[#0B1F33]">
        {/* Parallax background: the admin banner only */}
        <div
          className="absolute inset-0 h-[130%] -top-[15%]"
          style={{ transform: `translate3d(0, ${offsetY}px, 0)` }}
        >
          {/* Only the admin banner; blank (no built-in video or image) while
              loading, when none is set, or if the video fails to load. */}
          {!bannerLoaded || !customBanner || !customMediaUrl ? null : customBanner.mediaType === "image" ? (
            <div
              role="img"
              aria-label={customBanner.altText}
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${JSON.stringify(customMediaUrl).slice(1, -1)})` }}
            />
          ) : videoUnavailable ? null : (
            <video
              key={customMediaUrl}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              onError={() => setVideoUnavailable(true)}
              className="h-full w-full object-cover object-center"
              aria-hidden="true"
            >
              <source
                src={customMediaUrl}
                type={customMediaUrl.toLowerCase().endsWith(".webm") ? "video/webm" : "video/mp4"}
              />
            </video>
          )}
        </div>

        {/* Subtle Luxury Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060709] via-transparent to-black/30" />

        {/* Bottom Section Controls Bar */}
        <div className="absolute inset-x-0 bottom-8 z-20 mx-auto flex max-w-[1720px] items-end justify-between px-4 sm:bottom-12 sm:px-10 lg:px-16 xl:px-20">
          {/* Bottom Center / Left Scroll Indicator */}
          <div className="hidden flex-col items-center gap-2 md:flex">
            <span className="text-[10px] font-black uppercase tracking-[0.35em] text-white/70">
              Scroll
            </span>
            <span className="h-10 w-px bg-gradient-to-b from-white/70 to-transparent animate-pulse" />
          </div>

          {/* Bottom Right Action Buttons */}
          <div className="flex w-full max-w-[320px] flex-col gap-3 sm:ml-auto sm:w-auto sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <button
              type="button"
              onClick={() => setInquiryModalOpen(true)}
              style={{ backgroundColor: "var(--agtp-secondary, #4361EE)" }}
              className="group flex h-[52px] w-full items-center justify-center gap-2.5 rounded-full px-6 text-[15px] font-extrabold text-white shadow-2xl transition-all duration-300 hover:brightness-110 hover:scale-105 sm:w-auto sm:px-8"
            >
              <span>Get a Free Quote</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <Link
              href="/vehicles"
              className="group flex h-[52px] w-full items-center justify-center gap-2.5 rounded-full border border-white/25 bg-black/40 px-6 text-[15px] font-extrabold text-white backdrop-blur-md transition-all duration-300 hover:border-white hover:bg-white/20 hover:scale-105 shadow-xl sm:w-auto sm:px-8"
            >
              <span>Browse Inventory</span>
            </Link>
          </div>
        </div>
      </section>

      <VehicleInquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
      />
    </>
  );
}
