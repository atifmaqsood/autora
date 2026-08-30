"use client";

import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { agtpAssets } from "@/src/assets";
import {
  Reveal,
  RevealLines
} from "@/components/ui/scroll-reveal";

export default function RefundPolicyPage() {
  return (
    <div className="bg-[#060709] pb-24 text-white">
      {/* ── 1. Hero Header Banner matching new design ── */}
      <PageHero
        breadcrumbs={[
          { label: "HOME", href: "/" },
          { label: "REFUND POLICY" }
        ]}
        badge={{
          text: "REFUND TERMS & CONDITIONS"
        }}
        title="REFUND POLICY"
        subtitle="Terms governing refund evaluations, eligibility, and payment processing for AGTP Group L.L.C-FZ."
        imageSrc={agtpAssets.aboutHero}
        imageAlt="Refund Policy AGTP Group"
      />

      {/* ── 2. Main Content Article with Line-by-Line Scroll Reveal ── */}
      <section className="mx-auto max-w-[1100px] px-6 pt-16">
        <div className="rounded-[24px] border border-[#315671] bg-[#102941] p-8 md:p-14 shadow-2xl text-[16px] font-medium leading-relaxed text-slate-300 space-y-10">
          <div className="border-b border-[#24445F] pb-8">
            <RevealLines lineStaggerMs={120}>
              <p className="text-[17px] leading-relaxed text-slate-200">
                AGTP Group L.L.C-FZ (&quot;AGTP Group&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to conducting business in a transparent and professional manner. This Refund Policy outlines the terms under which refunds may be considered for services and products provided by AGTP Group.
              </p>
              <p className="mt-4 text-[15px] font-semibold text-[#FDBA74]">
                By placing an order or making a payment with AGTP Group, you acknowledge and agree to the terms stated below.
              </p>
            </RevealLines>
          </div>

          {/* Section 1 */}
          <RevealLines lineStaggerMs={100}>
            <h2 className="text-[24px] font-black text-white">1. General Policy</h2>
            <p className="mt-3">
              AGTP Group provides sourcing and export services tailored to client requirements. Due to the nature of international trade and export operations, all sales are generally considered final once processing has commenced. Refunds are not guaranteed and are reviewed strictly on a case-by-case basis in accordance with this policy.
            </p>
          </RevealLines>

          {/* Section 2 */}
          <RevealLines lineStaggerMs={100}>
            <h2 className="text-[24px] font-black text-white">2. Eligibility for Refunds</h2>
            <p className="mt-3">Refunds may be considered only under the following circumstances:</p>
            <ul className="mt-3 list-disc pl-6 space-y-2 text-slate-200">
              <li>Duplicate or excess payments made in error</li>
              <li>Payments received for services that cannot be fulfilled by AGTP Group</li>
              <li>Transaction errors confirmed by our payment service provider</li>
            </ul>
            <p className="mt-3 text-[14px] text-slate-400">
              Refund eligibility applies only to payments received directly by AGTP Group through approved payment methods.
            </p>
          </RevealLines>

          {/* Section 3 */}
          <RevealLines lineStaggerMs={100}>
            <h2 className="text-[24px] font-black text-white">3. Non-Refundable Situations</h2>
            <p className="mt-3">Refunds will not be issued in the following cases:</p>
            <ul className="mt-3 list-disc pl-6 space-y-2 text-slate-200">
              <li>Orders where sourcing, export documentation, or shipping arrangements have already commenced</li>
              <li>Delays caused by shipping lines, ports, customs authorities, or force majeure events</li>
              <li>Client change of mind after order confirmation</li>
              <li>Differences in used vehicle condition consistent with age and usage</li>
              <li>Customs issues, duties, taxes, or regulatory restrictions in the destination country</li>
            </ul>
          </RevealLines>

          {/* Section 4 */}
          <RevealLines lineStaggerMs={100}>
            <h2 className="text-[24px] font-black text-white">4. Payment Methods & Refund Processing</h2>
            <ul className="mt-3 list-disc pl-6 space-y-2 text-slate-200">
              <li>Refunds, if approved, will be processed only to the original payment method used at the time of purchase.</li>
              <li>We accept online payments via secure payment links, including Visa, Mastercard, and US-issued cards.</li>
              <li>Processing times for refunds depend on the issuing bank or card provider and may take 7–30 business days.</li>
            </ul>
            <p className="mt-3 text-[14px] text-slate-400">
              Any transaction or processing fees charged by payment processors or banks may be deducted from the refundable amount.
            </p>
          </RevealLines>

          {/* Section 5 */}
          <RevealLines lineStaggerMs={100}>
            <h2 className="text-[24px] font-black text-white">5. Partial Refunds</h2>
            <p className="mt-3">In certain cases, partial refunds may be approved after deducting:</p>
            <ul className="mt-3 list-disc pl-6 space-y-2 text-slate-200">
              <li>Administrative costs</li>
              <li>Documentation or processing fees</li>
              <li>Shipping or logistics charges already incurred</li>
              <li>Payment processing or transaction fees</li>
            </ul>
            <p className="mt-3 text-[14px] text-[#FDBA74]">The final refundable amount, if any, will be communicated in writing.</p>
          </RevealLines>

          {/* Section 6 */}
          <RevealLines lineStaggerMs={100}>
            <h2 className="text-[24px] font-black text-white">6. Refund Request Procedure</h2>
            <p className="mt-3">To request a refund, clients must:</p>
            <ul className="mt-3 list-disc pl-6 space-y-2 text-slate-200">
              <li>Submit a written request via AGTP Group&apos;s official contact channels</li>
              <li>Provide proof of payment and order reference details</li>
              <li>Clearly state the reason for the refund request</li>
            </ul>
          </RevealLines>

          {/* Section 7 */}
          <RevealLines lineStaggerMs={100}>
            <h2 className="text-[24px] font-black text-white">7. Chargebacks & Disputes</h2>
            <p className="mt-3">
              Clients are encouraged to contact AGTP Group directly before initiating chargebacks or disputes with their bank or card issuer. Unauthorized chargebacks may result in service suspension and additional administrative charges.
            </p>
          </RevealLines>

          {/* Section 8 & 9 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#24445F]">
            <RevealLines lineStaggerMs={100}>
              <h2 className="text-[20px] font-black text-white">8. Policy Updates</h2>
              <p className="mt-2 text-[15px]">
                AGTP Group reserves the right to modify or update this Refund Policy at any time. The latest version published on our website shall apply.
              </p>
            </RevealLines>
            <RevealLines lineStaggerMs={100}>
              <h2 className="text-[20px] font-black text-white">9. Contact Information</h2>
              <p className="mt-2 text-[15px]">
                For questions related to refunds, contact us at <span className="text-[#FDBA74]">inquiries@agtpgroup.com</span> or WhatsApp <span className="text-[#FDBA74]">+971 58 5855729</span>.
              </p>
            </RevealLines>
          </div>

          {/* Notice Banner */}
          <Reveal>
            <div className="rounded-2xl border border-[#F97316]/40 bg-[#F97316]/10 p-6 flex items-start gap-4 text-[#FDBA74]">
              <AlertCircle className="h-7 w-7 shrink-0 text-[#F97316]" />
              <div>
                <h4 className="text-[17px] font-black uppercase text-white">
                  IMPORTANT NOTICE REGARDING REFUND ELIGIBILITY
                </h4>
                <p className="mt-1 text-[14px] leading-relaxed text-slate-300">
                  Not all orders or payments are eligible for a refund. Refund requests are reviewed according to the terms and conditions of this Refund Policy.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
