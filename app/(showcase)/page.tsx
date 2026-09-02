"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Car,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  FileCheck,
  Globe2,
  Package,
  Search,
  Ship,
  Truck,
  Wrench
} from "lucide-react";

import { HeroCarousel } from "@/components/home/hero-carousel";
import { VehicleInquiryModal } from "@/components/vehicles/vehicle-inquiry-modal";
import { VehicleCard } from "@/components/vehicles/vehicle-card";
import { getAllVehicles } from "@/lib/vehicles/data";
import type { Vehicle } from "@/lib/vehicles/types";
import {
  Reveal,
  RevealButton,
  RevealCounter,
  RevealEyebrow,
  RevealHeading,
  RevealStagger,
  RevealText
} from "@/components/ui/scroll-reveal";
import { usePrefersReducedMotion } from "@/components/ui/use-reduced-motion";
import { agtpAssets } from "@/src/assets";







const heroStats = [
  { icon: Ship, value: 10000, suffix: "+", label: "Exports" },
  { icon: Globe2, value: 25, suffix: "+", label: "Countries Served" },
  { icon: FileCheck, value: 11, suffix: "+", label: "Years in Trade" },
  { icon: Truck, value: 94, suffix: "%", label: "On-Time Delivery" }
];

const industryCards = [
  {
    title: "Sedans & SUVs",
    subtitle: "Passenger vehicles for global export",
    image: agtpAssets.suvs,
    icon: Car,
    href: "/vehicles",
    layout: "min-h-[360px] xl:col-span-5 xl:row-span-2 xl:min-h-[540px]"
  },
  {
    title: "Pickups & Ambulance",
    subtitle: "Utility, commercial & emergency vehicles",
    image: agtpAssets.pickups,
    icon: Truck,
    href: "/vehicles?category=Pickup",
    layout: "min-h-[250px] xl:col-span-4 xl:min-h-[260px]"
  },
  {
    title: "Vans & buses",
    subtitle: "Practical passenger and cargo transport",
    image: agtpAssets.vans,
    icon: Truck,
    href: "/vehicles?search=van",
    layout: "min-h-[250px] xl:col-span-3 xl:min-h-[260px]"
  },
  {
    title: "Engines & Modifications",
    subtitle: "Engines, gearboxes, and custom upgrades",
    image: agtpAssets.mercedesCclassCard,
    icon: Package,
    href: "/spare-parts",
    layout: "min-h-[250px] xl:col-span-3 xl:min-h-[260px]"
  },
  {
    title: "Parts & accessories",
    subtitle: "OEM, genuine, and aftermarket supply",
    image: agtpAssets.sparePartsHero,
    icon: Wrench,
    href: "/spare-parts",
    layout: "min-h-[250px] xl:col-span-4 xl:min-h-[260px]"
  }
];

const processSteps = [
  {
    number: "01",
    title: "Tell Us What You Need",
    body: "Share the product, specifications, quantity, and destination with our team.",
    icon: Search
  },
  {
    number: "02",
    title: "Receive Your Quotation",
    body: "We confirm availability, specifications, pricing, and shipping options for your order.",
    icon: FileCheck
  },
  {
    number: "03",
    title: "Confirm Your Order",
    body: "Approve the quotation and complete payment to proceed with your order.",
    icon: CheckCircle2
  },
  {
    number: "04",
    title: "We Prepare & Deliver",
    body: "We handle inspection, documentation, shipping, and delivery to your destination.",
    icon: Ship
  }
];

const globalMarkets = [
  {
    name: "Angola",
    region: "Southern Africa",
    code: "01",
    image: "https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Ghana",
    region: "West Africa",
    code: "02",
    image: "https://images.unsplash.com/photo-1598971861713-54ad16a7e72e?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Congo",
    region: "Central Africa",
    code: "03",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Nigeria",
    region: "West Africa",
    code: "04",
    image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Togo",
    region: "West Africa",
    code: "05",
    image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Cameroon",
    region: "Central Africa",
    code: "06",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
  }
];

const supplierCards = [
  { title: "Automotive Body Kits Market Location 6", experience: "18+ year Experience", countries: "Serving 25+ Countries", image: agtpAssets.cadillacEscaladeCard },
  { title: "Automotive Body Kits Market Location 5", experience: "10+ year Experience", countries: "Serving 14+ Countries", image: agtpAssets.bmw760Card },
  { title: "Automotive Body Kits Market Location 2", experience: "10+ year Experience", countries: "Serving 25+ Countries", image: agtpAssets.mercedesCclassCard },
  { title: "Automotive Body Kits Market Location 3", experience: "13+ year Experience", countries: "Serving 20+ Countries", image: agtpAssets.bydDestroyerCard },
  { title: "Automotive Body Kits Market Location 4", experience: "12+ year Experience", countries: "Serving 15+ Countries", image: agtpAssets.bmwX2Card },
  { title: "Automotive Parts Market Location 10", experience: "10+ year Experience", countries: "Serving 25+ Countries", image: agtpAssets.sparePartsHero }
];

