"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Filter, Quote, Star, UserCheck } from "lucide-react";
import { ParallaxImage } from "@/components/ui/parallax-image";
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
    quote: "Mr. Ringo purchased a fully equipped Toyota Land Cruiser entirely online without ever visiting Dubai. This marks his 5th successful vehicle purchase with AGTP Group, reflecting the trust and confidence he continues to place in our services.",
    tag: "5th Vehicle Purchase",
    image: agtpAssets.suvs
  },
  {
    id: 2,
    name: "Mr. Muhammad Sumani",
    role: "Engineer",
    country: "Ghana",
    flag: "🇬🇭",
    quote: "Referred by colleagues, Mr. Muhammad Sumani completed his vehicle purchase entirely online. AGTP Group safely exported and delivered it to Ghana, making the entire buying experience simple and hassle-free.",
    tag: "100% Remote Sourcing",
    image: agtpAssets.exportPort
  },
  {
    id: 3,
    name: "Mr. Samuel Eplanga",
    role: "Oil & Gas Professional",
    country: "Angola",
    flag: "🇦🇴",
    quote: "Referred by colleagues, Mr. Samuel Eplanga completed his purchase online, and we successfully delivered his vehicle to Lobito, Angola with full documentation.",
    tag: "Lobito Delivery",
    image: agtpAssets.pickups
  },
  {
    id: 4,
    name: "Mr. Gomes Macaia",
    role: "TOTAL Oil Company",
    country: "Angola",
    flag: "🇦🇴",
    quote: "Mr. Gomes Macaia works in TOTAL Oil Company and was referred to AGTP Group by his colleagues. He completed his purchase through a secure bank transfer, and his vehicle was safely delivered to Angola.",
    tag: "TOTAL Colleague Referral",
    image: agtpAssets.bmw760Card
  },
  {
    id: 5,
    name: "Mr. David Ganga",
    role: "Repeat Corporate Buyer",
    country: "Angola",
    flag: "🇦🇴",
    quote: "Mr. David Ganga was referred to AGTP Group by his colleagues and has purchased several vehicles through our secure online payment system. Every shipment has been successfully delivered.",
    tag: "Multiple Fleet Orders",
    image: agtpAssets.cadillacEscaladeCard
  },
  {
    id: 6,
    name: "Ms. Rosa Quinga",
    role: "Business Owner",
    country: "Angola",
    flag: "🇦🇴",
    quote: "Ms. Rosa Quinga found AGTP Group online and helped her father purchase a vehicle from Dubai. After completing payment via bank transfer, we arranged full export and delivery to Angola.",
    tag: "Family Vehicle Sourcing",
    image: agtpAssets.bmwX2Card
  },
  {
    id: 7,
    name: "Mr. Eduardo Conde Salamau",
    role: "Oil & Gas Professional",
    country: "Angola",
    flag: "🇦🇴",
    quote: "Mr. Eduardo Conde Salamau was referred by colleagues. He completed his purchase using our secure online payment system, and we managed the entire export process smoothly.",
    tag: "Smooth 100% Online Order",
    image: agtpAssets.bydDestroyerCard
  },
  {
    id: 8,
    name: "Mr. Joao Pedriz",
    role: "UNITEL",
    country: "Angola",
    flag: "🇦🇴",
    quote: "Mr. Joao Pedriz who works in UNITEL has purchased multiple vehicles through AGTP Group. After several successful deliveries to Angola, he and his brother later visited us in Dubai.",
    tag: "UNITEL Corporate Client",
    image: agtpAssets.mercedesCclassCard
  },
  {
    id: 9,
    name: "Mwela Tshilumba Ringo",
    role: "Repeat Vehicle Buyer",
    country: "Congo",
    flag: "🇨🇩",
    quote: "Mr. Ringo purchased a fully equipped Toyota Land Cruiser Hardtop through AGTP Group without ever visiting Dubai. This was his 4th vehicle purchase with us.",
    tag: "Land Cruiser Hardtop",
    image: agtpAssets.heroYard
  },
  {
    id: 10,
    name: "Mr. Simao Chicaia",
    role: "Oil & Gas Professional",
    country: "Angola",
    flag: "🇦🇴",
    quote: "Referred by colleagues, Mr. Simao Chicaia purchased his vehicle using our secure online payment system. AGTP Group handled sourcing, export, and shipping to Angola safely.",
    tag: "Colleague Referral",
    image: agtpAssets.sedans
  },
  {
    id: 11,
    name: "Mr. Jorge Goncalves",
    role: "Oil & Gas Professional",
    country: "Angola",
    flag: "🇦🇴",
    quote: "Mr. Jorge Goncalves has purchased multiple vehicles through our secure online process and many of his colleagues have also trusted us. Every shipment was successfully delivered.",
    tag: "Repeat Oil & Gas Buyer",
    image: agtpAssets.aboutHero
  },
  {
    id: 12,
    name: "Mr. Luis Nzau",
    role: "Oil & Gas Professional",
    country: "Angola",
    flag: "🇦🇴",
    quote: "Mr. Luis Nzau has purchased several vehicles through our secure online payment system, and many of his colleagues have also become our customers. Every shipment was successfully delivered.",
    tag: "Trusted Corporate Partner",
    image: agtpAssets.contactHero
  },
  {
    id: 13,
    name: "Mr. Kennedy",
    role: "Oil & Gas Professional",
    country: "Angola",
    flag: "🇦🇴",
    quote: "Mr. Kennedy was referred to AGTP Group by his colleagues and completed his vehicle purchase through a secure bank transfer. We managed the entire export process to Angola.",
    tag: "Wire Transfer Order",
    image: agtpAssets.inventoryHero
  },
  {
    id: 14,
    name: "Mr. Del Palma",
    role: "Oil & Gas Professional",
    country: "Angola",
    flag: "🇦🇴",
    quote: "Mr. Del Palma was referred to AGTP Group by company colleagues and completed his purchase through a secure bank transfer. His vehicle was safely delivered to Angola.",
    tag: "Company Colleague Referral",
    image: agtpAssets.vans
  },
  {
    id: 15,
    name: "Mr. Alvaro",
    role: "Oil & Gas Professional",
    country: "Angola",
    flag: "🇦🇴",
    quote: "Mr. Alvaro was referred to AGTP Group by his colleagues and completed his purchase through a secure bank transfer. We managed sourcing and international shipment to Angola.",
    tag: "International Port Shipment",
    image: agtpAssets.exportPort
  }
];

