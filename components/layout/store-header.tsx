"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, Linkedin, Menu, MessageCircle, Phone, X } from "lucide-react";
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
        <div className="hidden h-[46px] border-b border-white/5 bg-[#222831]/95 px-4 text-[14px] font-extrabold text-white xl:block">
          <div className="mx-auto flex h-full max-w-[1300px] items-center justify-end gap-7">
            <a
              href="https://wa.me/971585855729"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-emerald-400"
            >
              <MessageCircle className="h-4 w-4 text-emerald-400" />
              <span>WhatsApp</span>
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-sky-400"
            >
              <Linkedin className="h-4 w-4 text-sky-400" />
              <span>LinkedIn</span>
            </a>
            <a href="tel:+971585855729" className="flex items-center gap-3 transition-colors hover:text-white">
              <Phone className="h-4 w-4" />
              <span>Contact Us: +971 58 58 55729</span>
            </a>
            <a href="tel:+971585855729" className="flex items-center gap-3 transition-colors hover:text-white">
              <Phone className="h-4 w-4" />
              <span>Head Office: Meydan Road, Dubai</span>
            </a>
          </div>
        </div>

        <header
          className={`transition-all duration-500 ${
            scrolled
              ? "border-b border-[#24445F] bg-[#0a0f1c]/95 shadow-2xl backdrop-blur-md"
              : "border-b border-transparent bg-transparent"
          }`}
        >
          <div className="mx-auto max-w-[1735px] px-6 xl:px-[96px]">
            <div className="flex h-[82px] items-center justify-between xl:h-[98px]">
              <Logo />

              <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 xl:flex">
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
                      {active && <span className="absolute bottom-0 left-1 h-1.5 w-1.5 rounded-full bg-[#F97316]" />}
                    </Link>
                    {link.children && (
                      <div className="invisible absolute left-1/2 top-[calc(100%+18px)] z-[70] w-[315px] -translate-x-1/2 translate-y-3 rounded-[18px] border border-[#3D6480] bg-[#080d18] p-3 opacity-0 shadow-[0_24px_70px_rgba(0,0,0,0.55)] ring-1 ring-white/5 backdrop-blur-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                        <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-l border-t border-[#3D6480] bg-[#080d18]" />
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="relative z-10 block rounded-[12px] px-4 py-3 text-[13px] font-extrabold text-slate-300 transition-colors hover:bg-[#18213a] hover:text-white"
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

              <div className="hidden xl:flex">
                <button
                  onClick={() => setInquiryModalOpen(true)}
                  className="flex h-[50px] items-center gap-2.5 rounded-full bg-[#F97316] px-7 text-[16px] font-extrabold text-white shadow-lg shadow-[#F97316]/30 transition-all duration-200 hover:bg-[#EA580C]"
                >
                  <span>Get a Quote</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              <div className="flex items-center gap-3 xl:hidden">
                <button
                  onClick={() => setInquiryModalOpen(true)}
                  className="rounded-full bg-[#F97316] px-4 py-2 text-xs font-bold text-white"
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
            <div className="space-y-4 border-t border-slate-800 bg-[#0B1F33] px-5 py-6 shadow-2xl xl:hidden">
              <div className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <div key={link.name}>
                    <Link
                      href={link.href}
                      className={`block rounded-xl px-4 py-2.5 text-base font-semibold transition-colors ${
                        isActive(link.href)
                          ? "bg-slate-800 text-[#FDBA74]"
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

      <VehicleInquiryModal isOpen={inquiryModalOpen} onClose={() => setInquiryModalOpen(false)} />
    </>
  );
}


