"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useInView({
  threshold = 0.1,
  rootMargin = "0px 0px -40px 0px",
  triggerOnce = false
}: UseInViewOptions = {}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof window !== "undefined") {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setIsInView(true);
        return;
      }

      // If user already scrolled past this element before hydration:
      const rect = el.getBoundingClientRect();
      if (rect.bottom < 0 && window.scrollY > 0) {
        setIsInView(true);
        if (triggerOnce) return;
      }
    }

    if (typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting || entry.intersectionRatio > 0) {
          setIsInView(true);
          if (triggerOnce) {
            observer.unobserve(entry.target);
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isInView };
}

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  delay?: number; // ms
  duration?: number; // ms
  distance?: number; // px
  direction?: "up" | "down" | "left" | "right" | "none";
  once?: boolean;
  as?: React.ElementType;
}

export function Reveal({
  children,
  className,
  delay = 0,
  duration = 1500,
  distance = 120,
  direction = "up",
  once = false,
  as: Component = "div",
  style,
  ...props
}: RevealProps) {
  const { ref, isInView } = useInView({ triggerOnce: once });

  const getTransform = () => {
    if (isInView) return "translate(0px, 0px)";
    switch (direction) {
      case "up":
        return `translateY(${distance}px)`;
      case "down":
        return `translateY(-${distance}px)`;
      case "left":
        return `translateX(${distance}px)`;
      case "right":
        return `translateX(-${distance}px)`;
      case "none":
        return "none";
      default:
        return `translateY(${distance}px)`;
    }
  };

  return (
    <Component
      ref={ref}
      className={cn("transition-all duration-[1500ms] ease-out", className)}
      style={{
        opacity: isInView ? 1 : 0,
        transform: getTransform(),
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        willChange: "opacity, transform",
        ...style
      }}
      {...props}
    >
      {children}
    </Component>
  );
}

export function RevealEyebrow({
  children,
  className,
  delay = 0,
  duration = 1500,
  ...props
}: RevealProps) {
  return (
    <Reveal
      delay={delay}
      duration={duration}
      distance={15}
      direction="up"
      className={cn("inline-block", className)}
      {...props}
    >
      {children}
    </Reveal>
  );
}

export function RevealHeading({
  children,
  className,
  delay = 80,
  duration = 1500,
  ...props
}: RevealProps) {
  return (
    <Reveal
      delay={delay}
      duration={duration}
      distance={25}
      direction="up"
      className={className}
      {...props}
    >
      {children}
    </Reveal>
  );
}

export function RevealText({
  children,
  className,
  delay = 140,
  duration = 1500,
  ...props
}: RevealProps) {
  return (
    <Reveal
      delay={delay}
      duration={duration}
      distance={20}
      direction="up"
      className={className}
      {...props}
    >
      {children}
    </Reveal>
  );
}

export function RevealButton({
  children,
  className,
  delay = 220,
  duration = 1500,
  ...props
}: RevealProps) {
  return (
    <Reveal
      delay={delay}
      duration={duration}
      distance={10}
      direction="up"
      className={className}
      {...props}
    >
      {children}
    </Reveal>
  );
}

interface RevealImageProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  initialScale?: number;
}

export function RevealImage({
  children,
  className,
  delay = 0,
  duration = 1500,
  initialScale = 1.03,
  style,
  ...props
}: RevealImageProps) {
  const { ref, isInView } = useInView({ triggerOnce: false });

  return (
    <div
      ref={ref}
      className={cn("overflow-hidden transition-all ease-out", className)}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "scale(1)" : `scale(${initialScale})`,
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        willChange: "opacity, transform",
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
}

interface RevealStaggerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  baseDelay?: number;
}

