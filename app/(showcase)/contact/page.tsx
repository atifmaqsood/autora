"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, Mail, MessageCircle, Phone, Send, CheckCircle2, Globe, MapPin, Copy, Check, ArrowRight, ShieldCheck, Sparkles, Building2 } from "lucide-react";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { agtpAssets } from "@/src/assets";
import {
  RevealHeading,
  RevealText,
  RevealButton,
  Reveal,
  RevealEyebrow,
  RevealStagger
} from "@/components/ui/scroll-reveal";

const serviceCategories = [
  "Vehicle Sourcing",
  "Spare Parts Export",
  "Tyres & Engines",
  "Freight & Logistics",
  "General Inquiry"
];

const commercialHubs = [
  {
    name: "Head Office Hub",
    location: "Samari Retail, Dubai, UAE",
    desc: "Executive trade coordination & corporate management desk.",
    timing: "Mon - Sat: 9:00AM - 8:00PM"
  },
  {
    name: "DUCAMZ Auto Zone",
    location: "Ras Al Khor, Dubai, UAE",
    desc: "Vehicle re-export center for new & pre-owned luxury SUVs & fleets.",
    timing: "Mon - Sat: 9:00AM - 8:00PM"
  },
  {
    name: "Deira Spare Parts Hub",
    location: "Deira / Naif, Dubai, UAE",
    desc: "Middle East's largest spare parts, engines, and body kit market.",
    timing: "Mon - Sat: 9:00AM - 8:00PM"
  }
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("Vehicle Sourcing");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    destinationCountry: "",
    message: ""
  });

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email) return;
    setSubmitted(true);
  };

  return (
    <div className="bg-[#0B1F33] pb-24 text-white">
      {/* ── 1. Hero Header Banner with Background Image & Parallax ── */}
      <section className="relative min-h-[440px] bg-[#081A2B] border-b border-slate-800/80 overflow-hidden flex flex-col justify-center pt-40 pb-16">
        <ParallaxImage
          src={agtpAssets.contactHero}
          alt="Contact Us Header"
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
              <span className="text-[#F97316]">CONTACT US</span>
            </div>
          </RevealEyebrow>

          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-green-500/40 bg-green-950/40 px-3.5 py-1 text-[11px] font-black text-green-400">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              ONLINE DESK — TYPICAL RESPONSE &lt; 15 MINS
            </span>
          </div>

          <RevealHeading delay={150}>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white font-sans max-w-4xl leading-none drop-shadow-lg">
              CONTACT US
            </h1>
          </RevealHeading>

          <RevealText delay={200}>
            <p className="text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed drop-shadow-md">
              Have a sourcing, trading, or logistics inquiry? Fill out the form below, and our team will contact you with the right solution.
            </p>
          </RevealText>
        </div>
      </section>

      {/* ── 2. Brand New Split Layout: Interactive Communication Hub & Form Portal ── */}
      <section className="mx-auto max-w-[1570px] px-6 pt-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 auto-rows-fr items-stretch">
          
          {/* LEFT COLUMN: Executive Contact Desk Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <Reveal className="h-full">
              <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[28px] border border-[#315671] bg-[#102941] p-8 md:p-10 shadow-2xl space-y-8">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F97316] via-[#FDBA74] to-[#F97316]" />

                <div className="space-y-6">
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#FDBA74]">COMMUNICATION HUB</span>
                    <h2 className="text-[26px] font-black text-white mt-1 border-b border-[#24445F] pb-4">
                      Direct Support Desks
                    </h2>
                  </div>

                  {/* 1. Instant WhatsApp Card */}
                  <div className="group/item relative overflow-hidden rounded-2xl border border-[#315671] bg-gradient-to-b from-[#14314B] to-[#0B1F33] p-5 shadow-lg transition-all duration-300 hover:border-[#F97316]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3.5">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-500/40 bg-emerald-950/40 text-emerald-400 shadow-md">
                          <MessageCircle className="h-6 w-6" />
                        </div>
                        <div>
                          <span className="block text-[11px] font-black uppercase text-slate-400">Instant WhatsApp</span>
                          <span className="text-[17px] font-black text-white">+971 58 5855729</span>
                        </div>
                      </div>
                      <a
                        href="https://wa.me/+971585855729"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-9 items-center gap-1.5 rounded-full border border-emerald-500/50 bg-emerald-950/60 px-4 text-[12px] font-black text-emerald-400 hover:bg-emerald-600 hover:text-white transition-all"
                      >
                        <span>Chat Now</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* 2. Official Email Card */}
                  <div className="group/item relative overflow-hidden rounded-2xl border border-[#315671] bg-gradient-to-b from-[#14314B] to-[#0B1F33] p-5 shadow-lg transition-all duration-300 hover:border-[#F97316]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3.5 min-w-0 pr-2">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#F97316]/40 bg-[#0B1F33] text-[#FDBA74] shadow-md">
                          <Mail className="h-6 w-6 text-[#F97316]" />
                        </div>
                        <div className="min-w-0">
                          <span className="block text-[11px] font-black uppercase text-slate-400">Official Email Inquiry</span>
                          <span className="text-[16px] font-black text-[#FDBA74] truncate block">inquiries@agtpgroup.com</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleCopy("inquiries@agtpgroup.com", "contact-email")}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#315671] bg-[#14314B] text-slate-300 hover:border-[#F97316] hover:text-white"
                        title="Copy Email Address"
                      >
                        {copiedField === "contact-email" ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {/* 3. Commercial Operating Hours Card */}
                  <div className="group/item relative overflow-hidden rounded-2xl border border-[#315671] bg-gradient-to-b from-[#14314B] to-[#0B1F33] p-5 shadow-lg transition-all duration-300 hover:border-[#F97316]">
                    <div className="flex items-start gap-3.5">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#F97316]/40 bg-[#0B1F33] text-[#FDBA74] shadow-md">
                        <Clock className="h-6 w-6 text-[#F97316]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="block text-[11px] font-black uppercase text-slate-400">Commercial Timing</span>
                          <span className="rounded-full bg-green-950/60 border border-green-500/40 px-2.5 py-0.5 text-[10px] font-extrabold text-green-400">OPEN NOW</span>
                        </div>
                        <span className="mt-1 block text-[15px] font-black text-white">Monday - Saturday: 9:00AM - 8:00PM</span>
                        <span className="text-[12px] font-semibold text-slate-400">Sunday & Public Holidays: Closed</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Follow Us Social Links Bar */}
                <div className="border-t border-[#24445F] pt-6 flex items-center justify-between">
                  <div>
                    <span className="block text-[11px] font-black uppercase tracking-wider text-slate-400">Follow Us</span>
                    <span className="text-[13px] font-semibold text-slate-300">Official AGTP Group Channels</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <a
                      href="https://wa.me/+971585855729"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#315671] bg-[#14314B] text-slate-300 hover:border-[#F97316] hover:text-[#F97316] transition-colors"
                      title="WhatsApp"
                    >
                      <MessageCircle className="h-5 w-5" />
                    </a>
                    <a
                      href="mailto:inquiries@agtpgroup.com"
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#315671] bg-[#14314B] text-slate-300 hover:border-[#F97316] hover:text-[#F97316] transition-colors"
                      title="Email Us"
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                    <a
                      href="https://www.emiratesnbd.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#315671] bg-[#14314B] text-slate-300 hover:border-[#F97316] hover:text-[#F97316] transition-colors"
                      title="Emirates NBD Banking"
                    >
                      <Globe className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* RIGHT COLUMN: Modern Glassmorphic Inquiry Portal */}
          <div className="lg:col-span-7 flex flex-col">
            <Reveal className="h-full">
              <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[28px] border border-[#315671] bg-[#102941] p-8 md:p-12 shadow-2xl">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F97316] via-[#FDBA74] to-[#F97316]" />

                <div>
                  <div className="space-y-4 border-b border-[#24445F] pb-6 mb-8">
                    <RevealEyebrow>
                      <div className="inline-flex items-center gap-3 text-[12px] font-black uppercase tracking-[0.3em] text-[#FDBA74]">
                        <span className="h-px w-6 bg-[#F97316]" />
                        LET&apos;S DISCUSS YOUR REQUIREMENTS
                      </div>
                    </RevealEyebrow>

                    <RevealHeading>
                      <h2 className="text-[28px] font-black text-white md:text-[38px]">
                        Let&apos;s Discuss Your Requirements
                      </h2>
                    </RevealHeading>

                    <RevealText delay={100}>
                      <p className="text-[14px] font-medium leading-relaxed text-slate-300">
                        Have a sourcing, trading, or logistics inquiry? Fill out the form below, and our team will contact you with the right solution.
                      </p>
                    </RevealText>

                    {/* Interactive Category Selector Pills */}
                    <div className="pt-2">
                      <span className="block text-[11px] font-black uppercase tracking-wider text-slate-400 mb-2">Select Inquiry Category:</span>
                      <div className="flex flex-wrap gap-2">
                        {serviceCategories.map((cat) => (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => setSelectedCategory(cat)}
                            className={`rounded-full px-3.5 py-1.5 text-[12px] font-black transition-all ${
                              selectedCategory === cat
                                ? "bg-[#F97316] text-white shadow-md"
                                : "border border-[#315671] bg-[#14314B] text-slate-300 hover:border-[#F97316] hover:text-white"
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {submitted ? (
                    <div className="py-16 text-center space-y-4">
                      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-green-500/40 bg-green-950/40 text-green-400">
                        <CheckCircle2 className="h-10 w-10" />
                      </div>
                      <h3 className="text-[28px] font-black text-white">Inquiry Received!</h3>
                      <p className="mx-auto max-w-md text-[15px] font-medium text-slate-300">
                        Thank you, {formData.firstName}! Our trade team will review your inquiry for <strong className="text-[#FDBA74]">{selectedCategory}</strong> and contact you via Email / WhatsApp within 24 hours.
                      </p>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="mt-6 rounded-full bg-[#F97316] px-8 py-3.5 text-[14px] font-black text-white hover:bg-[#EA580C] shadow-lg"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                          <label className="block text-[12px] font-black uppercase tracking-wider text-slate-300">First Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="John"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            className="mt-2 w-full rounded-xl border border-[#315671] bg-[#14314B] px-4 py-3.5 text-[14px] font-medium text-white outline-none focus:border-[#F97316]"
                          />
                        </div>

                        <div>
                          <label className="block text-[12px] font-black uppercase tracking-wider text-slate-300">Last Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="Smith"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            className="mt-2 w-full rounded-xl border border-[#315671] bg-[#14314B] px-4 py-3.5 text-[14px] font-medium text-white outline-none focus:border-[#F97316]"
                          />
                        </div>

                        <div>
                          <label className="block text-[12px] font-black uppercase tracking-wider text-slate-300">Email Address *</label>
                          <input
                            type="email"
                            required
                            placeholder="example@gmail.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="mt-2 w-full rounded-xl border border-[#315671] bg-[#14314B] px-4 py-3.5 text-[14px] font-medium text-white outline-none focus:border-[#F97316]"
                          />
                        </div>

                        <div>
                          <label className="block text-[12px] font-black uppercase tracking-wider text-slate-300">Phone / WhatsApp</label>
                          <input
                            type="tel"
                            placeholder="+971 50 123 4567"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="mt-2 w-full rounded-xl border border-[#315671] bg-[#14314B] px-4 py-3.5 text-[14px] font-medium text-white outline-none focus:border-[#F97316]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[12px] font-black uppercase tracking-wider text-slate-300">Destination Country / Target Port</label>
                        <input
                          type="text"
                          placeholder="e.g. Luanda Port, Angola / Tema Port, Ghana"
                          value={formData.destinationCountry}
                          onChange={(e) => setFormData({ ...formData, destinationCountry: e.target.value })}
                          className="mt-2 w-full rounded-xl border border-[#315671] bg-[#14314B] px-4 py-3.5 text-[14px] font-medium text-white outline-none focus:border-[#F97316]"
                        />
                      </div>

                      <div>
                        <label className="block text-[12px] font-black uppercase tracking-wider text-slate-300">Message *</label>
                        <textarea
                          rows={4}
                          required
                          placeholder="Hello, I am interested in sourcing products through AGTP Group."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="mt-2 w-full rounded-xl border border-[#315671] bg-[#14314B] p-4 text-[14px] font-medium text-white outline-none focus:border-[#F97316]"
                        />
                      </div>

                      <button
                        type="submit"
                        className="inline-flex h-[56px] w-full items-center justify-center gap-3 rounded-full bg-[#F97316] text-[16px] font-extrabold text-white transition-colors hover:bg-[#EA580C] shadow-lg hover:shadow-orange-500/20"
                      >
                        <span>Send Inquiry</span>
                        <Send className="h-5 w-5" />
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 3. Commercial Hubs Grid (Equal Height Cards) ── */}
      <section className="mx-auto max-w-[1570px] px-6 pt-24">
        <Reveal>
          <div className="rounded-[28px] border border-[#315671] bg-[#102941] p-8 md:p-12 shadow-2xl">
            <div className="text-center space-y-2 mb-10">
              <RevealEyebrow>
                <div className="inline-flex items-center gap-3 text-[12px] font-black uppercase tracking-[0.35em] text-[#FDBA74]">
                  <span className="h-px w-8 bg-[#F97316]" />
                  DUBAI COMMERCIAL LOCATIONS
                  <span className="h-px w-8 bg-[#F97316]" />
                </div>
              </RevealEyebrow>
              <RevealHeading>
                <h2 className="text-[32px] font-black text-white md:text-[44px]">
                  Commercial Trading & Stockist Hubs
                </h2>
              </RevealHeading>
            </div>

            <RevealStagger staggerDelay={80} className="grid grid-cols-1 gap-6 md:grid-cols-3 auto-rows-fr">
              {commercialHubs.map((hub) => (
                <div
                  key={hub.name}
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[24px] border border-[#315671] bg-gradient-to-b from-[#14314B] to-[#102941] p-7 shadow-xl hover:border-[#F97316] transition-all duration-300"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F97316] via-[#FDBA74] to-[#F97316] opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#F97316]/40 bg-[#0B1F33] text-[#FDBA74] group-hover:bg-[#F97316] group-hover:text-white transition-colors duration-300">
                        <Building2 className="h-6 w-6" />
                      </div>
                      <span className="rounded-full border border-[#F97316]/40 bg-[#0B1F33] px-3 py-1 text-[11px] font-black text-[#FDBA74]">
                        Dubai Hub
                      </span>
                    </div>

                    <h3 className="text-[20px] font-black text-white group-hover:text-[#FDBA74] transition-colors">
                      {hub.name}
                    </h3>

                    <div className="flex items-start gap-2 text-[13px] font-bold text-slate-300">
                      <MapPin className="h-4 w-4 text-[#F97316] shrink-0 mt-0.5" />
                      <span>{hub.location}</span>
                    </div>

                    <p className="text-[13px] font-medium leading-relaxed text-slate-400">
                      {hub.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#24445F]/60 flex items-center justify-between text-[12px] font-bold text-[#F97316]">
                    <span>{hub.timing}</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </RevealStagger>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
