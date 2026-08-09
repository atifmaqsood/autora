"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Menu,
  X,
  ChevronDown,
  Car,
  PhoneCall,
  SlidersHorizontal,
  LayoutDashboard,
  MapPin,
  ShieldCheck,
  Info
} from "lucide-react";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { CATEGORIES_LIST } from "@/lib/vehicles/data";
import { VehicleInquiryModal } from "@/components/vehicles/vehicle-inquiry-modal";

export function StoreHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <>
      {/* Top Banner Bar */}
      <div className="bg-slate-950 text-slate-300 text-xs py-2 px-4 border-b border-slate-800 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 font-medium">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              Global Showrooms: Dubai • Tokyo • London • Munich • Miami
            </span>
            <span className="flex items-center gap-1.5 font-medium text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              Certified Manufacturer Specifications & Verified Data
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="tel:+97140001234"
              className="hover:text-amber-400 transition-colors flex items-center gap-1 font-semibold"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-500" />
              +971 4 000 1234
            </a>
            <span className="text-slate-700">|</span>
            <Link
              href="/admin"
              className="hover:text-white transition-colors flex items-center gap-1 font-semibold text-amber-400"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              Admin Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Logo />

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link
                href="/"
                className={`text-sm font-semibold transition-colors hover:text-amber-600 ${
                  isActive("/") ? "text-amber-600" : "text-slate-800"
                }`}
              >
                Home
              </Link>

              <Link
                href="/vehicles"
                className={`text-sm font-semibold transition-colors hover:text-amber-600 flex items-center gap-1.5 ${
                  isActive("/vehicles") ? "text-amber-600" : "text-slate-800"
                }`}
              >
                <Car className="w-4 h-4 text-amber-600" />
                Vehicle Showcase
              </Link>

              {/* Categories Mega Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setCategoryDropdownOpen(true)}
                onMouseLeave={() => setCategoryDropdownOpen(false)}
              >
                <button
                  className={`text-sm font-semibold transition-colors hover:text-amber-600 flex items-center gap-1 ${
                    isActive("/categories") ? "text-amber-600" : "text-slate-800"
                  }`}
                >
                  Categories
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      categoryDropdownOpen ? "rotate-180 text-amber-600" : ""
                    }`}
                  />
                </button>

                {categoryDropdownOpen && (
                  <div className="absolute top-full left-0 w-80 bg-white border border-slate-200 rounded-xl shadow-2xl p-3 grid grid-cols-2 gap-1 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                    {CATEGORIES_LIST.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/categories/${cat.slug}`}
                        className="px-3 py-2.5 rounded-lg hover:bg-amber-50 hover:text-amber-700 text-xs font-semibold text-slate-700 transition-all flex items-center justify-between"
                        onClick={() => setCategoryDropdownOpen(false)}
                      >
                        <span>{cat.name}</span>
                        <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                          {cat.slug.toUpperCase()}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/about"
                className={`text-sm font-semibold transition-colors hover:text-amber-600 ${
                  isActive("/about") ? "text-amber-600" : "text-slate-800"
                }`}
              >
                About
              </Link>

              <Link
                href="/services"
                className={`text-sm font-semibold transition-colors hover:text-amber-600 ${
                  isActive("/services") ? "text-amber-600" : "text-slate-800"
                }`}
              >
                Services
              </Link>

              <Link
                href="/locations"
                className={`text-sm font-semibold transition-colors hover:text-amber-600 ${
                  isActive("/locations") ? "text-amber-600" : "text-slate-800"
                }`}
              >
                Showrooms
              </Link>

              <Link
                href="/contact"
                className={`text-sm font-semibold transition-colors hover:text-amber-600 ${
                  isActive("/contact") ? "text-amber-600" : "text-slate-800"
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* Header Right Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <Link href="/vehicles">
                <Button variant="outline" size="sm" className="gap-2 font-medium">
                  <Search className="w-4 h-4 text-slate-500" />
                  Search Catalog
                </Button>
              </Link>

              <Button
                variant="primary"
                size="sm"
                className="gap-2 font-semibold shadow-md"
                onClick={() => setInquiryModalOpen(true)}
              >
                <PhoneCall className="w-4 h-4" />
                Request Specification Sheet
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex lg:hidden items-center gap-2">
              <Link href="/vehicles">
                <Button variant="ghost" size="icon" aria-label="Search">
                  <Search className="w-5 h-5 text-slate-700" />
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-slate-900" />
                ) : (
                  <Menu className="w-6 h-6 text-slate-900" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-4 shadow-xl animate-in slide-in-from-top duration-200">
            <div className="flex flex-col space-y-2">
              <Link
                href="/"
                className="px-3 py-2 rounded-md font-semibold text-slate-800 hover:bg-slate-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/vehicles"
                className="px-3 py-2 rounded-md font-semibold text-slate-800 hover:bg-slate-100 flex items-center justify-between"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Vehicle Showcase</span>
                <span className="text-xs bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full">
                  All Catalog
                </span>
              </Link>

              <div className="px-3 pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Vehicle Categories
                </span>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {CATEGORIES_LIST.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/categories/${cat.slug}`}
                      className="px-2.5 py-1.5 rounded text-xs font-medium text-slate-700 bg-slate-50 hover:bg-amber-100 hover:text-amber-900"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="/about"
                className="px-3 py-2 rounded-md font-semibold text-slate-800 hover:bg-slate-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                About AUTORA
              </Link>
              <Link
                href="/services"
                className="px-3 py-2 rounded-md font-semibold text-slate-800 hover:bg-slate-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Services & Logistics
              </Link>
              <Link
                href="/locations"
                className="px-3 py-2 rounded-md font-semibold text-slate-800 hover:bg-slate-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Showroom Locations
              </Link>
              <Link
                href="/contact"
                className="px-3 py-2 rounded-md font-semibold text-slate-800 hover:bg-slate-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/admin"
                className="px-3 py-2 rounded-md font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <LayoutDashboard className="w-4 h-4" />
                Admin Content Management
              </Link>
            </div>

            <Button
              variant="primary"
              className="w-full font-semibold gap-2"
              onClick={() => {
                setMobileMenuOpen(false);
                setInquiryModalOpen(true);
              }}
            >
              <PhoneCall className="w-4 h-4" />
              Request Vehicle Specification
            </Button>
          </div>
        )}
      </header>

      {/* Global Vehicle Inquiry Modal */}
      <VehicleInquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
      />
    </>
  );
}
