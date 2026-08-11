"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Compass, Eye, ShieldCheck } from "lucide-react";
import { VehicleInquiryModal } from "@/components/vehicles/vehicle-inquiry-modal";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { agtpAssets } from "@/src/assets";
import {
  Reveal,
  RevealEyebrow,
  RevealHeading,
  RevealText,
  RevealButton,
  RevealStagger,
  RevealCounter
} from "@/components/ui/scroll-reveal";

export default function AboutPage() {
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);

  return (
    <div className="space-y-0 pb-20 bg-[#070b14] text-white">
      {/* ── 1. Hero Header with Parallax ───────────────────────────── */}
      <section className="relative min-h-[85vh] bg-[#050811] border-b border-slate-800/80 overflow-hidden flex flex-col justify-center pt-28 pb-12">
        <ParallaxImage
          src={agtpAssets.aboutHero}
          alt="Showroom Header"
          overlayOpacity="opacity-55"
          speed={0.25}
          className="absolute inset-0 w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050811]/90 via-[#050811]/60 to-transparent z-10" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
            <Link href="/" className="hover:text-white transition-colors">HOME</Link>
            <span>/</span>
            <span className="text-indigo-400">ABOUT</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white font-sans max-w-3xl leading-none drop-shadow-lg">
            ABOUT AGTP GROUP
          </h1>

          <p className="text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed drop-shadow-md">
            AGTP Group has built a strong reputation for reliability, quality, and exceptional service as a leading re-exporter of auto spare parts for over two decades.
          </p>
        </div>
      </section>

      {/* ── 2. ABOUT AGTP GROUP — Reliable Suppliers of Auto Spare Parts in the UAE ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Map Graphic */}
          <div className="lg:col-span-6 relative">
            <Reveal duration={700}>
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-slate-800 bg-[#0b0f19] shadow-2xl">
                <Image
                  src={agtpAssets.aboutYard}
                  alt="Historical Map"
                  fill
                  className="object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 bg-[#070b14]/90 border border-slate-700 backdrop-blur-md px-5 py-3 rounded-2xl space-y-0.5">
                  <span className="text-sm font-black text-white block">35+ Countries</span>
                  <span className="text-[10px] text-slate-400 font-medium">served worldwide</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Text Content */}
          <div className="lg:col-span-6 space-y-6">
            <RevealEyebrow>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                <span className="w-6 h-[1.5px] bg-indigo-500" />
                ABOUT AGTP GROUP
              </div>
            </RevealEyebrow>

            <RevealHeading>
              <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight font-sans">
                Reliable Suppliers of Auto Spare Parts in the UAE
              </h2>
            </RevealHeading>

            <RevealText delay={120}>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <p>
                  AGTP Group specializes in supplying spare parts for all types of vehicles, including trucks, buses, and heavy equipment. Customers rely on the company for genuine car spare parts in the UAE and dependable re-export support.
                </p>
                <p>
                  Leveraging a strong network of trusted suppliers, AGTP GROUP procures top-quality spare parts at competitive prices. The team ensures that every product offered adheres to high industry standards and supports long-lasting relationships across global markets.
                </p>
              </div>
            </RevealText>
          </div>
        </div>
      </section>

      {/* ── 3. WHY CUSTOMERS CHOOSE AGTP GROUP? — Punctuality, pricing & range ────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28">
        <div className="text-center max-w-xl mx-auto space-y-3 mb-14">
          <RevealEyebrow>
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <span className="w-6 h-[1.5px] bg-indigo-500" />
              WHY CUSTOMERS CHOOSE AGTP GROUP?
            </div>
          </RevealEyebrow>

          <RevealHeading>
            <h2 className="text-3xl sm:text-5xl font-black text-white font-sans">
              Punctuality, pricing & range
            </h2>
          </RevealHeading>
        </div>

        <RevealStagger staggerDelay={100} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Compass,
              title: "Punctuality",
              desc: "We consistently adhere to promised delivery times, ensuring we meet and exceed customer expectations."
            },
            {
              icon: Eye,
              title: "Competitive Pricing",
              desc: "Our prices are exceptionally competitive, offering strong value compared to others in the industry."
            },
            {
              icon: ShieldCheck,
              title: "Diverse Range",
              desc: "We provide an extensive range of brands, models, and products to suit customer needs."
            }
          ].map((item) => (
            <div key={item.title} className="bg-[#0b0f19] border border-slate-800 rounded-3xl p-8 space-y-4 hover:border-indigo-500 transition-all duration-300 shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">{item.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </RevealStagger>
      </section>

      {/* ── 4. THE DIFFERENCE — What makes AGTP GROUP different ──────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Differentiators List */}
          <div className="lg:col-span-7 space-y-6">
            <RevealEyebrow>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                <span className="w-6 h-[1.5px] bg-indigo-500" />
                THE DIFFERENCE
              </div>
            </RevealEyebrow>

            <RevealHeading>
              <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight font-sans">
                What makes AGTP GROUP different
              </h2>
            </RevealHeading>

            <RevealText delay={120}>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                We sincerely thank and appreciate all our customers and suppliers for their continued support over the years. We remain committed to delivering our best services at all times.
              </p>
            </RevealText>

            <RevealStagger staggerDelay={80} className="space-y-4 pt-2">
              {[
                { title: "Genuine OEM and replacement parts", desc: "AGTP GROUP supplies reliable auto spare parts across multiple brands and product categories." },
                { title: "Professional suppliers of auto spare parts", desc: "A skilled team supports product sourcing, quotation, documentation, and fulfilment." },
                { title: "Export coordination through a global network", desc: "The company supports re-export requirements through supplier and logistics coordination." },
                { title: "Reliable sourcing with competitive pricing", desc: "AGTP GROUP uses its trusted supplier network to procure quality parts at strong value." },
                { title: "Customer satisfaction is our top priority", desc: "Dedicated support and service remain central to every enquiry and order." },
                { title: "Expanded range of products", desc: "The ability to import parts globally and re-export to new markets gives AGTP GROUP a clear edge." }
              ].map((point) => (
                <div key={point.title} className="flex items-start gap-3 bg-[#0b0f19] border border-slate-800/60 p-4 rounded-2xl">
                  <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs sm:text-sm font-bold text-white block">{point.title}</strong>
                    <span className="text-[11px] sm:text-xs text-slate-400 leading-relaxed block mt-0.5">{point.desc}</span>
                  </div>
                </div>
              ))}
            </RevealStagger>

            <RevealButton delay={200}>
              <div className="pt-4">
                <Link href="/contact">
                  <button className="bg-[#5271ff] hover:bg-[#4361ee] text-white font-bold text-xs px-8 py-3.5 rounded-full shadow-lg transition-all inline-flex items-center gap-2">
                    <span>Start a conversation</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </RevealButton>
          </div>

          {/* Right Showroom Photo */}
          <div className="lg:col-span-5 relative">
            <Reveal duration={700}>
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-slate-800 bg-[#0b0f19] shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1000&q=80"
                  alt="AGTP GROUP Showroom"
                  fill
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 5. Statistics Bar ────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <RevealStagger staggerDelay={100} className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="bg-[#0b0f19] border border-slate-800 p-8 rounded-3xl space-y-1 shadow-xl">
            <div className="text-3xl sm:text-5xl font-black text-white font-sans">
              <RevealCounter end={35} suffix="+" />
            </div>
            <span className="text-xs text-slate-400 font-semibold block">Number of countries we serve</span>
          </div>

          <div className="bg-[#0b0f19] border border-slate-800 p-8 rounded-3xl space-y-1 shadow-xl">
            <div className="text-3xl sm:text-5xl font-black text-indigo-400 font-sans">
              <RevealCounter end={110} suffix="M+" />
            </div>
            <span className="text-xs text-slate-400 font-semibold block">Sales Volume AED Overall</span>
          </div>

          <div className="bg-[#0b0f19] border border-slate-800 p-8 rounded-3xl space-y-1 shadow-xl">
            <div className="text-3xl sm:text-5xl font-black text-white font-sans">
              <RevealCounter end={100} suffix="K+" />
            </div>
            <span className="text-xs text-slate-400 font-semibold block">Number of Orders Fulfiled</span>
          </div>

          <div className="bg-[#0b0f19] border border-slate-800 p-8 rounded-3xl space-y-1 shadow-xl">
            <div className="text-3xl sm:text-5xl font-black text-emerald-400 font-sans">
              <RevealCounter end={40} suffix="+" />
            </div>
            <span className="text-xs text-slate-400 font-semibold block">Countries with long-lasting relationships</span>
          </div>
        </RevealStagger>
      </section>

      {/* ── 6. LEADERSHIP — The people steering AGTP GROUP ───────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28">
        <div className="text-center max-w-xl mx-auto space-y-3 mb-14">
          <RevealEyebrow>
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <span className="w-6 h-[1.5px] bg-indigo-500" />
              LEADERSHIP
            </div>
          </RevealEyebrow>

          <RevealHeading>
            <h2 className="text-3xl sm:text-5xl font-black text-white font-sans">
              The people steering AGTP GROUP
            </h2>
          </RevealHeading>

          <RevealText delay={120}>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Decades of combined experience in automotive trade, international logistics, customer service, and compliance.
            </p>
          </RevealText>
        </div>

        <RevealStagger staggerDelay={100} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              name: "FAISAL RIAZ",
              title: "Chairman",
              desc: "A strategic leader with extensive international business and automotive experience, Faisal provides the long-term vision behind AGTP GROUP's continued global growth.",
              image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"
            },
            {
              name: "FAHAD RIAZ",
              title: "Deputy Chairman & Group CEO",
              desc: "Fahad leads AGTP GROUP's operations with a strong focus on customer service, responsible growth, and long-term partnerships across international markets.",
              image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80"
            },
            {
              name: "FEROZ RIAZ",
              title: "Non-Executive Director",
              desc: "Feroz supports the company's global strategy and diversification, bringing valuable insight into international trade and business development.",
              image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80"
            },
            {
              name: "ABDUL AZEEM LIAQAT",
              title: "CEO of AGTP GROUP",
              desc: "Abdul Azeem leads the automotive division with a focus on operational excellence, team development, and premium customer experiences.",
              image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80"
            }
          ].map((leader) => (
            <div key={leader.name} className="bg-[#0b0f19] border border-slate-800 rounded-3xl overflow-hidden flex flex-col justify-between shadow-xl group hover:border-indigo-500 transition-all duration-300">
              <div className="relative aspect-[3/4] w-full bg-slate-900 overflow-hidden">
                <Image
                  src={leader.image}
                  alt={leader.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
              <div className="p-6 space-y-2">
                <h3 className="text-base font-black text-white uppercase tracking-tight">{leader.name}</h3>
                <span className="text-xs font-bold text-indigo-400 block">{leader.title}</span>
                <p className="text-[11px] text-slate-400 leading-relaxed pt-2">
                  {leader.desc}
                </p>
              </div>
            </div>
          ))}
        </RevealStagger>
      </section>

      {/* ── 7. GET RELIABLE AND GENUINE CAR SPARE PARTS IN UAE CTA Banner ────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28">
        <Reveal duration={700}>
          <div className="relative bg-[#0b0f19] border border-slate-800 rounded-3xl p-10 sm:p-16 text-center overflow-hidden shadow-2xl">
            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight font-sans">
                GET RELIABLE AND GENUINE CAR SPARE PARTS IN UAE
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
                We sincerely thank and appreciate all our customers and suppliers for their continued support over the years. AGTP GROUP remains committed to delivering its best services at all times.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => setInquiryModalOpen(true)}
                  className="bg-[#5271ff] hover:bg-[#4361ee] text-white font-bold text-xs px-8 py-3.5 rounded-full shadow-lg transition-all inline-flex items-center gap-2"
                >
                  <span>Click here</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <Link href="/brands">
                  <button className="border border-slate-700 hover:bg-slate-800 text-white font-bold text-xs px-8 py-3.5 rounded-full transition-all">
                    Brands
                  </button>
                </Link>
              </div>
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



