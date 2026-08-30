"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  DollarSign,
  FileCheck,
  RefreshCw,
  ShieldAlert,
  ShieldCheck,
  Building2,
  Lock,
  ArrowRight
} from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { agtpAssets } from "@/src/assets";
import {
  Reveal,
  RevealEyebrow,
  RevealHeading,
  RevealStagger,
  RevealText
} from "@/components/ui/scroll-reveal";

const bankAccounts = [
  {
    currency: "Dirham Account (AED)",
    code: "AED",
    accountNumber: "1015949398001",
    iban: "AE110260001015949398001"
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
  },
  {
    currency: "Pound Account (GBP)",
    code: "GBP",
    accountNumber: "1025949398003",
    iban: "AE890260001025949398003"
  }
];

const paymentPolicies = [
  {
    number: "01",
    title: "Official Bank Account",
    text: "The accounts listed below are the exclusive official bank accounts of AGTP Group L.L.C-FZ. The company shall not be held responsible for any payments made to any other account.",
    tag: "Exclusive Company Account",
    icon: ShieldCheck
  },
  {
    number: "02",
    title: "Proof of Transfer",
    text: "Only an official SWIFT Copy MT-103 document will be accepted as valid proof of payment for swift order verification and processing.",
    tag: "SWIFT MT-103 Required",
    icon: FileCheck
  },
  {
    number: "03",
    title: "Banking Charges",
    text: "All banking charges must be borne by the buyer. Payments must be made using the “OUR” instruction to ensure the full invoice value is received.",
    tag: "“OUR” Fee Instruction",
    icon: DollarSign
  },
  {
    number: "04",
    title: "Matching Remitter Details",
    text: "The buyer’s name must match the remitter’s bank account name. Third-party payments will not be accepted unless prior written approval and authorization are granted.",
    tag: "Remitter Name Match",
    icon: CreditCard
  },
  {
    number: "05",
    title: "Refund Policy",
    text: "Any applicable refunds approved under our policy will be processed strictly back to the original remitting bank account used during purchase.",
    tag: "Original Source Account",
    icon: RefreshCw
  },
  {
    number: "06",
    title: "Cash Refunds",
    text: "Cash refunds are strictly not permitted under UAE commercial banking regulations, anti-money laundering frameworks, and compliance policies.",
    tag: "Zero Cash Transactions",
    icon: ShieldAlert
  }
];

