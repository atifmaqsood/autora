"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";
import { Reveal, RevealHeading, RevealStagger } from "@/components/ui/scroll-reveal";
import { getDubaiAutomotiveCategory } from "@/lib/dubai-automotive/data";

export default function DubaiAutomotiveCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = use(params);
  const category = getDubaiAutomotiveCategory(slug);
  if (!category) notFound();

  return (
    <div className="min-h-screen bg-[#060709] pb-24 pt-[144px] text-white lg:pt-[158px]">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-xs text-slate-400">
          <Link href="/" className="hover:text-white">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/dubai-automotive" className="hover:text-white">Dubai Automotive</Link>
          <ChevronRight className="h-3 w-3" />
          <span aria-current="page" className="text-white">{category.title}</span>
        </nav>

        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-[#315671] p-7 shadow-2xl sm:p-10" style={{ backgroundColor: "var(--agtp-primary)" }}>
            <Image src={category.image} alt="" fill priority className="object-cover opacity-20" sizes="(max-width: 1280px) 100vw, 1280px" />
            <div className="absolute inset-0" style={{ backgroundColor: "color-mix(in srgb, var(--agtp-primary) 65%, transparent)" }} />
            <div className="relative z-10 max-w-3xl">
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[var(--agtp-secondary)]">Dubai Automotive</p>
              <RevealHeading><h1 className="mt-3 text-3xl font-black uppercase tracking-tight sm:text-5xl">{category.title}</h1></RevealHeading>
            </div>
          </div>
        </Reveal>

        <section className="pt-12" aria-labelledby="products-heading">
          <div className="mb-7 flex items-end justify-between gap-4">
            <RevealHeading><h2 id="products-heading" className="text-2xl font-black uppercase tracking-tight sm:text-3xl">Available Products</h2></RevealHeading>
            <span className="text-sm font-semibold text-slate-400">{category.products.length} products</span>
          </div>
          <RevealStagger staggerDelay={75} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {category.products.map((product) => (
              <Link key={product.slug} href={`/dubai-automotive/${category.slug}/${product.slug}`} className="group flex h-full flex-col overflow-hidden rounded-[26px] border border-[#315671] shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-[var(--agtp-secondary)]" style={{ backgroundColor: "var(--agtp-primary)" }}>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={product.image} alt={product.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, color-mix(in srgb, var(--agtp-primary) 75%, transparent), transparent 65%)" }} />
                  <span className="absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white backdrop-blur-sm" style={{ backgroundColor: "color-mix(in srgb, var(--agtp-primary) 85%, transparent)" }}>New</span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="min-h-12 text-lg font-black uppercase leading-tight text-white">{product.title}</h3>
                  <div className="mt-auto border-t border-white/15 pt-5">
                    <span className="flex h-12 items-center justify-center gap-2 rounded-full text-sm font-black text-white transition-opacity group-hover:opacity-90" style={{ backgroundColor: "var(--agtp-secondary)" }}>View Details <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                  </div>
                </div>
              </Link>
            ))}
          </RevealStagger>
        </section>
      </main>
    </div>
  );
}