interface CustomerStoryItem {
  name: string;
  label: string;
  image: any;
  video?: string;
  story: string;
}

const customerStories: CustomerStoryItem[] = [
  {
    name: "Mr. Ringo",
    label: "Repeat Vehicle Buyer",
    image: agtpAssets.reviewR1,
    story:
      "Purchased a fully equipped Toyota Land Cruiser Hardtop without visiting Dubai, marking his 4th vehicle purchase with AGTP Group."
  },
  {
    name: "Mr. Patrick Mwamba",
    label: "Corporate Fleet Importer",
    image: agtpAssets.reviewR2,
    video: "https://videos.pexels.com/video-files/3571264/3571264-hd_1920_1080_30fps.mp4",
    story:
      "Verified video walkaround and live delivery at the port in Congo. Seamless export documentation and premium vehicle quality."
  },
  {
    name: "Mr. Jorge Goncalves",
    label: "Oil & Gas Professional",
    image: agtpAssets.reviewR2,
    story:
      "Purchased multiple vehicles through our secure online process, with shipments successfully delivered to Angola."
  },
  {
    name: "Mr. David Ganga",
    label: "Mining & Logistics Buyer",
    image: agtpAssets.reviewR4,
    video: "https://videos.pexels.com/video-files/5309379/5309379-hd_1920_1080_25fps.mp4",
    story:
      "Inspected our vehicles via live video feed before shipping to Luanda. Every vehicle arrived on schedule in showroom condition."
  },
  {
    name: "Mr. Muhammad Sumani",
    label: "Engineer",
    image: agtpAssets.reviewR3,
    story:
      "Completed his vehicle purchase entirely online, with AGTP Group safely exporting and delivering the unit to Ghana."
  },
  {
    name: "Mr. Eduardo Conde Salamau",
    label: "Oil & Gas Professional",
    image: agtpAssets.reviewR4,
    story:
      "Used our secure online payment process while AGTP Group managed the full export and delivery coordination."
  }
];

const leadingBrands = ["BYD", "Toyota", "Suzuki", "Mitsubishi", "Hyundai", "Kia", "Nissan", "Jetour", "Mercedes", "BMW"];
const brandLogoSrc: Record<string, string> = {
  BYD: "/brands/byd.svg",
  Toyota: "/brands/toyota.svg",
  Suzuki: "/brands/suzuki.svg",
  Mitsubishi: "/brands/mitsubishi.svg",
  Hyundai: "/brands/hyundai.svg",
  Kia: "/brands/kia.svg",
  Nissan: "/brands/nissan.svg",
  Jetour: "/brands/jetour.svg",
  Mercedes: "/brands/mercedes.svg",
  BMW: "/brands/bmw.svg"
};



export default function HomePage() {
  const allVehicles = getAllVehicles();
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredVehicles = searchQuery.trim()
    ? allVehicles.filter((vehicle) =>
        `${vehicle.make} ${vehicle.model} ${vehicle.variant} ${vehicle.year}`.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allVehicles;

  const categoryMarqueeItems = [
    { label: "Sedans & SUVs", href: "/vehicles" },
    { label: "Pickups & trucks", href: "/vehicles?category=Pickup" },
    { label: "Vans & buses", href: "/vehicles?search=van" },
    { label: "Fire Apparatus & Ambulance", href: "/vehicles?search=ambulance" },
    { label: "Parts & accessories", href: "/spare-parts" },
    { label: "Engines & Gears", href: "/spare-parts" },
    { label: "Modifications", href: "/contact-us" }
  ];

  return (
    <div className="bg-[#060709] pb-20 text-white">
      <HeroCarousel />

      <Marquee items={categoryMarqueeItems} />

      <VehicleShowcaseSection
        vehicles={filteredVehicles}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
      />

      <IndustriesSection />

      <ProcessSection />

      <GlobalNetworkSection />

      <WhyAgtpGroupSection />

      <HeroStatsSection />

      <DubaiMarketsSection />

      <PromiseRevealSection />

      <AutomotivePartsSpotlight />

      <CustomerStoriesSection />

      <LeadingBrandsSection />

      <section className="mx-auto max-w-[1570px] px-8 sm:px-12 lg:px-16 xl:px-20 pt-[80px]">
        <Reveal>
          <div className="relative min-h-[560px] overflow-hidden rounded-[20px] border border-[#315671] bg-[#14314B]">
            <Image src={agtpAssets.exportPort} alt="Shipping containers at an export port" fill className="object-cover" sizes="1570px" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,16,28,0.50)_0%,rgba(6,16,28,0.22)_55%,rgba(6,16,28,0.05)_100%)]" />
            <div className="relative z-10 flex min-h-[560px] max-w-[840px] flex-col justify-center px-8 py-12 text-left md:px-14 lg:px-20">
              <SectionEyebrow>GET A QUOTE</SectionEyebrow>
              <RevealHeading>
                <h2 className="mt-6 max-w-[760px] text-[32px] font-black leading-[1.08] tracking-normal md:text-[48px]">
                  Tell Us What You Need.
                  <br />
                  We’ll Take It From There.
                </h2>
              </RevealHeading>
              <RevealText>
                <p className="mt-5 max-w-[670px] text-[15px] font-medium leading-[1.6] text-slate-200 md:text-[17px]">
                  Share your requirements and receive a clear quotation with reliable supply, export coordination, and delivery support.
                </p>
              </RevealText>
              <RevealButton>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => setInquiryModalOpen(true)}
                    className="flex h-[58px] items-center gap-3 rounded-full bg-[#F97316] px-8 text-[16px] font-extrabold text-white transition-colors hover:bg-[#EA580C]"
                  >
                    <span>Get a Quote</span>
                    <ArrowRight className="h-5 w-5" />
                  </button>
                  <Link href="/vehicles" className="flex h-[58px] items-center rounded-full border border-white/30 px-8 text-[16px] font-extrabold text-white transition-colors hover:bg-white/10">
                    Browse Inventory
                  </Link>
                </div>
              </RevealButton>
            </div>
          </div>
        </Reveal>
      </section>

      <VehicleInquiryModal isOpen={inquiryModalOpen} onClose={() => setInquiryModalOpen(false)} />
    </div>
  );
}

