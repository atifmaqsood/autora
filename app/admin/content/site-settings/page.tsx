"use client";

import { useState } from "react";
import { Save, RotateCcw, CheckCircle2, Globe, Building, Phone } from "lucide-react";
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
            <Label className="text-xs">Primary Accent Color (Hex)</Label>
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
                placeholder="#d97706"
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
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
        <h3 className="text-xs font-bold text-amber-400 uppercase tracking-widest">
          Live Logo Preview
        </h3>
        <div className="inline-flex items-center gap-3 bg-slate-800 px-5 py-3 rounded-xl border border-slate-700">
          <div className="w-10 h-10 rounded-lg bg-slate-700 text-amber-500 flex items-center justify-center font-bold text-xl">
            A
          </div>
          <div>
            <p className="text-xl font-black tracking-wider uppercase text-white leading-none">
              {settings.brandName || "AGTP GROUP"}
            </p>
            <p className="text-[10px] font-semibold tracking-widest text-amber-500 uppercase">
              {settings.tagline || "MOTORS · SHOWCASE"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


