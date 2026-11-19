
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

const promos = [
  {
    image: "/images/promo1.png",
    button: "Lihat Paket",
    href: "/produk",
  },
  {
    image: "/images/promo2.png",
    button: "Lihat Layanan",
    href: "/produk/business-education",
  },
  {
    image: "/images/promo2.png",
    button: "Jadi Mitra",
    href: "/produk/mitra",
  },
];

export default function PromoShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);

  function goTo(index: number) {
    setActiveIndex((index + promos.length) % promos.length);
  }

  return (
    <section className="overflow-hidden bg-white px-4 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-7xl">
        {/* JUDUL SECTION */}
        <div className="mb-8 text-center">
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Penawaran untuk Kamu
          </h2>
        </div>

        {/* CAROUSEL PROMO */}
        <div className="relative mx-auto h-[280px] max-w-5xl sm:h-[380px] md:h-[440px]">
          {promos.map((promo, index) => {
            const offset =
              (index - activeIndex + promos.length) % promos.length;

            const position =
              offset === 0 ? 0 : offset === 1 ? 1 : -1;

            const isActive = offset === 0;

            return (
              <article
                key={promo.image + index}
                aria-hidden={!isActive}
                className="absolute left-1/2 top-1/2 w-[88%] sm:w-[82%] md:w-[76%]"
                style={{
                  transform: `translate(-50%, -50%) translateX(${
                    position * 31
                  }%) scale(${isActive ? 1 : 0.82})`,
                  zIndex: isActive ? 30 : 20,
                  opacity: isActive ? 1 : 0.65,
                  filter: isActive ? "none" : "brightness(0.7)",
                  transition:
                    "transform 500ms ease, opacity 500ms ease, filter 500ms ease",
                  pointerEvents: isActive ? "auto" : "none",
                }}
              >
                <div className="relative aspect-video overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-[0_12px_40px_rgba(37,99,235,0.18)] sm:rounded-3xl">
                  <Image
                    src={promo.image}
                    alt=""
                    fill
                    priority={isActive}
                    sizes="(max-width: 768px) 88vw, 800px"
                    className="object-cover"
                  />

                  {/* OVERLAY TIPIS AGAR TOMBOL TERLIHAT JELAS */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent"
                  />

                  {/* TOMBOL PROMO */}
                  <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8">
                    <Link
                      href={promo.href}
                      tabIndex={isActive ? 0 : -1}
                      className="inline-flex min-h-10 items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-xs font-bold !text-white shadow-lg transition-colors hover:bg-blue-700 hover:!text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:px-5 sm:text-sm"
                    >
                      <span className="text-white">
                        {promo.button}
                      </span>

                      <ArrowRight aria-hidden="true" className="size-4 text-white" strokeWidth={2.2} />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}

          {/* PANAH KIRI */}
          <button
            type="button"
            aria-label="Promo sebelumnya"
            onClick={() => goTo(activeIndex - 1)}
            className="absolute left-0 top-1/2 z-40 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-blue-600 shadow-lg transition hover:scale-105 hover:bg-blue-50 sm:left-2 sm:size-12"
          >
            <ArrowLeft aria-hidden="true" size={23} strokeWidth={2} />
          </button>

          {/* PANAH KANAN */}
          <button
            type="button"
            aria-label="Promo berikutnya"
            onClick={() => goTo(activeIndex + 1)}
            className="absolute right-0 top-1/2 z-40 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-blue-600 shadow-lg transition hover:scale-105 hover:bg-blue-50 sm:right-2 sm:size-12"
          >
            <ArrowRight aria-hidden="true" size={23} strokeWidth={2} />
          </button>
        </div>

        {/* INDIKATOR SLIDE */}
        <div className="mt-5 flex items-center justify-center gap-2">
          {promos.map((promo, index) => (
            <button
              key={promo.image + index}
              type="button"
              aria-label={`Tampilkan promo ${index + 1}`}
              aria-current={activeIndex === index ? "true" : undefined}
              onClick={() => goTo(index)}
              className={`size-2.5 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "bg-blue-600"
                  : "bg-slate-200 hover:bg-blue-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
