'use client';
import { useEffect, useRef } from 'react';

export default function HeroFadeOut() {
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    heroRef.current = document.getElementById('hero-section') as HTMLElement;
    if (!heroRef.current) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    function onScroll() {
      const hero = heroRef.current;
      if (!hero) return;
      const scrollY = window.scrollY;
      const heroH = hero.offsetHeight;
      const progress = Math.min(scrollY / heroH, 1);
      hero.style.opacity = String(1 - progress * 0.85);
      hero.style.transform = `translateY(${progress * -40}px)`;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return null;
}
