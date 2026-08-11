import Link from "next/link";
import { Sliders, Layout, Globe, ChevronRight, Sparkles, PackageCheck } from "lucide-react";

const cards = [
  {
    href: "/admin/content/hero-slides",
    icon: Sliders,
    color: "bg-amber-500/10 text-amber-600 border-amber-200",
    title: "Hero Carousel Slides",
    description:
      "Add, reorder, edit, or disable individual slides shown in the rotating homepage hero banner. Control images, headings, badges, and CTA buttons per slide."
  },
  {
    href: "/admin/content/homepage",
    icon: Layout,
    color: "bg-blue-500/10 text-blue-600 border-blue-200",
    title: "Homepage Section Content",
    description:
      "Edit the headings, eyebrow labels, sub-headings, and call-to-action text for every homepage section: Featured Vehicles, Categories, Spotlight, Why AGTP GROUP, and the CTA Banner."
  },
  {
    href: "/admin/content/spare-parts",
    icon: PackageCheck,
    color: "bg-indigo-500/10 text-indigo-600 border-indigo-200",
    title: "Spare Parts Page",
    description:
      "Manage the spare parts landing page hero, category cards, sourcing process messaging, and quote call-to-action used on the public storefront."
  },
  {
    href: "/admin/content/site-settings",
    icon: Globe,
    color: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
    title: "Site Settings & Branding",
    description:
      "Change the brand/app name, tagline, support email, phone number, and global SEO meta title and description. Changes reflect in the logo and footer immediately."
  }
];

export default function AdminContentIndexPage() {
  return (
    <div className="space-y-8 pb-12 max-w-5xl mx-auto">
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-amber-500" />
          Storefront Content Management
        </h1>
        <p className="text-sm text-slate-500 mt-1.5">
          Manage everything visible on the public AGTP GROUP showcase website — carousel slides, section headings, branding, and SEO metadata.
          All changes are saved to localStorage and reflected instantly on the live site.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map(({ href, icon: Icon, color, title, description }) => (
          <Link
            key={href}
            href={href}
            className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className={`w-12 h-12 rounded-xl border flex items-center justify-center font-bold ${color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                {title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-amber-600 group-hover:gap-2 transition-all">
              Open Editor <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-sm text-amber-900 space-y-1">
        <p className="font-bold">ℹ️ How content persistence works</p>
        <p className="text-xs leading-relaxed">
          All content edits are stored in your browser&apos;s <code className="bg-amber-100 px-1 rounded font-mono text-xs">localStorage</code> under the key <code className="bg-amber-100 px-1 rounded font-mono text-xs">agtp_showcase_content</code>.
          The public showcase reads this data on every page load, so all changes are visible immediately in the same browser.
          To share changes across devices, export the JSON and import it elsewhere.
        </p>
      </div>
    </div>
  );
}


