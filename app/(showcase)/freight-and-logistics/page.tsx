"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Globe2, Mail, Phone, Plane, Ship, Truck } from "lucide-react";
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

export default function AutomotiveShippingPage() {
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);

  return (
    <div className="bg-[#060709] pb-24 text-white">
      {/* ── 1. Hero Header Banner matching new design ── */}
      <PageHero
        breadcrumbs={[
          { label: "HOME", href: "/" },
          { label: "AREAS OF EXPERTISE" },
          { label: "AUTOMOTIVE SHIPPING" }
        ]}
        badge={{
          text: "AUTOMOTIVE SHIPPING — WORLDWIDE DELIVERY",
          dotColor: "bg-emerald-400"
        }}
        title="AUTOMOTIVE SHIPPING"
        subtitle="From Dubai to the world. We coordinate reliable shipping for vehicles and automotive parts, from the UAE to customers worldwide."
        imageSrc={agtpAssets.exportPort}
        imageAlt="AGTP Group Automotive Shipping Port"
      />

      {/* ── 2. Overview Intro Section (Shipping With Confidence) ── */}
      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
        <Reveal>
          <div className="rounded-[28px] border border-[#315671] bg-[#102941] p-6 sm:p-8 md:p-12 shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 items-center">
              {/* Left Column: Heading, Description & Feature Highlights */}
              <div className="lg:col-span-7 space-y-6">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
                  Shipping With Confidence
                </h2>

                <div className="space-y-4 text-[15px] sm:text-[16px] font-normal leading-relaxed text-slate-200">
                  <p>
                    At AGTP Group, we provide reliable shipping solutions for vehicles and automotive spare parts from the UAE to destinations worldwide. Whether you are purchasing a vehicle or ordering spare parts, we coordinate the shipping process according to your destination and requirements.
                  </p>
                  <p>
                    From shipment preparation and export documentation to transportation and delivery coordination, our team keeps every step clear, organized, and professionally managed.
                  </p>
                </div>


              </div>

              {/* Right Column: Image with Signature Curved Bottom-Right Corner */}
              <div className="lg:col-span-5 h-full">
                <div className="relative w-full h-[320px] sm:h-[380px] lg:h-[420px] rounded-2xl lg:rounded-br-[85px] overflow-hidden border border-slate-700/60 shadow-xl">
                  <Image
                    src={agtpAssets.aboutYard}
                    alt="AGTP Group Shipping With Confidence"
                    fill
                    sizes="(max-width: 1024px) 100vw, 500px"
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── 3. Stats Section ── */}
      <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        <Reveal>
          <div className="rounded-[24px] border border-[#315671] bg-[#0B1F33] overflow-hidden shadow-2xl">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-slate-800/80">
              {[
                { value: "11", suffix: "+", label: "Years in Trade" },
                { value: "25", suffix: "+", label: "Countries Served" },
                { value: "93", suffix: "%", label: "On-Time Delivery" },
                { value: "100", suffix: "%", label: "Verified Port Delivery" }
              ].map((stat, i) => (
                <div key={i} className="p-8 md:p-10 flex flex-col justify-center">
                  <div className="text-4xl md:text-5xl font-black text-white tracking-tight flex items-baseline justify-center lg:justify-start">
                    {stat.value}<span className="text-blue-500 text-3xl ml-1">{stat.suffix}</span>
                  </div>
                  <div className="mt-3 text-[13px] font-semibold text-slate-400 uppercase tracking-wider text-center lg:text-left">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── 4. Ocean & Air Shipping Cards ── */}
      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Card 1: Ocean Shipping */}
          <Reveal delay={100}>
            <div className="relative overflow-hidden rounded-[24px] border border-[#315671] bg-[#0B1F33] shadow-2xl group flex flex-col justify-between h-full min-h-[500px]">
              <div className="absolute inset-0 z-0">
                <Image
                  src={agtpAssets.exportPort}
                  alt="Ocean Shipping RoRo"
                  fill
                  className="object-cover object-right opacity-40 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to right, var(--agtp-primary, #0B1F33) 0%, color-mix(in srgb, var(--agtp-primary, #0B1F33) 90%, transparent) 50%, transparent 100%)" }} />
              </div>
              
              <div className="relative z-10 p-8 sm:p-10 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/20 text-blue-500">
                    <Ship className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-300">Ocean Shipping</span>
                </div>
                
                <h3 className="text-2xl sm:text-[28px] font-black text-white leading-tight mb-4">
                  Reliable Vehicle &<br />Parts Shipping
                </h3>
                <p className="text-sm sm:text-[15px] font-medium leading-relaxed text-slate-300 mb-8 max-w-sm">
                  We arrange containerized and RoRo shipping for vehicles, along with sea freight solutions for larger automotive spare-parts orders.
                </p>
                
                <div className="space-y-3 mb-10 flex-grow">
                  {[
                    "Containerized & RoRo Options",
                    "Vehicles & Spare Parts",
                    "Competitive Shipping Rates",
                    "Global Port Coverage",
                    "End-to-End Coordination"
                  ].map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <span className="text-[#FDBA74] font-black text-sm">✓</span>
                      <span className="text-sm font-semibold text-slate-200">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-auto">
                  <button onClick={() => setInquiryModalOpen(true)} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[#F97316] px-6 text-sm font-extrabold text-white transition-all duration-200 hover:bg-[#EA580C] shadow-lg shadow-[#F97316]/30">
                    <span>Get a Shipping Quote</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Card 2: Air Shipping */}
          <Reveal delay={200}>
            <div className="relative overflow-hidden rounded-[24px] border border-[#315671] bg-[#0B1F33] shadow-2xl group flex flex-col justify-between h-full min-h-[500px]">
              <div className="absolute inset-0 z-0">
                <Image
                  src={agtpAssets.sparePartsHero}
                  alt="Air Cargo Shipping"
                  fill
                  className="object-cover object-right opacity-40 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to right, var(--agtp-primary, #0B1F33) 0%, color-mix(in srgb, var(--agtp-primary, #0B1F33) 90%, transparent) 50%, transparent 100%)" }} />
              </div>
              
              <div className="relative z-10 p-8 sm:p-10 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/20 text-blue-500">
                    <Plane className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-300">Air Shipping</span>
                </div>
                
                <h3 className="text-2xl sm:text-[28px] font-black text-white leading-tight mb-4">
                  Fast Delivery for<br />Spare Parts
                </h3>
                <p className="text-sm sm:text-[15px] font-medium leading-relaxed text-slate-300 mb-8 max-w-sm">
                  Express air cargo solutions for urgent automotive spare parts and time-sensitive shipments to destinations worldwide.
                </p>
                
                <div className="space-y-3 mb-10 flex-grow">
                  {[
                    "Express & Priority Options",
                    "Suitable for Urgent Shipments",
                    "Global Airport Network",
                    "Safe & Secure Handling",
                    "Real-Time Tracking Support"
                  ].map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <span className="text-[#FDBA74] font-black text-sm">✓</span>
                      <span className="text-sm font-semibold text-slate-200">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-auto">
                  <button onClick={() => setInquiryModalOpen(true)} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[#F97316] px-6 text-sm font-extrabold text-white transition-all duration-200 hover:bg-[#EA580C] shadow-lg shadow-[#F97316]/30">
                    <span>Get a Shipping Quote</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 5. READY TO SHIP? CTA Banner ── */}
      <section className="mx-auto max-w-7xl px-4 pt-20 pb-20 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] border border-slate-800 bg-[#0B1F33] p-10 md:p-16 lg:p-20 text-center shadow-2xl space-y-6">
            <div className="absolute inset-0 z-0">
               <Image
                 src={agtpAssets.inventoryHero}
                 alt="Ready to ship"
                 fill
                 className="object-cover opacity-20"
               />
               <div className="absolute inset-0" style={{ background: "linear-gradient(to top, var(--agtp-primary, #0B1F33) 0%, color-mix(in srgb, var(--agtp-primary, #0B1F33) 80%, transparent) 50%, transparent 100%)" }} />
            </div>
            
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <RevealHeading>
                <h2 className="text-[36px] font-black text-white md:text-[54px] tracking-tight">
                  READY TO SHIP?
                </h2>
              </RevealHeading>
              <RevealText delay={120}>
                <p className="text-[15px] sm:text-[17px] font-medium text-slate-300 leading-relaxed">
                  Tell us what you’re shipping, your destination, and your preferred shipping requirements. Our team will provide suitable shipping options, pricing, and export support.
                </p>
              </RevealText>
  
              <RevealButton delay={180} className="pt-6 flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => setInquiryModalOpen(true)}
                  className="inline-flex h-14 items-center gap-2 rounded-full bg-[#F97316] px-8 text-[15px] font-extrabold text-white shadow-lg shadow-[#F97316]/30 transition-all duration-200 hover:bg-[#EA580C] hover:scale-105"
                >
                  <span>GET A SHIPPING QUOTE</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
                <Link
                  href="/contact"
                  className="inline-flex h-14 items-center gap-2 rounded-full border border-white/20 bg-[#ffffff10] backdrop-blur-sm px-8 text-[15px] font-bold text-white transition-colors hover:bg-white/20 hover:border-white/40"
                >
                  <span>CONTACT AGTP</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </RevealButton>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── 6. Modals ── */}
      <VehicleInquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
      />
    </div>
  );
}

