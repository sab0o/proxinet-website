"use client";

import { useEffect } from "react";

const MOTION_ROOT_SELECTOR = "main section, main > div, footer";
const GRID_SELECTOR = ".grid";
const MOTION_EASING = "ease-out";
const STAGGER_INTERVAL = 130;

function prepareEntranceAnimation(
  element: Element,
  delay = 0,
  distance = 28,
  duration = 800
): Animation | null {
  if (typeof element.animate !== "function") return null;

  // Animasi disiapkan dalam keadaan pause agar elemen sudah berada
  // sedikit di bawah posisi akhirnya, tanpa dibuat transparan.
  const animation = element.animate(
    [
      { transform: `translate3d(0, ${distance}px, 0)` },
      { transform: "translate3d(0, 0, 0)" },
    ],
    {
      duration,
      delay,
      easing: MOTION_EASING,
      fill: "both",
    }
  );

  animation.pause();
  animation.currentTime = 0;
  animation.onfinish = () => animation.cancel();

  return animation;
}

export default function ScrollMotion() {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion || !("IntersectionObserver" in window)) return;

    const observedRoots = new WeakSet<Element>();
    const observedGrids = new WeakSet<Element>();
    const entranceAnimations = new WeakMap<Element, Animation>();

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entranceAnimations.get(entry.target)?.play();
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

          items.forEach((item) => {
            entranceAnimations.get(item)?.play();
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

          const containsGrid = Boolean(
            root.querySelector(".grid:not([data-motion-ignore])")
          );
          const rootAnimation = prepareEntranceAnimation(
            root,
            0,
            containsGrid ? 0 : 28,
            800
          );

          if (rootAnimation) {
            entranceAnimations.set(root, rootAnimation);
          }

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

          children.forEach((item, index) => {
            const itemAnimation = prepareEntranceAnimation(
              item,
              Math.min(index, 6) * STAGGER_INTERVAL,
              22,
              800
            );

            if (itemAnimation) {
              entranceAnimations.set(item, itemAnimation);
            }
          });

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
