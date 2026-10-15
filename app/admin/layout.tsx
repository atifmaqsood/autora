"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeft,
  Building2,
  BookOpenText,
  BriefcaseBusiness,
  Car,
  ExternalLink,
  Globe,
  HelpCircle,
  Images,
  Info,
  KeyRound,
  LayoutTemplate,
  ListChecks,
  LogOut,
  Menu,
  MessageSquareQuote,
  PackageSearch,
  Ship,
  X,
} from "lucide-react";

import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { PUBLIC_ADMIN_PATHS } from "@/lib/auth/constants";

const settingsHref = "/admin/content/site-settings";
const bannersHref = "/admin/banners";
const passwordHref = "/admin/account/password";
const homePageHref = "/admin/pages/home";
const reviewsPageHref = "/admin/pages/reviews";
const aboutPageHref = "/admin/pages/about";
const vehiclesPageHref = "/admin/pages/vehicles";
const faqsPageHref = "/admin/pages/faqs";
const partsPageHref = "/admin/pages/parts";
const shippingPageHref = "/admin/pages/shipping";
const howItWorksPageHref = "/admin/pages/how-it-works";
const dubaiAutomotivePageHref = "/admin/pages/dubai-automotive";
const blogsPageHref = "/admin/pages/blogs";
const careersPageHref = "/admin/pages/careers";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  if (PUBLIC_ADMIN_PATHS.includes(pathname)) return children;

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.assign("/admin/login");
  }

  const Sidebar = () => (
    <aside className="flex h-full w-64 flex-col border-r border-slate-800 bg-slate-950 text-slate-300">
      <div className="shrink-0 border-b border-slate-800 p-5">
        <Logo isDark />
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-5">
        <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-widest text-amber-500">
          Administration
        </p>
        <Link
          href={settingsHref}
          onClick={() => setMobileSidebarOpen(false)}
          className={`flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-xs font-semibold transition-all ${
            pathname === settingsHref
              ? "bg-amber-500 font-bold text-slate-950 shadow-md"
              : "text-slate-400 hover:bg-slate-900 hover:text-white"
          }`}
        >
          <Globe className="h-4 w-4" />
          Site Settings
        </Link>
        <Link
          href={bannersHref}
          onClick={() => setMobileSidebarOpen(false)}
          className={`mt-1 flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-xs font-semibold transition-all ${
            pathname === bannersHref
              ? "bg-amber-500 font-bold text-slate-950 shadow-md"
              : "text-slate-400 hover:bg-slate-900 hover:text-white"
          }`}
        >
          <Images className="h-4 w-4" />
          Page Banners
        </Link>
        <Link
          href={passwordHref}
          onClick={() => setMobileSidebarOpen(false)}
          className={`mt-1 flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-xs font-semibold transition-all ${
            pathname === passwordHref
              ? "bg-amber-500 font-bold text-slate-950 shadow-md"
              : "text-slate-400 hover:bg-slate-900 hover:text-white"
          }`}
        >
          <KeyRound className="h-4 w-4" />
          Change Password
        </Link>
        <p className="mt-6 px-3 pb-2 text-[10px] font-bold uppercase tracking-widest text-amber-500">
          Pages
        </p>
        <Link
          href={homePageHref}
          onClick={() => setMobileSidebarOpen(false)}
          className={`flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-xs font-semibold transition-all ${
            pathname.startsWith(homePageHref)
              ? "bg-amber-500 font-bold text-slate-950 shadow-md"
              : "text-slate-400 hover:bg-slate-900 hover:text-white"
          }`}
        >
          <LayoutTemplate className="h-4 w-4" />
          Home Page
        </Link>
        <Link
          href={reviewsPageHref}
          onClick={() => setMobileSidebarOpen(false)}
          className={`mt-1 flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-xs font-semibold transition-all ${pathname.startsWith(reviewsPageHref) ? "bg-amber-500 font-bold text-slate-950 shadow-md" : "text-slate-400 hover:bg-slate-900 hover:text-white"}`}
        >
          <MessageSquareQuote className="h-4 w-4" />
          Reviews Page
        </Link>
        <Link
          href={aboutPageHref}
          onClick={() => setMobileSidebarOpen(false)}
          className={`mt-1 flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-xs font-semibold transition-all ${pathname.startsWith(aboutPageHref) ? "bg-amber-500 font-bold text-slate-950 shadow-md" : "text-slate-400 hover:bg-slate-900 hover:text-white"}`}
        >
          <Info className="h-4 w-4" />
          About Us Page
        </Link>
        <Link
          href={vehiclesPageHref}
          onClick={() => setMobileSidebarOpen(false)}
          className={`mt-1 flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-xs font-semibold transition-all ${pathname.startsWith(vehiclesPageHref) ? "bg-amber-500 font-bold text-slate-950 shadow-md" : "text-slate-400 hover:bg-slate-900 hover:text-white"}`}
        >
          <Car className="h-4 w-4" />
          Vehicles Page
        </Link>
        <Link
          href={faqsPageHref}
          onClick={() => setMobileSidebarOpen(false)}
          className={`mt-1 flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-xs font-semibold transition-all ${pathname.startsWith(faqsPageHref) ? "bg-amber-500 font-bold text-slate-950 shadow-md" : "text-slate-400 hover:bg-slate-900 hover:text-white"}`}
        >
          <HelpCircle className="h-4 w-4" />
          FAQ’s Page
        </Link>
        <Link
          href={partsPageHref}
          onClick={() => setMobileSidebarOpen(false)}
          className={`mt-1 flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-xs font-semibold transition-all ${pathname.startsWith(partsPageHref) ? "bg-amber-500 font-bold text-slate-950 shadow-md" : "text-slate-400 hover:bg-slate-900 hover:text-white"}`}
        >
          <PackageSearch className="h-4 w-4" />
          Parts & Accessories
        </Link>
        <Link
          href={shippingPageHref}
          onClick={() => setMobileSidebarOpen(false)}
          className={`mt-1 flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-xs font-semibold transition-all ${pathname.startsWith(shippingPageHref) ? "bg-amber-500 font-bold text-slate-950 shadow-md" : "text-slate-400 hover:bg-slate-900 hover:text-white"}`}
        >
          <Ship className="h-4 w-4" />
          Shipping Page
        </Link>
        <Link
          href={howItWorksPageHref}
          onClick={() => setMobileSidebarOpen(false)}
          className={`mt-1 flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-xs font-semibold transition-all ${pathname.startsWith(howItWorksPageHref) ? "bg-amber-500 font-bold text-slate-950 shadow-md" : "text-slate-400 hover:bg-slate-900 hover:text-white"}`}
        >
          <ListChecks className="h-4 w-4" />
          How It Works Page
        </Link>
        <Link
          href={dubaiAutomotivePageHref}
          onClick={() => setMobileSidebarOpen(false)}
          className={`mt-1 flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-xs font-semibold transition-all ${pathname.startsWith(dubaiAutomotivePageHref) ? "bg-amber-500 font-bold text-slate-950 shadow-md" : "text-slate-400 hover:bg-slate-900 hover:text-white"}`}
        >
          <Building2 className="h-4 w-4" />
          Dubai Automotive
        </Link>
        <Link
          href={blogsPageHref}
          onClick={() => setMobileSidebarOpen(false)}
          className={`mt-1 flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-xs font-semibold transition-all ${pathname.startsWith(blogsPageHref) ? "bg-amber-500 font-bold text-slate-950 shadow-md" : "text-slate-400 hover:bg-slate-900 hover:text-white"}`}
        >
          <BookOpenText className="h-4 w-4" />
          Blogs Page
        </Link>
        <Link
          href={careersPageHref}
          onClick={() => setMobileSidebarOpen(false)}
          className={`mt-1 flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-xs font-semibold transition-all ${pathname.startsWith(careersPageHref) ? "bg-amber-500 font-bold text-slate-950 shadow-md" : "text-slate-400 hover:bg-slate-900 hover:text-white"}`}
        >
          <BriefcaseBusiness className="h-4 w-4" />
          Careers Page
        </Link>
      </nav>

      <div className="shrink-0 border-t border-slate-800 p-4">
        <Link href="/">
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start gap-2 border-slate-700 bg-slate-900 text-xs font-semibold text-slate-200 hover:bg-slate-800 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 text-amber-400" />
            Return to Website
          </Button>
        </Link>
      </div>
    </aside>
  );

  return (
    <div className="flex min-h-screen bg-slate-100 font-sans text-slate-900">
      <div className="hidden lg:flex lg:w-64 lg:shrink-0 lg:flex-col">
        <Sidebar />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm sm:px-6">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileSidebarOpen(true)}
              aria-label="Open navigation"
            >
              <Menu className="h-5 w-5 text-slate-700" />
            </Button>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {pathname === bannersHref
                ? "Page Banners"
                : pathname.startsWith(homePageHref)
                  ? "Home Page"
                  : pathname.startsWith(reviewsPageHref)
                    ? "Reviews Page"
                    : pathname.startsWith(aboutPageHref)
                      ? "About Us Page"
                      : pathname.startsWith(vehiclesPageHref)
                        ? "Vehicles Page"
                        : pathname.startsWith(faqsPageHref)
                          ? "FAQ’s Page"
                          : pathname.startsWith(partsPageHref)
                            ? "Parts & Accessories Page"
                            : pathname.startsWith(shippingPageHref)
                              ? "Shipping Page"
                              : pathname.startsWith(howItWorksPageHref)
                                ? "How It Works Page"
                                : pathname.startsWith(dubaiAutomotivePageHref)
                                  ? "Dubai Automotive Page"
                                  : pathname.startsWith(blogsPageHref)
                                    ? "Blogs Page"
                                    : pathname.startsWith(careersPageHref)
                                      ? "Careers Page"
                                      : "Site Settings"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/" target="_blank">
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 text-xs font-semibold"
              >
                <ExternalLink className="h-3.5 w-3.5 text-amber-600" />
                <span className="hidden sm:inline">Preview Website</span>
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="gap-1.5 text-xs font-semibold text-slate-600"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Sign out</span>
            </Button>
          </div>
        </header>

        {mobileSidebarOpen && (
          <div
            className="fixed inset-0 z-50 flex bg-black/40 lg:hidden"
            onClick={(event) =>
              event.target === event.currentTarget &&
              setMobileSidebarOpen(false)
            }
          >
            <div className="relative h-full w-64 bg-slate-950 shadow-2xl">
              <button
                type="button"
                onClick={() => setMobileSidebarOpen(false)}
                className="absolute right-3 top-3 z-10 rounded-md p-1 text-slate-400 hover:text-white"
                aria-label="Close navigation"
              >
                <X className="h-5 w-5" />
              </button>
              <Sidebar />
            </div>
          </div>
        )}

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
