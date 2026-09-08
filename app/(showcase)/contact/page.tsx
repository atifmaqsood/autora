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
import { PhoneCountryInput } from "@/components/ui/phone-country-input";
import { CountrySelect } from "@/components/ui/country-select";

const serviceCategories = [
  "Vehicle Sourcing",
  "Spare Parts Export",
  "Tyres & Engines",
  "Freight & Logistics",
  "General Inquiry"
];

const agtpLocations = [
  {
    id: "meydan-grandstand",
    tabLabel: "Meydan Grandstand",
    title: "Meydan Grandstand",
    subtitle: "Head Office — Dubai, UAE",
    lines: [
      "Meydan Grandstand, 6th Floor",
      "Meydan Road, Nad Al Sheba",
      "Dubai, U.A.E."
    ],
    fullAddress: "Meydan Grandstand, 6th Floor, Meydan Road, Nad Al Sheba, Dubai, U.A.E.",
    phone: "+971 58 58 55729",
    whatsapp: "+971 58 58 55729",
    timing: "Mon - Sat: 9:00 AM - 8:00 PM",
    mapQuery: "Meydan+Grandstand,+Meydan+Road,+Nad+Al+Sheba,+Dubai,+United+Arab+Emirates"
  },
  {
    id: "vehicle-sales",
    tabLabel: "Vehicle Sales Hub",
    title: "Vehicle Sales & Export",
    subtitle: "Commercial Operations Desk",
    lines: [
      "Meydan Grandstand Commercial Complex",
      "Meydan Road, Nad Al Sheba",
      "Dubai, U.A.E."
    ],
    fullAddress: "Meydan Road, Nad Al Sheba, Dubai, United Arab Emirates",
    phone: "+971 58 58 55729",
    whatsapp: "+971 58 58 55729",
    timing: "Mon - Sat: 9:00 AM - 8:00 PM",
    mapQuery: "Meydan+Grandstand,+Nad+Al+Sheba,+Dubai"
  },
  {
    id: "spare-parts",
    tabLabel: "Spare Parts Hub",
    title: "Spare Parts Division",
    subtitle: "Genuine Parts & Components",
    lines: [
      "AGTP Spare Parts Distribution Hub",
      "Industrial Area / Meydan Logistics",
      "Dubai, U.A.E."
    ],
    fullAddress: "Meydan Grandstand Logistics Desk, Dubai, United Arab Emirates",
    phone: "+971 58 58 55729",
    whatsapp: "+971 58 58 55729",
    timing: "Mon - Sat: 9:00 AM - 8:00 PM",
    mapQuery: "Meydan+Grandstand,+Dubai,+United+Arab+Emirates"
  },
  {
    id: "jebel-ali",
    tabLabel: "Jebel Ali Export Yard",
    title: "Jebel Ali Port Yard",
    subtitle: "Global Container & Ro-Ro Shipping",
    lines: [
      "Jebel Ali Port / Free Zone Area",
      "International Vehicle & Cargo Staging",
      "Dubai, U.A.E."
    ],
    fullAddress: "Jebel Ali Port Trade Staging, Dubai, United Arab Emirates",
    phone: "+971 58 58 55729",
    whatsapp: "+971 58 58 55729",
    timing: "Mon - Sat: 8:30 AM - 7:30 PM",
    mapQuery: "Jebel+Ali+Port,+Dubai,+United+Arab+Emirates"
  },
  {
    id: "trade-documentation",
    tabLabel: "Export Documentation",
    title: "Trade & Customs Desk",
    subtitle: "Inspection, COC & Export Clearance",
    lines: [
      "Meydan Grandstand, Executive Floor",
      "Customs & Export Documentation",
      "Dubai, U.A.E."
    ],
    fullAddress: "Meydan Grandstand, Meydan Road, Nad Al Sheba, Dubai, U.A.E.",
    phone: "+971 58 58 55729",
    whatsapp: "+971 58 58 55729",
    timing: "Mon - Sat: 9:00 AM - 7:00 PM",
    mapQuery: "Meydan+Grandstand,+Meydan+Road,+Nad+Al+Sheba,+Dubai"
  },
  {
    id: "commercial-logistics",
    tabLabel: "Commercial Logistics",
    title: "Global Logistics Desk",
    subtitle: "Freight Forwarding & Shipping Operations",
    lines: [
      "Meydan Grandstand, Trade Office",
      "Air, Sea & Land Logistics Coordination",
      "Dubai, U.A.E."
    ],
    fullAddress: "Meydan Grandstand, Nad Al Sheba, Dubai, U.A.E.",
    phone: "+971 58 58 55729",
    whatsapp: "+971 58 58 55729",
    timing: "Mon - Sat: 9:00 AM - 8:00 PM",
    mapQuery: "Meydan+Grandstand,+Dubai"
  },
  {
    id: "customer-support",
    tabLabel: "Customer Support",
    title: "Dedicated Client Desk",
    subtitle: "Order Tracking & Post-Sale Assistance",
    lines: [
      "Online Support & Executive Offices",
      "Meydan Grandstand, 6th Floor",
      "Dubai, U.A.E."
    ],
    fullAddress: "Meydan Grandstand, Nad Al Sheba, Dubai, UAE",
    phone: "+971 58 58 55729",
    whatsapp: "+971 58 58 55729",
    timing: "Mon - Sat: 9:00 AM - 8:00 PM",
    mapQuery: "Meydan+Grandstand,+Meydan+Road,+Nad+Al+Sheba,+Dubai"
  },
  {
    id: "global-inquiries",
    tabLabel: "Global Inquiries Desk",
    title: "International Trade Desk",
    subtitle: "Serving 45+ Countries Worldwide",
    lines: [
      "Meydan Grandstand, 6th Floor",
      "Meydan Road, Nad Al Sheba",
      "Dubai, U.A.E."
    ],
    fullAddress: "Meydan Grandstand, Meydan Road, Nad Al Sheba, Dubai, U.A.E.",
    phone: "+971 58 58 55729",
    whatsapp: "+971 58 58 55729",
    timing: "Mon - Sat: 9:00 AM - 8:00 PM",
    mapQuery: "Meydan+Grandstand,+Meydan+Road,+Nad+Al+Sheba,+Dubai"
  }
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("Vehicle Sourcing");
  const [selectedLocation, setSelectedLocation] = useState(agtpLocations[0]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "+244 946 123 456",
    destinationCountry: "Angola",
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

                        <PhoneCountryInput
                          id="contact-phone"
                          label="Phone (with Country Code) *"
                          required
                          value={formData.phone}
                          onChange={(phone) => setFormData({ ...formData, phone })}
                        />
                      </div>

                      <CountrySelect
                        id="contact-country"
                        label="Destination Country *"
                        required
                        value={formData.destinationCountry}
                        defaultValue="Angola"
                        placeholder="Enter your country"
                        onChange={(destinationCountry) => setFormData({ ...formData, destinationCountry })}
                      />

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

      {/* ── 3. Our Location: Interactive Map & Commercial Hubs ── */}
      <section className="mx-auto max-w-[1570px] px-6 pt-24">
        <Reveal>
          <div className="text-center space-y-3 mb-12">
            <RevealEyebrow>
              <div className="inline-flex items-center gap-3 text-[12px] font-black uppercase tracking-[0.25em] text-[#60A5FA]">
                <span className="h-px w-8 bg-[#3B82F6]" />
                OUR LOCATION
                <span className="h-px w-8 bg-[#3B82F6]" />
              </div>
            </RevealEyebrow>
            <RevealHeading>
              <h2 className="text-[36px] font-black tracking-tight text-white md:text-[52px]">
                Find AGTP Group in Dubai
              </h2>
            </RevealHeading>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8 items-stretch">
            {/* LEFT: Interactive Google Map */}
            <div className="lg:col-span-6 xl:col-span-7 flex flex-col">
              <div className="relative h-full min-h-[480px] lg:min-h-[580px] w-full overflow-hidden rounded-[28px] border border-[#1d2d44] bg-[#0c1626] shadow-2xl">
                <iframe
                  title="AGTP Group Location Map"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(
                    selectedLocation.fullAddress
                  )}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                  className="h-full w-full border-0 min-h-[480px] lg:min-h-[580px]"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* RIGHT: Location Selector & Active Details */}
            <div className="lg:col-span-6 xl:col-span-5 flex flex-col">
              <div className="flex h-full flex-col justify-between rounded-[28px] border border-[#1d2d44] bg-[#0c1626] p-6 sm:p-8 shadow-2xl">
                <div>
                  {/* Tab Selector Grid (2 Columns) */}
                  <div className="grid grid-cols-2 gap-3">
                    {agtpLocations.map((loc) => {
                      const isSelected = selectedLocation.id === loc.id;
                      return (
                        <button
                          key={loc.id}
                          type="button"
                          onClick={() => setSelectedLocation(loc)}
                          className={`flex items-center rounded-xl px-4 py-3.5 text-left text-[13px] sm:text-[14px] font-bold transition-all duration-200 border ${
                            isSelected
                              ? "border-[#3B82F6] bg-[#173863] text-white shadow-lg shadow-blue-950/50"
                              : "border-[#1c2e44] bg-[#0b1828] text-slate-300 hover:border-[#3B82F6]/40 hover:bg-[#0f2238] hover:text-white"
                          }`}
                        >
                          <span className="truncate">{loc.tabLabel}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Location Details Card */}
                  <div className="mt-6 rounded-2xl border border-[#1c2e44] bg-[#081322]/90 p-6 sm:p-7 space-y-6">
                    <div>
                      <h3 className="text-[26px] sm:text-[28px] font-black text-white tracking-tight">
                        {selectedLocation.title}
                      </h3>
                      <p className="mt-1 text-[12px] font-bold uppercase tracking-wider text-[#38BDF8]">
                        {selectedLocation.subtitle}
                      </p>
                    </div>

                    <div className="space-y-1 text-[15px] font-medium text-slate-300">
                      {selectedLocation.lines.map((line, idx) => (
                        <p key={idx} className="leading-snug text-slate-300">
                          {line}
                        </p>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                      <a
                        href={`tel:${selectedLocation.phone.replace(/\s+/g, "")}`}
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-blue-500/40 bg-[#16355C] px-5 py-3 text-[14px] sm:text-[15px] font-bold text-white shadow-md hover:bg-blue-600 transition-colors"
                      >
                        <Phone className="h-4 w-4 text-blue-400" />
                        <span>Call: {selectedLocation.phone}</span>
                      </a>

                      <a
                        href={`https://wa.me/${selectedLocation.whatsapp.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-500/40 bg-[#0B3828] px-5 py-3 text-[14px] sm:text-[15px] font-bold text-emerald-300 hover:text-white hover:bg-[#0f4d37] shadow-md transition-colors"
                      >
                        <MessageCircle className="h-4 w-4 text-emerald-400" />
                        <span>WhatsApp: {selectedLocation.whatsapp}</span>
                      </a>
                    </div>

                    <div className="pt-4 border-t border-[#1c2e44] flex items-center justify-between text-[13px]">
                      <span className="text-slate-400 font-medium flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-[#38BDF8]" />
                        {selectedLocation.timing}
                      </span>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          selectedLocation.fullAddress
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-bold text-[#38BDF8] hover:text-blue-300 transition-colors"
                      >
                        <span>Get Directions</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
