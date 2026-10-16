"use client";

import { useEffect, useState } from "react";
import { Save, RotateCcw, CheckCircle2, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContent } from "@/lib/content/context";
import { defaultContent } from "@/lib/content/store";
import type { SiteSettings } from "@/lib/content/types";

type ColorKey =
  | "backgroundColor"
  | "primaryColor"
  | "secondaryColor"
  | "navbarColor"
  | "footerColor";

const colorFields: { key: ColorKey; label: string; fallback: string }[] = [
  { key: "backgroundColor", label: "Base / Canvas Background Color", fallback: "#060709" },
  { key: "primaryColor", label: "Primary Brand / Navy Color", fallback: "#0B1F33" },
  { key: "secondaryColor", label: "Secondary / Accent Color", fallback: "#F97316" },
  { key: "navbarColor", label: "Navbar Background Color", fallback: "#0B1F33" },
  { key: "footerColor", label: "Footer Background Color", fallback: "#071626" }
];

export default function AdminSiteSettingsPage() {
  const { content, updateContent } = useContent();
  const [settings, setSettings] = useState<SiteSettings>({ ...content.site });
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setSettings({ ...content.site });
  }, [content.site]);

  const patch = (fields: Partial<SiteSettings>) => {
    setSettings((prev) => ({ ...prev, ...fields }));
    setSaved(false);
  };

  // Colors are stored through the API so every visitor gets them.
  const handleSave = async () => {
    setSaving(true);
    setError("");
    const colors = Object.fromEntries(
      colorFields.map(({ key, fallback }) => {
        const value = (settings[key] || fallback).trim();
        return [key, /^[0-9a-f]{3,8}$/i.test(value) ? `#${value}` : value];
      })
    ) as Partial<SiteSettings>;
    try {
      const response = await fetch("/api/admin/site-colors", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(colors)
      });
      if (!response.ok) {
        const body = (await response.json().catch(() => ({}))) as { message?: string | string[] };
        throw new Error(
          Array.isArray(body.message) ? body.message.join(", ") : body.message || "Could not save the colors."
        );
      }
      updateContent({ site: { ...settings, ...colors } });
      setSaved(true);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Could not save the colors.");
    } finally {
      setSaving(false);
    }
  };

  // Only the colors are editable here, so only the colors are reset.
  const handleReset = () => {
    if (!confirm("Reset all theme colors to defaults?")) return;
    patch(
      Object.fromEntries(
        colorFields.map(({ key }) => [key, defaultContent.site[key]])
      ) as Partial<SiteSettings>
    );
  };

  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Palette className="w-6 h-6 text-amber-500" />
            Site Colors
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Set the theme colors used across the website.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={handleReset} className="gap-1.5 text-xs text-slate-500">
            <RotateCcw className="w-3.5 h-3.5" /> Reset Defaults
          </Button>
          <Button variant="primary" size="sm" onClick={() => void handleSave()} disabled={saving} className="gap-2 font-bold shadow-sm">
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : saved ? "Saved!" : "Save Settings"}
          </Button>
        </div>
      </div>

      {saved && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl flex items-center gap-2.5 text-sm font-semibold animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          Site colors saved.
        </div>
      )}

      {error && (
        <div role="alert" className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-sm font-semibold">
          {error}
        </div>
      )}

      {/* Theme Colors */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex items-center gap-2">
          <Palette className="w-4 h-4 text-amber-500" />
          <span className="text-sm font-bold text-slate-800">Theme Colors</span>
        </div>
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {colorFields.map(({ key, label, fallback }) => (
            <div key={key}>
              <Label className="text-xs">{label}</Label>
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="color"
                  value={settings[key] || fallback}
                  onChange={(e) => patch({ [key]: e.target.value })}
                  className="h-10 w-14 rounded-lg border border-slate-200 cursor-pointer p-1"
                />
                <Input
                  value={settings[key] || fallback}
                  onChange={(e) => patch({ [key]: e.target.value })}
                  placeholder={fallback}
                  className="text-sm font-mono flex-1"
                />
              </div>
            </div>
          ))}
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


