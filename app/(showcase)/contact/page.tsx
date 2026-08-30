"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  Facebook,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
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

const serviceCategories = [
  "Vehicle Sourcing",
  "Spare Parts Export",
  "Tyres & Engines",
  "Freight & Logistics",
  "General Inquiry"
];

const commercialHubs = [
  {
    hub: "Dubai Hub",
    name: "Vehicle Sales & Export",
    location: "Meydan Grandstand, Dubai, UAE",
    desc: "Vehicle sales and export support for new and pre-owned vehicles worldwide.",
    timing: "Mon - Sat: 9:00AM - 8:00PM"
  },
  {
    hub: "Sharjah Hub",
    name: "Spare Parts & Components",
    location: "Sharjah Media City, Sharjah, UAE",
    desc: "Automotive spare parts, components, and replacement parts for various vehicle brands.",
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
    if (!formData.firstName || !formData.email || !formData.phone) return;
    setSubmitted(true);
  };

  return (
    <div className="bg-[#060709] pb-24 text-white">
      {/* ── 1. Hero Header Banner ── */}
      <PageHero
        breadcrumbs={[
          { label: "HOME", href: "/" },
          { label: "CONTACT" }
        ]}
        badge={{
          text: "ONLINE DESK — TYPICAL RESPONSE: 30 MINS"
        }}
        title="HOW CAN WE HELP?"
        subtitle="Looking to purchase products from Dubai? Share your requirements, and our team will provide availability, competitive pricing, and export details."
        imageSrc={agtpAssets.contactHero}
        imageAlt="AGTP Group Headquarters"
      />

      {/* ── 2. Split Layout: Interactive Communication Hub & Form Portal ── */}
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
                        href="https://wa.me/971585855729"
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
                <div className="border-t border-[#24445F] pt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <span className="block text-[11px] font-black uppercase tracking-wider text-slate-400">Follow Us</span>
                    <span className="text-[13px] font-semibold text-slate-300">Official AGTP Group Channels</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href="https://www.facebook.com/agtpgroup"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#315671] bg-[#14314B] text-slate-300 hover:border-[#F97316] hover:text-[#F97316] transition-colors"
                      title="Facebook"
                      aria-label="Facebook"
                    >
                      <Facebook className="h-4 w-4" />
                    </a>
                    <a
                      href="https://www.instagram.com/agtpgroup/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#315671] bg-[#14314B] text-slate-300 hover:border-[#F97316] hover:text-[#F97316] transition-colors"
                      title="Instagram"
                      aria-label="Instagram"
                    >
                      <Instagram className="h-4 w-4" />
                    </a>
                    <a
                      href="https://www.linkedin.com/company/agtp-group-l-l-c/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#315671] bg-[#14314B] text-slate-300 hover:border-[#F97316] hover:text-[#F97316] transition-colors"
                      title="LinkedIn"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                    <a
                      href="https://wa.me/971585855729"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#315671] bg-[#14314B] text-slate-300 hover:border-[#F97316] hover:text-[#F97316] transition-colors"
                      title="WhatsApp"
                      aria-label="WhatsApp"
                    >
                      <MessageCircle className="h-4 w-4" />
                    </a>
                    <a
                      href="mailto:inquiries@agtpgroup.com"
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#315671] bg-[#14314B] text-slate-300 hover:border-[#F97316] hover:text-[#F97316] transition-colors"
                      title="Email Us"
                      aria-label="Email Us"
                    >
                      <Mail className="h-4 w-4" />
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
                        Tell Us What You Need
                      </div>
                    </RevealEyebrow>

                    <RevealHeading>
                      <h2 className="text-[28px] font-black text-white md:text-[38px]">
                        Find the Right Product
                      </h2>
                    </RevealHeading>

                    <RevealText delay={100}>
                      <p className="text-[14px] font-medium leading-relaxed text-slate-300">
                        Share a few details about the product you need, and our team will get back to you with availability and pricing.
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
                          <label className="block text-[12px] font-black uppercase tracking-wider text-slate-300">Phone / WhatsApp *</label>
                          <input
                            type="tel"
                            required
                            placeholder="+244 946 123 456"
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
                          placeholder="Hello, I’m interested in purchasing products from AGTP Group. Please share pricing and availability."
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

      {/* ── 3. Commercial Hubs Grid (2 Equal Cards) ── */}
      <section className="mx-auto max-w-[1570px] px-6 pt-24">
        <Reveal>
          <div className="rounded-[28px] border border-[#315671] bg-[#102941] p-8 md:p-12 shadow-2xl">
            <div className="text-center space-y-2 mb-10">
              <RevealEyebrow>
                <div className="inline-flex items-center gap-3 text-[12px] font-black uppercase tracking-[0.35em] text-[#FDBA74]">
                  <span className="h-px w-8 bg-[#F97316]" />
                  AGTP UAE Locations:
                  <span className="h-px w-8 bg-[#F97316]" />
                </div>
              </RevealEyebrow>
              <RevealHeading>
                <h2 className="text-[32px] font-black uppercase text-white md:text-[44px]">
                  OUR COMMERCIAL LOCATIONS
                </h2>
              </RevealHeading>
            </div>

            <RevealStagger staggerDelay={80} className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 auto-rows-fr">
              {commercialHubs.map((hub) => (
                <div
                  key={hub.name}
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[24px] border border-[#315671] bg-gradient-to-b from-[#14314B] to-[#102941] p-8 shadow-xl hover:border-[#F97316] transition-all duration-300"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F97316] via-[#FDBA74] to-[#F97316] opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#315671] bg-[#0B1F33] text-[#F97316] group-hover:border-[#F97316] group-hover:bg-[#14314B] group-hover:shadow-[0_0_15px_rgba(249,115,22,0.25)] transition-all duration-300">
                        <Building2 className="h-6 w-6 text-[#F97316] stroke-[2.2] transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      <span className="rounded-full border border-[#F97316]/40 bg-[#0B1F33] px-3.5 py-1 text-[11px] font-black text-[#FDBA74]">
                        {hub.hub}
                      </span>
                    </div>

                    <h3 className="text-[22px] font-black text-white group-hover:text-[#FDBA74] transition-colors">
                      {hub.name}
                    </h3>

                    <div className="flex items-start gap-2 text-[14px] font-bold text-slate-300">
                      <MapPin className="h-4 w-4 text-[#F97316] shrink-0 mt-0.5" />
                      <span>{hub.location}</span>
                    </div>

                    <p className="text-[14px] font-medium leading-relaxed text-slate-400">
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
