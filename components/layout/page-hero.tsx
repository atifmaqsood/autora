"use client";

import { PageHero as UiPageHero, PageHeroProps as UiPageHeroProps } from "@/components/ui/page-hero";
import { agtpAssets } from "@/src/assets";

interface LayoutPageHeroProps {
  title: string;
  subtitle?: string;
  badge?: string;
  className?: string;
  imageSrc?: any;
}

export function PageHero({ title, subtitle, badge, className, imageSrc }: LayoutPageHeroProps) {
  return (
    <UiPageHero
      title={title}
      subtitle={subtitle}
      badge={badge ? { text: badge } : undefined}
      imageSrc={imageSrc || agtpAssets.aboutHero}
      className={className}
    />
  );
}

export { UiPageHero };


