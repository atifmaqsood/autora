"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Car,
  Search,
  Pause,
  Play
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContent } from "@/lib/content/context";
import { getAllVehicles, getCategoriesWithCounts, getMakesList } from "@/lib/vehicles/data";
import { cn } from "@/lib/utils";

export function HeroCarousel() {
  const { content } = useContent();
  const activeSlides = content.heroSlides.filter((s) => s.active);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  // Quick-filter bar state
  const allVehicles = getAllVehicles();
  const categories = getCategoriesWithCounts();
  const makes = getMakesList();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedMake, setSelectedMake] = useState("all");

  const next = useCallback(() => {
    setCurrent((p) => (p + 1) % activeSlides.length);
  }, [activeSlides.length]);

  const prev = useCallback(() => {
    setCurrent((p) => (p - 1 + activeSlides.length) % activeSlides.length);
  }, [activeSlides.length]);

  // Auto-play
  useEffect(() => {
    if (paused || activeSlides.length <= 1) return;
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [paused, next, activeSlides.length]);

  if (activeSlides.length === 0) return null;

  const slide = activeSlides[current];

  return (
    <section className="relative min-h-[600px] lg:min-h-[680px] overflow-hidden bg-slate-950 text-white">
      {/* Background Images — transition on current */}
      {activeSlides.map((s, idx) => (
        <div
          key={s.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-700",
            idx === current ? "opacity-100 z-0" : "opacity-0 z-[-1]"
          )}
        >
          <Image
            src={s.image}
            alt={s.heading}
            fill
            priority={idx === 0}
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/20" />
        </div>
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center min-h-[600px] lg:min-h-[680px] py-16">
        <div className="max-w-3xl space-y-5">
          {/* Badge */}
          <div
            key={slide.id + "-badge"}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider animate-in fade-in slide-in-from-left-4 duration-500"
          >
            <Car className="w-3.5 h-3.5" />
            {slide.badge}
          </div>

          {/* Heading */}
          <h1
            key={slide.id + "-h1"}
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.05] font-sans animate-in fade-in slide-in-from-left-6 duration-500 delay-75"
          >
            {slide.heading}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
              {slide.accentWord}
            </span>
          </h1>

          {/* Subheading */}
          <p
            key={slide.id + "-sub"}
            className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl animate-in fade-in slide-in-from-left-6 duration-500 delay-100"
          >
            {slide.subheading}
          </p>

          {/* CTA Buttons */}
          <div
            key={slide.id + "-ctas"}
            className="flex flex-wrap gap-3 pt-1 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150"
          >
            <Link href={slide.primaryCta.href}>
              <Button variant="primary" size="lg" className="font-bold gap-2 shadow-lg">
                <Car className="w-4 h-4" />
                {slide.primaryCta.label}
              </Button>
            </Link>
            <Link href={slide.secondaryCta.href}>
              <Button
                variant="outline"
                size="lg"
                className="font-semibold bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                {slide.secondaryCta.label}
              </Button>
            </Link>
          </div>

          {/* Quick Search Bar */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 shadow-2xl border border-slate-200 text-slate-900 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
            <div className="relative">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Keyword / Model
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Land Cruiser, GT3, V8..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full h-9 pl-8 pr-3 text-xs rounded-lg border border-slate-200 bg-slate-50 font-medium focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full h-9 px-2.5 text-xs rounded-lg border border-slate-200 bg-slate-50 font-medium focus:bg-white focus:outline-none"
              >
                <option value="all">All Categories ({allVehicles.length})</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name} ({c.count})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Make
              </label>
              <select
                value={selectedMake}
                onChange={(e) => setSelectedMake(e.target.value)}
                className="w-full h-9 px-2.5 text-xs rounded-lg border border-slate-200 bg-slate-50 font-medium focus:bg-white focus:outline-none"
              >
                <option value="all">All Manufacturers</option>
                {makes.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <Link
                href={`/vehicles?search=${encodeURIComponent(search)}&category=${selectedCategory}&make=${selectedMake}`}
                className="w-full"
              >
                <Button variant="primary" className="w-full h-9 text-xs font-bold gap-1.5">
                  <Search className="w-3.5 h-3.5" />
                  Search Vehicles
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Controls */}
      {activeSlides.length > 1 && (
        <>
          {/* Prev / Next arrows */}
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-slate-950/70 text-white flex items-center justify-center backdrop-blur-md hover:bg-amber-500/80 hover:text-slate-950 transition-all"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-slate-950/70 text-white flex items-center justify-center backdrop-blur-md hover:bg-amber-500/80 hover:text-slate-950 transition-all"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dot indicators + play/pause */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
            {activeSlides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrent(idx)}
                className={cn(
                  "transition-all rounded-full",
                  idx === current
                    ? "w-8 h-2 bg-amber-400"
                    : "w-2 h-2 bg-white/50 hover:bg-white/80"
                )}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
            <button
              onClick={() => setPaused((p) => !p)}
              className="ml-2 w-7 h-7 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-all"
              aria-label={paused ? "Play slideshow" : "Pause slideshow"}
            >
              {paused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Slide Counter */}
          <div className="absolute bottom-6 right-6 z-20 text-xs font-bold text-white/60">
            {String(current + 1).padStart(2, "0")} / {String(activeSlides.length).padStart(2, "0")}
          </div>
        </>
      )}
    </section>
  );
}
