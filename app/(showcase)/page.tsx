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
  Cog,
  FileCheck,
  Globe2,
  Package,
  Search,
  Ship,
  Truck,
  Wrench
} from "lucide-react";
import { siBmw, siHyundai, siKia, siMitsubishi, siNissan, siSuzuki, siToyota } from "simple-icons";
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

const serviceCards = [
  {
    num: "01 / 08",
    category: "TRADE-IN",
    title: "Automotive Trading & Export",
    desc: "Luxury cars and quality vehicles sourced from Dubai for global export.",
    image: agtpAssets.sedans,
    href: "/vehicles?category=sedan"
  },
  {
    num: "02 / 08",
    category: "PARTS",
    title: "Machinery & Spare Parts",
    desc: "High-quality automotive spare parts supplied with AGTP trust and performance.",
    image: agtpAssets.suvs,
    href: "/vehicles?category=suv"
  },
  {
    num: "03 / 08",
    category: "MATERIALS",
    title: "Construction Supplies",
    desc: "Reliable construction materials sourced for trade and project requirements.",
    image: agtpAssets.pickups,
    href: "/vehicles?category=pickup"
  },
  {
    num: "04 / 08",
    category: "STONE",
    title: "Marble, Tiles & Stone",
    desc: "Quality marble, tiles, and stone products for global trading needs.",
    image: agtpAssets.vans,
    href: "/vehicles"
  },
  {
    num: "05 / 08",
    category: "ELECTRONICS",
    title: "Electronics & Appliances",
    desc: "Electronics and appliances supplied through dependable sourcing channels.",
    image: agtpAssets.vans,
    href: "/vehicles"
  },
  {
    num: "06 / 08",
    category: "COMMERCE",
    title: "E-commerce Products",
    desc: "General merchandise and e-commerce products sourced for international customers.",
    image: agtpAssets.pickups,
    href: "/vehicles"
  },
  {
    num: "07 / 08",
    category: "HOME",
    title: "Home Decor & Furniture",
    desc: "Furniture and home items selected for quality, value, and reliable delivery.",
    image: agtpAssets.exportPort,
    href: "/contact"
  },
  {
    num: "08 / 08",
    category: "GLOBAL",
    title: "General Trading Solutions",
    desc: "Seamless import and export with reliable sourcing, pricing, and logistics.",
    image: agtpAssets.suvs,
    href: "/contact"
  }
];

const testimonials = [
  ["Satisfied Customers: 10+. AGTP GROUP continues to exceed expectations with dedicated service and reliable sourcing.", "Customer Support"],
  ["Vehicles Handled: 1k+. Quality cars, parts, and trading solutions are sourced through dependable global channels.", "Global Trading Excellence"],
  ["Your trusted global partner for seamless import/export, offering reliable sourcing, competitive pricing, and efficient logistics.", "AGTP GROUP"]
];

const locations = [
  ["Head Office", "Sharjah Media City", "Sharjah", "United Arab Emirates"],
  ["Reach Us", "Meydan Grandstand, 6th Floor", "Meydan Road, Nad Al Sheba, Dubai", "United Arab Emirates"],
  ["Automotive", "Luxury Cars, Trusted Worldwide", "Premium Vehicles for Export", "Dubai, UAE"],
  ["Spare Parts", "Precision Parts, Global Reach", "High-Quality Automotive Parts", "Dubai, UAE"],
  ["Construction Materials", "Delivering Quality", "Building Trust", "United Arab Emirates"],
  ["General Merchandise", "Seamless Import / Export", "Reliable Global Sourcing", "United Arab Emirates"],
  ["Industrial Equipment", "Machinery & Spare Parts", "Efficient Logistics Support", "United Arab Emirates"],
  ["Furniture & Home Items", "Home Decor & Furniture", "Quality Trading Solutions", "United Arab Emirates"]
];

const heroStats = [
  { icon: Ship, value: 10000, suffix: "+", label: "Exports" },
  { icon: Globe2, value: 25, suffix: "+", label: "Countries Served" },
  { icon: FileCheck, value: 11, suffix: "+", label: "Years in Trade" },
  { icon: Truck, value: 94, suffix: "+", label: "On-Time Delivery" }
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
    title: "Pickups & Trucks",
    subtitle: "Utility and commercial-ready vehicles",
    image: agtpAssets.pickups,
    icon: Truck,
    href: "/vehicles?category=Pickup",
    layout: "min-h-[250px] xl:col-span-4 xl:min-h-[260px]"
  },
  {
    title: "Vans & Buses",
    subtitle: "Practical passenger and cargo transport",
    image: agtpAssets.vans,
    icon: Truck,
    href: "/vehicles?search=van",
    layout: "min-h-[250px] xl:col-span-3 xl:min-h-[260px]"
  },
  {
    title: "Fire Apparatus & Ambulance",
    subtitle: "Special-purpose emergency vehicles",
    image: agtpAssets.mercedesCclassCard,
    icon: Package,
    href: "/vehicles?search=ambulance",
    layout: "min-h-[250px] xl:col-span-3 xl:min-h-[260px]"
  },
  {
    title: "Parts & Accessories",
    subtitle: "OEM, genuine, and aftermarket supply",
    image: agtpAssets.sparePartsHero,
    icon: Wrench,
    href: "/spare-parts",
    layout: "min-h-[250px] xl:col-span-4 xl:min-h-[260px]"
  },
  {
    title: "Engines & Gears",
    subtitle: "Powertrain solutions for every requirement",
    image: agtpAssets.cadillacEscaladeCard,
    icon: Cog,
    href: "/spare-parts",
    layout: "min-h-[280px] xl:col-span-6 xl:min-h-[300px]"
  },
  {
    title: "Modifications",
    subtitle: "Custom upgrades and specialist configurations",
    image: agtpAssets.bmwX2Card,
    icon: Wrench,
    href: "/contact-us",
    layout: "min-h-[280px] xl:col-span-6 xl:min-h-[300px]"
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
  { name: "Angola", region: "Southern Africa", code: "01" },
  { name: "Ghana", region: "West Africa", code: "02" },
  { name: "Congo", region: "Central Africa", code: "03" },
  { name: "Nigeria", region: "West Africa", code: "04" },
  { name: "Togo", region: "West Africa", code: "05" },
  { name: "Cameroon", region: "Central Africa", code: "06" }
];

