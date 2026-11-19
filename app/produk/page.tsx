
"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Check, Files, Headset, ListChecks, MessageSquare, Move, RadioTower, RotateCcw, Wrench } from "lucide-react";

type ProductTab = "home" | "business" | "mitra";

const WHATSAPP_NUMBER = "628117041659";

const BUSINESS_LABELS = [
  { label: "Kampus", x: 3, y: 6 },
  { label: "Perusahaan", x: 52, y: 6 },
  { label: "Sekolah", x: 31, y: 30 },
  { label: "Institusi", x: 57, y: 56 },
  { label: "Kantor", x: 8, y: 66 },
  { label: "Organisasi", x: 36, y: 81 },
] as const;

type BusinessLabelPosition = { x: number; y: number };

type ActiveLabelDrag = {
  label: string;
  pointerId: number;
  startPointerX: number;
  startPointerY: number;
  startX: number;
  startY: number;
};

function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function WhatsAppButton({
  message,
  children,
  variant = "primary",
}: {
  message: string;
  children: React.ReactNode;
  variant?: "primary" | "dark" | "outline";
}) {
  const styles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    dark: "bg-slate-950 text-white hover:bg-blue-600",
    outline:
      "border border-slate-300 bg-white text-slate-700 hover:border-blue-500 hover:text-blue-600",
  };

  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200 ${styles[variant]}`}
    >
      {children}
      <ArrowUpRight aria-hidden="true" size={16} strokeWidth={2.2} />
    </a>
  );
}

const tabs: { id: ProductTab; label: string }[] = [
  { id: "home", label: "Proxinet Home" },
  { id: "business", label: "Proxinet Business & Education" },
  { id: "mitra", label: "Proxinet Mitra" },
];

const homePackages = [
  {
    name: "Basic",
    speed: "10",
    price: "150.000",
    oldPrice: "175.000",
    saving: "30.000",
    label: "Paling Hemat",
    description: "Ideal untuk kebutuhan internet harian.",
    features: [
      "Kecepatan Download dan Upload sampai 10 Mbps",
      "Ideal untuk 1–3 perangkat",
      "Kuota tanpa batas (unlimited)",
      "Koneksi stabil jaringan fiber optic",
      "Browsing, sosial media, dan belajar online lancar",
    ],
    button: "Pesan Paket 10 Mbps",
    highlighted: false,
  },
  {
    name: "Standard",
    speed: "15",
    price: "180.000",
    oldPrice: "210.000",
    saving: "30.000",
    label: "Pilihan Keluarga",
    description: "Koneksi nyaman untuk aktivitas bersama keluarga.",
    features: [
      "Kecepatan Download dan Upload sampai 15 Mbps",
      "Ideal untuk 4–7 perangkat",
      "Kuota tanpa batas (unlimited)",
      "Koneksi stabil jaringan fiber optic",
      "Streaming tanpa batas di semua perangkat",
    ],
    button: "Pesan Paket 15 Mbps",
    highlighted: true,
  },
  {
    name: "Ultimate",
    speed: "30",
    price: "280.000",
    oldPrice: "310.000",
    saving: "30.000",
    label: "Cepat Tanpa Batas",
    description: "Koneksi lebih leluasa untuk banyak aktivitas.",
    features: [
      "Kecepatan Download dan Upload sampai 30 Mbps",
      "Ideal untuk 8–12 perangkat",
      "Kuota tanpa batas (unlimited)",
      "Koneksi stabil jaringan fiber optic",
      "Konektivitas stabil untuk seluruh area",
    ],
    button: "Pesan Paket 30 Mbps",
    highlighted: false,
  },
];

const businessCategories = [
  {
    tag: "Bisnis",
    subtitle: "Operasional Korporat",
    title: "Kantor dan Perusahaan",
    description:
      "Untuk mendukung komunikasi, kolaborasi, dan penggunaan aplikasi digital dalam kegiatan operasional.",
    features: [
      "Kelancaran rapat virtual lintas divisi dan cabang",
      "Akses database dan perangkat lunak ERP/CRM perusahaan",
      "Kestabilan transfer berkas desain, laporan, dan dokumen",
      "Koneksi stabil jaringan fiber optic",
      "Kuota tanpa batas (Unlimited)",
    ],
  },
  {
    tag: "Akademik",
    subtitle: "Edukasi",
    title: "Sekolah dan Kampus",
    description:
      "Untuk mendukung akses sumber belajar, platform pendidikan, dan aktivitas akademik.",
    features: [
      "Mendukung ujian berbasis komputer (CBT) dan e-learning",
      "Akses jurnal ilmiah, e-library, dan riset sivitas akademika",
      "Jangkauan koneksi di ruang pengajar, lab, dan perpustakaan",
      "Koneksi stabil jaringan fiber optic",
      "Kuota tanpa batas (Unlimited)",
    ],
  },
  {
    tag: "Institusi",
    subtitle: "Lembaga dan Komunitas",
    title: "Institusi dan Organisasi",
    description:
      "Untuk kebutuhan konektivitas di lingkungan kerja maupun operasional organisasi.",
    features: [
      "Kebutuhan sistem pelayanan publik dan data kelembagaan",
      "Integrasi komunikasi kantor cabang dan sekretariat",
      "Penyesuaian konfigurasi berdasarkan karakteristik gedung",
      "Koneksi stabil jaringan fiber optic",
      "Kuota tanpa batas (Unlimited)",
    ],
  },
];

const mitraBenefits = [
  "Kesepakatan Saling Menguntungkan",
  "Jalur Fiber Optik Saling Terintegrasi",
  "Dukungan Operasional dan Teknis",
];

const operationalSupports = [
  {
    icon: Headset,
    title: "Call Center dan Network Operations Center (NOC)",
    description:
      "Pusat kendali dan pemantauan lalu lintas jaringan untuk mendeteksi serta mengantisipasi potensi anomali koneksi.",
  },
  {
    icon: Wrench,
    title: "Tim Teknisi Fiber Optik",
    description:
      "Tenaga ahli instalasi kabel serat optik, penyambungan splicing, serta pemeliharaan perangkat distribusi di lapangan.",
  },
  {
    icon: RadioTower,
    title: "Respons dan Penanganan Gangguan",
    description:
      "Ketentuan respons dan penanganan teknis dibahas bersama tim PROXINET sesuai kesepakatan layanan mitra.",
  },
];

export default function ProdukPage() {
  const [activeTab, setActiveTab] = useState<ProductTab>("home");
  const [businessLabelPositions, setBusinessLabelPositions] = useState<
    Record<string, BusinessLabelPosition>
  >(() =>
    Object.fromEntries(
      BUSINESS_LABELS.map(({ label, x, y }) => [label, { x, y }])
    )
  );
  const illustrationRef = useRef<HTMLDivElement>(null);
  const activeLabelDragRef = useRef<ActiveLabelDrag | null>(null);

  const handleLabelPointerDown = (
    event: React.PointerEvent<HTMLButtonElement>,
    label: string
  ) => {
    const container = illustrationRef.current;
    if (!container || (event.pointerType === "mouse" && event.button !== 0)) {
      return;
    }

    const position = businessLabelPositions[label];
    if (!position) return;

    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);

    activeLabelDragRef.current = {
      label,
      pointerId: event.pointerId,
      startPointerX: event.clientX,
      startPointerY: event.clientY,
      startX: position.x,
      startY: position.y,
    };
  };

  const handleLabelPointerMove = (
    event: React.PointerEvent<HTMLButtonElement>
  ) => {
    const drag = activeLabelDragRef.current;
    const container = illustrationRef.current;

    if (!drag || drag.pointerId !== event.pointerId || !container) return;

    const bounds = container.getBoundingClientRect();
    const maxX = Math.max(
      0,
      ((bounds.width - event.currentTarget.offsetWidth) / bounds.width) * 100
    );
    const maxY = Math.max(
      0,
      ((bounds.height - event.currentTarget.offsetHeight) / bounds.height) *
        100
    );

    const nextX = Math.min(
      maxX,
      Math.max(0, drag.startX + ((event.clientX - drag.startPointerX) / bounds.width) * 100)
    );
    const nextY = Math.min(
      maxY,
      Math.max(0, drag.startY + ((event.clientY - drag.startPointerY) / bounds.height) * 100)
    );

    setBusinessLabelPositions((current) => ({
      ...current,
      [drag.label]: { x: nextX, y: nextY },
    }));
  };

  const handleLabelPointerEnd = (
    event: React.PointerEvent<HTMLButtonElement>
  ) => {
    const drag = activeLabelDragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    activeLabelDragRef.current = null;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleLabelKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    label: string
  ) => {
    const movement: Record<string, { x: number; y: number }> = {
      ArrowLeft: { x: -1, y: 0 },
      ArrowRight: { x: 1, y: 0 },
      ArrowUp: { x: 0, y: -1 },
      ArrowDown: { x: 0, y: 1 },
    };
    const delta = movement[event.key];
    const container = illustrationRef.current;
    if (!delta || !container) return;

    event.preventDefault();
    const bounds = container.getBoundingClientRect();
    const maxX = Math.max(
      0,
      ((bounds.width - event.currentTarget.offsetWidth) / bounds.width) * 100
    );
    const maxY = Math.max(
      0,
      ((bounds.height - event.currentTarget.offsetHeight) / bounds.height) *
        100
    );

    setBusinessLabelPositions((current) => {
      const position = current[label];
      if (!position) return current;

      return {
        ...current,
        [label]: {
          x: Math.min(maxX, Math.max(0, position.x + delta.x * (event.shiftKey ? 5 : 1))),
          y: Math.min(maxY, Math.max(0, position.y + delta.y * (event.shiftKey ? 5 : 1))),
        },
      };
    });
  };

  const resetBusinessLabels = () => {
    activeLabelDragRef.current = null;
    setBusinessLabelPositions(
      Object.fromEntries(
        BUSINESS_LABELS.map(({ label, x, y }) => [label, { x, y }])
      )
    );
  };

  return (
    <main className="min-h-screen overflow-hidden bg-white">
      {/* BACKGROUND ACCENT */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed right-0 top-40 -z-0 h-96 w-96 rounded-full bg-blue-100/40 blur-[100px]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-16 pt-10 sm:px-8 sm:pt-28">
        {/* BREADCRUMB */}
        <div className="mb-5 flex items-center gap-2 text-xs text-slate-400">
          <Link href="/" className="transition hover:text-blue-600">
            Beranda
          </Link>
          <span aria-hidden="true">›</span>
          <span className="font-medium text-blue-600">Produk</span>
        </div>

        {/* PAGE TITLE */}
        <div className="mb-4">
          <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Pilih Produk PROXINET
          </h1>
        </div>

        {/* TAB NAVIGATION */}
        <div className="sticky top-[72px] z-30 -mx-5 mb-7 border-b border-slate-200 px-5 backdrop-blur sm:static sm:mx-0 sm:px-0">
          <div className="flex gap-5 overflow-x-auto scrollbar-hide sm:gap-7">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                aria-pressed={activeTab === tab.id}
                className={`relative shrink-0 whitespace-nowrap py-3 text-xs font-semibold transition-colors sm:text-sm ${
                  activeTab === tab.id
                    ? "text-blue-600"
                    : "text-slate-600 hover:text-blue-600"
                }`}
              >
                {tab.label}

                {activeTab === tab.id && (
                  <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-blue-600" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* =================================================
            SECTION 1: PROXINET HOME
        ================================================= */}
        {activeTab === "home" && (
          <section className="animate-in fade-in duration-300">
            <div className="mb-7">
              <p className="text-sm font-semibold text-blue-600">
                INTERNET RUMAH
              </p>
              <h2 className="mt-1 text-2xl font-bold text-slate-950 sm:text-3xl">
                Pilih Paket Internet Rumah
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Nikmati koneksi internet fiber optic untuk mendukung aktivitas
                digital seluruh anggota keluarga.
              </p>
            </div>

            {/* PACKAGE CARDS */}
            <div className="grid items-stretch gap-5 md:grid-cols-3">
              {homePackages.map((pkg) => (
                <article
                  key={pkg.name}
                  className={`relative flex flex-col rounded-2xl border bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-6 ${
                    pkg.highlighted
                      ? "border-blue-500 shadow-lg shadow-blue-100"
                      : "border-slate-200 shadow-sm"
                  }`}
                >
                  {/* BADGE */}
                  <div className="mb-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-[10px] font-bold text-white ${
                        pkg.highlighted ? "bg-blue-600" : "bg-slate-900"
                      }`}
                    >
                      ✦ {pkg.label}
                    </span>
                  </div>

                  <p className="text-xs font-bold tracking-wide text-slate-400">
                    PROXINET HOME
                  </p>

                  <h3 className="mt-1 text-2xl font-bold text-slate-950">
                    {pkg.name}
                  </h3>

                  <div className="mt-3 flex items-end gap-2">
                    <span className="text-5xl font-bold leading-none tracking-tight text-blue-600">
                      {pkg.speed}
                    </span>
                    <span className="mb-1 text-sm font-semibold text-slate-800">
                      Mbps
                    </span>
                  </div>

                  {/* PRICE */}
                  <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex flex-wrap items-baseline gap-1">
                      <span className="text-2xl font-bold text-slate-950">
                        Rp {pkg.price}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        / bulan
                      </span>
                    </div>

                    <div className="mt-1 flex flex-wrap items-center gap-2 text-[10px]">
                      <span className="text-slate-400 line-through">
                        Rp {pkg.oldPrice}
                      </span>
                      <span className="font-bold text-green-600">
                        Hemat Rp {pkg.saving}
                      </span>
                    </div>

                    <p className="mt-2 text-[9px] leading-4 text-slate-500">
                      *Sudah termasuk sewa router ONT & Pajak PPN.
                    </p>
                  </div>

                  {/* FEATURES */}
                  <div className="mt-4 flex-1">
                    <p className="mb-3 text-[10px] font-bold tracking-wide text-slate-400">
                      FASILITAS
                    </p>

                    <ul className="space-y-2.5">
                      {pkg.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 text-xs leading-5 text-slate-600"
                        >
                          <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-green-100 text-[10px] font-bold text-green-600">
                            ✓
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* BUTTON */}
                  <div className="mt-5 border-t border-slate-200 pt-4 text-white">
                    <WhatsAppButton
                      variant={pkg.highlighted ? "primary" : "dark"}
                      message={`Halo PROXINET, saya tertarik untuk berlangganan PROXINET Home paket ${pkg.name} dengan kecepatan ${pkg.speed} Mbps seharga Rp ${pkg.price}/bulan. Mohon informasi lebih lanjut mengenai ketersediaan jaringan dan proses pemasangannya.`}
                    >
                      {pkg.button}
                    </WhatsAppButton>
                  </div>
                </article>
              ))}
            </div>

            <p className="mt-5 text-center text-xs leading-5 text-slate-400">
              Harga dan ketersediaan paket dapat dikonfirmasi kembali melalui
              tim PROXINET.
            </p>
          </section>
        )}

        {/* =================================================
            SECTION 2: BUSINESS & EDUCATION
        ================================================= */}
        {activeTab === "business" && (
          <section className="animate-in fade-in duration-300">
            {/* BUSINESS HERO */}
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="grid items-center gap-7 md:grid-cols-[0.82fr_1.18fr]">
                <div>

                  <h2 className="mt-3 text-2xl font-bold leading-tight text-slate-950 sm:text-[28px]">
                    Aktivitas Terus Berjalan.
                    <span className="block text-blue-600">
                      Koneksi Harus Bisa Diandalkan.
                    </span>
                  </h2>

                  <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
                    Dari ruang kerja hingga ruang kelas, internet menjadi
                    bagian dari hampir setiap aktivitas. Temukan layanan
                    PROXINET yang sesuai dengan kebutuhan kantor, sekolah,
                    atau institusi Anda.
                  </p>

                  <div className="mt-5 text-white">
                    <WhatsAppButton
                      message="Halo PROXINET, saya ingin berkonsultasi mengenai kebutuhan layanan PROXINET Business & Education. Mohon informasi mengenai pilihan layanan dan penawaran yang sesuai dengan kebutuhan organisasi kami."
                    >
                      <MessageSquare aria-hidden="true" size={17} strokeWidth={2} />
                      Konsultasikan Kebutuhan Anda
                    </WhatsAppButton>
                  </div>
                </div>

                {/* INTERACTIVE ILLUSTRATION */}
                <div className="mx-auto w-full max-w-[620px]">
                  <div className="mb-1 flex items-center justify-between gap-3 text-[11px] text-slate-400">
                    <span className="inline-flex items-center gap-1.5">
                      <Move size={13} strokeWidth={1.8} />
                      Geser kotak untuk mengatur posisinya
                    </span>
                    <button
                      type="button"
                      onClick={resetBusinessLabels}
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1 font-semibold text-blue-600 transition hover:bg-blue-50"
                    >
                      <RotateCcw size={12} />
                      Atur ulang
                    </button>
                  </div>

                  <div
                    ref={illustrationRef}
                    className="relative h-[280px] w-full select-none sm:h-[290px] md:h-[260px]"
                  >
                    {BUSINESS_LABELS.map(({ label }) => {
                      const position = businessLabelPositions[label];
                      if (!position) return null;

                      return (
                        <button
                          key={label}
                          type="button"
                          aria-label={`Geser label ${label}. Gunakan tombol panah untuk memindahkan.`}
                          title="Tarik untuk memindahkan"
                          onPointerDown={(event) =>
                            handleLabelPointerDown(event, label)
                          }
                          onPointerMove={handleLabelPointerMove}
                          onPointerUp={handleLabelPointerEnd}
                          onPointerCancel={handleLabelPointerEnd}
                          onKeyDown={(event) =>
                            handleLabelKeyDown(event, label)
                          }
                          style={{
                            left: `${position.x}%`,
                            top: `${position.y}%`,
                            touchAction: "none",
                          }}
                          className="absolute z-10 min-w-[82px] cursor-grab rounded-lg border border-blue-400 bg-white px-3 py-2 text-center text-[13px] font-semibold text-slate-600 shadow-[0_1px_3px_rgba(37,99,235,0.08)] transition-[box-shadow,border-color] hover:border-blue-500 hover:shadow-md active:cursor-grabbing active:border-blue-600 active:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                        >
                          {label}
                        </button>
                      );
                    })}

                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 items-center justify-center xl:flex"
                    >
                      <div className="absolute inset-4 rounded-full bg-blue-100/50 blur-2xl" />
                      <div className="relative z-10">
                        <RadioTower
                          className="size-[142px] text-slate-500 drop-shadow-[0_5px_4px_rgba(15,23,42,0.12)]"
                          strokeWidth={1.45}
                        />
                        <RadioTower
                          className="absolute inset-0 size-[142px] text-blue-500 [clip-path:inset(0_0_58%_0)]"
                          strokeWidth={1.45}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* BUSINESS CATEGORIES */}
            <div className="mt-9">
              <div className="mb-5">
                <h2 className="text-xl font-bold text-slate-950 sm:text-2xl">
                  Produktivitas dengan{" "}
                  <span className="text-blue-600">
                    Konektivitas Tanpa Batas
                  </span>
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Solusi konektivitas yang dapat disesuaikan dengan kebutuhan
                  operasional setiap sektor.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {businessCategories.map((category) => (
                  <article
                    key={category.title}
                    className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-blue-600">
                        {category.tag}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {category.subtitle}
                      </span>
                    </div>

                    <h3 className="mt-3 text-lg font-bold text-slate-800">
                      {category.title}
                    </h3>

                    <p className="mt-2 min-h-[60px] text-xs leading-5 text-slate-500">
                      {category.description}
                    </p>

                    <ul className="mt-4 flex-1 space-y-2.5">
                      {category.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 text-xs leading-5 text-slate-600"
                        >
                          <span className="mt-0.5 text-blue-600">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 border-t border-slate-200 pt-4 text-right">
                      <a
                        href={whatsappLink(
                          `Halo PROXINET, saya ingin menanyakan kebutuhan layanan Business & Education untuk kategori ${category.title}. Mohon informasi mengenai solusi konektivitas, pilihan layanan, dan penawaran yang tersedia.`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 transition hover:text-blue-600"
                      >
                        Tanya Kebutuhan
                        <span className="text-blue-600">↗</span>
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* =================================================
            SECTION 3: PROXINET MITRA
        ================================================= */}
        {activeTab === "mitra" && (
          <section className="animate-in fade-in duration-300">
            {/* MITRA HERO */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="grid items-center gap-7 md:grid-cols-[1.1fr_0.9fr]">
                <div>

                  <h2 className="mt-3 text-2xl font-bold leading-tight text-slate-950 sm:text-3xl">
                    Bangun Peluang Bisnis
                    <span className="block text-blue-600">
                      Bersama PROXINET
                    </span>
                  </h2>

                  <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
                    Jajaki peluang usaha di bidang layanan internet melalui
                    kerja sama dengan PROXINET. Diskusikan kebutuhan jaringan,
                    skema kemitraan, dan ketentuan kerja sama yang sesuai
                    dengan rencana bisnis Anda.
                  </p>

                  <div className="mt-5 text-white">
                    <WhatsAppButton
                      message="Halo PROXINET, saya tertarik untuk mendiskusikan peluang kerja sama kemitraan dengan PROXINET. Mohon informasi mengenai skema kemitraan, persyaratan, dan proses pengajuan kerja sama."
                    >
                      <MessageSquare aria-hidden="true" size={17} strokeWidth={2} />
                      Diskusikan Peluang Kerja Sama
                    </WhatsAppButton>
                  </div>
                </div>

                {/* MITRA BENEFITS */}
                <div className="flex flex-col items-center justify-center gap-5 rounded-xl bg-gradient-to-br from-blue-50 to-slate-100 p-6 sm:flex-row sm:gap-4">
                  <div className="flex w-full flex-1 flex-col items-center gap-3">
                    {mitraBenefits.map((benefit) => (
                      <div
                        key={benefit}
                        className="w-full max-w-[280px] rounded-lg border border-blue-200 bg-white px-4 py-3 text-center text-xs font-semibold text-slate-700 shadow-sm"
                      >
                        {benefit}
                      </div>
                    ))}
                  </div>
                  <div
                    aria-hidden="true"
                    className="relative flex size-28 shrink-0 items-center justify-center text-blue-500 sm:size-32"
                  >
                    <div className="absolute inset-3 rounded-full bg-blue-200/60 blur-2xl" />
                    <RadioTower
                      className="relative z-10 size-24 drop-shadow-[0_4px_4px_rgba(37,99,235,0.16)] sm:size-28"
                      strokeWidth={1.55}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* SCROLL TO BENEFITS */}
            <div className="py-6 text-center">
              <a
                href="#mitra-benefits"
                className="inline-flex items-center gap-3 text-xs font-semibold text-slate-700 transition hover:text-blue-600"
              >
                Lihat Keuntungan Menjadi Mitra
                <ArrowDown aria-hidden="true" className="size-4 text-blue-600" strokeWidth={2} />
              </a>
            </div>

            {/* OPERATIONAL SUPPORT */}
            <div id="mitra-benefits" className="scroll-mt-28">
              <div className="mb-5">
                <h2 className="text-xl font-bold text-slate-950 sm:text-2xl">
                  Dukungan Operasional untuk{" "}
                  <span className="text-blue-600">Menunjang Layanan</span>
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Menjaga keandalan layanan mitra melalui koordinasi
                  operasional dan kesiapan tim teknis di lapangan.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {operationalSupports.map((support) => (
                  <article
                    key={support.title}
                    className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-blue-300 hover:shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <support.icon size={24} strokeWidth={2} />
                      </div>
                      <h3 className="text-sm font-bold leading-5 text-slate-700">
                        {support.title}
                      </h3>
                    </div>

                    <p className="mt-4 text-xs leading-5 text-slate-500">
                      {support.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            {/* DOCUMENT REQUIREMENTS */}
            <div className="mt-8">
              <div className="mb-5">
                <h2 className="text-xl font-bold text-slate-950 sm:text-2xl">
                  Persiapkan Dokumen untuk Menjadi{" "}
                  <span className="text-blue-600">Mitra PROXINET</span>
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Untuk memulai pengajuan, lengkapi persyaratan berikut.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-[0.8fr_1.2fr]">
                <article className="rounded-2xl border border-slate-200 bg-white p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Files size={24} strokeWidth={2} />
                    </div>
                    <h3 className="font-bold text-slate-700">
                      Administrasi
                    </h3>
                  </div>

                  <ul className="mt-5 space-y-3 text-xs leading-5 text-slate-600">
                    {[
                      "Kartu Tanda Penduduk (KTP)",
                      "Nomor Pokok Wajib Pajak (NPWP)",
                      "Dokumen legalitas usaha (jika ada)",
                    ].map((item) => (
                      <li key={item} className="flex gap-2">
                        <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-blue-600" strokeWidth={2.2} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>

                <article className="rounded-2xl border border-slate-200 bg-white p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <ListChecks size={24} strokeWidth={2} />
                    </div>
                    <h3 className="font-bold text-slate-700">
                      Syarat dan Ketentuan
                    </h3>
                  </div>

                  <ul className="mt-5 space-y-3 text-xs leading-5 text-slate-600">
                    {[
                      "Minimal kontrak mengikuti hasil negosiasi dan kesepakatan kedua pihak.",
                      "Biaya instalasi dibahas setelah survei lokasi dan peninjauan kebutuhan jaringan.",
                      "Skema kerja sama disesuaikan dengan kondisi dan cakupan wilayah.",
                      "Ketentuan teknis dan operasional dibahas bersama tim PROXINET.",
                    ].map((item) => (
                      <li key={item} className="flex gap-2">
                        <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-blue-600" strokeWidth={2.2} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </div>

              <div className="mt-6 rounded-2xl bg-blue-50 p-5 text-center sm:p-7">
                <h3 className="text-lg font-bold text-slate-900">
                  Siap Menjadi Bagian dari PROXINET?
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Hubungi tim kami untuk mendiskusikan peluang kerja sama
                  lebih lanjut.
                </p>
                <div className="mt-4 text-white">
                  <WhatsAppButton
                    message="Halo PROXINET, saya ingin mengajukan diri sebagai mitra PROXINET. Saya ingin mendapatkan informasi lebih lanjut mengenai persyaratan, dokumen, dan tahapan kerja sama."
                  >
                    Hubungi Tim Kemitraan
                  </WhatsAppButton>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