export function RevealStagger({
  children,
  className,
  staggerDelay = 60,
  baseDelay = 0,
  ...props
}: RevealStaggerProps) {
  const { ref, isInView } = useInView({ threshold: 0.01, rootMargin: "0px 0px 80px 0px", triggerOnce: false });

  return (
    <div ref={ref} className={className} {...props}>
      {React.Children.map(children, (child, idx) => {
        if (!React.isValidElement(child)) return child;
        // Stagger per row (max 300ms) so items far down don't wait seconds
        const itemDelay = baseDelay + Math.min((idx % 6) * staggerDelay, 300);

        return (
          <div
            className="transition-all duration-[1500ms] ease-out"
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? "translateY(0px)" : "translateY(100px)",
              transitionDelay: `${itemDelay}ms`,
              willChange: "opacity, transform"
            }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
}

interface RevealLinesProps extends React.HTMLAttributes<HTMLDivElement> {
  lines?: string[];
  children?: React.ReactNode;
  lineStaggerMs?: number;
  baseDelay?: number;
  className?: string;
  lineClassName?: string;
}

/**
 * RevealLines - Animates text line-by-line / paragraph-by-paragraph with staggered delays as scrolled into view.
 */
export function RevealLines({
  lines,
  children,
  lineStaggerMs = 110,
  baseDelay = 0,
  className,
  lineClassName,
  ...props
}: RevealLinesProps) {
  const { ref, isInView } = useInView({ triggerOnce: false });

  let textLines: string[] = [];
  if (lines && lines.length > 0) {
    textLines = lines;
  } else if (typeof children === "string") {
    textLines = children.split("\n").filter((l) => l.trim().length > 0);
  }

  if (textLines.length > 0) {
    return (
      <div ref={ref} className={cn("space-y-2.5", className)} {...props}>
        {textLines.map((line, idx) => (
          <div key={idx} className="overflow-hidden">
            <div
              className={cn("transition-all duration-[1500ms] ease-out", lineClassName)}
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateY(0%)" : "translateY(100%)",
                transitionDelay: `${baseDelay + idx * lineStaggerMs}ms`,
                willChange: "opacity, transform"
              }}
            >
              {line}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className={className} {...props}>
      {React.Children.map(children, (child, idx) => {
        if (!React.isValidElement(child)) return child;
        return (
          <div className="overflow-hidden">
            <div
              className={cn("transition-all duration-[1500ms] ease-out", lineClassName)}
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateY(0%)" : "translateY(100%)",
                transitionDelay: `${baseDelay + idx * lineStaggerMs}ms`,
                willChange: "opacity, transform"
              }}
            >
              {child}
            </div>
          </div>
        );
      })}
    </div>
  );
}

interface RevealCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  suffixClassName?: string;
  suffixStyle?: React.CSSProperties;
  mode?: "roll" | "count";
}

function RollingDigit({
  targetDigit,
  isRolling,
  delay = 0,
  duration = 1600
}: {
  targetDigit: number;
  isRolling: boolean;
  delay?: number;
  duration?: number;
}) {
  const numbers = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9
  ];
  const targetIndex = 10 + targetDigit;
  const targetPercent = (targetIndex / numbers.length) * 100;

  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    let raf2: number;
    if (isRolling) {
      // Allow browser to paint the 0% position first, then trigger smooth roll
      const raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => {
          setHasStarted(true);
        });
      });
      return () => {
        cancelAnimationFrame(raf1);
        if (raf2) cancelAnimationFrame(raf2);
      };
    } else {
      setHasStarted(false);
    }
  }, [isRolling]);

  return (
    <span className="relative inline-block h-[1.12em] overflow-hidden leading-[1.12em] align-top tabular-nums">
      <span
        className="inline-flex flex-col select-none"
        style={{
          transform: hasStarted && isRolling ? `translateY(-${targetPercent}%)` : "translateY(0%)",
          transitionProperty: "transform",
          transitionDuration: `${duration}ms`,
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          transitionDelay: `${delay}ms`,
          willChange: "transform"
        }}
      >
        {numbers.map((n, i) => (
          <span key={i} className="h-[1.12em] leading-[1.12em] flex items-center justify-center font-black">
            {n}
          </span>
        ))}
      </span>
    </span>
  );
}

export function RevealCounter({
  end,
  duration = 1600,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
  suffixClassName,
  suffixStyle,
  mode = "roll"
}: RevealCounterProps) {
  const { ref, isInView } = useInView({ threshold: 0.1, rootMargin: "0px 0px -20px 0px", triggerOnce: false });
  const [mounted, setMounted] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isInView || mode !== "count") return;

    let startTimestamp: number | null = null;
    let animationFrameId: number;
    setCount(0);

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(easeOut * end);

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      }
    };

    animationFrameId = window.requestAnimationFrame(step);

    return () => {
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, end, duration, mode]);

  const formattedTarget = decimals > 0 ? end.toFixed(decimals) : end.toLocaleString();

  // SSR or before mount: render full target number
  if (!mounted) {
    return (
      <span ref={ref as any} className={cn("inline-flex items-center tabular-nums font-black", className)}>
        {prefix}
        {formattedTarget}
        {suffix && <span className={suffixClassName} style={suffixStyle}>{suffix}</span>}
      </span>
    );
  }

  if (mode === "count") {
    const formattedCount = decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString();
    return (
      <span ref={ref as any} className={cn("inline-flex items-center tabular-nums font-black", className)}>
        {prefix}
        {formattedCount}
        {suffix && <span className={suffixClassName} style={suffixStyle}>{suffix}</span>}
      </span>
    );
  }

  // mode === "roll": Rolling odometer reels for each digit
  const chars = formattedTarget.split("");
  let digitIndex = 0;

  return (
    <span ref={ref as any} className={cn("inline-flex items-center tabular-nums font-black tracking-tight", className)}>
      {prefix && <span>{prefix}</span>}
      {chars.map((char, idx) => {
        const isDigit = !isNaN(parseInt(char, 10)) && char !== " ";
        if (!isDigit) {
          return (
            <span key={idx} className="inline-block">
              {char}
            </span>
          );
        }
        const currentDigitDelay = Math.min(digitIndex * 75, 400);
        digitIndex++;
        return (
          <RollingDigit
            key={idx}
            targetDigit={parseInt(char, 10)}
            isRolling={isInView}
            delay={currentDigitDelay}
            duration={duration}
          />
        );
      })}
      {suffix && <span className={suffixClassName} style={suffixStyle}>{suffix}</span>}
    </span>
  );
}
