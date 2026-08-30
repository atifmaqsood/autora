"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, HelpCircle, Mail, MessageCircle, Phone, Search } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal, RevealButton, RevealEyebrow, RevealHeading, RevealStagger, RevealText } from "@/components/ui/scroll-reveal";
import { agtpAssets } from "@/src/assets";

const categories = [
  "All Questions",
  "Vehicles",
  "Spare Parts",
  "Orders & Payments",
  "Shipping & Export",
  "Refunds & Support"
];

interface FaqItem {
  question: string;
  answer: string;
  category: "Vehicles" | "Spare Parts" | "Orders & Payments" | "Shipping & Export" | "Refunds & Support";
}

const faqList: FaqItem[] = [
  {
    question: "1. What does AGTP Group do?",
    answer: "AGTP Group is a Dubai-based automotive trading company supplying vehicles and automotive spare parts for local and international customers.",
    category: "Vehicles"
  },
  {
    question: "2. What products does AGTP Group supply?",
    answer: "We supply new and pre-owned vehicles, automotive spare parts, engines, tyres, body parts, and other automotive components.",
    category: "Vehicles"
  },
  {
    question: "3. Do you export vehicles internationally?",
    answer: "Yes. We arrange vehicle exports from the UAE to customers and markets worldwide.",
    category: "Shipping & Export"
  },
  {
    question: "4. Do you supply automotive spare parts internationally?",
    answer: "Yes. We supply automotive spare parts for various vehicle brands and arrange international delivery.",
    category: "Spare Parts"
  },
  {
    question: "5. Which vehicle brands do you supply?",
    answer: "We supply vehicles from a wide range of major international brands, subject to availability.",
    category: "Vehicles"
  },
  {
    question: "6. Which vehicle brands do you supply spare parts for?",
    answer: "We supply spare parts for many Japanese, Korean, European, American, and other vehicle brands.",
    category: "Spare Parts"
  },
  {
    question: "7. Can I buy a vehicle directly from AGTP Group?",
    answer: "Yes. Customers can purchase available vehicles directly from AGTP Group and arrange local or international delivery.",
    category: "Vehicles"
  },
  {
    question: "8. Can I order a specific spare part?",
    answer: "Yes. Send us the part name, part number, vehicle model, or a photo, and we’ll check availability and pricing.",
    category: "Spare Parts"
  },
  {
    question: "9. How can I request a quotation?",
    answer: "Submit an inquiry through our website, WhatsApp, email, or contact form with your product requirements.",
    category: "Orders & Payments"
  },
  {
    question: "10. What information do you need for a spare parts inquiry?",
    answer: "Please provide the vehicle make, model, year, part name or part number, quantity, and destination country when available.",
    category: "Spare Parts"
  },
  {
    question: "11. Do you provide international shipping?",
    answer: "Yes. We arrange international shipping by sea or air, depending on the product, destination, and customer requirements.",
    category: "Shipping & Export"
  },
  {
    question: "12. What payment methods do you accept?",
    answer: "Payment options may include bank transfer, online payment, and other approved payment methods depending on the order.",
    category: "Orders & Payments"
  },
  {
    question: "13. How do you ensure product quality?",
    answer: "We verify product specifications, availability, and condition before completing orders, with inspection available where applicable.",
    category: "Orders & Payments"
  },
  {
    question: "14. Can I cancel my order or request a refund?",
    answer: "Refund and cancellation eligibility depends on the order status and applicable terms outlined in our Refund Policy.",
    category: "Refunds & Support"
  },
  {
    question: "15. How do I place an order with AGTP Group?",
    answer: "Send us your requirements, receive the quotation, confirm your order, complete payment, and we’ll proceed with fulfillment and delivery.",
    category: "Orders & Payments"
  }
];

export default function FaqsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState("All Questions");
  const [searchQuery, setSearchQuery] = useState("");

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
        {filteredFaqs.length === 0 ? (
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
                  key={item.question}
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
                        {item.question}
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
          <div className="relative overflow-hidden rounded-[24px] border border-[#315671] bg-gradient-to-br from-[#14314B] to-[#0B1F33] p-10 md:p-14 text-center shadow-2xl space-y-6">
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

            <RevealButton delay={180} className="pt-4 flex justify-center">
              <Link
                href="/contact-us"
                className="inline-flex h-[56px] items-center gap-3 rounded-full bg-[#F97316] px-9 text-[16px] font-black text-white transition-colors hover:bg-[#EA580C] shadow-lg hover:shadow-orange-500/20"
              >
                <span>Get a Quote</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </RevealButton>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
