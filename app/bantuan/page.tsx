
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Cek Coverage",
    description: "Periksa ketersediaan jaringan PROXINET di lokasi kamu.",
    href: "/lokasi",
  },
  {
    number: "02",
    title: "Pilih Menu Produk",
    description: "Temukan layanan internet sesuai kebutuhanmu.",
    href: "/produk",
  },
  {
    number: "03",
    title: "Pilih Produk yang Diinginkan",
    description: "Tentukan layanan yang paling sesuai untukmu.",
    href: "/produk",
  },
  {
    number: "04",
    title: "Hubungi PROXINET via WhatsApp",
    description: "Lanjutkan proses berlangganan bersama tim PROXINET.",
    href: "/pusat-kontak",
  },
];

const categories = [
  "Semua",
  "Paket Internet",
  "Pemasangan",
  "Pembayaran",
  "Layanan dan Gangguan",
];

const faqs = [
  {
    category: "Paket Internet",
    question: "Bagaimana cara memilih paket internet PROXINET?",
    answer:
      "Kamu dapat melihat pilihan layanan melalui halaman Produk. Pilih PROXINET Home untuk kebutuhan internet rumah, Business & Education untuk kebutuhan bisnis dan pendidikan, atau PROXINET Mitra untuk informasi kemitraan. Pastikan juga untuk mengecek ketersediaan jaringan di lokasimu sebelum melanjutkan.",
  },
  {
    category: "Paket Internet",
    question: "Bagaimana cara mengetahui harga paket internet?",
    answer:
      "Informasi harga paket PROXINET Home dapat dilihat melalui halaman Produk. Untuk layanan Business & Education dan PROXINET Mitra, kamu dapat menghubungi tim PROXINET agar mendapatkan informasi sesuai kebutuhan.",
  },
  {
    category: "Paket Internet",
    question: "Apakah paket internet tersedia di semua wilayah?",
    answer:
      "Ketersediaan layanan bergantung pada jangkauan jaringan PROXINET di setiap wilayah. Kamu dapat memeriksa area layanan melalui halaman Lokasi atau menghubungi tim PROXINET untuk informasi lebih lanjut.",
  },
  {
    category: "Pemasangan",
    question: "Bagaimana cara berlangganan PROXINET?",
    answer:
      "Proses berlangganan dimulai dengan memeriksa cakupan jaringan, memilih produk yang diinginkan, kemudian menghubungi tim PROXINET melalui WhatsApp untuk melanjutkan proses pendaftaran dan pemasangan.",
  },
  {
    category: "Pemasangan",
    question: "Bagaimana cara mengecek ketersediaan layanan di lokasi saya?",
    answer:
      "Buka halaman Lokasi pada website PROXINET, kemudian ikuti petunjuk pengecekan area layanan. Jika membutuhkan bantuan, kamu juga dapat menghubungi tim PROXINET.",
  },
  {
    category: "Pemasangan",
    question: "Bagaimana cara mengetahui status pemasangan?",
    answer:
      "Untuk mengetahui perkembangan proses pemasangan, silakan hubungi tim PROXINET melalui kanal kontak yang tersedia. Sampaikan informasi pendaftaran agar tim dapat membantu melakukan pengecekan.",
  },
  {
    category: "Pembayaran",
    question: "Berapa biaya berlangganan internet PROXINET?",
    answer:
      "Biaya berlangganan menyesuaikan paket layanan yang dipilih. Kamu dapat melihat informasi harga pada halaman Produk atau menghubungi tim PROXINET untuk memperoleh rincian biaya.",
  },
  {
    category: "Pembayaran",
    question: "Bagaimana cara melakukan pembayaran?",
    answer:
      "Informasi metode dan prosedur pembayaran dapat dikonfirmasi melalui tim PROXINET. Silakan gunakan kanal kontak resmi untuk mendapatkan petunjuk pembayaran yang sesuai dengan layananmu.",
  },
  {
    category: "Layanan dan Gangguan",
    question: "Bagaimana cara menghubungi customer service?",
    answer:
      "Kamu dapat mengunjungi halaman Pusat Kontak untuk menemukan kanal komunikasi PROXINET. Sampaikan kebutuhan atau kendala yang dialami agar tim dapat membantu.",
  },
  {
    category: "Layanan dan Gangguan",
    question: "Apa yang harus dilakukan jika koneksi internet mengalami gangguan?",
    answer:
      "Periksa terlebih dahulu kondisi perangkat dan koneksi internet di rumah atau tempatmu. Jika gangguan masih terjadi, hubungi tim PROXINET melalui Pusat Kontak dan jelaskan kendala yang dialami agar dapat ditindaklanjuti.",
  },
  {
    category: "Layanan dan Gangguan",
    question: "Bagaimana cara mendapatkan bantuan teknis?",
    answer:
      "Untuk mendapatkan bantuan teknis, silakan hubungi tim PROXINET melalui halaman Pusat Kontak. Sertakan informasi mengenai gangguan yang terjadi agar tim dapat memberikan arahan lebih lanjut.",
  },
];

