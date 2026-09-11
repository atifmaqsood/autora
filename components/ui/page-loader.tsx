"use client";

import { useEffect, useMemo, useState } from "react";
import { useContent } from "@/lib/content/context";

const FIRST_CHAR_START = 120;
const FIRST_CHAR_DURATION = 480;
const CHAR_GAP_MS = 110;
const WORD_PAUSE_MS = 500; // Distinct pause after first word before remaining words light up
const HOLD_DURATION_MS = 500;
const FADE_OUT_MS = 500;

export function PageLoader() {
  const { content } = useContent();

  // Preserves the real brand name (e.g. "AGTP GROUP")
  const brandName = (content?.site?.brandName || "AGTP GROUP").trim();

  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

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

  useEffect(() => {
    if (!visible) return;

    // Start graceful fade out after totalDisplayMs
    const exitTimer = window.setTimeout(() => {
      setExiting(true);
    }, totalDisplayMs);

    // Completely unmount and remove from DOM after fade out completes
    const removeTimer = window.setTimeout(() => {
      setVisible(false);
    }, totalDisplayMs + FADE_OUT_MS);

    // Failsafe timer to guarantee loader never remains stuck on screen
    const safetyTimer = window.setTimeout(() => {
      setExiting(true);
      window.setTimeout(() => setVisible(false), FADE_OUT_MS);
    }, totalDisplayMs + 2000);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(removeTimer);
      window.clearTimeout(safetyTimer);
    };
  }, [visible, totalDisplayMs]);

  if (!visible) return null;

  return (
    <>
      {/* Inline styles guarantee animation works reliably on SSR, hydration, and production builds */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes firstCharGlideLight {
              0% {
                opacity: 0;
                transform: translateX(-65px) translateY(-2px) scale(1.28);
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
              animation: firstCharGlideLight 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
              will-change: transform, opacity, filter;
            }

            .animate-preloader-char {
              display: inline-block;
              opacity: 0;
              animation: charLightUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
              will-change: transform, opacity, filter;
            }
          `
        }}
      />

      <div
        className={`fixed inset-0 z-[2147483646] flex items-center justify-center bg-black transition-opacity duration-500 ease-out select-none ${
          exiting ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        aria-live="polite"
        aria-busy={!exiting}
      >
        <div className="flex items-center justify-center px-4">
          <h1 className="flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-8 text-[18px] sm:text-[23px] md:text-[27px] font-normal uppercase tracking-[0.42em] sm:tracking-[0.52em] antialiased text-[#A1A1AA]">
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
