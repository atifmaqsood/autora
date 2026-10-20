export interface BannerPageDefinition {
  key: string;
  label: string;
  group: string;
}

/**
 * Pages that show a banner, named as in the website's header and footer.
 * Each page has a single banner, stored under its main URL.
 */
export const bannerPages: BannerPageDefinition[] = [
  { key: "/", label: "Home", group: "Main menu" },
  { key: "/about-us", label: "About", group: "Main menu" },
  { key: "/vehicles", label: "Vehicles", group: "Main menu" },
  { key: "/parts-accessories", label: "Parts", group: "Main menu" },
  { key: "/automotive-shipping", label: "Shipping", group: "Main menu" },
  { key: "/customer-reviews", label: "Reviews", group: "Main menu" },
  { key: "/how-it-works", label: "How It Works", group: "Footer" },
  { key: "/contact-us", label: "Contact Us", group: "Footer" },
  { key: "/faqs", label: "FAQs", group: "Footer" },
  { key: "/dubai-automotive", label: "Dubai Automotive", group: "Footer" },
  { key: "/payment", label: "Payment", group: "Footer" },
  { key: "/blogs", label: "Blogs & Articles", group: "Footer" },
  { key: "/careers", label: "Careers", group: "Footer" },
  { key: "/refund-policy", label: "Refund Policy", group: "Footer" },
  { key: "/privacy-policy", label: "Privacy Policy", group: "Footer" },
  { key: "/terms-and-conditions", label: "Terms & Conditions", group: "Footer" },
  { key: "/brands", label: "Brands", group: "Other pages" }
];

/** Alternate URLs that render the same page as one of the keys above. */
const bannerPageAliases: Record<string, string> = {
  "/about": "/about-us",
  "/contact": "/contact-us",
  "/reviews": "/customer-reviews",
  "/shipping": "/automotive-shipping",
  "/freight-and-logistics": "/automotive-shipping",
  "/dubai-markets": "/dubai-automotive",
  "/parts": "/parts-accessories",
  "/spare-parts": "/parts-accessories"
};

/** The banner key for a URL path, so every alias shows the same banner. */
export function bannerKeyForPath(pathname: string): string {
  return bannerPageAliases[pathname] ?? pathname;
}
