"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const MIN_VISIBLE_MS = 900;
const COMPLETE_HOLD_MS = 220;

export function PageLoader() {
  const pathname = usePathname();
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
        const step = current < 50 ? 5 : current < 80 ? 3 : 1;
        return Math.min(current + step, 94);
      });
    }, 55);

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

  return (
    <div
      className={`fixed inset-0 z-[2147483646] flex items-center justify-center bg-[#070a10] text-slate-100 transition-opacity duration-500 ${
        exiting ? "opacity-0" : "opacity-100"
      }`}
      aria-live="polite"
      aria-busy={progress < 100}
    >
      <div className="w-[min(750px,78vw)] text-center">
        <div className="text-[64px] font-black uppercase leading-none tracking-[0.04em] md:text-[118px]">
          AGTP GROUP
        </div>
        <div className="mt-10 h-px w-full bg-[#1d263d]">
          <div
            className="h-px bg-[#536dfe] transition-[width] duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-5 font-mono text-[16px] tracking-[0.35em] text-[#b8c7ff]">
          {progress}%
        </div>
      </div>
    </div>
  );
}


