"use client";

import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { agtpAssets } from "@/src/assets";
import {
  Reveal,
  RevealEyebrow,
  RevealHeading,
  RevealLines,
  RevealText
} from "@/components/ui/scroll-reveal";

export default function TermsAndConditionsPage() {
  return (
    <div className="bg-[#060709] pb-24 text-white">
      {/* ── 1. Hero Header Banner matching new design ── */}
      <PageHero
        breadcrumbs={[
          { label: "HOME", href: "/" },
          { label: "TERMS AND CONDITIONS" }
        ]}
        badge={{
          text: "COMMERCIAL AGREEMENT & TERMS"
        }}
        title="TERMS AND CONDITIONS"
        subtitle="Commercial terms governing international vehicle and automotive spare-parts exports by AGTP Group L.L.C-FZ."
        imageSrc={agtpAssets.aboutHero}
        imageAlt="Terms and Conditions AGTP Group"
      />

      {/* ── 2. Main Terms Content Article with Line-by-Line Scroll Reveal ── */}
      <section className="mx-auto max-w-[1100px] px-6 pt-16">
        <div className="rounded-[24px] border border-[#315671] bg-[#102941] p-8 md:p-14 shadow-2xl text-[16px] font-medium leading-relaxed text-slate-300 space-y-10">
          <div className="border-b border-[#24445F] pb-8">
            <RevealLines lineStaggerMs={120}>
              <p className="text-[17px] leading-relaxed text-slate-200">
                AGTP Group L.L.C-FZ (“AGTP Group”, “we”, “our”, or “us”) is a Dubai-based automotive trading and export company specializing in the international export of vehicles and automotive spare parts from the United Arab Emirates to customers worldwide. AGTP Group does not offer local retail or domestic sales within the UAE.              </p>
              <p className="mt-4 text-[15px] font-semibold text-[#FDBA74]">
                By accessing our website, requesting a quotation, placing an order, or making a payment, you (“Client”, “you”, or “your”) agree to be bound by these Terms & Conditions.              </p>
            </RevealLines>
          </div>

          {/* Section 1 */}
          <RevealLines lineStaggerMs={100}>
            <h2 className="text-[24px] font-black text-white">1. Scope of Business</h2>
            <p className="mt-3 text-slate-200">
              AGTP Group supplies and exports automotive products, including but not limited to:
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-2 text-slate-200">
              <li>Brand-new and pre-owned vehicles</li>
              <li>Automotive spare parts and components</li>
              <li>Genuine, OEM, and aftermarket parts</li>
              <li>Engines and transmissions</li>
              <li>Tyres and wheels</li>
              <li>Body parts, body kits, and accessories</li>
            </ul>
            <p className="mt-4 text-[15px] text-slate-300">
              All products are supplied for international export from the UAE according to the agreed quotation, invoice, and applicable delivery terms.
            </p>
          </RevealLines>

          {/* Section 2 */}
          <RevealLines lineStaggerMs={100}>
            <h2 className="text-[24px] font-black text-white">2. Quotations & Pricing</h2>
            <ul className="mt-3 list-disc pl-6 space-y-2 text-slate-200">
              <li>All quotations are subject to product availability and current market conditions.</li>
              <li>Prices may change due to product availability, market pricing, freight charges, exchange rates, or regulatory changes.</li>
              <li>A quotation is valid only for the period stated on the quotation.</li>
              <li>A quotation does not constitute a confirmed order until accepted and the required payment is received.</li>
              <li>Destination-country duties, taxes, customs charges, and local fees are excluded unless expressly stated.</li>
            </ul>
          </RevealLines>

          {/* Section 3 */}
          <RevealLines lineStaggerMs={100}>
            <h2 className="text-[24px] font-black text-white">3. Orders & Payments</h2>
            <ul className="mt-3 list-disc pl-6 space-y-2 text-slate-200">
              <li>Orders are confirmed only after receipt of the agreed payment and confirmation by AGTP Group.</li>
              <li>Unless otherwise agreed in writing, full payment is required before order processing and shipment.</li>
              <li>Payments may be made through approved online payment methods, bank transfer, or other agreed methods.</li>
              <li>Applicable bank, card, payment gateway, or transaction fees are the Client&apos;s responsibility unless otherwise agreed.</li>
              <li>AGTP Group may delay or cancel orders affected by payment failure, reversal, dispute, or compliance concerns.</li>
            </ul>
          </RevealLines>

          {/* Section 4 */}
          <RevealLines lineStaggerMs={100}>
            <h2 className="text-[24px] font-black text-white">4. Export & Shipping</h2>
            <ul className="mt-3 list-disc pl-6 space-y-2 text-slate-200">
              <li>AGTP Group exports vehicles and automotive spare parts from Dubai, UAE, to international destinations.</li>
              <li>AGTP Group does not provide local UAE retail or domestic sales.</li>
              <li>Shipping may include RoRo, containerized ocean freight, air cargo, or other agreed transportation methods.</li>
              <li>Shipping responsibilities and costs are determined by the agreed quotation, invoice, and applicable Incoterm.</li>
              <li>Delivery timelines are estimates and may be affected by shipping schedules, port congestion, customs procedures, weather, or other delays.</li>
            </ul>
          </RevealLines>

          {/* Section 5 */}
          <RevealLines lineStaggerMs={100}>
            <h2 className="text-[24px] font-black text-white">5. Product Condition</h2>
            <ul className="mt-3 list-disc pl-6 space-y-2 text-slate-200">
              <li>Product specifications, images, videos, and descriptions are provided for purchasing and identification purposes.</li>
              <li>Clients are responsible for reviewing product information before confirming an order.</li>
              <li>Pre-owned vehicles and used products may contain normal signs of age, mileage, use, or cosmetic wear.</li>
              <li>Spare-parts compatibility should be confirmed using the vehicle details, VIN/chassis number, or part number where applicable.</li>
              <li>AGTP Group is not responsible for compatibility issues resulting from inaccurate information provided by the Client.</li>
            </ul>
          </RevealLines>

          {/* Section 6 */}
          <RevealLines lineStaggerMs={100}>
            <h2 className="text-[24px] font-black text-white">6. Export Documentation & Compliance</h2>
            <ul className="mt-3 list-disc pl-6 space-y-2 text-slate-200">
              <li>AGTP Group may provide or coordinate export documentation required from the UAE.</li>
              <li>The Client is responsible for destination-country import regulations, customs clearance, duties, taxes, registration, homologation, and other local requirements.</li>
              <li>AGTP Group is not responsible for delays, additional costs, rejection, penalties, or other consequences resulting from destination-country regulations or government actions.</li>
            </ul>
          </RevealLines>

          {/* Section 7 */}
          <RevealLines lineStaggerMs={100}>
            <h2 className="text-[24px] font-black text-white">7. Cancellations & Refunds</h2>
            <ul className="mt-3 list-disc pl-6 space-y-2 text-slate-200">
              <li>Cancellation requests must be submitted to AGTP Group in writing.</li>
              <li>Orders cannot normally be cancelled once export processing, shipment preparation, or documentation has commenced.</li>
              <li>Approved refunds may be subject to deductions for costs already incurred.</li>
              <li>Such deductions may include administrative, documentation, processing, payment, shipping, logistics, or other non-recoverable costs.</li>
              <li>Refunds through card or online payment methods are generally processed through the original payment method and may take time depending on the payment provider or issuing bank.</li>
            </ul>
          </RevealLines>

          {/* Section 8 */}
          <RevealLines lineStaggerMs={100}>
            <h2 className="text-[24px] font-black text-white">8. Limitation of Liability</h2>
            <p className="mt-3 text-slate-200">AGTP Group shall not be liable for:</p>
            <ul className="mt-3 list-disc pl-6 space-y-2 text-slate-200">
              <li>Delays caused by shipping companies, ports, customs authorities, or other third parties</li>
              <li>Losses arising after risk transfers under the agreed Incoterm</li>
              <li>Destination-country duties, taxes, customs decisions, or regulatory requirements</li>
              <li>Indirect, incidental, or consequential losses</li>
              <li>Losses caused by inaccurate information provided by the Client</li>
            </ul>
            <p className="mt-4 text-[15px] text-slate-300">
              To the extent permitted by applicable law, AGTP Group&apos;s liability shall not exceed the amount paid for the specific product or service giving rise to the claim.
            </p>
          </RevealLines>

          {/* Section 9 & 10 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-[#24445F]">
            <RevealLines lineStaggerMs={100}>
              <h2 className="text-[20px] font-black text-white">9. Intellectual Property</h2>
              <p className="mt-3 text-[15px] text-slate-200">
                All content on the AGTP Group website, including text, logos, images, graphics, videos, and branding, is owned by or licensed to AGTP Group L.L.C-FZ and may not be used without prior written consent.
              </p>
            </RevealLines>
            <RevealLines lineStaggerMs={100}>
              <h2 className="text-[20px] font-black text-white">10. Governing Law & Jurisdiction</h2>
              <p className="mt-3 text-[15px] text-slate-200">
                These Terms & Conditions are governed by the applicable laws of the United Arab Emirates. Any disputes shall be subject to the jurisdiction of the competent courts of the UAE, unless otherwise required by applicable law.
              </p>
            </RevealLines>
          </div>

          {/* Section 11 & 12 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-[#24445F]">
            <RevealLines lineStaggerMs={100}>
              <h2 className="text-[20px] font-black text-white">11. Amendments</h2>
              <p className="mt-3 text-[15px] text-slate-200">
                AGTP Group reserves the right to update or amend these Terms & Conditions from time to time. The latest version published on our website shall apply to future transactions from its effective date.
              </p>
            </RevealLines>
            <RevealLines lineStaggerMs={100}>
              <h2 className="text-[20px] font-black text-white">12. Contact Information</h2>
              <p className="mt-3 text-[15px] text-slate-200">
                For questions regarding these Terms & Conditions, orders, payments, export, or shipping, please contact AGTP Group through the official contact details listed on our website.
              </p>
            </RevealLines>
          </div>

          {/* Disclaimer */}
          <Reveal>
            <div className="rounded-2xl border border-[#315671] bg-[#14314B] p-6 flex items-start gap-4 text-slate-300">
              <AlertCircle className="h-6 w-6 shrink-0 text-[#FDBA74]" />
              <div>
                <h4 className="text-[16px] font-black text-white">⚠️ Disclaimer</h4>
                <p className="mt-1 text-[14px] text-slate-200">
                  AGTP Group exports vehicles and automotive spare parts from Dubai, UAE. We do not provide local UAE sales. Clients are responsible for meeting their destination’s import requirements.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
