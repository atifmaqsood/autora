"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Globe } from "lucide-react";

const languages = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "pt", label: "Português", flag: "🇵🇹" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "ar", label: "العربية", flag: "🇦🇪" },
  { code: "sw", label: "Kiswahili", flag: "🇰🇪" },
];

declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
  }
}

// Safe monkey-patch for Google Translate DOM modifications in React
if (typeof window !== "undefined" && typeof Node === "function" && Node.prototype) {
  const originalInsertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function <T extends Node>(newNode: T, referenceNode: Node | null): T {
    if (referenceNode && referenceNode.parentNode !== this) {
      if (typeof console !== "undefined" && console.warn) {
        console.warn("Recovered from insertBefore collision (Google Translate)");
      }
      return originalInsertBefore.call(this, newNode, null) as T;
    }
    return originalInsertBefore.apply(this, [newNode, referenceNode]) as T;
  };

  const originalRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function <T extends Node>(child: T): T {
    if (child.parentNode !== this) {
      if (typeof console !== "undefined" && console.warn) {
        console.warn("Recovered from removeChild collision (Google Translate)");
      }
      return child;
    }
    return originalRemoveChild.apply(this, [child]) as T;
  };
}

let isProtecting = false;
function protectBrandNames() {
  if (typeof document === "undefined" || !document.body || isProtecting) return;
  isProtecting = true;
  try {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node) {
          if (!node.nodeValue) return NodeFilter.FILTER_REJECT;
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          if (
            parent.closest(".notranslate") ||
            parent.closest("[translate='no']") ||
            parent.tagName === "SCRIPT" ||
            parent.tagName === "STYLE" ||
            parent.tagName === "TEXTAREA" ||
            parent.tagName === "INPUT"
          ) {
            return NodeFilter.FILTER_REJECT;
          }
          if (/AGTP\s+GROUP/i.test(node.nodeValue)) {
            return NodeFilter.FILTER_ACCEPT;
          }
          return NodeFilter.FILTER_REJECT;
        }
      }
    );

    const nodesToReplace: Text[] = [];
    while (walker.nextNode()) {
      nodesToReplace.push(walker.currentNode as Text);
    }

    for (const node of nodesToReplace) {
      const text = node.nodeValue;
      if (!text) continue;
      const parent = node.parentNode;
      if (!parent) continue;

      const regex = /(AGTP\s+GROUP)/gi;
      const parts = text.split(regex);
      if (parts.length <= 1) continue;

      const fragment = document.createDocumentFragment();
      for (const part of parts) {
        if (/^AGTP\s+GROUP$/i.test(part)) {
          const span = document.createElement("span");
          span.className = "notranslate";
          span.setAttribute("translate", "no");
          span.textContent = part;
          fragment.appendChild(span);
        } else if (part.length > 0) {
          fragment.appendChild(document.createTextNode(part));
        }
      }
      parent.replaceChild(fragment, node);
    }
  } catch {
    // Graceful fallback
  } finally {
    isProtecting = false;
  }
}

function triggerGoogleTranslate(langCode: string) {
  protectBrandNames();
  // Set cookie for persistence across pages
  document.cookie = `googtrans=/en/${langCode}; path=/;`;
  document.cookie = `googtrans=/en/${langCode}; path=/; domain=.${window.location.hostname};`;

  const select = document.querySelector(
    ".goog-te-combo"
  ) as HTMLSelectElement | null;
  if (select) {
    select.value = langCode;
    select.dispatchEvent(new Event("change"));
  }
}

export function LanguageSwitcher({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(languages[0]);
  const [gtReady, setGtReady] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Initialize active language from cookie if set & protect brand names
  useEffect(() => {
    protectBrandNames();
    const observer = new MutationObserver(() => {
      protectBrandNames();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    const match = document.cookie.match(/googtrans=\/en\/([a-z]{2})/);
    if (match && match[1]) {
      const found = languages.find((l) => l.code === match[1]);
      if (found) setActive(found);
    }

    return () => observer.disconnect();
  }, []);

  // Inject Google Translate script once
  useEffect(() => {
    if (document.getElementById("google-translate-script")) {
      // Already injected
      const interval = setInterval(() => {
        if (document.querySelector(".goog-te-combo")) {
          setGtReady(true);
          clearInterval(interval);
        }
      }, 500);
      return () => clearInterval(interval);
    }

    window.googleTranslateElementInit = () => {
      protectBrandNames();
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,pt,fr,ar,sw",
          layout: 0, // SIMPLE
          autoDisplay: false,
        },
        "google_translate_element"
      );

      // Wait for select to appear
      const interval = setInterval(() => {
        if (document.querySelector(".goog-te-combo")) {
          setGtReady(true);
          clearInterval(interval);
        }
      }, 500);
    };

    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.head.appendChild(script);
  }, []);

  // Close on click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selectLanguage = (lang: typeof languages[0]) => {
    setActive(lang);
    setOpen(false);
    if (lang.code === "en") {
      // Reset to original
      const frame = document.querySelector(".goog-te-banner-frame") as HTMLIFrameElement;
      if (frame) {
        const btn = frame.contentDocument?.querySelector(".goog-close-link") as HTMLElement;
        btn?.click();
      }
      // Fallback: set cookie to empty
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=." + window.location.hostname;
      window.location.reload();
    } else {
      triggerGoogleTranslate(lang.code);
    }
  };

  if (variant === "mobile") {
    return (
      <>
        {/* Hidden Google Translate element */}
        <div id="google_translate_element" className="!hidden" />
        <div ref={ref} className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-base font-semibold text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Globe className="h-5 w-5 text-[#FDBA74]" />
            <span>{active.flag} {active.label}</span>
            <ChevronDown className={`ml-auto h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
          </button>
          {open && (
            <div className="ml-4 mt-1 space-y-1 border-l border-white/15 pl-3">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => selectLanguage(lang)}
                  className={`block w-full rounded-lg px-3 py-2 text-left text-sm font-semibold transition-colors ${
                    active.code === lang.code
                      ? "bg-white/10 text-[#FDBA74]"
                      : "text-slate-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {lang.flag} {lang.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      {/* Hidden Google Translate element */}
      <div id="google_translate_element" className="!hidden" />
      <div ref={ref} className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 text-[14px] font-extrabold text-slate-200 transition-colors hover:text-white"
        >
          <Globe className="h-4 w-4 text-[#FDBA74]" />
          <span>{active.flag} {active.label}</span>
          <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
        {open && (
          <div
            className="absolute right-0 top-[calc(100%+12px)] z-[80] w-[200px] overflow-hidden rounded-[14px] border p-2 shadow-[0_24px_70px_rgba(0,0,0,0.55)] backdrop-blur-2xl"
            style={{
              backgroundColor: "color-mix(in srgb, var(--agtp-navbar, #0B1F33) 92%, black 8%)",
              borderColor: "color-mix(in srgb, var(--agtp-navbar, #0B1F33) 75%, white 25%)",
            }}
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => selectLanguage(lang)}
                className={`flex w-full items-center gap-3 rounded-[10px] px-3 py-2.5 text-left text-[13px] font-extrabold transition-colors ${
                  active.code === lang.code
                    ? "bg-white/10 text-[#FDBA74]"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span className="text-base">{lang.flag}</span>
                {lang.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

