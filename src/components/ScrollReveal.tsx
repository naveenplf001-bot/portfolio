'use client';

import { useEffect, useRef, useState, useCallback, type ReactNode, type CSSProperties } from 'react';

// ============================
// SCROLL REVEAL — Intersection-based
// ============================
interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  duration?: number;
  once?: boolean;
  scale?: number;      // start scale, e.g. 0.95
  blur?: number;       // start blur in px
  rotate?: number;     // start rotation in deg
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  distance = 30,
  duration = 700,
  once = true,
  scale,
  blur,
  rotate,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  const translates: Record<string, string> = {
    up: `translateY(${distance}px)`,
    down: `translateY(-${distance}px)`,
    left: `translateX(${distance}px)`,
    right: `translateX(-${distance}px)`,
    none: '',
  };

  const hiddenTransforms = [
    translates[direction],
    scale ? `scale(${scale})` : '',
    rotate ? `rotate(${rotate}deg)` : '',
  ].filter(Boolean).join(' ') || 'none';

  const style: CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0) scale(1) rotate(0deg)' : hiddenTransforms,
    filter: blur ? (isVisible ? 'blur(0px)' : `blur(${blur}px)`) : undefined,
    transition: [
      `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      `transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      blur ? `filter ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms` : '',
    ].filter(Boolean).join(', '),
    willChange: 'opacity, transform, filter',
  };

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}

// ============================
// PARALLAX — Scroll-linked movement
// ============================
export function Parallax({
  children,
  speed = 0.15,
  className = '',
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const viewCenter = window.innerHeight / 2;
      setOffset((center - viewCenter) * speed);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div ref={ref} className={className} style={{ transform: `translateY(${offset}px)`, willChange: 'transform' }}>
      {children}
    </div>
  );
}

// ============================
// MAGNETIC — Cursor-following hover
// ============================
export function Magnetic({
  children,
  className = '',
  strength = 0.3,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  }, [strength]);

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'translate(0px, 0px)';
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)', willChange: 'transform' }}
    >
      {children}
    </div>
  );
}

// ============================
// COUNTER — Animated number
// ============================
export function AnimatedCounter({
  value,
  suffix = '',
  className = '',
  duration = 2000,
}: {
  value: number;
  suffix?: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) { setStarted(true); obs.unobserve(el); } },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [started, value, duration]);

  return <span ref={ref} className={className}>{display}{suffix}</span>;
}

// ============================
// TILT CARD — 3D perspective on hover
// ============================
export function TiltCard({
  children,
  className = '',
  intensity = 8,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) scale(1.02)`;
  }, [intensity]);

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)';
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)', willChange: 'transform', transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
}
