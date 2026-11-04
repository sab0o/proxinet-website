
"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";

const branches = [
  {
    name: "Tanjung Pinang",
    address:
      "Jalan Katamso KM 2, Depan TK Auri, Tanjung Pinang, Kepulauan Riau",
  },
  {
    name: "Tanjung Karimun",
    address:
      "Jalan Batu Lipai No. 80, RT/RW 002/002, Kel. Baran Timur, Kec. Meral, Kabupaten Karimun, Kepulauan Riau",
  },
  {
    name: "Sukabumi",
    address:
      "Jalan Sarasa No. 10, Kel. Babakan, Kec. Cibeureum, Kota Sukabumi, Jawa Barat",
  },
  {
    name: "Jember",
    address:
      "Jalan Mastrip Ruko Pandora Square No. 8J, Kel. Lingkungan Tegalgedeg, Kec. Sumbersari, Jember, Jawa Timur",
  },
];

const questionTypes = [
  "Umum",
  "Pasang Baru",
  "Business & Education",
  "Kerjasama Mitra",
  "Bantuan Teknis",
];

export default function PusatKontakPage() {
  const [selectedType, setSelectedType] = useState("Umum");

  const [formData, setFormData] = useState({
    name: "",
    city: "",
    whatsapp: "",
    email: "",
    message: "",
  });

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const message = `
Halo PROXINET, saya ingin menghubungi tim PROXINET.

Nama Lengkap: ${formData.name}
Asal Kota/Wilayah: ${formData.city}
No. WhatsApp: ${formData.whatsapp}
Email: ${formData.email}
Jenis Pertanyaan: ${selectedType}

Pesan:
${formData.message}
    `.trim();

    const whatsappUrl = `https://wa.me/628117041659?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      {/* BACKGROUND DECORATION */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-32 h-[400px] w-[400px] rounded-full bg-blue-100/30 blur-[100px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 right-0 h-[400px] w-[400px] rounded-full bg-blue-100/30 blur-[100px]"
      />

      <section className="relative px-5 pb-8 pt-10 sm:px-8 sm:pb-10 sm:pt-28">
        <div className="mx-auto max-w-7xl">

          {/* BREADCRUMB */}
          <div className="mb-6 flex items-center gap-2 text-xs text-slate-400">
            <Link
              href="/"
              className="transition-colors hover:text-blue-600"
            >
              Beranda
            </Link>

            <span aria-hidden="true">›</span>

            <span className="font-medium text-blue-600">
              Pusat Kontak
            </span>
          </div>

          {/* MAIN CONTENT */}
          <div className="grid items-start gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">

            {/* KOLOM KIRI: INFORMASI PROXINET */}
            <div className="relative">

              {/* HEAD OFFICE */}
              <div>
                <h1 className="text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
                  PROXINET Head Office
                </h1>

                <p className="mt-2 max-w-lg text-[13px] leading-5 text-slate-600">
                  Ruko Grand California Blok B2 No. 3 & 4, Kel. Taman
                  Baloi, Kec. Batam Kota, Kota Batam, Kepulauan Riau.
                </p>
              </div>

              {/* BRANCH */}
              <div className="mt-5">
                <h2 className="text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
                  PROXINET Branch
                </h2>

                <div className="mt-3 space-y-2.5">
                  {branches.map((branch) => (
                    <div
                      key={branch.name}
                      className="grid grid-cols-[105px_1fr] gap-3 text-[12px] leading-[1.5rem] sm:grid-cols-[115px_1fr]"
                    >
                      <h3 className="font-semibold text-slate-700">
                        {branch.name}
                      </h3>

                      <p className="text-slate-600">
                        {branch.address}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* DIVIDER */}
              <div className="my-5 border-t border-slate-200" />

              {/* CONTACT AND SOCIAL MEDIA */}
              <div className="grid grid-cols-2 gap-6 sm:gap-8">

                {/* KONTAK */}
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-slate-950">
                    Kontak
                  </h2>

                  <div className="mt-2 space-y-2 text-[13px]">
                    <div>
                      <p className="text-slate-400">Whatsapp</p>

                      <a
                        href={`https://wa.me/628117041659?text=${encodeURIComponent(
                            "Halo PROXINET, saya ingin mengetahui informasi lebih lanjut mengenai layanan internet PROXINET."
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-slate-700 transition-colors hover:text-blue-600"
                        >
                        +62 811-7041-659
                        </a>
                    </div>

                    <div>
                      <p className="text-slate-400">Email</p>

                      <a
                        href="mailto:info@proxinet.co.id"
                        className="font-semibold text-slate-700 transition-colors hover:text-blue-600"
                      >
                        info@proxinet.co.id
                      </a>
                    </div>

                    <div>
                      <p className="text-slate-400">No. Telp</p>

                      <a
                        href="tel:07786000109"
                        className="font-semibold text-slate-700 transition-colors hover:text-blue-600"
                      >
                        0778-6000109
                      </a>
                    </div>
                  </div>
                </div>

                {/* SOCIAL MEDIA */}
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-slate-950">
                    Sosial Media
                  </h2>

                  <div className="mt-2 space-y-2 text-[13px]">
                    <a
                      href="https://www.instagram.com/proxinet/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-slate-500 transition-colors hover:text-blue-600"
                    >
                      Instagram
                    </a>

                    <a
                      href="https://www.facebook.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-slate-500 transition-colors hover:text-blue-600"
                    >
                      Facebook
                    </a>

                    <a
                      href="https://www.linkedin.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-slate-500 transition-colors hover:text-blue-600"
                    >
                      LinkedIn
                    </a>

                    <a
                      href="https://www.youtube.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-slate-500 transition-colors hover:text-blue-600"
                    >
                      YouTube
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* KOLOM KANAN: FORM KONTAK */}
            <div className="mx-auto w-full max-w-[680px] rounded-2xl border border-slate-200 bg-[#F8FAFA]/95 p-4 shadow-sm sm:p-5 lg:p-6">

              <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
                Beritahu Kami Kebutuhan Anda
              </h2>

              <form
                onSubmit={handleSubmit}
                className="mt-4 space-y-3"
              >

                {/* NAMA DAN KOTA */}
                <div className="grid gap-3 sm:grid-cols-2">

                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1.5 block text-[13px] font-medium text-slate-600"
                    >
                      Nama Lengkap
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Contoh: Sabita Khansa Dewi"
                      className="h-9 w-full rounded-lg border border-slate-300 bg-white px-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="city"
                      className="mb-1.5 block text-[13px] font-medium text-slate-600"
                    >
                      Asal Kota/Wilayah
                    </label>

                    <input
                      id="city"
                      name="city"
                      type="text"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Contoh: Batam"
                      className="h-9 w-full rounded-lg border border-slate-300 bg-white px-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                    />
                  </div>
                </div>

                {/* WHATSAPP */}
                <div>
                  <label
                    htmlFor="whatsapp"
                    className="mb-1.5 block text-[13px] font-medium text-slate-600"
                  >
                    No. Whatsapp
                  </label>

                  <input
                    id="whatsapp"
                    name="whatsapp"
                    type="tel"
                    required
                    value={formData.whatsapp}
                    onChange={handleChange}
                    placeholder="Contoh: 08xxxxxxxxxx"
                    className="h-9 w-full rounded-lg border border-slate-300 bg-white px-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-[13px] font-medium text-slate-600"
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Contoh: nama@gmail.com"
                    className="h-9 w-full rounded-lg border border-slate-300 bg-white px-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                  />
                </div>

                {/* JENIS PERTANYAAN */}
                <div>
                  <p className="mb-1.5 text-[13px] font-medium text-slate-600">
                    Jenis Pertanyaan
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {questionTypes.map((type) => {
                      const isSelected = selectedType === type;

                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setSelectedType(type)}
                          aria-pressed={isSelected}
                          className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
                            isSelected
                              ? "bg-blue-600 text-white"
                              : "bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                          }`}
                        >
                          {type}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* PESAN */}
                <div>
                  <label
                    htmlFor="message"
                    className="sr-only"
                  >
                    Rincian kebutuhan atau pertanyaan
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={2}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tuliskan rincian kebutuhan atau pertanyaan Anda..."
                    className="min-h-[75px] w-full resize-y rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm leading-5 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                  />
                </div>

                {/* BUTTON KIRIM */}
                <button
                  type="submit"
                  className="flex min-h-9 w-full items-center justify-center gap-2 rounded-lg bg-[#374151] px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-600"
                >
                  Kirim

                  <svg
                    viewBox="0 0 24 24"
                    className="size-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
