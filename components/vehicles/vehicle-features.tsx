"use client";

import { CheckCircle2, Sparkles } from "lucide-react";
import { RevealHeading, RevealStagger, Reveal } from "@/components/ui/scroll-reveal";

interface VehicleFeaturesProps {
  features: string[];
}

export function VehicleFeatures({ features }: VehicleFeaturesProps) {
  if (!features || features.length === 0) return null;

  return (
    <Reveal className="bg-[#111832] rounded-2xl border border-[#25304f] p-6 md:p-8 shadow-xl space-y-6">
      <div className="flex items-center justify-between border-b border-[#25304f] pb-4">
        <RevealHeading>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#9cadff]" />
            Key Equipment & Installed Vehicle Features
          </h3>
        </RevealHeading>
        <span className="text-xs font-semibold text-slate-300 bg-[#0b1020] border border-[#25304f] px-3 py-1 rounded-full">
          {features.length} Features Certified
        </span>
      </div>

      <RevealStagger staggerDelay={40} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 p-3 rounded-xl bg-[#0b1020] border border-[#25304f] hover:border-[#536dfe]/60 transition-colors"
          >
            <CheckCircle2 className="w-4 h-4 text-[#9cadff] shrink-0" />
            <span className="text-xs md:text-sm font-semibold text-slate-200">
              {feature}
            </span>
          </div>
        ))}
      </RevealStagger>
    </Reveal>
  );
}


