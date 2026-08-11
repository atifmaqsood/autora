import Link from "next/link";
import { ArrowRight, HelpCircle } from "lucide-react";
import { Reveal, RevealEyebrow, RevealHeading, RevealStagger, RevealText } from "@/components/ui/scroll-reveal";
import { faqs } from "@/lib/agtp/content";

export default function FaqsPage() {
  return (
    <div className="bg-[#070b14] pb-20 text-white">
      <section className="mx-auto flex min-h-[70vh] max-w-7xl flex-col justify-center px-4 pt-32 sm:px-6 lg:px-8">
        <div className="space-y-5">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <Link href="/" className="hover:text-white">HOME</Link>
            <span>/</span>
            <span className="text-indigo-400">FAQS</span>
          </div>
          <RevealEyebrow>
            <div className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.28em] text-[#9fb0ff]">
              <span className="h-px w-9 bg-[#536dfe]" />
              FAQs
            </div>
          </RevealEyebrow>
          <RevealHeading>
            <h1 className="max-w-4xl text-5xl font-black uppercase leading-[0.96] sm:text-7xl">
              Frequently asked questions
            </h1>
          </RevealHeading>
          <RevealText>
            <p className="max-w-2xl text-base font-semibold leading-relaxed text-slate-400">
              Quick answers about AGTP GROUP sourcing, automotive spare parts, business solutions, and contact channels.
            </p>
          </RevealText>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <RevealStagger staggerDelay={80} className="space-y-5">
          {faqs.map((item) => (
            <div key={item.question} className="rounded-3xl border border-slate-800 bg-[#0b0f19] p-7 shadow-xl">
              <div className="flex items-start gap-4">
                <HelpCircle className="mt-1 h-6 w-6 shrink-0 text-[#9cadff]" />
                <div>
                  <h2 className="text-xl font-black text-white">{item.question}</h2>
                  <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-400">{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </RevealStagger>

        <Link href="/contact-us" className="mt-10 inline-flex items-center gap-3 rounded-full bg-[#536dfe] px-8 py-4 text-sm font-black text-white">
          Contact Us <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}
