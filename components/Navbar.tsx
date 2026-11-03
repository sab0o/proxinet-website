
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

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

        {/* TOMBOL PENCARIAN */}
        <div className="flex items-center gap-2">      
            <Link
            href="/produk"
            aria-label="Cari produk"
            className={`hidden rounded-full p-2 transition-colors duration-300 sm:inline-flex ${
                transparent
                ? "!text-white hover:!bg-white/10"
                : "!text-slate-800 hover:!bg-slate-100"
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
            </Link>
            
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
