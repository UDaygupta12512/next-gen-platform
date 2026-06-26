'use client';

import { useEffect, useRef } from 'react';

export default function useRevealOnIntersect<T extends HTMLElement>(threshold = 0.12) {
  const sectionRef = useRef<T>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold }
    );

    section.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [threshold]);

  return sectionRef;
}
