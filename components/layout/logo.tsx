"use client";

import Link from "next/link";
import { Car } from "lucide-react";
import { cn } from "@/lib/utils";
import { useContent } from "@/lib/content/context";

interface LogoProps {
  className?: string;
  isDark?: boolean;
}

export function Logo({ className, isDark = false }: LogoProps) {
  const { content } = useContent();
  const { brandName, tagline } = content.site;

  return (
    <Link
      href="/"
      className={cn("flex items-center gap-2.5 group focus:outline-none", className)}
    >
      <div className="w-10 h-10 rounded-lg bg-slate-900 text-amber-500 flex items-center justify-center shadow-md group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-300">
        <Car className="w-6 h-6 stroke-[2.2]" />
      </div>
      <div className="flex flex-col">
        <span
          className={cn(
            "text-xl font-extrabold tracking-wider uppercase leading-none font-sans",
            isDark ? "text-white" : "text-slate-950"
          )}
        >
          {brandName}
        </span>
        <span className="text-[10px] font-semibold tracking-widest text-amber-600 uppercase">
          {tagline}
        </span>
      </div>
    </Link>
  );
}
