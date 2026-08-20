"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Camera, Check, CheckCircle2, ChevronLeft, ChevronRight, Copy, FileCheck, Headphones, Package, Search, ShieldCheck, Ship } from "lucide-react";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { agtpAssets } from "@/src/assets";
import {
  Reveal,
  RevealButton,
  RevealEyebrow,
  RevealHeading,
  RevealStagger,
  RevealText
} from "@/components/ui/scroll-reveal";

const steps = [
  {
    number: "01",
    title: "Tell Us What You Need",
    description: "Share the products, quantity, and destination you need.",
    icon: Search
  },
  {
    number: "02",
    title: "Product Sourcing",
    description: "We source your product that matches your requirements.",
    icon: Package
  },
  {
    number: "03",
    title: "Receive Your Quote",
    description: "Get a clear quotation with pricing and delivery details.",
    icon: FileCheck
  },
  {
    number: "04",
    title: "Confirm Your Order",
    description: "Approve the quotation and confirm your purchase.",
    icon: CheckCircle2
  },
  {
    number: "05",
    title: "Quality Inspection",
    description: "Products are inspected before shipment for quality.",
    icon: ShieldCheck
  },
  {
    number: "06",
    title: "Pre-Shipment Approval",
    description: "Receive photos and videos before approving your shipment.",
    icon: Camera
  },
  {
    number: "07",
    title: "Export Documentation",
    description: "We prepare all required export and shipping documents.",
    icon: FileCheck
  },
  {
    number: "08",
    title: "Shipping",
    description: "Your order is shipped and delivered to your destination safely.",
    icon: Ship
  },
  {
    number: "09",
    title: "After-Sales Support",
    description: "Our team remains available to assist you whenever needed.",
    icon: Headphones
  }
];

const bankAccounts = [
  {
    currency: "Dirham Account (AED)",
    code: "AED",
    accountNumber: "1015949398001",
    iban: "AE110260001015949398001"
  },
  {
    currency: "Pound Account (GBP)",
    code: "GBP",
    accountNumber: "1025949398003",
    iban: "AE890260001025949398003"
  },
  {
    currency: "Dollar Account (USD)",
    code: "USD",
    accountNumber: "1025949398004",
    iban: "AE620260001025949398004"
  },
  {
    currency: "Euro Account (EUR)",
    code: "EUR",
    accountNumber: "1025949398002",
    iban: "AE190260001025949398002"
  }
];

