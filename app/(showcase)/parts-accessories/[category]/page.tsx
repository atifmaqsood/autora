"use client";

import { use, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronRight } from "lucide-react";
import { PartsGallery } from "@/components/parts/parts-gallery";
import { BrochureViewer } from "@/components/parts/brochure-viewer";
import { PartsQuoteForm } from "@/components/parts/parts-quote-form";
import { getPartsCategoryBySlug, type PartsCategory } from "@/lib/parts/data";

export default function CategoryProductPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = use(params);
  const category = getPartsCategoryBySlug(slug);
  if (!category) notFound();
  return <CategoryDetail key={category.slug} category={category} />;
}

function CategoryDetail({ category }: { category: PartsCategory }) {
  const [activeTab, setActiveTab] = useState<"features" | "description">("features");
  const Icon = category.icon;
  const images = category.gallery?.length ? category.gallery : [category.image];

  function handleTabKey(event: KeyboardEvent<HTMLButtonElement>) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === "Home" ? "features" : event.key === "End" ? "description" : activeTab === "features" ? "description" : "features";
    setActiveTab(next);
    document.getElementById(`tab-${next}`)?.focus();
  }

  return (
    <div className="min-h-screen bg-[#060709] pb-24 pt-[144px] text-white lg:pt-[158px]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-xs text-slate-400">
          <Link href="/" className="hover:text-white">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/parts-accessories" className="hover:text-white">Parts & Accessories</Link>
          <ChevronRight className="h-3 w-3" />
          <span aria-current="page" className="text-white">{category.title}</span>
        </nav>

        <PartsGallery images={images} title={category.title} />

        <div className="mt-10 sm:mt-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--agtp-secondary)]">Parts & Accessories</p>
          <h1 className="mt-3 max-w-5xl text-3xl font-black uppercase leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl">{category.title}</h1>
          <div className="mt-7 flex flex-wrap items-center gap-5">
            <span className="text-xl font-bold">On Request</span>
            <a href="#request-quote" onClick={() => document.getElementById("request-quote")?.focus({ preventScroll: true })} className="inline-flex items-center gap-3 rounded-full bg-[var(--agtp-secondary)] px-6 py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90">
              Request a Quote <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <section aria-label="Category details" className="mt-10 rounded-3xl border border-white/10 bg-[var(--agtp-primary)] p-5 shadow-2xl sm:mt-12 sm:p-8 lg:p-10">
          <div role="tablist" aria-label="Product information" className="flex flex-wrap gap-3 border-b border-white/15 pb-5">
            {(["features", "description"] as const).map((tab) => (
              <button key={tab} type="button" role="tab" id={`tab-${tab}`} aria-selected={activeTab === tab} aria-controls={`panel-${tab}`} tabIndex={activeTab === tab ? 0 : -1} onClick={() => setActiveTab(tab)} onKeyDown={handleTabKey} className={`rounded-full border border-[var(--agtp-secondary)] px-6 py-3 text-sm font-bold capitalize text-white transition-all ${activeTab === tab ? "bg-[var(--agtp-secondary)] shadow-lg shadow-black/20" : "bg-[color-mix(in_srgb,var(--agtp-secondary)_28%,transparent)] hover:bg-[var(--agtp-secondary)]"}`}>
                {tab}
              </button>
            ))}
          </div>
          <div role="tabpanel" id="panel-features" aria-labelledby="tab-features" hidden={activeTab !== "features"} tabIndex={0} className="border-b border-white/15 py-7">
            <ul className="grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
              {category.products.map((product) => (
                <li key={product} className="flex items-start gap-3 text-sm text-slate-300">
                  <Icon aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[var(--agtp-secondary)]" />
                  <span>{product}</span>
                </li>
              ))}
            </ul>
          </div>
          <div role="tabpanel" id="panel-description" aria-labelledby="tab-description" hidden={activeTab !== "description"} tabIndex={0} className="space-y-4 border-b border-white/15 py-7 text-sm leading-7 text-slate-300">
            <p>{category.subtitle}.</p>
            <p>AGTP Group supplies {category.title.toLowerCase()} from the UAE for customers worldwide. Send us your part numbers, vehicle details, and quantities so our team can confirm compatibility, availability, pricing, and shipping options for your destination.</p>
          </div>
        </section>
        <div className="pt-8">
          <BrochureViewer url={category.brochureUrl ?? `/api/parts/${category.slug}/brochure`} title={category.title} />
        </div>
        <div className="pt-8">
          <PartsQuoteForm category={category.title} slug={category.slug} />
        </div>
      </div>
    </div>
  );
}
