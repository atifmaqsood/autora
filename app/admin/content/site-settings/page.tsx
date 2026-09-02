"use client";

import { useEffect, useState } from "react";
import { Save, RotateCcw, CheckCircle2, Globe, Building, Phone, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useContent } from "@/lib/content/context";
import { defaultContent } from "@/lib/content/store";
import type { SiteSettings } from "@/lib/content/types";

export default function AdminSiteSettingsPage() {
  const { content, updateContent } = useContent();
  const [settings, setSettings] = useState<SiteSettings>({ ...content.site });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSettings({ ...content.site });
  }, [content.site]);

  const patch = (fields: Partial<SiteSettings>) => {
    setSettings((prev) => ({ ...prev, ...fields }));
    setSaved(false);
  };

  const handleSave = () => {
    updateContent({ site: settings });
    setSaved(true);
  };

  const handleReset = () => {
    if (!confirm("Reset all site settings to defaults?")) return;
    setSettings({ ...defaultContent.site });
    setSaved(false);
  };

  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Globe className="w-6 h-6 text-amber-500" />
            Site Settings & Branding
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Configure the brand name, contact details, and global SEO metadata.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={handleReset} className="gap-1.5 text-xs text-slate-500">
            <RotateCcw className="w-3.5 h-3.5" /> Reset Defaults
          </Button>
          <Button variant="primary" size="sm" onClick={handleSave} className="gap-2 font-bold shadow-sm">
            <Save className="w-4 h-4" />
            {saved ? "Saved!" : "Save Settings"}
          </Button>
        </div>
      </div>

      {saved && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl flex items-center gap-2.5 text-sm font-semibold animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          Site settings saved — Logo and footer now reflect the updated brand name.
        </div>
      )}

      {/* Brand Identity */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex items-center gap-2">
          <Building className="w-4 h-4 text-amber-500" />
          <span className="text-sm font-bold text-slate-800">Brand Identity</span>
        </div>
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label className="text-xs">Brand / App Name</Label>
            <Input
              value={settings.brandName}
              onChange={(e) => patch({ brandName: e.target.value })}
              placeholder="AGTP GROUP"
              className="mt-1 text-sm font-bold"
            />
            <p className="text-[10px] text-slate-400 mt-1">
              Appears in the logo, page titles, and footer.
            </p>
          </div>
          <div>
            <Label className="text-xs">Tagline (Below Logo)</Label>
            <Input
              value={settings.tagline}
              onChange={(e) => patch({ tagline: e.target.value })}
              placeholder="MOTORS · SHOWCASE"
              className="mt-1 text-sm"
            />
          </div>
          <div>
            <Label className="text-xs">Base / Canvas Background Color</Label>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="color"
                value={settings.backgroundColor || "#060709"}
                onChange={(e) => patch({ backgroundColor: e.target.value })}
                className="h-10 w-14 rounded-lg border border-slate-200 cursor-pointer p-1"
              />
              <Input
                value={settings.backgroundColor || "#060709"}
                onChange={(e) => patch({ backgroundColor: e.target.value })}
                placeholder="#060709"
                className="text-sm font-mono flex-1"
              />
            </div>
          </div>
          <div>
            <Label className="text-xs">Primary Brand / Navy Color</Label>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="color"
                value={settings.primaryColor}
                onChange={(e) => patch({ primaryColor: e.target.value })}
                className="h-10 w-14 rounded-lg border border-slate-200 cursor-pointer p-1"
              />
              <Input
                value={settings.primaryColor}
                onChange={(e) => patch({ primaryColor: e.target.value })}
                placeholder="#0B1F33"
                className="text-sm font-mono flex-1"
              />
            </div>
          </div>
          <div>
            <Label className="text-xs">Secondary / Accent Color</Label>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="color"
                value={settings.secondaryColor}
                onChange={(e) => patch({ secondaryColor: e.target.value })}
                className="h-10 w-14 rounded-lg border border-slate-200 cursor-pointer p-1"
              />
              <Input
                value={settings.secondaryColor}
                onChange={(e) => patch({ secondaryColor: e.target.value })}
                placeholder="#F97316"
                className="text-sm font-mono flex-1"
              />
            </div>
          </div>
          <div>
            <Label className="text-xs">Navbar Background Color</Label>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="color"
                value={settings.navbarColor || "#0B1F33"}
                onChange={(e) => patch({ navbarColor: e.target.value })}
                className="h-10 w-14 rounded-lg border border-slate-200 cursor-pointer p-1"
              />
              <Input
                value={settings.navbarColor || "#0B1F33"}
                onChange={(e) => patch({ navbarColor: e.target.value })}
                placeholder="#0B1F33"
                className="text-sm font-mono flex-1"
              />
            </div>
          </div>
          <div>
            <Label className="text-xs">Footer Background Color</Label>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="color"
                value={settings.footerColor || "#071626"}
                onChange={(e) => patch({ footerColor: e.target.value })}
                className="h-10 w-14 rounded-lg border border-slate-200 cursor-pointer p-1"
              />
              <Input
                value={settings.footerColor || "#071626"}
                onChange={(e) => patch({ footerColor: e.target.value })}
                placeholder="#071626"
                className="text-sm font-mono flex-1"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex items-center gap-2">
          <Phone className="w-4 h-4 text-amber-500" />
          <span className="text-sm font-bold text-slate-800">Showroom Contact Information</span>
        </div>
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label className="text-xs">Primary Phone / WhatsApp</Label>
            <Input
              value={settings.supportPhone}
              onChange={(e) => patch({ supportPhone: e.target.value })}
              placeholder="+971 4 000 1234"
              className="mt-1 text-sm"
            />
          </div>
          <div>
            <Label className="text-xs">Inquiry Email Address</Label>
            <Input
              type="email"
              value={settings.supportEmail}
              onChange={(e) => patch({ supportEmail: e.target.value })}
              placeholder="inquiries@agtpgroup.com"
              className="mt-1 text-sm"
            />
          </div>
          <div className="sm:col-span-2">
            <Label className="text-xs">Default Showroom Hub Location</Label>
            <Input
              value={settings.defaultLocation}
              onChange={(e) => patch({ defaultLocation: e.target.value })}
              placeholder="Dubai Central Showroom"
              className="mt-1 text-sm"
            />
          </div>
        </div>
      </div>

      {/* SEO Metadata */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex items-center gap-2">
          <Globe className="w-4 h-4 text-amber-500" />
          <span className="text-sm font-bold text-slate-800">Global SEO & Metadata</span>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <Label className="text-xs">Default Page Title</Label>
            <Input
              value={settings.metaTitle}
              onChange={(e) => patch({ metaTitle: e.target.value })}
              className="mt-1 text-sm"
              placeholder="AGTP GROUP — Certified Vehicle Specifications..."
            />
            <p className="text-[10px] text-slate-400 mt-1">
              Character count: {settings.metaTitle.length} / 60 recommended
            </p>
          </div>
          <div>
            <Label className="text-xs">Default Meta Description</Label>
            <Textarea
              value={settings.metaDescription}
              onChange={(e) => patch({ metaDescription: e.target.value })}
              rows={3}
              className="mt-1 text-sm"
              placeholder="Explore exhaustive technical specs..."
            />
            <p className="text-[10px] text-slate-400 mt-1">
              Character count: {settings.metaDescription.length} / 160 recommended
            </p>
          </div>
        </div>
      </div>

      {/* Live Preview Panel */}
      <div className="rounded-2xl border border-slate-800 p-6 space-y-5 shadow-xl transition-colors" style={{ backgroundColor: settings.backgroundColor || "#060709" }}>
        <h3 className="text-xs font-bold uppercase tracking-widest flex items-center gap-2" style={{ color: settings.secondaryColor }}>
          <Palette className="w-4 h-4" /> Live Color Theme & Layout Preview
        </h3>

        {/* Mock Navbar Preview */}
        <div
          className="rounded-xl border border-white/10 p-3.5 flex items-center justify-between shadow-lg backdrop-blur-md transition-colors"
          style={{ backgroundColor: `color-mix(in srgb, ${settings.navbarColor || "#0B1F33"} 75%, transparent)` }}
        >
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs text-white shadow-sm" style={{ backgroundColor: settings.secondaryColor }}>
              A
            </div>
            <span className="text-xs font-black uppercase tracking-wider text-white">
              {settings.brandName || "AGTP GROUP"}
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-300">
            <span>Home</span>
            <span>Vehicles</span>
            <span className="px-3 py-1 rounded-full text-white text-[10px] font-bold" style={{ backgroundColor: settings.secondaryColor }}>
              Quote
            </span>
          </div>
        </div>

        {/* Mock Content Card Preview */}
        <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl border border-white/15 shadow-lg transition-colors" style={{ backgroundColor: settings.primaryColor }}>
          <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xl text-white shadow-md" style={{ backgroundColor: settings.secondaryColor }}>
            A
          </div>
          <div>
            <p className="text-xl font-black tracking-wider uppercase text-white leading-none">
              {settings.brandName || "AGTP GROUP"}
            </p>
            <p className="text-[10px] font-semibold tracking-widest uppercase mt-1" style={{ color: settings.secondaryColor }}>
              {settings.tagline || "MOTORS · SHOWCASE"}
            </p>
          </div>
        </div>

        {/* Mock Footer Preview */}
        <div
          className="rounded-xl border-t border-white/10 p-3.5 flex items-center justify-between text-[11px] text-slate-400 shadow-md transition-colors"
          style={{ backgroundColor: settings.footerColor || "#071626" }}
        >
          <span>© 2026 {settings.brandName || "AGTP GROUP"}. All rights reserved.</span>
          <span className="font-semibold" style={{ color: settings.secondaryColor }}>Global Trading & Export</span>
        </div>
      </div>
    </div>
  );
}


