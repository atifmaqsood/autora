"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  PackageCheck,
  Search,
  Settings,
  ShieldCheck,
  Truck
} from "lucide-react";
import { VehicleInquiryModal } from "@/components/vehicles/vehicle-inquiry-modal";
import { Reveal, RevealButton, RevealEyebrow, RevealHeading, RevealStagger, RevealText } from "@/components/ui/scroll-reveal";
import { useContent } from "@/lib/content/context";
import { agtpAssets } from "@/src/assets";

const categoryIcons = [PackageCheck, Settings, ShieldCheck, Truck];

const processSteps = [
  {
    icon: Search,
    title: "Identify",
    body: "Send the VIN, part number, model year, or photos so the team can confirm exact compatibility."
  },
  {
    icon: ClipboardCheck,
    title: "Verify",
    body: "Availability, condition, brand grade, pricing, and lead time are checked before quotation."
  },
  {
    icon: PackageCheck,
    title: "Prepare",
    body: "Parts are documented, protected, labeled, and consolidated for clean international dispatch."
  },
  {
    icon: Truck,
    title: "Ship",
    body: "Export paperwork and shipping options are coordinated through AGTP GROUP's logistics network."
  }
];

export default function SparePartsPage() {
  const { content } = useContent();
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const page = content.sparePartsPage;

  return (
    <div className="bg-[#0B1F33] pb-20 text-white">
      <section className="relative flex min-h-[88vh] flex-col justify-center overflow-hidden border-b border-slate-800/80 bg-[#081A2B] px-4 pb-16 pt-32 sm:px-6 lg:px-8 lg:pt-40">
        <Image
          src={agtpAssets.sparePartsHero}
          alt="AGTP GROUP spare parts sourcing"
          fill
          priority
          className="object-cover opacity-45"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#081A2B] via-[#081A2B]/75 to-[#081A2B]/20" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0B1F33] to-transparent" />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-end gap-10 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-8">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
              <Link href="/" className="transition-colors hover:text-white">HOME</Link>
              <span>/</span>
              <span className="text-[#F97316]">SPARE PARTS</span>
            </div>

            <RevealEyebrow>
              <div className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.32em] text-[#FDBA74]">
                <span className="h-px w-10 bg-[#F97316]" />
                {page.heroEyebrow}
              </div>
            </RevealEyebrow>

            <RevealHeading>
              <h1 className="max-w-5xl text-5xl font-black uppercase leading-[0.92] tracking-normal text-white sm:text-7xl lg:text-[96px]">
                {page.heroTitle}
              </h1>
            </RevealHeading>

            <RevealText>
              <p className="max-w-2xl text-base font-semibold leading-relaxed text-slate-300 sm:text-lg">
                {page.heroSubtitle}
              </p>
            </RevealText>

            <RevealButton>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => setInquiryModalOpen(true)}
                  className="inline-flex items-center gap-3 rounded-full bg-[#F97316] px-8 py-4 text-sm font-black text-white shadow-2xl shadow-[#F97316]/25 transition-all hover:bg-[#EA580C]"
                >
                  <span>{page.primaryCtaLabel}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <a
                  href="#parts-categories"
                  className="inline-flex items-center rounded-full border border-slate-700 px-8 py-4 text-sm font-black text-white transition-all hover:border-[#F97316] hover:bg-slate-900"
                >
                  {page.secondaryCtaLabel}
                </a>
              </div>
            </RevealButton>
          </div>

          <Reveal className="lg:col-span-4" delay={180}>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-md">
              <div className="grid grid-cols-2 gap-4">
                {[
                  ["OEM", "verified sourcing"],
                  ["24H", "quote review"],
                  ["VIN", "fitment checks"],
                  ["90+", "export markets"]
                ].map(([value, label]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-[#0B1F33]/70 p-5">
                    <div className="text-3xl font-black text-white">{value}</div>
                    <div className="mt-1 text-[11px] font-bold uppercase leading-snug tracking-wider text-slate-400">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="parts-categories" className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mb-14 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
          <div className="space-y-4 lg:col-span-7">
            <RevealEyebrow>
              <div className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.28em] text-[#FDBA74]">
                <span className="h-px w-8 bg-[#F97316]" />
                {page.categoriesEyebrow}
              </div>
            </RevealEyebrow>
            <RevealHeading>
              <h2 className="text-4xl font-black leading-tight text-white sm:text-6xl">
                {page.categoriesTitle}
              </h2>
            </RevealHeading>
          </div>
          <RevealText className="lg:col-span-5">
            <p className="text-sm font-semibold leading-relaxed text-slate-400 sm:text-base">
              {page.categoriesSubtitle}
            </p>
          </RevealText>
        </div>

        <RevealStagger staggerDelay={90} className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {page.categories.map((category, index) => {
            const Icon = categoryIcons[index % categoryIcons.length];
            return (
              <div key={category.id} className="group rounded-3xl border border-slate-800 bg-[#102941] p-7 shadow-xl transition-all duration-300 hover:border-[#F97316]">
                <div className="mb-8 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#F97316]/25 bg-[#F97316]/10 text-[#FDBA74]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-black tracking-[0.24em] text-slate-700 group-hover:text-[#F97316]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-white">{category.title}</h3>
                <p className="mt-4 text-sm font-semibold leading-relaxed text-slate-400">
                  {category.description}
                </p>
              </div>
            );
          })}
        </RevealStagger>
      </section>

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 pt-28 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="space-y-5 lg:col-span-5">
          <RevealEyebrow>
            <div className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.28em] text-[#FDBA74]">
              <span className="h-px w-8 bg-[#F97316]" />
              {page.processEyebrow}
            </div>
          </RevealEyebrow>
          <RevealHeading>
            <h2 className="text-4xl font-black leading-tight text-white sm:text-6xl">
              {page.processTitle}
            </h2>
          </RevealHeading>
          <RevealText>
            <p className="text-sm font-semibold leading-relaxed text-slate-400 sm:text-base">
              {page.processSubtitle}
            </p>
          </RevealText>
        </div>

        <RevealStagger staggerDelay={85} className="space-y-4 lg:col-span-7">
          {processSteps.map((step, index) => (
            <div key={step.title} className="grid grid-cols-[auto_1fr] gap-5 rounded-3xl border border-slate-800 bg-[#102941] p-5 shadow-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#0B1F33]">
                <step.icon className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-black uppercase tracking-[0.24em] text-[#F97316]">
                    Step {index + 1}
                  </span>
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                </div>
                <h3 className="mt-1 text-xl font-black text-white">{step.title}</h3>
                <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-400">{step.body}</p>
              </div>
            </div>
          ))}
        </RevealStagger>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-28 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-[#102941] p-8 shadow-2xl sm:p-12 lg:p-16">
            <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_top_right,rgba(83,109,254,0.28),transparent_48%)]" />
            <div className="relative z-10 max-w-3xl space-y-5">
              <div className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.28em] text-[#FDBA74]">
                <span className="h-px w-8 bg-[#F97316]" />
                {page.ctaEyebrow}
              </div>
              <h2 className="text-4xl font-black leading-tight text-white sm:text-6xl">
                {page.ctaTitle}
              </h2>
              <p className="text-sm font-semibold leading-relaxed text-slate-400 sm:text-base">
                {page.ctaSubtitle}
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <button
                  onClick={() => setInquiryModalOpen(true)}
                  className="inline-flex items-center gap-3 rounded-full bg-[#F97316] px-8 py-4 text-sm font-black text-white shadow-xl shadow-[#F97316]/25 transition-all hover:bg-[#EA580C]"
                >
                  <span>{page.ctaLabel}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-full border border-slate-700 px-8 py-4 text-sm font-black text-white transition-all hover:border-white hover:bg-slate-900"
                >
                  Contact Team
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <VehicleInquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        vehicleTitle="Spare Parts Request"
        vehicleId="spare-parts"
      />
    </div>
  );
}


