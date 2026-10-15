"use client";

import { MarketingPageEditor } from "@/components/admin/marketing-page-editor";
import { agtpAssets } from "@/src/assets";

export default function ShippingPageAdmin() {
  return (
    <MarketingPageEditor
      pageKey="shipping"
      title="Shipping Page"
      description="Manage the shipping introduction, method cards and quote section without changing their layouts."
      definitions={[
        { key: "intro", label: "Shipping Introduction", description: "Image and content" },
        { key: "ocean", label: "Ocean Shipping", description: "Card image and content" },
        { key: "air", label: "Air Shipping", description: "Card image and content" },
        { key: "cta", label: "Ready to Ship CTA", description: "Background, content and buttons" },
      ]}
      builtinImages={{
        "builtin:shipping-intro": agtpAssets.aboutYard.src,
        "builtin:shipping-ocean": agtpAssets.exportPort.src,
        "builtin:shipping-air": agtpAssets.sparePartsHero.src,
        "builtin:shipping-cta": agtpAssets.inventoryHero.src,
      }}
    />
  );
}
