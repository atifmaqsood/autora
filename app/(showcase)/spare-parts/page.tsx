"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  PackageCheck,
  Search,
  Settings,
  ShieldCheck,
  Truck,
  Wrench,
  Disc,
  Car,
  Package
} from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { VehicleInquiryModal } from "@/components/vehicles/vehicle-inquiry-modal";
import { Reveal, RevealButton, RevealEyebrow, RevealHeading, RevealStagger, RevealText } from "@/components/ui/scroll-reveal";
import { agtpAssets } from "@/src/assets";

const heroStats = [
  { value: "10,000", suffix: "+", label: "Exports" },
  { value: "11", suffix: "+", label: "Years in Trade" },
  { value: "25", suffix: "+", label: "Countries Served" },
  { value: "93", suffix: "%", label: "On-Time Delivery" }
];

const catalogItems = [
  {
    title: "Service & Maintenance",
    subtitle: "Filters, brakes, batteries & maintenance essentials",
    image: agtpAssets.sparePartsHero,
    icon: Settings,
    href: "#",
    layout: "min-h-[360px] xl:col-span-5 xl:row-span-2 xl:min-h-[540px]"
  },
  {
    title: "Engine & Mechanical",
    subtitle: "Engines, transmissions & mechanical components",
    image: agtpAssets.mercedesCclassCard,
    icon: Wrench,
    href: "#",
    layout: "min-h-[250px] xl:col-span-4 xl:min-h-[260px]"
  },
  {
    title: "Tyres & Wheels",
    subtitle: "Tyres, rims & related wheel components",
    image: agtpAssets.cadillacEscaladeCard,
    icon: Disc,
    href: "#",
    layout: "min-h-[250px] xl:col-span-3 xl:min-h-[260px]"
  },
  {
    title: "Body & Exterior",
    subtitle: "Bumpers, lamps, panels & exterior components",
    image: agtpAssets.bmwX2Card,
    icon: Car,
    href: "#",
    layout: "min-h-[250px] xl:col-span-3 xl:min-h-[260px]"
  },
  {
    title: "Accessories & Modifications",
    subtitle: "Interior, exterior, off-road & upgrade products",
    image: agtpAssets.bydDestroyerCard,
    icon: Package,
    href: "#",
    layout: "min-h-[250px] xl:col-span-4 xl:min-h-[260px]"
  }
];

const processSteps = [
  {
    icon: Search,
    title: "STEP 1 — IDENTIFY",
    body: "Send the part number, vehicle make/model, model year, or photos so we can identify the required part."
  },
  {
    icon: ClipboardCheck,
    title: "STEP 2 — CONFIRM",
    body: "We confirm availability, compatibility, condition, pricing, and estimated delivery options."
  },
  {
    icon: PackageCheck,
    title: "STEP 3 — PREPARE",
    body: "Your parts are carefully checked, documented, packed, and prepared for international shipment."
  },
  {
    icon: Truck,
    title: "STEP 4 — SHIP",
    body: "We coordinate export documentation and shipping to your destination through our automotive shipping network."
  }
];

