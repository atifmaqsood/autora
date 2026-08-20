"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, ChevronLeft, ChevronRight, Clock, DollarSign, Headphones, Mail, MessageCircle, Package, Phone, Search, Send, ShieldCheck, Ship, Users } from "lucide-react";
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

const valueProps = [
  { title: "Expert Support", desc: "Dedicated trade team for your order", icon: ShieldCheck },
  { title: "Transparent Rates", desc: "No hidden charges or unexpected fees", icon: DollarSign },
  { title: "Fast & Easy", desc: "Quick response within 24 hours", icon: Clock },
  { title: "Bulk Orders Welcome", desc: "Fleet & commercial wholesale rates", icon: Users }
];

const processSteps = [
  {
    number: "1",
    title: "Your Requirements",
    desc: "Share the products you’re looking for. Tell us your specifications and quantity.",
    icon: Search
  },
  {
    number: "2",
    title: "Source & Verify",
    desc: "We locate, verify, and inspect trusted suppliers matching your exact requirements.",
    icon: Package
  },
  {
    number: "3",
    title: "Receive Quotation",
    desc: "We source trusted suppliers worldwide. Every supplier is carefully verified.",
    icon: DollarSign
  },
  {
    number: "4",
    title: "Order & Payment",
    desc: "Confirm your order and process payment through our official Emirates NBD accounts.",
    icon: CheckCircle2
  },
  {
    number: "5",
    title: "Export Logistics",
    desc: "We manage export and shipping. Documents are prepared with care.",
    icon: Ship
  },
  {
    number: "6",
    title: "Delivery & Support",
    desc: "Your order is delivered worldwide. Ongoing support is always available.",
    icon: Headphones
  }
];

