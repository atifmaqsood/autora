"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Globe2, Mail, Phone, Plane, Ship, Truck } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { agtpAssets } from "@/src/assets";
import {
  Reveal,
  RevealButton,
  RevealEyebrow,
  RevealHeading,
  RevealStagger,
  RevealText
} from "@/components/ui/scroll-reveal";

const logisticsServices = [
  "RoRo and containerized vehicle shipping",
  "Full export documentation & UAE customs clearance",
  "Port-to-port and door-to-port coordination",
  "Vehicle pre-shipment inspection & securing",
  "Express air cargo for automotive spare parts",
  "End-to-end shipment tracking & delivery updates"
];

const transportModes = [
  {
    title: "Ocean Freight (RoRo & Container)",
    desc: "Roll-on/Roll-off (RoRo) and Full Container Load (FCL) shipping for safe, damage-free international vehicle transit.",
    icon: Ship
  },
  {
    title: "Air Cargo Express",
    desc: "Fast air cargo solutions for time-sensitive automotive spare parts, engines, and priority shipments.",
    icon: Plane
  },
  {
    title: "Overland Vehicle Transport",
    desc: "Regional multi-car carriers, heavy trailers, and cross-border transport across GCC and neighboring corridors.",
    icon: Truck
  }
];

export default function AutomotiveShippingPage() {
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

      {/* ── 2. Overview Intro Section ── */}
      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
        <Reveal>
          <div className="rounded-[24px] border border-[#315671] bg-[#102941] p-8 md:p-12 shadow-xl space-y-6">
            <p className="text-[17px] font-medium leading-relaxed text-slate-200 md:text-[19px]">
              At AGTP Group, we provide reliable automotive shipping solutions that keep vehicles and spare parts moving efficiently. From Dubai and the UAE to final destinations worldwide, we manage the transportation, port coordination, and export documentation required to ensure smooth delivery across global markets.
            </p>
            <p className="text-[16px] font-medium leading-relaxed text-slate-300">
              Based in Dubai and serving clients worldwide, whether transporting individual luxury cars, commercial vehicle fleets, engines, or bulk automotive spare parts, we ensure every shipment is handled with utmost professionalism and care. We help businesses and individual buyers receive their vehicles safely across Africa, the Middle East, Asia, and international ports.
            </p>
          </div>
        </Reveal>
      </section>

      {/* ── 3. Transport Modes Grid ── */}
      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <RevealStagger staggerDelay={80} className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {transportModes.map((mode) => {
            const Icon = mode.icon;
            return (
              <div key={mode.title} className="rounded-[20px] border border-[#315671] bg-[#14314B] p-8 shadow-lg hover:border-[#F97316] transition-all duration-300">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#F97316]/40 bg-[#0B1F33] text-[#FDBA74]">
                  <Icon className="h-6 w-6 text-[#F97316]" />
                </div>
                <h3 className="mt-6 text-[22px] font-black text-white">{mode.title}</h3>
                <p className="mt-3 text-[14px] font-medium leading-relaxed text-slate-300">{mode.desc}</p>
              </div>
            );
          })}
        </RevealStagger>
      </section>

      {/* ── 4. Our Automotive Shipping Expertise ── */}
      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Left Text */}
          <div className="lg:col-span-5 space-y-6">
            <RevealEyebrow>
              <div className="inline-flex items-center gap-3 text-[12px] font-black uppercase tracking-[0.28em] text-[#FDBA74]">
                <span className="h-px w-8 bg-[#F97316]" />
                SHIPPING CAPABILITIES
              </div>
            </RevealEyebrow>
            <RevealHeading>
              <h2 className="text-[32px] font-black text-white md:text-[44px]">
                Our Automotive Shipping Expertise
              </h2>
            </RevealHeading>
            <RevealText>
              <p className="text-[15px] font-medium leading-relaxed text-slate-300">
                With extensive experience in international vehicle trade, shipping lines, and UAE export logistics, AGTP Group is equipped to handle the complexities of global automotive transport.
              </p>
              <p className="mt-4 text-[15px] font-medium leading-relaxed text-slate-300">
                Our capabilities span passenger vehicles, heavy commercial units, ambulances, and genuine spare parts. Through our trusted shipping lines and port network, we deliver vehicles safely, efficiently, and cost-effectively across Africa, the Middle East, Central Asia, and overseas destinations.
              </p>
            </RevealText>
          </div>

          {/* Right Checklist */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <Reveal>
              <div className="rounded-[24px] border border-[#315671] bg-[#102941] p-8 shadow-xl">
                <h3 className="text-[20px] font-black text-white mb-6">Comprehensive Automotive Shipping Services</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {logisticsServices.map((service) => (
                    <div key={service} className="flex items-start gap-3 rounded-xl border border-[#315671]/70 bg-[#14314B] p-4 hover:border-[#F97316] transition-colors">
                      <CheckCircle2 className="h-5 w-5 text-[#F97316] shrink-0 mt-0.5" />
                      <span className="text-[14px] font-bold text-slate-200">{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 5. Connecting Global Markets Through Dubai ── */}
      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
        <Reveal>
          <div className="rounded-[24px] border border-[#315671] bg-[#102941] p-8 md:p-14 shadow-xl">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8 space-y-4">
                <RevealEyebrow>
                  <div className="inline-flex items-center gap-3 text-[12px] font-black uppercase tracking-[0.28em] text-[#FDBA74]">
                    <span className="h-px w-8 bg-[#F97316]" />
                    STRATEGIC TRADE HUB
                  </div>
                </RevealEyebrow>
                <RevealHeading>
                  <h2 className="text-[30px] font-black text-white md:text-[40px]">
                    Connecting Global Markets Through Dubai
                  </h2>
                </RevealHeading>
                <RevealText>
                  <p className="text-[15px] font-medium leading-relaxed text-slate-300">
                    Strategically based in Dubai, one of the world’s leading logistics and trade hubs, AGTP Group leverages the UAE’s advanced infrastructure, global connectivity, and efficient transport networks to facilitate international cargo movement. Our location provides direct access to major shipping routes, seaports, airports, and free zones, enabling us to serve clients across Africa, the Middle East, Asia, Europe, and beyond.
                  </p>
                  <p className="mt-3 text-[15px] font-medium leading-relaxed text-slate-300">
                    Through our trusted freight partners and extensive logistics network, we coordinate seamless transportation solutions that support global trade while ensuring compliance with international shipping standards and regional regulations.
                  </p>
                </RevealText>
              </div>

              <div className="lg:col-span-4 flex flex-col items-center justify-center rounded-2xl border border-[#315671] bg-[#14314B] p-8 text-center shadow-lg">
                <Globe2 className="h-16 w-16 text-[#FDBA74]" />
                <h4 className="mt-4 text-[22px] font-black text-white">Global Reach</h4>
                <p className="mt-2 text-[13px] font-semibold text-slate-400">Africa • Middle East • Asia • Europe</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── 6. Contact & Questions CTA Banner ── */}
      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[24px] border border-[#315671] bg-gradient-to-br from-[#14314B] to-[#0B1F33] p-10 md:p-14 text-center shadow-2xl space-y-6">
            <RevealHeading>
              <h2 className="text-[32px] font-black text-white md:text-[44px]">
                Have More Questions?
              </h2>
            </RevealHeading>
            <RevealText delay={120}>
              <p className="mx-auto max-w-xl text-[16px] font-medium text-slate-300">
                Our team at AGTP Group is here to help you every step of the way.
              </p>
            </RevealText>

            <div className="flex flex-wrap items-center justify-center gap-6 text-[15px] font-bold text-[#FDBA74]">
              <a href="mailto:inquiries@agtpgroup.com" className="flex items-center gap-2 hover:underline">
                <Mail className="h-4 w-4 text-[#F97316]" /> inquiries@agtpgroup.com
              </a>
              <a href="tel:+971585855729" className="flex items-center gap-2 hover:underline">
                <Phone className="h-4 w-4 text-[#F97316]" /> +971 58 5855729
              </a>
            </div>

            <RevealButton delay={180} className="pt-4 flex justify-center">
              <Link
                href="/contact-us"
                className="inline-flex h-[56px] items-center gap-3 rounded-full bg-[#F97316] px-9 text-[16px] font-black text-white transition-colors hover:bg-[#EA580C] shadow-lg hover:shadow-orange-500/20"
              >
                <span>Contact Us Now</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </RevealButton>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
