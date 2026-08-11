import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Reveal, RevealEyebrow, RevealHeading, RevealStagger, RevealText } from "@/components/ui/scroll-reveal";
import type { businessSolutions } from "@/lib/agtp/content";
import { agtpAssets } from "@/src/assets";

type BusinessSolution = (typeof businessSolutions)[number];

export function BusinessSolutionDetail({ solution }: { solution: BusinessSolution }) {
  return (
    <div className="bg-[#070b14] pb-20 text-white">
      <section className="relative flex min-h-[82vh] flex-col justify-center overflow-hidden border-b border-slate-800/80 bg-[#050811] px-4 pt-32 sm:px-6 lg:px-8">
        <Image src={agtpAssets.exportPort} alt={solution.title} fill priority className="object-cover opacity-35" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050811] via-[#050811]/80 to-[#050811]/25" />
        <div className="relative z-10 mx-auto w-full max-w-7xl space-y-5">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <Link href="/" className="hover:text-white">HOME</Link>
            <span>/</span>
            <Link href="/business-solutions" className="hover:text-white">BUSINESS SOLUTIONS</Link>
            <span>/</span>
            <span className="text-indigo-400">{solution.title}</span>
          </div>
          <RevealEyebrow>
            <div className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.28em] text-[#9fb0ff]">
              <span className="h-px w-9 bg-[#536dfe]" />
              {solution.eyebrow}
            </div>
          </RevealEyebrow>
          <RevealHeading>
            <h1 className="max-w-5xl text-5xl font-black uppercase leading-[0.96] sm:text-7xl">
              {solution.heading}
            </h1>
          </RevealHeading>
          <RevealText>
            <p className="max-w-2xl text-base font-semibold leading-relaxed text-slate-300">{solution.body}</p>
          </RevealText>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 pt-24 sm:px-6 lg:grid-cols-12 lg:px-8">
        <Reveal className="lg:col-span-5">
          <div className="rounded-3xl border border-slate-800 bg-[#0b0f19] p-8 shadow-xl">
            <h2 className="text-3xl font-black text-white">{solution.title}</h2>
            <p className="mt-5 text-sm font-semibold leading-relaxed text-slate-400">
              Your trusted global partner for seamless import/export, offering reliable sourcing, competitive pricing, and efficient logistics.
            </p>
            <Link href="/contact-us" className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#536dfe] px-7 py-3.5 text-sm font-black text-white">
              Contact Us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>

        <RevealStagger staggerDelay={90} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
          {solution.highlights.map((highlight) => (
            <div key={highlight} className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-[#0b0f19] p-5">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-[#9cadff]" />
              <span className="text-base font-black text-white">{highlight}</span>
            </div>
          ))}
        </RevealStagger>
      </section>
    </div>
  );
}
