import { Vehicle, SpecificationGroup } from "@/lib/vehicles/types";
import { Zap, Fuel, Gauge, Sliders, Timer, Ruler, Users, Shield, Layers } from "lucide-react";

interface VehicleSpecsProps {
  vehicle: Vehicle;
}

export function VehicleSpecs({ vehicle }: VehicleSpecsProps) {
  return (
    <div className="space-y-8">
      {/* Prominent Key Specification Summary Grid */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <h3 className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-6 flex items-center gap-2">
          <Zap className="w-4 h-4" />
          Technical Highlights & Performance Key Metrics
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {/* Engine */}
          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60 backdrop-blur-sm">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Engine Size
            </span>
            <div className="text-base md:text-lg font-black text-white line-clamp-1">
              {vehicle.engineSize || vehicle.engine}
            </div>
            <span className="text-[10px] text-amber-400 font-medium truncate block mt-0.5">
              {vehicle.engine}
            </span>
          </div>

          {/* Horsepower */}
          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60 backdrop-blur-sm">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Max Power
            </span>
            <div className="text-base md:text-lg font-black text-amber-400">
              {vehicle.horsepower} HP
            </div>
            <span className="text-[10px] text-slate-300 font-medium truncate block mt-0.5">
              {vehicle.torque} Torque
            </span>
          </div>

          {/* Acceleration */}
          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60 backdrop-blur-sm">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              0-100 km/h
            </span>
            <div className="text-base md:text-lg font-black text-white">
              {vehicle.acceleration}
            </div>
            <span className="text-[10px] text-slate-300 font-medium truncate block mt-0.5">
              Top: {vehicle.topSpeed}
            </span>
          </div>

          {/* Transmission */}
          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60 backdrop-blur-sm">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Transmission
            </span>
            <div className="text-base md:text-lg font-black text-white truncate">
              {vehicle.transmission}
            </div>
            <span className="text-[10px] text-slate-300 font-medium truncate block mt-0.5">
              Gear System
            </span>
          </div>

          {/* Fuel */}
          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60 backdrop-blur-sm">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Fuel Type
            </span>
            <div className="text-base md:text-lg font-black text-white truncate">
              {vehicle.fuelType}
            </div>
            <span className="text-[10px] text-slate-300 font-medium truncate block mt-0.5">
              Powertrain
            </span>
          </div>

          {/* Drive */}
          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60 backdrop-blur-sm">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Drive System
            </span>
            <div className="text-base md:text-lg font-black text-white">
              {vehicle.driveType}
            </div>
            <span className="text-[10px] text-slate-300 font-medium truncate block mt-0.5">
              {vehicle.bodyType}
            </span>
          </div>
        </div>
      </div>

      {/* Detailed Technical Specification Groups */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-3">
          <Layers className="w-5 h-5 text-amber-600" />
          Complete Technical Specification Sheet
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {vehicle.specifications.map((group, gIdx) => (
            <div
              key={gIdx}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:border-slate-300 transition-colors"
            >
              <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 font-bold text-sm text-slate-800 flex items-center justify-between">
                <span>{group.groupName}</span>
                <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  VERIFIED SPEC
                </span>
              </div>
              <div className="p-5 divide-y divide-slate-100 text-sm">
                {Object.entries(group.items).map(([key, val], idx) => (
                  <div
                    key={idx}
                    className="py-2.5 flex items-center justify-between gap-4"
                  >
                    <span className="font-medium text-slate-500">{key}</span>
                    <span className="font-semibold text-slate-900 text-right">
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
