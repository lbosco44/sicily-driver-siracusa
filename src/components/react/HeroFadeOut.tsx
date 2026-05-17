'use client';
import { useEffect } from 'react';

export default function HeroSnap() {
  useEffect(() => {
    const hero = document.getElementById('hero-section');
    if (!hero) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let triggered = false;

    function scrollToTarget() {
      const target = hero!.nextElementSibling as HTMLElement | null;
      const top = target ? target.getBoundingClientRect().top + window.scrollY : hero!.offsetHeight;
      const lenis = window.lenis;
      if (lenis && !reduceMotion) {
        lenis.scrollTo(top, { duration: 1.0 });
      } else {
        window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
      }
    }

    function trigger(e: Event) {
      if (triggered) return;
      if (window.scrollY > 10) return;
      const heroBottom = hero!.offsetTop + hero!.offsetHeight;
      if (window.scrollY > heroBottom) return;
      triggered = true;
      e.preventDefault();
      scrollToTarget();
      setTimeout(() => { triggered = false; }, 1200);
    }

    let touchStartY = 0;
    function onTouchStart(e: TouchEvent) {
      touchStartY = e.touches[0].clientY;
    }
    function onTouchMove(e: TouchEvent) {
      const deltaY = touchStartY - e.touches[0].clientY;
      if (deltaY > 6) trigger(e);
    }
    function onWheel(e: WheelEvent) {
      if (e.deltaY > 0) trigger(e);
    }
    function onKey(e: KeyboardEvent) {
      if (['PageDown', 'ArrowDown', ' '].includes(e.key) && window.scrollY < 10) {
        trigger(e);
      }
    }

    window.addEventListener('wheel', onWheel, { passive: false, capture: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true, capture: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false, capture: true });
    window.addEventListener('keydown', onKey, { capture: true });

    return () => {
      window.removeEventListener('wheel', onWheel, true);
      window.removeEventListener('touchstart', onTouchStart, true);
      window.removeEventListener('touchmove', onTouchMove, true);
      window.removeEventListener('keydown', onKey, true);
    };
  }, []);

  return null;
}