const supplierCards = [
  { title: "Automotive Body Kits Market Location 6", experience: "18+ year Experience", countries: "Serving 25+ Countries", image: agtpAssets.cadillacEscaladeCard },
  { title: "Automotive Body Kits Market Location 5", experience: "10+ year Experience", countries: "Serving 14+ Countries", image: agtpAssets.bmw760Card },
  { title: "Automotive Body Kits Market Location 2", experience: "10+ year Experience", countries: "Serving 25+ Countries", image: agtpAssets.mercedesCclassCard },
  { title: "Automotive Body Kits Market Location 3", experience: "13+ year Experience", countries: "Serving 20+ Countries", image: agtpAssets.bydDestroyerCard },
  { title: "Automotive Body Kits Market Location 4", experience: "12+ year Experience", countries: "Serving 15+ Countries", image: agtpAssets.bmwX2Card },
  { title: "Automotive Parts Market Location 10", experience: "10+ year Experience", countries: "Serving 25+ Countries", image: agtpAssets.sparePartsHero }
];

const customerStories = [
  {
    name: "Mr. Ringo",
    label: "Repeat Vehicle Buyer",
    image: agtpAssets.cadillacEscaladeCard,
    story:
      "Purchased a fully equipped Toyota Land Cruiser Hardtop without visiting Dubai, marking his 4th vehicle purchase with AGTP Group."
  },
  {
    name: "Mr. Jorge Goncalves",
    label: "Oil & Gas Professional",
    image: agtpAssets.bmw760Card,
    story:
      "Purchased multiple vehicles through our secure online process, with shipments successfully delivered to Angola."
  },
  {
    name: "Mr. Muhammad Sumani",
    label: "Engineer",
    image: agtpAssets.exportPort,
    story:
      "Completed his vehicle purchase entirely online, with AGTP Group safely exporting and delivering the unit to Ghana."
  },
  {
    name: "Mr. Eduardo Conde Salamau",
    label: "Oil & Gas Professional",
    image: agtpAssets.suvs,
    story:
      "Used our secure online payment process while AGTP Group managed the full export and delivery coordination."
  }
];

const leadingBrands = ["BYD", "Toyota", "Suzuki", "Mitsubishi", "Hyundai", "Kia", "Nissan", "Jetour", "Mercedes", "BMW"];
const brandMarks = {
  Toyota: siToyota,
  Suzuki: siSuzuki,
  Mitsubishi: siMitsubishi,
  Hyundai: siHyundai,
  Kia: siKia,
  Nissan: siNissan,
  BMW: siBmw
};

const insightCards = [
  {
    title: "The Future of Cross-Border Trade: Opportunities for SMEs",
    image: agtpAssets.exportPort
  },
  {
    title: "Why Supplier Verification Is Critical in Global Sourcing",
    image: agtpAssets.sparePartsHero
  },
  {
    title: "5 Common Challenges in International Procurement and How to Overcome Them",
    image: agtpAssets.vans
  }
];

const expertiseVehicleCards = [
  {
    title: "Changan X5 Plus 1.5L 2026 | Full Option - Export Only",
    meta: ["0 Miles", "Petrol", "Automatic"],
    image: agtpAssets.bydDestroyerCard
  },
  {
    title: "Toyota Sequoia TRD Pro 2025 - Export Only",
    meta: ["0 Miles", "Hybrid", "Automatic"],
    image: agtpAssets.cadillacEscaladeCard
  },
  {
    title: "Toyota RAV4 HEV XLE - G 2025 - Export Only",
    meta: ["0 Miles", "Hybrid", "Automatic"],
    image: agtpAssets.bmwX2Card
  },
  {
    title: "Toyota Sequoia 1794 Edition Hybrid 2025 - Export Only",
    meta: ["0 Miles", "Hybrid", "Automatic"],
    image: agtpAssets.suvs
  }
];

