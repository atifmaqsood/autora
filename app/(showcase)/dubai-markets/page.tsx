"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Car, ChevronLeft, ChevronRight, Cog, Disc, Layers, Wrench } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { agtpAssets } from "@/src/assets";
import {
  Reveal,
  RevealButton,
  RevealCounter,
  RevealEyebrow,
  RevealHeading,
  RevealStagger,
  RevealText
} from "@/components/ui/scroll-reveal";

const marketCategories = [
  {
    title: "Automotive",
    subtitle: "Vehicles, Parts & Accessories",
    buttonText: "Explore Vehicles",
    href: "/vehicles",
    icon: Car
  },
  {
    title: "Engines",
    subtitle: "Diesel, Petrol & Hybrid",
    buttonText: "Explore Suppliers",
    href: "/spare-parts",
    icon: Cog
  },
  {
    title: "Spare Parts",
    subtitle: "Genuine, OEM & Aftermarket",
    buttonText: "Explore Suppliers",
    href: "/spare-parts",
    icon: Wrench
  },
  {
    title: "Tyres",
    subtitle: "Passenger, Truck & OTR",
    buttonText: "Explore Suppliers",
    href: "/spare-parts",
    icon: Disc
  },
  {
    title: "Body Kits",
    subtitle: "Styling, Protection & Performance",
    buttonText: "Explore Suppliers",
    href: "/spare-parts",
    icon: Layers
  },
  {
    title: "Gear Box",
    subtitle: "Manual, Automatic & CVT",
    buttonText: "Explore Suppliers",
    href: "/spare-parts",
    icon: Cog
  }
];

const stats = [
  { value: 10, suffix: "+", label: "Countries Served" },
  { value: 100, suffix: "+", label: "Verified Suppliers" },
  { value: 27, suffix: "K+", label: "Products Sourced" },
  { value: 7, suffix: "+", label: "Industries" }
];

