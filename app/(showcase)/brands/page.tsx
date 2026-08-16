import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { Reveal, RevealEyebrow, RevealHeading, RevealStagger, RevealText } from "@/components/ui/scroll-reveal";
import { agtpBrandGroups, agtpProductGroups } from "@/lib/agtp/content";
import { agtpAssets } from "@/src/assets";

export default function BrandsPage() {
  return (
    <div className="bg-[#0B1F33] pb-20 text-white">
      <section className="relative flex min-h-[82vh] flex-col justify-center overflow-hidden border-b border-slate-800/80 bg-[#081A2B] px-4 pt-32 sm:px-6 lg:px-8">
        <Image src={agtpAssets.sparePartsHero} alt="AGTP GROUP spare parts brands" fill priority className="object-cover opacity-40" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#081A2B] via-[#081A2B]/75 to-[#081A2B]/20" />
        <div className="relative z-10 mx-auto w-full max-w-7xl space-y-5">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <Link href="/" className="hover:text-white">HOME</Link>
            <span>/</span>
            <span className="text-[#F97316]">BRANDS</span>
          </div>
          <RevealEyebrow>
            <div className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.28em] text-[#FDBA74]">
              <span className="h-px w-9 bg-[#F97316]" />
              Spare Parts
            </div>
          </RevealEyebrow>
          <RevealHeading>
            <h1 className="max-w-5xl text-5xl font-black uppercase leading-[0.92] sm:text-7xl lg:text-[92px]">
              Genuine Auto Spare Parts - AGTP Group Wholesale Suppliers in Dubai and the UAE
            </h1>
          </RevealHeading>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
        <RevealStagger staggerDelay={70} className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {agtpBrandGroups.map((group) => (
            <div key={group.title} className="rounded-3xl border border-slate-800 bg-[#102941] p-7 shadow-xl">
              <h2 className="text-2xl font-black text-white">{group.title}</h2>
              <div className="mt-6 flex flex-wrap gap-3">
                {group.brands.map((brand) => (
                  <span key={brand} className="rounded-full border border-[#315671] bg-[#14314B] px-4 py-2 text-sm font-bold text-slate-300">
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </RevealStagger>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl space-y-4">
          <RevealEyebrow>
            <div className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.28em] text-[#FDBA74]">
              <span className="h-px w-9 bg-[#F97316]" />
              Popular Products
            </div>
          </RevealEyebrow>
          <RevealHeading>
            <h2 className="text-4xl font-black leading-tight sm:text-6xl">Spare Parts & Brands</h2>
          </RevealHeading>
          <RevealText>
            <p className="text-sm font-semibold leading-relaxed text-slate-400 sm:text-base">
              AGTP GROUP supplies engine parts, filters, electrical components, brakes, suspension, bearings, body parts, tools, lubricants, batteries, tires, and more.
            </p>
          </RevealText>
        </div>

        <RevealStagger staggerDelay={35} className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {agtpProductGroups.map((product) => (
            <div key={product} className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-[#102941] p-4 text-sm font-bold text-slate-200">
              <BadgeCheck className="h-4 w-4 shrink-0 text-[#FDBA74]" />
              {product}
            </div>
          ))}
        </RevealStagger>

        <Link href="/contact-us" className="mt-12 inline-flex items-center gap-3 rounded-full bg-[#F97316] px-8 py-4 text-sm font-black text-white">
          Contact Us <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}
