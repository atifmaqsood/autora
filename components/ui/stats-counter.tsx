"use client";

import { Reveal, RevealCounter } from "@/components/ui/scroll-reveal";

interface CounterStat {
  value: number;
  suffix?: string;
  label: string;
}

export function StatsCounter({ stats }: { stats: readonly CounterStat[] }) {
  return (
    <Reveal>
      <div className="rounded-[24px] border border-[#315671] bg-[#0B1F33] overflow-hidden shadow-2xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-slate-800/80">
          {stats.map((stat) => (
            <div key={stat.label} className="p-8 md:p-10 flex flex-col justify-center">
              <div className="text-4xl md:text-5xl font-black text-white tracking-tight flex items-baseline justify-center lg:justify-start">
                <RevealCounter
                  end={stat.value}
                  suffix={stat.suffix}
                  suffixClassName="text-3xl ml-1 font-black"
                  suffixStyle={{ color: "var(--agtp-secondary)" }}
                />
              </div>
              <div className="mt-3 text-[13px] font-semibold text-slate-400 uppercase tracking-wider text-center lg:text-left">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
