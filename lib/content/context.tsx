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

  // Hydrate from localStorage on mount, then apply the site colors saved via
  // the API so every visitor sees the colors set in the admin panel.
  useEffect(() => {
    setContent(getShowcaseContent());

    const controller = new AbortController();
    fetch("/api/site-colors", { signal: controller.signal, cache: "no-store" })
      .then((response) => (response.ok ? response.json() : {}))
      .then((colors: Partial<ShowcaseContent["site"]>) => {
        if (Object.keys(colors).length === 0) return;
        setContent((prev) => ({ ...prev, site: { ...prev.site, ...colors } }));
      })
      .catch(() => undefined);
    return () => controller.abort();
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

    const primary = normalizeHex(content.site?.primaryColor, defaultContent.site.primaryColor);
    const secondary = normalizeHex(content.site?.secondaryColor, defaultContent.site.secondaryColor);
    const bg = normalizeHex(content.site?.backgroundColor, defaultContent.site.backgroundColor);
    const navbar = normalizeHex(content.site?.navbarColor, defaultContent.site.navbarColor || "#0B1F33");
    const footer = normalizeHex(content.site?.footerColor, defaultContent.site.footerColor || "#071626");

    root.style.setProperty("--agtp-primary", primary);
    root.style.setProperty("--agtp-secondary", secondary);
    root.style.setProperty("--agtp-bg", bg);
    root.style.setProperty("--agtp-navbar", navbar);
    root.style.setProperty("--agtp-footer", footer);
  }, [
    content.site?.primaryColor,
    content.site?.secondaryColor,
    content.site?.backgroundColor,
    content.site?.navbarColor,
    content.site?.footerColor
  ]);

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
