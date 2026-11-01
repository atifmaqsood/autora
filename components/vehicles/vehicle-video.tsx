"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A vehicle's video (uploaded file or YouTube embed URL) that starts playing,
 * muted and on a loop, the first time it scrolls into view.
 */
export function VehicleVideo({
  videoUrl,
  embedUrl,
  title,
}: {
  videoUrl?: string | null;
  embedUrl?: string | null;
  title: string;
}) {
  const box = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const element = box.current;
    if (!element || seen) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [seen]);

  // Start the uploaded video once; after that the visitor's controls rule.
  useEffect(() => {
    if (!seen || !video.current) return;
    video.current.muted = true;
    void video.current.play().catch(() => undefined);
  }, [seen]);

  return (
    <div
      ref={box}
      className="w-full overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl md:max-w-[540px]"
    >
      {videoUrl ? (
        <video
          ref={video}
          // "#t=0.1" shows the opening frame until it starts playing.
          src={`${videoUrl}#t=0.1`}
          muted
          loop
          controls
          playsInline
          preload="metadata"
          aria-label={`${title} video`}
          className="aspect-video w-full bg-black object-cover"
        />
      ) : seen && embedUrl ? (
        // Loaded (and autoplaying) only once the section is on screen.
        <iframe
          src={embedUrl}
          title={`${title} video`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="aspect-video w-full border-0"
        />
      ) : (
        <div aria-hidden="true" className="aspect-video w-full bg-black" />
      )}
    </div>
  );
}