export default function HomePage() {
  const allVehicles = getAllVehicles();
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredVehicles = searchQuery.trim()
    ? allVehicles.filter((vehicle) =>
        `${vehicle.make} ${vehicle.model} ${vehicle.variant} ${vehicle.year}`.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allVehicles;

  return (
    <div className="bg-[#0B1F33] pb-20 text-white">
      <HeroCarousel />

      <VehicleShowcaseSection
        vehicles={filteredVehicles}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
      />

      <div className="mt-[82px]">
        <Marquee items={["AUTOMOTIVE TRADING", "SPARE PARTS", "CONSTRUCTION MATERIALS", "ELECTRONICS", "FURNITURE", "GENERAL TRADING"]} />
      </div>

      <HeroCopySection />

      <ExpertiseVehiclesSection />

      <IndustriesSection />

      <ProcessSection />

      <GlobalNetworkSection />

      <DubaiMarketsSection />

      <TrustStatementSection />

      <PromiseRevealSection />

      <ServicesHorizontalSection />

      <AutomotivePartsSpotlight />

      <CustomerStoriesSection />

      <LeadingBrandsSection />

      <section className="mx-auto max-w-[1570px] px-6 pt-[95px] text-center">
        <SectionEyebrow center>WHY CHOOSE AGTP GROUP?</SectionEyebrow>
        <RevealHeading>
          <h2 className="mx-auto mt-7 max-w-[840px] text-[42px] font-black leading-[1.12] tracking-normal md:text-[62px]">
            Why Choose AGTP Group?
          </h2>
        </RevealHeading>
        <RevealStagger staggerDelay={120} className="mt-[68px] grid grid-cols-1 gap-7 lg:grid-cols-3">
          {testimonials.map(([quote, author]) => (
            <div key={author} className="min-h-[330px] rounded-[18px] border border-[#315671] bg-[#14314B] p-8 text-left">
              <div className="mb-7 text-[16px] font-black tracking-[0.2em] text-[#F97316]">*****</div>
              <p className="text-[19px] font-semibold leading-[1.45] text-slate-100">&quot;{quote}&quot;</p>
              <div className="mt-14 text-[17px] font-black text-white">{author}</div>
            </div>
          ))}
        </RevealStagger>
      </section>

      <section className="mx-auto max-w-[1570px] px-6 pt-[95px] text-center">
        <SectionEyebrow center>CONTACT US</SectionEyebrow>
        <RevealHeading>
          <h2 className="mx-auto mt-7 max-w-[820px] text-[42px] font-black leading-[1.04] tracking-normal md:text-[62px]">
            Get in touch with us
          </h2>
        </RevealHeading>
        <RevealStagger staggerDelay={80} className="mt-[68px] grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {locations.map(([name, line1, line2, line3]) => (
            <div key={name} className="rounded-[16px] border border-[#315671] bg-[#14314B] p-7 text-center">
              <h3 className="text-[20px] font-black text-white">{name}</h3>
              <p className="mt-5 text-[16px] font-medium leading-[1.6] text-slate-400">
                {line1}
                <br />
                {line2}
                <br />
                {line3}
              </p>
              <p className="mt-7 text-[16px] font-medium leading-[1.6] text-slate-400">
                Contact: <span className="text-[#FDBA74]">+971 58 585729</span>
                <br />
                WhatsApp: <span className="text-[#FDBA74]">+971 58 585729</span>
              </p>
            </div>
          ))}
        </RevealStagger>
      </section>

      <Marquee muted items={["GLOBAL TRADING EXCELLENCE", "DELIVERING QUALITY", "BUILDING TRUST"]} />

      <InsightsSection />

      <HeroStatsSection />

      <section className="mx-auto max-w-[1570px] px-6 pt-[80px]">
        <Reveal>
          <div className="relative min-h-[560px] overflow-hidden rounded-[20px] border border-[#315671] bg-[#14314B]">
            <Image src={agtpAssets.exportPort} alt="Shipping containers at an export port" fill className="object-cover" sizes="1570px" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,16,28,0.94)_0%,rgba(6,16,28,0.76)_50%,rgba(6,16,28,0.56)_100%)]" />
            <div className="relative z-10 flex min-h-[560px] max-w-[840px] flex-col justify-center px-8 py-12 text-left md:px-14 lg:px-20">
              <SectionEyebrow>GET A QUOTE</SectionEyebrow>
              <RevealHeading>
                <h2 className="mt-6 max-w-[760px] text-[42px] font-black leading-[1.05] tracking-normal md:text-[62px]">
                  Tell us what you need. We will handle the route from there.
                </h2>
              </RevealHeading>
              <RevealText>
                <p className="mt-7 max-w-[670px] text-[17px] font-medium leading-[1.65] text-slate-200 md:text-[19px]">
                  Share your requirements and receive a clear quotation backed by verified sourcing, export support, and reliable delivery planning.
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
      <div className={`flex items-center gap-3 text-[12px] font-black uppercase tracking-[0.35em] text-[#FDBA74] ${center ? "justify-center" : ""}`}>
        <span className="h-px w-8 bg-[#F97316]" />
        {children}
      </div>
    </RevealEyebrow>
  );
}

