'use client';
import { useEffect } from 'react';

export default function HeroSnap() {
  useEffect(() => {
    const hero = document.getElementById('hero-section');
    if (!hero) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let snapping = false;
    let armed = true;

    function getTargetY(): number {
      const target = hero!.nextElementSibling as HTMLElement | null;
      if (target) return target.getBoundingClientRect().top + window.scrollY;
      return hero!.offsetHeight;
    }

    function performSnap() {
      if (snapping || !armed) return;
      const targetY = getTargetY();
      if (window.scrollY >= targetY - 10) { armed = false; return; }
      snapping = true;
      armed = false;
      const lenis = window.lenis;
      const finish = () => { setTimeout(() => { snapping = false; }, 50); };
      if (lenis && !reduceMotion) {
        lenis.scrollTo(targetY, {
          duration: 0.9,
          easing: (t: number) => 1 - Math.pow(1 - t, 3),
          lock: true,
          force: true,
          onComplete: finish,
        });
      } else {
        window.scrollTo({ top: targetY, behavior: reduceMotion ? 'auto' : 'smooth' });
        setTimeout(finish, reduceMotion ? 0 : 900);
      }
    }

    function onScroll() {
      if (!armed || snapping) return;
      const targetY = getTargetY();
      if (window.scrollY > 0 && window.scrollY < targetY - 20) {
        performSnap();
      } else if (window.scrollY >= targetY - 20) {
        armed = false;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return null;
}
