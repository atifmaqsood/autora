"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function PartsGallery({ images, title }: { images: (string | StaticImageData)[]; title: string }) {
  const [selected, setSelected] = useState(0);
  const thumbnails = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const row = thumbnails.current;
    const thumbnail = row?.children[selected] as HTMLElement | undefined;
    if (!row || !thumbnail) return;
    const left = thumbnail.offsetLeft;
    if (left < row.scrollLeft || left + thumbnail.offsetWidth > row.scrollLeft + row.clientWidth) {
      row.scrollTo({
        left: left - (row.clientWidth - thumbnail.offsetWidth) / 2,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
      });
    }
  }, [selected]);

  function scrollThumbnails(direction: number) {
    const row = thumbnails.current;
    if (!row) return;
    row.scrollBy({
      left: direction * row.clientWidth * 0.8,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
    });
  }

  return (
    <div aria-label={`${title} gallery`}>
      <div className="relative aspect-video overflow-hidden rounded-xl bg-[#0B1F33]">
        <Image
          src={images[selected] ?? images[0]}
          alt={`${title} — image ${selected + 1}`}
          fill
          priority
          sizes="(max-width: 1280px) 100vw, 1216px"
          className="object-cover"
        />
        {images.length > 1 && (
          <>
            <button type="button" aria-label="Previous image" onClick={() => setSelected((selected + images.length - 1) % images.length)} className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/50 text-white hover:bg-black/80">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button type="button" aria-label="Next image" onClick={() => setSelected((selected + 1) % images.length)} className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/50 text-white hover:bg-black/80">
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>
      <div className="mt-3 flex min-w-0 items-center gap-2 sm:gap-3">
        <button type="button" aria-label="Scroll thumbnails left" onClick={() => scrollThumbnails(-1)} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10 sm:h-10 sm:w-10">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div ref={thumbnails} className="relative flex min-w-0 flex-1 snap-x snap-proximity gap-3 overflow-x-auto overscroll-x-contain pb-3" style={{ scrollbarWidth: "thin", scrollbarColor: "var(--agtp-secondary) transparent" }} aria-label="Gallery thumbnails">
        {images.map((src, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setSelected(index)}
            aria-label={`View ${title} image ${index + 1}`}
            aria-pressed={selected === index}
            className={`relative h-16 w-24 shrink-0 snap-start overflow-hidden rounded-md border-2 transition-opacity sm:h-24 sm:w-36 ${selected === index ? "border-[var(--agtp-secondary)] opacity-100" : "border-transparent opacity-50 hover:opacity-100"}`}
          >
            <Image src={src} alt="" fill sizes="144px" className="object-cover" />
          </button>
        ))}
        </div>
        <button type="button" aria-label="Scroll thumbnails right" onClick={() => scrollThumbnails(1)} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10 sm:h-10 sm:w-10">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
