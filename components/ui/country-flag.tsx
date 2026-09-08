"use client";

import React from "react";
import * as Flags from "country-flag-icons/react/3x2";

interface CountryFlagProps {
  iso2: string;
  className?: string;
}

export function CountryFlag({ iso2, className = "w-5 h-3.5" }: CountryFlagProps) {
  const code = (iso2 || "").toUpperCase();
  const Flag = (Flags as Record<string, React.ComponentType<{ className?: string; title?: string }>>)[code];

  if (Flag) {
    return (
      <span className="inline-flex items-center justify-center shrink-0 overflow-hidden rounded-[2px]">
        <Flag className={`object-cover ${className}`} title={code} />
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center justify-center bg-slate-700 text-[9px] font-bold text-white rounded-[2px] shrink-0 ${className}`}>
      {code}
    </span>
  );
}

