"use client";

import { use, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";
import { PartsGallery } from "@/components/parts/parts-gallery";
import { PartsQuoteForm } from "@/components/parts/parts-quote-form";
import { dubaiAutomotiveFeatures, getDubaiAutomotiveProduct } from "@/lib/dubai-automotive/data";

export default function DubaiAutomotiveProductPage({ params }: { params: Promise<{ category: string; product: string }> }) {
  const { category: categorySlug, product: productSlug } = use(params);
  const result = getDubaiAutomotiveProduct(categorySlug, productSlug);
  const [activeTab, setActiveTab] = useState<"features" | "description">("features");
  if (!result) notFound();
  const { category, product } = result;
  const Icon = category.icon;

  function handleTabKey(event: KeyboardEvent<HTMLButtonElement>) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === "Home" ? "features" : event.key === "End" ? "description" : activeTab === "features" ? "description" : "features";
    setActiveTab(next);
    document.getElementById(`tab-${next}`)?.focus();
  }

  return (
    <div className="min-h-screen bg-[#060709] pb-24 pt-[144px] text-white lg:pt-[158px]">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-xs text-slate-400">
          <Link href="/" className="hover:text-white">Home</Link><ChevronRight className="h-3 w-3" />
          <Link href="/dubai-automotive" className="hover:text-white">Dubai Automotive</Link><ChevronRight className="h-3 w-3" />
          <Link href={`/dubai-automotive/${category.slug}`} className="hover:text-white">{category.title}</Link><ChevronRight className="h-3 w-3" />
          <span aria-current="page" className="text-white">{product.title}</span>
        </nav>

        <PartsGallery images={[...product.gallery]} title={product.title} />
        <div className="mt-10 sm:mt-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--agtp-secondary)]">Dubai Automotive</p>
          <h1 className="mt-3 max-w-5xl text-3xl font-black uppercase leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl">{product.title}</h1>
          <div className="mt-7 flex flex-wrap items-center gap-5">
            <span className="text-xl font-bold">On Request</span>
            <a href="#request-quote" onClick={() => document.getElementById("request-quote")?.focus({ preventScroll: true })} className="inline-flex items-center gap-3 rounded-full bg-[var(--agtp-secondary)] px-6 py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90">Request a Quote <ArrowRight className="h-4 w-4" /></a>
          </div>
        </div>

        <section aria-label="Product details" className="mt-10 rounded-3xl border border-white/10 bg-[var(--agtp-primary)] p-5 shadow-2xl sm:mt-12 sm:p-8 lg:p-10">
          <div role="tablist" aria-label="Product information" className="flex flex-wrap gap-3 border-b border-white/15 pb-5">
            {(["features", "description"] as const).map((tab) => (
              <button key={tab} type="button" role="tab" id={`tab-${tab}`} aria-selected={activeTab === tab} aria-controls={`panel-${tab}`} tabIndex={activeTab === tab ? 0 : -1} onClick={() => setActiveTab(tab)} onKeyDown={handleTabKey} className={`rounded-full border border-[var(--agtp-secondary)] px-6 py-3 text-sm font-bold capitalize text-white transition-all ${activeTab === tab ? "bg-[var(--agtp-secondary)] shadow-lg shadow-black/20" : "bg-[color-mix(in_srgb,var(--agtp-secondary)_28%,transparent)] hover:bg-[var(--agtp-secondary)]"}`}>
                {tab}
              </button>
            ))}
          </div>
          <div role="tabpanel" id="panel-features" aria-labelledby="tab-features" hidden={activeTab !== "features"} tabIndex={0} className="border-b border-white/15 py-7">
            <ul className="grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
              {dubaiAutomotiveFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm text-slate-300">
                  <Icon aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[var(--agtp-secondary)]" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div role="tabpanel" id="panel-description" aria-labelledby="tab-description" hidden={activeTab !== "description"} tabIndex={0} className="border-b border-white/15 py-7 text-sm leading-7 text-slate-300">
            <p>{category.subtitle}</p>
          </div>
        </section>

        <div className="pt-8"><PartsQuoteForm category={product.title} slug={`dubai-automotive-${category.slug}-${product.slug}`} /></div>
      </main>
    </div>
  );
}
