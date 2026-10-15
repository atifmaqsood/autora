"use client";

import { MarketingPageEditor } from "@/components/admin/marketing-page-editor";
import { CatalogManager } from "@/components/admin/catalog-manager";
import { agtpAssets } from "@/src/assets";

export default function DubaiAutomotivePageAdmin() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 pb-12">
      <MarketingPageEditor
        pageKey="dubai-automotive"
        title="Dubai Automotive Page"
        description="Manage the automotive landscape, market cards and trade CTA without changing the website layout."
        definitions={[
          {
            key: "intro",
            label: "Automotive Landscape",
            description: "Image, badge and content",
            primaryTextLabel: "Image badge title",
            secondaryTextLabel: "Image badge subtitle",
          },
          {
            key: "market-parts-accessories",
            label: "Parts & Accessories",
            description: "Market card image and content",
          },
          {
            key: "market-engines-transmissions",
            label: "Engines & Transmissions",
            description: "Market card image and content",
          },
          {
            key: "market-tyres-rims-body-kits",
            label: "Tyres, Rims & Body Kits",
            description: "Market card image and content",
          },
          {
            key: "cta",
            label: "Trade CTA",
            description: "Background image and content",
          },
        ]}
        builtinImages={{
          "builtin:dubai-intro": agtpAssets.aboutYard.src,
          "builtin:dubai-parts": agtpAssets.sparePartsHero.src,
          "builtin:dubai-engines": agtpAssets.mercedesCclassCard.src,
          "builtin:dubai-tyres": agtpAssets.bmwX2Card.src,
          "builtin:dubai-cta": agtpAssets.inventoryHero.src,
        }}
      />
      <CatalogManager
        type="dubai"
        title="Dubai Automotive Categories & Products"
      />
    </div>
  );
}
