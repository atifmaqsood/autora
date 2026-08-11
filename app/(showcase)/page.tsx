"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { VehicleInquiryModal } from "@/components/vehicles/vehicle-inquiry-modal";
import { VehicleCard } from "@/components/vehicles/vehicle-card";
import { getAllVehicles, getFeaturedVehicles } from "@/lib/vehicles/data";
import { Reveal, RevealButton, RevealEyebrow, RevealHeading, RevealStagger, RevealText } from "@/components/ui/scroll-reveal";
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
    <div className="bg-[#070a10] pb-20 text-white">
      <HeroCarousel />

      <Marquee items={["AUTOMOTIVE TRADING", "SPARE PARTS", "CONSTRUCTION MATERIALS", "ELECTRONICS", "FURNITURE", "GENERAL TRADING"]} />

      <section className="mx-auto max-w-[1570px] px-6 pt-[90px]">
        <div className="mb-10 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionEyebrow>ALL PRODUCTS</SectionEyebrow>
            <RevealHeading>
              <h2 className="mt-2 text-[30px] font-black leading-none tracking-normal">Top Quality Autoparts</h2>
            </RevealHeading>
          </div>

          <RevealButton>
            <div className="flex w-full max-w-[500px] items-center rounded-full border border-[#24304d] bg-[#070a10] p-1.5">
              <input
                type="text"
                placeholder="Search make, model, name..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="min-w-0 flex-1 bg-transparent px-6 text-[16px] font-medium text-white outline-none placeholder:text-slate-500"
              />
              <Link
                href={`/vehicles?search=${encodeURIComponent(searchQuery)}`}
                className="flex h-[56px] items-center gap-3 rounded-full bg-[#536dfe] px-8 text-[17px] font-extrabold text-white transition-colors hover:bg-[#4560f2]"
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

      <PromiseRevealSection />

      <ServicesHorizontalSection />

      <section className="pt-[95px]">
        <Reveal>
          <div className="relative min-h-[620px] overflow-hidden border-y border-[#1c2436]">
            <Image src={agtpAssets.spotlightFerrari} alt="Ferrari SF90 Spider" fill className="object-cover" sizes="100vw" />
            <div className="absolute inset-0 bg-[#050811]/55" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050811]/80 via-[#050811]/30 to-[#050811]/70" />
            <div className="relative z-10 mx-auto flex min-h-[620px] max-w-[1570px] flex-col justify-center px-6">
              <h2 className="max-w-[760px] text-[52px] font-black uppercase leading-[0.95] tracking-normal text-slate-100 md:text-[82px]">
                Luxury Cars, Trusted Worldwide
              </h2>
              <Link
                href="/vehicles"
                className="absolute left-[61%] top-[92px] flex h-[92px] w-[92px] items-center justify-center rounded-full bg-[#536dfe] text-[12px] font-black uppercase tracking-[0.15em] text-white"
              >
                View
              </Link>
              <div className="absolute right-[8.5%] top-[260px] hidden w-[520px] space-y-4 xl:block">
                {[
                  ["Service", "Automotive Trading"],
                  ["Supply", "Spare Parts"],
                  ["Reach", "Worldwide"]
                ].map(([label, value]) => (
                  <div key={label} className="flex h-[68px] items-center justify-between rounded-[14px] border border-[#33405f] bg-[#172033]/90 px-7">
                    <span className="text-[15px] font-medium text-slate-400">{label}</span>
                    <span className="text-[21px] font-black text-white">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1570px] px-6 pt-[95px] text-center">
        <SectionEyebrow center>WHY CHOOSE AGTP GROUP?</SectionEyebrow>
        <RevealHeading>
          <h2 className="mx-auto mt-7 max-w-[840px] text-[42px] font-black leading-[1.12] tracking-normal md:text-[62px]">
            Why Choose AGTP Group?
          </h2>
        </RevealHeading>
        <RevealStagger staggerDelay={120} className="mt-[68px] grid grid-cols-1 gap-7 lg:grid-cols-3">
          {testimonials.map(([quote, author]) => (
            <div key={author} className="min-h-[330px] rounded-[18px] border border-[#25304f] bg-[#111832] p-8 text-left">
              <div className="mb-7 text-[16px] font-black tracking-[0.2em] text-[#536dfe]">*****</div>
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
            <div key={name} className="rounded-[16px] border border-[#25304f] bg-[#111832] p-7 text-center">
              <h3 className="text-[20px] font-black text-white">{name}</h3>
              <p className="mt-5 text-[16px] font-medium leading-[1.6] text-slate-400">
                {line1}
                <br />
                {line2}
                <br />
                {line3}
              </p>
              <p className="mt-7 text-[16px] font-medium leading-[1.6] text-slate-400">
                Contact: <span className="text-[#9cadff]">+971 58 585729</span>
                <br />
                WhatsApp: <span className="text-[#9cadff]">+971 58 585729</span>
              </p>
            </div>
          ))}
        </RevealStagger>
      </section>

      <Marquee muted items={["GLOBAL TRADING EXCELLENCE", "DELIVERING QUALITY", "BUILDING TRUST"]} />

      <section className="mx-auto max-w-[1570px] px-6 pt-[80px]">
        <Reveal>
          <div className="relative min-h-[540px] overflow-hidden rounded-[24px] border border-[#25304f] bg-[#111832]">
            <Image src={agtpAssets.exportPort} alt="Export port" fill className="object-cover" sizes="1570px" />
            <div className="absolute inset-0 bg-[#050811]/65" />
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
                    className="flex h-[60px] items-center gap-3 rounded-full bg-[#536dfe] px-8 text-[18px] font-extrabold text-white transition-colors hover:bg-[#4560f2]"
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
      <div className={`flex items-center gap-3 text-[12px] font-black uppercase tracking-[0.35em] text-[#9cadff] ${center ? "justify-center" : ""}`}>
        <span className="h-px w-8 bg-[#536dfe]" />
        {children}
      </div>
    </RevealEyebrow>
  );
}

function PromiseRevealSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeCount, setActiveCount] = useState(0);
  const words =
    "AGTP Group Spare Parts, rooted in Dubai, UAE, has grown into a trusted global seller delivering quality automotive parts with unmatched customer service.".split(
      " "
    );

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
                  index < activeCount ? "text-slate-100" : "text-[#111a42]"
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
                  className="group relative flex h-[500px] w-[460px] shrink-0 flex-col justify-end overflow-hidden rounded-[20px] border border-[#2a3452] bg-slate-800 p-8"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover opacity-65 transition-transform duration-700 group-hover:scale-105"
                    sizes="460px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-slate-300/75 via-slate-700/40 to-[#1f2430]/95" />
                  <span className="absolute left-8 top-8 text-[15px] font-black tracking-[0.2em] text-white/80">
                    {item.num}
                  </span>
                  <div className="relative z-10">
                    <span className="text-[13px] font-black uppercase tracking-[0.35em] text-[#9cadff]">
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
    <div className={`${muted ? "mt-[75px] border-y border-[#1c2436] bg-[#0b1020] py-12" : "border-y border-[#1c2436] bg-[#0b1020] py-9"} overflow-hidden`}>
      <div className={`${muted ? "text-[48px] text-transparent opacity-50 marquee-outline" : "text-[52px] text-white"} animate-marquee flex items-center gap-14 whitespace-nowrap font-black uppercase leading-none tracking-normal`}>
        {content.map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center gap-14">
            {item}
            <span className="text-[#536dfe]">*</span>
          </span>
        ))}
      </div>
    </div>
  );
}



