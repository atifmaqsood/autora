"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Globe2, ShieldCheck } from "lucide-react";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { Reveal, RevealEyebrow, RevealHeading, RevealStagger, RevealText } from "@/components/ui/scroll-reveal";
import { businessSolutions } from "@/lib/agtp/content";
import { agtpAssets } from "@/src/assets";
import { VehicleInquiryModal } from "@/components/vehicles/vehicle-inquiry-modal";

type BusinessSolution = (typeof businessSolutions)[number];

export function BusinessSolutionDetail({ solution }: { solution: BusinessSolution }) {
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const otherSolutions = businessSolutions.filter((s) => s.slug !== solution.slug);

  return (
    <div className="bg-[#060709] pb-24 text-white">
      {/* ── 1. Hero Header Banner with Background Image & Parallax ── */}
      <section className="relative min-h-[440px] bg-[#081A2B] border-b border-slate-800/80 overflow-hidden flex flex-col justify-center pt-40 pb-16">
        <ParallaxImage
          src={agtpAssets.exportPort}
          alt={solution.title}
          overlayOpacity="opacity-55"
          speed={0.25}
          className="absolute inset-0 w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#081A2B]/95 via-[#081A2B]/75 to-transparent z-10" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold tracking-widest text-slate-400 uppercase">
            <Link href="/" className="hover:text-white transition-colors">HOME</Link>
            <span>/</span>
            <Link href="/business-solutions" className="hover:text-white transition-colors">BUSINESS SOLUTIONS</Link>
            <span>/</span>
            <span className="text-[#F97316]">{solution.title.toUpperCase()}</span>
          </div>

          <div className="inline-flex items-center rounded-full border border-[#F97316]/40 bg-[#0B1F33]/80 px-4 py-1.5 text-[12px] font-black uppercase text-[#FDBA74]">
            {solution.eyebrow}
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white font-sans max-w-5xl leading-none drop-shadow-lg">
            {solution.heading}
          </h1>

          <p className="text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed drop-shadow-md">
            {solution.body}
          </p>
        </div>
      </section>

      {/* ── 2. Solution Overview & Key Highlights ── */}
      <section className="mx-auto max-w-[1570px] px-6 pt-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Left Summary Box */}
          <div className="lg:col-span-5">
            <div className="rounded-[24px] border border-[#315671] bg-[#102941] p-8 md:p-12 shadow-xl space-y-6">
              <span className="rounded-full bg-[#F97316]/15 border border-[#F97316]/40 px-4 py-1.5 text-[12px] font-black text-[#FDBA74]">
                CATEGORY SUMMARY
              </span>
              <h2 className="text-[32px] font-black text-white">{solution.title}</h2>
              <p className="text-[15px] font-medium leading-relaxed text-slate-300">
                AGTP Group acts as your trusted global partner for seamless import/export, offering verified supplier sourcing, competitive pricing, and efficient logistics support.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => setInquiryModalOpen(true)}
                  className="inline-flex h-[52px] items-center gap-3 rounded-full bg-[#F97316] px-8 text-[15px] font-black text-white transition-colors hover:bg-[#EA580C]"
                >
                  <span>Request Quotation</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Highlights Cards */}
          <div className="lg:col-span-7">
            <RevealStagger staggerDelay={80} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {solution.highlights.map((highlight) => (
                <div key={highlight} className="flex items-center gap-4 rounded-[20px] border border-[#315671] bg-[#14314B] p-6 shadow-lg">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#F97316]/40 bg-[#0B1F33] text-[#FDBA74]">
                    <CheckCircle2 className="h-5 w-5 text-[#F97316]" />
                  </div>
                  <span className="text-[16px] font-black text-white">{highlight}</span>
                </div>
              ))}
            </RevealStagger>
          </div>
        </div>
      </section>

      {/* ── 3. Other Business Solutions Grid ── */}
      <section className="mx-auto max-w-[1570px] px-6 pt-24">
        <div className="border-t border-[#24445F] pt-16 text-center">
          <RevealHeading>
            <h2 className="text-[32px] font-black md:text-[46px]">Other Business Solutions</h2>
          </RevealHeading>
          <RevealText>
            <p className="mt-3 text-[16px] font-semibold text-slate-400">
              Discover our comprehensive range of general merchandise, automotive, and industrial trade solutions.
            </p>
          </RevealText>
        </div>

        <RevealStagger staggerDelay={70} className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {otherSolutions.map((item) => (
            <Link
              key={item.slug}
              href={`/${item.slug}`}
              className="group relative flex flex-col justify-between overflow-hidden rounded-[20px] border border-[#315671] bg-[#14314B] p-7 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#F97316]"
            >
              <div>
                <span className="text-[11px] font-black uppercase text-[#FDBA74]">{item.eyebrow}</span>
                <h3 className="mt-3 text-[22px] font-black text-white group-hover:text-[#FDBA74] transition-colors">
                  {item.title}
                </h3>
                <p className="mt-3 text-[14px] font-medium leading-relaxed text-slate-300">
                  {item.body}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#24445F]/60 flex items-center justify-between text-[13px] font-black text-[#F97316]">
                <span>View Details</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </RevealStagger>
      </section>

      <VehicleInquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
      />
    </div>
  );
}
