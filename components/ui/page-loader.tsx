"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useContent } from "@/lib/content/context";

const MIN_VISIBLE_MS = 850;
const COMPLETE_HOLD_MS = 200;

export function PageLoader() {
  const pathname = usePathname();
  const { content } = useContent();
  const brandName = content?.site?.brandName || "AGTP GROUP";
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const startedAt = useRef(Date.now());
  const previousPath = useRef(pathname);

  useEffect(() => {
    if (!visible) return;

    const interval = window.setInterval(() => {
      setProgress((current) => {
        if (current >= 94) return current;
        const step = current < 50 ? 6 : current < 80 ? 4 : 2;
        return Math.min(current + step, 94);
      });
    }, 50);

    return () => window.clearInterval(interval);
  }, [visible]);

  useEffect(() => {
    const complete = () => {
      const elapsed = Date.now() - startedAt.current;
      const wait = Math.max(MIN_VISIBLE_MS - elapsed, 0);

      window.setTimeout(() => {
        setProgress(100);
        window.setTimeout(() => {
          setExiting(true);
          window.setTimeout(() => setVisible(false), 420);
        }, COMPLETE_HOLD_MS);
      }, wait);
    };

    complete();
  }, [pathname]);

  useEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;
    completeReset();
  }, [pathname]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      const targetAttr = anchor.getAttribute("target");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || targetAttr) return;

      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;

      completeReset();
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  const completeReset = () => {
    startedAt.current = Date.now();
    setProgress(0);
    setExiting(false);
    setVisible(true);
  };

  if (!visible) return null;

  const words = brandName.split(" ");
  let globalCharIndex = 0;

  return (
    <div
      className={`fixed inset-0 z-[2147483646] flex items-center justify-center bg-[#060709] text-white transition-all duration-500 ${
        exiting ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
      aria-live="polite"
      aria-busy={progress < 100}
    >
      <div className="w-[min(850px,88vw)] text-center select-none">
        {/* Animated Pure White Brand Text with Staggered Kinetic Wave Motion */}
        <h1 className="flex flex-wrap items-center justify-center gap-x-[0.3em] text-[54px] sm:text-[74px] md:text-[108px] font-black uppercase leading-none tracking-[0.05em] text-white drop-shadow-[0_12px_32px_rgba(0,0,0,0.85)]">
          {words.map((word, wIdx) => (
            <span key={`${word}-${wIdx}`} className="inline-flex whitespace-nowrap">
              {word.split("").map((char, cIdx) => {
                const delay = globalCharIndex++ * 90;
                return (
                  <span
                    key={`${char}-${cIdx}`}
                    className="animate-loader-wave"
                    style={{
                      animationDelay: `${delay}ms`
                    }}
                  >
                    {char}
                  </span>
                );
              })}
            </span>
          ))}
        </h1>
      </div>
    </div>
  );
}
