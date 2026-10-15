export interface BannerPageDefinition {
  key: string;
  label: string;
  group: string;
}

export const bannerPages: BannerPageDefinition[] = [
  { key: "/", label: "Homepage", group: "Main" },
  { key: "/about-us", label: "About Us", group: "Main" },
  { key: "/about", label: "About (Legacy Route)", group: "Main" },
  { key: "/business-solutions", label: "Business Solutions", group: "Main" },
  { key: "/services", label: "Services", group: "Main" },
  { key: "/contact-us", label: "Contact Us", group: "Main" },
  { key: "/contact", label: "Contact (Alternate)", group: "Main" },
  { key: "/automotive", label: "Automotive", group: "Industries" },
  { key: "/automotive-shipping", label: "Automotive Shipping", group: "Industries" },
  { key: "/spare-parts", label: "Spare Parts", group: "Industries" },
  { key: "/industrial-equipment", label: "Industrial Equipment", group: "Industries" },
  { key: "/construction-materials", label: "Construction Materials", group: "Industries" },
  { key: "/electronics", label: "Electronics", group: "Industries" },
  { key: "/furniture-and-home-items", label: "Furniture & Home", group: "Industries" },
  { key: "/apparel-and-textiles", label: "Apparel & Textiles", group: "Industries" },
  { key: "/packaging-materials", label: "Packaging Materials", group: "Industries" },
  { key: "/general-merchandise", label: "General Merchandise", group: "Industries" },
  { key: "/freight-and-logistics", label: "Freight & Logistics", group: "Industries" },
  { key: "/vehicles", label: "Vehicles", group: "Catalog" },
  { key: "/vehicles/*", label: "Vehicle Details", group: "Catalog" },
  { key: "/parts-accessories", label: "Parts & Accessories", group: "Catalog" },
  { key: "/parts", label: "Parts (Legacy Route)", group: "Catalog" },
  { key: "/parts-accessories/*", label: "Parts Category", group: "Catalog" },
  { key: "/categories/*", label: "Category Details", group: "Catalog" },
  { key: "/dubai-automotive", label: "Dubai Automotive", group: "Catalog" },
  { key: "/dubai-automotive/*", label: "Dubai Automotive Details", group: "Catalog" },
  { key: "/dubai-markets", label: "Dubai Markets", group: "Explore" },
  { key: "/brands", label: "Brands", group: "Explore" },
  { key: "/locations", label: "Locations", group: "Explore" },
  { key: "/how-it-works", label: "How It Works", group: "Explore" },
  { key: "/blogs", label: "Blogs", group: "Explore" },
  { key: "/business-solutions/*", label: "Business Solution Details", group: "Explore" },
  { key: "/careers", label: "Careers", group: "Explore" },
  { key: "/faqs", label: "FAQs", group: "Support" },
  { key: "/customer-reviews", label: "Customer Reviews", group: "Support" },
  { key: "/reviews", label: "Reviews (Alternate)", group: "Support" },
  { key: "/payment", label: "Payment", group: "Support" },
  { key: "/shipping", label: "Shipping", group: "Support" },
  { key: "/privacy-policy", label: "Privacy Policy", group: "Legal" },
  { key: "/refund-policy", label: "Refund Policy", group: "Legal" },
  { key: "/terms-and-conditions", label: "Terms & Conditions", group: "Legal" }
];
