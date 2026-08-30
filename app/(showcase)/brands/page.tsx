"use client";

import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal, RevealEyebrow, RevealHeading, RevealStagger, RevealText } from "@/components/ui/scroll-reveal";
import { agtpBrandGroups, agtpProductGroups } from "@/lib/agtp/content";
import { agtpAssets } from "@/src/assets";

export default function BrandsPage() {
  return (
    <div className="bg-[#060709] pb-20 text-white">
      {/* ── 1. Hero Header Banner matching new design ── */}
      <PageHero
        breadcrumbs={[
          { label: "HOME", href: "/" },
          { label: "BRANDS" }
        ]}
        badge={{
          text: "OFFICIAL OEM & AFTERMARKET BRANDS"
        }}
        title="GLOBAL AUTOMOTIVE BRANDS"
        subtitle="AGTP Group wholesale sourcing in Dubai and the UAE for Japanese, European, American, and Korean vehicles and auto spare parts."
        imageSrc={agtpAssets.inventoryHero}
        imageAlt="Global Automotive Brands"
      />

      {/* ── 2. Brand Groups Grid ── */}
      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
        <RevealStagger staggerDelay={70} className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {agtpBrandGroups.map((group) => (
            <div key={group.title} className="rounded-3xl border border-[#315671] bg-[#102941] p-7 shadow-xl">
              <h2 className="text-2xl font-black text-white">{group.title}</h2>
              <div className="mt-6 flex flex-wrap gap-3">
                {group.brands.map((brand) => (
                  <span key={brand} className="rounded-full border border-[#315671] bg-[#14314B] px-4 py-2 text-sm font-bold text-slate-300">
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </RevealStagger>
      </section>

      {/* ── 3. Popular Products List ── */}
      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl space-y-4">
          <RevealEyebrow>
            <div className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.28em] text-[#FDBA74]">
              <span className="h-px w-9 bg-[#F97316]" />
              Popular Products
            </div>
          </RevealEyebrow>
          <RevealHeading>
            <h2 className="text-4xl font-black leading-tight sm:text-6xl">Spare Parts Categories</h2>
          </RevealHeading>
          <RevealText>
            <p className="text-sm font-semibold leading-relaxed text-slate-400 sm:text-base">
              AGTP GROUP supplies engine parts, filters, electrical components, brakes, suspension, bearings, body parts, tools, lubricants, batteries, tires, and more.
            </p>
          </RevealText>
        </div>

        <RevealStagger staggerDelay={35} className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {agtpProductGroups.map((product) => (
            <div key={product} className="flex items-center gap-3 rounded-2xl border border-[#315671] bg-[#102941] p-4 text-sm font-bold text-slate-200">
              <BadgeCheck className="h-4 w-4 shrink-0 text-[#FDBA74]" />
              {product}
            </div>
          ))}
        </RevealStagger>

        <div className="mt-12">
          <Link href="/contact-us" className="inline-flex items-center gap-3 rounded-full bg-[#F97316] px-8 py-4 text-sm font-black text-white hover:bg-[#EA580C] transition-colors">
            Contact Us <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
