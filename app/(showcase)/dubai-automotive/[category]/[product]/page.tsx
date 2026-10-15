"use client";

import { use, useEffect, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight, Loader2, Package } from "lucide-react";
import { notFound } from "next/navigation";
import { PartsGallery } from "@/components/parts/parts-gallery";
import { PartsQuoteForm } from "@/components/parts/parts-quote-form";
import {
  Reveal,
  RevealButton,
  RevealEyebrow,
  RevealHeading,
  RevealStagger,
  RevealText,
} from "@/components/ui/scroll-reveal";
import {
  dubaiAutomotiveFeatures,
  getDubaiAutomotiveProduct,
} from "@/lib/dubai-automotive/data";
import type { CatalogCategory } from "@/lib/product-catalog/types";

export default function DubaiAutomotiveProductPage({
  params,
}: {
  params: Promise<{ category: string; product: string }>;
}) {
  const { category: categorySlug, product: productSlug } = use(params);
  const [activeTab, setActiveTab] = useState<"features" | "description">(
    "features",
  );
  const [managed, setManaged] = useState<CatalogCategory | null>(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    void fetch("/api/product-catalog/dubai", { cache: "no-store" })
      .then(async (response) =>
        response.ok ? ((await response.json()) as CatalogCategory[]) : [],
      )
      .then((items) =>
        setManaged(items.find((item) => item.slug === categorySlug) ?? null),
      )
      .finally(() => setLoaded(true));
  }, [categorySlug]);
  const managedProduct = managed?.products.find(
    (item) => item.slug === productSlug,
  );
  const result =
    managed && managedProduct
      ? {
          category: { ...managed, image: managed.imageUrl, icon: Package },
          product: {
            ...managedProduct,
            image: managedProduct.images[0] ?? managed.imageUrl,
            gallery: managedProduct.images,
          },
        }
      : getDubaiAutomotiveProduct(categorySlug, productSlug);
  if (!result && !loaded)
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#060709] text-white">
        <Loader2 className="h-7 w-7 animate-spin" />
      </div>
    );
  if (!result) notFound();
  const { category, product } = result;
  const Icon = category.icon;
  const features =
    "features" in product ? product.features : dubaiAutomotiveFeatures;
  const description =
    "description" in product && product.description
      ? product.description
      : category.subtitle;

  function handleTabKey(event: KeyboardEvent<HTMLButtonElement>) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next =
      event.key === "Home"
        ? "features"
        : event.key === "End"
          ? "description"
          : activeTab === "features"
            ? "description"
            : "features";
    setActiveTab(next);
    document.getElementById(`tab-${next}`)?.focus();
  }

  return (
    <div className="min-h-screen bg-[#060709] pb-24 pt-[144px] text-white lg:pt-[158px]">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex flex-wrap items-center gap-2 text-xs text-slate-400"
        >
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/dubai-automotive" className="hover:text-white">
            Dubai Automotive
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link
            href={`/dubai-automotive/${category.slug}`}
            className="hover:text-white"
          >
            {category.title}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span aria-current="page" className="text-white">
            {product.title}
          </span>
        </nav>

        <Reveal>
          <PartsGallery images={[...product.gallery]} title={product.title} />
        </Reveal>
        <div className="mt-10 sm:mt-12">
          <RevealEyebrow>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--agtp-secondary)]">
              Dubai Automotive
            </p>
          </RevealEyebrow>
          <RevealHeading>
            <h1 className="mt-3 max-w-5xl text-3xl font-black uppercase leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl">
              {product.title}
            </h1>
          </RevealHeading>
          <RevealButton>
            <div className="mt-7 flex flex-wrap items-center gap-5">
              <span className="text-xl font-bold">On Request</span>
              <a
                href="#request-quote"
                onClick={() =>
                  document
                    .getElementById("request-quote")
                    ?.focus({ preventScroll: true })
                }
                className="inline-flex items-center gap-3 rounded-full bg-[var(--agtp-secondary)] px-6 py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
              >
                Request a Quote <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </RevealButton>
        </div>

        <Reveal>
          <section
            aria-label="Product details"
            className="mt-10 rounded-3xl border border-white/10 bg-[var(--agtp-primary)] p-5 shadow-2xl sm:mt-12 sm:p-8 lg:p-10"
          >
            <RevealButton>
              <div
                role="tablist"
                aria-label="Product information"
                className="flex flex-wrap gap-3 border-b border-white/15 pb-5"
              >
                {(["features", "description"] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    role="tab"
                    id={`tab-${tab}`}
                    aria-selected={activeTab === tab}
                    aria-controls={`panel-${tab}`}
                    tabIndex={activeTab === tab ? 0 : -1}
                    onClick={() => setActiveTab(tab)}
                    onKeyDown={handleTabKey}
                    className={`rounded-full border border-[var(--agtp-secondary)] px-6 py-3 text-sm font-bold capitalize text-white transition-all ${activeTab === tab ? "bg-[var(--agtp-secondary)] shadow-lg shadow-black/20" : "bg-[color-mix(in_srgb,var(--agtp-secondary)_28%,transparent)] hover:bg-[var(--agtp-secondary)]"}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </RevealButton>
            <div
              role="tabpanel"
              id="panel-features"
              aria-labelledby="tab-features"
              hidden={activeTab !== "features"}
              tabIndex={0}
              className="border-b border-white/15 py-7"
            >
              <RevealStagger
                staggerDelay={80}
                role="list"
                className="grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-3"
              >
                {features.map((feature) => (
                  <div
                    role="listitem"
                    key={feature}
                    className="flex items-start gap-3 text-sm text-slate-300"
                  >
                    <Icon
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-4 shrink-0 text-[var(--agtp-secondary)]"
                    />
                    <span>{feature}</span>
                  </div>
                ))}
              </RevealStagger>
            </div>
            <div
              role="tabpanel"
              id="panel-description"
              aria-labelledby="tab-description"
              hidden={activeTab !== "description"}
              tabIndex={0}
              className="border-b border-white/15 py-7 text-sm leading-7 text-slate-300"
            >
              <RevealText>
                <p>{description}</p>
              </RevealText>
            </div>
          </section>
        </Reveal>

        <Reveal className="pt-8">
          <PartsQuoteForm
            category={product.title}
            slug={`dubai-automotive-${category.slug}-${product.slug}`}
          />
        </Reveal>
      </main>
    </div>
  );
}