export default function BantuanPage() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaqs, setOpenFaqs] = useState<number[]>([]);

  // FILTER FAQ BERDASARKAN KATEGORI DAN PENCARIAN
  const filteredFaqs = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return faqs.filter((faq) => {
      const matchesCategory =
        activeCategory === "Semua" ||
        faq.category === activeCategory;

      const matchesSearch =
        !query ||
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query) ||
        faq.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // INDEX FAQ YANG SEDANG DITAMPILKAN
  const visibleFaqIndexes = filteredFaqs.map((faq) =>
    faqs.indexOf(faq)
  );

  // CEK APAKAH SEMUA FAQ YANG DITAMPILKAN SUDAH TERBUKA
  const isAllOpen =
    visibleFaqIndexes.length > 0 &&
    visibleFaqIndexes.every((index) => openFaqs.includes(index));

  // BUKA ATAU TUTUP SEMUA FAQ YANG SEDANG DITAMPILKAN
  function toggleAllFaqs() {
    if (isAllOpen) {
      setOpenFaqs((prev) =>
        prev.filter((index) => !visibleFaqIndexes.includes(index))
      );
    } else {
      setOpenFaqs((prev) =>
        Array.from(new Set([...prev, ...visibleFaqIndexes]))
      );
    }
  }

  // GANTI KATEGORI
  function handleCategoryChange(category: string) {
    setActiveCategory(category);
    setOpenFaqs([]);
  }

  // PENCARIAN FAQ
  function handleSearch(value: string) {
    setSearchQuery(value);
    setOpenFaqs([]);
  }

  // RESET PENCARIAN DAN KATEGORI
  function resetFilters() {
    setSearchQuery("");
    setActiveCategory("Semua");
    setOpenFaqs([]);
  }

  // BUKA ATAU TUTUP SATU FAQ
  function toggleFaq(index: number) {
    setOpenFaqs((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    );
  }

  return (
    <div className="min-h-screen bg-white">

      {/* ==========================================
          SECTION 1: CARA BERLANGGANAN
      ========================================== */}
      <section className="bg-[#F8FAFC] px-5 pb-14 pt-20 sm:px-8 sm:pb-16 sm:pt-36">
        <div className="mx-auto max-w-6xl">

          {/* JUDUL SECTION */}
          <div className="mb-12 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Cara Berlangganan
            </h1>

            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Ikuti langkah mudah untuk mulai menggunakan layanan PROXINET.
            </p>
          </div>

          {/* TIMELINE DESKTOP */}
          <div className="relative hidden md:block">

            {/* GARIS PENGHUBUNG */}
            <div className="absolute left-[12.5%] right-[12.5%] top-5 h-px bg-slate-200" />

            <div className="grid grid-cols-4 gap-4">
              {steps.map((step) => (
                <Link
                  key={step.number}
                  href={step.href}
                  className="group relative flex flex-col items-center text-center"
                >
                  {/* NOMOR LANGKAH */}
                  <span className="relative z-10 flex size-10 items-center justify-center rounded-full border border-slate-200 bg-white text-xs font-bold text-slate-500 transition-all duration-300 group-hover:scale-110 group-hover:border-blue-600 group-hover:bg-blue-600 group-hover:text-white">
                    {step.number}
                  </span>

                  {/* JUDUL LANGKAH */}
                  <h3 className="mt-4 text-sm font-semibold text-slate-800 transition-colors duration-300 group-hover:text-blue-600">
                    {step.title}
                  </h3>

                  {/* DESKRIPSI LANGKAH */}
                  <p className="mt-1 max-w-[190px] text-xs leading-5 text-slate-500">
                    {step.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* TIMELINE MOBILE */}
          <div className="relative space-y-5 md:hidden">

            {/* GARIS PENGHUBUNG */}
            <div className="absolute bottom-7 left-5 top-7 w-px bg-slate-200" />

            {steps.map((step) => (
              <Link
                href={step.href}
                key={step.number}
                className="group relative flex items-start gap-4"
              >
                {/* NOMOR LANGKAH */}
                <span className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-xs font-bold text-slate-500 transition-all duration-300 group-hover:border-blue-600 group-hover:bg-blue-600 group-hover:text-white">
                  {step.number}
                </span>

                {/* INFORMASI LANGKAH */}
                <div className="pt-1">
                  <h3 className="text-sm font-semibold text-slate-800 transition-colors duration-300 group-hover:text-blue-600">
                    {step.title}
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {step.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 2: PERTANYAAN UMUM / FAQ
      ========================================== */}
      <section className="px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-5xl">

          {/* JUDUL SECTION */}
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Ada yang Bisa Kami Bantu?
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Temukan jawaban dan panduan untuk menggunakan layanan PROXINET.
            </p>
          </div>

          {/* KOLOM PENCARIAN */}
          <div className="relative mt-8">
            <svg
              className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m16 16 4 4" />
            </svg>

            <input
              type="search"
              value={searchQuery}
              onChange={(event) => handleSearch(event.target.value)}
              placeholder="Cari pertanyaan atau topik bantuan..."
              aria-label="Cari pertanyaan bantuan"
              className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            />
          </div>

          {/* FILTER KATEGORI */}
          <div className="mt-5 flex gap-2 overflow-x-auto border-b border-slate-200 pb-3">
            {categories.map((category) => {
              const isActive = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategoryChange(category)}
                  className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition sm:text-sm ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* JUMLAH PERTANYAAN DAN TOMBOL BUKA/TUTUP */}
          <div className="flex items-center justify-between gap-3 py-4">
            <p className="text-xs text-slate-500">
              {filteredFaqs.length} pertanyaan ditemukan
            </p>

            <button
              type="button"
              onClick={toggleAllFaqs}
              disabled={filteredFaqs.length === 0}
              className="shrink-0 text-xs font-semibold text-blue-600 transition-colors hover:text-blue-800 disabled:cursor-not-allowed disabled:text-slate-400 sm:text-sm"
            >
              {isAllOpen
                ? "Tutup Semua Jawaban"
                : "Buka Semua Jawaban"}
            </button>
          </div>

          {/* DAFTAR FAQ */}
          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => {
                const originalIndex = faqs.indexOf(faq);
                const isOpen = openFaqs.includes(originalIndex);

                return (
                  <div key={faq.question}>

                    {/* PERTANYAAN */}
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => toggleFaq(originalIndex)}
                      className="flex w-full items-center justify-between gap-4 py-5 text-left"
                    >
                      <span className="text-sm font-semibold text-slate-800 transition-colors hover:text-blue-600 sm:text-[15px]">
                        {faq.question}
                      </span>

                      {/* ICON ACCORDION */}
                      <span
                        className={`flex size-6 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                          isOpen
                            ? "rotate-180 bg-blue-50 text-blue-600"
                            : "text-slate-400"
                        }`}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className="size-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          aria-hidden="true"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </span>
                    </button>

                    {/* JAWABAN */}
                    {isOpen && (
                      <div className="pb-5 pr-8">
                        <p className="text-sm leading-7 text-slate-600">
                          {faq.answer}
                        </p>

                        <span className="mt-3 inline-block rounded-full bg-blue-50 px-3 py-1 text-[11px] font-medium text-blue-600">
                          {faq.category}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              /* KONDISI JIKA PERTANYAAN TIDAK DITEMUKAN */
              <div className="py-14 text-center">
                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-slate-100">
                  <svg
                    viewBox="0 0 24 24"
                    className="size-5 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    aria-hidden="true"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path d="m16 16 4 4" />
                  </svg>
                </div>

                <h3 className="mt-4 text-sm font-semibold text-slate-800">
                  Pertanyaan tidak ditemukan
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Coba gunakan kata kunci lain atau pilih kategori berbeda.
                </p>

                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-4 text-xs font-semibold text-blue-600 transition hover:text-blue-800"
                >
                  Reset pencarian
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      
        {/* ==========================================
            SECTION 3: BUTUH BANTUAN
        ========================================== */}
        <section className="bg-[#F8FAFC] px-5 py-12 sm:py-14">
        <div className="mx-auto max-w-5xl text-center">

            {/* JUDUL */}
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Butuh Bantuan?
            </h2>

            {/* DESKRIPSI */}
            <p className="mt-1 text-sm text-slate-600 sm:text-base">
            Hubungi tim PROXINET untuk mendapatkan informasi lebih lanjut.
            </p>

            {/* BUTTON */}
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">

            {/* HUBUNGI CUSTOMER SERVICE */}
            <Link
                href="/pusat-kontak"
                className="inline-flex min-h-11 w-full items-center justify-center gap-3 rounded-full bg-[#315CF5] px-5 py-3 text-sm font-medium !text-white transition-all duration-300 hover:bg-[#244BD8] sm:w-auto"
            >
                {/* ICON CHAT */}
                <svg
                viewBox="0 0 24 24"
                className="size-6 shrink-0 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                >
                <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z" />
                </svg>

                <span>Hubungi Customer Service</span>
            </Link>

            {/* LIHAT PUSAT KONTAK */}
            <Link
                href="/pusat-kontak"
                className="inline-flex min-h-11 w-full items-center justify-center gap-3 rounded-full border border-slate-300 bg-[#F1F3F6] px-5 py-3 text-sm font-medium text-slate-700 transition-all duration-300 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 sm:w-auto"
            >
                {/* ICON TELEPON */}
                <svg
                viewBox="0 0 24 24"
                className="size-6 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.35 1.9.68 2.8a2 2 0 0 1-.45 2.11L8.07 9.93a16 16 0 0 0 6 6l1.3-1.27a2 2 0 0 1 2.11-.45c.9.33 1.84.56 2.8.68a2 2 0 0 1 1.72 2.03Z" />
                </svg>

                <span>Lihat Pusat Kontak</span>
            </Link>
            </div>

            {/* INFORMASI LAYANAN */}
            <p className="mt-6 text-xs leading-6 text-slate-500 sm:text-sm">
            Saluran bantuan resmi PROXINET beroperasi setiap hari untuk melayani
            konsultasi dan dukungan teknis.
            </p>

        </div>
        </section>
    </div>
  );
}
