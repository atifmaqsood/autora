"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { VehicleInquiryModal } from "@/components/vehicles/vehicle-inquiry-modal";
import { Reveal } from "@/components/ui/scroll-reveal";
import {
  getAllPartsCategories,
  getPartsCategoryBySlug
} from "@/lib/parts/data";

interface CategoryProductPageProps {
  params: Promise<{
    category: string;
  }>;
}

export default function CategoryProductPage({ params }: CategoryProductPageProps) {
  const { category: categorySlug } = use(params);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);

  const category = getPartsCategoryBySlug(categorySlug);
  const allCategories = getAllPartsCategories();

  if (!category) {
    notFound();
  }

  const col1 = category.products.slice(0, 5);
  const col2 = category.products.slice(5, 10);
  const col3 = category.products.slice(10, 15);

  return (
    <div className="bg-[#060709] pb-24 text-white">
      {/* ── 1. Category Hero Banner ── */}
      <PageHero
        breadcrumbs={[
          { label: "HOME", href: "/" },
          { label: "PARTS & ACCESSORIES", href: "/parts-accessories" },
          { label: category.title.toUpperCase() }
        ]}
        badge={{
          text: "PARTS & ACCESSORIES",
          dotColor: "bg-emerald-400"
        }}
        title={category.title.toUpperCase()}
        subtitle={category.subtitle}
        imageSrc={category.image}
        imageAlt={`AGTP Group - ${category.title}`}
      >
        <button
          onClick={() => setInquiryModalOpen(true)}
          className="inline-flex items-center gap-3 rounded-full bg-[#F97316] px-8 py-4 text-sm font-extrabold text-white shadow-lg shadow-[#F97316]/30 transition-all duration-200 hover:bg-[#EA580C] hover:scale-105"
        >
          <span>REQUEST A QUOTE</span>
          <ArrowRight className="h-4 w-4" />
        </button>
        <a
          href="https://wa.me/971585855729"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-3 sm:ml-4 inline-flex items-center gap-2 rounded-full border border-[#25D366] bg-[#25D366]/10 px-6 sm:px-8 py-4 text-sm font-bold text-white transition-all hover:bg-[#25D366]/20 hover:border-[#25D366]"
        >
          <WhatsAppIcon className="h-4 w-4 shrink-0" />
          <span>CHAT ON WHATSAPP</span>
        </a>
      </PageHero>

      {/* ── 2. Category Switcher Tabs ── */}
      <section className="mx-auto max-w-[1570px] px-4 sm:px-6 lg:px-8 pt-10">
        <Reveal>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {allCategories.map((cat) => {
              const isCurrent = cat.slug === category.slug;
              const IconComponent = cat.icon;
              return (
                <Link
                  key={cat.slug}
                  href={`/parts-accessories/${cat.slug}`}
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 border ${
                    isCurrent
                      ? "border-[#F97316] bg-[#F97316] text-white shadow-lg shadow-[#F97316]/25"
                      : "border-[#315671] bg-[#102941] text-slate-300 hover:border-[#F97316]/60 hover:text-white hover:bg-[#14314B]"
                  }`}
                >
                  <IconComponent className="h-4 w-4 shrink-0" />
                  <span>{cat.title}</span>
                </Link>
              );
            })}
          </div>
        </Reveal>
      </section>

      {/* ── 3. Product Names List Directory (Balanced 3 Columns: 5 + 5 + 5) ── */}
      <section className="mx-auto max-w-[1570px] px-4 sm:px-6 lg:px-8 pt-8">
        <Reveal>
          <div className="rounded-[28px] border border-[#315671] bg-[#102941] p-6 sm:p-8 lg:p-10 shadow-2xl">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10 pb-5 mb-6">
              <div>
                <span className="text-[11px] font-black uppercase tracking-[0.25em] text-[#FDBA74]">
                  CATEGORY PRODUCTS
                </span>
                <h2 className="text-[24px] sm:text-[30px] font-black text-white tracking-tight mt-1">
                  {category.title}
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded-full border border-white/15 bg-black/30 px-3.5 py-1.5 text-xs font-bold text-slate-200">
                  15 Products
                </span>
                <button
                  onClick={() => setInquiryModalOpen(true)}
                  className="rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white px-5 py-2 text-xs font-black shadow-lg shadow-[#F97316]/25 transition-all"
                >
                  Request Quote
                </button>
              </div>
            </div>

            {/* 3 Columns (5 items each, sequential down columns, no zig-zag) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-5">
              {/* Column 1: Items 1 to 5 */}
              <div className="space-y-3">
                {col1.map((name, idx) => {
                  const num = idx + 1;
                  return (
                    <div
                      key={num}
                      className="group flex items-center gap-3.5 rounded-xl border border-white/10 bg-black/25 px-4 py-3.5 hover:border-[#F97316]/70 hover:bg-black/40 hover:-translate-y-0.5 transition-all duration-200"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-[12px] font-black text-[#FDBA74] group-hover:border-[#F97316]/50 transition-colors">
                        {String(num).padStart(2, "0")}
                      </span>
                      <span className="text-[15px] sm:text-[16px] font-bold text-white tracking-wide group-hover:text-[#FDBA74] transition-colors truncate">
                        {name}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Column 2: Items 6 to 10 */}
              <div className="space-y-3">
                {col2.map((name, idx) => {
                  const num = idx + 6;
                  return (
                    <div
                      key={num}
                      className="group flex items-center gap-3.5 rounded-xl border border-white/10 bg-black/25 px-4 py-3.5 hover:border-[#F97316]/70 hover:bg-black/40 hover:-translate-y-0.5 transition-all duration-200"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-[12px] font-black text-[#FDBA74] group-hover:border-[#F97316]/50 transition-colors">
                        {String(num).padStart(2, "0")}
                      </span>
                      <span className="text-[15px] sm:text-[16px] font-bold text-white tracking-wide group-hover:text-[#FDBA74] transition-colors truncate">
                        {name}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Column 3: Items 11 to 15 */}
              <div className="space-y-3">
                {col3.map((name, idx) => {
                  const num = idx + 11;
                  return (
                    <div
                      key={num}
                      className="group flex items-center gap-3.5 rounded-xl border border-white/10 bg-black/25 px-4 py-3.5 hover:border-[#F97316]/70 hover:bg-black/40 hover:-translate-y-0.5 transition-all duration-200"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-[12px] font-black text-[#FDBA74] group-hover:border-[#F97316]/50 transition-colors">
                        {String(num).padStart(2, "0")}
                      </span>
                      <span className="text-[15px] sm:text-[16px] font-bold text-white tracking-wide group-hover:text-[#FDBA74] transition-colors truncate">
                        {name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── 4. Callout / Request Quote Banner ── */}
      <section className="mx-auto max-w-[1570px] px-4 sm:px-6 lg:px-8 pt-12">
        <Reveal>
          <div className="relative overflow-hidden rounded-[24px] border border-[#315671] bg-gradient-to-r from-[#102941] via-[#0B1F33] to-[#102941] p-8 sm:p-10 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center sm:text-left">
                <h3 className="text-[22px] sm:text-[26px] font-black text-white tracking-tight">
                  Request a Quote for {category.title}
                </h3>
                <p className="text-[14px] text-slate-300">
                  Contact our export team with your required parts list for pricing and availability.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => setInquiryModalOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full bg-[#F97316] px-7 py-3.5 text-sm font-black text-white shadow-xl shadow-[#F97316]/30 hover:bg-[#EA580C] transition-all"
                >
                  <span>REQUEST QUOTE</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <a
                  href={`https://wa.me/971585855729?text=${encodeURIComponent(
                    `Hello AGTP Group, I would like to inquire about ${category.title}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[#25D366] bg-[#25D366]/10 px-5 py-3.5 text-sm font-bold text-white hover:bg-[#25D366]/20 transition-all"
                >
                  <WhatsAppIcon className="h-4 w-4 shrink-0" />
                  <span>WHATSAPP</span>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Inquiry Modal */}
      <VehicleInquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        vehicleTitle={`${category.title} Parts Request`}
        vehicleId={`parts-${category.slug}`}
      />
    </div>
  );
}
