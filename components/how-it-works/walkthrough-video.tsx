"use client";

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { Clock, Play, Volume2 } from "lucide-react";

import { CountryFlag } from "@/components/ui/country-flag";

/**
 * Walkthrough video card media. Shows the thumbnail with the badge, play
 * button and audio label; pressing play swaps in the uploaded video inside
 * the same frame so the card design stays intact. Without a video the
 * thumbnail stays and a "coming soon" note replaces the play button.
 */
export function WalkthroughVideo({
  videoUrl,
  poster,
  alt,
  flag,
  language,
  audioLabel
}: {
  videoUrl?: string | null;
  poster: string | StaticImageData;
  alt: string;
  flag: string;
  language: string;
  audioLabel: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
      <Image
        src={poster}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-95"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33] via-black/40 to-black/30" />

      {playing && videoUrl && (
        // Mounted by the play click, so autoplay with sound is allowed.
        <video
          src={videoUrl}
          autoPlay
          controls
          playsInline
          className="absolute inset-0 z-20 h-full w-full bg-black object-contain"
        />
      )}

      {!playing && (
        <>
          <div className="absolute top-5 left-5 flex items-center gap-2 rounded-full border border-[#F97316]/50 bg-[#0B1F33]/90 backdrop-blur-md px-3.5 py-1.5 text-[12px] font-black text-white">
            <CountryFlag iso2={flag} className="h-3.5 w-5" />
            <span>{language}</span>
          </div>

          {videoUrl ? (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={`Play ${language} video`}
              className="absolute inset-0 flex items-center justify-center"
            >
              <span className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-white/80 bg-[#F97316] text-white shadow-2xl shadow-orange-500/50 transition-transform duration-300 group-hover:scale-110">
                <Play className="h-8 w-8 fill-white translate-x-0.5" />
                <span className="absolute inset-0 rounded-full bg-[#F97316] animate-ping opacity-25" />
              </span>
            </button>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-4 py-2 text-[12px] font-black uppercase tracking-wider text-slate-200 backdrop-blur-md">
                <Clock className="h-4 w-4 text-[#FDBA74]" />
                Video coming soon
              </span>
            </div>
          )}

          <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-black/70 backdrop-blur-sm px-3 py-1 text-[11px] font-black text-slate-200 border border-white/10">
            <Volume2 className="h-3.5 w-3.5 text-[#FDBA74]" />
            <span>{audioLabel}</span>
          </div>
        </>
      )}
    </div>
  );
}
