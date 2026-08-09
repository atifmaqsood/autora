import { CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

interface VehicleFeaturesProps {
  features: string[];
}

export function VehicleFeatures({ features }: VehicleFeaturesProps) {
  if (!features || features.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          Key Equipment & Installed Vehicle Features
        </h3>
        <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
          {features.length} Features Certified
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/60 hover:bg-amber-50/50 hover:border-amber-200 transition-colors"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="text-xs md:text-sm font-semibold text-slate-800">
              {feature}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
