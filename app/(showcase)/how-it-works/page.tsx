"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Play,
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
    title: "Send Your Inquiry",
    description: "Tell us which vehicle or spare parts you need, along with your quantity and destination.",
    tag: "YOUR REQUIREMENT",
    image: "/images/how-it-works/step-01.png",
    cardBg: "from-[#0c1e40] via-[#071128] to-[#040816]",
    borderColor: "border-[#1d4ed8]/60",
    hoverBorder: "hover:border-[#3b82f6]",
    badgeBg: "bg-[#0066FF]",
    badgeShadow: "shadow-[0_0_22px_rgba(0,102,255,0.85)]",
    barBg: "bg-[#0066FF]",
    tagColor: "text-[#3B82F6]",
    glowBg: "bg-blue-600/30",
    hoverGlow: "hover:shadow-[0_20px_50px_rgba(0,102,255,0.3)]"
  },
  {
    number: "02",
    title: "Get a Quotation",
    description: "Receive a clear and competitive quote with product details, pricing, and available delivery options.",
    tag: "TRANSPARENT PRICING",
    image: "/images/how-it-works/step-02.png",
    cardBg: "from-[#1d0e3d] via-[#100724] to-[#080414]",
    borderColor: "border-[#7e22ce]/60",
    hoverBorder: "hover:border-[#a855f7]",
    badgeBg: "bg-[#7C3AED]",
    badgeShadow: "shadow-[0_0_22px_rgba(124,58,237,0.85)]",
    barBg: "bg-[#7C3AED]",
    tagColor: "text-[#A855F7]",
    glowBg: "bg-purple-600/30",
    hoverGlow: "hover:shadow-[0_20px_50px_rgba(124,58,237,0.3)]"
  },
  {
    number: "03",
    title: "Confirm Your Order",
    description: "Approve the quotation and confirm your purchase with AGTP Group.",
    tag: "ORDER CONFIRMED",
    image: "/images/how-it-works/step-03.png",
    cardBg: "from-[#06291d] via-[#031710] to-[#020d09]",
    borderColor: "border-[#059669]/60",
    hoverBorder: "hover:border-[#10b981]",
    badgeBg: "bg-[#10B981]",
    badgeShadow: "shadow-[0_0_22px_rgba(16,185,129,0.85)]",
    barBg: "bg-[#10B981]",
    tagColor: "text-[#10B981]",
    glowBg: "bg-emerald-600/30",
    hoverGlow: "hover:shadow-[0_20px_50px_rgba(16,185,129,0.3)]"
  },
  {
    number: "04",
    title: "Pre-Shipment Check",
    description: "Receive photos/videos and inspection reports (where applicable) before your order is prepared for shipment.",
    tag: "QUALITY ASSURANCE",
    image: "/images/how-it-works/step-04.png",
    cardBg: "from-[#2e1d06] via-[#1a1003] to-[#0d0701]",
    borderColor: "border-[#d97706]/60",
    hoverBorder: "hover:border-[#f59e0b]",
    badgeBg: "bg-[#F59E0B]",
    badgeShadow: "shadow-[0_0_22px_rgba(245,158,11,0.85)]",
    barBg: "bg-[#F59E0B]",
    tagColor: "text-[#F59E0B]",
    glowBg: "bg-amber-600/30",
    hoverGlow: "hover:shadow-[0_20px_50px_rgba(245,158,11,0.3)]"
  },
  {
    number: "05",
    title: "Export & Shipping",
    description: "We handle all export documentation and arrange shipping to your destination.",
    tag: "GLOBAL LOGISTICS",
    image: "/images/how-it-works/step-05.png",
    cardBg: "from-[#08223d] via-[#041324] to-[#020a14]",
    borderColor: "border-[#0284c7]/60",
    hoverBorder: "hover:border-[#38bdf8]",
    badgeBg: "bg-[#0284C7]",
    badgeShadow: "shadow-[0_0_22px_rgba(2,132,199,0.85)]",
    barBg: "bg-[#0284C7]",
    tagColor: "text-[#38BDF8]",
    glowBg: "bg-sky-600/30",
    hoverGlow: "hover:shadow-[0_20px_50px_rgba(2,132,199,0.3)]"
  },
  {
    number: "06",
    title: "After-Sales Support",
    description: "Our team remains available to assist you even after delivery.",
    tag: "LONG-TERM SUPPORT",
    image: "/images/how-it-works/step-06.png",
    cardBg: "from-[#19133d] via-[#0d0a24] to-[#060414]",
    borderColor: "border-[#4f46e5]/60",
    hoverBorder: "hover:border-[#818cf8]",
    badgeBg: "bg-[#6366F1]",
    badgeShadow: "shadow-[0_0_22px_rgba(99,102,241,0.85)]",
    barBg: "bg-[#6366F1]",
    tagColor: "text-[#818CF8]",
    glowBg: "bg-indigo-600/30",
    hoverGlow: "hover:shadow-[0_20px_50px_rgba(99,102,241,0.3)]"
  }
];

