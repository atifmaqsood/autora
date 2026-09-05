"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, Mail, MapPin, Menu, Phone, X } from "lucide-react";
import { Logo } from "./logo";
import { VehicleInquiryModal } from "@/components/vehicles/vehicle-inquiry-modal";
import { useContent } from "@/lib/content/context";

export function StoreHeader() {
  const pathname = usePathname();
  const { content } = useContent();
  const site = content?.site || {};
  const supportPhone = site.supportPhone || "+971 58 58 55729";
  const supportEmail = site.supportEmail || "inquiries@agtpgroup.com";
  const defaultLocation = "Meydan Grandstand, Dubai";

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const expertiseLinks = [
    { name: "Global Sourcing", href: "/how-it-works" },
    { name: "Automotive Vehicles", href: "/vehicles" },
    { name: "Automotive Parts", href: "/spare-parts" },
    { name: "Freight & Logistics", href: "/contact-us" }
  ];

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Dubai Markets", href: "/dubai-markets" },
    { name: "Areas Of Expertise", href: "#", children: expertiseLinks },
    { name: "Customer Reviews", href: "/customer-reviews" }
  ];

  const isActive = (path: string) => {
    if (!path || path === "#") return false;
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <>
      <div
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "shadow-2xl backdrop-blur-xl"
            : ""
        }`}
        style={{
          borderBottom: "1px solid #fff0"
        }}
      >
        <div
          className={`hidden h-[46px] px-4 text-[14px] font-extrabold text-white transition-all duration-300 xl:block ${
            scrolled ? "" : "backdrop-blur-sm"
          }`}
          style={{
            backgroundColor: scrolled
              ? "color-mix(in srgb, var(--agtp-navbar, #0B1F33) 65%, transparent)"
              : "color-mix(in srgb, var(--agtp-navbar, #0B1F33) 25%, transparent)"
          }}
        >
          <div className="mx-auto flex h-full max-w-[1300px] items-center justify-end gap-7">
            <a
              href={`mailto:${supportEmail}`}
              className="flex items-center gap-2.5 transition-colors hover:text-white"
            >
              <Mail className="h-4 w-4 text-[#FDBA74]" />
              <span>{supportEmail}</span>
            </a>
            <a
              href={`tel:${supportPhone.replace(/\s+/g, "")}`}
              className="flex items-center gap-2.5 transition-colors hover:text-white"
            >
              <Phone className="h-4 w-4 text-[#FDBA74]" />
              <span>HotLine: {supportPhone}</span>
            </a>
            <div className="flex items-center gap-2.5 text-slate-200">
              <MapPin className="h-4 w-4 text-[#FDBA74]" />
              <span>Head Office: {defaultLocation}</span>
            </div>
          </div>
        </div>

        <header
          className="w-full transition-all duration-300"
          style={{
            backgroundColor: scrolled
              ? "color-mix(in srgb, var(--agtp-navbar, #0B1F33) 65%, transparent)"
              : "color-mix(in srgb, var(--agtp-navbar, #0B1F33) 0%, transparent)"
          }}
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
                      <div
                        className="invisible absolute left-1/2 top-[calc(100%+18px)] z-[70] w-[315px] -translate-x-1/2 translate-y-3 rounded-[18px] border p-3 opacity-0 shadow-[0_24px_70px_rgba(0,0,0,0.55)] ring-1 ring-white/5 backdrop-blur-2xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100"
                        style={{
                          backgroundColor: "color-mix(in srgb, var(--agtp-navbar, #0B1F33) 90%, black 10%)",
                          borderColor: "color-mix(in srgb, var(--agtp-navbar, #0B1F33) 75%, white 25%)"
                        }}
                      >
                        <div
                          className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-l border-t"
                          style={{
                            backgroundColor: "color-mix(in srgb, var(--agtp-navbar, #0B1F33) 90%, black 10%)",
                            borderColor: "color-mix(in srgb, var(--agtp-navbar, #0B1F33) 75%, white 25%)"
                          }}
                        />
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="relative z-10 block rounded-[12px] px-4 py-3 text-[13px] font-extrabold text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
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
            <div
              className="space-y-4 border-t px-5 py-6 shadow-2xl backdrop-blur-2xl xl:hidden"
              style={{
                backgroundColor: "color-mix(in srgb, var(--agtp-navbar, #0B1F33) 92%, transparent)",
                borderColor: "color-mix(in srgb, var(--agtp-navbar, #0B1F33) 75%, white 15%)"
              }}
            >
              <div className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <div key={link.name}>
                    <Link
                      href={link.href}
                      className={`block rounded-xl px-4 py-2.5 text-base font-semibold transition-colors ${
                        isActive(link.href)
                          ? "bg-white/10 text-[#FDBA74]"
                          : "text-slate-300 hover:bg-white/10 hover:text-white"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                    {link.children && (
                      <div className="ml-4 mt-1 space-y-1 border-l border-white/15 pl-3">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block rounded-lg px-3 py-2 text-sm font-semibold text-slate-400 hover:bg-white/10 hover:text-white"
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
