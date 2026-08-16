import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Logo } from "./logo";

export function StoreFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-[#1c2436] bg-[#0b1020] pt-16 text-slate-400">
      <div className="mx-auto max-w-[1720px] px-6 pb-6 pt-14 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-[1.1fr_0.75fr_0.9fr_0.9fr_1.1fr] xl:gap-x-14">
          <div className="space-y-8">
            <Logo />
            <p className="text-[15px] font-semibold text-[#9cadff]">Dubai to Worldwide</p>
            <p className="max-w-sm text-[17px] font-medium leading-[1.45] text-slate-400">
              Your trusted global partner for seamless import/export, offering reliable sourcing,
              competitive pricing, and efficient logistics.
            </p>
            <div className="flex items-center gap-4">
              {[
                { label: "LinkedIn", icon: Linkedin },
                { label: "Instagram", icon: Instagram },
                { label: "WhatsApp", icon: MessageCircle },
                { label: "Facebook", icon: Facebook }
              ].map((item) => (
                <a
                  key={item.label}
                  href="#"
                className="flex h-11 w-11 items-center justify-center rounded-[12px] border border-[#25304b] text-white transition-colors hover:border-[#536dfe] hover:bg-[#536dfe]"
                  aria-label={item.label}
                >
                  <item.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <FooterColumn
            title="COMPANY"
            links={[
              ["How It Works", "/#how-it-works"],
              ["About Us", "/about-us"],
              ["Contact Us", "/contact-us"],
              ["Refund Policy", "/refund-policy"],
              ["FAQs", "/faqs"]
            ]}
          />

          <FooterColumn
            title="QUICK LINKS"
            links={[
              ["Dubai Markets", "/#dubai-markets"],
              ["Customer Reviews", "/#customer-reviews"],
              ["Payment", "/payment"],
              ["Get A Quote", "/contact-us"],
              ["Blogs & Articles", "/blogs"]
            ]}
          />

          <FooterColumn
            title="AREAS OF EXPERTISE"
            links={[
              ["Automotive Vehicles", "/vehicles"],
              ["Automotive Parts", "/spare-parts"],
              ["Freight & Logistics", "/business-solutions"]
            ]}
          />

          <div className="space-y-6">
            <h4 className="text-[14px] font-black tracking-[0.24em] text-slate-500">GET IN TOUCH</h4>
            <ul className="space-y-6 text-[17px] font-medium leading-[1.45]">
              <li className="flex items-start gap-5">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-[#8ea2ff]" />
                <span>Sharjah Media City, Sharjah, United Arab Emirates</span>
              </li>
              <li className="flex items-center gap-5">
                <Phone className="h-5 w-5 shrink-0 text-[#8ea2ff]" />
                <span>+971 58 585729</span>
              </li>
              <li className="flex items-center gap-5">
                <MessageCircle className="h-5 w-5 shrink-0 text-[#8ea2ff]" />
                <span>agtpgroup@gmail.com</span>
              </li>
              <li className="flex items-center gap-5">
                <Mail className="h-5 w-5 shrink-0 text-[#8ea2ff]" />
                <span>inquiries@agtpgroup.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pointer-events-none mt-20 select-none overflow-hidden text-center">
          <span className="inline-block text-[12.5vw] font-black uppercase leading-none tracking-normal text-transparent opacity-35 footer-watermark">
            AGTP GROUP
          </span>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-[#1c2436] pt-8 text-[15px] font-semibold text-slate-300 md:flex-row md:items-center md:justify-between">
          <span>AGTP Group LLC | All rights reserved</span>
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
          <li key={label}>
            <Link href={href} className="transition-colors hover:text-white">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}


