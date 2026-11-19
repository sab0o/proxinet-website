"use client";

import Image from "next/image";
import Link from "next/link";

const productLinks = [
  { label: "Proxinet Home", href: "/produk" },
  { label: "Proxinet Mitra", href: "/produk#mitra" },
  {
    label: "Proxinet Business & Education",
    href: "/produk#business",
  },
];

const informationLinks = [
  { label: "Pusat Kontak", href: "/pusat-kontak" },
  { label: "Bantuan", href: "/bantuan" },
  { label: "Lokasi", href: "/lokasi" },
];

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M13.4 21v-8h2.7l.4-3.1h-3.1V8c0-.9.3-1.5 1.6-1.5h1.7V3.7c-.3 0-1.4-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.2v3.1H10v8h3.4Z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.7" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "X",
    href: "https://x.com/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-5-7.5L5.4 22H2.2l7.3-8.4L1.8 2h6.5l4.5 6.9L18.9 2Zm-1.1 18h1.7L7.3 3.9H5.5L17.8 20Z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.2 7a3 3 0 0 0-2.1-2.1C19.2 4.4 12 4.4 12 4.4s-7.2 0-9.1.5A3 3 0 0 0 .8 7 31 31 0 0 0 .3 12a31 31 0 0 0 .5 5 3 3 0 0 0 2.1 2.1c1.9.5 9.1.5 9.1.5s7.2 0 9.1-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-5 31 31 0 0 0-.5-5ZM9.5 15.7V8.3l6.2 3.7-6.2 3.7Z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#1B2858] text-white">
      <div className="mx-auto max-w-[1440px] px-6 pb-12 pt-12 sm:px-10 sm:pb-14 sm:pt-16 lg:px-16">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-[minmax(0,1fr)_140px_140px] md:gap-x-12">
          {/* BRAND DAN MEDIA SOSIAL */}
          <div className="col-span-2 md:col-span-1">
            <h2 className="max-w-md text-lg font-semibold leading-snug tracking-tight sm:text-xl">
              Dapatkan Jaringan Fiber Optik
              <br />
              Internet Cepat Hanya di PROXINET
            </h2>

            <Link
              href="/"
              aria-label="PROXINET - Beranda"
              className="mt-5 inline-flex"
            >
              <Image
                src="/images/logo-proxinet.png"
                alt="PROXINET Connecting The World"
                width={180}
                height={55}
                className="h-auto w-[145px] object-contain object-left sm:w-[165px]"
              />
            </Link>

            <div className="mt-12">
              <p className="text-xs font-medium text-white/90">
                Tetap terhubung dengan kami
              </p>

              <div className="mt-3 flex items-center gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Kunjungi PROXINET di ${social.name}`}
                    title={social.name}
                    className="flex size-5 items-center justify-center text-white/90 transition-colors hover:text-blue-300"
                  >
                    <span className="size-[17px]">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* TAUTAN PRODUK */}
          <div>
            <h3 className="text-lg font-bold sm:text-xl">Produk</h3>
            <ul className="mt-3 space-y-2">
              {productLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-xs leading-relaxed text-white/75 transition-colors hover:text-white sm:text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* TAUTAN INFORMASI */}
          <div>
            <h3 className="text-lg font-bold sm:text-xl">Informasi</h3>
            <ul className="mt-3 space-y-2">
              {informationLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-xs text-white/75 transition-colors hover:text-white sm:text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* COPYRIGHT DAN KEBIJAKAN */}
      <div className="border-t border-white/20">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-6 py-5 text-[10px] text-white/75 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-16">
          <p>Copyright © {new Date().getFullYear()} PROXINET</p>

          <div className="flex flex-wrap items-center gap-2 font-medium">
            <Link
              href="/kebijakan-privasi"
              className="transition-colors hover:text-white"
            >
              Kebijakan Privasi
            </Link>

            <span aria-hidden="true">|</span>

            <Link
              href="/syarat-ketentuan"
              className="transition-colors hover:text-white"
            >
              Syarat &amp; Ketentuan
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}