export default function GetAQuotePage() {
  const [submitted, setSubmitted] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"slider" | "grid">("slider");
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    category: "Automotive Vehicles",
    destinationCountry: "",
    targetPort: "",
    message: "",
    inspectionNeeded: true,
    shippingNeeded: true
  });

  // Slider Autoplay
  useEffect(() => {
    if (!isAutoPlaying || viewMode !== "slider") return;
    const timer = setInterval(() => {
      setCurrentStepIndex((prev) => (prev + 1) % processSteps.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isAutoPlaying, viewMode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const nextStep = () => {
    setIsAutoPlaying(false);
    setCurrentStepIndex((prev) => (prev + 1) % processSteps.length);
  };

  const prevStep = () => {
    setIsAutoPlaying(false);
    setCurrentStepIndex((prev) => (prev - 1 + processSteps.length) % processSteps.length);
  };

  return (
    <div className="bg-[#0B1F33] pb-24 text-white">
      {/* ── 1. Hero Header Banner with Background Image & Parallax ── */}
      <section className="relative min-h-[440px] bg-[#081A2B] border-b border-slate-800/80 overflow-hidden flex flex-col justify-center pt-40 pb-16">
        <ParallaxImage
          src={agtpAssets.sparePartsHero}
          alt="Get A Quote Header"
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
              <span className="text-[#F97316]">GET A QUOTE</span>
            </div>
          </RevealEyebrow>

          <RevealEyebrow delay={100}>
            <div className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.28em] text-[#FDBA74]">
              <span className="h-px w-9 bg-[#F97316]" />
              CUSTOM SOURCING INQUIRY
            </div>
          </RevealEyebrow>

          <RevealHeading delay={150}>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white font-sans max-w-4xl leading-none drop-shadow-lg">
              GET A QUOTE
            </h1>
          </RevealHeading>

          <RevealText delay={200}>
            <p className="text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed drop-shadow-md">
              Request a fast, verified quotation tailored just for your vehicle, spare parts, or commercial trade requirements.
            </p>
          </RevealText>
        </div>
      </section>

      {/* ── 2. Why Choose AGTP Group Value Props Bar ── */}
      <section className="mx-auto max-w-[1570px] px-6 pt-16">
        <div className="text-center mb-8">
          <RevealEyebrow>
            <span className="text-[12px] font-black uppercase tracking-[0.3em] text-[#FDBA74]">
              WHY CHOOSE AGTP GROUP?
            </span>
          </RevealEyebrow>
        </div>
        <RevealStagger staggerDelay={70} className="grid grid-cols-1 gap-5 rounded-[24px] border border-[#315671] bg-[#102941] p-8 shadow-xl sm:grid-cols-2 lg:grid-cols-4">
          {valueProps.map((prop) => {
            const Icon = prop.icon;
            return (
              <div key={prop.title} className="flex items-start gap-4 rounded-xl border border-[#315671]/70 bg-[#14314B] p-5 hover:border-[#F97316] transition-colors">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#F97316]/40 bg-[#0B1F33] text-[#FDBA74]">
                  <Icon className="h-6 w-6 text-[#F97316]" />
                </div>
                <div>
                  <h4 className="text-[17px] font-black text-white">{prop.title}</h4>
                  <p className="mt-1 text-[13px] font-medium text-slate-300">{prop.desc}</p>
                </div>
              </div>
            );
          })}
        </RevealStagger>
      </section>

      {/* ── 3. Interactive Process Slider / Grid ── */}
      <section className="mx-auto max-w-[1570px] px-6 pt-24">
        <Reveal>
          <div className="rounded-[28px] border border-[#315671] bg-[#102941] p-8 md:p-14 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 border-b border-[#24445F] pb-6">
              <div>
                <span className="text-[12px] font-black uppercase tracking-[0.35em] text-[#FDBA74]">OUR PROCESS</span>
                <h2 className="text-[32px] font-black text-white md:text-[44px]">How AGTP Group Works</h2>
              </div>

              {/* View Switcher & Carousel Controls */}
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

            {/* Slider Mode */}
            {viewMode === "slider" ? (
              <div className="space-y-8">
                {/* Active Card Spotlight */}
                <div className="relative overflow-hidden rounded-[24px] border border-[#F97316] bg-gradient-to-b from-[#14314B] via-[#102941] to-[#0B1F33] p-8 md:p-12 shadow-2xl transition-all duration-700">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F97316] via-[#FDBA74] to-[#F97316]" />

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#F97316] bg-[#0B1F33] text-[20px] font-black text-[#FDBA74] shadow-[0_0_20px_rgba(249,115,22,0.35)]">
                          {processSteps[currentStepIndex].number}
                        </span>
                        <span className="rounded-full border border-[#F97316]/40 bg-[#0B1F33] px-4 py-1 text-[12px] font-black text-[#FDBA74]">
                          STEP {currentStepIndex + 1} OF 6
                        </span>
                      </div>

                      <h3 className="text-[28px] font-black text-white md:text-[36px]">
                        {processSteps[currentStepIndex].title}
                      </h3>
                      <p className="max-w-2xl text-[16px] font-medium leading-relaxed text-slate-200 md:text-[18px]">
                        {processSteps[currentStepIndex].desc}
                      </p>
                    </div>

                    <div className="hidden md:flex h-28 w-28 shrink-0 items-center justify-center rounded-3xl border border-[#F97316]/40 bg-[#0B1F33] text-[#FDBA74] shadow-xl">
                      {(() => {
                        const Icon = processSteps[currentStepIndex].icon;
                        return <Icon className="h-12 w-12 text-[#F97316]" />;
                      })()}
                    </div>
                  </div>
                </div>

                {/* Slider Progress Indicator Dots & Step Selector */}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                  {processSteps.map((step, idx) => (
                    <button
                      key={step.number}
                      onClick={() => {
                        setIsAutoPlaying(false);
                        setCurrentStepIndex(idx);
                      }}
                      className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-all ${
                        currentStepIndex === idx
                          ? "border-[#F97316] bg-[#14314B] text-white shadow-lg"
                          : "border-[#315671]/60 bg-[#0B1F33]/80 text-slate-400 hover:border-slate-600 hover:text-white"
                      }`}
                    >
                      <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[12px] font-black ${
                        currentStepIndex === idx ? "bg-[#F97316] text-white" : "bg-[#102941] border border-[#315671]"
                      }`}>
                        {step.number}
                      </span>
                      <span className="truncate text-[13px] font-bold">{step.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Grid View Mode */
              <RevealStagger staggerDelay={80} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
                {processSteps.map((step) => {
                  const Icon = step.icon;
                  return (
                    <div
                      key={step.number}
                      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[24px] border border-[#315671] bg-gradient-to-b from-[#14314B] to-[#102941] p-8 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-[#F97316] hover:shadow-orange-500/10"
                    >
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F97316] via-[#FDBA74] to-[#F97316] opacity-0 group-hover:opacity-100 transition-opacity" />

                      <div className="space-y-5">
                        <div className="flex items-center justify-between">
                          <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#F97316] bg-[#0B1F33] text-[16px] font-black text-[#FDBA74] shadow-[0_0_15px_rgba(249,115,22,0.3)]">
                            {step.number}
                          </span>
                          <Icon className="h-6 w-6 text-[#F97316]/60 group-hover:text-[#F97316] transition-colors" />
                        </div>

                        <h3 className="text-[22px] font-black text-white group-hover:text-[#FDBA74] transition-colors">
                          {step.title}
                        </h3>
                        <p className="text-[14px] font-medium leading-relaxed text-slate-300">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </RevealStagger>
            )}
          </div>
        </Reveal>
      </section>

      {/* ── 4. Main Form: Request Your Custom Quote ── */}
      <section className="mx-auto max-w-[1200px] px-6 pt-20">
        <Reveal>
          <div className="rounded-[28px] border border-[#315671] bg-[#102941] p-8 md:p-14 shadow-2xl">
            <div className="text-center space-y-3 mb-10">
              <RevealHeading>
                <h2 className="text-[32px] font-black text-white md:text-[44px]">
                  Request Your Custom Quote
                </h2>
              </RevealHeading>
              <RevealText delay={100}>
                <p className="mx-auto max-w-2xl text-[15px] font-medium text-slate-300 leading-relaxed">
                  Fill out the form below with your vehicle details, shipping preferences, and delivery requirements, and our team will get in touch promptly to provide a fast, no-obligation quotation tailored just for you.
                </p>
              </RevealText>
            </div>

            {submitted ? (
              <div className="py-16 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-green-500/40 bg-green-950/40 text-green-400">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h2 className="mt-6 text-[34px] font-black text-white">Quotation Request Received!</h2>
                <p className="mx-auto mt-3 max-w-md text-[16px] font-medium text-slate-300">
                  Thank you, {formData.firstName}! Our sales team will review your specifications and contact you via Email / WhatsApp with a full quotation within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 inline-flex h-[52px] items-center gap-2 rounded-full bg-[#F97316] px-8 text-[15px] font-black text-white transition-colors hover:bg-[#EA580C]"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-[13px] font-black uppercase tracking-wider text-slate-300">First Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="mt-2.5 w-full rounded-xl border border-[#315671] bg-[#14314B] px-5 py-4 text-[15px] font-medium text-white outline-none focus:border-[#F97316]"
                    />
                  </div>

                  <div>
                    <label className="block text-[13px] font-black uppercase tracking-wider text-slate-300">Last Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Smith"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="mt-2.5 w-full rounded-xl border border-[#315671] bg-[#14314B] px-5 py-4 text-[15px] font-medium text-white outline-none focus:border-[#F97316]"
                    />
                  </div>

                  <div>
                    <label className="block text-[13px] font-black uppercase tracking-wider text-slate-300">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="example@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-2.5 w-full rounded-xl border border-[#315671] bg-[#14314B] px-5 py-4 text-[15px] font-medium text-white outline-none focus:border-[#F97316]"
                    />
                  </div>

                  <div>
                    <label className="block text-[13px] font-black uppercase tracking-wider text-slate-300">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      placeholder="+971 50 123 4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="mt-2.5 w-full rounded-xl border border-[#315671] bg-[#14314B] px-5 py-4 text-[15px] font-medium text-white outline-none focus:border-[#F97316]"
                    />
                  </div>

                  <div>
                    <label className="block text-[13px] font-black uppercase tracking-wider text-slate-300">Destination Country</label>
                    <input
                      type="text"
                      placeholder="e.g. Angola, Ghana, Congo"
                      value={formData.destinationCountry}
                      onChange={(e) => setFormData({ ...formData, destinationCountry: e.target.value })}
                      className="mt-2.5 w-full rounded-xl border border-[#315671] bg-[#14314B] px-5 py-4 text-[15px] font-medium text-white outline-none focus:border-[#F97316]"
                    />
                  </div>

                  <div>
                    <label className="block text-[13px] font-black uppercase tracking-wider text-slate-300">Target Port / City</label>
                    <input
                      type="text"
                      placeholder="e.g. Port of Luanda, Tema Port"
                      value={formData.targetPort}
                      onChange={(e) => setFormData({ ...formData, targetPort: e.target.value })}
                      className="mt-2.5 w-full rounded-xl border border-[#315671] bg-[#14314B] px-5 py-4 text-[15px] font-medium text-white outline-none focus:border-[#F97316]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-black uppercase tracking-wider text-slate-300">Message / Product Specifications *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Hello, I am interested in sourcing products through AGTP Group."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="mt-2.5 w-full rounded-xl border border-[#315671] bg-[#14314B] p-5 text-[15px] font-medium text-white outline-none focus:border-[#F97316]"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="flex items-center gap-3 rounded-xl border border-[#315671] bg-[#14314B] p-4 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.inspectionNeeded}
                      onChange={(e) => setFormData({ ...formData, inspectionNeeded: e.target.checked })}
                      className="h-5 w-5 accent-[#F97316]"
                    />
                    <span className="text-[14px] font-semibold text-slate-200">Include Pre-shipment Quality Inspection</span>
                  </label>

                  <label className="flex items-center gap-3 rounded-xl border border-[#315671] bg-[#14314B] p-4 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.shippingNeeded}
                      onChange={(e) => setFormData({ ...formData, shippingNeeded: e.target.checked })}
                      className="h-5 w-5 accent-[#F97316]"
                    />
                    <span className="text-[14px] font-semibold text-slate-200">Include Ocean Freight & Logistics Support</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="flex h-[58px] w-full items-center justify-center gap-3 rounded-full bg-[#F97316] text-[17px] font-extrabold text-white transition-colors hover:bg-[#EA580C] shadow-lg hover:shadow-orange-500/20"
                >
                  <span>Submit Quotation Request</span>
                  <Send className="h-5 w-5" />
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </section>

      {/* ── 5. Direct Contact Support Bar ── */}
      <section className="mx-auto max-w-[1200px] px-6 pt-16">
        <Reveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <a
              href="https://wa.me/+971585855729"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-2xl border border-[#315671] bg-[#14314B] p-6 hover:border-[#F97316] transition-colors"
            >
              <MessageCircle className="h-8 w-8 text-[#FDBA74] shrink-0" />
              <div>
                <div className="text-[13px] font-black uppercase text-slate-400">Instant WhatsApp</div>
                <div className="text-[16px] font-black text-white">+971 58 5855729</div>
              </div>
            </a>

            <a
              href="mailto:inquiries@agtpgroup.com"
              className="flex items-center gap-4 rounded-2xl border border-[#315671] bg-[#14314B] p-6 hover:border-[#F97316] transition-colors"
            >
              <Mail className="h-8 w-8 text-[#FDBA74] shrink-0" />
              <div>
                <div className="text-[13px] font-black uppercase text-slate-400">Email Inquiry</div>
                <div className="text-[16px] font-black text-white">inquiries@agtpgroup.com</div>
              </div>
            </a>

            <div className="flex items-center gap-4 rounded-2xl border border-[#315671] bg-[#14314B] p-6">
              <Phone className="h-8 w-8 text-[#FDBA74] shrink-0" />
              <div>
                <div className="text-[13px] font-black uppercase text-slate-400">Direct Phone</div>
                <div className="text-[16px] font-black text-white">+971 58 5855729</div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
