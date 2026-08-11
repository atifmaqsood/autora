"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  isDark?: boolean;
}

export function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-3 focus:outline-none", className)}
      aria-label="AGTP GROUP home"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-white text-[22px] font-black leading-none text-white">
        A
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[26px] font-black tracking-normal text-white">AGTP</span>
        <span className="mt-1 text-[9px] font-black uppercase tracking-[0.42em] text-slate-300">Group</span>
      </span>
    </Link>
  );
}


