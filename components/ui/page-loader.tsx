"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useContent } from "@/lib/content/context";

const FIRST_CHAR_START = 80;
const FIRST_CHAR_DURATION = 360;
const CHAR_GAP_MS = 80;
const WORD_PAUSE_MS = 320; // Distinct pause after first word before remaining words light up
const HOLD_DURATION_MS = 350;
const FADE_OUT_MS = 400;

export function PageLoader() {
  const pathname = usePathname();
  const { content } = useContent();

  // Real brand name (e.g. "AGTP GROUP")
  const brandName = (content?.site?.brandName || "AGTP GROUP").trim();

  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const previousPath = useRef(pathname);
  const activeAnimationStartedAt = useRef<number>(Date.now());
  const isTransitioning = useRef<boolean>(true);

  // Compute word and character timings dynamically:
  // - First character of first word glides in from offset with glowing light
  // - Remaining characters of first word light up sequentially
  // - Noticeable pause before remaining words start ("not immediately after first word")
  // - Remaining words light up letter by letter till the last dot
  const { wordsWithTiming, totalDisplayMs } = useMemo(() => {
    const rawWords = brandName.split(/\s+/).filter(Boolean);
    const words = rawWords.length > 0 ? rawWords : ["AGTP", "GROUP"];

    let currentTime = FIRST_CHAR_START;

    const computed = words.map((word, wIdx) => {
      const isLastWord = wIdx === words.length - 1;
      // Append sleek dot '.' on last word like the reference design
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

        return { char, delay, isFirstChar, isDot: char === "." };
      });

      return { word, charTimings };
    });

    const totalMs = currentTime + HOLD_DURATION_MS;
    return { wordsWithTiming: computed, totalDisplayMs: totalMs };
  }, [brandName]);

  const triggerLoader = () => {
    activeAnimationStartedAt.current = Date.now();
    isTransitioning.current = true;
    setExiting(false);
    setVisible(true);
    setAnimationKey((prev) => prev + 1);
  };

  // 1. Handle route changes (e.g. browser back/forward or completed navigation)
  useEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;

    // Reset scroll to top instantly behind the loader to prevent visual jumps
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });

    // If a link click already initiated the loader animation within the last 800ms,
    // let it continue smoothly without resetting/flickering
    const elapsedSinceTrigger = Date.now() - activeAnimationStartedAt.current;
    if (!isTransitioning.current || elapsedSinceTrigger > 800) {
      triggerLoader();
    }
  }, [pathname]);

  // 2. Intercept navbar and internal link clicks to show the loader immediately
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      const targetAttr = anchor.getAttribute("target");

      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        targetAttr === "_blank" ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      try {
        const url = new URL(href, window.location.href);
        // Only trigger loader when navigating to a different internal page
        if (url.origin === window.location.origin && url.pathname !== window.location.pathname) {
          triggerLoader();
        }
      } catch {
        // Ignore invalid URLs
      }
    };

    document.addEventListener("click", handleClick, { capture: true });
    return () => document.removeEventListener("click", handleClick, { capture: true });
  }, []);

  // 3. Exit and unmount timers
  useEffect(() => {
    if (!visible) return;

    // Fade out overlay smoothly
    const exitTimer = window.setTimeout(() => {
      setExiting(true);
    }, totalDisplayMs);

    // Completely unmount after fade out
    const removeTimer = window.setTimeout(() => {
      setVisible(false);
      isTransitioning.current = false;
    }, totalDisplayMs + FADE_OUT_MS);

    // Safety fallback to prevent staying visible under any circumstance
    const safetyTimer = window.setTimeout(() => {
      setExiting(true);
      window.setTimeout(() => {
        setVisible(false);
        isTransitioning.current = false;
      }, FADE_OUT_MS);
    }, totalDisplayMs + 1500);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(removeTimer);
      window.clearTimeout(safetyTimer);
    };
  }, [visible, animationKey, totalDisplayMs]);

  if (!visible) return null;

  return (
    <>
      {/* Inline styles guarantee animation works reliably on SSR, hydration, and Vercel CDN */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes firstCharGlideLight {
              0% {
                opacity: 0;
                transform: translateX(-65px) translateY(-2px) scale(1.25);
                filter: blur(8px);
                color: #3f3f46;
                text-shadow: none;
              }
              40% {
                opacity: 0.85;
                filter: blur(2px);
              }
              70% {
                opacity: 1;
                filter: blur(0);
                color: #ffffff;
                text-shadow: 0 0 16px rgba(255, 255, 255, 0.95), 0 0 32px rgba(255, 255, 255, 0.6);
              }
              100% {
                opacity: 1;
                transform: translateX(0) translateY(0) scale(1);
                filter: blur(0);
                color: #FAFAFA;
                text-shadow: 0 0 10px rgba(255, 255, 255, 0.35);
              }
            }

            @keyframes charLightUp {
              0% {
                opacity: 0;
                transform: translateY(6px) scale(0.92);
                filter: blur(4px);
                color: #3f3f46;
                text-shadow: none;
              }
              45% {
                opacity: 1;
                transform: translateY(-1px) scale(1.05);
                filter: blur(0);
                color: #ffffff;
                text-shadow: 0 0 16px rgba(255, 255, 255, 0.95), 0 0 28px rgba(255, 255, 255, 0.5);
              }
              100% {
                opacity: 1;
                transform: translateY(0) scale(1);
                filter: blur(0);
                color: #FAFAFA;
                text-shadow: 0 0 10px rgba(255, 255, 255, 0.35);
              }
            }

            .animate-preloader-first {
              display: inline-block;
              opacity: 0;
              animation: firstCharGlideLight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
              will-change: transform, opacity, filter;
            }

            .animate-preloader-char {
              display: inline-block;
              opacity: 0;
              animation: charLightUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
              will-change: transform, opacity, filter;
            }
          `
        }}
      />

      <div
        className={`fixed inset-0 z-[2147483646] flex items-center justify-center bg-black transition-opacity duration-400 ease-out select-none notranslate ${
          exiting ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        aria-live="polite"
        aria-busy={!exiting}
        translate="no"
      >
        <div key={animationKey} className="flex items-center justify-center px-4 notranslate" translate="no">
          <h1
            className="flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-8 text-[24px] sm:text-[36px] md:text-[48px] font-normal uppercase tracking-[0.35em] sm:tracking-[0.4em] antialiased text-[#A1A1AA] notranslate"
            translate="no"
          >
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
    </>
  );
}
