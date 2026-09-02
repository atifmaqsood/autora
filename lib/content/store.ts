import type { ShowcaseContent } from "./types";

export const CONTENT_STORAGE_KEY = "agtp_showcase_content";
const LEGACY_CONTENT_STORAGE_KEYS = ["autora_showcase_content", "milele_showcase_content"];

// ─── Default Content ──────────────────────────────────────────────────────────
export const defaultContent: ShowcaseContent = {
  site: {
    brandName: "AGTP GROUP",
    tagline: "GLOBAL TRADING",
    supportEmail: "inquiries@agtpgroup.com",
    supportPhone: "+971 58 585729",
    defaultLocation: "Sharjah Media City, UAE",
    metaTitle: "AGTP GROUP - Quality Cars, Parts, and Global Trading",
    metaDescription:
      "From Dubai to your driveway: quality cars, spare parts, construction materials, and global trading solutions delivered with reliable sourcing and logistics.",
    faviconUrl: "",
    primaryColor: "#0D1627",
    secondaryColor: "#4361EE",
    backgroundColor: "#060709",
    navbarColor: "#0B1F33",
    footerColor: "#071626"
  },

  heroSlides: [
    {
      id: "slide-1",
      badge: "LUXURY CARS, TRUSTED WORLDWIDE",
      heading: "Exclusively Sourcing Premium Vehicles",
      accentWord: "For Export",
      subheading:
        "AGTP GROUP sources quality vehicles from Dubai and delivers them to customers worldwide with trusted export support.",
      image:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=80",
      primaryCta: { label: "Click Here", href: "/vehicles" },
      secondaryCta: { label: "Contact Us", href: "/contact" },
      overlayColor: "dark",
      active: true
    },
    {
      id: "slide-2",
      badge: "PRECISION PARTS, GLOBAL REACH",
      heading: "Delivering High-Quality Automotive",
      accentWord: "Spare Parts",
      subheading:
        "Genuine and aftermarket automotive spare parts supplied worldwide with AGTP trust, performance, and service.",
      image:
        "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=2000&q=80",
      primaryCta: { label: "Click Here", href: "/spare-parts" },
      secondaryCta: { label: "Explore More", href: "/vehicles" },
      overlayColor: "dark",
      active: true
    },
    {
      id: "slide-3",
      badge: "GLOBAL TRADING EXCELLENCE",
      heading: "Delivering Quality,",
      accentWord: "Building Trust",
      subheading:
        "Your trusted global partner for seamless import and export, reliable sourcing, competitive pricing, and efficient logistics.",
      image:
        "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=2000&q=80",
      primaryCta: { label: "Click Here", href: "/contact" },
      secondaryCta: { label: "About Us", href: "/about" },
      overlayColor: "dark",
      active: true
    },
    {
      id: "slide-4",
      badge: "FROM DUBAI TO YOUR DRIVEWAY",
      heading: "Quality Cars, Parts, and More",
      accentWord: "Delivered",
      subheading:
        "AGTP GROUP brings together automotive trading, spare parts, construction supplies, electronics, furniture, and general trading solutions.",
      image:
        "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=2000&q=80",
      primaryCta: { label: "Explore More", href: "/vehicles" },
      secondaryCta: { label: "Contact Us", href: "/contact" },
      overlayColor: "dark",
      active: true
    }
  ],

  featuredSection: {
    eyebrow: "ALL PRODUCTS",
    heading: "Top Quality Autoparts",
    subheading: "Quality automotive products and spare parts supplied for customers worldwide.",
    ctaLabel: "View Complete Catalog",
    ctaHref: "/vehicles"
  },

  categorySection: {
    eyebrow: "WHO WE ARE?",
    heading: "Global Trading Excellence",
    subheading:
      "Automotive trading, machinery and spare parts, construction supplies, electronics, e-commerce products, home decor, furniture, and general trading solutions."
  },

  spotlightSection: {
    eyebrow: "LUXURY CARS, TRUSTED WORLDWIDE",
    heading: "Exclusively Sourcing Premium Vehicles for Export",
    subheading: "Quality cars, parts, and more delivered from Dubai to customers around the world.",
    badge: "AGTP GROUP"
  },

  whySection: {
    eyebrow: "WHY CHOOSE AGTP GROUP?",
    heading: "Why Customers Choose AGTP GROUP",
    pillars: [
      {
        id: "pillar-1",
        icon: "shield",
        title: "Customer Support",
        body: "Dedicated support for enquiries, sourcing, pricing, logistics, and delivery across global markets."
      },
      {
        id: "pillar-2",
        icon: "globe",
        title: "Reliable Sourcing",
        body: "Seamless import and export support with competitive pricing and efficient logistics."
      },
      {
        id: "pillar-3",
        icon: "file",
        title: "Quality Parts & Products",
        body: "High-quality automotive spare parts and trading products selected for dependable global supply."
      }
    ]
  },

  ctaBanner: {
    badge: "GET IN TOUCH WITH US",
    heading: "For enquiries and more information",
    subheading:
      "Send your query to AGTP GROUP and our team will help with sourcing, pricing, and logistics information.",
    ctaLabel: "Contact Us"
  },

  sparePartsPage: {
    heroEyebrow: "PRECISION PARTS, GLOBAL REACH",
    heroTitle: "Delivering High-Quality Automotive Spare Parts Worldwide",
    heroSubtitle:
      "AGTP GROUP Spare Parts, rooted in Dubai, UAE, supplies genuine and aftermarket automotive parts worldwide with dedicated customer service and superior quality.",
    primaryCtaLabel: "Request Parts Quote",
    secondaryCtaLabel: "View Categories",
    categoriesEyebrow: "PARTS CATALOG",
    categoriesTitle: "Genuine Auto Parts Suppliers in Dubai, UAE",
    categoriesSubtitle:
      "AGTP GROUP supplies quality spare parts across leading global automotive brands and aftermarket requirements.",
    categories: [
      {
        id: "parts-1",
        title: "Service & Maintenance",
        description:
          "Filters, brake pads, oils, belts, spark plugs, batteries, and scheduled-maintenance essentials."
      },
      {
        id: "parts-2",
        title: "Body & Exterior",
        description:
          "Bumpers, lamps, mirrors, grilles, panels, trims, glass, and export-safe exterior replacements."
      },
      {
        id: "parts-3",
        title: "Engine & Drivetrain",
        description:
          "Cooling, transmission, suspension, steering, and engine components matched to chassis and model data."
      },
      {
        id: "parts-4",
        title: "Accessories & Upgrades",
        description:
          "Fleet accessories, infotainment items, protective kits, off-road fitments, and showroom-ready upgrades."
      }
    ],
    processEyebrow: "SOURCING PROCESS",
    processTitle: "Matched, inspected, packed, and shipped.",
    processSubtitle:
      "Share the VIN, part number, or vehicle details. Our team confirms fitment, checks availability, prepares documentation, and arranges consolidated export shipping.",
    ctaEyebrow: "READY TO SOURCE",
    ctaTitle: "Send your parts list and let AGTP GROUP handle the rest.",
    ctaSubtitle:
      "Upload a simple requirement list or describe the vehicle model. We will respond with availability, pricing, lead time, and export options.",
    ctaLabel: "Start Parts Request"
  }
};

