"use client";

import { type ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, HelpCircle, Mail, MessageCircle, Phone, Search } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { VehicleInquiryModal } from "@/components/vehicles/vehicle-inquiry-modal";
import { Reveal, RevealButton, RevealEyebrow, RevealHeading, RevealStagger, RevealText } from "@/components/ui/scroll-reveal";
import { agtpAssets } from "@/src/assets";
import type { Faq as ManagedFaq } from "@/lib/faqs/types";

const categories = [
  "All Questions",
  "Vehicles",
  "Spare Parts",
  "Orders & Payments",
  "Shipping & Export",
  "Refunds & Support"
];

interface FaqItem {
  id?: string;
  question: string;
  answer: string;
  answerNode?: ReactNode;
  linkText?: string | null;
  linkUrl?: string | null;
  category: "Vehicles" | "Spare Parts" | "Orders & Payments" | "Shipping & Export" | "Refunds & Support";
}

export default function FaqsPage() {
  const [faqList, setFaqList] = useState<FaqItem[]>([]);
  const [faqsLoaded, setFaqsLoaded] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState("All Questions");
  const [searchQuery, setSearchQuery] = useState("");
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);

  useEffect(() => {
    let active = true;
    void fetch("/api/faqs", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("Unable to load FAQs");
        return response.json() as Promise<ManagedFaq[]>;
      })
      .then((items) => active && setFaqList(items.map((item) => ({ ...item, category: item.category as FaqItem["category"] }))))
      .catch(() => undefined)
      .finally(() => active && setFaqsLoaded(true));
    return () => { active = false; };
  }, []);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFaqs = faqList.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (activeCategory === "All Questions") return true;
    return faq.category === activeCategory;
  });

  return (
    <div className="bg-[#060709] pb-24 text-white">
      {/* ── 1. Hero Header Banner ── */}
      <PageHero
        breadcrumbs={[
          { label: "HOME", href: "/" },
          { label: "FAQS" }
        ]}
        badge={{
          text: "KNOWLEDGE BASE & GLOBAL SUPPORT"
        }}
        title="FREQUENTLY ASKED QUESTIONS"
        subtitle="Find quick answers about our vehicles, automotive spare parts, export process, payments, and global delivery."
        imageSrc={agtpAssets.aboutHero}
        imageAlt="AGTP Group Support & FAQs"
      />

      {/* ── 2. Search & Category Filter Controls Bar ── */}
      <section className="mx-auto max-w-5xl px-4 pt-16 sm:px-6 lg:px-8">
        <Reveal>
          <div className="rounded-[24px] border border-[#315671] bg-[#102941] p-6 shadow-xl space-y-6">
            {/* Search Box */}
            <div className="relative">
              <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search questions or keywords..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setOpenIndex(0);
                }}
                className="w-full rounded-2xl border border-[#315671] bg-[#14314B] pl-14 pr-6 py-4 text-[15px] font-medium text-white outline-none focus:border-[#F97316]"
              />
            </div>

            {/* Category Selector Pills */}
            <div className="flex flex-wrap items-center gap-2.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setOpenIndex(0);
                  }}
                  className={`rounded-full px-4 py-2 text-[12px] font-black transition-all ${
                    activeCategory === cat
                      ? "bg-[#F97316] text-white shadow-md"
                      : "border border-[#315671] bg-[#14314B] text-slate-300 hover:border-[#F97316] hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── 3. Interactive Accordion FAQ List ── */}
      <section className="mx-auto max-w-5xl px-4 pt-10 sm:px-6 lg:px-8">
        {!faqsLoaded ? null : filteredFaqs.length === 0 ? (
          <div className="rounded-[24px] border border-[#315671] bg-[#102941] p-12 text-center text-slate-300">
            <HelpCircle className="mx-auto h-12 w-12 text-[#FDBA74]" />
            <h3 className="mt-4 text-[20px] font-black text-white">No Matching Questions Found</h3>
            <p className="mt-2 text-[14px]">Try searching with a different term or clear your filter.</p>
          </div>
        ) : (
          <RevealStagger staggerDelay={60} className="space-y-4">
            {filteredFaqs.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={item.id ?? item.question}
                  className={`group relative overflow-hidden rounded-[20px] border transition-all duration-300 ${
                    isOpen ? "border-[#F97316] shadow-xl" : "border-[#315671] hover:border-[#F97316]"
                  } bg-gradient-to-b from-[#14314B] to-[#102941]`}
                >
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F97316] via-[#FDBA74] to-[#F97316] transition-opacity ${
                    isOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`} />

                  <button
                    onClick={() => toggleFaq(index)}
                    className="flex w-full items-center justify-between p-6 md:p-7 text-left font-black text-white"
                  >
                    <div className="flex items-center gap-4 min-w-0 pr-4">
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors ${
                        isOpen
                          ? "border-[#F97316] bg-[#F97316] text-white"
                          : "border-[#F97316]/40 bg-[#0B1F33] text-[#FDBA74]"
                      }`}>
                        <HelpCircle className="h-5 w-5" />
                      </div>
                      <span className={`text-[17px] md:text-[19px] leading-snug font-sans transition-colors ${
                        isOpen ? "text-[#FDBA74]" : "text-white group-hover:text-[#FDBA74]"
                      }`}>
                        {item.question.replace(/^\d+[\.\)]\s*/, "")}
                      </span>
                    </div>

                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                      isOpen
                        ? "rotate-180 border-[#F97316] bg-[#F97316] text-white shadow-md shadow-orange-500/20"
                        : "border-[#315671] bg-[#0B1F33] text-[#FDBA74]"
                    }`}>
                      <ChevronDown className={`h-5 w-5 ${isOpen ? "text-white stroke-[2.5]" : "text-[#FDBA74]"}`} />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="border-t border-[#24445F]/60 px-6 pb-6 pt-4 md:px-7 md:pb-7">
                      <p className="text-[17px] font-medium leading-relaxed text-slate-200">
                        {item.answerNode || (
                          <>
                            {item.answer}
                            {item.linkText && item.linkUrl && (
                              <>
                                {" "}
                                <Link href={item.linkUrl} className="font-bold text-[#FDBA74] underline decoration-[#F97316] underline-offset-4 hover:text-white transition-colors">
                                  {item.linkText}
                                </Link>
                                .
                              </>
                            )}
                          </>
                        )}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </RevealStagger>
        )}
      </section>

      {/* ── 4. Bottom Support CTA Banner ── */}
      <section className="mx-auto max-w-5xl px-4 pt-20 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[24px] border border-[#315671] bg-gradient-to-br from-[#14314B] to-[#0B1F33] p-6 sm:p-10 md:p-14 text-center shadow-2xl space-y-6">
            <RevealHeading>
              <h2 className="text-[30px] font-black uppercase text-white md:text-[42px]">
                HAVE MORE QUESTIONS?
              </h2>
            </RevealHeading>

            <RevealText delay={120}>
              <p className="mx-auto max-w-xl text-[16px] font-medium text-slate-300">
                Our team at AGTP Group is here to help with your vehicle and spare parts inquiries.
              </p>
            </RevealText>

            <div className="flex flex-wrap items-center justify-center gap-6 text-[15px] font-bold text-[#FDBA74]">
              <a href="mailto:inquiries@agtpgroup.com" className="flex items-center gap-2 hover:underline">
                <span>✉️</span> inquiries@agtpgroup.com
              </a>
              <a href="tel:+971585855729" className="flex items-center gap-2 hover:underline">
                <span>☎️</span> +971 58 5855729
              </a>
              <a href="https://wa.me/971585855729" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline text-green-400">
                <span>🟢</span> Instant WhatsApp
              </a>
            </div>

            <RevealButton delay={180} className="flex justify-center pt-4">
              <button
                type="button"
                onClick={() => setInquiryModalOpen(true)}
                className="inline-flex h-[52px] w-full max-w-[320px] items-center justify-center gap-3 rounded-full bg-[#F97316] px-6 text-[15px] font-black text-white shadow-lg transition-colors hover:bg-[#EA580C] hover:shadow-orange-500/20 sm:h-[56px] sm:w-auto sm:px-9 sm:text-[16px]"
              >
                <span>Get a Quote</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </RevealButton>
          </div>
        </Reveal>
      </section>

      <VehicleInquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
      />
    </div>
  );
}

