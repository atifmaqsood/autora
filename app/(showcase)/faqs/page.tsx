"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, HelpCircle, Mail, MessageCircle, Phone, Search } from "lucide-react";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { Reveal, RevealButton, RevealEyebrow, RevealHeading, RevealStagger, RevealText } from "@/components/ui/scroll-reveal";
import { faqs } from "@/lib/agtp/content";
import { agtpAssets } from "@/src/assets";

const categories = [
  "All Questions",
  "Vehicle Export",
  "Product Sourcing",
  "Logistics & Shipping",
  "Quotation & Orders"
];

export default function FaqsPage() {
  const [openIndices, setOpenIndices] = useState<number[]>([0, 1]); // Open first two by default
  const [activeCategory, setActiveCategory] = useState("All Questions");
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFaq = (index: number) => {
    if (openIndices.includes(index)) {
      setOpenIndices(openIndices.filter((i) => i !== index));
    } else {
      setOpenIndices([...openIndices, index]);
    }
  };

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeCategory === "All Questions") return true;
    if (activeCategory === "Vehicle Export") return faq.question.toLowerCase().includes("vehicle") || faq.answer.toLowerCase().includes("vehicle");
    if (activeCategory === "Product Sourcing") return faq.question.toLowerCase().includes("sourc") || faq.answer.toLowerCase().includes("sourc") || faq.question.toLowerCase().includes("quality");
    if (activeCategory === "Logistics & Shipping") return faq.question.toLowerCase().includes("logistics") || faq.answer.toLowerCase().includes("logistics") || faq.question.toLowerCase().includes("countr");
    if (activeCategory === "Quotation & Orders") return faq.question.toLowerCase().includes("quot") || faq.question.toLowerCase().includes("start") || faq.question.toLowerCase().includes("bulk");

    return true;
  });

  return (
    <div className="bg-[#0B1F33] pb-24 text-white">
      {/* ── 1. Hero Header Banner with Background Image & Parallax ── */}
      <section className="relative min-h-[440px] bg-[#081A2B] border-b border-slate-800/80 overflow-hidden flex flex-col justify-center pt-40 pb-16">
        <ParallaxImage
          src={agtpAssets.blogsHero}
          alt="Frequently Asked Questions Header"
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
              <span className="text-[#F97316]">FAQS</span>
            </div>
          </RevealEyebrow>

          <RevealEyebrow delay={100}>
            <div className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.28em] text-[#FDBA74]">
              <span className="h-px w-9 bg-[#F97316]" />
              KNOWLEDGE BASE & SUPPORT
            </div>
          </RevealEyebrow>

          <RevealHeading delay={150}>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white font-sans max-w-4xl leading-none drop-shadow-lg">
              FREQUENTLY ASKED QUESTIONS
            </h1>
          </RevealHeading>

          <RevealText delay={200}>
            <p className="text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed drop-shadow-md">
              Find fast answers about AGTP Group sourcing, vehicle export, logistics, and procurement services.
            </p>
          </RevealText>
        </div>
      </section>

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
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-2xl border border-[#315671] bg-[#14314B] pl-14 pr-6 py-4 text-[15px] font-medium text-white outline-none focus:border-[#F97316]"
              />
            </div>

            {/* Category Selector Pills */}
            <div className="flex flex-wrap items-center gap-2.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
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
        {filteredFaqs.length === 0 ? (
          <div className="rounded-[24px] border border-[#315671] bg-[#102941] p-12 text-center text-slate-300">
            <HelpCircle className="mx-auto h-12 w-12 text-[#FDBA74]" />
            <h3 className="mt-4 text-[20px] font-black text-white">No Matching Questions Found</h3>
            <p className="mt-2 text-[14px]">Try searching with a different term or clear your filter.</p>
          </div>
        ) : (
          <RevealStagger staggerDelay={60} className="space-y-4">
            {filteredFaqs.map((item, originalIndex) => {
              const isOpen = openIndices.includes(originalIndex);
              return (
                <div
                  key={item.question}
                  className="group relative overflow-hidden rounded-[20px] border border-[#315671] bg-gradient-to-b from-[#14314B] to-[#102941] transition-all duration-300 hover:border-[#F97316]"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F97316] via-[#FDBA74] to-[#F97316] opacity-0 group-hover:opacity-100 transition-opacity" />

                  <button
                    onClick={() => toggleFaq(originalIndex)}
                    className="flex w-full items-center justify-between p-6 md:p-7 text-left font-black text-white"
                  >
                    <div className="flex items-center gap-4 min-w-0 pr-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#F97316]/40 bg-[#0B1F33] text-[#FDBA74]">
                        <HelpCircle className="h-5 w-5 text-[#F97316]" />
                      </div>
                      <span className="text-[17px] md:text-[19px] leading-snug font-sans group-hover:text-[#FDBA74] transition-colors">
                        {item.question}
                      </span>
                    </div>

                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#315671] bg-[#0B1F33] text-[#FDBA74] transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-[#F97316] text-white" : ""
                    }`}>
                      <ChevronDown className="h-5 w-5" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="border-t border-[#24445F]/60 px-6 pb-6 pt-4 md:px-7 md:pb-7">
                      <p className="text-[15px] font-medium leading-relaxed text-slate-200">
                        {item.answer}
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
          <div className="relative overflow-hidden rounded-[24px] border border-[#315671] bg-[linear-gradient(135deg,#14314B_0%,#0B1F33_100%)] p-10 md:p-14 text-center shadow-2xl space-y-6">
            <RevealHeading>
              <h2 className="text-[30px] font-black text-white md:text-[42px]">
                Have More Questions or Ready to Get Started?
              </h2>
            </RevealHeading>

            <RevealText delay={120}>
              <p className="mx-auto max-w-xl text-[16px] font-medium text-slate-300">
                Our team at AGTP Group is here to help you every step of the way.
              </p>
            </RevealText>

            <div className="flex flex-wrap items-center justify-center gap-6 text-[15px] font-bold text-[#FDBA74]">
              <a href="mailto:inquiries@agtpgroup.com" className="flex items-center gap-2 hover:underline">
                <Mail className="h-4 w-4 text-[#F97316]" /> inquiries@agtpgroup.com
              </a>
              <a href="tel:+971585855729" className="flex items-center gap-2 hover:underline">
                <Phone className="h-4 w-4 text-[#F97316]" /> +971 58 5855729
              </a>
              <a href="https://wa.me/+971585855729" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline text-green-400">
                <MessageCircle className="h-4 w-4" /> Instant WhatsApp
              </a>
            </div>

            <RevealButton delay={180} className="pt-4 flex justify-center">
              <Link
                href="/contact-us"
                className="inline-flex h-[56px] items-center gap-3 rounded-full bg-[#F97316] px-9 text-[16px] font-black text-white transition-colors hover:bg-[#EA580C] shadow-lg hover:shadow-orange-500/20"
              >
                <span>Contact Our Trade Team</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </RevealButton>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