// ─── Deep Merge Helper ────────────────────────────────────────────────────────
function isObject(val: unknown): val is Record<string, unknown> {
  return typeof val === "object" && val !== null && !Array.isArray(val);
}

function deepMerge<T>(base: T, incoming: unknown): T {
  if (Array.isArray(base)) {
    return (Array.isArray(incoming) && incoming.length > 0 ? incoming : base) as T;
  }
  if (isObject(base)) {
    const source = isObject(incoming) ? incoming : {};
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(base as Record<string, unknown>)) {
      result[key] = deepMerge(value as never, source[key]);
    }
    return result as T;
  }
  return (incoming !== undefined && incoming !== null ? incoming : base) as T;
}

function normalizeBrandText<T>(value: T): T {
  if (typeof value === "string") {
    return value
      .replace(/Autora Motors/g, "AGTP GROUP")
      .replace(/AUTORA/g, "AGTP GROUP")
      .replace(/Autora/g, "AGTP GROUP")
      .replace(/autora/g, "agtpgroup")
      .replace(/Milele/g, "AGTP GROUP")
      .replace(/MILELE/g, "AGTP GROUP")
      .replace(/milele/g, "agtpgroup")
      .replace(/Atora/g, "AGTP GROUP")
      .replace(/ATORA/g, "AGTP GROUP")
      .replace(/atora/g, "agtpgroup")
      .replace(/Milelo/g, "AGTP GROUP")
      .replace(/milelo/g, "agtpgroup") as T;
  }
  if (Array.isArray(value)) {
    return value.map((item) => normalizeBrandText(item)) as T;
  }
  if (isObject(value)) {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [key, normalizeBrandText(entry)])
    ) as T;
  }
  return value;
}

// ─── Client-side Read / Write ─────────────────────────────────────────────────
export function getShowcaseContent(): ShowcaseContent {
  if (typeof window === "undefined") return defaultContent;
  try {
    LEGACY_CONTENT_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
    const raw = localStorage.getItem(CONTENT_STORAGE_KEY);
    if (!raw) return defaultContent;
    const parsed = JSON.parse(raw);
    const content = normalizeBrandText(deepMerge(defaultContent, parsed));
    const savedSite = isObject(parsed) && isObject(parsed.site) ? parsed.site : null;

    // Before palette support, primaryColor was an accent-only field. Preserve it as the new secondary color.
    if (savedSite && savedSite.secondaryColor === undefined) {
      const legacyAccent = typeof savedSite.primaryColor === "string" ? savedSite.primaryColor : defaultContent.site.secondaryColor;
      content.site.primaryColor = defaultContent.site.primaryColor;
      content.site.secondaryColor = legacyAccent === "#d97706" ? defaultContent.site.secondaryColor : legacyAccent;
    }

    return content;
  } catch {
    return defaultContent;
  }
}

export function saveShowcaseContent(content: ShowcaseContent): void {
  if (typeof window === "undefined") return;
  try {
    LEGACY_CONTENT_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
    localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(normalizeBrandText(content)));
  } catch {
    console.error("Failed to save showcase content to localStorage");
  }
}

export function resetShowcaseContent(): void {
  if (typeof window === "undefined") return;
  LEGACY_CONTENT_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
  localStorage.removeItem(CONTENT_STORAGE_KEY);
}