function SectionEyebrow({ children, center = false }: { children: React.ReactNode; center?: boolean }) {
  return (
    <RevealEyebrow>
      <div className={`flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.28em] text-[#FDBA74] ${center ? "justify-center" : ""}`}>
        <span style={{ backgroundColor: "var(--agtp-secondary)" }} className="h-px w-8" />
        {children}
      </div>
    </RevealEyebrow>
  );
}


function VehicleShowcaseSection({
  vehicles,
  searchQuery,
  onSearchQueryChange
}: {
  vehicles: Vehicle[];
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
}) {
  return (
    <section className="mx-auto max-w-[1570px] px-8 sm:px-12 lg:px-16 xl:px-20 pt-[92px]">
      <div className="mb-10 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <SectionEyebrow>FEATURED INVENTORY</SectionEyebrow>
          <RevealHeading>
            <h2 className="mt-2 text-[26px] font-black leading-none tracking-normal md:text-[34px]">Automotive Vehicles</h2>
          </RevealHeading>
        </div>

        <RevealButton>
          <div className="flex w-full max-w-none items-center rounded-full border border-[#315671] bg-[#0B1F33] p-1.5 sm:p-2 lg:max-w-[500px]">
            <input
              type="text"
              placeholder="Search make, model, name..."
              value={searchQuery}
              onChange={(event) => onSearchQueryChange(event.target.value)}
              className="min-w-0 flex-1 bg-transparent px-4 text-[15px] font-medium text-white outline-none placeholder:text-slate-500 sm:px-6 sm:text-[16px]"
            />
            <Link
              href={`/vehicles?search=${encodeURIComponent(searchQuery)}`}
              className="flex h-[50px] shrink-0 items-center gap-2 rounded-full bg-[#F97316] px-5 text-[14px] font-extrabold text-white transition-colors hover:bg-[#EA580C] sm:h-[56px] sm:gap-3 sm:px-8 sm:text-[17px]"
            >
              <span>Search</span>
              <Search className="h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
          </div>
        </RevealButton>
      </div>

      <RevealStagger staggerDelay={70} className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
        {vehicles.slice(0, 6).map((vehicle, index) => (
          <div key={vehicle.id} className={index >= 4 ? "hidden lg:block" : undefined}>
            <VehicleCard vehicle={vehicle} />
          </div>
        ))}
      </RevealStagger>

      {vehicles.length === 0 && (
        <p className="py-10 text-center text-[15px] font-semibold text-slate-400">No vehicles match your search.</p>
      )}
    </section>
  );
}

function HeroStatsSection() {
  return (
    <section className="mx-auto max-w-[1570px] px-8 sm:px-12 lg:px-16 xl:px-20 pt-[72px]">
      <RevealStagger staggerDelay={70} className="grid overflow-hidden rounded-[14px] border border-[#315671] bg-[#102941] shadow-lg md:grid-cols-2 xl:grid-cols-4">
        {heroStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="flex min-h-[112px] items-center justify-center gap-4 border-b border-[#315671] px-5 py-6 md:border-r xl:border-b-0">
              <Icon className="h-7 w-7 shrink-0 text-[#FDBA74]" />
              <div>
                <div className="text-[28px] font-black leading-none text-white md:text-[36px]">
                  <RevealCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-1.5 text-[12px] font-semibold text-slate-400">{stat.label}</div>
              </div>
            </div>
          );
        })}
      </RevealStagger>
    </section>
  );
}

