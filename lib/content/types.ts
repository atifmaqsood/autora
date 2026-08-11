// ─── Hero Carousel ──────────────────────────────────────────────────────────
export interface HeroSlide {
  id: string;
  badge: string;
  heading: string;
  accentWord: string;
  subheading: string;
  image: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  overlayColor: "dark" | "light";
  active: boolean;
}

// ─── Homepage Sections ───────────────────────────────────────────────────────
export interface FeaturedSection {
  eyebrow: string;
  heading: string;
  subheading: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface CategorySection {
  eyebrow: string;
  heading: string;
  subheading: string;
}

export interface SpotlightSection {
  eyebrow: string;
  heading: string;
  subheading: string;
  badge: string;
}

export interface WhySection {
  eyebrow: string;
  heading: string;
  pillars: {
    id: string;
    icon: "shield" | "globe" | "file";
    title: string;
    body: string;
  }[];
}

export interface CtaBannerSection {
  badge: string;
  heading: string;
  subheading: string;
  ctaLabel: string;
}

export interface SparePartsCategory {
  id: string;
  title: string;
  description: string;
}

export interface SparePartsPageContent {
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  categoriesEyebrow: string;
  categoriesTitle: string;
  categoriesSubtitle: string;
  categories: SparePartsCategory[];
  processEyebrow: string;
  processTitle: string;
  processSubtitle: string;
  ctaEyebrow: string;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaLabel: string;
}

// ─── Site Settings ───────────────────────────────────────────────────────────
export interface SiteSettings {
  brandName: string;
  tagline: string;
  supportEmail: string;
  supportPhone: string;
  defaultLocation: string;
  metaTitle: string;
  metaDescription: string;
  faviconUrl: string;
  primaryColor: string;
}

// ─── Root Content Model ──────────────────────────────────────────────────────
export interface ShowcaseContent {
  site: SiteSettings;
  heroSlides: HeroSlide[];
  featuredSection: FeaturedSection;
  categorySection: CategorySection;
  spotlightSection: SpotlightSection;
  whySection: WhySection;
  ctaBanner: CtaBannerSection;
  sparePartsPage: SparePartsPageContent;
}


