"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, Send, CheckCircle2, MessageCircle } from "lucide-react";
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

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [activeLocation, setActiveLocation] = useState(0);

  const locations = [
    {
      name: "Head Office",
      address: "Head Office, Samari Retail, Dubai, UAE",
      phone: "+971 58 585729",
      whatsapp: "+971 58 585729"
    },
    {
      name: "Reach Us",
      address: "Reach Us, Ducamz, Ras Al Khor, Dubai, UAE",
      phone: "+971 58 585729",
      whatsapp: "+971 58 585729"
    },
    {
      name: "Automotive",
      address: "Automotive, Auto Market, Al Aweer, Dubai, UAE",
      phone: "+971 58 585729",
      whatsapp: "+971 58 585729"
    },
    {
      name: "Automotive2",
      address: "Automotive2, Ducamz, Ras Al Khor, Dubai, UAE",
      phone: "+971 58 585729",
      whatsapp: "+971 58 585729"
    },
    {
      name: "Construction Materials",
      address: "Construction Materials, Ducamz, Ras Al Khor, Dubai, UAE",
      phone: "+971 58 585729",
      whatsapp: "+971 58 585729"
    },
    {
      name: "General Merchandise",
      address: "General Merchandise, Ducamz, Ras Al Khor, Dubai, UAE",
      phone: "+971 58 585729",
      whatsapp: "+971 58 585729"
    },
    {
      name: "Furniture And Home Items",
      address: "Home decor, furniture, and home-item sourcing",
      phone: "+971 58 585729",
      whatsapp: "+971 58 585729"
    },
    {
      name: "Electronics",
      address: "Phase 6, Electronics, Pakistan",
      phone: "+971 58 585729",
      whatsapp: "+971 58 585729"
    }
  ];

  const selectedLoc = locations[activeLocation];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    vehicleChoice: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
  };

  return (
    <div className="space-y-0 pb-20 bg-[#0B1F33] text-white">
      {/* ── 1. Hero Header with Parallax ───────────────────────────── */}
      <section className="relative min-h-[85vh] bg-[#081A2B] border-b border-slate-800/80 overflow-hidden flex flex-col justify-center pt-28 pb-12">
        <ParallaxImage
          src={agtpAssets.contactHero}
          alt="Contact Header"
          overlayOpacity="opacity-50"
          speed={0.25}
          className="absolute inset-0 w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#081A2B]/90 via-[#081A2B]/60 to-transparent z-10" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
            <Link href="/" className="hover:text-white transition-colors">HOME</Link>
            <span>/</span>
            <span className="text-[#F97316]">CONTACT</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white font-sans max-w-3xl leading-none drop-shadow-lg">
            GET IN TOUCH WITH US
          </h1>

          <p className="text-sm sm:text-base text-slate-200 max-w-xl leading-relaxed drop-shadow-md">
            For enquiries and more information, contact AGTP GROUP for reliable sourcing, competitive pricing, and efficient logistics.
          </p>
        </div>
      </section>

      {/* ── 2. DROP YOUR QUERY HERE Form Card ─────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <Reveal className="bg-[#102941] border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl">
          {submitted ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                Inquiry Received
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you for contacting AGTP GROUP. Our team will review your query and respond with sourcing, pricing, and logistics information.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="border border-slate-700 hover:bg-slate-800 text-white font-bold text-xs px-6 py-2.5 rounded-full transition-all"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <RevealEyebrow>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    <span className="w-6 h-[1.5px] bg-[#F97316]" />
                    DROP YOUR QUERY HERE
                  </div>
                </RevealEyebrow>

                <RevealHeading>
                  <h2 className="text-2xl sm:text-4xl font-black text-white uppercase font-sans">
                    Drop Your Query Here
                  </h2>
                </RevealHeading>
              </div>

              <RevealStagger staggerDelay={60} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#0B1F33] border border-slate-800 text-xs text-white placeholder-slate-600 px-4 py-3 rounded-xl focus:outline-none focus:border-[#F97316] font-medium"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#0B1F33] border border-slate-800 text-xs text-white placeholder-slate-600 px-4 py-3 rounded-xl focus:outline-none focus:border-[#F97316] font-medium"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+971 50 000 0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#0B1F33] border border-slate-800 text-xs text-white placeholder-slate-600 px-4 py-3 rounded-xl focus:outline-none focus:border-[#F97316] font-medium"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    Destination Country
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Kenya, Ghana, Nigeria, UAE"
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    className="w-full bg-[#0B1F33] border border-slate-800 text-xs text-white placeholder-slate-600 px-4 py-3 rounded-xl focus:outline-none focus:border-[#F97316] font-medium"
                  />
                </div>

                <div className="lg:col-span-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    Product / Service Required
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Spare parts, automotive export, construction materials, electronics"
                    value={formData.vehicleChoice}
                    onChange={(e) => setFormData({ ...formData, vehicleChoice: e.target.value })}
                    className="w-full bg-[#0B1F33] border border-slate-800 text-xs text-white placeholder-slate-600 px-4 py-3 rounded-xl focus:outline-none focus:border-[#F97316] font-medium"
                  />
                </div>

                <div className="sm:col-span-2 lg:col-span-3">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your enquiry, required products, quantity, and destination..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#0B1F33] border border-slate-800 text-xs text-white placeholder-slate-600 p-4 rounded-xl focus:outline-none focus:border-[#F97316] font-medium"
                  />
                </div>
              </RevealStagger>

              <RevealButton delay={200}>
                <button
                  type="submit"
                  className="bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs px-10 py-3.5 rounded-full shadow-lg transition-all flex items-center gap-2"
                >
                  <span>Send</span>
                  <Send className="w-4 h-4" />
                </button>
              </RevealButton>
            </form>
          )}
        </Reveal>
      </section>

      {/* ── 3. CONTACT US — Interactive Location Tabs ──────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28">
        <div className="text-center max-w-xl mx-auto space-y-3 mb-14">
          <RevealEyebrow>
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <span className="w-6 h-[1.5px] bg-[#F97316]" />
              CONTACT US
            </div>
          </RevealEyebrow>

          <RevealHeading>
            <h2 className="text-3xl sm:text-5xl font-black text-white font-sans">
              Get in touch with us
            </h2>
          </RevealHeading>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column Map / Image Preview */}
          <div className="lg:col-span-6 relative aspect-[4/3] rounded-3xl overflow-hidden border border-slate-800 bg-[#102941] shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80"
              alt="Location Hub"
              fill
              className="object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#102941] via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 bg-[#0B1F33]/90 border border-slate-700 backdrop-blur-md p-5 rounded-2xl flex items-center gap-3">
              <MapPin className="w-6 h-6 text-[#F97316] shrink-0" />
              <div>
                <span className="text-xs font-bold text-white block">{selectedLoc.name}</span>
                <span className="text-[11px] text-slate-400">{selectedLoc.address}</span>
              </div>
            </div>
          </div>

          {/* Right Column Location Tabs & Info Box */}
          <div className="lg:col-span-6 space-y-6">
            {/* Location Pill Selector Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {locations.map((loc, idx) => (
                <button
                  key={loc.name}
                  onClick={() => setActiveLocation(idx)}
                  className={`text-[11px] font-bold py-2.5 px-3 rounded-xl border transition-all text-center truncate ${
                    activeLocation === idx
                      ? "bg-[#F97316] border-[#F97316] text-white shadow-lg"
                      : "bg-[#102941] border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                  }`}
                >
                  {loc.name}
                </button>
              ))}
            </div>

            {/* Selected Location Details Card */}
            <div className="bg-[#102941] border border-slate-800 rounded-3xl p-8 space-y-6 shadow-xl">
              <div className="space-y-1">
                <h3 className="text-2xl font-black text-white">{selectedLoc.name}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{selectedLoc.address}</p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={`tel:${selectedLoc.phone}`}
                  className="border border-[#F97316]/80 text-[#FDBA74] hover:bg-[#EA580C] hover:text-white text-xs font-bold px-5 py-2.5 rounded-full transition-all flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call: {selectedLoc.phone}</span>
                </a>

                <a
                  href={`https://wa.me/${selectedLoc.whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-emerald-500/80 text-emerald-400 hover:bg-emerald-600 hover:text-white text-xs font-bold px-5 py-2.5 rounded-full transition-all flex items-center gap-2"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp: {selectedLoc.whatsapp}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}




