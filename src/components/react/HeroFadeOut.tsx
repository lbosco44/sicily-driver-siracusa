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
      if (window.scrollY >= targetY - 10) {
        armed = false;
        return;
      }
      snapping = true;
      armed = false;
      const lenis = window.lenis;
      const finish = () => {
        setTimeout(() => { snapping = false; }, 50);
      };
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

    let touchStartY = 0;
    function onTouchStart(e: TouchEvent) {
      touchStartY = e.touches[0].clientY;
    }
    function onTouchMove(e: TouchEvent) {
      if (!armed || snapping) return;
      if (window.scrollY > 5) return;
      const deltaY = touchStartY - e.touches[0].clientY;
      if (deltaY > 8) performSnap();
    }
    function onWheel(e: WheelEvent) {
      if (!armed || snapping) return;
      if (window.scrollY > 5) return;
      if (e.deltaY > 0) performSnap();
    }
    function onKey(e: KeyboardEvent) {
      if (!armed || snapping) return;
      if (window.scrollY > 5) return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if (['PageDown', 'ArrowDown', ' ', 'Space'].includes(e.key)) {
        performSnap();
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  return null;
}
