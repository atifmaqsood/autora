"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, Star, Users, UserCheck, ArrowRight, Mail } from "lucide-react";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { agtpAssets } from "@/src/assets";
import {
  RevealHeading,
  RevealText,
  RevealButton,
  RevealEyebrow,
  RevealStagger
} from "@/components/ui/scroll-reveal";

export default function CareersPage() {
  return (
    <div className="space-y-0 pb-20 bg-[#070b14] text-white">
      {/* ── 1. Hero Header with Parallax ───────────────────────────── */}
      <section className="relative min-h-[85vh] bg-[#050811] border-b border-slate-800/80 overflow-hidden flex flex-col justify-center pt-28 pb-12">
        <ParallaxImage
          src={agtpAssets.careersHero}
          alt="Careers Header"
          overlayOpacity="opacity-50"
          speed={0.25}
          className="absolute inset-0 w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050811]/90 via-[#050811]/60 to-transparent z-10" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
            <Link href="/" className="hover:text-white transition-colors">HOME</Link>
            <span>/</span>
            <span className="text-indigo-400">CAREERS</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white font-sans max-w-3xl leading-none drop-shadow-lg">
            BUILD A CAREER THAT LASTS AGTP GROUP
          </h1>

          <p className="text-sm sm:text-base text-slate-200 max-w-xl leading-relaxed drop-shadow-md">
            Join a global export team that moves vehicles — and people&apos;s careers — forward.
          </p>
        </div>
      </section>

      {/* ── 2. WHY AGTP GROUP — Core Values Grid ──────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="text-center max-w-xl mx-auto space-y-3 mb-14">
          <RevealEyebrow>
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <span className="w-6 h-[1.5px] bg-indigo-500" />
              WHY AGTP GROUP
            </div>
          </RevealEyebrow>

          <RevealHeading>
            <h2 className="text-3xl sm:text-5xl font-black text-white font-sans">
              A workplace built on the same values as our business
            </h2>
          </RevealHeading>

          <RevealText delay={120}>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Integrity, accountability and long-term relationships — with our people just as much as our partners.
            </p>
          </RevealText>
        </div>

        <RevealStagger staggerDelay={100} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Eye,
              title: "Global exposure",
              desc: "Work with partners across 90+ countries and learn international trade first-hand."
            },
            {
              icon: Star,
              title: "Real growth",
              desc: "Clear progression, mentorship from industry veterans and the room to own your work."
            },
            {
              icon: Users,
              title: "A team that backs you",
              desc: "A diverse, supportive crew that celebrates wins together and has your back."
            }
          ].map((item) => (
            <div key={item.title} className="bg-[#0b0f19] border border-slate-800 rounded-3xl p-8 space-y-4 hover:border-indigo-500 transition-all duration-300 shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">{item.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </RevealStagger>
      </section>

      {/* ── 3. OPEN ROLES — Current Opportunities ─────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28">
        <div className="space-y-3 mb-10">
          <RevealEyebrow>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <span className="w-6 h-[1.5px] bg-indigo-500" />
              OPEN ROLES
            </div>
          </RevealEyebrow>

          <RevealHeading>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-sans">
              Current opportunities
            </h2>
          </RevealHeading>

          <RevealText delay={120}>
            <p className="text-xs text-slate-400">
              Click a role to read the full description and apply.
            </p>
          </RevealText>
        </div>

        {/* Roles List */}
        <RevealStagger staggerDelay={80} className="space-y-4">
          <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-6 flex items-center justify-between shadow-xl hover:border-indigo-500 transition-all duration-200">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-indigo-400 flex items-center justify-center border border-slate-800">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Senior Accountant</h3>
                <span className="text-xs text-slate-400">Finance & Accounting • Dubai Headquarters</span>
              </div>
            </div>

            <a
              href="mailto:careers@agtpgroup.com?subject=Application%20for%20Senior%20Accountant"
              className="border border-slate-700 hover:bg-indigo-600 hover:border-indigo-600 text-white font-bold text-xs px-6 py-2.5 rounded-full transition-all flex items-center gap-1.5"
            >
              <span>View role</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </RevealStagger>
      </section>

      {/* ── 4. DIDN'T FIND THE RIGHT FIT? Banner ─────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28">
        <div className="relative bg-[#0b0f19] border border-slate-800 rounded-3xl p-10 sm:p-16 text-center overflow-hidden shadow-2xl">
          <ParallaxImage
            src={agtpAssets.careersHero}
            alt="Office Environment"
            overlayOpacity="opacity-45"
            speed={0.2}
            className="absolute inset-0 w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b0f19]/80 via-[#0b0f19]/60 to-[#0b0f19] z-10" />

          <div className="relative z-20 max-w-2xl mx-auto space-y-6">
            <RevealHeading>
              <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight leading-tight font-sans">
                DIDN&apos;T FIND THE RIGHT FIT?
              </h2>
            </RevealHeading>

            <RevealText delay={120}>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                We&apos;re growing fast. Send us your CV and tell us how you&apos;d like to contribute — we read every application.
              </p>
            </RevealText>

            <RevealButton delay={180}>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <a
                  href="mailto:careers@agtpgroup.com"
                  className="bg-[#5271ff] hover:bg-[#4361ee] text-white font-bold text-xs px-8 py-3.5 rounded-full shadow-lg transition-all flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email: careers@agtpgroup.com</span>
                </a>
                <Link href="/contact">
                  <button className="border border-slate-700 hover:bg-slate-800 text-white font-bold text-xs px-8 py-3.5 rounded-full transition-all">
                    Contact Us
                  </button>
                </Link>
              </div>
            </RevealButton>
          </div>
        </div>
      </section>
    </div>
  );
}


