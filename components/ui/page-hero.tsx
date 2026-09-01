"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { RevealHeading, RevealText, RevealEyebrow } from "@/components/ui/scroll-reveal";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  imageSrc: string | StaticImageData;
  imageAlt?: string;
  badge?: {
    text: string;
    dotColor?: string;
  };
  children?: React.ReactNode;
  className?: string;
  align?: "left" | "center";
}

export function PageHero({
  title,
  subtitle,
  breadcrumbs = [],
  imageSrc,
  imageAlt = "Page Hero",
  badge,
  children,
  className,
  align = "left"
}: PageHeroProps) {
  return (
    <section
      data-keep-color="true"
      className={cn(
        "relative flex min-h-[580px] sm:min-h-[640px] md:min-h-[700px] lg:min-h-[760px] flex-col justify-center overflow-hidden border-b border-[#24445F] bg-[#060709] pb-20 pt-44 sm:pb-24 sm:pt-48 md:pb-28 md:pt-56 lg:pb-32 lg:pt-60",
        className
      )}
    >
      {/* Background Hero Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          className="object-cover object-center brightness-90"
          sizes="100vw"
        />
        {/* Layered Overlays for Contrast & Atmosphere */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060709] via-[#060709]/50 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060709]/80 via-transparent to-transparent" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 mx-auto w-full max-w-[1570px] px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className={cn("max-w-4xl space-y-4", align === "center" && "mx-auto text-center")}>
          
          {/* Breadcrumb Trail */}
          {breadcrumbs.length > 0 && (
            <RevealEyebrow>
              <nav aria-label="Breadcrumb" className={cn("flex items-center gap-2 text-[12px] font-black uppercase tracking-[0.22em] text-slate-300", align === "center" && "justify-center")}>
                {breadcrumbs.map((crumb, idx) => {
                  const isLast = idx === breadcrumbs.length - 1;
                  return (
                    <span key={crumb.label} className="inline-flex items-center gap-2">
                      {idx > 0 && <span className="text-slate-500">/</span>}
                      {crumb.href && !isLast ? (
                        <Link
                          href={crumb.href}
                          className="transition-colors hover:text-white"
                        >
                          {crumb.label}
                        </Link>
                      ) : (
                        <span className={isLast ? "text-[#FDBA74]" : ""}>
                          {crumb.label}
                        </span>
                      )}
                    </span>
                  );
                })}
              </nav>
            </RevealEyebrow>
          )}

          {/* Optional Badge */}
          {badge && (
            <div className={cn("flex items-center", align === "center" && "justify-center")}>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-950/60 px-3.5 py-1 text-[11px] font-black uppercase tracking-wider text-emerald-400 backdrop-blur-md">
                <span className={cn("h-2 w-2 rounded-full animate-pulse", badge.dotColor || "bg-emerald-400")} />
                {badge.text}
              </span>
            </div>
          )}

          {/* Main Hero Title */}
          <RevealHeading delay={80}>
            <h1 className="font-[family-name:var(--font-sora)] text-[38px] font-black uppercase leading-[1.08] tracking-tight text-white drop-shadow-md sm:text-[52px] md:text-[64px] lg:text-[74px]">
              {title}
            </h1>
          </RevealHeading>

          {/* Subtitle / Description */}
          {subtitle && (
            <RevealText delay={140}>
              <p className="mt-2 max-w-2xl text-[15px] font-medium leading-relaxed text-slate-200 drop-shadow sm:text-[17px] md:text-[18px]">
                {subtitle}
              </p>
            </RevealText>
          )}

          {/* Extra Children / Search / Action slots */}
          {children && (
            <div className="pt-4">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

