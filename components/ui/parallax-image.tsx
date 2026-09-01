"use client";

import { useEffect, useState, useRef, ReactNode } from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";

interface ParallaxImageProps {
  src: string | StaticImageData;
  alt: string;
  speed?: number; // Speed multiplier for parallax (e.g. 0.3)
  className?: string;
  imageClassName?: string;
  children?: ReactNode;
  overlayOpacity?: string;
}

export function ParallaxImage({
  src,
  alt,
  speed = 0.25,
  className,
  imageClassName,
  children,
  overlayOpacity = "opacity-45"
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollPos = window.innerHeight - rect.top;
      if (scrollPos > 0 && rect.bottom > 0) {
        setOffsetY((rect.top) * speed * -1);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return (
    <div
      ref={containerRef}
      data-keep-color="true"
      className={cn("relative overflow-hidden", className)}
    >
      <div
        className="absolute inset-0 w-full h-[125%] -top-[12.5%] pointer-events-none transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(0, ${offsetY}px, 0)`
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className={cn("object-cover", overlayOpacity, imageClassName)}
          sizes="100vw"
        />
      </div>
      {children}
    </div>
  );
}


