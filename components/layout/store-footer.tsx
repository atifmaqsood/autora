import Link from "next/link";
import { Car, MapPin, Phone, Mail, ShieldCheck, FileText, ArrowUpRight } from "lucide-react";
import { Logo } from "./logo";
import { CATEGORIES_LIST } from "@/lib/vehicles/data";

export function StoreFooter() {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Logo isDark className="mb-2" />
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              AUTORA is a global automotive showcase platform presenting luxury, performance, and commercial vehicle specifications, technical engine data, and multi-point verified documentation.
            </p>
            <div className="pt-2 flex flex-col space-y-2 text-xs text-slate-400">
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-500" />
                Verified OEM Technical Specs & Factory Certifications
              </span>
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-500" />
                Digital Specification Download & Virtual Showroom Catalog
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-amber-500">
              Showcase Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/vehicles" className="hover:text-white transition-colors">
                  All Vehicles Catalog
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About AUTORA Motors
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Logistics & Inspection
                </Link>
              </li>
              <li>
                <Link href="/locations" className="hover:text-white transition-colors">
                  Global Showrooms
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Inquiries
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-amber-400 hover:text-amber-300 font-medium transition-colors flex items-center gap-1">
                  Admin Showcase Portal
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-amber-500">
              Vehicle Categories
            </h4>
            <ul className="space-y-2 text-sm">
              {CATEGORIES_LIST.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/categories/${cat.slug}`}
                    className="hover:text-white transition-colors text-slate-400"
                  >
                    {cat.name} Showcase
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Global Hubs */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-amber-500">
              Showroom Hubs
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-200 block">Dubai Central Showroom</strong>
                  Al Quoz Industrial Area 3, Dubai, UAE
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-200 block">Tokyo Gallery</strong>
                  Minato-ku, Roppongi Hills, Tokyo, Japan
                </span>
              </li>
              <li className="flex items-center gap-2 pt-2 text-sm text-slate-200 font-semibold">
                <Phone className="w-4 h-4 text-amber-500" />
                +971 4 000 1234
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-400">
                <Mail className="w-4 h-4 text-amber-500" />
                inquire@autora-motors.com
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} AUTORA Vehicle Showcase. All rights reserved. Non-ecommerce vehicle presentation platform.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">
              Terms of Vehicle Presentation
            </Link>
            <Link href="/sitemap" className="hover:text-slate-300 transition-colors">
              Showcase Map
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