function HeroCopySection() {
  return (
    <section className="mx-auto max-w-[1570px] px-6 pt-[82px]">
      <Reveal>
        <div className="grid gap-8 rounded-[18px] border border-[#315671] bg-[#14314B] p-7 shadow-lg lg:grid-cols-[1fr_auto] lg:items-center lg:p-9">
          <div>
            <SectionEyebrow>GLOBAL SOURCING</SectionEyebrow>
            <h2 className="mt-6 max-w-[860px] text-[34px] font-black leading-[1.08] tracking-normal text-white md:text-[52px]">
              Global Sourcing. International Trade. Export Logistics.
            </h2>
            <p className="mt-5 max-w-[720px] text-[15px] font-semibold leading-[1.6] text-slate-400 md:text-[17px]">
              Helping importers, distributors and manufacturers source verified products from trusted suppliers across the UAE, China and global markets.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact-us" className="inline-flex h-[52px] items-center gap-2.5 rounded-full bg-[#F97316] px-7 text-[14px] font-black text-white transition-colors hover:bg-[#EA580C]">
              Start Sourcing <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/brands" className="inline-flex h-[52px] items-center rounded-full border border-[#3D6480] px-7 text-[14px] font-black text-white transition-colors hover:border-[#F97316] hover:bg-[#18213a]">
              Explore Suppliers
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
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
    <section className="mx-auto max-w-[1570px] px-6 pt-[92px]">
      <div className="mb-10 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <SectionEyebrow>FEATURED INVENTORY</SectionEyebrow>
          <RevealHeading>
            <h2 className="mt-2 text-[30px] font-black leading-none tracking-normal md:text-[40px]">Automotive Vehicles</h2>
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

      <RevealStagger staggerDelay={70} className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {vehicles.slice(0, 6).map((vehicle, index) => (
          <div key={vehicle.id} className={index > 3 ? "hidden md:block" : undefined}>
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
    <section className="mx-auto max-w-[1570px] px-6 pt-[72px]">
      <RevealStagger staggerDelay={70} className="grid overflow-hidden rounded-[14px] border border-[#315671] bg-[#102941] shadow-lg md:grid-cols-2 xl:grid-cols-4">
        {heroStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="flex min-h-[112px] items-center justify-center gap-4 border-b border-[#315671] px-5 py-6 md:border-r xl:border-b-0">
              <Icon className="h-7 w-7 shrink-0 text-[#FDBA74]" />
              <div>
                <div className="text-[34px] font-black leading-none text-white md:text-[44px]">
                  <RevealCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-2 text-[13px] font-semibold text-slate-400">{stat.label}</div>
              </div>
            </div>
          );
        })}
      </RevealStagger>
    </section>
  );
}

function ExpertiseVehiclesSection() {
  return (
    <section className="mx-auto max-w-[1570px] px-6 pt-[82px]">
      <div className="text-center">
        <SectionEyebrow center>AREAS OF EXPERTISE</SectionEyebrow>
        <RevealHeading>
          <h2 className="mx-auto mt-6 max-w-[760px] text-[34px] font-black leading-[1.1] tracking-normal md:text-[50px]">
            Automotive Vehicles
          </h2>
        </RevealHeading>
        <RevealButton>
          <Link href="/vehicles" className="mt-7 inline-flex h-[48px] items-center rounded-full border border-[#F97316] px-7 text-[14px] font-black text-white transition-colors hover:bg-[#F97316]">
            View More
          </Link>
        </RevealButton>
      </div>

      <RevealStagger staggerDelay={80} className="mt-[48px] grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {expertiseVehicleCards.map((vehicle) => (
          <Link key={vehicle.title} href="/vehicles" className="group overflow-hidden rounded-[16px] border border-[#315671] bg-[#14314B] shadow-lg">
            <div className="relative aspect-[1024/575] overflow-hidden bg-white">
              <Image src={vehicle.image} alt={vehicle.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 25vw" />
            </div>
            <div className="p-6">
              <h3 className="line-clamp-2 min-h-[48px] text-[18px] font-black leading-tight text-white transition-colors group-hover:text-[#FDBA74]">
                {vehicle.title}
              </h3>
              <div className="mt-5 h-px bg-[#315671]" />
              <div className="mt-5 grid grid-cols-3 gap-3 text-center text-[12px] font-semibold text-slate-400">
                {vehicle.meta.map((item) => (
                  <span key={item} className="rounded-[10px] border border-[#315671] bg-[#0B1F33] px-2 py-2">
                    {item}
                  </span>
                ))}
              </div>
              <span className="mt-5 inline-flex text-[13px] font-black text-white transition-colors group-hover:text-[#FDBA74]">
                View Details
              </span>
            </div>
          </Link>
        ))}
      </RevealStagger>
    </section>
  );
}

