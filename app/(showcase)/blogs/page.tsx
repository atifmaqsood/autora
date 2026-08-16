"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Send } from "lucide-react";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { agtpAssets } from "@/src/assets";
import {
  RevealHeading,
  RevealText,
  RevealButton,
  RevealEyebrow,
  RevealStagger
} from "@/components/ui/scroll-reveal";

export default function BlogsPage() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const blogPosts = [
    {
      id: 1,
      title: "LHD vs RHD Vehicles: Complete Guide for Africa & Asia 2026",
      category: "UNCATEGORIZED",
      date: "AUGUST 3, 2026",
      excerpt: "LHD and RHD vehicles is one of the first decisions any international vehicle buyer must make. Get it wrong, and you risk custom rejection or non-compliance.",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "The Secret Behind Dubai's Car Export Dominance: AGTP GROUP's 2026 Playbook",
      category: "UNCATEGORIZED",
      date: "JULY 25, 2026",
      excerpt: "Every 30 seconds, a vehicle leaves Dubai bound for another continent, and AGTP GROUP is one of the engines powering that global fleet pipeline.",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Common Car Export Scams & How to Avoid Them",
      category: "UNCATEGORIZED",
      date: "JULY 25, 2026",
      excerpt: "The global car export market continues to grow, especially across Africa and emerging regions, but with this growth comes an increase in wire fraud and fake documentation.",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      title: "Importing Vehicles from Dubai to Senegal with AGTP GROUP: Everything You Need to Know",
      category: "UNCATEGORIZED",
      date: "JULY 25, 2026",
      excerpt: "Dubai has become one of the most trusted global hubs for vehicle exports, and Senegal is among the fastest-growing destinations for imported SUVs.",
      image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      title: "The Vision Behind AGTP GROUP: Building a Global Automotive Ecosystem",
      category: "UNCATEGORIZED",
      date: "JULY 25, 2026",
      excerpt: "A Dream That Started Beyond Cars. Every great company begins with a bold idea, but AGTP GROUP was built on something far more lasting.",
      image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 6,
      title: "AGTP GROUP Expands into Europe with Strategic Belgium Showroom",
      category: "UNCATEGORIZED",
      date: "JULY 25, 2026",
      excerpt: "AGTP GROUP is accelerating its global footprint with a strategic move into Europe, marked by the launch of its Belgium showroom hub.",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 7,
      title: "Best SUVs for South American Roads: Specification-Based Guide",
      category: "UNCATEGORIZED",
      date: "JULY 25, 2026",
      excerpt: "Toyota Land Cruiser — Built for Extreme Durability. The Toyota Land Cruiser is one of the most reliable SUVs for South American mountain routes.",
      image: "https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 8,
      title: "Best UAE Vehicle Export to Africa in 2026: Why Dubai is the Top Sourcing Hub",
      category: "UNCATEGORIZED",
      date: "JULY 24, 2026",
      excerpt: "If you are sourcing vehicles for export to Africa, where you buy matters as much as what you buy. Pricing, documentation, shipping speed, and spec compliance matter.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 9,
      title: "Toyota Land Cruiser LC79 Double Cabin 2026: Built for the Toughest Jobs",
      category: "UNCATEGORIZED",
      date: "MAY 19, 2026",
      excerpt: "A Legacy That Continues in 2026. The Toyota Land Cruiser LC79 Double Cabin 2026 represents the continuation of one of the most rugged commercial platforms ever engineered.",
      image: "https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="space-y-0 pb-20 bg-[#0B1F33] text-white">
      {/* ── 1. Hero Header with Parallax ───────────────────────────── */}
      <section className="relative min-h-[85vh] bg-[#081A2B] border-b border-slate-800/80 overflow-hidden flex flex-col justify-center pt-28 pb-12">
        <ParallaxImage
          src={agtpAssets.blogsHero}
          alt="Blogs Header"
          overlayOpacity="opacity-50"
          speed={0.25}
          className="absolute inset-0 w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#081A2B]/90 via-[#081A2B]/60 to-transparent z-10" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
            <Link href="/" className="hover:text-white transition-colors">HOME</Link>
            <span>/</span>
            <span className="text-[#F97316]">BLOGS</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white font-sans max-w-3xl leading-none drop-shadow-lg">
            EXPORT INSIGHTS & GUIDES
          </h1>

          <p className="text-sm sm:text-base text-slate-200 max-w-xl leading-relaxed drop-shadow-md">
            Practical knowledge on shipping, compliance and sourcing — straight from our trade desk.
          </p>
        </div>
      </section>

      {/* ── 2. Blog Posts Grid ─────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <RevealStagger staggerDelay={80} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="group bg-[#102941] border border-slate-800 rounded-3xl overflow-hidden flex flex-col justify-between shadow-xl hover:border-[#F97316] transition-all duration-300"
            >
              <div className="space-y-4">
                {/* Image Header */}
                <div className="relative aspect-[16/10] w-full bg-slate-900 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <span>{post.category}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>

                  <h3 className="text-base font-black text-white leading-snug group-hover:text-[#FDBA74] transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Bottom Link */}
              <div className="px-6 pb-6 pt-2">
                <Link
                  href="#"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-[#F97316] transition-colors"
                >
                  <span>Read article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </RevealStagger>
      </section>

      {/* ── 3. STAY IN THE LOOP Newsletter Banner ─────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28">
        <div className="relative bg-[#102941] border border-slate-800 rounded-3xl p-10 sm:p-16 text-center overflow-hidden shadow-2xl">
          <ParallaxImage
            src={agtpAssets.exportPort}
            alt="Port Background"
            overlayOpacity="opacity-45"
            speed={0.2}
            className="absolute inset-0 w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#102941]/80 via-[#102941]/60 to-[#102941] z-10" />

          <div className="relative z-20 max-w-2xl mx-auto space-y-6">
            <RevealEyebrow>
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#F97316] uppercase tracking-widest">
                <span className="w-6 h-[1.5px] bg-[#F97316]" />
                STAY IN THE LOOP
              </div>
            </RevealEyebrow>

            <RevealHeading>
              <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight leading-tight font-sans">
                GET THE LATEST INSIGHTS, STRAIGHT IN YOUR INBOX
              </h2>
            </RevealHeading>

            <RevealText delay={120}>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Monthly guides on shipping, compliance and market demand. No spam.
              </p>
            </RevealText>

            <RevealButton delay={180}>
              {subscribed ? (
                <div className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 p-4 rounded-2xl text-xs font-bold">
                  Thank you for subscribing to AGTP GROUP Export Insights!
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (email) setSubscribed(true);
                  }}
                  className="flex flex-col sm:flex-row items-center gap-3 pt-2 max-w-md mx-auto"
                >
                  <input
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#0B1F33] border border-slate-800 text-xs text-white placeholder-slate-600 px-5 py-3 rounded-full focus:outline-none focus:border-[#F97316] font-medium"
                  />
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs px-8 py-3 rounded-full shadow-lg transition-all shrink-0 flex items-center justify-center gap-2"
                  >
                    <span>Subscribe</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </RevealButton>
          </div>
        </div>
      </section>
    </div>
  );
}


