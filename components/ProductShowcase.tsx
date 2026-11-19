
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";

const products = [
  {
    title: "Proxinet Home",
    image: "/images/product-home.png",
    shortDescription:
      "Internet cepat dan stabil untuk kebutuhan digital di rumah.",
    detail: (
      <>
        Nikmati internet cepat dan stabil untuk semua aktivitas di rumah
        bersama <strong>Proxinet Home</strong>. Mulai dari streaming,
        belajar, bekerja, hingga bermain game, semua jadi lebih nyaman
        bersama PROXINET!
      </>
    ),
    action: "Beli Sekarang",
    href: "/lokasi",
    price: "Mulai dari Rp 150.000/bulan",
  },
  {
    title: "Proxinet Business & Education",
    image: "/images/product-business.png",
    shortDescription:
      "Internet andal untuk mendukung kebutuhan bisnis dan pendidikan.",
    detail: (
      <>
        Dukung produktivitas bisnis dan kegiatan belajar dengan koneksi
        internet yang andal bersama{" "}
        <strong>Proxinet Business & Education</strong>. PROXINET hadir
        untuk mendukung kebutuhan perusahaan, sekolah, kampus, dan
        instansi agar aktivitas digital berjalan lebih lancar!
      </>
    ),
    action: "Konsultasi Sekarang",
    href: "/pusat-kontak",
    price: "Hubungi Kami",
  },
  {
    title: "Proxinet Mitra",
    image: "/images/product-mitra.png",
    shortDescription:
      "Kembangkan peluang bisnis bersama PROXINET melalui kemitraan internet.",
    detail: (
      <>
        Kembangkan peluang bisnis bersama PROXINET melalui solusi{" "}
        <strong>Proxinet Mitra</strong> untuk kebutuhan kemitraan dan
        reseller. Bangun kerja sama, perluas jangkauan layanan, dan tumbuh
        bersama PROXINET!
      </>
    ),
    action: "Konsultasi Sekarang",
    href: "/pusat-kontak",
    price: "Konsultasi Sekarang",
  },
];

const statistics = [
  { value: 10, label: "Provinsi" },
  { value: 26, label: "Kota/Kabupaten" },
  { value: 2150, label: "Kelurahan" },
  { value: 132, label: "Mitra" },
];

function CountUp({
  end,
  duration = 2000,
}: {
  end: number;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let animationFrame = 0;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;

      const progress = Math.min(
        (timestamp - startTime) / duration,
        1
      );

      // Efek perlambatan menjelang angka akhir
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setCount(Math.floor(easedProgress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, end, duration]);

  return (
    <p
      ref={elementRef}
      className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
    >
      {count.toLocaleString("en-US")}
    </p>
  );
}

export default function ProductShowcase() {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    );

    const updateHover = () => setCanHover(mediaQuery.matches);

    updateHover();
    mediaQuery.addEventListener("change", updateHover);

    return () => {
      mediaQuery.removeEventListener("change", updateHover);
    };
  }, []);

  return (
    <section className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* STATISTIK */}
        <div className="mx-auto mb-12 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 sm:gap-8">
            {statistics.map((stat) => (
                <div key={stat.label} className="text-center">
                    <CountUp end={stat.value} duration={2000} />

                    <p className="mt-1 text-sm font-medium text-blue-600 sm:text-base">
                        {stat.label}
                    </p>
                </div>
            ))}
        </div>


        {/* JUDUL */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Produk Kami
          </h2>
          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            Temukan Layanan yang Tepat untuk Kebutuhanmu
          </p>
        </div>

        {/* FLIP CARDS */}
        <div className="grid items-stretch gap-6 md:grid-cols-3 lg:gap-7">
          {products.map((product, index) => {
            const isActive = activeCard === index;

            return (
              <div
                key={product.title}
                className="group h-[390px] [perspective:1200px] sm:h-[410px]"
                onMouseEnter={() => {
                  if (canHover) setActiveCard(index);
                }}
                onMouseLeave={() => {
                  if (canHover) {
                    setActiveCard((current) =>
                      current === index ? null : current
                    );
                  }
                }}
              >
                <div
                  className={`relative h-full w-full rounded-2xl transition-transform duration-700 [transform-style:preserve-3d] ${
                    isActive ? "[transform:rotateY(180deg)]" : ""
                  }`}
                >
                  {/* SISI DEPAN */}
                  <button
                    type="button"
                    aria-label={`Balik kartu ${product.title}`}
                    aria-pressed={isActive}
                    onClick={() => {
                      if (!canHover) {
                        setActiveCard(isActive ? null : index);
                      }
                    }}
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 text-left shadow-sm [backface-visibility:hidden] focus-visible:outline-2 focus-visible:outline-blue-600"
                  >
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      sizes="(max-width: 767px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />

                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                      <h3 className="text-lg font-bold leading-snug text-white">
                        {product.title}
                      </h3>

                      <p className="mt-1 text-sm leading-5 text-white/90">
                        {product.shortDescription}
                      </p>

                      <p className="mt-5 text-sm font-semibold text-white">
                        {product.price}
                      </p>

                      <p className="mt-4 text-xs text-white/70 md:hidden">
                        Ketuk untuk melihat detail <ArrowUpRight aria-hidden="true" className="inline size-3.5" />
                      </p>
                    </div>
                  </button>

                  {/* SISI BELAKANG */}
                  <div
                    aria-hidden={!isActive}
                    className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl bg-[#2F5CF4] p-5 text-white shadow-lg shadow-blue-900/15 [backface-visibility:hidden] [transform:rotateY(180deg)] sm:p-6"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-100">
                      {product.title}
                    </p>

                    <div className="mt-5 flex-1 overflow-y-auto">
                      <p className="text-sm leading-7 text-white/95">
                        {product.detail}
                      </p>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                      <Link
                        href={product.href}
                        tabIndex={isActive ? 0 : -1}
                        className="inline-flex min-h-10 items-center gap-3 rounded-xl border border-white/60 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      >
                        {product.action}
                        <ChevronRight aria-hidden="true" className="size-4" strokeWidth={2} />
                      </Link>

                      {!canHover && (
                        <button
                          type="button"
                          onClick={() => setActiveCard(null)}
                          className="rounded-lg px-2 py-2 text-sm text-white/90 hover:bg-white/10"
                        >
                          Kembali
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
