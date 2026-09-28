"use client";

import { useState, type KeyboardEvent } from "react";
import { Camera, Cog, Gauge, Monitor, Music2, Navigation, ShieldCheck, Smartphone, Tag, Tv, type LucideIcon } from "lucide-react";
import type { Vehicle } from "@/lib/vehicles/types";

const featureTitles: { pattern: RegExp; title: string; icon: LucideIcon }[] = [
  { pattern: /multi.terrain/i, title: "Terrain Modes", icon: Gauge },
  { pattern: /crawl.control/i, title: "Off-Road Control", icon: Gauge },
  { pattern: /360.degree|panoramic.view|surround.view/i, title: "Surround View", icon: Camera },
  { pattern: /head.up.display/i, title: "Head-Up Display", icon: Monitor },
  { pattern: /rear.*entertainment|rear.*\btv\b|rear.*dvd/i, title: "Rear Entertainment", icon: Tv },
  { pattern: /carplay|android.auto|bluetooth|usb|wireless.charging/i, title: "Connectivity", icon: Smartphone },
  { pattern: /safety.sense|airbag|blind.spot|lane.keep|cruise|parking.assist|parking.sensor|traction.control/i, title: "Safety Systems", icon: ShieldCheck },
  { pattern: /navigation/i, title: "Navigation", icon: Navigation },
  { pattern: /speaker|audio|sound.system|jbl|burmester|bowers|akg|naim/i, title: "Audio System", icon: Music2 },
  { pattern: /suspension|shocks|ride.control/i, title: "Suspension", icon: Cog },
  { pattern: /camera|monitor|clearsight/i, title: "Cameras & Visibility", icon: Camera },
  { pattern: /touchscreen|display|screen|digital/i, title: "Display", icon: Monitor },
  { pattern: /terrain|track|rally|drift|wading|driving.mode/i, title: "Driving Modes", icon: Gauge },
  { pattern: /engine|motor|powertrain|horsepower|turbo|\bhp\b|\bv8\b|\bv12\b/i, title: "Powertrain", icon: Gauge },
  { pattern: /brak/i, title: "Braking", icon: Cog },
  { pattern: /seat|upholstery|bucket|chair|massage/i, title: "Seating", icon: Tag },
  { pattern: /wheel|tire|tyre/i, title: "Wheels & Tyres", icon: Cog },
  { pattern: /light|led|lamp/i, title: "Lighting", icon: Tag },
  { pattern: /roof|hood|carbon|paint|stripe|spoiler|grille|fascia|bumper/i, title: "Exterior Design", icon: Tag },
  { pattern: /air.condition|climate|cool.box|headliner|heating|refrigerat/i, title: "Cabin Comfort", icon: Tag },
  { pattern: /keyless|push.button|power.window|door|trunk|mirror/i, title: "Convenience", icon: Tag },
  { pattern: /assist|sensor|safety/i, title: "Driver Assistance", icon: ShieldCheck }
];

function featureTitle(feature: string) {
  return featureTitles.find(({ pattern }) => pattern.test(feature)) ?? {
    title: feature.split(/\s+/).slice(0, 2).join(" "),
    icon: Tag
  };
}

export function VehicleDetailInfo({ vehicle }: { vehicle: Vehicle }) {
  const [activeTab, setActiveTab] = useState<"features" | "description">("features");

  function handleTabKey(event: KeyboardEvent<HTMLButtonElement>) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === "Home" ? "features" : event.key === "End" ? "description" : activeTab === "features" ? "description" : "features";
    setActiveTab(next);
    document.getElementById(`vehicle-tab-${next}`)?.focus();
  }

  return (
    <section aria-label="Vehicle details" className="mt-10 rounded-3xl border border-white/10 bg-[var(--agtp-primary)] p-5 shadow-2xl sm:mt-12 sm:p-8 lg:p-10">
      <div role="tablist" aria-label="Vehicle information" className="flex flex-wrap gap-3 border-b border-white/15 pb-5">
        {(["features", "description"] as const).map((tab) => (
          <button key={tab} type="button" role="tab" id={`vehicle-tab-${tab}`} aria-selected={activeTab === tab} aria-controls={`vehicle-panel-${tab}`} tabIndex={activeTab === tab ? 0 : -1} onClick={() => setActiveTab(tab)} onKeyDown={handleTabKey} className={`rounded-full border border-[var(--agtp-secondary)] px-6 py-3 text-sm font-bold capitalize text-white transition-all ${activeTab === tab ? "bg-[var(--agtp-secondary)] shadow-lg shadow-black/20" : "bg-[color-mix(in_srgb,var(--agtp-secondary)_28%,transparent)] hover:bg-[var(--agtp-secondary)]"}`}>
            {tab}
          </button>
        ))}
      </div>
      <div role="tabpanel" id="vehicle-panel-features" aria-labelledby="vehicle-tab-features" hidden={activeTab !== "features"} tabIndex={0} className="border-b border-white/15 py-7">
        <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {vehicle.features.map((feature) => {
            const { title, icon: Icon } = featureTitle(feature);
            return (
              <div key={feature} className="flex min-w-0 items-start gap-3 text-sm sm:text-base">
                <Icon aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-[var(--agtp-secondary)]" />
                <dt className="max-w-[38%] shrink-0 text-slate-400">{title}</dt>
                <dd className="ml-auto min-w-0 break-words text-right font-bold text-white">{feature}</dd>
              </div>
            );
          })}
        </dl>
      </div>
      <div role="tabpanel" id="vehicle-panel-description" aria-labelledby="vehicle-tab-description" hidden={activeTab !== "description"} tabIndex={0} className="space-y-7 border-b border-white/15 py-7 text-sm leading-7 text-slate-300">
        <p>{vehicle.description}</p>
        {vehicle.descriptionSections?.map((section) => (
          <div key={section.title}>
            <h2 className="mb-2 text-base font-bold text-white">{section.title}</h2>
            <p>{section.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
