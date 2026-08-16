"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Car,
  CheckCircle2,
  Cog,
  Factory,
  FileCheck,
  Globe2,
  Package,
  Plane,
  Search,
  Ship,
  Truck,
  Users,
  Wrench
} from "lucide-react";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { VehicleInquiryModal } from "@/components/vehicles/vehicle-inquiry-modal";
import { VehicleCard } from "@/components/vehicles/vehicle-card";
import { getAllVehicles, getFeaturedVehicles } from "@/lib/vehicles/data";
import {
  Reveal,
  RevealButton,
  RevealCounter,
  RevealEyebrow,
  RevealHeading,
  RevealStagger,
  RevealText
} from "@/components/ui/scroll-reveal";
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
  { icon: Globe2, value: 10, suffix: "+", label: "Countries Served" },
  { icon: Users, value: 100, suffix: "+", label: "Suppliers" },
  { icon: Package, value: 27, suffix: "K+", label: "Products Sourced" },
  { icon: Factory, value: 7, suffix: "+", label: "Industries" }
];

const sourcingPanels = [
  {
    title: "Trusted Global Sourcing Solutions",
    body:
      "AGTP Group helps individuals and businesses source quality products from trusted suppliers worldwide. From supplier selection to procurement support, we make sourcing simple and efficient.",
    listTitle: "We Proudly Serve:",
    items: ["Individuals & Businesses", "Importers & Distributors", "Corporate Buyers", "Government & Project Clients"],
    cta: "Start Sourcing",
    href: "/contact-us",
    image: agtpAssets.exportPort
  },
  {
    title: "International Shipping Made Simple",
    body:
      "AGTP Group provides reliable shipping solutions for individuals and businesses worldwide. From sourcing to delivery, we ensure smooth and efficient cargo movement.",
    listTitle: "We Proudly Support:",
    items: ["Ocean Freight", "Air Freight", "Customs Clearance", "Worldwide Delivery"],
    cta: "Start Shipping",
    href: "/contact-us",
    image: agtpAssets.vans
  }
];

const industryCards = [
  { title: "Automotive", subtitle: "Vehicles, Parts & Accessories", image: agtpAssets.sedans, icon: Car },
  { title: "Engines", subtitle: "Diesel, Petrol & Hybrid", image: agtpAssets.pickups, icon: Cog },
  { title: "Tyres", subtitle: "Passenger, Truck & OTR", image: agtpAssets.suvs, icon: Truck },
  { title: "Spare Parts", subtitle: "Genuine, OEM & Aftermarket", image: agtpAssets.sparePartsHero, icon: Wrench },
  { title: "Gear Box", subtitle: "Manual, Automatic & CVT", image: agtpAssets.vans, icon: Package }
];

const processSteps = [
  {
    title: "Your Requirements",
    body: "Share the products you're looking for. Tell us your specifications and quantity.",
    icon: FileCheck
  },
  {
    title: "Source & Verify",
    body: "Share the products you're looking for. Tell us your specifications and quantity.",
    icon: Search
  },
  {
    title: "Receive Quotation",
    body: "We source trusted suppliers worldwide. Every supplier is carefully verified.",
    icon: Package
  },
  {
    title: "Confirm Your Order",
    body: "Approve the quotation to proceed. We begin procurement immediately.",
    icon: CheckCircle2
  },
  {
    title: "Export Logistics",
    body: "We manage export and shipping. Documents are prepared with care.",
    icon: Ship
  },
  {
    title: "Delivery & Support",
    body: "Your order is delivered worldwide. Ongoing support is always available.",
    icon: Plane
  }
];

