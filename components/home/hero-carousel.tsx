"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useContent } from "@/lib/content/context";
import { VehicleInquiryModal } from "@/components/vehicles/vehicle-inquiry-modal";

export function HeroCarousel() {
  const { content } = useContent();
  const activeSlides = content.heroSlides.filter((slide) => slide.active);
  const [offsetY, setOffsetY] = useState(0);
  const [videoUnavailable, setVideoUnavailable] = useState(false);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < window.innerHeight) {
        setOffsetY(window.scrollY * 0.3);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (activeSlides.length === 0) return null;
  const activeSlide = activeSlides[0];

  return (
    <>
      <section className="relative h-screen min-h-[720px] w-full overflow-hidden bg-[#0B1F33]">
        {/* Parallax Video / Image Background */}
        <div
          className="absolute inset-0 h-[130%] -top-[15%]"
          style={{ transform: `translate3d(0, ${offsetY}px, 0)` }}
        >
          {!videoUnavailable ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster={activeSlide.image}
              onError={() => setVideoUnavailable(true)}
              className="h-full w-full object-cover object-center"
              aria-hidden="true"
            >
              <source src="https://videos.pexels.com/video-files/5309379/5309379-hd_1920_1080_25fps.mp4" type="video/mp4" />
            </video>
          ) : (
            <Image
              src={activeSlide.image}
              alt="AGTP Group vehicle sourcing and export"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
          )}
        </div>

        {/* Subtle Luxury Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060709] via-transparent to-black/30" />

        {/* Bottom Section Controls Bar */}
        <div className="absolute inset-x-0 bottom-12 z-20 mx-auto flex max-w-[1720px] items-end justify-between px-6 sm:px-10 lg:px-16 xl:px-20">
          {/* Bottom Center / Left Scroll Indicator */}
          <div className="hidden flex-col items-center gap-2 md:flex">
            <span className="text-[10px] font-black uppercase tracking-[0.35em] text-white/70">
              Scroll
            </span>
            <span className="h-10 w-px bg-gradient-to-b from-white/70 to-transparent animate-pulse" />
          </div>

          {/* Bottom Right Action Buttons */}
          <div className="ml-auto flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => setInquiryModalOpen(true)}
              style={{ backgroundColor: "var(--agtp-secondary, #4361EE)" }}
              className="group flex h-[52px] items-center gap-2.5 rounded-full px-8 text-[15px] font-extrabold text-white shadow-2xl transition-all duration-300 hover:brightness-110 hover:scale-105"
            >
              <span>Get a Free Quote</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <Link
              href="/vehicles"
              className="group flex h-[52px] items-center gap-2.5 rounded-full border border-white/25 bg-black/40 px-8 text-[15px] font-extrabold text-white backdrop-blur-md transition-all duration-300 hover:border-white hover:bg-white/20 hover:scale-105 shadow-xl"
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