export default function DubaiMarketsPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [viewMode, setViewMode] = useState<"slider" | "grid">("grid");
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Slider Autoplay
  useEffect(() => {
    if (!isAutoPlaying || viewMode !== "slider") return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % marketCategories.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isAutoPlaying, viewMode]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % marketCategories.length);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + marketCategories.length) % marketCategories.length);
  };

  return (
    <div className="bg-[#060709] pb-24 text-white">
      {/* ── 1. Hero Header Banner matching new design ── */}
      <PageHero
        breadcrumbs={[
          { label: "HOME", href: "/" },
          { label: "DUBAI MARKETS" }
        ]}
        badge={{
          text: "DUBAI TRADE HUB — SOURCING & EXPORT"
        }}
        title="DUBAI EXPORT MARKETS"
        subtitle="Connecting international buyers with verified suppliers across Dubai's premier automotive, spare parts, and general trading hubs."
        imageSrc={agtpAssets.exportPort}
        imageAlt="Dubai Export Trading Hub"
      />

      {/* ── 2. Live Stats Bar ── */}
      <section className="mx-auto max-w-[1570px] px-6 pt-16">
        <Reveal>
          <div className="grid grid-cols-2 gap-5 rounded-[20px] border border-[#315671] bg-[#102941] p-8 shadow-lg md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-[38px] font-black text-[#FDBA74] md:text-[50px]">
                  <RevealCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-1 text-[14px] font-bold text-slate-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── 3. BROWSE BY CATEGORY Section (Slider / Grid) ── */}
      <section className="mx-auto max-w-[1570px] px-6 pt-20">
        <Reveal>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 border-b border-[#24445F] pb-6">
            <div>
              <span className="text-[12px] font-black uppercase tracking-[0.35em] text-[#FDBA74]">BROWSE BY CATEGORY</span>
              <h2 className="text-[32px] font-black text-white md:text-[46px]">SELECT A MARKET TO EXPLORE</h2>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex rounded-full border border-[#315671] bg-[#0B1F33] p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`rounded-full px-4 py-1.5 text-[12px] font-bold transition-all ${
                    viewMode === "grid"
                      ? "bg-[#F97316] text-white shadow-md"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Grid View
                </button>
                <button
                  onClick={() => setViewMode("slider")}
                  className={`rounded-full px-4 py-1.5 text-[12px] font-bold transition-all ${
                    viewMode === "slider"
                      ? "bg-[#F97316] text-white shadow-md"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Categories Slider
                </button>
              </div>

              {viewMode === "slider" && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevSlide}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#315671] bg-[#14314B] text-slate-300 hover:border-[#F97316] hover:text-white transition-colors"
                    aria-label="Previous category"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#315671] bg-[#14314B] text-slate-300 hover:border-[#F97316] hover:text-white transition-colors"
                    aria-label="Next category"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </Reveal>

        {viewMode === "slider" ? (
          <Reveal>
            <div className="space-y-8">
              {/* Category Spotlight Card */}
              <div className="relative overflow-hidden rounded-[28px] border border-[#F97316] bg-gradient-to-b from-[#14314B] via-[#102941] to-[#0B1F33] p-8 md:p-14 shadow-2xl transition-all duration-700">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F97316] via-[#FDBA74] to-[#F97316]" />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#F97316] bg-[#0B1F33] text-[#FDBA74] shadow-[0_0_15px_rgba(249,115,22,0.3)]">
                        {(() => {
                          const Icon = marketCategories[currentSlide].icon;
                          return <Icon className="h-7 w-7 text-[#F97316]" />;
                        })()}
                      </div>
                      <span className="rounded-full border border-[#F97316]/40 bg-[#0B1F33] px-4 py-1 text-[12px] font-black text-[#FDBA74]">
                        DUBAI MARKET HUB
                      </span>
                    </div>

                    <h3 className="text-[32px] font-black text-white md:text-[42px]">
                      {marketCategories[currentSlide].title}
                    </h3>
                    <p className="text-[18px] font-medium text-slate-200">
                      {marketCategories[currentSlide].subtitle}
                    </p>
                  </div>

                  <Link
                    href={marketCategories[currentSlide].href}
                    className="inline-flex h-[56px] shrink-0 items-center justify-center gap-3 rounded-full bg-[#F97316] px-8 text-[16px] font-black text-white transition-colors hover:bg-[#EA580C] shadow-lg hover:shadow-orange-500/20"
                  >
                    <span>{marketCategories[currentSlide].buttonText}</span>
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>

              {/* Slider Dots */}
              <div className="flex items-center justify-center gap-2">
                {marketCategories.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setCurrentSlide(idx);
                    }}
                    className={`h-2.5 rounded-full transition-all ${
                      currentSlide === idx ? "w-8 bg-[#F97316]" : "w-2.5 bg-[#315671]"
                    }`}
                  />
                ))}
              </div>
            </div>
          </Reveal>
        ) : (
          /* Grid View Mode */
          <RevealStagger staggerDelay={80} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
            {marketCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.title}
                  href={cat.href}
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[24px] border border-[#315671] bg-gradient-to-b from-[#14314B] to-[#102941] p-8 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-[#F97316] hover:shadow-orange-500/10"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F97316] via-[#FDBA74] to-[#F97316] opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#315671] bg-[#0B1F33] text-[#F97316] group-hover:border-[#F97316] group-hover:bg-[#14314B] group-hover:shadow-[0_0_15px_rgba(249,115,22,0.25)] transition-all duration-300">
                        <Icon className="h-7 w-7 stroke-[2.2] transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      <span className="rounded-full border border-[#F97316]/40 bg-[#0B1F33] px-3.5 py-1 text-[11px] font-black text-[#FDBA74]">
                        Dubai Hub
                      </span>
                    </div>

                    <h3 className="mt-6 text-[26px] font-black text-white group-hover:text-[#FDBA74] transition-colors">
                      {cat.title}
                    </h3>
                    <p className="mt-2 text-[15px] font-medium text-slate-300">
                      {cat.subtitle}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-[#24445F]/60 flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 text-[14px] font-black text-[#F97316] group-hover:text-[#FDBA74]">
                      {cat.buttonText} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </RevealStagger>
        )}
      </section>

      {/* ── 4. CTA Section ── */}
      <section className="mx-auto max-w-[1570px] px-6 pt-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-[24px] border border-[#315671] bg-gradient-to-br from-[#14314B] to-[#0B1F33] p-10 md:p-16 text-center shadow-2xl">
            <RevealHeading>
              <h2 className="text-[36px] font-black leading-tight text-white md:text-[52px]">
                Looking for a Specific Supplier or Product in Dubai?
              </h2>
            </RevealHeading>
            <RevealText delay={120}>
              <p className="mx-auto mt-4 max-w-xl text-[17px] font-medium text-slate-300">
                Our Dubai-based team will find, inspect, and negotiate the best rates for your target merchandise.
              </p>
            </RevealText>
            <RevealButton delay={180} className="mt-8 flex justify-center">
              <Link
                href="/contact-us"
                className="inline-flex h-[56px] items-center gap-3 rounded-full bg-[#F97316] px-9 text-[16px] font-black text-white transition-colors hover:bg-[#EA580C] shadow-lg hover:shadow-orange-500/20"
              >
                <span>Request Custom Sourcing</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </RevealButton>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
