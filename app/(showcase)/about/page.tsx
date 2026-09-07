"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  FileCheck,
  Globe2,
  ShieldCheck,
  Ship,
  Target,
  Truck
} from "lucide-react";
import { VehicleInquiryModal } from "@/components/vehicles/vehicle-inquiry-modal";
import { PageHero } from "@/components/ui/page-hero";
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
    <div className="space-y-0 pb-20 bg-[#060709] text-white">
      {/* ── 1. Hero Header Banner ── */}
      <PageHero
        breadcrumbs={[
          { label: "HOME", href: "/" },
          { label: "ABOUT US" }
        ]}
        badge={{
          text: "ABOUT US — OUR STORY"
        }}
        title={
          <>
            <span className="block text-[18px] sm:text-[24px] md:text-[28px] font-black uppercase tracking-[0.25em] text-[#FDBA74] mb-1">
              THE STORY BEHIND
            </span>
            AGTP GROUP
          </>
        }
        subtitle={
          <div className="space-y-3.5">
            <p className="text-[17px] sm:text-[19px] md:text-[21px] font-bold text-white leading-snug">
              A Dubai-based automotive trading company built on trust, quality, and global ambition.
            </p>
            <p className="text-[14px] sm:text-[15px] md:text-[16px] font-normal text-slate-300 leading-relaxed max-w-2xl">
              AGTP Group supplies quality vehicles and automotive spare parts to customers worldwide, combining competitive pricing, professional service, and reliable international delivery.
            </p>
            <div className="pt-1">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#F97316]/50 bg-[#0B1F33]/85 px-4 py-1.5 text-[12px] sm:text-[13px] font-bold text-[#FDBA74] backdrop-blur-md shadow-sm">
                <span className="h-2 w-2 rounded-full bg-[#F97316]" />
                From Dubai to the world — automotive trade made simple.
              </span>
            </div>
          </div>
        }
        imageSrc={agtpAssets.aboutHero}
        imageAlt="AGTP Group Showroom & Headquarters"
      />

      {/* ── 2. OUR STORY — From Dubai to the World ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Graphic */}
          <div className="lg:col-span-6 relative">
            <Reveal duration={700}>
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-slate-800 bg-[#102941] shadow-2xl">
                <Image
                  src={agtpAssets.aboutYard}
                  alt="AGTP Group Global Export Yard"
                  fill
                  className="object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#102941] via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 bg-[#0B1F33]/90 border border-slate-700 backdrop-blur-md px-5 py-3 rounded-2xl space-y-0.5">
                  <span className="text-sm font-black text-white block tracking-wide">45+ COUNTRIES</span>
                  <span className="text-[11px] text-slate-300 font-medium">Trusted across borders</span>
                </div>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-6 space-y-6">
            <RevealEyebrow>
              <div className="flex items-center gap-2 text-xs font-bold text-[#FDBA74] uppercase tracking-widest">
                <span className="w-6 h-[1.5px] bg-[#F97316]" />
                OUR STORY
              </div>
            </RevealEyebrow>

            <RevealHeading>
              <div>
                <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight font-sans">
                  From Dubai to the World
                </h2>
                <p className="mt-2 text-xl sm:text-2xl font-black text-[#F97316] tracking-wide">
                  Driven by Trust
                </p>
              </div>
            </RevealHeading>

            <RevealText delay={120}>
              <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
                <p>
                  AGTP Group began with a clear vision: make buying and exporting vehicles and automotive spare parts easier, more transparent, and more reliable. From Dubai, one of the world’s leading automotive and trade hubs, we serve customers across international markets with quality products and professional support.
                </p>
                <p>
                  What started as a focused automotive trading business continues to grow into a global export operation. Today, AGTP Group supplies vehicles and genuine automotive spare parts to customers, dealers, businesses, and organisations across more than 45 countries worldwide.
                </p>
                <p>
                  Driven by Trust is more than our slogan — it reflects how we do business. As AGTP Group continues to grow globally, our commitment remains the same: provide quality automotive products, keep our promises, and build lasting relationships with customers around the world.
                </p>
              </div>
            </RevealText>
          </div>
        </div>
      </section>

      {/* ── 3. Statistics Bar (Rolling Numbers) ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <RevealStagger staggerDelay={100} className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {[
            { icon: Ship, value: 10000, suffix: "+", label: "Exports" },
            { icon: Globe2, value: 45, suffix: "+", label: "Countries Served" },
            { icon: FileCheck, value: 11, suffix: "+", label: "Years in Trade" },
            { icon: Truck, value: 94, suffix: "%", label: "On-Time Delivery" }
          ].map((item) => (
            <div
              key={item.label}
              className="bg-[#102941] border border-slate-800 p-7 sm:p-8 rounded-3xl space-y-3 shadow-xl hover:border-[#F97316]/60 transition-all duration-300 group"
            >
              <div className="w-12 h-12 mx-auto rounded-2xl bg-[#F97316]/10 border border-[#F97316]/20 text-[#F97316] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <item.icon className="w-6 h-6" />
              </div>
              <div className="text-3xl sm:text-5xl font-black text-white font-sans tracking-tight">
                <RevealCounter end={item.value} suffix={item.suffix} />
              </div>
              <span className="text-xs sm:text-sm text-slate-400 font-semibold block uppercase tracking-wider">
                {item.label}
              </span>
            </div>
          ))}
        </RevealStagger>
      </section>

      {/* ── 4. WHAT DRIVES US — Mission, Vision & Values ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28">
        <div className="text-center max-w-xl mx-auto space-y-3 mb-14">
          <RevealEyebrow>
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#FDBA74] uppercase tracking-widest">
              <span className="w-6 h-[1.5px] bg-[#F97316]" />
              WHAT DRIVES US
            </div>
          </RevealEyebrow>

          <RevealHeading>
            <h2 className="text-3xl sm:text-5xl font-black text-white font-sans">
              Mission, Vision &amp; Values
            </h2>
          </RevealHeading>
        </div>

        <RevealStagger staggerDelay={100} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Target,
              title: "Our Mission",
              desc: "To make buying and exporting vehicles and automotive spare parts simple, transparent, and reliable, with professional support from inquiry to delivery."
            },
            {
              icon: Eye,
              title: "Our Vision",
              desc: "To become a globally trusted name in automotive trade and export from the UAE, recognized for quality, value, and dependable service."
            },
            {
              icon: ShieldCheck,
              title: "Our Values",
              desc: "Driven by Trust. We stand for integrity, transparency, accountability, and customer care, building lasting relationships through every transaction."
            }
          ].map((item) => (
            <div key={item.title} className="bg-[#102941] border border-slate-800 rounded-3xl p-8 space-y-4 hover:border-[#F97316] transition-all duration-300 shadow-xl flex flex-col justify-start">
              <div className="w-12 h-12 rounded-2xl bg-[#F97316]/10 border border-[#F97316]/20 text-[#F97316] flex items-center justify-center">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">{item.title}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </RevealStagger>
      </section>

      {/* ── 5. THE DIFFERENCE — What makes AGTP Group Different ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Differentiators List */}
          <div className="lg:col-span-7 space-y-6">
            <RevealEyebrow>
              <div className="flex items-center gap-2 text-xs font-bold text-[#FDBA74] uppercase tracking-widest">
                <span className="w-6 h-[1.5px] bg-[#F97316]" />
                THE DIFFERENCE
              </div>
            </RevealEyebrow>

            <RevealHeading>
              <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight font-sans">
                What Makes AGTP Group{" "}
                <span className="text-[#F97316] sm:block">Different</span>
              </h2>
            </RevealHeading>

            <RevealText delay={120}>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                We focus on making every purchase clear, reliable, and built on trust — from your first inquiry to final delivery.
              </p>
            </RevealText>

            <RevealStagger staggerDelay={80} className="space-y-4 pt-2">
              {[
                { title: "Vehicles & spare parts under one roof", desc: "We supply quality vehicles and automotive spare parts for customers worldwide." },
                { title: "Global automotive reach", desc: "We serve customers across 45+ countries, connecting Dubai’s automotive market with destinations around the world." },
                { title: "Competitive pricing", desc: "Our strong market relationships and trading experience help us offer competitive prices and genuine value." },
                { title: "Reliable export support", desc: "We handle export documentation, shipping coordination, and delivery arrangements for international orders." },
                { title: "Clear communication", desc: "We keep customers informed with straightforward product details, pricing, order updates, and shipping information." },
                { title: "Driven by Trust", desc: "Integrity, transparency, and customer care guide every transaction — because trust is at the heart of everything we do." }
              ].map((point) => (
                <div key={point.title} className="flex items-start gap-3 bg-[#102941] border border-slate-800/60 p-4 rounded-2xl hover:border-[#F97316]/50 transition-colors">
                  <CheckCircle2 className="w-5 h-5 text-[#F97316] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs sm:text-sm font-bold text-white block">{point.title}</strong>
                    <span className="text-[11px] sm:text-xs text-slate-300 leading-relaxed block mt-0.5">{point.desc}</span>
                  </div>
                </div>
              ))}
            </RevealStagger>

            <RevealButton delay={200}>
              <div className="pt-4">
                <Link href="/contact">
                  <button className="bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs px-8 py-3.5 rounded-full shadow-lg transition-all inline-flex items-center gap-2">
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
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-slate-800 bg-[#102941] shadow-2xl">
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

      {/* ── 6. LEADERSHIP — The people steering AGTP GROUP ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28">
        <div className="text-center max-w-xl mx-auto space-y-3 mb-14">
          <RevealEyebrow>
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <span className="w-6 h-[1.5px] bg-[#F97316]" />
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
            <div key={leader.name} className="bg-[#102941] border border-slate-800 rounded-3xl overflow-hidden flex flex-col justify-between shadow-xl group hover:border-[#F97316] transition-all duration-300">
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
                <span className="text-xs font-bold text-[#F97316] block">{leader.title}</span>
                <p className="text-[11px] text-slate-400 leading-relaxed pt-2">
                  {leader.desc}
                </p>
              </div>
            </div>
          ))}
        </RevealStagger>
      </section>

      {/* ── 7. READY TO GET STARTED? CTA Banner ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28">
        <Reveal duration={700}>
          <div className="relative bg-[#102941] border border-slate-800 rounded-3xl p-10 sm:p-16 text-center overflow-hidden shadow-2xl">
            {/* Ambient glows */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#F97316]/5 blur-3xl pointer-events-none" />
            <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-[#315671]/20 blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight font-sans">
                READY TO GET STARTED?
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
                Whether you&apos;re looking for a vehicle or automotive spare parts, AGTP Group is ready to help. Tell us what you need, where it&apos;s going, and your preferred specifications. We&apos;ll guide you through availability, pricing, payment, documentation, and reliable shipping options.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setInquiryModalOpen(true)}
                  className="bg-[#F97316] hover:bg-[#EA580C] text-white font-extrabold text-sm px-8 py-3.5 rounded-full shadow-lg transition-all inline-flex items-center gap-2 hover:gap-3"
                >
                  <span>GET A QUOTE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <Link href="/vehicles">
                  <button
                    type="button"
                    className="border border-slate-700 hover:border-white/40 hover:bg-slate-800 text-white font-extrabold text-sm px-8 py-3.5 rounded-full transition-all inline-flex items-center gap-2 hover:gap-3"
                  >
                    <span>EXPLORE VEHICLES</span>
                    <ArrowRight className="w-4 h-4" />
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