export default function PaymentPage() {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [viewMode, setViewMode] = useState<"grid" | "slider">("grid");
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Slider Autoplay
  useEffect(() => {
    if (!isAutoPlaying || viewMode !== "slider") return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % paymentPolicies.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, viewMode]);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % paymentPolicies.length);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + paymentPolicies.length) % paymentPolicies.length);
  };

  return (
    <div className="bg-[#060709] pb-24 text-white">
      {/* ── 1. Hero Header Banner with Relevant Corporate Finance Background ── */}
      <PageHero
        breadcrumbs={[
          { label: "HOME", href: "/" },
          { label: "PAYMENT" }
        ]}
        badge={{
          text: "OFFICIAL BANKING & ESCROW POLICY"
        }}
        title="SECURE PAYMENT & BANKING"
        subtitle="Verified international banking channels, transparent compliance protocols, and payment policies for AGTP Group L.L.C-FZ."
        imageSrc={agtpAssets.contactHero}
        imageAlt="AGTP Group Corporate Banking & Finance Desk"
      />

      {/* ── 2. Payment & Banking Policy Guidelines (Elevated & Highly Readable Design) ── */}
      <section className="mx-auto max-w-[1570px] px-6 pt-16">
        <div className="rounded-[28px] border border-[#315671] bg-[#102941] p-8 md:p-14 shadow-2xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12 border-b border-[#24445F] pb-8">
            <div>
              <RevealEyebrow>
                <div className="inline-flex items-center gap-3 text-[12px] font-black uppercase tracking-[0.35em] text-[#FDBA74]">
                  <span className="h-px w-8 bg-[#F97316]" />
                  COMPLIANCE & SECURITY PROTOCOLS
                </div>
              </RevealEyebrow>
              <RevealHeading>
                <h2 className="mt-2 text-[32px] font-black text-white md:text-[44px]">
                  Payment & Banking Policy
                </h2>
              </RevealHeading>
              <p className="mt-2 text-[15px] font-medium text-slate-300 max-w-2xl">
                Standard international trade protocols ensuring complete transparency, funds security, and smooth transaction settlement.
              </p>
            </div>

            {/* View Switcher Controls */}
            <div className="flex items-center gap-3 self-end md:self-center">
              <div className="flex rounded-full border border-[#315671] bg-[#0B1F33] p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`rounded-full px-4 py-1.5 text-[12px] font-bold transition-all ${
                    viewMode === "grid"
                      ? "bg-[#F97316] text-white shadow-md"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Aligned Grid
                </button>
                <button
                  onClick={() => setViewMode("slider")}
                  className={`rounded-full px-4 py-1.5 text-[12px] font-bold transition-all ${
                    viewMode === "slider"
                      ? "bg-[#F97316] text-white shadow-md"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Policy Slider
                </button>
              </div>

              {viewMode === "slider" && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevSlide}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#315671] bg-[#14314B] text-slate-300 hover:border-[#F97316] hover:text-white transition-colors"
                    aria-label="Previous policy"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#315671] bg-[#14314B] text-slate-300 hover:border-[#F97316] hover:text-white transition-colors"
                    aria-label="Next policy"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {viewMode === "slider" ? (
            /* Slider Spotlight Mode */
            <div className="space-y-6">
              <div className="relative overflow-hidden rounded-[24px] border border-[#F97316] bg-gradient-to-b from-[#14314B] via-[#102941] to-[#0B1F33] p-8 md:p-12 shadow-2xl transition-all duration-700">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F97316] via-[#FDBA74] to-[#F97316]" />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#F97316] bg-[#0B1F33] text-[16px] font-black text-[#FDBA74] shadow-[0_0_15px_rgba(249,115,22,0.3)]">
                        {paymentPolicies[currentSlide].number}
                      </span>
                      <span className="rounded-full border border-[#F97316]/50 bg-[#0B1F33] px-3.5 py-1 text-[12px] font-black text-[#FDBA74]">
                        {paymentPolicies[currentSlide].tag}
                      </span>
                    </div>

                    <h3 className="text-[28px] font-black text-white md:text-[36px]">
                      {paymentPolicies[currentSlide].title}
                    </h3>
                    <p className="max-w-2xl text-[16px] font-medium leading-relaxed text-slate-200 md:text-[18px]">
                      {paymentPolicies[currentSlide].text}
                    </p>
                  </div>

                  <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border border-[#F97316]/50 bg-[#0B1F33] text-[#FDBA74] shadow-xl">
                    {(() => {
                      const Icon = paymentPolicies[currentSlide].icon;
                      return <Icon className="h-10 w-10 text-[#F97316]" />;
                    })()}
                  </div>
                </div>
              </div>

              {/* Slide Dots */}
              <div className="flex items-center justify-center gap-2 pt-2">
                {paymentPolicies.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setCurrentSlide(idx);
                    }}
                    className={`h-2.5 rounded-full transition-all ${
                      currentSlide === idx ? "w-8 bg-[#F97316]" : "w-2.5 bg-[#315671]"
                    }`}
                  />
                ))}
              </div>
            </div>
          ) : (
            /* Elevated Aligned Grid Mode */
            <RevealStagger staggerDelay={70} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
              {paymentPolicies.map((policy) => {
                const Icon = policy.icon;
                return (
                  <div
                    key={policy.title}
                    className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[24px] border border-[#315671] bg-gradient-to-b from-[#14314B] via-[#102941] to-[#0B1F33] p-7 shadow-xl hover:-translate-y-1.5 hover:border-[#F97316] hover:shadow-orange-500/10 transition-all duration-300"
                  >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#F97316] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="space-y-4">
                      {/* Card Header: Icon & Protocol Badge */}
                      <div className="flex items-center justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#315671] bg-[#0B1F33] text-[#F97316] group-hover:border-[#F97316] group-hover:bg-[#14314B] group-hover:shadow-[0_0_15px_rgba(249,115,22,0.25)] transition-all duration-300">
                          <Icon className="h-6 w-6 text-[#F97316] stroke-[2.2] transition-transform duration-300 group-hover:scale-110" />
                        </div>
                        <span className="flex h-8 items-center rounded-full border border-[#315671] bg-[#0B1F33] px-3.5 text-[11px] font-black tracking-wider text-[#FDBA74] group-hover:border-[#F97316] transition-colors">
                          PROTOCOL {policy.number}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-[20px] font-black leading-snug text-white group-hover:text-[#FDBA74] transition-colors">
                        {policy.title}
                      </h3>

                      {/* Structured Policy Statement Box */}
                      <div className="rounded-2xl border border-[#24445F]/70 bg-[#0B1F33]/60 p-4 text-[13.5px] font-medium leading-relaxed text-slate-300 group-hover:border-[#315671] transition-colors">
                        {policy.text}
                      </div>
                    </div>

                    {/* Bottom Status / Highlight Tag */}
                    <div className="mt-5 pt-4 border-t border-[#24445F]/60 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[12px] font-bold text-[#FDBA74]">
                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F97316]/20 border border-[#F97316]/40">
                          <Check className="h-3 w-3 text-[#F97316]" />
                        </div>
                        <span>{policy.tag}</span>
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                        COMPLIANCE
                      </span>
                    </div>
                  </div>
                );
              })}
            </RevealStagger>
          )}
        </div>
      </section>

      {/* ── 3. Emirates NBD Bank Account Header Details ── */}
      <section className="mx-auto max-w-[1570px] px-6 pt-16">
        <Reveal>
          <div className="rounded-[28px] border border-[#315671] bg-[#102941] p-8 md:p-12 shadow-xl">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b border-[#24445F] pb-8">
              <div>
                <span className="rounded-full bg-[#F97316]/15 border border-[#F97316]/40 px-4 py-1.5 text-[12px] font-black text-[#FDBA74]">
                  PRIMARY BANKING PARTNER
                </span>
                <h2 className="mt-4 text-[32px] font-black text-white">Emirates NBD</h2>
                <p className="text-[15px] font-semibold text-slate-300">Branch: DUBAI COURTS • Dubai, United Arab Emirates</p>
              </div>
              <div className="rounded-2xl border border-[#315671] bg-[#14314B] p-5 text-left md:text-right">
                <div className="text-[12px] font-black uppercase tracking-wider text-slate-400">BIC CODE / SWIFT</div>
                <div className="mt-1 text-[24px] font-black text-[#FDBA74]">EBILAEADXXX</div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 text-[15px] font-medium text-slate-300">
              <div>
                <span className="block text-[12px] font-black uppercase tracking-wider text-slate-500">Account Name</span>
                <span className="mt-1 block text-[17px] font-black text-white">Agtp Group L L C Fz</span>
              </div>
              <div>
                <span className="block text-[12px] font-black uppercase tracking-wider text-slate-500">Bank Name</span>
                <span className="mt-1 block text-[17px] font-black text-white">Emirates NBD</span>
              </div>
              <div>
                <span className="block text-[12px] font-black uppercase tracking-wider text-slate-500">Bank Website</span>
                <a href="https://www.emiratesnbd.com" target="_blank" rel="noopener noreferrer" className="mt-1 block text-[17px] font-black text-[#FDBA74] hover:underline">
                  www.emiratesnbd.com
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── 4. Currency Accounts Grid ── */}
      <section className="mx-auto max-w-[1570px] px-6 pt-16">
        <div className="text-center">
          <RevealEyebrow>
            <div className="inline-flex items-center gap-3 text-[12px] font-black uppercase tracking-[0.35em] text-[#FDBA74]">
              <span className="h-px w-8 bg-[#F97316]" />
              OFFICIAL WIRE SETTLEMENTS
              <span className="h-px w-8 bg-[#F97316]" />
            </div>
          </RevealEyebrow>
          <RevealHeading>
            <h2 className="mt-3 text-[32px] font-black md:text-[46px]">Accepted Currencies for International Payments</h2>
          </RevealHeading>
          <RevealText>
            <p className="mt-3 text-[16px] font-semibold text-slate-300">
              Transfer funds directly to the corresponding account matching your proforma invoice currency.
            </p>
          </RevealText>
        </div>

        <RevealStagger staggerDelay={80} className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 auto-rows-fr">
          {bankAccounts.map((acc) => (
            <div key={acc.code} className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[24px] border border-[#315671] bg-gradient-to-b from-[#14314B] to-[#102941] p-6 shadow-lg hover:border-[#F97316] transition-all duration-300 space-y-4">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F97316] via-[#FDBA74] to-[#F97316] opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-center justify-between border-b border-[#24445F] pb-3">
                <h3 className="text-[17px] font-black text-white">{acc.currency}</h3>
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
                    onClick={() => handleCopy(acc.accountNumber, `${acc.code}-acc`)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#315671] bg-[#14314B] text-slate-300 hover:text-white hover:border-[#F97316]"
                    title="Copy Account Number"
                  >
                    {copiedField === `${acc.code}-acc` ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>

                <div className="rounded-xl bg-[#0B1F33] p-3.5 border border-[#315671]/70 flex items-center justify-between">
                  <div className="min-w-0 pr-2">
                    <span className="block text-[10px] font-black uppercase text-slate-400">IBAN</span>
                    <span className="truncate text-[13px] font-black text-[#FDBA74] block">{acc.iban}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(acc.iban, `${acc.code}-iban`)}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#315671] bg-[#14314B] text-slate-300 hover:text-white hover:border-[#F97316]"
                    title="Copy IBAN"
                  >
                    {copiedField === `${acc.code}-iban` ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </RevealStagger>
      </section>

      {/* ── 5. Security Notice Alert ── */}
      <section className="mx-auto max-w-[1570px] px-6 pt-16">
        <Reveal>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-5 rounded-[24px] border border-amber-500/40 bg-amber-950/20 p-8 text-amber-200 shadow-xl">
            <AlertTriangle className="h-10 w-10 text-amber-400 shrink-0" />
            <div>
              <h3 className="text-[18px] font-black text-amber-300">Official Banking Notice</h3>
              <p className="mt-1 text-[14px] font-medium leading-relaxed text-amber-200/90">
                The accounts listed above are the ONLY official bank accounts of AGTP Group L.L.C-FZ. Always verify wire transfer details directly on this official page or with your dedicated account manager before initiating payments.
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
