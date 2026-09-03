"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Camera,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  FileCheck,
  Headphones,
  Play,
  Search,
  Ship,
  Video,
  Volume2
} from "lucide-react";
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

const steps = [
  {
    number: "01",
    title: "Tell Us What You Need",
    description: "Share the vehicle or spare parts you’re looking for, along with quantity and destination.",
    icon: Search,
    tag: "Inquiry & Specs"
  },
  {
    number: "02",
    title: "Receive Your Quote",
    description: "Get a clear quotation with product details, pricing, and available delivery options.",
    icon: FileCheck,
    tag: "Clear Quotation"
  },
  {
    number: "03",
    title: "Confirm Your Order",
    description: "Approve the quotation and confirm your purchase with AGTP Group.",
    icon: CheckCircle2,
    tag: "Order Confirmation"
  },
  {
    number: "04",
    title: "Pre-Shipment Approval",
    description: "Receive product photos and videos where applicable before your order is prepared for shipment.",
    icon: Camera,
    tag: "Photo & Video Check"
  },
  {
    number: "05",
    title: "Export & Shipping",
    description: "We prepare the required export documentation and arrange shipment to your destination.",
    icon: Ship,
    tag: "Global Logistics"
  },
  {
    number: "06",
    title: "After-Sales Support",
    description: "Our team remains available to assist you with your order and delivery after the purchase.",
    icon: Headphones,
    tag: "Dedicated Support"
  }
];

