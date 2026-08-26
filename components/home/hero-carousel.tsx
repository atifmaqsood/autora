"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useContent } from "@/lib/content/context";

export function HeroCarousel() {
  const { content } = useContent();
  const activeSlides = content.heroSlides.filter((slide) => slide.active);
  const [offsetY, setOffsetY] = useState(0);
  const [videoUnavailable, setVideoUnavailable] = useState(false);

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

      {/* Light Ultra-Clear Gradient Overlay */}
      <div className="absolute inset-0 bg-[#06101C]/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-black/35 via-black/10 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33]/80 via-transparent to-transparent" />

      {/* Left-Aligned Hero Content Box */}
      <div className="relative z-20 mx-auto flex h-full max-w-[1720px] flex-col justify-center px-6 pt-24 sm:px-10 lg:px-16 xl:px-20">
        <div className="max-w-[760px] space-y-6">
          {/* Eyebrow Glassmorphism Pill */}
          <div>
            <span className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-5 py-2 text-[13px] font-semibold text-white shadow-lg backdrop-blur-md">
              Dubai to Worldwide
            </span>
          </div>

          {/* Large Hero Title */}
          <h1 className="text-[38px] font-black leading-[1.06] tracking-tight text-white sm:text-[52px] md:text-[62px] lg:text-[68px]">
            Driven by Quality,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-amber-200">
              Delivered Worldwide
            </span>
          </h1>

          {/* Subtitle Description */}
          <p className="max-w-[580px] text-[15px] font-medium leading-[1.65] text-slate-200 sm:text-[16px] lg:text-[18px]">
            Your trusted partner for seamless vehicle exports, genuine spare parts supply, and dependable international logistics from Dubai.
          </p>

          {/* Dual Pill CTA Buttons */}
          <div className="pt-1 flex flex-wrap items-center gap-3.5">
            <Link
              href="/vehicles"
              className="group flex h-[50px] items-center gap-2 rounded-full bg-white px-7 text-[15px] font-extrabold text-[#0B1F33] shadow-xl transition-all duration-300 hover:bg-[#F97316] hover:text-white hover:shadow-2xl"
            >
              <span>Explore Inventory</span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>

            <Link
              href="/contact-us"
              className="group flex h-[50px] items-center gap-2 rounded-full border border-white/40 bg-white/10 px-7 text-[15px] font-extrabold text-white backdrop-blur-md transition-all duration-300 hover:border-white hover:bg-white/20"
            >
              <span>Get A Quote</span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Left Vertical Indicator */}
      <div className="absolute bottom-10 left-10 z-20 hidden items-center gap-4 lg:flex">
        <span className="h-12 w-px bg-gradient-to-b from-white/60 to-transparent" />
        <span className="text-[11px] font-black uppercase tracking-[0.35em] text-white/70">
          Scroll to explore
        </span>
      </div>
    </section>
  );
}


