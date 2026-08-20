"use client";

import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { ParallaxImage } from "@/components/ui/parallax-image";
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
    <div className="bg-[#0B1F33] pb-24 text-white">
      {/* ── 1. Hero Header Banner with Background Image & Parallax ── */}
      <section className="relative min-h-[440px] bg-[#081A2B] border-b border-slate-800/80 overflow-hidden flex flex-col justify-center pt-40 pb-16">
        <ParallaxImage
          src={agtpAssets.careersHero}
          alt="Terms and Conditions Header"
          overlayOpacity="opacity-55"
          speed={0.25}
          className="absolute inset-0 w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#081A2B]/95 via-[#081A2B]/75 to-transparent z-10" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <RevealEyebrow>
            <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest text-slate-400 uppercase">
              <Link href="/" className="hover:text-white transition-colors">HOME</Link>
              <span>/</span>
              <span className="text-[#F97316]">TERMS AND CONDITIONS</span>
            </div>
          </RevealEyebrow>

          <RevealEyebrow delay={100}>
            <div className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.28em] text-[#FDBA74]">
              <span className="h-px w-9 bg-[#F97316]" />
              COMMERCIAL AGREEMENT & TERMS
            </div>
          </RevealEyebrow>

          <RevealHeading delay={150}>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white font-sans max-w-4xl leading-none drop-shadow-lg">
              TERMS AND CONDITIONS
            </h1>
          </RevealHeading>

          <RevealText delay={200}>
            <p className="text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed drop-shadow-md">
              Commercial terms governing trade, vehicle sourcing, spare parts export, and logistics services by AGTP Group L.L.C-FZ.
            </p>
          </RevealText>
        </div>
      </section>

      {/* ── 2. Main Terms Content Article with Line-by-Line Scroll Reveal ── */}
      <section className="mx-auto max-w-[1100px] px-6 pt-16">
        <div className="rounded-[24px] border border-[#315671] bg-[#102941] p-8 md:p-14 shadow-2xl text-[16px] font-medium leading-relaxed text-slate-300 space-y-10">
          <div className="border-b border-[#24445F] pb-8">
            <RevealLines lineStaggerMs={120}>
              <p className="text-[17px] leading-relaxed text-slate-200">
                AGTP Group L.L.C-FZ (“AGTP Group”, “we”, “our”, or “us”) operates as a Dubai-based trading and export company providing automotive and related export services to clients worldwide, with a primary focus on African markets.
              </p>
              <p className="mt-4 text-[15px] font-semibold text-[#FDBA74]">
                By accessing our website, requesting a quotation, placing an order, or making a payment, you (“the Client”, “you”) agree to be bound by the following Terms & Conditions.
              </p>
            </RevealLines>
          </div>

          {/* Section 1 */}
          <RevealLines lineStaggerMs={100}>
            <h2 className="text-[24px] font-black text-white">1. Scope of Services</h2>
            <p className="mt-3">AGTP Group provides services including, but not limited to:</p>
            <ul className="mt-3 list-disc pl-6 space-y-2 text-slate-200">
              <li>Sourcing and export of brand-new and used vehicles</li>
              <li>Export of tyres, engines, auto spare parts, body kits, and selected construction materials</li>
              <li>Supplier coordination and inspection facilitation</li>
              <li>Export documentation support</li>
              <li>Shipping coordination under agreed Incoterms</li>
            </ul>
            <p className="mt-3 text-[14px] text-slate-400">
              All services are provided strictly according to the agreed quotation, invoice, and Incoterms.
            </p>
          </RevealLines>

          {/* Section 2 */}
          <RevealLines lineStaggerMs={100}>
            <h2 className="text-[24px] font-black text-white">2. Quotations & Pricing</h2>
            <ul className="mt-3 list-disc pl-6 space-y-2 text-slate-200">
              <li>All quotations are provided based on current market conditions and are subject to availability.</li>
              <li>Prices may change due to supplier pricing, freight rates, port charges, or regulatory changes.</li>
              <li>A quotation does not constitute a binding contract until confirmed by payment or written acceptance.</li>
            </ul>
          </RevealLines>

          {/* Section 3 */}
          <RevealLines lineStaggerMs={100}>
            <h2 className="text-[24px] font-black text-white">3. Orders & Payments</h2>
            <ul className="mt-3 list-disc pl-6 space-y-2 text-slate-200">
              <li>Orders are confirmed only after receipt of the agreed payment.</li>
              <li>We accept secure online payments via payment links, including Visa, Mastercard, and US-issued cards, subject to payment processor approval.</li>
              <li>Any bank or card processing fees are the responsibility of the Client unless otherwise agreed.</li>
              <li>AGTP Group reserves the right to cancel or delay orders in cases of payment failure or compliance concerns.</li>
            </ul>
          </RevealLines>

          {/* Section 4 */}
          <RevealLines lineStaggerMs={100}>
            <h2 className="text-[24px] font-black text-white">4. Shipping & Incoterms</h2>
            <ul className="mt-3 list-disc pl-6 space-y-2 text-slate-200">
              <li>All shipments are executed strictly according to the agreed Incoterms (EXW, FOB, CNF, or CIF).</li>
              <li>Risk transfer, insurance responsibility, and cost allocation are governed by the selected Incoterm.</li>
              <li>Delivery timelines are estimates and may vary due to shipping schedules, port congestion, customs procedures, or force majeure events.</li>
            </ul>
          </RevealLines>

          {/* Section 5 */}
          <RevealLines lineStaggerMs={100}>
            <h2 className="text-[24px] font-black text-white">5. Inspection & Condition</h2>
            <ul className="mt-3 list-disc pl-6 space-y-2 text-slate-200">
              <li>Vehicles and products may be inspected prior to shipment based on client request.</li>
              <li>Used vehicles are sold in their current condition unless otherwise specified in writing.</li>
              <li>Minor cosmetic wear consistent with age and usage does not constitute a defect.</li>
            </ul>
          </RevealLines>

          {/* Section 6 */}
          <RevealLines lineStaggerMs={100}>
            <h2 className="text-[24px] font-black text-white">6. Documentation & Compliance</h2>
            <ul className="mt-3 list-disc pl-6 space-y-2 text-slate-200">
              <li>AGTP Group assists with export documentation from the UAE.</li>
              <li>The Client is solely responsible for import regulations, duties, taxes, homologation, and customs clearance in the destination country.</li>
              <li>AGTP Group is not liable for delays or losses arising from destination-country customs or regulatory actions.</li>
            </ul>
          </RevealLines>

          {/* Section 7 */}
          <RevealLines lineStaggerMs={100}>
            <h2 className="text-[24px] font-black text-white">7. Cancellations & Refunds</h2>
            <ul className="mt-3 list-disc pl-6 space-y-2 text-slate-200">
              <li>Orders cannot be cancelled once shipment or export processing has commenced.</li>
              <li>Refunds, if applicable, are evaluated on a case-by-case basis and may be subject to deductions for incurred costs.</li>
              <li>Card refunds are processed only through the original payment method and may take time depending on the issuing bank.</li>
            </ul>
          </RevealLines>

          {/* Section 8 */}
          <RevealLines lineStaggerMs={100}>
            <h2 className="text-[24px] font-black text-white">8. Limitation of Liability</h2>
            <p className="mt-3">AGTP Group shall not be liable for:</p>
            <ul className="mt-3 list-disc pl-6 space-y-2 text-slate-200">
              <li>Delays caused by shipping lines, ports, customs authorities, or force majeure events</li>
              <li>Losses arising after risk transfer under the agreed Incoterm</li>
              <li>Indirect, incidental, or consequential damages</li>
            </ul>
            <p className="mt-3 text-[14px] text-slate-400">
              Our liability, if any, shall not exceed the value of the service fees paid to AGTP Group.
            </p>
          </RevealLines>

          {/* Section 9 & 10 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-[#24445F]">
            <RevealLines lineStaggerMs={100}>
              <h2 className="text-[20px] font-black text-white">9. Intellectual Property</h2>
              <p className="mt-2 text-[15px]">
                All content on this website, including text, logos, images, and branding, is the property of AGTP Group L.L.C-FZ and may not be used without prior written consent.
              </p>
            </RevealLines>
            <RevealLines lineStaggerMs={100}>
              <h2 className="text-[20px] font-black text-white">10. Governing Law & Jurisdiction</h2>
              <p className="mt-2 text-[15px]">
                These Terms & Conditions are governed by the laws of the United Arab Emirates. Any disputes shall be subject to the exclusive jurisdiction of the competent courts of the UAE.
              </p>
            </RevealLines>
          </div>

          {/* Section 11 & 12 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#24445F]">
            <RevealLines lineStaggerMs={100}>
              <h2 className="text-[20px] font-black text-white">11. Amendments</h2>
              <p className="mt-2 text-[15px]">
                AGTP Group reserves the right to update or amend these Terms & Conditions at any time without prior notice. The latest version published on our website shall prevail.
              </p>
            </RevealLines>
            <RevealLines lineStaggerMs={100}>
              <h2 className="text-[20px] font-black text-white">12. Contact Information</h2>
              <p className="mt-2 text-[15px]">
                For any questions regarding these Terms & Conditions, please contact AGTP Group at <span className="text-[#FDBA74]">inquiries@agtpgroup.com</span> or WhatsApp <span className="text-[#FDBA74]">+971 58 5855729</span>.
              </p>
            </RevealLines>
          </div>

          {/* Disclaimer */}
          <Reveal>
            <div className="rounded-2xl border border-[#315671] bg-[#14314B] p-6 flex items-start gap-4 text-slate-300">
              <AlertCircle className="h-6 w-6 shrink-0 text-[#FDBA74]" />
              <div>
                <h4 className="text-[16px] font-black text-white">⚠️ Disclaimer</h4>
                <p className="mt-1 text-[14px]">
                  AGTP Group does not provide legal or customs advisory services in destination countries. Clients are advised to consult local authorities or customs agents where required.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
