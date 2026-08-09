import { PageHero } from "@/components/layout/page-hero";
import { ShieldCheck, Award, Globe, Users, Car, CheckCircle2 } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="space-y-12 pb-16">
      <PageHero
        badge="ABOUT AUTORA"
        title="Automotive Excellence & Verification"
        subtitle="Dedicated to presenting certified vehicle technical specifications, engineering matrices, and luxury automotive collections."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-black text-slate-900">
              Our Vision for Automotive Presentation
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              AUTORA was established to fill a crucial gap in modern automotive research: providing transparent, verified, and structured vehicle specification data without the friction of commercial ecommerce checkouts.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              From high-performance naturally aspirated supercar powertrains to heavy-duty twin-turbo V8 expedition rigs and dual-motor EV platforms, our platform catalogs every crucial metric required by automotive engineers, fleet planners, and private collectors.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                <Car className="w-5 h-5" />
              </div>
              <div className="text-2xl font-black text-slate-900">20+</div>
              <p className="text-xs text-slate-500 font-medium">Flagship Models Cataloged</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold">
                <Globe className="w-5 h-5" />
              </div>
              <div className="text-2xl font-black text-slate-900">5</div>
              <p className="text-xs text-slate-500 font-medium">International Showroom Hubs</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-2xl font-black text-slate-900">100%</div>
              <p className="text-xs text-slate-500 font-medium">Factory Spec Verification</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center font-bold">
                <Award className="w-5 h-5" />
              </div>
              <div className="text-2xl font-black text-slate-900">100+</div>
              <p className="text-xs text-slate-500 font-medium">Technical Attributes Tracked</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
