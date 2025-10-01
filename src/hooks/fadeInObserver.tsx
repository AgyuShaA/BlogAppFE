"use client";

import { useEffect } from "react";

export default function FadeInObserver() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(
      "[class*='fade-in-']"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible"); // Add visible when fully in view
          }
        });
      },
      { threshold: 0.5 } // Trigger when 10% of the element is visible
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
