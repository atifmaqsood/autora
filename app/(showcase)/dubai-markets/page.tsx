"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Car, Cog, Package } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { agtpAssets } from "@/src/assets";
import { VehicleInquiryModal } from "@/components/vehicles/vehicle-inquiry-modal";
import { useState } from "react";
import {
  Reveal,
  RevealButton,
  RevealEyebrow,
  RevealHeading,
  RevealStagger,
  RevealText
} from "@/components/ui/scroll-reveal";

const marketCategories = [
  {
    title: "Parts & Accessories",
    subtitle: "Genuine, OEM, Aftermarket & More",
    image: agtpAssets.sparePartsHero,
    icon: Package,
    href: "/parts-accessories"
  },
  {
    title: "Engines & Transmissions",
    subtitle: "Diesel, Petrol, Hybrid & More",
    image: agtpAssets.mercedesCclassCard,
    icon: Cog,
    href: "/parts-accessories"
  },
  {
    title: "Tyres, Rims & Body Kits",
    subtitle: "Performance, Styling & Protection",
    image: agtpAssets.bmwX2Card,
    icon: Car,
    href: "/parts-accessories"
  }
];

export default function DubaiAutomotivePage() {
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);

  return (
    <div className="bg-[#060709] pb-24 text-white">
      {/* ── 1. Hero Header Banner ── */}
      <PageHero
        breadcrumbs={[
          { label: "HOME", href: "/" },
          { label: "DUBAI AUTOMOTIVE" }
        ]}
        badge={{
          text: "DUBAI AUTOMOTIVE HUB",
          dotColor: "bg-emerald-400"
        }}
        title="DUBAI AUTOMOTIVE"
        subtitle="Explore Dubai’s automotive landscape — from vehicles and spare parts to tyres, wheels, accessories, and the infrastructure powering global automotive trade."
        imageSrc={agtpAssets.exportPort}
        imageAlt="Dubai Automotive Hub"
      />

      {/* ── 2. Dubai Automotive Landscape (Split Layout) ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Graphic */}
          <div className="lg:col-span-6 relative">
            <Reveal duration={700}>
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-slate-800 bg-[#102941] shadow-2xl">
                <Image
                  src={agtpAssets.aboutYard}
                  alt="Dubai Automotive Landscape"
                  fill
                  className="object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#102941] via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 bg-[#0B1F33]/90 border border-slate-700 backdrop-blur-md px-5 py-3 rounded-2xl space-y-0.5">
                  <span className="text-sm font-black text-white block tracking-wide">GLOBAL TRADE</span>
                  <span className="text-[11px] text-slate-300 font-medium">Worldwide Markets</span>
                </div>
              </div>
            </Reveal>
          </div>
          
          {/* Right Text */}
          <div className="lg:col-span-6 space-y-6">
            <RevealEyebrow>
              <div className="flex items-center gap-2 text-xs font-bold text-[#FDBA74] uppercase tracking-widest">
                <span className="w-6 h-[1.5px] bg-[#F97316]" />
                DUBAI AUTOMOTIVE LANDSCAPE
              </div>
            </RevealEyebrow>

            <RevealHeading>
              <div>
                <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight font-sans">
                  Where Automotive Trade Meets
                </h2>
              </div>
            </RevealHeading>

            <RevealText delay={120}>
              <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
                <p>
                  Dubai is a global hub for automotive trade, bringing together vehicles, spare parts, engines, transmissions, tyres, rims, body kits, and accessories. Its strategic location makes it a key centre for automotive commerce between major international markets.
                </p>
                <p>
                  From established showrooms and parts facilities to dedicated automotive trade areas, Dubai offers a diverse and highly connected automotive landscape. This ecosystem supports the movement of automotive products from the UAE to customers and markets around the world.
                </p>
              </div>
            </RevealText>
          </div>
        </div>
      </section>

      {/* ── 3. Browse by Category Grid ── */}
      <section className="mx-auto max-w-[1570px] px-8 sm:px-12 lg:px-16 xl:px-20 pt-28 text-center">
        <div className="text-center flex flex-col items-center">
          <RevealEyebrow>
            <div className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.28em] text-[#FDBA74]">
              <span className="h-px w-8 bg-[#F97316]" />
              Browse by Category
            </div>
          </RevealEyebrow>
          <RevealHeading>
            <h2 className="mt-5 text-[28px] font-black leading-[1.1] tracking-normal md:text-[42px] text-white">
              Select a Market to Explore
            </h2>
          </RevealHeading>
        </div>

        <RevealStagger staggerDelay={85} className="mt-[48px] text-left grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Card 1: Parts & Accessories */}
          <Link href={marketCategories[0].href} className="group relative flex flex-col justify-end overflow-hidden rounded-[18px] border border-[#315671] bg-[#14314B] p-6 shadow-lg transition-all duration-500 hover:-translate-y-1 hover:border-[#F97316]/75 hover:shadow-[0_22px_50px_rgba(0,0,0,0.24)] min-h-[360px] lg:min-h-[540px]">
            <Image src={marketCategories[0].image} alt={marketCategories[0].title} fill className="object-cover opacity-100 transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 1024px) 100vw, 33vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33]/80 via-[#0B1F33]/20 to-transparent" />
            <div className="absolute inset-x-6 top-6 flex items-center justify-between z-10">
              <span className="rounded-full border border-white/20 bg-[#0B1F33]/70 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-white backdrop-blur">
                Explore
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#F97316]/45 bg-[#0B1F33]/80 text-[#FDBA74] transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
            <div className="relative z-10 mt-auto max-w-[390px]">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-[#F97316]/35 bg-[#F97316]/15 text-[#FDBA74]">
                <Package className="h-5 w-5" />
              </div>
              <h3 className="text-[21px] font-black leading-[1.05] text-white md:text-[24px]">{marketCategories[0].title}</h3>
              <p className="mt-2.5 text-[12px] font-bold leading-[1.45] text-slate-200">{marketCategories[0].subtitle}</p>
            </div>
          </Link>

          {/* Card 2: Engines & Transmissions */}
          <Link href={marketCategories[1].href} className="group relative flex flex-col justify-end overflow-hidden rounded-[18px] border border-[#315671] bg-[#14314B] p-6 shadow-lg transition-all duration-500 hover:-translate-y-1 hover:border-[#F97316]/75 hover:shadow-[0_22px_50px_rgba(0,0,0,0.24)] min-h-[360px] lg:min-h-[540px]">
            <Image src={marketCategories[1].image} alt={marketCategories[1].title} fill className="object-cover opacity-100 transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 1024px) 100vw, 33vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33]/80 via-[#0B1F33]/20 to-transparent" />
            <div className="absolute inset-x-6 top-6 flex items-center justify-between z-10">
              <span className="rounded-full border border-white/20 bg-[#0B1F33]/70 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-white backdrop-blur">
                Explore
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#F97316]/45 bg-[#0B1F33]/80 text-[#FDBA74] transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
            <div className="relative z-10 mt-auto max-w-[390px]">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-[#F97316]/35 bg-[#F97316]/15 text-[#FDBA74]">
                <Cog className="h-5 w-5" />
              </div>
              <h3 className="text-[21px] font-black leading-[1.05] text-white md:text-[24px]">{marketCategories[1].title}</h3>
              <p className="mt-2.5 text-[12px] font-bold leading-[1.45] text-slate-200">{marketCategories[1].subtitle}</p>
            </div>
          </Link>

          {/* Card 3: Tyres, Rims & Body Kits */}
          <Link href={marketCategories[2].href} className="group relative flex flex-col justify-end overflow-hidden rounded-[18px] border border-[#315671] bg-[#14314B] p-6 shadow-lg transition-all duration-500 hover:-translate-y-1 hover:border-[#F97316]/75 hover:shadow-[0_22px_50px_rgba(0,0,0,0.24)] min-h-[360px] lg:min-h-[540px]">
            <Image src={marketCategories[2].image} alt={marketCategories[2].title} fill className="object-cover opacity-100 transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 1024px) 100vw, 33vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33]/80 via-[#0B1F33]/20 to-transparent" />
            <div className="absolute inset-x-6 top-6 flex items-center justify-between z-10">
              <span className="rounded-full border border-white/20 bg-[#0B1F33]/70 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-white backdrop-blur">
                Explore
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#F97316]/45 bg-[#0B1F33]/80 text-[#FDBA74] transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
            <div className="relative z-10 mt-auto max-w-[390px]">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-[#F97316]/35 bg-[#F97316]/15 text-[#FDBA74]">
                <Car className="h-5 w-5" />
              </div>
              <h3 className="text-[21px] font-black leading-[1.05] text-white md:text-[24px]">{marketCategories[2].title}</h3>
              <p className="mt-2.5 text-[12px] font-bold leading-[1.45] text-slate-200">{marketCategories[2].subtitle}</p>
            </div>
          </Link>
        </RevealStagger>
      </section>

      {/* ── 4. CTA Banner ── */}
      <section className="mx-auto max-w-7xl px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] border border-slate-800 bg-[#0B1F33] p-10 md:p-16 lg:p-20 text-center shadow-2xl space-y-6">
            <div className="absolute inset-0 z-0">
               <Image
                 src={agtpAssets.inventoryHero}
                 alt="Ready to order"
                 fill
                 className="object-cover opacity-20"
               />
               <div className="absolute inset-0" style={{ background: "linear-gradient(to top, var(--agtp-primary, #0B1F33) 0%, color-mix(in srgb, var(--agtp-primary, #0B1F33) 80%, transparent) 50%, transparent 100%)" }} />
            </div>
            
            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <RevealEyebrow>
                <div className="inline-flex items-center gap-3 text-[12px] font-black uppercase tracking-[0.28em] text-[#FDBA74]">
                  <span className="h-px w-8 bg-[#F97316]" />
                  YOUR NEXT MOVE
                  <span className="h-px w-8 bg-[#F97316]" />
                </div>
              </RevealEyebrow>
              <RevealHeading>
                <h2 className="text-[36px] font-black text-white md:text-[54px] tracking-tight">
                  READY TO TRADE FROM DUBAI?
                </h2>
              </RevealHeading>
              <RevealText delay={120}>
                <p className="text-[17px] sm:text-[19px] font-medium text-slate-300 leading-relaxed">
                  Tell us what automotive products you need and your destination. We’ll guide you through availability, pricing, export, and shipping.
                </p>
              </RevealText>
  
              <RevealButton delay={180} className="pt-6 flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => setInquiryModalOpen(true)}
                  className="inline-flex h-14 items-center gap-2 rounded-full bg-[#F97316] px-8 text-[15px] font-extrabold text-white shadow-lg shadow-[#F97316]/30 transition-all duration-200 hover:bg-[#EA580C] hover:scale-105"
                >
                  <span>GET STARTED</span>
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
        vehicleTitle="Dubai Automotive Inquiry"
        vehicleId="dubai-automotive"
      />
    </div>
  );
}


