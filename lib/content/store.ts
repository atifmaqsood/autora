import type { ShowcaseContent } from "./types";

export const CONTENT_STORAGE_KEY = "autora_showcase_content";

// ─── Default Content ──────────────────────────────────────────────────────────
export const defaultContent: ShowcaseContent = {
  site: {
    brandName: "Autora",
    tagline: "MOTORS · SHOWCASE",
    supportEmail: "inquire@autora-motors.com",
    supportPhone: "+971 4 000 1234",
    defaultLocation: "Dubai Central Showroom",
    metaTitle: "Autora — Certified Vehicle Specifications & Global Automotive Showcase",
    metaDescription:
      "Explore exhaustive technical specs, engine horsepower, dimensions, and certified options across luxury, sports, SUV, and commercial vehicles.",
    faviconUrl: "",
    primaryColor: "#d97706"
  },

  heroSlides: [
    {
      id: "slide-1",
      badge: "GLOBAL AUTOMOTIVE CATALOG",
      heading: "Discover Premier Vehicle",
      accentWord: "Specifications",
      subheading:
        "Explore exhaustive technical engineering data across our global collection of luxury, performance, off-road, and commercial vehicles.",
      image:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=80",
      primaryCta: { label: "Browse Vehicles", href: "/vehicles" },
      secondaryCta: { label: "Explore Categories", href: "/vehicles" },
      overlayColor: "dark",
      active: true
    },
    {
      id: "slide-2",
      badge: "PERFORMANCE & SPORTS",
      heading: "Track-Bred",
      accentWord: "Engineering",
      subheading:
        "High-revving naturally aspirated engines, dual-clutch gearboxes, and aerodynamic bodies tested to their absolute limits.",
      image:
        "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=2000&q=80",
      primaryCta: { label: "View Sports Cars", href: "/categories/sports" },
      secondaryCta: { label: "See Specifications", href: "/vehicles" },
      overlayColor: "dark",
      active: true
    },
    {
      id: "slide-3",
      badge: "LUXURY & PRESTIGE",
      heading: "Where Comfort Meets",
      accentWord: "Excellence",
      subheading:
        "Executive saloons, armoured SUVs, and bespoke touring limousines for discerning collectors and fleet operators worldwide.",
      image:
        "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=2000&q=80",
      primaryCta: { label: "Luxury Collection", href: "/categories/luxury" },
      secondaryCta: { label: "Request Spec Sheet", href: "/contact" },
      overlayColor: "dark",
      active: true
    },
    {
      id: "slide-4",
      badge: "ELECTRIC FUTURE",
      heading: "Zero Emission",
      accentWord: "Power",
      subheading:
        "Dual-motor EV platforms delivering instant torque, 800V fast-charging architecture, and 600+ km real-world range.",
      image:
        "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=2000&q=80",
      primaryCta: { label: "Electric Vehicles", href: "/categories/electric" },
      secondaryCta: { label: "Compare Specs", href: "/vehicles" },
      overlayColor: "dark",
      active: true
    }
  ],

  featuredSection: {
    eyebrow: "HANDPICKED SHOWCASE HIGHLIGHTS",
    heading: "Featured Flagship Vehicles",
    subheading: "Curated selection of our most prestigious and technically advanced vehicles",
    ctaLabel: "View Complete Catalog",
    ctaHref: "/vehicles"
  },

  categorySection: {
    eyebrow: "EXPLORE BY BODY TYPE & CLASS",
    heading: "Browse Vehicle Categories",
    subheading:
      "Filter our global showcase by vehicle body style, performance classification, and operational capabilities."
  },

  spotlightSection: {
    eyebrow: "VEHICLE OF THE MONTH",
    heading: "Flagship Specification Spotlight",
    subheading: "In-depth technical deep-dive on our most remarkable vehicle this season",
    badge: "FLAGSHIP SPOTLIGHT"
  },

  whySection: {
    eyebrow: "AUTOMOTIVE SHOWCASE EXCELLENCE",
    heading: "Why Engineers & Collectors Trust Autora",
    pillars: [
      {
        id: "pillar-1",
        icon: "shield",
        title: "Verified OEM Technical Specs",
        body: "Every vehicle in our showcase features engine specs, gear ratios, dimensions, and torque curves verified directly against factory manufacturer documents."
      },
      {
        id: "pillar-2",
        icon: "globe",
        title: "Global Showroom Hubs",
        body: "Represented in Dubai, Tokyo, London, Munich, and Miami for physical vehicle inspections, specification consultations, and international logistics."
      },
      {
        id: "pillar-3",
        icon: "file",
        title: "Digital Spec Downloads",
        body: "Download complete PDF specification sheets, equipment option matrices, and performance summaries for fleet managers and automotive buyers."
      }
    ]
  },

  ctaBanner: {
    badge: "SHOWCASE SPECIFICATION ASSISTANCE",
    heading: "Need Specific Technical Data or Vehicle Comparison?",
    subheading:
      "Our team of automotive specification specialists can provide detailed engineering documentation, trim comparisons, and export logistics information.",
    ctaLabel: "Request Information Form"
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

// ─── Client-side Read / Write ─────────────────────────────────────────────────
export function getShowcaseContent(): ShowcaseContent {
  if (typeof window === "undefined") return defaultContent;
  try {
    const raw = localStorage.getItem(CONTENT_STORAGE_KEY);
    if (!raw) return defaultContent;
    const parsed = JSON.parse(raw);
    return deepMerge(defaultContent, parsed);
  } catch {
    return defaultContent;
  }
}

export function saveShowcaseContent(content: ShowcaseContent): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(content));
  } catch {
    console.error("Failed to save showcase content to localStorage");
  }
}

export function resetShowcaseContent(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CONTENT_STORAGE_KEY);
}
