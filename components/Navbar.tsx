"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Beranda", href: "/" },
  { label: "Produk", href: "/produk" },
  { label: "Lokasi", href: "/lokasi" },
  { label: "Bantuan", href: "/bantuan" },
  { label: "Pusat Kontak", href: "/pusat-kontak" },
];

const searchIndex = [
  {
    title: "PROXINET Home",
    category: "Produk",
    description: "Internet cepat dan stabil untuk kebutuhan rumah.",
    keywords: "home rumah internet wifi paket streaming",
    href: "/produk",
  },
  {
    title: "PROXINET Business & Education",
    category: "Produk",
    description: "Solusi internet untuk bisnis dan pendidikan.",
    keywords: "business education bisnis perusahaan sekolah kampus",
    href: "/produk",
  },
  {
    title: "PROXINET Mitra",
    category: "Produk",
    description: "Peluang kerja sama dan kemitraan bersama PROXINET.",
    keywords: "mitra reseller partnership kerjasama",
    href: "/produk",
  },
  {
    title: "Cek Lokasi dan Cakupan Jaringan",
    category: "Lokasi",
    description: "Temukan kantor dan wilayah layanan PROXINET.",
    keywords: "lokasi coverage cakupan jaringan wilayah area",
    href: "/lokasi",
  },
  {
    title: "PROXINET Head Office",
    category: "Lokasi",
    description: "Ruko Grand California, Taman Baloi, Batam Kota.",
    keywords: "kantor pusat head office batam",
    href: "/lokasi",
  },
  {
    title: "Tanjung Pinang",
    category: "Lokasi",
    description: "Jalan Katamso KM 2, Tanjung Pinang, Kepulauan Riau.",
    keywords: "tanjung pinang kepri cabang",
    href: "/lokasi",
  },
  {
    title: "Tanjung Karimun",
    category: "Lokasi",
    description: "Jalan Batu Lipai No. 80, Kabupaten Karimun.",
    keywords: "tanjung karimun meral cabang",
    href: "/lokasi",
  },
  {
    title: "Sukabumi",
    category: "Lokasi",
    description: "Jalan Sarasa No. 10, Cibeureum, Sukabumi.",
    keywords: "sukabumi jawa barat cabang",
    href: "/lokasi",
  },
  {
    title: "Jember",
    category: "Lokasi",
    description: "Ruko Pandora Square, Sumbersari, Jember.",
    keywords: "jember jawa timur cabang",
    href: "/lokasi",
  },
  {
    title: "Cara Berlangganan",
    category: "Bantuan",
    description: "Panduan langkah berlangganan layanan PROXINET.",
    keywords: "berlangganan daftar pemasangan instalasi",
    href: "/bantuan",
  },
  {
    title: "Informasi Paket Internet",
    category: "Bantuan",
    description: "Informasi pilihan paket dan layanan internet.",
    keywords: "paket harga biaya tarif internet",
    href: "/bantuan",
  },
  {
    title: "Pembayaran",
    category: "Bantuan",
    description: "Informasi mengenai pembayaran layanan PROXINET.",
    keywords: "pembayaran bayar tagihan transaksi",
    href: "/bantuan",
  },
  {
    title: "Layanan dan Gangguan",
    category: "Bantuan",
    description: "Bantuan terkait gangguan koneksi internet.",
    keywords: "gangguan internet wifi koneksi teknis lambat",
    href: "/bantuan",
  },
  {
    title: "Pusat Kontak PROXINET",
    category: "Kontak",
    description: "Hubungi tim PROXINET untuk konsultasi dan informasi.",
    keywords: "kontak customer service whatsapp email telepon",
    href: "/pusat-kontak",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchHovered, setSearchHovered] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const searchResults = searchQuery.trim()
    ? searchIndex
        .filter((item) => {
          const searchableText = [
            item.title,
            item.category,
            item.description,
            item.keywords,
          ]
            .join(" ")
            .toLowerCase();

          return searchQuery
            .toLowerCase()
            .trim()
            .split(/\s+/)
            .every((word) => searchableText.includes(word));
        })
        .slice(0, 6)
    : [];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchQuery("");
  }, [pathname]);

  const transparent = pathname === "/" && !scrolled;

  const linkClass = (href: string) => {
    const active =
      href === "/"
        ? pathname === "/"
        : pathname.startsWith(href);

    return `relative py-2 text-sm font-semibold transition-colors duration-300 ${
      transparent
        ? "text-white hover:text-blue-200"
        : active
          ? "text-blue-600"
          : "text-slate-800 hover:text-blue-600"
    }`;
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        transparent
          ? "border-transparent bg-transparent"
          : "border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-xl"
      }`}
    >
      <div className="mx-auto flex min-h-[76px] w-full max-w-[1600px] items-center justify-between gap-5 px-6 sm:px-10 lg:px-16">

        {/* LOGO */}
        <Link
          href="/"
          aria-label="PROXINET - Beranda"
          className="relative z-10 shrink-0"
        >
          <Image
            src="/images/logo-proxinet.png"
            alt="PROXINET - Connecting The World"
            width={220}
            height={65}
            priority
            className="h-auto w-[145px] sm:w-[175px] lg:w-[190px]"
          />
        </Link>

        {/* NAVIGASI DESKTOP */}
        <nav className="hidden items-center gap-6 lg:flex xl:gap-9">
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative py-2 text-sm font-semibold transition-colors duration-300 ${
                  transparent
                    ? "!text-white hover:!text-blue-200"
                    : active
                      ? "!text-blue-600"
                      : "!text-slate-800 hover:!text-blue-600"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* GLOBAL SEARCH */}
        <div
          className="relative flex items-center"
          onMouseEnter={() => setSearchHovered(true)}
          onMouseLeave={() => setSearchHovered(false)}
        >
          {/* SEARCH INPUT */}
          <div
            className={`flex h-11 flex-row-reverse items-center overflow-hidden rounded-full border transition-all duration-500 ease-in-out ${
              searchHovered
                ? `w-[min(340px,65vw)] ${
                    transparent
                      ? "border-white/40 bg-white/10"
                      : "border-blue-200 bg-white shadow-sm"
                  }`
                : "w-11 border-transparent bg-transparent"
            }`}
          >
            {/* ICON SEARCH */}
            <div
              className={`flex size-11 shrink-0 items-center justify-center ${
                transparent ? "text-white" : "text-slate-800"
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                width="23"
                height="23"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                aria-hidden="true"
              >
                <circle cx="10.8" cy="10.8" r="7.2" />
                <path d="m16 16 5 5" />
              </svg>
            </div>

            {/* INPUT */}
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Cari informasi..."
              tabIndex={searchHovered ? 0 : -1}
              className={`min-w-0 flex-1 bg-transparent pl-4 pr-1 text-sm outline-none transition-all duration-300 ${
                transparent
                  ? "text-white placeholder:text-white/60"
                  : "text-slate-800 placeholder:text-slate-400"
              } ${
                searchHovered
                  ? "opacity-100"
                  : "opacity-0"
              }`}
            />
          </div>

          {/* DROPDOWN HASIL SEARCH */}
          {searchHovered && searchQuery.trim() && (
            <div className="absolute right-0 top-full z-[60] w-[min(400px,85vw)] pt-2">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">

                <div className="border-b border-slate-100 px-5 py-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {searchResults.length > 0
                      ? "Rekomendasi Pencarian"
                      : "Hasil Pencarian"}
                  </p>
                </div>

                {searchResults.length > 0 ? (
                  <div className="max-h-[380px] overflow-y-auto p-2">
                    {searchResults.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        className="group flex gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-blue-50"
                      >
                        <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-100">
                          <svg
                            viewBox="0 0 24 24"
                            className="size-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            aria-hidden="true"
                          >
                            <circle cx="10.8" cy="10.8" r="7.2" />
                            <path d="m16 16 5 5" />
                          </svg>
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <p className="truncate text-sm font-semibold text-slate-800 group-hover:text-blue-600">
                              {item.title}
                            </p>

                            <span className="shrink-0 rounded-full bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-500">
                              {item.category}
                            </span>
                          </div>

                          <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="px-5 py-8 text-center">
                    <p className="text-sm font-semibold text-slate-700">
                      Informasi tidak ditemukan
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Coba gunakan kata kunci lainnya.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* TOMBOL MENU MOBILE */}
        <button
          type="button"
          aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          className={`rounded-xl p-2 transition-colors lg:hidden ${
            transparent
              ? "text-white hover:bg-white/10"
              : "text-slate-800 hover:bg-slate-100"
          }`}
        >
          {menuOpen ? (
            <svg
              width="25"
              height="25"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <path d="m18 6-12 12M6 6l12 12" />
            </svg>
          ) : (
            <svg
              width="25"
              height="25"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      {/* MENU MOBILE */}
      {menuOpen && (
        <nav className="border-t border-slate-200 bg-white px-5 py-4 shadow-lg lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navItems.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                    active
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