export default function SparePartsPage() {
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);

  return (
    <div className="bg-[#060709] pb-20 text-white">
      {/* ── 1. Hero Header Banner ── */}
      <PageHero
        breadcrumbs={[
          { label: "HOME", href: "/" },
          { label: "PARTS & ACCESSORIES" }
        ]}
        badge={{
          text: "OEM & AFTERMARKET — WORLDWIDE SUPPLY",
          dotColor: "bg-emerald-400"
        }}
        title="PARTS & ACCESSORIES"
        subtitle="AGTP Group supplies quality automotive spare parts, accessories, and modification products from the UAE to customers worldwide, with competitive pricing and reliable export support."
        imageSrc={agtpAssets.sparePartsHero}
        imageAlt="AGTP GROUP Spare Parts Sourcing"
      >
        <button
          onClick={() => setInquiryModalOpen(true)}
          className="inline-flex items-center gap-3 rounded-full bg-[#F97316] px-8 py-4 text-sm font-black text-white shadow-2xl transition-all hover:bg-[#EA580C]"
        >
          <span>REQUEST PARTS QUOTE</span>
          <ArrowRight className="h-4 w-4" />
        </button>
        <a
          href="#parts-catalog"
          className="ml-4 inline-flex items-center rounded-full border border-slate-700 px-8 py-4 text-sm font-black text-white transition-all hover:border-[#F97316] hover:bg-slate-900"
        >
          VIEW CATEGORIES
        </a>
      </PageHero>

      {/* ── 2. Counter Section ── */}
      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <Reveal delay={100}>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 rounded-3xl border border-[#315671] bg-[#102941] p-6 shadow-xl">
            {heroStats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-[#315671]/70 bg-[#0B1F33]/80 p-5 text-center flex flex-col justify-center">
                <div className="text-3xl font-black text-[#FDBA74] flex items-baseline justify-center">
                  {stat.value}<span className="text-blue-500 text-xl ml-1">{stat.suffix}</span>
                </div>
                <div className="mt-2 text-[11px] font-bold uppercase leading-snug tracking-wider text-slate-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── 3. Parts Catalog (Image Grid Layout) ── */}
      <section id="parts-catalog" className="mx-auto max-w-[1570px] px-8 sm:px-12 lg:px-16 xl:px-20 pt-24 text-center">
        <div className="text-center flex flex-col items-center">
          <RevealEyebrow>
            <div className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.28em] text-[#FDBA74]">
              <span className="h-px w-8 bg-[#F97316]" />
              Parts Catalog
            </div>
          </RevealEyebrow>
          <RevealHeading>
            <h2 className="mt-5 text-[28px] font-black leading-[1.1] tracking-normal md:text-[42px] text-white">
              Your Vehicle. Our Parts.
            </h2>
          </RevealHeading>
        </div>

        <div className="mt-[48px] text-left grid auto-rows-[minmax(250px,auto)] grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-12">
          {catalogItems.map((card, index) => {
            const Icon = card.icon;
            return (
              <Reveal key={card.title} delay={index * 85} className={card.layout}>
                <Link href={card.href} className="group relative flex h-full overflow-hidden rounded-[18px] border border-[#315671] bg-[#14314B] p-6 shadow-lg transition-all duration-500 hover:-translate-y-1 hover:border-[#F97316]/75 hover:shadow-[0_22px_50px_rgba(0,0,0,0.24)]">
                  <Image src={card.image} alt={card.title} fill className="object-cover opacity-100 transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33]/70 via-[#0B1F33]/25 to-transparent" />
                  <div className="absolute inset-x-6 top-6 flex items-center justify-between">
                    <span className="rounded-full border border-white/20 bg-[#0B1F33]/70 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-white backdrop-blur">
                      Explore
                    </span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#F97316]/45 bg-[#0B1F33]/80 text-[#FDBA74] transition-transform duration-300 group-hover:translate-x-1">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                  <div className="relative z-10 mt-auto max-w-[390px]">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-[#F97316]/35 bg-[#F97316]/15 text-[#FDBA74]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-[21px] font-black leading-[1.05] text-white md:text-[24px]">{card.title}</h3>
                    <p className="mt-2.5 text-[12px] font-bold leading-[1.45] text-slate-200">{card.subtitle}</p>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ── 4. Order Process ── */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 pt-28 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="space-y-5 lg:col-span-5">
          <RevealEyebrow>
            <div className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.28em] text-[#FDBA74]">
              <span className="h-px w-8 bg-[#F97316]" />
              PARTS ORDER PROCESS
            </div>
          </RevealEyebrow>
          <RevealHeading>
            <h2 className="text-4xl font-black leading-tight text-white sm:text-6xl">
              Matched, Verified, Packed, and Shipped.
            </h2>
          </RevealHeading>
          <RevealText>
            <p className="text-sm font-semibold leading-relaxed text-slate-400 sm:text-base">
              Share the part number, vehicle details, or photos. Our team confirms compatibility, availability, pricing, and shipping options before your order is prepared for delivery.
            </p>
          </RevealText>
        </div>

        <RevealStagger staggerDelay={85} className="space-y-4 lg:col-span-7">
          {processSteps.map((step, index) => (
            <div key={step.title} className="grid grid-cols-[auto_1fr] gap-5 rounded-3xl border border-slate-800 bg-[#102941] p-6 shadow-xl hover:border-[#F97316] transition-colors">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#0B1F33]">
                <step.icon className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-[#F97316]" />
                </div>
                <h3 className="mt-2 text-[18px] font-black text-white">{step.title}</h3>
                <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-400">{step.body}</p>
              </div>
            </div>
          ))}
        </RevealStagger>
      </section>

      {/* ── 5. Photos & Videos Before Shipping ── */}
      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
        <Reveal>
          <div className="rounded-3xl border border-emerald-500/20 bg-[#102941] p-8 sm:p-12 shadow-2xl relative overflow-hidden group">
            <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.1),transparent_50%)] transition-opacity duration-500 group-hover:opacity-100 opacity-60" />
            
            <div className="relative z-10">
              <RevealEyebrow>
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-emerald-400">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  PHOTOS & VIDEOS BEFORE SHIPPING
                </div>
              </RevealEyebrow>
              
              <RevealText delay={120}>
                <p className="mt-6 text-[15px] sm:text-[17px] font-medium leading-relaxed text-slate-300 max-w-4xl">
                  Before your order is shipped, we share photos or videos of your parts for your review and approval, where applicable — so you can buy with confidence.
                </p>
              </RevealText>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── 6. Dubai Automotive Landscape ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Graphic */}
          <div className="lg:col-span-6 relative">
            <Reveal duration={700}>
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-slate-800 bg-[#102941] shadow-2xl">
                <Image
                  src={agtpAssets.exportPort}
                  alt="Dubai Automotive Landscape"
                  fill
                  className="object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#102941] via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 bg-[#0B1F33]/90 border border-slate-700 backdrop-blur-md px-5 py-3 rounded-2xl space-y-0.5">
                  <span className="text-sm font-black text-white block tracking-wide">DUBAI AUTO HUB</span>
                  <span className="text-[11px] text-slate-300 font-medium">Global Trade Gateway</span>
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
                  Where Automotive Trade Comes Together
                </h2>
                <p className="mt-2 text-xl sm:text-2xl font-black text-[#4361EE] tracking-wide">
                  From Dubai to the World
                </p>
              </div>
            </RevealHeading>

            <RevealText delay={120}>
              <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
                <p>
                  Dubai is one of the world’s leading hubs for automotive trade, connecting vehicles, spare parts, tyres, accessories, and international markets. Its established automotive infrastructure creates a dynamic environment for global trade.
                </p>
                <p>
                  Explore the Dubai automotive landscape through our visual showcase — from vehicle facilities and parts warehouses to the wider trade environment that supports automotive commerce from the UAE to destinations worldwide.
                </p>
              </div>
            </RevealText>
            
            <RevealButton delay={180}>
              <div className="pt-2">
                <Link
                  href="/dubai-markets"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-8 py-4 text-sm font-black text-white transition-all hover:border-[#F97316] hover:bg-slate-900"
                >
                  <span>EXPLORE DUBAI AUTOMOTIVE</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </RevealButton>
          </div>
        </div>
      </section>

      {/* ── 7. CTA Banner ── */}
      <section className="mx-auto max-w-7xl px-4 pt-28 pb-20 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] border border-slate-800 bg-[#060709] p-10 md:p-16 lg:p-20 text-center shadow-2xl space-y-6">
            <div className="absolute inset-0 z-0">
               <Image
                 src={agtpAssets.sparePartsHero}
                 alt="Ready to order"
                 fill
                 className="object-cover opacity-20"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#060709] via-[#060709]/80 to-transparent" />
            </div>
            
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <RevealEyebrow>
                <div className="inline-flex items-center gap-3 text-[12px] font-black uppercase tracking-[0.28em] text-[#FDBA74]">
                  <span className="h-px w-8 bg-[#F97316]" />
                  READY TO ORDER
                  <span className="h-px w-8 bg-[#F97316]" />
                </div>
              </RevealEyebrow>
              <RevealHeading>
                <h2 className="text-[36px] font-black text-white md:text-[54px] tracking-tight">
                  THE PART YOU NEED, RIGHT HERE.
                </h2>
              </RevealHeading>
              <RevealText delay={120}>
                <p className="text-[15px] sm:text-[17px] font-medium text-slate-300 leading-relaxed">
                  Tell us the part number, vehicle details, or what you need. We’ll confirm availability, pricing, and shipping options for your destination.
                </p>
              </RevealText>
  
              <RevealButton delay={180} className="pt-6 flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => setInquiryModalOpen(true)}
                  className="inline-flex h-14 items-center gap-2 rounded-full bg-[#4F46E5] px-8 text-[15px] font-bold text-white transition-colors hover:bg-[#4338CA] shadow-lg"
                >
                  <span>GET A PARTS QUOTE</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
                <Link
                  href="/contact"
                  className="inline-flex h-14 items-center gap-2 rounded-full border border-slate-600 bg-[#ffffff10] backdrop-blur-sm px-8 text-[15px] font-bold text-white transition-colors hover:bg-slate-800 hover:border-slate-500"
                >
                  <span>CONTACT TEAM</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </RevealButton>
            </div>
          </div>
        </Reveal>
      </section>

      <VehicleInquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        vehicleTitle="Parts & Accessories Request"
        vehicleId="parts-accessories"
      />
    </div>
  );
}