const topMarkets = ["Angola", "Ghana", "Congo", "USA", "United Kingdom", "Europe"];

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
    story:
      "Purchased a fully equipped Toyota Land Cruiser Hardtop without visiting Dubai, marking his 4th vehicle purchase with AGTP Group."
  },
  {
    name: "Mr. Jorge Goncalves",
    label: "Oil & Gas Professional",
    story:
      "Purchased multiple vehicles through our secure online process, with shipments successfully delivered to Angola."
  },
  {
    name: "Mr. Muhammad Sumani",
    label: "Engineer",
    story:
      "Completed his vehicle purchase entirely online, with AGTP Group safely exporting and delivering the unit to Ghana."
  },
  {
    name: "Mr. Eduardo Conde Salamau",
    label: "Oil & Gas Professional",
    story:
      "Used our secure online payment process while AGTP Group managed the full export and delivery coordination."
  }
];

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
  const featuredVehicles = getFeaturedVehicles();
  const allVehicles = getAllVehicles();
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredVehicles = searchQuery.trim()
    ? allVehicles.filter((vehicle) =>
        `${vehicle.make} ${vehicle.model} ${vehicle.variant} ${vehicle.year}`.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : featuredVehicles;

  return (
    <div className="bg-[#0B1F33] pb-20 text-white">
      <HeroCarousel />

      <Marquee items={["AUTOMOTIVE TRADING", "SPARE PARTS", "CONSTRUCTION MATERIALS", "ELECTRONICS", "FURNITURE", "GENERAL TRADING"]} />

      <HeroCopySection />

      <SourcingPanelsSection />

      <section className="mx-auto max-w-[1570px] px-6 pt-[90px]">
        <div className="mb-10 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionEyebrow>ALL PRODUCTS</SectionEyebrow>
            <RevealHeading>
              <h2 className="mt-2 text-[30px] font-black leading-none tracking-normal">Top Quality Autoparts</h2>
            </RevealHeading>
          </div>

          <RevealButton>
            <div className="flex w-full max-w-[500px] items-center rounded-full border border-[#315671] bg-[#0B1F33] p-1.5">
              <input
                type="text"
                placeholder="Search make, model, name..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="min-w-0 flex-1 bg-transparent px-6 text-[16px] font-medium text-white outline-none placeholder:text-slate-500"
              />
              <Link
                href={`/vehicles?search=${encodeURIComponent(searchQuery)}`}
                className="flex h-[56px] items-center gap-3 rounded-full bg-[#F97316] px-8 text-[17px] font-extrabold text-white transition-colors hover:bg-[#EA580C]"
              >
                <span>Search</span>
                <Search className="h-5 w-5" />
              </Link>
            </div>
          </RevealButton>
        </div>

        <RevealStagger staggerDelay={90} className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {filteredVehicles.slice(0, 6).map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </RevealStagger>
      </section>

      <ExpertiseVehiclesSection />

      <IndustriesProcessSection />

      <GlobalNetworkSection />

      <DubaiMarketsSection />

      <TrustStatementSection />

      <PromiseRevealSection />

      <ServicesHorizontalSection />

      <section className="pt-[95px]">
        <Reveal>
          <div className="relative min-h-[620px] overflow-hidden border-y border-[#24445F]">
            <Image src={agtpAssets.spotlightFerrari} alt="Ferrari SF90 Spider" fill className="object-cover" sizes="100vw" />
            <div className="absolute inset-0 bg-[#081A2B]/55" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#081A2B]/80 via-[#081A2B]/30 to-[#081A2B]/70" />
            <div className="relative z-10 mx-auto flex min-h-[620px] max-w-[1570px] flex-col justify-center px-6">
              <h2 className="max-w-[760px] text-[52px] font-black uppercase leading-[0.95] tracking-normal text-slate-100 md:text-[82px]">
                Luxury Cars, Trusted Worldwide
              </h2>
              <div className="absolute right-[8.5%] top-[260px] hidden w-[520px] space-y-4 xl:block">
                {[
                  ["Service", "Automotive Trading"],
                  ["Supply", "Spare Parts"],
                  ["Reach", "Worldwide"]
                ].map(([label, value], index) => (
                  <div
                    key={label}
                    className="animate-grow-in flex h-[68px] items-center justify-between rounded-[14px] border border-[#3D6480] bg-[#172033]/90 px-7 opacity-0"
                    style={{ animationDelay: `${index * 120}ms` }}
                  >
                    <span className="text-[15px] font-medium text-slate-400">{label}</span>
                    <span className="text-[21px] font-black text-white">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <CustomerStoriesSection />

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
          <div className="relative min-h-[540px] overflow-hidden rounded-[24px] border border-[#315671] bg-[#14314B]">
            <Image src={agtpAssets.exportPort} alt="Export port" fill className="object-cover" sizes="1570px" />
            <div className="absolute inset-0 bg-[#081A2B]/65" />
            <div className="relative z-10 flex min-h-[540px] flex-col items-center justify-center px-8 text-center">
              <SectionEyebrow center>GET IN TOUCH WITH US</SectionEyebrow>
              <RevealHeading>
                <h2 className="mt-5 max-w-[920px] text-[42px] font-black uppercase leading-[1.05] tracking-normal md:text-[62px]">
                  For enquiries and more information
                </h2>
              </RevealHeading>
              <RevealText>
                <p className="mt-7 max-w-[680px] text-[18px] font-medium leading-[1.4] text-slate-300">
                  Drop your query here and AGTP GROUP will help with reliable sourcing, competitive pricing, and
                  efficient logistics.
                </p>
              </RevealText>
              <RevealButton>
                <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                  <button
                    onClick={() => setInquiryModalOpen(true)}
                    className="flex h-[60px] items-center gap-3 rounded-full bg-[#F97316] px-8 text-[18px] font-extrabold text-white transition-colors hover:bg-[#EA580C]"
                  >
                    <span>Contact Us</span>
                    <ArrowRight className="h-5 w-5" />
                  </button>
                  <Link href="/vehicles" className="flex h-[60px] items-center rounded-full border border-white/25 px-8 text-[18px] font-extrabold text-white hover:bg-white/10">
                    Explore More
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

function SourcingPanelsSection() {
  return (
    <section className="mx-auto grid max-w-[1570px] grid-cols-1 gap-6 px-6 pt-[82px] lg:grid-cols-2">
      {sourcingPanels.map((panel) => (
        <Reveal key={panel.title} className="h-full">
          <div className="group relative flex h-full min-h-[420px] overflow-hidden rounded-[18px] border border-[#315671] bg-[#14314B] p-7 shadow-xl">
            <Image src={panel.image} alt={panel.title} fill className="object-cover opacity-35 transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 1024px) 100vw, 50vw" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F33]/95 via-[#0B1F33]/72 to-[#0B1F33]/42" />
            <div className="relative z-10 flex min-h-full w-full max-w-[680px] flex-col justify-between">
              <div>
                <h2 className="text-[28px] font-black leading-[1.12] text-white md:text-[38px]">{panel.title}</h2>
                <p className="mt-5 max-w-[600px] text-[15px] font-medium leading-[1.55] text-slate-300">{panel.body}</p>
                <h3 className="mt-7 text-[15px] font-black text-white">{panel.listTitle}</h3>
                <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {panel.items.map((item) => (
                    <div key={item} className="flex items-center gap-2.5 text-[14px] font-semibold text-slate-200">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[#FDBA74]" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <Link href={panel.href} className="mt-8 inline-flex w-max items-center gap-2.5 rounded-full bg-[#F97316] px-6 py-3.5 text-[13px] font-black text-white transition-colors hover:bg-[#EA580C]">
                <span>{panel.cta}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      ))}
    </section>
  );
}

function IndustriesProcessSection() {
  return (
    <section className="mx-auto max-w-[1570px] px-6 pt-[82px]">
      <div className="text-center">
        <SectionEyebrow center>INDUSTRIES WE SERVE</SectionEyebrow>
        <RevealHeading>
          <h2 className="mx-auto mt-6 max-w-[760px] text-[34px] font-black leading-[1.1] tracking-normal md:text-[50px]">
            Solutions For Every Industry
          </h2>
        </RevealHeading>
      </div>

      <RevealStagger staggerDelay={80} className="mt-[48px] grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
        {industryCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.title} href="/business-solutions" className="group relative flex min-h-[292px] flex-col justify-end overflow-hidden rounded-[16px] border border-[#315671] bg-[#14314B] p-5">
              <Image src={card.image} alt={card.title} fill className="object-cover opacity-55 transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 20vw" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B1F33]/20 to-[#0B1F33]/95" />
              <div className="relative z-10">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-[#F97316]/35 bg-[#F97316]/15 text-[#FDBA74]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-[23px] font-black leading-none text-white">{card.title}</h3>
                <p className="mt-2.5 text-[13px] font-bold text-slate-300">{card.subtitle}</p>
              </div>
            </Link>
          );
        })}
      </RevealStagger>

      <div id="how-it-works" className="scroll-mt-32 pt-[82px] text-center">
        <SectionEyebrow center>OUR PROCESS</SectionEyebrow>
        <RevealHeading>
          <h2 className="mx-auto mt-6 max-w-[760px] text-[34px] font-black leading-[1.1] tracking-normal md:text-[50px]">
            How AGTP Group Works
          </h2>
        </RevealHeading>
      </div>

      <RevealStagger staggerDelay={70} className="mt-[48px] grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {processSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={step.title} className="rounded-[16px] border border-[#315671] bg-[#14314B] p-6 shadow-lg">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#0B1F33]">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#F97316]/40 text-[15px] font-black text-[#FDBA74]">
                  {index + 1}
                </span>
              </div>
              <h3 className="text-[21px] font-black text-white">{step.title}</h3>
              <p className="mt-3 text-[14px] font-medium leading-[1.5] text-slate-400">{step.body}</p>
            </div>
          );
        })}
      </RevealStagger>
    </section>
  );
}

function GlobalNetworkSection() {
  return (
    <section className="mt-[82px] border-y border-[#24445F] bg-[#081A2B] py-[82px]">
      <div className="mx-auto max-w-[1570px] px-6">
        <div className="text-center">
          <SectionEyebrow center>OUR GLOBAL NETWORK</SectionEyebrow>
          <RevealHeading>
            <h2 className="mx-auto mt-6 max-w-[840px] text-[34px] font-black leading-[1.1] tracking-normal md:text-[50px]">
              Connecting Global Markets Worldwide
            </h2>
          </RevealHeading>
        </div>

        <div className="mt-[48px] grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch">
          <Reveal className="lg:col-span-8">
            <div className="relative min-h-[440px] overflow-hidden rounded-[18px] border border-[#315671] bg-[#14314B]">
              <Image src={agtpAssets.exportPort} alt="Global logistics network" fill className="object-cover opacity-35" sizes="(max-width: 1024px) 100vw, 66vw" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(83,109,254,0.28),transparent_46%)]" />
              <div className="absolute inset-0 bg-[#081A2B]/45" />
              <div className="relative z-10 flex min-h-[440px] flex-col justify-end p-7">
                <Globe2 className="h-12 w-12 text-[#FDBA74]" />
                <p className="mt-5 max-w-[580px] text-[18px] font-black leading-[1.35] text-white">
                  Reliable sourcing, supplier verification, procurement support, and export logistics connecting buyers with trusted global markets.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-4" delay={120}>
            <div className="h-full rounded-[18px] border border-[#315671] bg-[#14314B] p-7">
              <div className="flex items-center gap-3 text-[22px] font-black text-white">
                <Globe2 className="h-6 w-6 text-[#FDBA74]" />
                Top Markets
              </div>
              <div className="mt-6 space-y-3">
                {topMarkets.map((market) => (
                  <div key={market} className="flex items-center justify-between rounded-[12px] border border-[#315671] bg-[#0B1F33] px-4 py-3.5">
                    <span className="text-[15px] font-black text-white">{market}</span>
                    <ArrowRight className="h-4 w-4 text-[#FDBA74]" />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
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
        <SectionEyebrow center>WHO WE ARE</SectionEyebrow>
        <RevealHeading>
          <h2 className="mx-auto mt-6 max-w-[900px] text-[34px] font-black leading-[1.1] tracking-normal md:text-[50px]">
            Building Trust Beyond Every Transaction
          </h2>
        </RevealHeading>
        <Reveal>
          <div className="mx-auto mt-[48px] grid max-w-[1180px] overflow-hidden rounded-[20px] border border-[#315671] bg-[#14314B] text-left shadow-xl lg:grid-cols-[0.8fr_1.2fr]">
            <div className="relative min-h-[260px] border-b border-[#315671] bg-[#102941] p-8 lg:border-b-0 lg:border-r">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(83,109,254,0.28),transparent_45%)]" />
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                  <span className="inline-flex rounded-full border border-[#F97316]/35 bg-[#F97316]/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-[#FDBA74]">
                    AGTP Team
                  </span>
                  <h3 className="mt-6 max-w-[360px] text-[26px] font-black leading-[1.12] text-white">
                    Your Global Sourcing Partner
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

function CustomerStoriesSection() {
  return (
    <section id="customer-reviews" className="mx-auto max-w-[1570px] scroll-mt-32 px-6 pt-[82px] text-center">
      <SectionEyebrow center>CUSTOMER REVIEWS</SectionEyebrow>
      <RevealHeading>
        <h2 className="mx-auto mt-6 max-w-[760px] text-[34px] font-black leading-[1.1] tracking-normal md:text-[50px]">
          What Our Customers Say
        </h2>
      </RevealHeading>
      <RevealButton>
        <Link href="/contact-us" className="mt-7 inline-flex h-[48px] items-center rounded-full border border-[#F97316] px-7 text-[14px] font-black text-white transition-colors hover:bg-[#F97316]">
          Explore More
        </Link>
      </RevealButton>
      <RevealStagger staggerDelay={80} className="mt-[48px] grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {customerStories.map((story, index) => (
          <div key={story.name} className="group flex h-full min-h-[540px] flex-col overflow-hidden rounded-[16px] border border-[#315671] bg-[#14314B] shadow-lg">
            <div className="relative h-[230px] shrink-0 overflow-hidden bg-[#0B1F33]">
              <Image
                src={[agtpAssets.cadillacEscaladeCard, agtpAssets.bmw760Card, agtpAssets.exportPort, agtpAssets.suvs][index]}
                alt={`${story.name} customer story`}
                fill
                className="object-cover opacity-75 transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33]/90 via-[#0B1F33]/20 to-transparent" />
              <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-[#0B1F33]/70 px-3.5 py-2 text-[11px] font-black uppercase tracking-[0.14em] text-white backdrop-blur">
                Customer Story
              </span>
            </div>
            <div className="flex flex-1 flex-col p-6 text-left">
              <div className="flex items-start gap-3">
                <span className="mt-1 h-8 w-1.5 shrink-0 rounded-full bg-[#F97316]" />
                <div>
                  <h3 className="text-[18px] font-black leading-tight text-white">{story.name}</h3>
                  <p className="mt-1 text-[12px] font-bold uppercase tracking-[0.14em] text-[#FDBA74]">{story.label}</p>
                </div>
              </div>
              <p className="mt-5 text-[14px] font-medium leading-[1.6] text-slate-300">{story.story}</p>
            </div>
          </div>
        ))}
      </RevealStagger>
    </section>
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
  const words =
    "AGTP Group Spare Parts, rooted in Dubai, UAE, has grown into a trusted global seller delivering quality automotive parts with unmatched customer service.".split(
      " "
    );
  const blueStartIndex = Math.floor(words.length / 2);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      if (frame) return;

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const section = sectionRef.current;
        if (!section) return;

        const rect = section.getBoundingClientRect();
        const stickyOffset = window.innerWidth >= 1024 ? 144 : 92;
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
  }, [words.length]);

  return (
    <section ref={sectionRef} className="relative h-[170vh] border-y border-[#111827]">
      <div className="sticky top-[92px] flex min-h-[calc(100vh-92px)] items-center lg:top-[144px] lg:min-h-[calc(100vh-144px)]">
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

        const stickyOffset = window.innerWidth >= 1024 ? 144 : 0;
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

      if (window.innerWidth < 1024) {
        section.style.height = "auto";
        track.style.transform = "translate3d(0, 0, 0)";
        scrollDistance = 0;
        return;
      }

      scrollDistance = Math.max(track.scrollWidth - viewport.clientWidth, 0);
      section.style.height = `${window.innerHeight + scrollDistance}px`;
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
  }, []);

  return (
    <section ref={sectionRef} className="relative pt-[95px] lg:pt-0">
      <div className="lg:sticky lg:top-[144px] lg:flex lg:min-h-[calc(100vh-144px)] lg:items-center lg:overflow-hidden">
        <div ref={viewportRef} className="w-full overflow-x-auto px-6 pb-4 scrollbar-none lg:overflow-hidden lg:px-10">
          <div
            ref={trackRef}
            className="grid gap-12 lg:flex lg:w-max lg:gap-7 lg:transition-transform lg:duration-75 lg:ease-linear lg:will-change-transform"
          >
            <div className="shrink-0 lg:flex lg:h-[500px] lg:w-[430px] lg:flex-col lg:justify-center">
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

            <div className="flex gap-7 overflow-x-auto scrollbar-none lg:contents">
              {serviceCards.map((item) => (
                <Link
                  key={item.num}
                  href={item.href}
                  className="group relative flex h-[500px] w-[460px] shrink-0 flex-col justify-end overflow-hidden rounded-[20px] border border-[#315671] bg-slate-800 p-8"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover opacity-65 transition-transform duration-700 group-hover:scale-105"
                    sizes="460px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-slate-300/75 via-slate-700/40 to-[#14314B]/95" />
                  <span className="absolute left-8 top-8 text-[15px] font-black tracking-[0.2em] text-white/80">
                    {item.num}
                  </span>
                  <div className="relative z-10">
                    <span className="text-[13px] font-black uppercase tracking-[0.35em] text-[#FDBA74]">
                      {item.category}
                    </span>
                    <h3 className="mt-3 text-[34px] font-black leading-none text-white">{item.title}</h3>
                    <p className="mt-4 max-w-[360px] text-[17px] font-medium leading-[1.45] text-slate-200">
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



