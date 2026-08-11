"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useContent } from "@/lib/content/context";
import { cn } from "@/lib/utils";

export function HeroCarousel() {
  const { content } = useContent();
  const activeSlides = content.heroSlides.filter((slide) => slide.active);
  const [current, setCurrent] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  const next = useCallback(() => {
    setCurrent((previous) => (previous + 1) % activeSlides.length);
  }, [activeSlides.length]);

  useEffect(() => {
    if (activeSlides.length <= 1) return;
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [activeSlides.length, next]);

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
  const activeSlide = activeSlides[current];

  return (
    <section className="relative h-screen min-h-[680px] w-full overflow-hidden bg-[#070a10]">
      {activeSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            "absolute inset-0 h-[130%] -top-[15%] transition-opacity duration-1000",
            index === current ? "opacity-100" : "opacity-0"
          )}
          style={{ transform: `translate3d(0, ${offsetY}px, 0)` }}
        >
          <Image
            src={slide.image}
            alt={slide.heading}
            fill
            priority={index === 0}
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/85" />

      <div className="absolute bottom-[56px] left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex">
        <span className="text-[12px] font-medium uppercase tracking-[0.42em] text-white/80">SCROLL</span>
        <div className="relative h-[44px] w-[44px] rounded-full border border-white/45">
          <span className="absolute left-1/2 top-0 h-[44px] w-px -translate-x-1/2 bg-white/30" />
          <span className="absolute left-1/2 top-[23px] h-2 w-2 -translate-x-1/2 rounded-full bg-white" />
        </div>
      </div>

      <div className="absolute bottom-[58px] right-[9vw] z-20 flex flex-wrap items-center justify-end gap-4">
        <Link
          href={activeSlide.primaryCta.href}
          className="flex h-[62px] items-center gap-3 rounded-full bg-[#536dfe] px-8 text-[18px] font-extrabold text-white shadow-2xl shadow-[#536dfe]/35 transition-all hover:bg-[#4560f2]"
        >
          <span>{activeSlide.primaryCta.label}</span>
          <ArrowRight className="h-5 w-5" />
        </Link>

        <Link
          href={activeSlide.secondaryCta.href}
          className="flex h-[62px] items-center rounded-full border border-white/55 px-8 text-[18px] font-extrabold text-white transition-all hover:bg-white/10"
        >
          {activeSlide.secondaryCta.label}
        </Link>
      </div>
    </section>
  );
}


