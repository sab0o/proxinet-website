"use client";

import { useEffect } from "react";

const MOTION_ROOT_SELECTOR = "main section, main > div, footer";
const GRID_SELECTOR = ".grid";
const MOTION_EASING = "ease-out";

function playEntranceAnimation(
  element: Element,
  delay = 0,
  distance = 22,
  duration = 760
) {
  if (typeof element.animate !== "function") return;

  const animation = element.animate(
    [
      {
        opacity: 0,
        transform: `translate3d(0, ${distance}px, 0)`,
      },
      {
        opacity: 1,
        transform: "translate3d(0, 0, 0)",
      },
    ],
    {
      duration,
      delay,
      easing: MOTION_EASING,
      fill: "both",
    }
  );

  // Bersihkan animasi setelah selesai supaya hover/flip tetap berjalan normal.
  animation.onfinish = () => animation.cancel();
}

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

          // Jika section memiliki grid kartu, section cukup fade;
          // kartu-kartunya mendapat gerakan stagger tersendiri.
          const containsStaggerGrid = Boolean(
            entry.target.querySelector(".grid:not([data-motion-ignore])")
          );

          playEntranceAnimation(
            entry.target,
            0,
            containsStaggerGrid ? 0 : 28,
            containsStaggerGrid ? 900 : 1100
          );

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

          const items = Array.from(entry.target.children).filter(
            (child) => child instanceof HTMLElement
          );

          items.forEach((item, index) => {
            playEntranceAnimation(
              item,
              Math.min(index, 6) * 130,
              22,
              1000
            );
          });

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
          );

          if (children.length < 2 || children.length > 8) return;

          observedGrids.add(grid);
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
