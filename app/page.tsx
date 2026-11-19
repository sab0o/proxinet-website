
import Link from "next/link";
import ProductShowcase from "@/components/ProductShowcase";
import PromoShowcase from "@/components/PromoShowcase";
import CertificateShowcase from "@/components/CertificateShowcase";
import NetworkPartnerShowcase from "@/components/NetworkPartnerShowcase";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-[#07142e] text-white">
        {/* Video background */}
        <video
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source src="/videos/hero-proxinet.mp4" type="video/mp4" />
        </video>

        {/* Overlay agar teks tetap terbaca */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-r from-[#07142e]/95 via-[#07142e]/70 to-[#07142e]/30"
        />

        {/* Konten hero */}
        <div className="mx-auto w-full max-w-7xl px-6 pb-16 pt-28 sm:px-8 lg:px-10">
          <div className="max-w-5xl">
            <p className="hero-animate hero-tagline mb-6 text-sm font-bold tracking-[0.2em] text-blue-200 sm:text-base">
              #CONNECTINGTHEWORLD
            </p>

            <h1 className="hero-animate hero-heading text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl md:text-6xl xl:text-7xl">
              <span className="block">Koneksi Tanpa Batas,</span>
              <span className="mt-2 block text-blue-300">
                Melesat Lebih Jauh.
              </span>
            </h1>

            <p className="hero-animate hero-description mt-7 max-w-3xl text-base leading-8 text-slate-200 sm:text-lg">
              Solusi teknologi andal untuk membantu Anda berkembang lebih
              cepat, bekerja lebih cerdas, dan melangkah lebih jauh bersama
              PROXINET.
            </p>

            <div className="mt-9">
              <Link
                href="/lokasi"
                className="hero-button inline-flex min-h-14 items-center gap-3 rounded-full bg-blue-600 px-7 py-4 font-semibold text-white transition-colors hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Temui Proxinet di Area Anda
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <p className="hero-animate hero-supporting-text mt-6 flex items-center gap-3 text-sm text-slate-300">
              Mulai dengan memeriksa ketersediaan jaringan di area kamu.
            </p>
          </div>
        </div>
      </section>

      {/* PRODUK */}
      <ProductShowcase />
      
      {/* PROMO */}
      <PromoShowcase />

      {/* SERTIFIKAT */}
      <CertificateShowcase />

      <NetworkPartnerShowcase />
    </>
  );
}