const reviewStats = [
  { value: "15+", label: "Verified Buyer Stories" },
  { value: "1k+", label: "Vehicles & Parts Exported" },
  { value: "25+", label: "Countries Served Worldwide" },
  { value: "100%", label: "Verified Port Delivery" }
];

const countries = ["ALL", "Angola", "Congo", "Ghana"];

export default function CustomerReviewsPage() {
  const [selectedCountry, setSelectedCountry] = useState("ALL");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [viewMode, setViewMode] = useState<"slider" | "grid">("slider");
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

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
    <div className="bg-[#0B1F33] pb-24 text-white">
      {/* ── 1. Hero Header Banner with Background Image & Parallax ── */}
      <section className="relative min-h-[440px] bg-[#081A2B] border-b border-slate-800/80 overflow-hidden flex flex-col justify-center pt-40 pb-16">
        <ParallaxImage
          src={agtpAssets.aboutHero}
          alt="Customer Reviews Header"
          overlayOpacity="opacity-55"
          speed={0.25}
          className="absolute inset-0 w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#081A2B]/95 via-[#081A2B]/75 to-transparent z-10" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <RevealEyebrow>
            <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest text-slate-400 uppercase">
              <Link href="/" className="hover:text-white transition-colors">HOME</Link>
              <span>/</span>
              <span className="text-[#F97316]">CUSTOMER REVIEWS</span>
            </div>
          </RevealEyebrow>

          <RevealEyebrow delay={100}>
            <div className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.28em] text-[#FDBA74]">
              <span className="h-px w-9 bg-[#F97316]" />
              CLIENT TRUST & TESTIMONIALS
            </div>
          </RevealEyebrow>

          <RevealHeading delay={150}>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white font-sans max-w-4xl leading-none drop-shadow-lg">
              CUSTOMER REVIEWS
            </h1>
          </RevealHeading>

          <RevealText delay={200}>
            <p className="text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed drop-shadow-md">
              Hear directly from international buyers, engineers, oil & gas professionals, and corporate partners who source vehicles through AGTP Group.
            </p>
          </RevealText>
        </div>
      </section>

      {/* ── 2. Live Stats Section ── */}
      <section className="mx-auto max-w-[1570px] px-6 pt-16">
        <Reveal>
          <div className="grid grid-cols-2 gap-5 rounded-[20px] border border-[#315671] bg-[#102941] p-8 shadow-lg md:grid-cols-4">
            {reviewStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-[38px] font-black text-[#FDBA74] md:text-[50px]">{stat.value}</div>
                <div className="mt-1 text-[14px] font-bold text-slate-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── 3. Country Filter & View Switcher Bar ── */}
      <section className="mx-auto max-w-[1570px] px-6 pt-12">
        <Reveal>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 rounded-2xl border border-[#315671] bg-[#102941] p-4 shadow-xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-2 text-[12px] font-black uppercase tracking-wider text-[#FDBA74] mr-2">
                <Filter className="h-4 w-4 text-[#F97316]" />
                Filter By Country:
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
                  {c === "ALL" ? "All Countries" : c}
                </button>
              ))}
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center gap-3">
              <div className="flex rounded-full border border-[#315671] bg-[#0B1F33] p-1">
                <button
                  onClick={() => setViewMode("slider")}
                  className={`rounded-full px-4 py-1.5 text-[12px] font-bold transition-all ${
                    viewMode === "slider"
                      ? "bg-[#F97316] text-white shadow-md"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Testimonials Slider
                </button>
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

      {/* ── 4. Reviews Content (Slider vs Grid) ── */}
      <section className="mx-auto max-w-[1570px] px-6 pt-10">
        {viewMode === "slider" && filteredReviews.length > 0 ? (
          /* Testimonials Slider Spotlight */
          <Reveal>
            <div className="space-y-6">
              <div className="relative overflow-hidden rounded-[28px] border border-[#F97316] bg-gradient-to-b from-[#14314B] via-[#102941] to-[#0B1F33] p-8 md:p-14 shadow-2xl transition-all duration-700">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F97316] via-[#FDBA74] to-[#F97316]" />

                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between border-b border-[#24445F]/80 pb-6">
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

                  <Quote className="h-10 w-10 text-[#F97316]/40" />

                  <p className="text-[18px] font-medium leading-relaxed text-slate-100 md:text-[22px]">
                    &quot;{filteredReviews[currentSlide].quote}&quot;
                  </p>

                  <div className="flex items-center justify-between pt-6 border-t border-[#24445F]/80">
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
        ) : (
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
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[24px] border border-[#315671] bg-gradient-to-b from-[#14314B] to-[#102941] p-8 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-[#F97316] hover:shadow-orange-500/10"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F97316] via-[#FDBA74] to-[#F97316] opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div>
                    <div className="flex items-center justify-between border-b border-[#24445F]/60 pb-4">
                      <div className="flex gap-1 text-[#F97316]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-[#F97316]" />
                        ))}
                      </div>
                      <span className="flex items-center gap-1.5 rounded-full border border-[#F97316]/40 bg-[#0B1F33] px-3.5 py-1 text-[12px] font-black text-[#FDBA74]">
                        <span>{rev.country}</span>
                        <span>{rev.flag}</span>
                      </span>
                    </div>

                    <Quote className="mt-5 h-8 w-8 text-[#F97316]/30 group-hover:text-[#F97316]/60 transition-colors" />

                    <p className="mt-2 text-[15px] font-medium leading-relaxed text-slate-200">
                      &quot;{rev.quote}&quot;
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-[#24445F]/60 flex items-center justify-between">
                    <div>
                      <h3 className="text-[19px] font-black text-white group-hover:text-[#FDBA74] transition-colors">
                        {rev.name}
                      </h3>
                      <p className="text-[13px] font-semibold text-slate-400">
                        {rev.role} • <span className="text-[#FDBA74]">{rev.tag}</span>
                      </p>
                    </div>
                    <UserCheck className="h-6 w-6 text-[#F97316] shrink-0" />
                  </div>
                </div>
              ))}
            </RevealStagger>
          </div>
        )}
      </section>

      {/* ── 5. Trust & Remote Sourcing Banner ── */}
      <section className="mx-auto max-w-[1570px] px-6 pt-24">
        <Reveal>
          <div className="rounded-[24px] border border-[#315671] bg-[#102941] p-8 md:p-14 shadow-xl text-center">
            <RevealEyebrow>
              <div className="inline-flex items-center gap-3 text-[12px] font-black uppercase tracking-[0.35em] text-[#FDBA74]">
                <span className="h-px w-8 bg-[#F97316]" />
                SECURE REMOTE PURCHASING
              </div>
            </RevealEyebrow>

            <RevealHeading>
              <h2 className="mt-4 text-[32px] font-black text-white md:text-[46px]">
                Buy From Dubai With Complete Peace of Mind
              </h2>
            </RevealHeading>

            <RevealText delay={120}>
              <p className="mx-auto mt-4 max-w-2xl text-[16px] font-medium leading-relaxed text-slate-300">
                Over 90% of our international clients complete their vehicle and trade sourcing orders online, relying on our inspection photos, SWIFT payment verification, and guaranteed shipment tracking.
              </p>
            </RevealText>

            <RevealButton delay={180} className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/get-a-quote"
                className="inline-flex h-[56px] items-center gap-3 rounded-full bg-[#F97316] px-9 text-[16px] font-black text-white transition-colors hover:bg-[#EA580C] shadow-lg hover:shadow-orange-500/20"
              >
                <span>Start Your Order</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/contact-us"
                className="inline-flex h-[56px] items-center rounded-full border border-[#315671] px-9 text-[16px] font-black text-white transition-colors hover:border-[#F97316] hover:bg-[#14314B]"
              >
                Speak to Sales Team
              </Link>
            </RevealButton>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
