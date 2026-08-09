"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Car,
  Layers,
  Inbox,
  ArrowLeft,
  Menu,
  X,
  Layout,
  Sliders,
  Globe,
  ChevronDown,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";

const vehicleNav = [
  { name: "Dashboard",       href: "/admin",                    icon: LayoutDashboard, exact: true  },
  { name: "All Vehicles",    href: "/admin/vehicles",           icon: Car,             exact: false },
  { name: "Categories",      href: "/admin/categories",         icon: Layers,          exact: false },
  { name: "Inquiries",       href: "/admin/inquiries",          icon: Inbox,           exact: false },
];

const contentNav = [
  { name: "Hero Carousel Slides", href: "/admin/content/hero-slides",   icon: Sliders   },
  { name: "Homepage Sections",    href: "/admin/content/homepage",       icon: Layout    },
  { name: "Site Settings",        href: "/admin/content/site-settings",  icon: Globe     },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [contentOpen, setContentOpen] = useState(
    pathname.startsWith("/admin/content")
  );

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  const Sidebar = () => (
    <aside className="flex flex-col w-64 bg-slate-950 text-slate-300 border-r border-slate-800 h-full">
      {/* Logo */}
      <div className="p-5 border-b border-slate-800 shrink-0">
        <Logo isDark />
      </div>

      {/* Nav */}
      <div className="flex-1 px-3 py-5 overflow-y-auto space-y-1">
        {/* Vehicle CMS */}
        <p className="px-3 pb-2 text-[10px] font-bold text-amber-500 uppercase tracking-widest">
          Vehicle Catalog
        </p>
        {vehicleNav.map(({ name, href, icon: Icon, exact }) => {
          const active = isActive(href, exact);
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileSidebarOpen(false)}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                active
                  ? "bg-amber-500 text-slate-950 shadow-md font-bold"
                  : "text-slate-400 hover:bg-slate-900 hover:text-white"
              }`}
            >
              <Icon className={`w-4 h-4 ${active ? "text-slate-950" : "text-slate-400"}`} />
              {name}
            </Link>
          );
        })}

        {/* Content Management accordion */}
        <div className="pt-4">
          <p className="px-3 pb-2 text-[10px] font-bold text-amber-500 uppercase tracking-widest">
            Content Management
          </p>
          <button
            onClick={() => setContentOpen((v) => !v)}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold text-slate-400 hover:bg-slate-900 hover:text-white transition-all"
          >
            <Sparkles className="w-4 h-4 text-slate-400" />
            <span className="flex-1 text-left">Storefront Content</span>
            {contentOpen
              ? <ChevronDown className="w-3.5 h-3.5" />
              : <ChevronRight className="w-3.5 h-3.5" />}
          </button>

          {contentOpen && (
            <div className="ml-3 mt-1 space-y-0.5 border-l border-slate-800 pl-3">
              {contentNav.map(({ name, href, icon: Icon }) => {
                const active = pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileSidebarOpen(false)}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                      active
                        ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                        : "text-slate-500 hover:bg-slate-900 hover:text-white"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    {name}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800 shrink-0 space-y-3">
        <Link href="/">
          <Button
            variant="outline"
            size="sm"
            className="w-full text-xs font-semibold justify-start gap-2 bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400" />
            Return to Showcase
          </Button>
        </Link>
        <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-[11px] text-slate-400 space-y-0.5">
          <span className="text-amber-400 font-bold block">Autora Admin Panel</span>
          <span>localStorage content model</span>
        </div>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-slate-100 flex font-sans text-slate-900">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:shrink-0 lg:w-64">
        <Sidebar />
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-slate-200 h-16 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileSidebarOpen(true)}
            >
              <Menu className="w-5 h-5 text-slate-700" />
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                ADMIN PANEL
              </span>
              <span className="hidden sm:inline-block text-xs bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded border border-amber-300">
                Content CMS
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" target="_blank">
              <Button variant="outline" size="sm" className="text-xs font-semibold gap-1.5 hidden sm:flex">
                <Car className="w-3.5 h-3.5 text-amber-600" />
                Preview Showcase
              </Button>
            </Link>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 pl-3 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-slate-950 text-amber-400 font-bold flex items-center justify-center text-xs">
                A
              </div>
              <span className="hidden md:inline">Showcase Admin</span>
            </div>
          </div>
        </header>

        {/* Mobile drawer */}
        {mobileSidebarOpen && (
          <div
            className="fixed inset-0 z-50 flex lg:hidden"
            onClick={(e) => e.target === e.currentTarget && setMobileSidebarOpen(false)}
          >
            <div className="w-64 h-full bg-slate-950 shadow-2xl">
              <div className="flex items-center justify-between p-4 border-b border-slate-800">
                <Logo isDark />
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <Sidebar />
              </div>
            </div>
          </div>
        )}

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
