"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, Filter, Quote, Star, UserCheck } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { VehicleInquiryModal } from "@/components/vehicles/vehicle-inquiry-modal";
import { agtpAssets } from "@/src/assets";
import {
  Reveal,
  RevealButton,
  RevealEyebrow,
  RevealHeading,
  RevealStagger,
  RevealText
} from "@/components/ui/scroll-reveal";

interface CustomerReview {
  id: number;
  name: string;
  role: string;
  company?: string;
  country: string;
  flag: string;
  quote: string;
  tag: string;
  image: any;
}

const reviews: CustomerReview[] = [
  {
    id: 1,
    name: "Mr. Ringo",
    role: "Repeat Vehicle Buyer",
    country: "Congo",
    flag: "🇨🇩",
    quote: "Purchased a fully equipped Toyota Land Cruiser Hardtop without visiting Dubai, marking his 4th vehicle purchase with AGTP Group.",
    tag: "4th Vehicle Purchase",
    image: agtpAssets.reviewR1
  },
  {
    id: 2,
    name: "Mr. Jorge Goncalves",
    role: "Oil & Gas Professional",
    country: "Angola",
    flag: "🇦🇴",
    quote: "Purchased multiple vehicles through our secure online process, with shipments successfully delivered to Angola.",
    tag: "Repeat Oil & Gas Buyer",
    image: agtpAssets.reviewR2
  },
  {
    id: 3,
    name: "Mr. Muhammad Sumani",
    role: "Engineer",
    country: "Ghana",
    flag: "🇬🇭",
    quote: "Completed his vehicle purchase entirely online, with AGTP Group safely exporting and delivering the unit to Ghana.",
    tag: "100% Remote Sourcing",
    image: agtpAssets.reviewR3
  },
  {
    id: 4,
    name: "Mr. Eduardo Conde Salamau",
    role: "Oil & Gas Professional",
    country: "Angola",
    flag: "🇦🇴",
    quote: "Used our secure online payment process while AGTP Group managed the full export and delivery coordination.",
    tag: "Smooth 100% Online Order",
    image: agtpAssets.reviewR4
  },
  {
    id: 5,
    name: "Mr. Samuel Eplanga",
    role: "Oil & Gas Professional",
    country: "Angola",
    flag: "🇦🇴",
    quote: "Referred by colleagues, Mr. Samuel Eplanga completed his purchase online, and we successfully delivered his vehicle to Lobito, Angola with full documentation.",
    tag: "Lobito Delivery",
    image: agtpAssets.reviewR2
  },
  {
    id: 6,
    name: "Mr. Gomes Macaia",
    role: "TOTAL Oil Company",
    country: "Angola",
    flag: "🇦🇴",
    quote: "Mr. Gomes Macaia works in TOTAL Oil Company and was referred to AGTP Group by his colleagues. He completed his purchase through a secure bank transfer, and his vehicle was safely delivered to Angola.",
    tag: "TOTAL Colleague Referral",
    image: agtpAssets.reviewR4
  },
  {
    id: 7,
    name: "Mr. David Ganga",
    role: "Repeat Corporate Buyer",
    country: "Angola",
    flag: "🇦🇴",
    quote: "Mr. David Ganga was referred to AGTP Group by his colleagues and has purchased several vehicles through our secure online payment system. Every shipment has been successfully delivered.",
    tag: "Multiple Fleet Orders",
    image: agtpAssets.reviewR1
  },
  {
    id: 8,
    name: "Ms. Rosa Quinga",
    role: "Business Owner",
    country: "Angola",
    flag: "🇦🇴",
    quote: "Ms. Rosa Quinga found AGTP Group online and helped her father purchase a vehicle from Dubai. After completing payment via bank transfer, we arranged full export and delivery to Angola.",
    tag: "Family Vehicle Sourcing",
    image: agtpAssets.reviewR2
  },
  {
    id: 9,
    name: "Mr. Joao Pedriz",
    role: "UNITEL",
    country: "Angola",
    flag: "🇦🇴",
    quote: "Mr. Joao Pedriz who works in UNITEL has purchased multiple vehicles through AGTP Group. After several successful deliveries to Angola, he and his brother later visited us in Dubai.",
    tag: "UNITEL Corporate Client",
    image: agtpAssets.reviewR3
  },
  {
    id: 10,
    name: "Mwela Tshilumba Ringo",
    role: "Repeat Vehicle Buyer",
    country: "Congo",
    flag: "🇨🇩",
    quote: "Mr. Ringo purchased a fully equipped Toyota Land Cruiser Hardtop through AGTP Group without ever visiting Dubai. This was his 5th vehicle purchase with us.",
    tag: "Land Cruiser Hardtop",
    image: agtpAssets.reviewR1
  },
  {
    id: 11,
    name: "Mr. Simao Chicaia",
    role: "Oil & Gas Professional",
    country: "Angola",
    flag: "🇦🇴",
    quote: "Referred by colleagues, Mr. Simao Chicaia purchased his vehicle using our secure online payment system. AGTP Group handled sourcing, export, and shipping to Angola safely.",
    tag: "Colleague Referral",
    image: agtpAssets.reviewR2
  },
  {
    id: 12,
    name: "Mr. Luis Nzau",
    role: "Oil & Gas Professional",
    country: "Angola",
    flag: "🇦🇴",
    quote: "Mr. Luis Nzau has purchased several vehicles through our secure online payment system, and many of his colleagues have also become our customers. Every shipment was successfully delivered.",
    tag: "Trusted Corporate Partner",
    image: agtpAssets.reviewR4
  },
  {
    id: 13,
    name: "Mr. Kennedy",
    role: "Oil & Gas Professional",
    country: "Angola",
    flag: "🇦🇴",
    quote: "Mr. Kennedy was referred to AGTP Group by his colleagues and completed his vehicle purchase through a secure bank transfer. We managed the entire export process to Angola.",
    tag: "Wire Transfer Order",
    image: agtpAssets.reviewR3
  },
  {
    id: 14,
    name: "Mr. Del Palma",
    role: "Oil & Gas Professional",
    country: "Angola",
    flag: "🇦🇴",
    quote: "Mr. Del Palma was referred to AGTP Group by company colleagues and completed his purchase through a secure bank transfer. His vehicle was safely delivered to Angola.",
    tag: "Company Colleague Referral",
    image: agtpAssets.reviewR1
  },
  {
    id: 15,
    name: "Mr. Alvaro",
    role: "Oil & Gas Professional",
    country: "Angola",
    flag: "🇦🇴",
    quote: "Mr. Alvaro was referred to AGTP Group by his colleagues and completed his purchase through a secure bank transfer. We managed sourcing and international shipment to Angola.",
    tag: "International Port Shipment",
    image: agtpAssets.reviewR4
  }
];

