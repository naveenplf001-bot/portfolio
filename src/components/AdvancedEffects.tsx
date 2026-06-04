'use client';

import { useEffect, useRef, useState, useCallback, type ReactNode } from 'react';

// ============================
// CURSOR GLOW — Radial light follows mouse
// ============================
export function CursorGlow({
  children,
  className = '',
  color = 'rgba(99, 102, 241, 0.15)',
  size = 400,
}: {
  children: ReactNode;
  className?: string;
  color?: string;
  size?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty('--glow-x', `${x}px`);
    el.style.setProperty('--glow-y', `${y}px`);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener('mousemove', handleMouseMove);
    return () => el.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      style={{
        '--glow-x': '50%',
        '--glow-y': '50%',
        '--glow-color': color,
        '--glow-size': `${size}px`,
      } as React.CSSProperties}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 opacity-0 hover-parent-opacity"
        style={{
          background: `radial-gradient(var(--glow-size) circle at var(--glow-x) var(--glow-y), var(--glow-color), transparent 70%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// ============================
// CARD SPOTLIGHT — Glow follows cursor on individual cards
// ============================
export function SpotlightCard({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
  }, []);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      style={{ '--spot-x': '50%', '--spot-y': '50%' } as React.CSSProperties}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(250px circle at var(--spot-x) var(--spot-y), rgba(99, 102, 241, 0.12), transparent 70%)',
        }}
      />
      {children}
    </div>
  );
}

// ============================
// TEXT REVEAL — Words animate in one by one
// ============================
export function TextReveal({
  text,
  className = '',
  delay = 0,
  stagger = 80,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const words = text.split(' ');

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <span
            className="inline-block"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0) rotate(0deg)' : 'translateY(100%) rotate(5deg)',
              transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay + i * stagger}ms`,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}

// ============================
// SCROLL PROGRESS BAR
// ============================
export function ScrollProgress({ color = 'bg-indigo-500' }: { color?: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-[100] bg-transparent">
      <div
        className={`h-full ${color} transition-none shadow-[0_0_10px_rgba(99,102,241,0.5)]`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

// ============================
// IMAGE REVEAL — Wipe/uncover animation
// ============================
export function ImageReveal({
  src,
  alt,
  className = '',
  direction = 'left',
}: {
  src: string;
  alt: string;
  className?: string;
  direction?: 'left' | 'right' | 'up' | 'down';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const clipPaths: Record<string, { hidden: string; visible: string }> = {
    left: { hidden: 'inset(0 100% 0 0)', visible: 'inset(0 0% 0 0)' },
    right: { hidden: 'inset(0 0 0 100%)', visible: 'inset(0 0 0 0%)' },
    up: { hidden: 'inset(100% 0 0 0)', visible: 'inset(0% 0 0 0)' },
    down: { hidden: 'inset(0 0 100% 0)', visible: 'inset(0 0 0% 0)' },
  };

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full object-cover"
        style={{
          clipPath: visible ? clipPaths[direction].visible : clipPaths[direction].hidden,
          transition: 'clip-path 1s cubic-bezier(0.16, 1, 0.3, 1)',
          transform: visible ? 'scale(1)' : 'scale(1.1)',
          transitionProperty: 'clip-path, transform',
          transitionDuration: '1s, 1.2s',
        }}
      />
    </div>
  );
}

// ============================
// FLOATING PARTICLES — client-only to avoid hydration mismatch
// ============================
export function FloatingParticles({
  count = 20,
  className = '',
}: {
  count?: number;
  className?: string;
}) {
  const [particles, setParticles] = useState<{ id: number; left: string; top: string; size: number; duration: number; delay: number; opacity: number }[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: 2 + Math.random() * 3,
        duration: 15 + Math.random() * 20,
        delay: Math.random() * 10,
        opacity: 0.1 + Math.random() * 0.2,
      }))
    );
  }, [count]);

  if (particles.length === 0) return null;

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full bg-white animate-float"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
