"use client";

import { useState, type KeyboardEvent } from "react";
import { RevealButton, RevealText } from "@/components/ui/scroll-reveal";
import { vehicleFeatures } from "@/lib/vehicles/features";
import type { Vehicle } from "@/lib/vehicles/types";

const tabs = ["features", "description"] as const;
type Tab = (typeof tabs)[number];

export function VehicleDetailInfo({ vehicle }: { vehicle: Vehicle }) {
  const [activeTab, setActiveTab] = useState<Tab>("features");
  const features = vehicleFeatures(vehicle);

  function handleTabKey(event: KeyboardEvent<HTMLButtonElement>) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const current = tabs.indexOf(activeTab);
    const next =
      event.key === "Home"
        ? tabs[0]
        : event.key === "End"
          ? tabs[tabs.length - 1]
          : event.key === "ArrowRight"
            ? tabs[(current + 1) % tabs.length]
            : tabs[(current - 1 + tabs.length) % tabs.length];
    setActiveTab(next);
    document.getElementById(`vehicle-tab-${next}`)?.focus();
  }

  return (
    <section
      aria-label="Vehicle details"
      className="mt-10 rounded-3xl border border-white/10 bg-[var(--agtp-primary)] p-5 shadow-2xl sm:mt-12 sm:p-8 lg:p-10"
    >
      <RevealButton>
        <div
          role="tablist"
          aria-label="Vehicle information"
          className="flex flex-wrap gap-3 border-b border-white/15 pb-5"
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              id={`vehicle-tab-${tab}`}
              aria-selected={activeTab === tab}
              aria-controls={`vehicle-panel-${tab}`}
              tabIndex={activeTab === tab ? 0 : -1}
              onClick={() => setActiveTab(tab)}
              onKeyDown={handleTabKey}
              className={`rounded-full border border-[var(--agtp-secondary)] px-6 py-3 text-sm font-bold capitalize text-white transition-all ${activeTab === tab ? "bg-[var(--agtp-secondary)] shadow-lg shadow-black/20" : "bg-[color-mix(in_srgb,var(--agtp-secondary)_28%,transparent)] hover:bg-[var(--agtp-secondary)]"}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </RevealButton>
      <div
        role="tabpanel"
        id="vehicle-panel-features"
        aria-labelledby="vehicle-tab-features"
        hidden={activeTab !== "features"}
        tabIndex={0}
        className="border-b border-white/15 py-7"
      >
        <RevealText>
          <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ key, label, value, icon: Icon }) => (
              <div
                key={key}
                className="flex min-w-0 items-start gap-3 text-sm sm:text-base"
              >
                <Icon
                  aria-hidden="true"
                  className="mt-0.5 h-5 w-5 shrink-0 text-[var(--agtp-secondary)]"
                />
                <dt className="max-w-[45%] shrink-0 text-slate-400">{label}</dt>
                <dd className="ml-auto min-w-0 break-words text-right font-bold text-white">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </RevealText>
      </div>
      <div
        role="tabpanel"
        id="vehicle-panel-description"
        aria-labelledby="vehicle-tab-description"
        hidden={activeTab !== "description"}
        tabIndex={0}
        className="space-y-7 border-b border-white/15 py-7 text-sm leading-7 text-slate-300"
      >
        <RevealText>
          <p>{vehicle.description}</p>
        </RevealText>
        {vehicle.descriptionSections?.map((section) => (
          <RevealText key={section.title}>
            <h2 className="mb-2 text-base font-bold text-white">
              {section.title}
            </h2>
            <p>{section.body}</p>
          </RevealText>
        ))}
      </div>
    </section>
  );
}
