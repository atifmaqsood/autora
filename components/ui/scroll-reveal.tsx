"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useInView({
  threshold = 0.15,
  rootMargin = "0px 0px -40px 0px",
  triggerOnce = true
}: UseInViewOptions = {}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
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
  duration = 820,
  distance = 42,
  direction = "up",
  once = true,
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
      className={cn("transition-all soft-rise", className)}
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
  duration = 760,
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
  duration = 840,
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
  duration = 820,
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
  duration = 760,
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
  duration = 800,
  initialScale = 1.03,
  style,
  ...props
}: RevealImageProps) {
  const { ref, isInView } = useInView({ triggerOnce: true });

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
  staggerDelay = 80,
  baseDelay = 0,
  ...props
}: RevealStaggerProps) {
  const { ref, isInView } = useInView({ triggerOnce: true });

  return (
    <div ref={ref} className={className} {...props}>
      {React.Children.map(children, (child, idx) => {
        if (!React.isValidElement(child)) return child;
        const itemDelay = baseDelay + idx * staggerDelay;

        return (
          <div
            className="transition-all soft-rise duration-700"
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? "translateY(0px)" : "translateY(25px)",
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
  const { ref, isInView } = useInView({ triggerOnce: true });

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
              className={cn("transition-all duration-700 ease-out", lineClassName)}
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
              className={cn("transition-all duration-700 ease-out", lineClassName)}
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
}

export function RevealCounter({
  end,
  duration = 1500,
  prefix = "",
  suffix = "",
  decimals = 0,
  className
}: RevealCounterProps) {
  const { ref, isInView } = useInView({ triggerOnce: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease-out cubic calculation
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
  }, [isInView, end, duration]);

  const formatted = decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString();

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
