"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Globe2, ShieldCheck } from "lucide-react";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { agtpAssets } from "@/src/assets";
import {
  Reveal,
  RevealButton,
  RevealHeading,
  RevealStagger,
  RevealText
} from "@/components/ui/scroll-reveal";
import { businessSolutions } from "@/lib/agtp/content";

export default function BusinessSolutionsPage() {
  return (
    <div className="bg-[#0B1F33] pb-24 text-white">
      {/* ── 1. Hero Header Banner with Background Image & Parallax ── */}
      <section className="relative min-h-[420px] bg-[#081A2B] border-b border-slate-800/80 overflow-hidden flex flex-col justify-center pt-40 pb-16">
        <ParallaxImage
          src={agtpAssets.exportPort}
          alt="Business Solutions Header"
          overlayOpacity="opacity-55"
          speed={0.25}
          className="absolute inset-0 w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#081A2B]/95 via-[#081A2B]/75 to-transparent z-10" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest text-slate-400 uppercase">
            <Link href="/" className="hover:text-white transition-colors">HOME</Link>
            <span>/</span>
            <span className="text-[#F97316]">BUSINESS SOLUTIONS</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white font-sans max-w-4xl leading-none drop-shadow-lg">
            BUSINESS SOLUTIONS
          </h1>

          <p className="text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed drop-shadow-md">
            AGTP GROUP provides seamless import/export, reliable sourcing, competitive pricing, and efficient logistics across multiple trading categories.
          </p>
        </div>
      </section>

      {/* ── 2. Solutions Card Grid ── */}
      <section className="mx-auto max-w-[1570px] px-6 pt-20">
        <div className="text-center">
          <RevealHeading>
            <h2 className="mx-auto max-w-3xl text-[34px] font-black leading-tight md:text-[50px]">
              Explore Our Trading Categories
            </h2>
          </RevealHeading>
          <RevealText>
            <p className="mx-auto mt-4 max-w-xl text-[16px] font-semibold text-slate-400">
              End-to-end sourcing, inspection, and logistics solutions tailored to global buyers.
            </p>
          </RevealText>
        </div>

        <RevealStagger staggerDelay={80} className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {businessSolutions.map((solution) => (
            <Link
              key={solution.slug}
              href={`/${solution.slug}`}
              className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-[#315671] bg-[#14314B] p-8 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-[#F97316] hover:shadow-[0_22px_50px_rgba(0,0,0,0.3)]"
            >
              <div>
                <div className="inline-flex items-center rounded-full border border-[#F97316]/40 bg-[#0B1F33] px-3.5 py-1 text-[12px] font-black text-[#FDBA74]">
                  {solution.eyebrow}
                </div>

                <h3 className="mt-6 text-[26px] font-black text-white transition-colors group-hover:text-[#FDBA74]">
                  {solution.title}
                </h3>

                <p className="mt-4 text-[15px] font-medium leading-relaxed text-slate-300">
                  {solution.body}
                </p>

                {solution.highlights && (
                  <div className="mt-6 space-y-2 pt-4 border-t border-[#24445F]/60">
                    {solution.highlights.slice(0, 3).map((h) => (
                      <div key={h} className="flex items-center gap-2 text-[13px] font-semibold text-slate-300">
                        <CheckCircle2 className="h-4 w-4 text-[#F97316] shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-[#24445F]/60 flex items-center justify-between">
                <span className="inline-flex items-center gap-2 text-[14px] font-black text-[#F97316] group-hover:text-[#FDBA74]">
                  Explore Category <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#F97316]/40 bg-[#F97316]/10 text-[#FDBA74]">
                  <Globe2 className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </RevealStagger>
      </section>
    </div>
  );
}
