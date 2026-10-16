"use client";

import { useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { Clock, Play, Volume2 } from "lucide-react";

import { CountryFlag } from "@/components/ui/country-flag";

/**
 * Walkthrough video card media. The uploaded video is its own thumbnail (its
 * opening frame, shown with the badge, play button and audio label); pressing
 * play starts that same video with sound and controls inside the frame. With
 * no video yet, the default image and a "coming soon" note are shown.
 */
export function WalkthroughVideo({
  videoUrl,
  fallbackImage,
  alt,
  flag,
  language,
  audioLabel
}: {
  videoUrl?: string | null;
  fallbackImage: string | StaticImageData;
  alt: string;
  flag: string;
  language: string;
  audioLabel: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  function play() {
    const video = videoRef.current;
    if (!video) return;
    setPlaying(true);
    video.muted = false;
    void video.play().catch(() => undefined);
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
      {videoUrl ? (
        <video
          ref={videoRef}
          // "#t=0.1" makes browsers paint the opening frame as the thumbnail.
          src={`${videoUrl}#t=0.1`}
          preload="metadata"
          playsInline
          muted
          controls={playing}
          aria-label={alt}
          className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 ${
            playing ? "z-20 bg-black" : "group-hover:scale-105"
          }`}
        />
      ) : (
        <Image
          src={fallbackImage}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-95"
        />
      )}

      {!playing && (
        <>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B1F33] via-black/40 to-black/30" />

          <div className="absolute top-5 left-5 flex items-center gap-2 rounded-full border border-[#F97316]/50 bg-[#0B1F33]/90 backdrop-blur-md px-3.5 py-1.5 text-[12px] font-black text-white">
            <CountryFlag iso2={flag} className="h-3.5 w-5" />
            <span>{language}</span>
          </div>

          {videoUrl ? (
            <button
              type="button"
              onClick={play}
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