export default function HowItWorksPage() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"slider" | "grid">("grid");
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);

  // Slider Autoplay
  useEffect(() => {
    if (!isAutoPlaying || viewMode !== "slider") return;
    const timer = setInterval(() => {
      setCurrentStepIndex((prev) => (prev + 1) % steps.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isAutoPlaying, viewMode]);

  const nextStep = () => {
    setIsAutoPlaying(false);
    setCurrentStepIndex((prev) => (prev + 1) % steps.length);
  };

  const prevStep = () => {
    setIsAutoPlaying(false);
    setCurrentStepIndex((prev) => (prev - 1 + steps.length) % steps.length);
  };

  return (
    <div className="bg-[#060709] pb-24 text-white">
      {/* ── 1. Hero Header Banner ── */}
      <PageHero
        breadcrumbs={[
          { label: "HOME", href: "/" },
          { label: "HOW IT WORKS" }
        ]}
        badge={{
          text: "FROM INQUIRY TO DELIVERY"
        }}
        title="YOUR AGTP BUYING JOURNEY"
        subtitle="A Simple, Transparent Process for Buying Vehicles & Automotive Spare Parts"
        imageSrc={agtpAssets.exportPort}
        imageAlt="AGTP Group Export Port Shipping"
      />

      {/* ── 2. 6 Steps Process Section (Grid View by Default with High-Contrast Count on Hover) ── */}
      <section className="mx-auto max-w-[1570px] px-6 pt-20">
        <Reveal>
          <div className="rounded-[32px] border border-[#315671] bg-[#102941] p-8 md:p-14 shadow-2xl">
            {/* Section Header & View Controls */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 border-b border-[#24445F] pb-8">
              <div>
                <div className="inline-flex items-center gap-3 text-[12px] font-black uppercase tracking-[0.35em] text-[#FDBA74]">
                  <span className="h-px w-8 bg-[#F97316]" />
                  STEP-BY-STEP PROCESS
                  <span className="h-px w-8 bg-[#F97316]" />
                </div>
                <h2 className="mt-3 text-[32px] font-black text-white md:text-[46px] uppercase tracking-tight">
                  6 Steps to Your Order
                </h2>
              </div>

              {/* View Switcher & Slider Controls */}
              <div className="flex items-center gap-3">
                <div className="flex rounded-full border border-[#315671] bg-[#0B1F33] p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`rounded-full px-5 py-2 text-[12px] font-black transition-all ${
                      viewMode === "grid"
                        ? "bg-white text-slate-950 shadow-md"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Grid View
                  </button>
                  <button
                    onClick={() => setViewMode("slider")}
                    className={`rounded-full px-5 py-2 text-[12px] font-black transition-all ${
                      viewMode === "slider"
                        ? "bg-white text-slate-950 shadow-md"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Interactive Slider
                  </button>
                </div>

                {viewMode === "slider" && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={prevStep}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-[#315671] bg-[#14314B] text-slate-300 hover:border-[#F97316] hover:text-white transition-colors"
                      aria-label="Previous step"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextStep}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-[#315671] bg-[#14314B] text-slate-300 hover:border-[#F97316] hover:text-white transition-colors"
                      aria-label="Next step"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {viewMode === "grid" ? (
              /* ── UNIQUE 6-STEP GRID LAYOUT ── */
              <RevealStagger staggerDelay={80} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
                {steps.map((step) => {
                  const Icon = step.icon;
                  return (
                    <div
                      key={step.number}
                      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[24px] border border-[#315671] bg-gradient-to-b from-[#14314B] to-[#0B1F33] p-8 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-white/40 hover:shadow-2xl"
                    >
                      {/* Top Accent Line */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                      <div>
                        {/* Header: Prominent Number Tile + Phase Tag + Prominent Icon Tile */}
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3.5">
                            {/* Prominent Number Tile */}
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border-2 border-white/20 bg-white/[0.08] shadow-inner backdrop-blur-md transition-all duration-300 group-hover:scale-105 group-hover:border-white/40 group-hover:bg-white/[0.16]">
                              <span className="font-[family-name:var(--font-sora)] text-[26px] font-black tracking-tight text-white">
                                {step.number}
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[10px] font-black uppercase tracking-[0.22em] text-slate-400">
                                Phase
                              </span>
                              <span className="text-[13px] font-black text-white">
                                {step.tag}
                              </span>
                            </div>
                          </div>

                          {/* Prominent Icon Tile */}
                          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border-2 border-white/20 bg-white/[0.08] text-white shadow-inner backdrop-blur-md transition-all duration-300 group-hover:scale-105 group-hover:border-white/40 group-hover:bg-white/[0.16]">
                            <Icon className="h-8 w-8 stroke-[2.2]" />
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="mt-7 text-[22px] font-black text-white transition-colors leading-snug">
                          {step.title}
                        </h3>

                        {/* Description */}
                        <p className="mt-3 text-[15px] font-medium leading-relaxed text-slate-300">
                          {step.description}
                        </p>
                      </div>

                      {/* Card Footer Indicator */}
                      <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-between">
                        <span className="text-[12px] font-black tracking-wider text-slate-400 uppercase">
                          Step <strong className="text-white">{step.number}</strong> of 06
                        </span>
                        <div className="flex items-center gap-1.5 text-[13px] font-black text-white">
                          <span>Verified Process</span>
                          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </RevealStagger>
            ) : (
              /* ── INTERACTIVE SLIDER VIEW ── */
              <div className="space-y-8">
                {/* Active Spotlight Step Card */}
                <div className="relative overflow-hidden rounded-[24px] border border-white/20 bg-gradient-to-b from-[#14314B] via-[#102941] to-[#0B1F33] p-8 md:p-12 shadow-2xl transition-all duration-700">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <span className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-white/20 bg-white/[0.08] text-[26px] font-black text-white shadow-xl backdrop-blur-md">
                          {steps[currentStepIndex].number}
                        </span>
                        <span className="rounded-full border border-white/15 bg-white/[0.05] px-4 py-1.5 text-[12px] font-black uppercase tracking-[0.16em] text-slate-300">
                          STEP {currentStepIndex + 1} OF 6 • {steps[currentStepIndex].tag}
                        </span>
                      </div>

                      <h3 className="text-[28px] font-black text-white md:text-[38px]">
                        {steps[currentStepIndex].title}
                      </h3>
                      <p className="max-w-2xl text-[16px] font-medium leading-relaxed text-slate-200 md:text-[18px]">
                        {steps[currentStepIndex].description}
                      </p>
                    </div>

                    <div className="hidden md:flex h-28 w-28 shrink-0 items-center justify-center rounded-3xl border-2 border-white/20 bg-white/[0.08] text-white shadow-2xl backdrop-blur-md">
                      {(() => {
                        const Icon = steps[currentStepIndex].icon;
                        return <Icon className="h-14 w-14 stroke-[2.2] text-white" />;
                      })()}
                    </div>
                  </div>
                </div>

                {/* Step Selector Pills */}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                  {steps.map((step, idx) => (
                    <button
                      key={step.number}
                      onClick={() => {
                        setIsAutoPlaying(false);
                        setCurrentStepIndex(idx);
                      }}
                      className={`flex flex-col items-center justify-center rounded-2xl border p-4 text-center transition-all ${
                        currentStepIndex === idx
                          ? "border-[#F97316] bg-[#14314B] text-white shadow-lg scale-105"
                          : "border-[#315671]/60 bg-[#0B1F33]/80 text-slate-400 hover:border-slate-600 hover:text-white"
                      }`}
                    >
                      <span className={`flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-black mb-1.5 ${
                        currentStepIndex === idx ? "bg-[#F97316] text-white" : "bg-[#102941] border border-[#315671] text-[#FDBA74]"
                      }`}>
                        {step.number}
                      </span>
                      <span className="truncate text-[12px] font-black max-w-full">{step.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </section>

      {/* ── 3. Dual Video Walkthrough Section (Portuguese & English Speakers) ── */}
      <section className="mx-auto max-w-[1570px] px-6 pt-24">
        <Reveal>
          <div className="text-center mb-12">
            <RevealEyebrow>
              <div className="inline-flex items-center gap-3 text-[12px] font-black uppercase tracking-[0.35em] text-[#FDBA74]">
                <span className="h-px w-8 bg-[#F97316]" />
                VIDEO WALKTHROUGH
                <span className="h-px w-8 bg-[#F97316]" />
              </div>
            </RevealEyebrow>
            <RevealHeading>
              <h2 className="mt-3 text-[32px] font-black uppercase tracking-tight text-white md:text-[46px]">
                WATCH HOW AGTP WORKS
              </h2>
            </RevealHeading>
            <RevealText delay={120}>
              <p className="mx-auto mt-4 max-w-2xl text-[16px] font-semibold text-slate-300">
                See how we handle your vehicle or spare parts order, from quotation and confirmation to shipping, and delivery.
              </p>
            </RevealText>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* ── Video 1: Portuguese Speaker ── */}
            <div className="group overflow-hidden rounded-[28px] border border-[#315671] bg-gradient-to-b from-[#14314B] to-[#102941] shadow-2xl transition-all duration-300 hover:border-[#F97316]">
              {/* Video Frame */}
              <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                <Image
                  src={agtpAssets.heroYard}
                  alt="Processo de Exportação AGTP Group - Português"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33] via-black/40 to-black/30" />

                {/* Top Badge */}
                <div className="absolute top-5 left-5 flex items-center gap-2 rounded-full border border-[#F97316]/50 bg-[#0B1F33]/90 backdrop-blur-md px-3.5 py-1.5 text-[12px] font-black text-white">
                  <span>🇵🇹</span>
                  <span>Português</span>
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-white/80 bg-[#F97316] text-white shadow-2xl shadow-orange-500/50 transition-transform duration-300 group-hover:scale-110">
                    <Play className="h-8 w-8 fill-white translate-x-0.5" />
                    <span className="absolute inset-0 rounded-full bg-[#F97316] animate-ping opacity-25" />
                  </div>
                </div>

                {/* Duration / Audio Badge */}
                <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-black/70 backdrop-blur-sm px-3 py-1 text-[11px] font-black text-slate-200 border border-white/10">
                  <Volume2 className="h-3.5 w-3.5 text-[#FDBA74]" />
                  <span>Áudio em Português</span>
                </div>
              </div>

              {/* Video Info Container */}
              <div className="p-8 space-y-4">
                <div className="flex items-center gap-2 text-[12px] font-black uppercase tracking-wider text-[#FDBA74]">
                  <Video className="h-4 w-4 text-[#F97316]" />
                  <span>VÍDEO DE ORIENTAÇÃO</span>
                </div>
                <h3 className="text-[22px] font-black text-white group-hover:text-[#FDBA74] transition-colors leading-snug">
                  Guia de Exportação de Veículos e Peças de Reposição de Dubai
                </h3>
                <p className="text-[15px] font-medium leading-relaxed text-slate-300">
                  Nossa equipe orienta você sobre o processo de encomenda de veículos e peças de reposição de Dubai, incluindo cotações, confirmação de pedido, envio e entrega internacional.
                </p>
              </div>
            </div>

            {/* ── Video 2: English Speaker ── */}
            <div className="group overflow-hidden rounded-[28px] border border-[#315671] bg-gradient-to-b from-[#14314B] to-[#102941] shadow-2xl transition-all duration-300 hover:border-[#F97316]">
              {/* Video Frame */}
              <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                <Image
                  src={agtpAssets.exportPort}
                  alt="AGTP Group Export Process - English"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33] via-black/40 to-black/30" />

                {/* Top Badge */}
                <div className="absolute top-5 left-5 flex items-center gap-2 rounded-full border border-[#F97316]/50 bg-[#0B1F33]/90 backdrop-blur-md px-3.5 py-1.5 text-[12px] font-black text-white">
                  <span>🇬🇧</span>
                  <span>English</span>
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-white/80 bg-[#F97316] text-white shadow-2xl shadow-orange-500/50 transition-transform duration-300 group-hover:scale-110">
                    <Play className="h-8 w-8 fill-white translate-x-0.5" />
                    <span className="absolute inset-0 rounded-full bg-[#F97316] animate-ping opacity-25" />
                  </div>
                </div>

                {/* Duration / Audio Badge */}
                <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-black/70 backdrop-blur-sm px-3 py-1 text-[11px] font-black text-slate-200 border border-white/10">
                  <Volume2 className="h-3.5 w-3.5 text-[#FDBA74]" />
                  <span>English Audio</span>
                </div>
              </div>

              {/* Video Info Container */}
              <div className="p-8 space-y-4">
                <div className="flex items-center gap-2 text-[12px] font-black uppercase tracking-wider text-[#FDBA74]">
                  <Video className="h-4 w-4 text-[#F97316]" />
                  <span>WALKTHROUGH VIDEO</span>
                </div>
                <h3 className="text-[22px] font-black text-white group-hover:text-[#FDBA74] transition-colors leading-snug">
                  Dubai Vehicle & Spare Parts Export Guide
                </h3>
                <p className="text-[15px] font-medium leading-relaxed text-slate-300">
                  Our team walks you through ordering vehicles and spare parts from Dubai, including quotations, order confirmation, shipping, and international delivery.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── 4. Immersive Hero-Style Bottom CTA Banner ── */}
      <section className="mx-auto max-w-[1570px] px-6 pt-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] border border-[#315671] shadow-2xl">
            {/* Background Image */}
            <div className="absolute inset-0 -z-10">
              <Image
                src={agtpAssets.inventoryHero}
                alt="AGTP Group Global Export"
                fill
                className="object-cover object-center brightness-105"
                sizes="(max-width: 1570px) 100vw, 1570px"
              />
              {/* Lightened soft overlay */}
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33]/80 via-[#0B1F33]/50 to-[#0B1F33]/70" />
            </div>

            <div className="relative z-10 px-8 py-16 text-center sm:px-12 md:py-24 lg:py-28">
              <RevealEyebrow>
                <div className="inline-flex items-center gap-3 text-[12px] font-black uppercase tracking-[0.35em] text-[#FDBA74]">
                  <span className="h-px w-8 bg-[#F97316]" />
                  START YOUR SOURCING
                  <span className="h-px w-8 bg-[#F97316]" />
                </div>
              </RevealEyebrow>

              <RevealHeading>
                <h2 className="mx-auto mt-4 max-w-4xl text-[34px] font-black uppercase leading-tight tracking-tight text-white sm:text-[46px] md:text-[56px] lg:text-[64px] drop-shadow-md">
                  Ready to Place Your Order?
                </h2>
              </RevealHeading>

              <RevealText delay={120}>
                <p className="mx-auto mt-6 max-w-3xl text-[16px] font-semibold leading-relaxed text-slate-100 sm:text-[18px] drop-shadow">
                  Send us your requirements and get a clear quotation with product details, pricing, and export support.
                </p>
              </RevealText>

              <RevealButton delay={180} className="mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={() => setInquiryModalOpen(true)}
                  className="inline-flex h-[56px] items-center gap-3 rounded-full bg-[#F97316] px-10 text-[16px] font-black text-white transition-all duration-300 hover:bg-[#EA580C] shadow-xl hover:scale-105"
                >
                  <span>Get A Quote</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
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