export default function HowItWorksPage() {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"slider" | "grid">("slider");
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Slider Autoplay
  useEffect(() => {
    if (!isAutoPlaying || viewMode !== "slider") return;
    const timer = setInterval(() => {
      setCurrentStepIndex((prev) => (prev + 1) % steps.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isAutoPlaying, viewMode]);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const nextStep = () => {
    setIsAutoPlaying(false);
    setCurrentStepIndex((prev) => (prev + 1) % steps.length);
  };

  const prevStep = () => {
    setIsAutoPlaying(false);
    setCurrentStepIndex((prev) => (prev - 1 + steps.length) % steps.length);
  };

  return (
    <div className="bg-[#0B1F33] pb-24 text-white">
      {/* ── 1. Hero Header Banner with Background Image & Parallax ── */}
      <section className="relative min-h-[440px] bg-[#081A2B] border-b border-slate-800/80 overflow-hidden flex flex-col justify-center pt-40 pb-16">
        <ParallaxImage
          src={agtpAssets.exportPort}
          alt="How It Works Header"
          overlayOpacity="opacity-55"
          speed={0.25}
          className="absolute inset-0 w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#081A2B]/95 via-[#081A2B]/75 to-transparent z-10" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <RevealEyebrow>
            <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest text-slate-400 uppercase">
              <Link href="/" className="hover:text-white transition-colors">HOME</Link>
              <span>/</span>
              <span className="text-[#F97316]">HOW IT WORKS</span>
            </div>
          </RevealEyebrow>

          <RevealEyebrow delay={100}>
            <div className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.28em] text-[#FDBA74]">
              <span className="h-px w-9 bg-[#F97316]" />
              YOUR SOURCING JOURNEY
            </div>
          </RevealEyebrow>

          <RevealHeading delay={150}>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white font-sans max-w-4xl leading-none drop-shadow-lg">
              YOUR SOURCING JOURNEY
            </h1>
          </RevealHeading>

          <RevealText delay={200}>
            <p className="text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed drop-shadow-md">
              A Transparent Process Designed for Global Buyers
            </p>
          </RevealText>
        </div>
      </section>

      {/* ── 2. 9 Steps Process Section (Interactive Slider / Grid) ── */}
      <section className="mx-auto max-w-[1570px] px-6 pt-20">
        <Reveal>
          <div className="rounded-[28px] border border-[#315671] bg-[#102941] p-8 md:p-14 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 border-b border-[#24445F] pb-6">
              <div>
                <span className="text-[12px] font-black uppercase tracking-[0.35em] text-[#FDBA74]">STEP-BY-STEP PROCESS</span>
                <h2 className="text-[32px] font-black text-white md:text-[46px]">9 Steps to Import Worldwide</h2>
              </div>

              {/* View Switcher & Slider Controls */}
              <div className="flex items-center gap-3">
                <div className="flex rounded-full border border-[#315671] bg-[#0B1F33] p-1">
                  <button
                    onClick={() => setViewMode("slider")}
                    className={`rounded-full px-4 py-1.5 text-[12px] font-bold transition-all ${
                      viewMode === "slider"
                        ? "bg-[#F97316] text-white shadow-md"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Slider
                  </button>
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`rounded-full px-4 py-1.5 text-[12px] font-bold transition-all ${
                      viewMode === "grid"
                        ? "bg-[#F97316] text-white shadow-md"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Grid View
                  </button>
                </div>

                {viewMode === "slider" && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={prevStep}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-[#315671] bg-[#14314B] text-slate-300 hover:border-[#F97316] hover:text-white transition-colors"
                      aria-label="Previous step"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextStep}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-[#315671] bg-[#14314B] text-slate-300 hover:border-[#F97316] hover:text-white transition-colors"
                      aria-label="Next step"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {viewMode === "slider" ? (
              <div className="space-y-8">
                {/* Active Spotlight Step Card */}
                <div className="relative overflow-hidden rounded-[24px] border border-[#F97316] bg-gradient-to-b from-[#14314B] via-[#102941] to-[#0B1F33] p-8 md:p-12 shadow-2xl transition-all duration-700">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F97316] via-[#FDBA74] to-[#F97316]" />

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#F97316] bg-[#0B1F33] text-[20px] font-black text-[#FDBA74] shadow-[0_0_20px_rgba(249,115,22,0.35)]">
                          {steps[currentStepIndex].number}
                        </span>
                        <span className="rounded-full border border-[#F97316]/40 bg-[#0B1F33] px-4 py-1 text-[12px] font-black text-[#FDBA74]">
                          STEP {currentStepIndex + 1} OF 9
                        </span>
                      </div>

                      <h3 className="text-[28px] font-black text-white md:text-[38px]">
                        {steps[currentStepIndex].title}
                      </h3>
                      <p className="max-w-2xl text-[16px] font-medium leading-relaxed text-slate-200 md:text-[18px]">
                        {steps[currentStepIndex].description}
                      </p>
                    </div>

                    <div className="hidden md:flex h-28 w-28 shrink-0 items-center justify-center rounded-3xl border border-[#F97316]/40 bg-[#0B1F33] text-[#FDBA74] shadow-xl">
                      {(() => {
                        const Icon = steps[currentStepIndex].icon;
                        return <Icon className="h-12 w-12 text-[#F97316]" />;
                      })()}
                    </div>
                  </div>
                </div>

                {/* Step Selector Pills */}
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-9">
                  {steps.map((step, idx) => (
                    <button
                      key={step.number}
                      onClick={() => {
                        setIsAutoPlaying(false);
                        setCurrentStepIndex(idx);
                      }}
                      className={`flex flex-col items-center justify-center rounded-xl border p-3 text-center transition-all ${
                        currentStepIndex === idx
                          ? "border-[#F97316] bg-[#14314B] text-white shadow-lg"
                          : "border-[#315671]/60 bg-[#0B1F33]/80 text-slate-400 hover:border-slate-600 hover:text-white"
                      }`}
                    >
                      <span className={`flex h-7 w-7 items-center justify-center rounded-full text-[12px] font-black mb-1 ${
                        currentStepIndex === idx ? "bg-[#F97316] text-white" : "bg-[#102941] border border-[#315671]"
                      }`}>
                        {step.number}
                      </span>
                      <span className="truncate text-[11px] font-bold max-w-full">{step.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Grid View Mode */
              <RevealStagger staggerDelay={70} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
                {steps.map((step) => {
                  const Icon = step.icon;
                  return (
                    <div
                      key={step.number}
                      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[24px] border border-[#315671] bg-gradient-to-b from-[#14314B] to-[#102941] p-8 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-[#F97316] hover:shadow-orange-500/10"
                    >
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F97316] via-[#FDBA74] to-[#F97316] opacity-0 group-hover:opacity-100 transition-opacity" />

                      <div>
                        <div className="flex items-center justify-between">
                          <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#F97316] bg-[#0B1F33] text-[16px] font-black text-[#FDBA74] shadow-[0_0_15px_rgba(249,115,22,0.3)]">
                            {step.number}
                          </span>
                          <Icon className="h-6 w-6 text-[#F97316]/60 group-hover:text-[#F97316] transition-colors" />
                        </div>

                        <h3 className="mt-6 text-[24px] font-black text-white group-hover:text-[#FDBA74] transition-colors">
                          {step.title}
                        </h3>
                        <p className="mt-3 text-[15px] font-medium leading-relaxed text-slate-300">
                          {step.description}
                        </p>
                      </div>

                      <div className="mt-8 pt-6 border-t border-[#24445F]/60 flex items-center gap-2 text-[13px] font-extrabold text-[#F97316] group-hover:text-[#FDBA74]">
                        <span>Step Details</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  );
                })}
              </RevealStagger>
            )}
          </div>
        </Reveal>
      </section>

      {/* ── 3. PAYMENT CURRENCIES Section ── */}
      <section className="mx-auto max-w-[1570px] px-6 pt-24">
        <Reveal>
          <div className="rounded-[28px] border border-[#315671] bg-[#102941] p-8 md:p-14 shadow-2xl space-y-12">
            <div className="text-center space-y-3">
              <RevealEyebrow>
                <div className="inline-flex items-center gap-3 text-[12px] font-black uppercase tracking-[0.35em] text-[#FDBA74]">
                  <span className="h-px w-8 bg-[#F97316]" />
                  PAYMENT CURRENCIES
                  <span className="h-px w-8 bg-[#F97316]" />
                </div>
              </RevealEyebrow>
              <RevealHeading>
                <h2 className="text-[32px] font-black text-white md:text-[46px]">
                  Accepted Currencies for International Payments
                </h2>
              </RevealHeading>
              <RevealText>
                <p className="mx-auto max-w-xl text-[16px] font-semibold text-slate-400">
                  Official Emirates NBD wire transfer details for international buyers.
                </p>
              </RevealText>
            </div>

            {/* Main Bank Details Bar */}
            <div className="rounded-2xl border border-[#315671] bg-[#14314B] p-6 md:p-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5 text-[14px] font-medium text-slate-300">
              <div>
                <span className="block text-[11px] font-black uppercase tracking-wider text-slate-400">Account Name</span>
                <span className="mt-1 block text-[16px] font-black text-white">Agtp Group L L C Fz</span>
              </div>
              <div>
                <span className="block text-[11px] font-black uppercase tracking-wider text-slate-400">Bank Name</span>
                <span className="mt-1 block text-[16px] font-black text-white">Emirates NBD</span>
              </div>
              <div>
                <span className="block text-[11px] font-black uppercase tracking-wider text-slate-400">Branch Name</span>
                <span className="mt-1 block text-[16px] font-black text-white">DUBAI COURTS</span>
              </div>
              <div>
                <span className="block text-[11px] font-black uppercase tracking-wider text-slate-400">BIC Code / SWIFT</span>
                <span className="mt-1 block text-[16px] font-black text-[#FDBA74]">EBILAEADXXX</span>
              </div>
              <div>
                <span className="block text-[11px] font-black uppercase tracking-wider text-slate-400">Bank Website</span>
                <a href="https://www.emiratesnbd.com" target="_blank" rel="noopener noreferrer" className="mt-1 block text-[16px] font-black text-[#FDBA74] hover:underline">
                  www.emiratesnbd.com
                </a>
              </div>
            </div>

            {/* Currency Accounts Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {bankAccounts.map((acc) => (
                <div key={acc.code} className="group relative overflow-hidden rounded-[20px] border border-[#315671] bg-gradient-to-b from-[#14314B] to-[#102941] p-6 shadow-lg hover:border-[#F97316] transition-all duration-300 space-y-4">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F97316] to-[#FDBA74] opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="flex items-center justify-between border-b border-[#24445F] pb-3">
                    <h4 className="text-[17px] font-black text-white">{acc.currency}</h4>
                    <span className="rounded-full border border-[#F97316]/50 bg-[#0B1F33] px-3 py-0.5 text-[12px] font-black text-[#FDBA74]">
                      {acc.code}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="rounded-xl bg-[#0B1F33] p-3.5 border border-[#315671]/70 flex items-center justify-between">
                      <div>
                        <span className="block text-[10px] font-black uppercase text-slate-400">Account Number</span>
                        <span className="text-[15px] font-black text-white">{acc.accountNumber}</span>
                      </div>
                      <button
                        onClick={() => handleCopy(acc.accountNumber, `how-${acc.code}-acc`)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#315671] bg-[#14314B] text-slate-300 hover:text-white hover:border-[#F97316]"
                        title="Copy Account Number"
                      >
                        {copiedField === `how-${acc.code}-acc` ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </div>

                    <div className="rounded-xl bg-[#0B1F33] p-3.5 border border-[#315671]/70 flex items-center justify-between">
                      <div className="min-w-0 pr-2">
                        <span className="block text-[10px] font-black uppercase text-slate-400">IBAN</span>
                        <span className="truncate text-[13px] font-black text-[#FDBA74] block">{acc.iban}</span>
                      </div>
                      <button
                        onClick={() => handleCopy(acc.iban, `how-${acc.code}-iban`)}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#315671] bg-[#14314B] text-slate-300 hover:text-white hover:border-[#F97316]"
                        title="Copy IBAN"
                      >
                        {copiedField === `how-${acc.code}-iban` ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── 4. CTA Section ── */}
      <section className="mx-auto max-w-[1570px] px-6 pt-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-[24px] border border-[#315671] bg-[linear-gradient(135deg,#14314B_0%,#0B1F33_100%)] p-10 md:p-16 text-center shadow-2xl">
            <RevealHeading>
              <h2 className="text-[36px] font-black leading-tight text-white md:text-[52px]">
                Ready to Start Your Sourcing Order?
              </h2>
            </RevealHeading>
            <RevealText delay={120}>
              <p className="mx-auto mt-4 max-w-xl text-[17px] font-medium text-slate-300">
                Submit your inquiry today and receive a verified quotation backed by full export support.
              </p>
            </RevealText>
            <RevealButton delay={180} className="mt-8 flex justify-center">
              <Link
                href="/get-a-quote"
                className="inline-flex h-[56px] items-center gap-3 rounded-full bg-[#F97316] px-9 text-[16px] font-black text-white transition-colors hover:bg-[#EA580C] shadow-lg hover:shadow-orange-500/20"
              >
                <span>Request a Quotation</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </RevealButton>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
