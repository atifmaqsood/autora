"use client";

import { PageHero } from "@/components/layout/page-hero";
import { Truck, FileCheck, Search } from "lucide-react";
import { RevealStagger } from "@/components/ui/scroll-reveal";

export default function ServicesPage() {
  return (
    <div className="space-y-12 pb-16">
      <PageHero
        badge="AUTOMOTIVE SERVICES"
        title="Logistics, Certification & Inspection"
        subtitle="Professional technical services supporting vehicle specification audit, factory compliance verification, and global showroom logistics."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealStagger staggerDelay={100} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
              <FileCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Specification & OEM Certification
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Detailed technical specification sheet audit comparing factory engine power, gear ratios, emission compliance, and option codes.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              150-Point Technical Inspection
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Physical physical chassis, drivetrain, electronic control module (ECM) diagnostic audit conducted by certified master technicians.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Global Logistics & Shipping Consultation
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Export shipping advice, enclosed vehicle transport arrangements, custom clearance documentation, and VIP delivery coordination across Europe, Asia, and the Middle East.
            </p>
          </div>
        </RevealStagger>
      </div>
    </div>
  );
}