const reviewStats = [
  { value: "11+", label: "Years in Trade" },
  { value: "10,000+", label: "Vehicles & Parts Exported" },
  { value: "25+", label: "Countries Served Worldwide" },
  { value: "100%", label: "Verified Port Delivery" }
];

const countries = ["ALL", "Angola", "Congo", "Ghana"];

export default function CustomerReviewsPage() {
  const [selectedCountry, setSelectedCountry] = useState("ALL");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [viewMode, setViewMode] = useState<"slider" | "grid">("grid");
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);

  const filteredReviews = useMemo(() => {
    if (selectedCountry === "ALL") return reviews;
    return reviews.filter((r) => r.country.toLowerCase() === selectedCountry.toLowerCase());
  }, [selectedCountry]);

  // Reset slide index on country change
  useEffect(() => {
    setCurrentSlide(0);
  }, [selectedCountry]);

  // Autoplay Slider
  useEffect(() => {
    if (!isAutoPlaying || viewMode !== "slider" || filteredReviews.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % filteredReviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, viewMode, filteredReviews.length]);

  const nextReview = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % filteredReviews.length);
  };

  const prevReview = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + filteredReviews.length) % filteredReviews.length);
  };

  return (
    <div className="bg-[#060709] pb-24 text-white">
      {/* ── 1. Hero Header Banner ── */}
      <PageHero
        breadcrumbs={[
          { label: "HOME", href: "/" },
          { label: "CUSTOMER REVIEWS" }
        ]}
        badge={{
          text: "VERIFIED BUYERS & CLIENT FEEDBACK"
        }}
        title="CUSTOMER REVIEWS"
        subtitle="Meet customers from around the world who chose AGTP Group for their vehicles and automotive spare parts."
        imageSrc={agtpAssets.aboutYard}
        imageAlt="AGTP Group Customer Delivery Yard"
      />

      {/* ── 2. Live Stats Section ── */}
      <section className="mx-auto max-w-[1570px] px-6 pt-16">
        <Reveal>
          <div className="grid grid-cols-2 gap-5 rounded-[20px] border border-[#315671] bg-[#102941] p-8 shadow-lg md:grid-cols-4">
            {reviewStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-[36px] font-black text-[#FDBA74] md:text-[46px]">{stat.value}</div>
                <div className="mt-1 text-[13px] font-semibold text-slate-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── 3. Filters & View Mode Selector ── */}
      <section className="mx-auto max-w-[1570px] px-6 pt-12">
        <Reveal>
          <div className="flex flex-col gap-5 rounded-2xl border border-[#315671] bg-[#102941] p-5 shadow-xl md:flex-row md:items-center md:justify-between">
            {/* Country Filters */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="flex items-center gap-2 text-[12px] font-black uppercase tracking-wider text-[#FDBA74] mr-2">
                <Filter className="h-4 w-4 text-[#F97316]" />
                Filter By Destination:
              </span>
              {countries.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCountry(c)}
                  className={`rounded-full px-4 py-2 text-[12px] font-black transition-all ${
                    selectedCountry.toLowerCase() === c.toLowerCase()
                      ? "bg-[#F97316] text-white shadow-md"
                      : "border border-[#315671] bg-[#14314B] text-slate-300 hover:border-[#F97316] hover:text-white"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* View Mode Switcher (Grid vs Slider) */}
            <div className="flex items-center gap-3 self-end md:self-auto">
              <div className="flex rounded-full border border-[#315671] bg-[#14314B] p-1 text-[12px] font-black">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`rounded-full px-4 py-1.5 transition-all ${
                    viewMode === "grid"
                      ? "bg-[#F97316] text-white shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Grid Gallery
                </button>
                <button
                  onClick={() => setViewMode("slider")}
                  className={`rounded-full px-4 py-1.5 transition-all ${
                    viewMode === "slider"
                      ? "bg-[#F97316] text-white shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Slider Spotlight
                </button>
              </div>

              {viewMode === "slider" && filteredReviews.length > 1 && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevReview}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#315671] bg-[#14314B] text-slate-300 hover:border-[#F97316] hover:text-white transition-colors"
                    aria-label="Previous review"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextReview}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#315671] bg-[#14314B] text-slate-300 hover:border-[#F97316] hover:text-white transition-colors"
                    aria-label="Next review"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── 4. Reviews Content (Full Vertical Image matching Home Page Customer Stories) ── */}
      <section className="mx-auto max-w-[1570px] px-6 pt-10">
        {viewMode === "grid" ? (
          /* Grid View Mode */
          <div>
            <div className="mb-6 flex items-center justify-between">
              <span className="text-[13px] font-semibold text-slate-400">
                Showing <strong className="text-white">{filteredReviews.length}</strong> verified customer stories
              </span>
            </div>

            <RevealStagger staggerDelay={70} className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
              {filteredReviews.map((rev) => (
                <div
                  key={`${rev.id}-${rev.name}`}
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[24px] border border-[#315671] bg-[#14314B] shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-[#F97316] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F97316] via-[#FDBA74] to-[#F97316] opacity-0 group-hover:opacity-100 transition-opacity z-20" />

                  <div>
                    {/* Full Vertical Customer & Vehicle Delivery Photo (matching home page h-[460px]) */}
                    {rev.image && (
                      <div className="relative h-[460px] w-full shrink-0 overflow-hidden bg-[#06101C]">
                        <Image
                          src={rev.image}
                          alt={`${rev.name} - ${rev.tag}`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#14314B] via-transparent to-transparent" />
                        
                        {/* Country Badge */}
                        <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full border border-white/20 bg-[#0B1F33]/85 backdrop-blur-md px-3.5 py-1 text-[11px] font-black text-[#FDBA74]">
                          <span>{rev.country}</span>
                          <span>{rev.flag}</span>
                        </span>

                        {/* Customer Story / Tag Badge */}
                        <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-[#0B1F33]/85 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-white backdrop-blur-md">
                          Customer Story
                        </span>

                        {/* Tag Badge */}
                        <span className="absolute bottom-4 left-4 rounded-full border border-[#F97316]/50 bg-[#0B1F33]/90 backdrop-blur-md px-3 py-1 text-[11px] font-black text-[#FDBA74]">
                          {rev.tag}
                        </span>
                      </div>
                    )}

                    <div className="p-6 sm:p-7 space-y-4 bg-[#14314B]">
                      <div className="flex items-center justify-between border-b border-[#24445F]/60 pb-3">
                        <div className="flex gap-1 text-[#F97316]">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-[#F97316]" />
                          ))}
                        </div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Verified Buyer
                        </span>
                      </div>

                      <div className="flex items-start gap-3">
                        <span className="mt-1 h-7 w-1.5 shrink-0 rounded-full bg-[#F97316]" />
                        <div>
                          <h3 className="text-[18px] font-black leading-tight text-white group-hover:text-[#FDBA74] transition-colors">
                            {rev.name}
                          </h3>
                          <p className="mt-0.5 text-[11px] font-black uppercase tracking-[0.15em] text-[#FDBA74]">
                            {rev.role}
                          </p>
                        </div>
                      </div>

                      <Quote className="h-7 w-7 text-[#F97316]/40 group-hover:text-[#F97316] transition-colors" />

                      <p className="text-[14px] sm:text-[15px] font-medium leading-relaxed text-slate-200">
                        &ldquo;{rev.quote}&rdquo;
                      </p>
                    </div>
                  </div>

                  <div className="p-6 sm:p-7 pt-0 bg-[#14314B]">
                    <div className="pt-4 border-t border-[#24445F]/60 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                        <span className="h-2 w-2 rounded-full bg-emerald-400" />
                        <span>Delivery Confirmed</span>
                      </div>
                      <UserCheck className="h-6 w-6 text-[#F97316] shrink-0" />
                    </div>
                  </div>
                </div>
              ))}
            </RevealStagger>
          </div>
        ) : (
          /* Slider Spotlight View Mode */
          <Reveal>
            <div className="space-y-6">
              <div className="relative overflow-hidden rounded-[28px] border border-[#F97316] bg-[#14314B] p-8 md:p-12 shadow-2xl transition-all duration-700">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F97316] via-[#FDBA74] to-[#F97316]" />

                <div className="grid grid-cols-1 gap-8 md:grid-cols-12 items-center">
                  {filteredReviews[currentSlide].image && (
                    <div className="relative h-[460px] md:h-[500px] w-full overflow-hidden rounded-2xl border border-[#315671] bg-[#06101C] md:col-span-5">
                      <Image
                        src={filteredReviews[currentSlide].image}
                        alt={filteredReviews[currentSlide].name}
                        fill
                        className="object-cover object-center"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#14314B] via-transparent to-transparent" />
                      <span className="absolute bottom-4 left-4 rounded-full bg-[#0B1F33]/90 backdrop-blur-sm border border-[#F97316]/60 px-3.5 py-1 text-[12px] font-black text-[#FDBA74]">
                        {filteredReviews[currentSlide].tag}
                      </span>
                      <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-[#0B1F33]/85 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-white backdrop-blur-md">
                        Customer Story
                      </span>
                    </div>
                  )}

                  <div className={`flex flex-col gap-5 ${filteredReviews[currentSlide].image ? "md:col-span-7" : "md:col-span-12"}`}>
                    <div className="flex items-center justify-between border-b border-[#24445F]/80 pb-4">
                      <div className="flex items-center gap-2 text-[#F97316]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-[#F97316]" />
                        ))}
                      </div>
                      <span className="flex items-center gap-2 rounded-full border border-[#F97316]/50 bg-[#0B1F33] px-4 py-1.5 text-[13px] font-black text-[#FDBA74]">
                        <span>{filteredReviews[currentSlide].country}</span>
                        <span>{filteredReviews[currentSlide].flag}</span>
                      </span>
                    </div>

                    <Quote className="h-9 w-9 text-[#F97316]/40" />

                    <p className="text-[17px] font-medium leading-relaxed text-slate-100 md:text-[20px]">
                      &ldquo;{filteredReviews[currentSlide].quote}&rdquo;
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-[#24445F]/80">
                      <div>
                        <h3 className="text-[22px] font-black text-white">
                          {filteredReviews[currentSlide].name}
                        </h3>
                        <p className="text-[14px] font-semibold text-slate-400">
                          {filteredReviews[currentSlide].role} • <span className="text-[#FDBA74]">{filteredReviews[currentSlide].tag}</span>
                        </p>
                      </div>
                      <UserCheck className="h-8 w-8 text-[#F97316]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Slide Indicators */}
              <div className="flex items-center justify-center gap-2 pt-2">
                {filteredReviews.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setCurrentSlide(idx);
                    }}
                    className={`h-2.5 rounded-full transition-all ${
                      currentSlide === idx ? "w-8 bg-[#F97316]" : "w-2.5 bg-[#315671]"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </Reveal>
        )}
      </section>

      {/* ── 5. Immersive Hero-Style Bottom CTA Banner with Lightened Overlay & High-Contrast Buttons ── */}
      <section className="mx-auto max-w-[1570px] px-6 pt-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] border border-[#315671] shadow-2xl">
            {/* Background Image */}
            <div className="absolute inset-0 -z-10">
              <Image
                src={agtpAssets.inventoryHero}
                alt="AGTP Group Global Sourcing"
                fill
                className="object-cover object-center brightness-105"
                sizes="(max-width: 1570px) 100vw, 1570px"
              />
              {/* Lightened soft overlay so background car image is clearly visible */}
              <div className="absolute inset-0 bg-black/25" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33]/70 via-transparent to-[#0B1F33]/60" />
            </div>

            <div className="relative z-10 px-8 py-16 text-center sm:px-12 md:py-24 lg:py-28">
              <RevealEyebrow>
                <div className="inline-flex items-center gap-3 text-[12px] font-black uppercase tracking-[0.35em] text-[#FDBA74]">
                  <span className="h-px w-8 bg-[#F97316]" />
                  TRUSTED ACROSS BORDERS
                  <span className="h-px w-8 bg-[#F97316]" />
                </div>
              </RevealEyebrow>

              <RevealHeading>
                <h2 className="mx-auto mt-4 max-w-4xl text-[34px] font-black uppercase leading-tight tracking-tight text-white sm:text-[46px] md:text-[56px] lg:text-[64px] drop-shadow-md">
                  Buy From Dubai With Confidence
                </h2>
              </RevealHeading>

              <RevealText delay={120}>
                <p className="mx-auto mt-6 max-w-3xl text-[16px] font-semibold leading-relaxed text-slate-100 sm:text-[18px] drop-shadow">
                  Customers around the world choose AGTP Group for vehicles and automotive spare parts, with clear communication, reliable service, and support throughout the purchasing process.
                </p>
              </RevealText>

              <RevealButton delay={180} className="mt-10 flex flex-wrap justify-center gap-4">
                <button
                  type="button"
                  onClick={() => setInquiryModalOpen(true)}
                  className="inline-flex h-[56px] items-center gap-3 rounded-full bg-[#F97316] px-10 text-[16px] font-black text-white transition-all duration-300 hover:bg-[#EA580C] shadow-xl hover:scale-105"
                >
                  <span>Get A Quote</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
                <Link
                  href="/vehicles"
                  className="inline-flex h-[56px] items-center rounded-full border border-[#315671] bg-[#102941]/90 backdrop-blur-md px-10 text-[16px] font-black text-white transition-all duration-300 hover:border-[#F97316] hover:bg-[#F97316] hover:text-white hover:scale-105 shadow-xl"
                >
                  Explore Vehicles
                </Link>
              </RevealButton>
            </div>
          </div>
        </Reveal>
      </section>

      <VehicleInquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
      />
    </div>
  );
}
