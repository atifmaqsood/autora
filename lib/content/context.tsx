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
    const primary = /^#[0-9a-f]{6}$/i.test(content.site.primaryColor) ? content.site.primaryColor : defaultContent.site.primaryColor;
    const secondary = /^#[0-9a-f]{6}$/i.test(content.site.secondaryColor) ? content.site.secondaryColor : defaultContent.site.secondaryColor;

    root.style.setProperty("--agtp-primary", primary);
    root.style.setProperty("--agtp-secondary", secondary);
  }, [content.site.primaryColor, content.site.secondaryColor]);

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


