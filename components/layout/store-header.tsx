"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, Mail, Menu, MessageCircle, Phone, Send, X } from "lucide-react";
import { Logo } from "./logo";
import { VehicleInquiryModal } from "@/components/vehicles/vehicle-inquiry-modal";

export function StoreHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const businessLinks = [
    { name: "Automotive", href: "/automotive" },
    { name: "Construction Materials", href: "/construction-materials" },
    { name: "Furniture And Home Items", href: "/furniture-and-home-items" },
    { name: "General Merchandise", href: "/general-merchandise" },
    { name: "Industrial Equipment", href: "/industrial-equipment" },
    { name: "Packaging Materials", href: "/packaging-materials" },
    { name: "Apparel And Textiles", href: "/apparel-and-textiles" },
    { name: "Electronics", href: "/electronics" }
  ];

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Brands", href: "/brands" },
    { name: "FAQs", href: "/faqs" },
    { name: "Contact Us", href: "/contact-us" },
    { name: "About Us", href: "/about-us" },
    { name: "Business Solutions", href: "/business-solutions", children: businessLinks }
  ];

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50">
        <div className="hidden h-[46px] border-b border-white/5 bg-[#222831]/95 px-4 text-[14px] font-extrabold text-white lg:block">
          <div className="mx-auto flex h-full max-w-[1300px] items-center justify-end gap-7">
            <a href="mailto:inquiries@agtpgroup.com" className="flex items-center gap-3 transition-colors hover:text-white">
              <Mail className="h-4 w-4" />
              <span>inquiries@agtpgroup.com</span>
            </a>
            <a href="tel:+97158585729" className="flex items-center gap-3 transition-colors hover:text-white">
              <Phone className="h-4 w-4" />
              <span>Contact Us: +971 58 585729</span>
            </a>
            <a href="tel:+97158585729" className="flex items-center gap-3 transition-colors hover:text-white">
              <Phone className="h-4 w-4" />
              <span>Head Office: Sharjah Media City</span>
            </a>
            <a href="mailto:agtpgroup@gmail.com" className="flex items-center gap-3 transition-colors hover:text-white">
              <Phone className="h-4 w-4" />
              <span>agtpgroup@gmail.com</span>
            </a>
          </div>
        </div>

        <header
          className={`transition-all duration-500 ${
            scrolled
              ? "border-b border-[#1c2436] bg-[#0a0f1c]/95 shadow-2xl backdrop-blur-md"
              : "border-b border-transparent bg-transparent"
          }`}
        >
          <div className="mx-auto max-w-[1735px] px-6 lg:px-[96px]">
            <div className="flex h-[82px] items-center justify-between lg:h-[98px]">
              <Logo />

              <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex">
                {navLinks.map((link) => {
                  const active = isActive(link.href) || Boolean(link.children?.some((child) => isActive(child.href)));
                  return (
                    <div key={link.name} className="group relative">
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`relative flex items-center gap-1.5 pb-2 text-[16px] font-extrabold transition-colors duration-200 ${
                        active ? "text-white" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {link.name}
                      {link.children && <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />}
                      {active && <span className="absolute bottom-0 left-1 h-1.5 w-1.5 rounded-full bg-[#536dfe]" />}
                    </Link>
                    {link.children && (
                      <div className="invisible absolute left-1/2 top-full z-50 w-[280px] -translate-x-1/2 rounded-2xl border border-[#25304b] bg-[#070a10]/98 p-3 opacity-0 shadow-2xl backdrop-blur-xl transition-all duration-200 group-hover:visible group-hover:translate-y-1 group-hover:opacity-100">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block rounded-xl px-4 py-3 text-[13px] font-bold text-slate-400 transition-colors hover:bg-[#111832] hover:text-white"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                    </div>
                  );
                })}
              </nav>

              <div className="hidden lg:flex">
                <button
                  onClick={() => setInquiryModalOpen(true)}
                  className="flex h-[50px] items-center gap-2.5 rounded-full bg-[#536dfe] px-7 text-[16px] font-extrabold text-white shadow-lg shadow-[#536dfe]/30 transition-all duration-200 hover:bg-[#4560f2]"
                >
                  <span>Get a Quote</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              <div className="flex items-center gap-3 lg:hidden">
                <button
                  onClick={() => setInquiryModalOpen(true)}
                  className="rounded-full bg-[#536dfe] px-4 py-2 text-xs font-bold text-white"
                >
                  Quote
                </button>
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-1 text-slate-200 hover:text-white"
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="space-y-4 border-t border-slate-800 bg-[#070a10] px-5 py-6 shadow-2xl lg:hidden">
              <div className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <div key={link.name}>
                    <Link
                      href={link.href}
                      className={`block rounded-xl px-4 py-2.5 text-base font-semibold transition-colors ${
                        isActive(link.href)
                          ? "bg-slate-800 text-[#8ea2ff]"
                          : "text-slate-300 hover:bg-slate-900 hover:text-white"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                    {link.children && (
                      <div className="ml-4 mt-1 space-y-1 border-l border-slate-800 pl-3">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block rounded-lg px-3 py-2 text-sm font-semibold text-slate-500 hover:bg-slate-900 hover:text-white"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </header>
      </div>

      <div className="fixed bottom-[70px] right-8 z-50 flex flex-col gap-4">
        <a
          href="https://wa.me/97158585729"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#26d22f] bg-transparent text-[#26d22f] shadow-2xl transition-all duration-300 hover:scale-110"
          aria-label="WhatsApp contact"
        >
          <MessageCircle className="h-6 w-6" />
        </a>
        <a
          href="https://t.me/agtpgroup"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#1688ff] bg-transparent text-[#1688ff] shadow-2xl transition-all duration-300 hover:scale-110"
          aria-label="Telegram contact"
        >
          <Send className="h-5 w-5 fill-current" />
        </a>
      </div>

      <VehicleInquiryModal isOpen={inquiryModalOpen} onClose={() => setInquiryModalOpen(false)} />
    </>
  );
}


