import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RevealEyebrow, RevealHeading, RevealStagger, RevealText } from "@/components/ui/scroll-reveal";
import { businessSolutions } from "@/lib/agtp/content";

export default function BusinessSolutionsPage() {
  return (
    <div className="bg-[#0B1F33] pb-20 text-white">
      <section className="mx-auto flex min-h-[70vh] max-w-7xl flex-col justify-center px-4 pt-32 sm:px-6 lg:px-8">
        <div className="space-y-5">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <Link href="/" className="hover:text-white">HOME</Link>
            <span>/</span>
            <span className="text-[#F97316]">BUSINESS SOLUTIONS</span>
          </div>
          <RevealEyebrow>
            <div className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.28em] text-[#FDBA74]">
              <span className="h-px w-9 bg-[#F97316]" />
              Global Trading Excellence
            </div>
          </RevealEyebrow>
          <RevealHeading>
            <h1 className="max-w-4xl text-5xl font-black uppercase leading-[0.96] sm:text-7xl">
              Delivering Quality, Building Trust
            </h1>
          </RevealHeading>
          <RevealText>
            <p className="max-w-2xl text-base font-semibold leading-relaxed text-slate-400">
              AGTP GROUP provides seamless import/export, reliable sourcing, competitive pricing, and efficient logistics across multiple trading categories.
            </p>
          </RevealText>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealStagger staggerDelay={70} className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {businessSolutions.map((solution) => (
            <Link key={solution.slug} href={`/${solution.slug}`} className="group rounded-3xl border border-slate-800 bg-[#102941] p-7 shadow-xl transition-colors hover:border-[#F97316]">
              <div className="text-xs font-black uppercase tracking-[0.25em] text-[#FDBA74]">{solution.eyebrow}</div>
              <h2 className="mt-4 text-3xl font-black text-white">{solution.title}</h2>
              <p className="mt-4 text-sm font-semibold leading-relaxed text-slate-400">{solution.body}</p>
              <div className="mt-8 inline-flex items-center gap-2 text-sm font-black text-white">
                Click here <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </RevealStagger>
      </section>
    </div>
  );
}
