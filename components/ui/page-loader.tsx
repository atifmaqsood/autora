"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useContent } from "@/lib/content/context";

const WORD_PAUSE_MS = 550; // Distinct pause between words so remaining words light up after first word
const CHAR_GAP_MS = 110;   // Interval between individual characters lighting up
const FIRST_CHAR_START = 150;
const FIRST_CHAR_DURATION = 550;

export function PageLoader() {
  const pathname = usePathname();
  const { content } = useContent();

  // Preserves the real brand name (e.g. "AGTP GROUP")
  const brandName = (content?.site?.brandName || "AGTP GROUP").trim();

  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const previousPath = useRef(pathname);

  // Compute word and character timings dynamically:
  // - First character of first word flies in from elsewhere
  // - Remaining characters of first word light up sequentially
  // - Noticeable pause before remaining words start
  // - Remaining words light up letter by letter till the last
  const { wordsWithTiming, totalDisplayMs } = useMemo(() => {
    const rawWords = brandName.split(/\s+/).filter(Boolean);
    const words = rawWords.length > 0 ? rawWords : ["AGTP", "GROUP"];

    let currentTime = FIRST_CHAR_START;

    const computed = words.map((word, wIdx) => {
      const isLastWord = wIdx === words.length - 1;
      // Append minimalist elegant dot '.' on last word like the reference design
      const chars = (word + (isLastWord ? "." : "")).split("");

      if (wIdx > 0) {
        // Deliberate pause after first word before next word begins lighting up
        currentTime += WORD_PAUSE_MS;
      }

      const charTimings = chars.map((char, cIdx) => {
        let delay = currentTime;
        const isFirstChar = wIdx === 0 && cIdx === 0;

        if (isFirstChar) {
          delay = FIRST_CHAR_START;
          currentTime = FIRST_CHAR_START + FIRST_CHAR_DURATION;
        } else {
          currentTime += CHAR_GAP_MS;
        }

        return { char, delay, isFirstChar };
      });

      return { word, charTimings };
    });

    const totalMs = currentTime + 700; // Hold for 700ms after all characters finish
    return { wordsWithTiming: computed, totalDisplayMs: totalMs };
  }, [brandName]);

  useEffect(() => {
    if (!visible) return;

    const timer = window.setTimeout(() => {
      setExiting(true);
      const exitTimer = window.setTimeout(() => {
        setVisible(false);
      }, 600);
      return () => window.clearTimeout(exitTimer);
    }, totalDisplayMs);

    return () => window.clearTimeout(timer);
  }, [visible, animationKey, totalDisplayMs]);

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
    setAnimationKey((prev) => prev + 1);
    setExiting(false);
    setVisible(true);
  };

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[2147483646] flex items-center justify-center bg-black transition-all duration-600 ease-out select-none ${
        exiting ? "opacity-0 scale-[1.02] pointer-events-none" : "opacity-100 scale-100"
      }`}
      aria-live="polite"
      aria-busy={!exiting}
    >
      <div key={animationKey} className="flex items-center justify-center px-4">
        <h1 className="flex flex-wrap items-center justify-center gap-x-5 sm:gap-x-7 text-[19px] sm:text-[23px] md:text-[26px] font-normal uppercase tracking-[0.4em] sm:tracking-[0.48em] antialiased">
          {wordsWithTiming.map((item, wIdx) => (
            <span key={`word-${wIdx}`} className="inline-flex items-center whitespace-nowrap">
              {item.charTimings.map((c, cIdx) => (
                <span
                  key={`c-${wIdx}-${cIdx}`}
                  className={c.isFirstChar ? "animate-preloader-first" : "animate-preloader-char"}
                  style={{ animationDelay: `${c.delay}ms` }}
                >
                  {c.char}
                </span>
              ))}
            </span>
          ))}
        </h1>
      </div>
    </div>
  );
}
