"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import agtpLogoWhite from "@/src/assets/logo/AGTP-group-website-LOGO-White.svg";

interface LogoProps {
  className?: string;
  isDark?: boolean;
}

export function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn("relative inline-flex h-[78px] w-[214px] items-center focus:outline-none", className)}
      aria-label="AGTP GROUP home"
    >
      <Image
        src={agtpLogoWhite}
        alt="AGTP GROUP"
        fill
        priority
        className="object-contain object-left"
        sizes="214px"
      />
    </Link>
  );
}


