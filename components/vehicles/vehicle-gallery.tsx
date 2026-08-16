"use client";

import { useState } from "react";
import Image from "next/image";
import { Maximize2, X, ChevronLeft, ChevronRight, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VehicleGalleryProps {
  images: string[];
  vehicleTitle: string;
}

export function VehicleGallery({ images, vehicleTitle }: VehicleGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const safeImages = images && images.length > 0
    ? images
    : ["https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&w=1200&q=80"];

  const currentImage = safeImages[selectedIndex] || safeImages[0];

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % safeImages.length);
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev - 1 + safeImages.length) % safeImages.length);
  };

  return (
    <div className="space-y-3">
      {/* Main Image Display */}
      <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-950 border border-[#25304f] group shadow-md">
        <Image
          src={currentImage}
          alt={`${vehicleTitle} image ${selectedIndex + 1}`}
          fill
          priority
          className="object-cover transition-all duration-300"
          sizes="(max-width: 1024px) 100vw, 60vw"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

        {/* Gallery Navigation Controls */}
        {safeImages.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-950/70 text-white flex items-center justify-center backdrop-blur-md opacity-80 hover:opacity-100 transition-all hover:scale-105"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-950/70 text-white flex items-center justify-center backdrop-blur-md opacity-80 hover:opacity-100 transition-all hover:scale-105"
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Fullscreen Button */}
        <button
          onClick={() => setLightboxOpen(true)}
          className="absolute top-4 right-4 bg-slate-950/75 hover:bg-[#536dfe] text-white text-xs font-semibold px-3 py-1.5 rounded-lg backdrop-blur-md flex items-center gap-1.5 transition-all shadow-md"
        >
          <Maximize2 className="w-4 h-4" />
          <span>Expand Gallery</span>
        </button>

        {/* Counter Badge */}
        <div className="absolute bottom-4 left-4 bg-slate-950/80 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-md flex items-center gap-1.5">
          <Camera className="w-3.5 h-3.5 text-[#9cadff]" />
          <span>
            {selectedIndex + 1} / {safeImages.length} Photos
          </span>
        </div>
      </div>

      {/* Thumbnails Row */}
      {safeImages.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {safeImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`relative w-24 h-16 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                selectedIndex === idx
                  ? "border-[#536dfe] ring-2 ring-[#536dfe]/40 opacity-100 scale-105"
                  : "border-[#25304f] opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt={`${vehicleTitle} thumbnail ${idx + 1}`}
                fill
                className="object-cover"
                sizes="96px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex flex-col items-center justify-center p-4">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 text-white hover:text-[#9cadff] p-2 rounded-full bg-slate-900 border border-slate-700"
          >
            <X className="w-7 h-7" />
          </button>

          <div className="relative w-full max-w-5xl aspect-[16/10] bg-black rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={currentImage}
              alt={vehicleTitle}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>

          <div className="mt-4 flex items-center gap-4 text-white text-sm font-semibold">
            <button
              onClick={handlePrev}
              className="px-4 py-2 bg-slate-900 rounded-lg border border-slate-700 hover:bg-slate-800"
            >
              Previous
            </button>
            <span>
              {selectedIndex + 1} of {safeImages.length}
            </span>
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-slate-900 rounded-lg border border-slate-700 hover:bg-slate-800"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