function IndustriesSection() {
  return (
    <section className="mx-auto max-w-[1570px] px-6 pt-[82px]">
      <div className="text-center">
        <SectionEyebrow center>INDUSTRIES WE SERVE</SectionEyebrow>
        <RevealHeading>
          <h2 className="mx-auto mt-6 max-w-[760px] text-[34px] font-black leading-[1.1] tracking-normal md:text-[50px]">
            Built For Every Road Ahead
          </h2>
        </RevealHeading>
      </div>

      <div className="mt-[48px] grid auto-rows-[minmax(250px,auto)] grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-12">
        {industryCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Reveal key={card.title} delay={index * 85} className={card.layout}>
              <Link href={card.href} className="group relative flex h-full overflow-hidden rounded-[18px] border border-[#315671] bg-[#14314B] p-6 shadow-lg transition-all duration-500 hover:-translate-y-1 hover:border-[#F97316]/75 hover:shadow-[0_22px_50px_rgba(0,0,0,0.24)]">
                <Image src={card.image} alt={card.title} fill className="object-cover opacity-65 transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33] via-[#0B1F33]/50 to-[#0B1F33]/10" />
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
                  <h3 className="text-[25px] font-black leading-[1.02] text-white md:text-[28px]">{card.title}</h3>
                  <p className="mt-3 text-[13px] font-bold leading-[1.45] text-slate-200">{card.subtitle}</p>
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
    <section id="how-it-works" className="mx-auto max-w-[1570px] scroll-mt-32 px-6 pt-[96px] text-center">
        <SectionEyebrow center>OUR PROCESS</SectionEyebrow>
        <RevealHeading>
          <h2 className="mx-auto mt-6 max-w-[760px] text-[34px] font-black leading-[1.1] tracking-normal md:text-[50px]">
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
                    <h3 className="mt-3 text-[23px] font-black leading-[1.08] text-white">{step.title}</h3>
                    <p className="mt-4 text-[14px] font-medium leading-[1.55] text-slate-300">{step.body}</p>
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
      <div className="mx-auto max-w-[1570px] px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <div>
            <SectionEyebrow>OUR GLOBAL NETWORK</SectionEyebrow>
            <RevealHeading>
              <h2 className="mt-6 max-w-[780px] text-[34px] font-black leading-[1.08] tracking-normal md:text-[50px]">
                Connected from Dubai to the markets that matter.
              </h2>
            </RevealHeading>
          </div>
          <RevealText>
            <p className="max-w-[650px] text-[16px] font-medium leading-[1.65] text-slate-300">
              Our sourcing, verification, and export support connects trusted suppliers in Dubai with buyers across key African markets.
            </p>
          </RevealText>
        </div>

        <div className="mt-[48px] grid grid-cols-1 gap-5 lg:grid-cols-[0.88fr_1.12fr]">
          <Reveal className="h-full">
            <div className="relative flex min-h-[440px] flex-col overflow-hidden rounded-[18px] border border-[#315671] bg-[#102941] p-8 shadow-lg">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(249,115,22,0.16),transparent_35%)]" />
              <span className="absolute -bottom-14 -right-5 text-[220px] font-black leading-none text-white/[0.035]" aria-hidden="true">
                DXB
              </span>
              <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-[#F97316]/40 bg-[#F97316]/10 text-[#FDBA74]">
                <Globe2 className="h-7 w-7" />
              </div>
              <div className="relative z-10 mt-auto">
                <p className="text-[12px] font-black uppercase tracking-[0.22em] text-[#FDBA74]">Export Hub</p>
                <h3 className="mt-3 text-[38px] font-black leading-none text-white md:text-[48px]">Dubai, UAE</h3>
                <p className="mt-5 max-w-[390px] text-[16px] font-medium leading-[1.6] text-slate-300">
                  Coordinating sourcing, inspection, documentation, and shipment from one connected trade hub.
                </p>
              </div>
            </div>
          </Reveal>

          <RevealStagger staggerDelay={70} className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {globalMarkets.map((market) => (
              <div key={market.name} className="group relative min-h-[205px] overflow-hidden rounded-[18px] border border-[#315671] bg-[#14314B] p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#F97316]/70">
                <span className="absolute right-5 top-4 text-[52px] font-black leading-none text-white/[0.045]" aria-hidden="true">
                  {market.code}
                </span>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#F97316]/35 bg-[#F97316]/10 text-[#FDBA74] transition-transform duration-300 group-hover:scale-110">
                  <ArrowRight className="h-4 w-4" />
                </div>
                <div className="mt-10">
                  <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#FDBA74]">Active Market</p>
                  <h3 className="mt-2 text-[25px] font-black leading-none text-white">{market.name}</h3>
                  <p className="mt-3 text-[14px] font-semibold text-slate-400">{market.region}</p>
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
    <section id="dubai-markets" className="mx-auto max-w-[1570px] scroll-mt-32 px-6 pt-[82px]">
      <div className="text-center">
        <SectionEyebrow center>DUBAI MARKETS</SectionEyebrow>
        <RevealHeading>
          <h2 className="mx-auto mt-6 max-w-[760px] text-[34px] font-black leading-[1.1] tracking-normal md:text-[50px]">
            Automotive Suppliers
          </h2>
        </RevealHeading>
        <RevealButton>
          <Link href="/brands" className="mt-7 inline-flex h-[48px] items-center rounded-full border border-[#F97316] px-7 text-[14px] font-black text-white transition-colors hover:bg-[#F97316]">
            View More
          </Link>
        </RevealButton>
      </div>

      <RevealStagger staggerDelay={80} className="mt-[48px] grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {supplierCards.map((supplier) => (
          <div key={supplier.title} className="overflow-hidden rounded-[16px] border border-[#315671] bg-[#14314B] shadow-lg">
            <div className="relative h-[220px] bg-[#0B1F33]">
              <Image src={supplier.image} alt={supplier.title} fill className="object-cover opacity-80" sizes="(max-width: 768px) 100vw, 33vw" />
              <div className="absolute right-4 top-4 rounded-full bg-[#0B1F33]/80 px-3.5 py-2 text-[11px] font-black text-white">
                Automotive Parts, Body Kits, Tyres
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-[19px] font-black leading-tight text-white">{supplier.title}</h3>
              <div className="mt-5 flex flex-wrap gap-4 text-[13px] font-semibold text-slate-300">
                <span>{supplier.experience}</span>
                <span>{supplier.countries}</span>
              </div>
              <Link href="/brands" className="mt-6 flex h-[46px] items-center justify-center rounded-full border border-[#F97316]/45 text-[13px] font-black text-white transition-colors hover:bg-[#F97316]">
                View Supplier Profile
              </Link>
            </div>
          </div>
        ))}
      </RevealStagger>
    </section>
  );
}

