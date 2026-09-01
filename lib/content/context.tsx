"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode
} from "react";
import type { ShowcaseContent } from "@/lib/content/types";
import { defaultContent, getShowcaseContent, saveShowcaseContent } from "@/lib/content/store";

interface ContentContextValue {
  content: ShowcaseContent;
  updateContent: (patch: Partial<ShowcaseContent>) => void;
  resetContent: () => void;
  isDirty: boolean;
}

const ContentContext = createContext<ContentContextValue | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ShowcaseContent>(defaultContent);
  const [isDirty, setIsDirty] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    setContent(getShowcaseContent());
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const normalizeHex = (hex: string | undefined, fallback: string) => {
      if (!hex) return fallback;
      const trimmed = hex.trim();
      if (/^#[0-9a-f]{3,8}$/i.test(trimmed)) return trimmed;
      if (/^[0-9a-f]{3,8}$/i.test(trimmed)) return `#${trimmed}`;
      return fallback;
    };

    // Calculate relative luminance using standard WCAG formula
    const getLuminance = (hex: string): number => {
      let clean = hex.replace("#", "");
      if (clean.length === 3) {
        clean = clean.split("").map((c) => c + c).join("");
      }
      if (clean.length < 6) return 0;
      const r = parseInt(clean.slice(0, 2), 16) / 255;
      const g = parseInt(clean.slice(2, 4), 16) / 255;
      const b = parseInt(clean.slice(4, 6), 16) / 255;
      const toLinear = (c: number) =>
        c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
    };

    const primary = normalizeHex(content.site?.primaryColor, defaultContent.site.primaryColor);
    const secondary = normalizeHex(content.site?.secondaryColor, defaultContent.site.secondaryColor);
    const bg = normalizeHex(content.site?.backgroundColor, defaultContent.site.backgroundColor);

    root.style.setProperty("--agtp-primary", primary);
    root.style.setProperty("--agtp-secondary", secondary);
    root.style.setProperty("--agtp-bg", bg);

    // Compute contrast states separately for Canvas (bg) and Primary Brand (primary)
    const bgLum = getLuminance(bg);
    const primaryLum = getLuminance(primary);

    // Threshold: > 0.4 indicates a light background that requires dark text
    const isLightBg = bgLum > 0.4;
    const isLightPrimary = primaryLum > 0.4;

    root.setAttribute("data-bg-theme", isLightBg ? "light" : "dark");
    root.setAttribute("data-primary-theme", isLightPrimary ? "light" : "dark");

    // Canvas text variables (when directly on base page background)
    root.style.setProperty("--agtp-canvas-text", isLightBg ? "#090d16" : "#ffffff");
    root.style.setProperty("--agtp-canvas-text-secondary", isLightBg ? "#1e293b" : "#e2e8f0");
    root.style.setProperty("--agtp-canvas-text-muted", isLightBg ? "#334155" : "#cbd5e1");

    // Primary container text variables (when inside primary-colored cards/sections)
    root.style.setProperty("--agtp-primary-text", isLightPrimary ? "#090d16" : "#ffffff");
    root.style.setProperty("--agtp-primary-text-secondary", isLightPrimary ? "#1e293b" : "#e2e8f0");
    root.style.setProperty("--agtp-primary-text-muted", isLightPrimary ? "#334155" : "#cbd5e1");
  }, [content.site?.primaryColor, content.site?.secondaryColor, content.site?.backgroundColor]);

  const updateContent = useCallback((patch: Partial<ShowcaseContent>) => {
    setContent((prev) => {
      const next = { ...prev, ...patch };
      saveShowcaseContent(next);
      return next;
    });
    setIsDirty(true);
  }, []);

  const resetContent = useCallback(() => {
    saveShowcaseContent(defaultContent);
    setContent(defaultContent);
    setIsDirty(false);
  }, []);

  return (
    <ContentContext.Provider value={{ content, updateContent, resetContent, isDirty }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent(): ContentContextValue {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used within <ContentProvider>");
  return ctx;
}