function IndustriesSection() {
  return (
    <section className="mx-auto max-w-[1570px] px-8 sm:px-12 lg:px-16 xl:px-20 pt-[82px]">
      <div className="text-center">
        <SectionEyebrow center>INDUSTRIES WE SERVE</SectionEyebrow>
        <RevealHeading>
          <h2 className="mx-auto mt-5 max-w-[760px] text-[28px] font-black leading-[1.1] tracking-normal md:text-[42px]">
            Your Needs. Our Global Supply
          </h2>
        </RevealHeading>
      </div>

      <div className="mt-[48px] grid auto-rows-[minmax(250px,auto)] grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-12">
        {industryCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Reveal key={card.title} delay={index * 85} className={card.layout}>
              <Link href={card.href} className="group relative flex h-full overflow-hidden rounded-[18px] border border-[#315671] bg-[#14314B] p-6 shadow-lg transition-all duration-500 hover:-translate-y-1 hover:border-[#F97316]/75 hover:shadow-[0_22px_50px_rgba(0,0,0,0.24)]">
                <Image src={card.image} alt={card.title} fill className="object-cover opacity-100 transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33]/70 via-[#0B1F33]/15 to-transparent" />
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
  );
}

function ProcessSection() {
  return (
    <section id="how-it-works" className="mx-auto max-w-[1570px] scroll-mt-32 px-8 sm:px-12 lg:px-16 xl:px-20 pt-[96px] text-center">
        <SectionEyebrow center>OUR PROCESS</SectionEyebrow>
        <RevealHeading>
          <h2 className="mx-auto mt-5 max-w-[760px] text-[28px] font-black leading-[1.1] tracking-normal md:text-[42px]">
            How AGTP Group Works
          </h2>
        </RevealHeading>

      <div className="relative mt-[48px]">
        <div className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-[55px] hidden h-px bg-[#F97316]/35 xl:block" />
        <RevealStagger staggerDelay={120} className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4 xl:gap-0">
          {processSteps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="relative h-full px-0 xl:px-3">
                <div className="group relative flex h-full min-h-[292px] flex-col overflow-hidden rounded-[16px] border border-[#315671] bg-[#14314B] p-7 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-[#F97316]/75 hover:shadow-[0_22px_50px_rgba(0,0,0,0.22)]">
                  <span className="absolute -right-2 -top-10 text-[112px] font-black leading-none text-white/[0.035]" aria-hidden="true">
                    {step.number}
                  </span>
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#F97316]/35 bg-[#F97316]/10 text-[#FDBA74]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="flex h-11 min-w-11 items-center justify-center rounded-full border border-[#F97316]/50 bg-[#0B1F33] px-3 text-[14px] font-black text-[#FDBA74]">
                      {step.number}
                    </span>
                  </div>
                  <div className="relative z-10 mt-auto pt-10">
                    <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#FDBA74]">Step {step.number}</p>
                    <h3 className="mt-2.5 text-[19px] font-black leading-[1.1] text-white">{step.title}</h3>
                    <p className="mt-3 text-[13px] font-medium leading-[1.5] text-slate-300">{step.body}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </RevealStagger>
      </div>
    </section>
  );
}

function GlobalNetworkSection() {
  return (
    <section className="mt-[82px] border-y border-[#24445F] bg-[#081A2B] py-[82px]">
      <div className="mx-auto max-w-[1570px] px-8 sm:px-12 lg:px-16 xl:px-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <div>
            <SectionEyebrow>OUR GLOBAL NETWORK</SectionEyebrow>
            <RevealHeading>
              <h2 className="mt-5 max-w-[780px] text-[28px] font-black leading-[1.1] tracking-normal md:text-[42px]">
                Dubai Supply. Global Markets. One Connection.
              </h2>
            </RevealHeading>
          </div>
          <RevealText>
            <p className="max-w-[650px] text-[14px] font-medium leading-[1.6] text-slate-300">
              From Dubai, we deliver reliable products to buyers across key African markets.
            </p>
          </RevealText>
        </div>

        <div className="mt-[48px] grid grid-cols-1 gap-5 lg:grid-cols-[0.88fr_1.12fr]">
          <Reveal className="h-full">
            <div className="group relative flex min-h-[440px] flex-col overflow-hidden rounded-[18px] border border-[#315671] bg-[#102941] p-8 shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80"
                alt="Dubai, UAE Landmark"
                fill
                className="object-cover opacity-100 transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33]/70 via-[#0B1F33]/15 to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,color-mix(in_srgb,var(--agtp-secondary,#F97316)_12%,transparent),transparent_35%)]" />
              <span className="absolute -bottom-14 -right-5 text-[220px] font-black leading-none text-white/[0.04]" aria-hidden="true">
                DXB
              </span>
              <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-[#F97316]/40 bg-[#0B1F33]/80 text-[#FDBA74] backdrop-blur-md">
                <Globe2 className="h-7 w-7" />
              </div>
              <div className="relative z-10 mt-auto">
                <p className="text-[12px] font-black uppercase tracking-[0.22em] text-[#FDBA74]">Export Hub</p>
                <h3 className="mt-3 text-[38px] font-black leading-none text-white md:text-[48px]">Dubai, UAE</h3>
                <p className="mt-5 max-w-[390px] text-[16px] font-medium leading-[1.6] text-slate-200">
                  Coordinating sourcing, inspection, documentation, and shipment from one connected trade hub.
                </p>
              </div>
            </div>
          </Reveal>

          <RevealStagger staggerDelay={70} className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {globalMarkets.map((market) => (
              <div key={market.name} className="group relative min-h-[205px] overflow-hidden rounded-[18px] border border-[#315671] bg-[#14314B] p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#F97316]">
                <Image
                  src={market.image}
                  alt={market.name}
                  fill
                  className="object-cover opacity-100 transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33]/70 via-[#0B1F33]/10 to-transparent" />
                <span className="absolute right-5 top-4 text-[52px] font-black leading-none text-white/[0.08]" aria-hidden="true">
                  {market.code}
                </span>
                <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[#F97316]/45 bg-[#0B1F33]/80 text-[#FDBA74] backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                  <ArrowRight className="h-4 w-4" />
                </div>
                <div className="relative z-10 mt-10">
                  <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#FDBA74]">Active Market</p>
                  <h3 className="mt-2 text-[21px] font-black leading-none text-white">{market.name}</h3>
                  <p className="mt-2.5 text-[13px] font-semibold text-slate-200">{market.region}</p>
                </div>
              </div>
            ))}
          </RevealStagger>
        </div>
      </div>
    </section>
  );
}

function DubaiMarketsSection() {
  return (
    <section id="dubai-markets" className="mx-auto max-w-[1570px] scroll-mt-32 px-8 sm:px-12 lg:px-16 xl:px-20 pt-[82px]">
      <div className="text-center">
        <SectionEyebrow center>DUBAI MARKETS</SectionEyebrow>
        <RevealHeading>
          <h2 className="mx-auto mt-5 max-w-[760px] text-[28px] font-black leading-[1.1] tracking-normal md:text-[42px]">
            Automotive Suppliers
          </h2>
        </RevealHeading>
        <RevealButton>
          <Link
            href="/brands"
            style={{ borderColor: "var(--agtp-secondary)" }}
            className="mt-7 inline-flex h-[48px] items-center rounded-full border px-7 text-[14px] font-black text-white transition-colors hover:bg-[var(--agtp-secondary)]"
          >
            View More
          </Link>
        </RevealButton>
      </div>

      <RevealStagger staggerDelay={80} className="mt-[48px] grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {supplierCards.map((supplier) => (
          <div key={supplier.title} className="overflow-hidden rounded-[16px] border border-[#315671] bg-[#14314B] shadow-lg">
            <div className="relative h-[220px] bg-[#0B1F33]">
              <Image src={supplier.image} alt={supplier.title} fill className="object-cover opacity-100" sizes="(max-width: 768px) 100vw, 33vw" />
              <div className="absolute right-4 top-4 rounded-full bg-[#0B1F33]/80 px-3.5 py-2 text-[11px] font-black text-white">
                Automotive Parts, Body Kits, Tyres
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-[17px] font-black leading-tight text-white">{supplier.title}</h3>
              <div className="mt-5 flex flex-wrap gap-4 text-[13px] font-semibold text-slate-300">
                <span>{supplier.experience}</span>
                <span>{supplier.countries}</span>
              </div>
              <Link
                href="/brands"
                style={{ borderColor: "color-mix(in srgb, var(--agtp-secondary) 50%, transparent)" }}
                className="mt-6 flex h-[46px] items-center justify-center rounded-full border text-[13px] font-black text-white transition-colors hover:bg-[var(--agtp-secondary)] hover:border-[var(--agtp-secondary)]"
              >
                View Supplier Profile
              </Link>
            </div>
          </div>
        ))}
      </RevealStagger>
    </section>
  );
}



const automotivePartsPanels = [
  { label: "Category", value: "Spare Parts", href: "/spare-parts" },
  { label: "Component", value: "Engines", href: "/spare-parts" },
  { label: "Upgrade", value: "Body Kits", href: "/spare-parts" },
  { label: "Performance", value: "Tyres", href: "/spare-parts" }
];

function AutomotivePartsSpotlight() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const scrollMotionEnabled = isDesktop && !prefersReducedMotion;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const updateViewport = () => setIsDesktop(mediaQuery.matches);

    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);
    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  useEffect(() => {
    if (!scrollMotionEnabled) {
      setProgress(0);
      return;
    }

    const updateProgress = () => {
      const section = sectionRef.current;
      if (!section) return;

      const stickyTop = window.innerWidth >= 1280 ? 144 : 92;
      const bounds = section.getBoundingClientRect();
      const scrollDistance = Math.max(section.offsetHeight - window.innerHeight + stickyTop, 1);
      const travelled = Math.max(0, stickyTop - bounds.top);
      setProgress(Math.min(Math.max(travelled / scrollDistance, 0), 1));
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [scrollMotionEnabled]);

  const clamp = (value: number) => Math.min(Math.max(value, 0), 1);
  const headingEnter = clamp(progress / 0.18);
  const headingExit = clamp((progress - 0.65) / 0.18);
  const headingOpacity = scrollMotionEnabled ? headingEnter * (1 - headingExit) : 1;
  const headingShift = scrollMotionEnabled ? 30 - progress * 70 : 0;

  return (
    <section ref={sectionRef} className={`relative ${scrollMotionEnabled ? "md:h-[330vh]" : ""}`}>
      <div className={`relative min-h-[650px] overflow-hidden border-y border-[#315671] bg-[#081A2B] ${scrollMotionEnabled ? "md:sticky md:top-[92px] md:h-[calc(100svh-92px)] md:min-h-0 xl:top-[144px] xl:h-[calc(100svh-144px)]" : ""}`}>
        <Image
          src={agtpAssets.spotlightFerrari}
          alt="Premium automotive parts and vehicle components"
          fill
          sizes="100vw"
          className="object-cover object-center"
          style={scrollMotionEnabled ? { transform: `scale(${1 + progress * 0.07}) translateX(${-progress * 2}%)` } : undefined}
        />
        <div className="absolute inset-0 bg-[#06101C]/10" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,16,28,0.45)_0%,rgba(6,16,28,0.18)_44%,transparent_100%)]" />

        <div className="relative z-10 mx-auto flex min-h-[650px] max-w-[1570px] flex-col justify-end px-6 py-10 md:h-full md:min-h-0 md:px-8 md:py-12 xl:px-12 xl:py-14">
          <div
            className="max-w-[700px] transition-[opacity,transform] duration-100 ease-out"
            style={{ opacity: headingOpacity, transform: `translateY(${headingShift}px)` }}
          >
            <p className="text-[11px] font-black uppercase tracking-[0.26em] text-[#FDBA74]">Automotive Parts</p>
            <h2 className="mt-4 max-w-[480px] text-[32px] font-black leading-[0.96] text-white sm:text-[44px] xl:max-w-[700px] xl:text-[clamp(42px,4.5vw,78px)]">
              Parts That Keep The World Moving
            </h2>
            <p className="mt-5 max-w-[510px] text-[14px] font-semibold leading-[1.6] text-slate-200 md:text-[15px]">
              Source genuine components, performance upgrades, and essential vehicle parts through one dependable partner.
            </p>
          </div>

          <div className={`mt-10 grid grid-cols-1 gap-3 ${scrollMotionEnabled ? "md:absolute md:right-6 md:top-1/2 md:mt-0 md:w-[min(43vw,360px)] md:-translate-y-1/2 xl:right-[max(3rem,calc((100vw-1570px)/2+3rem))] xl:w-[min(37vw,610px)]" : "max-w-[610px]"}`}>
            {automotivePartsPanels.map((panel, index) => {
              const panelProgress = clamp((progress - (0.26 + index * 0.13)) / 0.14);
              const panelStyle = scrollMotionEnabled
                ? { opacity: panelProgress, transform: `translateX(${(1 - panelProgress) * 68}px)` }
                : undefined;

              return (
                <Link
                  key={panel.value}
                  href={panel.href}
                  className="group flex min-h-[82px] items-center justify-between rounded-[14px] border border-[#3D6480] bg-[#0B1F33]/85 px-6 py-4 backdrop-blur-sm transition-[opacity,transform,border-color,background-color] duration-150 ease-out hover:border-[#F97316] hover:bg-[#102941]/95"
                  style={panelStyle}
                >
                  <span className="text-[13px] font-medium text-slate-300">{panel.label}</span>
                  <span className="flex items-center gap-2 text-right text-[18px] font-black text-white lg:text-[20px] xl:gap-3 xl:text-[23px]">
                    {panel.value}
                    <ArrowRight className="h-5 w-5 text-[#FDBA74] transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>

          {scrollMotionEnabled ? (
            <p className="absolute right-5 top-1/2 hidden -translate-y-1/2 rotate-90 text-[10px] font-black uppercase tracking-[0.3em] text-white/55 xl:block">
              Scroll to explore
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function LeadingBrandsSection() {
  return (
    <section className="overflow-hidden border-y border-[#24445F] bg-[#081A2B] py-[82px]">
      <div className="mx-auto max-w-[1570px] px-8 sm:px-12 lg:px-16 xl:px-20 text-center">
        <SectionEyebrow center>LEADING CAR BRANDS</SectionEyebrow>
        <RevealHeading>
          <h2 className="mx-auto mt-5 max-w-[740px] text-[28px] font-black leading-[1.1] tracking-normal md:text-[42px]">
            Trusted Global Brands
          </h2>
        </RevealHeading>
      </div>

      <Reveal className="mt-[48px]">
        <BrandMarquee brands={leadingBrands} />
      </Reveal>
    </section>
  );
}

function WhyAgtpGroupSection() {
  return (
    <section className="mx-auto max-w-[1570px] px-8 sm:px-12 lg:px-16 xl:px-20 py-[95px] text-center">
      <SectionEyebrow center>WHY AGTP GROUP</SectionEyebrow>
      <RevealHeading>
        <h2 className="mx-auto mt-6 max-w-[900px] text-[32px] font-black leading-[1.1] tracking-normal text-white md:text-[50px]">
          11 Years of Exports.
          <br />
          One Partner. Zero
          <br />
          Surprises.
        </h2>
      </RevealHeading>
      <RevealText>
        <p className="mx-auto mt-6 max-w-[680px] text-[15px] font-medium leading-[1.6] text-slate-300 md:text-[17px]">
          We simplify international trade with reliable supply, transparent communication &amp; dependable delivery from Dubai to the world.
        </p>
      </RevealText>
    </section>
  );
}

function BrandMarquee({ brands }: { brands: string[] }) {
  const repeatedBrands = [...brands, ...brands, ...brands];

  return (
    <div className="flex overflow-hidden py-4 motion-reduce:overflow-x-auto">
      <div className="animate-marquee flex w-max shrink-0 gap-6 px-4 motion-reduce:animate-none">
        {repeatedBrands.map((brand, index) => {
          const logoSrc = brandLogoSrc[brand];

          return (
            <div
              key={`${brand}-${index}`}
              className="group relative flex h-[140px] w-[210px] shrink-0 items-center justify-center rounded-[22px] border border-[#315671] bg-[#14314B] p-6 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-[#F97316] hover:bg-[#1A3D5C] hover:shadow-[0_16px_35px_rgba(6,16,28,0.7)]"
            >
              <div className="absolute inset-0 rounded-[22px] bg-gradient-to-b from-white/[0.08] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="relative z-10 flex h-20 w-36 items-center justify-center transition-transform duration-300 group-hover:scale-110">
                {logoSrc ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={logoSrc}
                    alt={`${brand} logo`}
                    className="h-[72px] w-auto max-w-[170px] max-h-[72px] object-contain drop-shadow-[0_2px_8px_rgba(255,255,255,0.15)]"
                  />
                ) : (
                  <Car className="h-12 w-12 text-[#FDBA74]" aria-hidden="true" />
                )}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CustomerStoriesSection() {
  const [activeStory, setActiveStory] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;

    const interval = window.setInterval(() => {
      setActiveStory((current) => (current + 1) % customerStories.length);
    }, 6000);

    return () => window.clearInterval(interval);
  }, [isPaused, prefersReducedMotion]);

  const selectStory = (index: number) => {
    setActiveStory((index + customerStories.length) % customerStories.length);
  };

  return (
    <section id="customer-reviews" className="mx-auto max-w-[1570px] scroll-mt-32 px-8 sm:px-12 lg:px-16 xl:px-20 pt-[82px] text-center">
      <SectionEyebrow center>CUSTOMER REVIEWS</SectionEyebrow>
      <RevealHeading>
        <h2 className="mx-auto mt-5 max-w-[760px] text-[28px] font-black leading-[1.1] tracking-normal md:text-[42px]">
          What Our Customers Say
        </h2>
      </RevealHeading>

      <Reveal className="mt-[48px]">
        <div
          className="relative overflow-hidden py-4 xl:h-[660px]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className={prefersReducedMotion ? "hidden" : "hidden h-full xl:block"}>
            {customerStories.map((story, index) => {
              let offset = index - activeStory;
              if (offset > customerStories.length / 2) offset -= customerStories.length;
              if (offset < -customerStories.length / 2) offset += customerStories.length;

              const isActive = offset === 0;
              const isNearby = Math.abs(offset) === 1;
              const translation = offset * 320;

              return (
                <article
                  key={story.name}
                  className="absolute left-1/2 top-4 flex h-[630px] w-[420px] -translate-x-1/2 flex-col overflow-hidden rounded-[24px] border border-[#315671] bg-[#14314B] text-left shadow-2xl transition-[opacity,transform,filter] duration-700 ease-out"
                  style={{
                    opacity: isActive ? 1 : isNearby ? 0.45 : 0,
                    transform: `translateX(calc(-50% + ${translation}px)) scale(${isActive ? 1 : isNearby ? 0.88 : 0.78})`,
                    filter: isActive ? "none" : "saturate(0.4) brightness(0.75)",
                    pointerEvents: isActive ? "auto" : "none",
                    zIndex: isActive ? 30 : isNearby ? 20 : 10
                  }}
                >
                  <TestimonialCard story={story} active={isActive} />
                </article>
              );
            })}
          </div>

          <div className={prefersReducedMotion ? "" : "xl:hidden"}>
            <article className="mx-auto flex h-[630px] max-w-[420px] flex-col overflow-hidden rounded-[24px] border border-[#315671] bg-[#14314B] text-left shadow-2xl">
              <TestimonialCard story={customerStories[activeStory]} active />
            </article>
          </div>
        </div>
      </Reveal>

      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => selectStory(activeStory - 1)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#3D6480] text-white transition-colors hover:border-[#F97316] hover:bg-[#F97316]"
          aria-label="Show previous customer story"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2" aria-label="Customer story selection">
          {customerStories.map((story, index) => (
            <button
              key={story.name}
              type="button"
              onClick={() => selectStory(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${index === activeStory ? "w-8 bg-[#F97316]" : "w-2.5 bg-[#3D6480] hover:bg-slate-300"}`}
              aria-label={`Show ${story.name}'s customer story`}
              aria-current={index === activeStory ? "true" : undefined}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => selectStory(activeStory + 1)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#3D6480] text-white transition-colors hover:border-[#F97316] hover:bg-[#F97316]"
          aria-label="Show next customer story"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}

function TestimonialCard({
  story,
  active
}: {
  story: CustomerStoryItem;
  active: boolean;
}) {
  return (
    <>
      <div className="relative h-[460px] w-full shrink-0 overflow-hidden bg-[#06101C]">
        {story.video ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster={typeof story.image === "string" ? story.image : story.image?.src}
            className="h-full w-full object-cover object-center"
            aria-label={`${story.name} customer video story`}
          >
            <source src={story.video} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={story.image}
            alt={`${story.name} customer story`}
            fill
            className="object-cover object-center"
            sizes="420px"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#14314B] via-transparent to-transparent pointer-events-none" />
        <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-[#0B1F33]/85 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-white backdrop-blur-md flex items-center gap-1.5 z-10">
          {story.video && <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />}
          {story.video ? "Video Story" : "Customer Story"}
        </span>
      </div>
      <div className="relative flex flex-1 flex-col justify-between p-5 sm:p-6 bg-[#14314B]">
        <div>
          <div className="flex items-start gap-3">
            <span className="mt-1 h-7 w-1.5 shrink-0 rounded-full bg-[#F97316]" />
            <div>
              <h3 className="text-[17px] font-black leading-tight text-white">{story.name}</h3>
              <p className="mt-0.5 text-[10px] font-black uppercase tracking-[0.15em] text-[#FDBA74]">{story.label}</p>
            </div>
          </div>
          <p className="mt-3 text-[13px] font-medium leading-[1.5] text-slate-200 line-clamp-3">
            &ldquo;{story.story}&rdquo;
          </p>
        </div>
      </div>
    </>
  );
}



function PromiseRevealSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeCount, setActiveCount] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();
  const words =
    "Our promise is simple: transparency in every step, reliability in every delivery, and value in every partnership.".split(
      " "
    );
  const blueStartIndex = Math.floor(words.length / 2);

  useEffect(() => {
    if (prefersReducedMotion) {
      setActiveCount(words.length);
      return;
    }

    let frame = 0;

    const update = () => {
      if (frame) return;

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const section = sectionRef.current;
        if (!section) return;

        const heading = section.querySelector("h2");
        const rect = heading ? heading.getBoundingClientRect() : section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const start = windowHeight * 0.72;
        const end = windowHeight * 0.25;
        const progress = Math.min(Math.max((start - rect.top) / (start - end), 0), 1);

        setActiveCount(Math.round(progress * words.length));
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [prefersReducedMotion, words.length]);

  return (
    <section ref={sectionRef} className="relative border-y border-[#111827] py-[82px]">
      <div className="mx-auto w-full max-w-[1570px] px-8 sm:px-12 lg:px-16 xl:px-20">
        <SectionEyebrow>OUR PROMISE</SectionEyebrow>
        <h2 className="mt-7 max-w-[700px] font-[family-name:var(--font-sora)] text-[26px] font-extrabold leading-[1.24] tracking-normal text-[#EEF1FA] md:text-[36px] lg:text-[46px]">
          {words.map((word, index) => (
            <span
              key={`${word}-${index}`}
              className={`mr-[0.23em] inline-block transition-colors duration-300 ${
                index < activeCount ? (index >= blueStartIndex ? "text-[#F97316]" : "text-[#EEF1FA]") : "text-[#27445D]"
              }`}
            >
              {word}
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
}



type MarqueeItem = string | { label: string; href: string };

function Marquee({ items, muted = false }: { items: MarqueeItem[]; muted?: boolean }) {
  const content = [...items, ...items, ...items, ...items];
  return (
    <div className={`${muted ? "mt-[75px] border-y border-[#24445F] bg-[#102941] py-12" : "border-y border-[#24445F] bg-[#102941] py-9"} overflow-hidden group`}>
      <div className={`${muted ? "text-[36px] text-transparent opacity-50 marquee-outline" : "text-[40px] text-white"} animate-marquee group-hover:[animation-play-state:paused] flex items-center gap-12 whitespace-nowrap font-black uppercase leading-none tracking-normal`}>
        {content.map((item, index) => {
          const label = typeof item === "string" ? item : item.label;
          const href = typeof item === "string" ? undefined : item.href;
          return (
            <span key={`${label}-${index}`} className="flex items-center gap-14">
              {href ? (
                <Link href={href} className="text-white transition-colors duration-200 hover:text-[#F97316] no-underline">
                  {label}
                </Link>
              ) : (
                <span>{label}</span>
              )}
              <span className="text-[#F97316]">*</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}