function TrustStatementSection() {
  return (
    <section className="mt-[82px] border-y border-[#24445F] bg-[#081A2B] py-[82px]">
      <div className="mx-auto max-w-[1570px] px-6 text-center">
        <SectionEyebrow center>OUR MISSION</SectionEyebrow>
        <Reveal>
          <div className="mx-auto mt-[34px] grid max-w-[1180px] overflow-hidden rounded-[20px] border border-[#315671] bg-[#14314B] text-left shadow-xl lg:grid-cols-[0.8fr_1.2fr]">
            <div className="relative min-h-[260px] border-b border-[#315671] bg-[#102941] p-8 lg:border-b-0 lg:border-r">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(249,115,22,0.12),transparent_42%)]" />
              <span className="absolute -bottom-7 -right-2 text-[150px] font-black leading-none text-white/[0.035]" aria-hidden="true">
                01
              </span>
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                  <span className="inline-flex rounded-full border border-[#F97316]/35 bg-[#F97316]/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-[#FDBA74]">
                    Our Mission
                  </span>
                  <h3 className="mt-6 max-w-[360px] text-[26px] font-black leading-[1.12] text-white">
                    Make global trade clear, reliable, and built to last.
                  </h3>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-3">
                  {["Transparency", "Accountability"].map((item) => (
                    <div key={item} className="rounded-[12px] border border-[#315671] bg-[#0B1F33]/70 px-4 py-3 text-[12px] font-bold text-slate-300">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-8 md:p-10 lg:p-12">
              <div className="mb-6 h-px w-20 bg-[#F97316]" />
              <p className="text-[17px] font-semibold leading-[1.7] text-slate-200 md:text-[19px]">
                When we founded AGTP Group, our goal was not simply to move products across borders. It was to build a company that businesses could trust for years to come.
              </p>
              <p className="mt-5 text-[15px] font-medium leading-[1.7] text-slate-400 md:text-[16px]">
                Every partnership we create is built on transparency, accountability, and a commitment to delivering value beyond a single transaction.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                {["Trusted Sourcing", "Verified Partners", "Long-Term Value"].map((item) => (
                  <span key={item} className="rounded-full border border-[#F97316]/30 bg-[#F97316]/10 px-4 py-2 text-[12px] font-black uppercase tracking-[0.12em] text-[#FDBA74]">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
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
  const headingExit = clamp((progress - 0.42) / 0.22);
  const headingOpacity = scrollMotionEnabled ? headingEnter * (1 - headingExit) : 1;
  const headingShift = scrollMotionEnabled ? 54 - progress * 138 : 0;

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
        <div className="absolute inset-0 bg-[#06101C]/55" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,16,28,0.82)_0%,rgba(6,16,28,0.54)_44%,rgba(6,16,28,0.28)_100%)]" />

        <div className="relative z-10 mx-auto flex min-h-[650px] max-w-[1570px] flex-col justify-end px-6 py-10 md:h-full md:min-h-0 md:px-8 md:py-12 xl:px-12 xl:py-14">
          <div
            className="max-w-[700px] transition-[opacity,transform] duration-100 ease-out"
            style={{ opacity: headingOpacity, transform: `translateY(${headingShift}px)` }}
          >
            <p className="text-[11px] font-black uppercase tracking-[0.26em] text-[#FDBA74]">Automotive Parts</p>
            <h2 className="mt-4 max-w-[480px] text-[42px] font-black leading-[0.94] text-white sm:text-[56px] xl:max-w-[700px] xl:text-[clamp(54px,6vw,100px)]">
              Parts That Keep The World Moving
            </h2>
            <p className="mt-6 max-w-[510px] text-[15px] font-semibold leading-[1.65] text-slate-200 md:text-[17px]">
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
      <div className="mx-auto max-w-[1570px] px-6 text-center">
        <SectionEyebrow center>LEADING BRANDS</SectionEyebrow>
        <RevealHeading>
          <h2 className="mx-auto mt-6 max-w-[740px] text-[34px] font-black leading-[1.1] tracking-normal md:text-[50px]">
            Trusted brands. Export-ready support.
          </h2>
        </RevealHeading>
      </div>

      <Reveal className="mt-[48px]">
        <BrandMarquee brands={leadingBrands} />
      </Reveal>
    </section>
  );
}

function BrandMarquee({ brands }: { brands: string[] }) {
  const repeatedBrands = [...brands, ...brands];

  return (
    <div className="flex overflow-hidden motion-reduce:overflow-x-auto">
      <div className="animate-marquee flex w-max shrink-0 gap-0 motion-reduce:animate-none">
        {repeatedBrands.map((brand, index) => {
          const mark = brandMarks[brand as keyof typeof brandMarks];

          return (
            <div
              key={`${brand}-${index}`}
              className="flex h-[72px] min-w-[190px] items-center gap-4 border-r border-[#315671]/80 px-7 text-left"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center text-[#FDBA74]">
                {mark ? (
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8" fill={`#${mark.hex}`}>
                    <path d={mark.path} />
                  </svg>
                ) : (
                  <Car className="h-7 w-7" aria-hidden="true" />
                )}
              </span>
              <span className="text-[19px] font-black tracking-normal text-white">{brand}</span>
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
    <section id="customer-reviews" className="mx-auto max-w-[1570px] scroll-mt-32 px-6 pt-[82px] text-center">
      <SectionEyebrow center>CUSTOMER REVIEWS</SectionEyebrow>
      <RevealHeading>
        <h2 className="mx-auto mt-6 max-w-[760px] text-[34px] font-black leading-[1.1] tracking-normal md:text-[50px]">
          What Our Customers Say
        </h2>
      </RevealHeading>

      <Reveal className="mt-[48px]">
        <div
          className="relative overflow-hidden py-3 xl:h-[550px]"
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
              const translation = offset * 365;

              return (
                <article
                  key={story.name}
                  className="absolute left-1/2 top-3 flex h-[520px] w-[min(54vw,640px)] -translate-x-1/2 flex-col overflow-hidden rounded-[18px] border border-[#315671] bg-[#14314B] text-left shadow-2xl transition-[opacity,transform,filter] duration-700 ease-out"
                  style={{
                    opacity: isActive ? 1 : isNearby ? 0.48 : 0,
                    transform: `translateX(calc(-50% + ${translation}px)) scale(${isActive ? 1 : isNearby ? 0.86 : 0.78})`,
                    filter: isActive ? "none" : "saturate(0.45) brightness(0.76)",
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
            <article className="mx-auto flex min-h-[525px] max-w-[620px] flex-col overflow-hidden rounded-[18px] border border-[#315671] bg-[#14314B] text-left shadow-2xl">
              <TestimonialCard story={customerStories[activeStory]} active />
            </article>
          </div>
        </div>
      </Reveal>

      <div className="mt-7 flex items-center justify-center gap-4">
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
  story: (typeof customerStories)[number];
  active: boolean;
}) {
  return (
    <>
      <div className="relative h-[245px] shrink-0 overflow-hidden bg-[#0B1F33]">
        <Image
          src={story.image}
          alt={`${story.name} customer story`}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 640px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#102941] via-[#102941]/20 to-transparent" />
        <span className="absolute left-6 top-6 rounded-full border border-white/20 bg-[#0B1F33]/80 px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-white">
          Customer Story
        </span>
      </div>
      <div className="relative flex flex-1 flex-col p-7 md:p-8">
        <span className="absolute -top-6 right-7 flex h-12 w-12 items-center justify-center rounded-full border border-[#F97316]/50 bg-[#102941] text-[34px] font-black leading-none text-[#FDBA74]">
          &ldquo;
        </span>
        <div className="flex items-start gap-3 pr-12">
          <span className="mt-1 h-9 w-1.5 shrink-0 rounded-full bg-[#F97316]" />
          <div>
            <h3 className="text-[24px] font-black leading-tight text-white">{story.name}</h3>
            <p className="mt-1 text-[12px] font-black uppercase tracking-[0.15em] text-[#FDBA74]">{story.label}</p>
          </div>
        </div>
        <p className={`mt-6 text-[16px] font-medium leading-[1.65] ${active ? "text-slate-100" : "text-slate-300"}`}>{story.story}</p>
      </div>
    </>
  );
}

function InsightsSection() {
  return (
    <section className="mx-auto max-w-[1570px] px-6 pt-[82px]">
      <div className="text-center">
        <SectionEyebrow center>OUR INSIGHTS</SectionEyebrow>
        <RevealHeading>
          <h2 className="mx-auto mt-6 max-w-[720px] text-[34px] font-black leading-[1.1] tracking-normal md:text-[50px]">
            Our Insights
          </h2>
        </RevealHeading>
      </div>
      <RevealStagger staggerDelay={90} className="mt-[48px] grid grid-cols-1 gap-6 lg:grid-cols-3">
        {insightCards.map((insight) => (
          <Link key={insight.title} href="/blogs" className="group overflow-hidden rounded-[16px] border border-[#315671] bg-[#14314B] shadow-lg">
            <div className="relative h-[230px]">
              <Image src={insight.image} alt={insight.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 1024px) 100vw, 33vw" />
              <span className="absolute left-5 top-5 rounded-full bg-white px-4 py-2 text-[12px] font-black text-[#0B1F33]">
                AGTP Insights
              </span>
            </div>
            <div className="p-6">
              <p className="text-[13px] font-semibold text-slate-400">June 16, 2026</p>
              <h3 className="mt-3 text-[20px] font-black leading-tight text-white transition-colors group-hover:text-[#FDBA74]">
                {insight.title}
              </h3>
            </div>
          </Link>
        ))}
      </RevealStagger>
    </section>
  );
}

function PromiseRevealSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeCount, setActiveCount] = useState(0);
  const [scrollSequenceEnabled, setScrollSequenceEnabled] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const words =
    "AGTP Group Spare Parts, rooted in Dubai, UAE, has grown into a trusted global seller delivering quality automotive parts with unmatched customer service.".split(
      " "
    );
  const blueStartIndex = Math.floor(words.length / 2);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1280px)");
    const updateMode = () => setScrollSequenceEnabled(mediaQuery.matches && !prefersReducedMotion);

    updateMode();
    mediaQuery.addEventListener("change", updateMode);
    return () => mediaQuery.removeEventListener("change", updateMode);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!scrollSequenceEnabled) {
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

        const rect = section.getBoundingClientRect();
        const stickyOffset = 144;
        const total = Math.max(section.offsetHeight - window.innerHeight + stickyOffset, 1);
        const progress = Math.min(Math.max((stickyOffset - rect.top) / total, 0), 1);
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
  }, [scrollSequenceEnabled, words.length]);

  return (
    <section ref={sectionRef} className={`relative border-y border-[#111827] ${scrollSequenceEnabled ? "xl:h-[170vh]" : "py-[82px]"}`}>
      <div className={`${scrollSequenceEnabled ? "xl:sticky xl:top-[144px] xl:flex xl:min-h-[calc(100vh-144px)] xl:items-center" : ""}`}>
        <div className="mx-auto w-full max-w-[1570px] px-6">
          <SectionEyebrow>OUR PROMISE</SectionEyebrow>
          <h2 className="mt-12 max-w-[1120px] text-[45px] font-black leading-[1.22] tracking-normal md:text-[70px]">
            {words.map((word, index) => (
              <span
                key={`${word}-${index}`}
                className={`mr-[0.23em] inline-block transition-colors duration-300 ${
                  index < activeCount ? (index >= blueStartIndex ? "text-[#F97316]" : "text-slate-100") : "text-[#27445D]"
                }`}
              >
                {word}
              </span>
            ))}
          </h2>
        </div>
      </div>
    </section>
  );
}

function ServicesHorizontalSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    let frame = 0;
    let scrollDistance = 0;

    const update = () => {
      if (frame) return;

      frame = window.requestAnimationFrame(() => {
        frame = 0;

        const section = sectionRef.current;
        const track = trackRef.current;
        if (!section || !track || scrollDistance <= 0) return;

        const stickyOffset = window.innerWidth >= 1280 ? 144 : 92;
        const progress = Math.min(
          Math.max((stickyOffset - section.getBoundingClientRect().top) / scrollDistance, 0),
          1
        );
        track.style.transform = `translate3d(${-progress * scrollDistance}px, 0, 0)`;
      });
    };

    const measure = () => {
      const section = sectionRef.current;
      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!section || !viewport || !track) return;

      if (window.innerWidth < 768 || prefersReducedMotion) {
        section.style.height = "auto";
        track.style.transform = "translate3d(0, 0, 0)";
        scrollDistance = 0;
        return;
      }

      scrollDistance = Math.max(track.scrollWidth - viewport.clientWidth, 0);
      const stickyOffset = window.innerWidth >= 1280 ? 144 : 92;
      section.style.height = `${window.innerHeight - stickyOffset + scrollDistance}px`;
      update();
    };

    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", update, { passive: true });

    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", update);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} className="relative z-10 bg-[#0B1F33] pt-[95px] md:pt-0">
      <div className={`bg-[#0B1F33] ${prefersReducedMotion ? "" : "md:sticky md:top-[92px] md:flex md:min-h-[calc(100vh-92px)] md:items-center md:overflow-hidden xl:top-[144px] xl:min-h-[calc(100vh-144px)]"}`}>
        <div ref={viewportRef} className={`w-full overflow-x-auto px-6 pb-4 scrollbar-none md:px-8 xl:px-10 ${prefersReducedMotion ? "md:overflow-x-auto" : "md:overflow-hidden"}`}>
          <div
            ref={trackRef}
            className="grid gap-12 md:flex md:w-max md:gap-6 md:transition-transform md:duration-75 md:ease-linear md:will-change-transform xl:gap-7"
          >
            <div className="shrink-0 md:flex md:h-[460px] md:w-[340px] md:flex-col md:justify-center xl:h-[500px] xl:w-[430px]">
              <SectionEyebrow>WHO WE ARE?</SectionEyebrow>
              <RevealHeading>
                <h2 className="mt-7 max-w-[480px] text-[42px] font-black leading-[1.08] tracking-normal md:text-[56px]">
                  Global Trading Excellence. Delivering Quality, Building Trust.
                </h2>
              </RevealHeading>
              <RevealText>
                <p className="mt-7 max-w-[460px] text-[18px] font-medium leading-[1.45] text-slate-400">
                  AGTP GROUP is your trusted global partner for seamless import/export, offering reliable sourcing,
                  competitive pricing, and efficient logistics.
                </p>
              </RevealText>
              <RevealButton>
                <Link href="/vehicles" className="mt-9 inline-flex items-center gap-3 text-[18px] font-extrabold text-white">
                  <span>Explore More</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </RevealButton>
            </div>

            <div className="flex gap-7 overflow-x-auto scrollbar-none md:contents">
              {serviceCards.map((item) => (
                <Link
                  key={item.num}
                  href={item.href}
                  className="group relative flex h-[460px] w-[360px] shrink-0 flex-col justify-end overflow-hidden rounded-[20px] border border-[#315671] bg-slate-800 p-7 md:w-[390px] xl:h-[500px] xl:w-[460px] xl:p-8"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover opacity-65 transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 767px) 360px, (max-width: 1279px) 390px, 460px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-slate-300/75 via-slate-700/40 to-[#14314B]/95" />
                  <span className="absolute left-8 top-8 text-[15px] font-black tracking-[0.2em] text-white/80">
                    {item.num}
                  </span>
                  <div className="relative z-10">
                    <span className="text-[13px] font-black uppercase tracking-[0.35em] text-[#FDBA74]">
                      {item.category}
                    </span>
                    <h3 className="mt-3 text-[30px] font-black leading-none text-white xl:text-[34px]">{item.title}</h3>
                    <p className="mt-4 max-w-[360px] text-[16px] font-medium leading-[1.45] text-slate-200 xl:text-[17px]">
                      {item.desc}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee({ items, muted = false }: { items: string[]; muted?: boolean }) {
  const content = [...items, ...items, ...items, ...items];
  return (
    <div className={`${muted ? "mt-[75px] border-y border-[#24445F] bg-[#102941] py-12" : "border-y border-[#24445F] bg-[#102941] py-9"} overflow-hidden`}>
      <div className={`${muted ? "text-[48px] text-transparent opacity-50 marquee-outline" : "text-[52px] text-white"} animate-marquee flex items-center gap-14 whitespace-nowrap font-black uppercase leading-none tracking-normal`}>
        {content.map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center gap-14">
            {item}
            <span className="text-[#F97316]">*</span>
          </span>
        ))}
      </div>
    </div>
  );
}



