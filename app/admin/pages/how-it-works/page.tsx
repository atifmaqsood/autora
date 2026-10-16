"use client";

import { MarketingPageEditor } from "@/components/admin/marketing-page-editor";
import { agtpAssets } from "@/src/assets";

export default function HowItWorksPageAdmin() {
  return (
    <MarketingPageEditor
      pageKey="how-it-works"
      title="How It Works Page"
      description="Manage both walkthrough videos and the order CTA without changing the website layout."
      definitions={[
        { key: "video-portuguese", label: "Portuguese Video", description: "Video and content", allowVideo: true, videoOnly: true },
        { key: "video-english", label: "English Video", description: "Video and content", allowVideo: true, videoOnly: true },
        { key: "cta", label: "Order CTA", description: "Background image and content" },
      ]}
      builtinImages={{
        "builtin:how-portuguese": agtpAssets.heroYard.src,
        "builtin:how-english": agtpAssets.exportPort.src,
        "builtin:how-cta": agtpAssets.inventoryHero.src,
      }}
    />
  );
}
