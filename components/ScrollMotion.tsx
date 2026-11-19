"use client";

import { useEffect } from "react";

const SECTION_SELECTOR = "main section, footer";
const GRID_SELECTOR = ".grid";

export default function ScrollMotion() {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion || !("IntersectionObserver" in window)) return;

    const revealed = new WeakSet<Element>();
    const observed = new WeakSet<Element>();

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("motion-visible");
          revealed.add(entry.target);
          revealObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -48px 0px",
      }
    );

    const staggerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const group = entry.target;
          group.classList.add("motion-stagger-visible");
          staggerObserver.unobserve(group);
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -32px 0px",
      }
    );

    const preparePage = () => {
      document.querySelectorAll(SECTION_SELECTOR).forEach((section) => {
        // Hero sudah memiliki entrance animation khusus.
        if (
          section.querySelector(".hero-animate") ||
          section.hasAttribute("data-motion-ignore")
        ) {
          return;
        }

        if (!observed.has(section) && !revealed.has(section)) {
          observed.add(section);
          section.classList.add("motion-reveal");
          revealObserver.observe(section);
        }

        // Stagger hanya untuk grid berisi beberapa kartu/kolom.
        section.querySelectorAll(GRID_SELECTOR).forEach((grid) => {
          const children = Array.from(grid.children).filter(
            (child) => child instanceof HTMLElement
          ) as HTMLElement[];

          if (children.length < 2 || children.length > 8) return;
          if (grid.hasAttribute("data-motion-ignore")) return;
          if (grid.classList.contains("motion-stagger")) return;

          grid.classList.add("motion-stagger");

          children.forEach((child, index) => {
            child.classList.add("motion-stagger-item");
            child.style.setProperty(
              "--motion-stagger-delay",
              `${Math.min(index, 6) * 90}ms`
            );
          });

          if (!observed.has(grid)) {
            observed.add(grid);
            staggerObserver.observe(grid);
          }
        });
      });
    };

    preparePage();

    // Menangani navigasi Next.js tanpa full page reload.
    const mutationObserver = new MutationObserver(() => {
      preparePage();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      mutationObserver.disconnect();
      revealObserver.disconnect();
      staggerObserver.disconnect();
    };
  }, []);

  return null;
}
