"use client";

import Link from "next/link";
import { AlertCircle, Database, Eye, Lock, Shield } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { agtpAssets } from "@/src/assets";
import {
  Reveal,
  RevealEyebrow,
  RevealHeading,
  RevealLines,
  RevealText
} from "@/components/ui/scroll-reveal";

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#060709] pb-24 text-white">
      {/* ── 1. Hero Header Banner matching new design ── */}
      <PageHero
        breadcrumbs={[
          { label: "HOME", href: "/" },
          { label: "PRIVACY POLICY" }
        ]}
        badge={{
          text: "DATA PROTECTION & PRIVACY"
        }}
        title="PRIVACY POLICY"
        subtitle="How AGTP Group L.L.C-FZ collects, uses, stores, and protects your personal and business information."
        imageSrc={agtpAssets.aboutHero}
        imageAlt="Privacy Policy AGTP Group"
      />

      {/* ── 2. Main Privacy Policy Article with Line-by-Line Scroll Reveal ── */}
      <section className="mx-auto max-w-[1100px] px-6 pt-16">
        <div className="rounded-[24px] border border-[#315671] bg-[#102941] p-8 md:p-14 shadow-2xl text-[16px] font-medium leading-relaxed text-slate-300 space-y-10">
          <div className="border-b border-[#24445F] pb-8">
            <RevealLines lineStaggerMs={120}>
              <p className="text-[17px] leading-relaxed text-slate-200">
                AGTP Group L.L.C-FZ (“AGTP Group”, “we”, “our”, or “us”) respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, store, and safeguard your information when you interact with our website, services, or communication channels.
              </p>
              <p className="mt-4 text-[15px] font-semibold text-[#FDBA74]">
                By using our website or services, you agree to the practices described in this policy.
              </p>
            </RevealLines>
          </div>

          {/* Section 1 */}
          <RevealLines lineStaggerMs={100}>
            <h2 className="text-[24px] font-black text-white flex items-center gap-3">
              <Database className="h-6 w-6 text-[#F97316]" />
              1. Information We Collect
            </h2>
            <p className="mt-3">We may collect and process the following types of information:</p>
            <ul className="mt-3 list-disc pl-6 space-y-2 text-slate-200">
              <li>Personal identification information (name, email address, phone number, company name)</li>
              <li>Business and transaction details related to inquiries, quotations, and orders</li>
              <li>Payment-related information processed through secure third-party payment providers</li>
              <li>Communication data from emails, WhatsApp, contact forms, or other channels</li>
              <li>Technical data such as IP address, browser type, and website usage analytics</li>
            </ul>
            <p className="mt-3 text-[14px] text-slate-400">
              AGTP Group does not intentionally collect sensitive personal data unless required for service delivery.
            </p>
          </RevealLines>

          {/* Section 2 */}
          <RevealLines lineStaggerMs={100}>
            <h2 className="text-[24px] font-black text-white flex items-center gap-3">
              <Eye className="h-6 w-6 text-[#F97316]" />
              2. How We Use Your Information
            </h2>
            <p className="mt-3">Your information may be used for the following purposes:</p>
            <ul className="mt-3 list-disc pl-6 space-y-2 text-slate-200">
              <li>Responding to inquiries and providing quotations</li>
              <li>Processing orders, payments, and export-related services</li>
              <li>Communicating updates related to shipments, documentation, or services</li>
              <li>Improving our website, services, and customer experience</li>
              <li>Complying with legal, regulatory, and compliance obligations</li>
            </ul>
            <p className="mt-3 text-[14px] text-[#FDBA74]">
              We use your information strictly for legitimate business purposes.
            </p>
          </RevealLines>

          {/* Section 3 */}
          <RevealLines lineStaggerMs={100}>
            <h2 className="text-[24px] font-black text-white flex items-center gap-3">
              <Lock className="h-6 w-6 text-[#F97316]" />
              3. Payment Security
            </h2>
            <p className="mt-3">
              Payments made through AGTP Group are processed via secure online payment links using trusted third-party payment service providers. We do not store or process full card details on our servers. Accepted payment methods include Visa, Mastercard, and US-issued cards, subject to payment processor policies.
            </p>
          </RevealLines>

          {/* Section 4 */}
          <RevealLines lineStaggerMs={100}>
            <h2 className="text-[24px] font-black text-white flex items-center gap-3">
              <Shield className="h-6 w-6 text-[#F97316]" />
              4. Information Sharing & Disclosure
            </h2>
            <p className="mt-3">
              AGTP Group does not sell, rent, or trade your personal information. We may share information only with:
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-2 text-slate-200">
              <li>Trusted service providers (logistics partners, payment processors, inspection agencies)</li>
              <li>Regulatory or legal authorities when required by law</li>
              <li>Business partners involved in fulfilling agreed services</li>
            </ul>
            <p className="mt-3 text-[14px] text-slate-400">
              All third parties are expected to maintain confidentiality and data protection standards.
            </p>
          </RevealLines>

          {/* Section 5 & 6 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-[#24445F]">
            <RevealLines lineStaggerMs={100}>
              <h2 className="text-[20px] font-black text-white">5. Data Retention</h2>
              <p className="mt-2 text-[15px]">
                We retain personal and business information only for as long as necessary to fulfill service obligations, maintain business records, and comply with legal and regulatory requirements. Once data is no longer required, it is securely deleted or anonymized.
              </p>
            </RevealLines>
            <RevealLines lineStaggerMs={100}>
              <h2 className="text-[20px] font-black text-white">6. Data Security</h2>
              <p className="mt-2 text-[15px]">
                We implement reasonable administrative, technical, and organizational measures to protect your information against unauthorized access, misuse, loss, or disclosure. While no system is completely secure, we take appropriate steps to safeguard your data.
              </p>
            </RevealLines>
          </div>

          {/* Section 7, 8, 9 */}
          <div className="space-y-6 pt-4 border-t border-[#24445F]">
            <RevealLines lineStaggerMs={100}>
              <h2 className="text-[20px] font-black text-white">7. Your Rights</h2>
              <p className="mt-2 text-[15px]">
                Depending on applicable laws, you may have the right to request access to your personal data, request correction or updates to inaccurate information, or request deletion of your data (subject to legal obligations). Requests can be submitted through our official contact channels.
              </p>
            </RevealLines>
            <RevealLines lineStaggerMs={100}>
              <h2 className="text-[20px] font-black text-white">8. Cookies & Website Analytics</h2>
              <p className="mt-2 text-[15px]">
                Our website may use cookies or similar technologies to enhance user experience and analyze website traffic. You may adjust your browser settings to refuse cookies, though this may affect website functionality.
              </p>
            </RevealLines>
            <RevealLines lineStaggerMs={100}>
              <h2 className="text-[20px] font-black text-white">9. Third-Party Links</h2>
              <p className="mt-2 text-[15px]">
                Our website may contain links to third-party websites. AGTP Group is not responsible for the privacy practices or content of external sites.
              </p>
            </RevealLines>
          </div>

          {/* Section 10 & 11 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#24445F]">
            <RevealLines lineStaggerMs={100}>
              <h2 className="text-[20px] font-black text-white">10. Policy Updates</h2>
              <p className="mt-2 text-[15px]">
                AGTP Group reserves the right to update this Privacy Policy at any time. Any changes will be posted on this page, and continued use of our website constitutes acceptance of the updated policy.
              </p>
            </RevealLines>
            <RevealLines lineStaggerMs={100}>
              <h2 className="text-[20px] font-black text-white">11. Contact Information</h2>
              <p className="mt-2 text-[15px]">
                For questions regarding this Privacy Policy or how we handle your data, please contact AGTP Group at <span className="text-[#FDBA74]">inquiries@agtpgroup.com</span> or WhatsApp <span className="text-[#FDBA74]">+971 58 5855729</span>.
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
                  AGTP Group does not provide legal advice. Clients are responsible for understanding and complying with applicable data protection laws in their respective jurisdictions.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