export default function HowItWorksPage() {
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);

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

      {/* ── 2. 6 Steps Process Section (Matching Reference Design with 3 Cards per Row) ── */}
      <section className="mx-auto max-w-[1570px] px-6 pt-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-[36px] border border-[#1e293b]/70 bg-gradient-to-b from-[#0a0f1d] via-[#070a13] to-[#04060b] p-8 md:p-14 shadow-2xl">
            {/* Ambient Bottom Globe Light */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-600/10 blur-[130px] rounded-full pointer-events-none" />

            {/* Top Bar with Brand Accents */}
            <div className="flex items-center justify-between mb-8">
              {/* Left: Dubai To The World */}
              <div className="flex items-center gap-3">
                <div className="w-[2px] h-8 bg-blue-500 rounded-full" />
                <div className="flex flex-col text-[10px] sm:text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 leading-tight">
                  <span>DUBAI</span>
                  <span>TO THE</span>
                  <span>WORLD</span>
                </div>
              </div>

              {/* Right: Driven By Trust Script */}
              <div className="text-right">
                <span
                  className="italic text-[22px] sm:text-[26px] md:text-[30px] tracking-wide text-slate-200/90 select-none"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Driven By Trust
                </span>
              </div>
            </div>

            {/* Center Section Heading */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 text-[11px] sm:text-[12px] font-black uppercase tracking-[0.32em] text-[#F97316] mb-3">
                <span>SIMPLE.</span>
                <span>TRANSPARENT.</span>
                <span>GLOBAL.</span>
              </div>
              <h2 className="text-[36px] sm:text-[48px] lg:text-[56px] font-black tracking-tight text-white uppercase leading-none">
                How It{" "}
                <span className="bg-gradient-to-r from-[#38BDF8] via-[#60A5FA] to-[#3B82F6] bg-clip-text text-transparent">
                  Works
                </span>
              </h2>
              <p className="mt-4 text-[15px] sm:text-[17px] font-medium text-slate-400 max-w-xl mx-auto">
                From inquiry to delivery — your vehicle, our responsibility.
              </p>
            </div>

            {/* ── 6 Steps in 3-Card Rows with Centered Top-Border Badges & Prominent Images ── */}
            <RevealStagger staggerDelay={80} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 lg:gap-x-7 gap-y-14 auto-rows-fr pt-6">
              {steps.map((step, idx) => {
                return (
                  <div
                    key={step.number}
                    onClick={() => setInquiryModalOpen(true)}
                    className={`group relative flex flex-col justify-between overflow-visible rounded-[26px] border ${step.borderColor} ${step.hoverBorder} ${step.hoverGlow} bg-gradient-to-b ${step.cardBg} px-6 pt-9 pb-7 lg:px-7 shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer`}
                  >
                    {/* Top Centered Number Badge Directly on the Top Border (Half in, half out) */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-full ${step.badgeBg} ${step.badgeShadow} border-2 border-white/35 text-white font-black text-[16px] tracking-tight transition-transform duration-300 group-hover:scale-110`}>
                        {step.number}
                      </div>
                    </div>

                    {/* Connecting Flow Arrow between cards on desktop */}
                    {(idx === 0 || idx === 1 || idx === 3 || idx === 4) && (
                      <div className="hidden lg:flex absolute -right-3.5 top-[45%] -translate-y-1/2 z-30 h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-[#070b16] text-slate-300 shadow-md pointer-events-none">
                        <ArrowRight className="h-3.5 w-3.5" />
                      </div>
                    )}

                    <div>
                      {/* Large, Prominent Illustration Area Filling Card Upper Section */}
                      <div className="relative w-full h-[190px] sm:h-[210px] md:h-[220px] flex items-center justify-center my-2">
                        {/* Colored Halo matching the card theme */}
                        <div className={`absolute w-44 h-44 rounded-full ${step.glowBg} blur-3xl pointer-events-none opacity-60`} />

                        {/* Large Illustration Image */}
                        <div className="relative w-full h-full flex items-center justify-center">
                          <Image
                            src={step.image}
                            alt={step.title}
                            width={488}
                            height={348}
                            className="w-full h-full object-contain max-h-[210px] drop-shadow-[0_12px_30px_rgba(0,0,0,0.7)] transform group-hover:scale-105 transition-transform duration-500"
                            priority
                          />
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-[20px] lg:text-[22px] font-bold text-white leading-tight tracking-tight mt-4">
                        {step.title}
                      </h3>

                      {/* Colored Accent Underline Bar */}
                      <div className={`h-[3px] w-8 rounded-full ${step.barBg} mt-2.5 mb-3.5 transition-all duration-300 group-hover:w-12`} />

                      {/* Description */}
                      <p className="text-[13px] sm:text-[14px] font-normal leading-relaxed text-slate-300">
                        {step.description}
                      </p>
                    </div>

                    {/* Footer Tag & Arrow */}
                    <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between">
                      <span className={`text-[11px] lg:text-[12px] font-bold uppercase tracking-[0.18em] ${step.tagColor}`}>
                        {step.tag}
                      </span>
                      <div className={`flex items-center gap-1 ${step.tagColor}`}>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </RevealStagger>

            {/* Bottom Brand Bar Strip */}
            <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 relative">
              {/* Left: AGTP Group */}
              <div className="flex items-center gap-3 relative z-10">
                <span className="font-black text-[22px] tracking-tight text-white">AGTP</span>
                <span className="text-[12px] font-black text-slate-400 tracking-[0.25em] uppercase">GROUP —</span>
              </div>

              {/* Center: Global Reach • Local Expertise */}
              <div className="flex flex-col items-center text-center relative z-10">
                <span className="text-[11px] font-black uppercase tracking-[0.32em] text-slate-400">GLOBAL REACH</span>
                <span className="text-[11px] font-black uppercase tracking-[0.32em] text-slate-400">LOCAL EXPERTISE</span>
              </div>

              {/* Right: Vehicles | Spare Parts | Global Solutions */}
              <div className="text-[11px] font-bold tracking-[0.22em] text-slate-500 uppercase relative z-10">
                VEHICLES &nbsp;|&nbsp; SPARE PARTS &nbsp;|&nbsp; GLOBAL SOLUTIONS
              </div>
            </div>
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
              <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                <Image
                  src={agtpAssets.heroYard}
                  alt="Processo de Exportação AGTP Group - Português"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33] via-black/40 to-black/30" />

                <div className="absolute top-5 left-5 flex items-center gap-2 rounded-full border border-[#F97316]/50 bg-[#0B1F33]/90 backdrop-blur-md px-3.5 py-1.5 text-[12px] font-black text-white">
                  <span>🇵🇹</span>
                  <span>Português</span>
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-white/80 bg-[#F97316] text-white shadow-2xl shadow-orange-500/50 transition-transform duration-300 group-hover:scale-110">
                    <Play className="h-8 w-8 fill-white translate-x-0.5" />
                    <span className="absolute inset-0 rounded-full bg-[#F97316] animate-ping opacity-25" />
                  </div>
                </div>

                <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-black/70 backdrop-blur-sm px-3 py-1 text-[11px] font-black text-slate-200 border border-white/10">
                  <Volume2 className="h-3.5 w-3.5 text-[#FDBA74]" />
                  <span>Áudio em Português</span>
                </div>
              </div>

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
              <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                <Image
                  src={agtpAssets.exportPort}
                  alt="AGTP Group Export Process - English"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33] via-black/40 to-black/30" />

                <div className="absolute top-5 left-5 flex items-center gap-2 rounded-full border border-[#F97316]/50 bg-[#0B1F33]/90 backdrop-blur-md px-3.5 py-1.5 text-[12px] font-black text-white">
                  <span>🇬🇧</span>
                  <span>English</span>
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-white/80 bg-[#F97316] text-white shadow-2xl shadow-orange-500/50 transition-transform duration-300 group-hover:scale-110">
                    <Play className="h-8 w-8 fill-white translate-x-0.5" />
                    <span className="absolute inset-0 rounded-full bg-[#F97316] animate-ping opacity-25" />
                  </div>
                </div>

                <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-black/70 backdrop-blur-sm px-3 py-1 text-[11px] font-black text-slate-200 border border-white/10">
                  <Volume2 className="h-3.5 w-3.5 text-[#FDBA74]" />
                  <span>English Audio</span>
                </div>
              </div>

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
            <div className="absolute inset-0 -z-10">
              <Image
                src={agtpAssets.inventoryHero}
                alt="AGTP Group Global Export"
                fill
                className="object-cover object-center brightness-105"
                sizes="(max-width: 1570px) 100vw, 1570px"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33]/80 via-[#0B1F33]/50 to-[#0B1F33]/70" />
            </div>

            <div className="relative z-10 px-8 py-16 text-center sm:px-12 md:py-24 lg:py-28">
              <RevealEyebrow>
                <div className="inline-flex items-center gap-3 text-[12px] font-black uppercase tracking-[0.35em] text-[#FDBA74]">
                  <span className="h-px w-8 bg-[#F97316]" />
                  START YOUR ORDER 
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
