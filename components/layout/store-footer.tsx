"use client";

import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone, Facebook, Instagram, Linkedin } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { useContent } from "@/lib/content/context";

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/agtpgroup", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/agtpgroup/", label: "Instagram" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/agtp-group-l-l-c/", label: "LinkedIn" },
  { icon: MessageCircle, href: "https://wa.me/971585855729", label: "WhatsApp" },
  { icon: Mail, href: "mailto:inquiries@agtpgroup.com", label: "Email" }
];

export function StoreFooter() {
  const { content } = useContent();
  const site = content?.site || {};
  const brandName = site.brandName || "AGTP GROUP";
  const supportEmail = site.supportEmail || "inquiries@agtpgroup.com";
  const supportPhone = site.supportPhone || "+971 58 58 55729";
  const defaultLocation =
    site.defaultLocation ||
    "Meydan Grandstand, 6th Floor, Meydan Road, Nad Al Sheba, Dubai, United Arab Emirates";

  return (
    <footer
      className="store-footer border-t border-[#24445F] text-slate-300 transition-colors duration-300"
      style={{ backgroundColor: "var(--agtp-footer, #071626)" }}
    >
      <div className="mx-auto max-w-[1570px] px-6 py-20">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-2 lg:grid-cols-5">
          <div className="space-y-6 lg:col-span-1">
            <Logo />
            <p className="text-[15px] font-medium leading-[1.6] text-slate-400">
              {brandName} is a premier trading and export powerhouse delivering commercial and private vehicles, automotive spare parts, and specialized heavy machinery worldwide.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-[12px] border border-[#315671] text-white transition-colors hover:border-[#F97316] hover:bg-[#F97316]"
                  aria-label={item.label}
                  title={item.label}
                >
                  <item.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <FooterColumn
            title="COMPANY"
            links={[
              ["How It Works", "/how-it-works"],
              ["About Us", "/about-us"],
              ["Contact Us", "/contact-us"],
              ["Refund Policy", "/refund-policy"],
              ["FAQs", "/faqs"]
            ]}
          />

          <FooterColumn
            title="QUICK LINKS"
            links={[
              ["Dubai Markets", "/dubai-markets"],
              ["Customer Reviews", "/customer-reviews"],
              ["Payment", "/payment"],
              ["Blogs & Articles", "/blogs"],
              ["Careers", "/careers"]
            ]}
          />

          <FooterColumn
            title="AREAS OF EXPERTISE"
            links={[
              ["Automotive Vehicles", "/vehicles"],
              ["Automotive Parts", "/spare-parts"],
              ["Freight & Logistics", "/freight-and-logistics"]
            ]}
          />

          <div className="space-y-6">
            <h4 className="text-[14px] font-black tracking-[0.24em] text-slate-500">GET IN TOUCH</h4>
            <ul className="space-y-4 text-[16px] font-medium leading-[1.45]">
              <li className="flex items-start gap-4">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-[#FDBA74]" />
                <span>{defaultLocation}</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="h-5 w-5 shrink-0 text-[#FDBA74]" />
                <a href={`tel:${supportPhone.replace(/\s+/g, "")}`} className="transition-colors hover:text-white">
                  {supportPhone}
                </a>
              </li>
              <li className="flex items-center gap-4">
                <MessageCircle className="h-5 w-5 shrink-0 text-emerald-400" />
                <a
                  href={`https://wa.me/${supportPhone.replace(/[^0-9]/g, "") || "971585855729"}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-emerald-400"
                >
                  WhatsApp: {supportPhone}
                </a>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="h-5 w-5 shrink-0 text-[#FDBA74]" />
                <a href={`mailto:${supportEmail}`} className="transition-colors hover:text-white">
                  {supportEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pointer-events-none mt-20 select-none overflow-hidden text-center">
          <span className="inline-block text-[12.5vw] font-black uppercase leading-none tracking-normal text-transparent opacity-80 footer-watermark">
            {brandName}
          </span>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-[#24445F] pt-8 text-[15px] font-semibold text-slate-300 md:flex-row md:items-center md:justify-between">
          <span>{brandName} LLC | All rights reserved</span>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy-policy" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <span className="text-slate-600">•</span>
            <Link href="/terms-and-conditions" className="transition-colors hover:text-white">
              Terms and Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div className="space-y-6">
      <h4 className="text-[14px] font-black tracking-[0.24em] text-slate-500">{title}</h4>
      <ul className="space-y-5 text-[17px] font-medium">
        {links.map(([label, href]) => (
          <li key={`${label}-${href}`}>
            <Link href={href} className="transition-colors hover:text-white">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
