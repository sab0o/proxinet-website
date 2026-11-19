"use client";

import { useEffect } from "react";

const MOTION_ROOT_SELECTOR = "main section, main > div, footer";
const GRID_SELECTOR = ".grid";

export default function ScrollMotion() {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion || !("IntersectionObserver" in window)) return;

    const observedRoots = new WeakSet<Element>();
    const observedGrids = new WeakSet<Element>();

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("motion-visible");
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

          entry.target.classList.add("motion-stagger-visible");
          staggerObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -32px 0px",
      }
    );

    const preparePage = () => {
      document.querySelectorAll(MOTION_ROOT_SELECTOR).forEach((root) => {
        // Hindari dekorasi, wrapper section, dan Hero yang sudah dianimasikan.
        if (
          root.hasAttribute("data-motion-ignore") ||
          root.getAttribute("aria-hidden") === "true" ||
          root.querySelector(".hero-animate") ||
          root.querySelector("section")
        ) {
          return;
        }

        if (!observedRoots.has(root)) {
          observedRoots.add(root);
          root.classList.add("motion-reveal");
          revealObserver.observe(root);
        }

        // Grid berisi 2–8 elemen diperlakukan sebagai kumpulan kartu/kolom.
        root.querySelectorAll(GRID_SELECTOR).forEach((grid) => {
          if (
            grid.hasAttribute("data-motion-ignore") ||
            observedGrids.has(grid)
          ) {
            return;
          }

          const children = Array.from(grid.children).filter(
            (child) => child instanceof HTMLElement
          ) as HTMLElement[];

          if (children.length < 2 || children.length > 8) return;

          observedGrids.add(grid);
          grid.classList.add("motion-stagger");

          children.forEach((child, index) => {
            child.classList.add("motion-stagger-item");
            child.style.setProperty(
              "--motion-stagger-delay",
              `${Math.min(index, 6) * 90}ms`
            );
          });

          staggerObserver.observe(grid);
        });
      });
    };

    preparePage();

    // Memindai konten baru saat berpindah halaman atau mengganti tab Next.js.
    const mutationObserver = new MutationObserver(preparePage);

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
