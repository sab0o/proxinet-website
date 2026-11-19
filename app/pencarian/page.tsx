
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";

const searchIndex = [
  // BERANDA
  {
    title: "Beranda PROXINET",
    category: "Halaman",
    description:
      "Informasi utama mengenai layanan dan solusi konektivitas PROXINET.",
    keywords: "beranda home proxinet internet konektivitas",
    href: "/",
  },

  // PRODUK
  {
    title: "PROXINET Home",
    category: "Produk",
    description:
      "Layanan internet rumah untuk streaming, belajar, bekerja, dan hiburan.",
    keywords: "home rumah internet paket wifi streaming keluarga",
    href: "/produk",
  },
  {
    title: "PROXINET Business & Education",
    category: "Produk",
    description:
      "Solusi konektivitas untuk perusahaan, sekolah, kampus, dan institusi.",
    keywords:
      "business education bisnis perusahaan sekolah kampus pendidikan kantor",
    href: "/produk",
  },
  {
    title: "PROXINET Mitra",
    category: "Produk",
    description:
      "Informasi peluang kerja sama dan kemitraan jaringan internet PROXINET.",
    keywords: "mitra partnership reseller kerjasama bisnis",
    href: "/produk",
  },

  // LOKASI
  {
    title: "Cek Lokasi dan Cakupan Jaringan",
    category: "Lokasi",
    description:
      "Cari lokasi kantor dan wilayah cakupan layanan PROXINET melalui peta.",
    keywords: "lokasi coverage cakupan jaringan wilayah area peta",
    href: "/lokasi",
  },
  {
    title: "PROXINET Head Office",
    category: "Lokasi",
    description:
      "Ruko Grand California Blok B2 No. 3 & 4, Taman Baloi, Batam Kota, Kepulauan Riau.",
    keywords: "kantor pusat head office batam taman baloi",
    href: "/lokasi",
  },
  {
    title: "Tanjung Pinang",
    category: "Lokasi",
    description:
      "Jalan Katamso KM 2, depan TK Auri, Tanjung Pinang, Kepulauan Riau.",
    keywords: "branch cabang tanjung pinang kepulauan riau",
    href: "/lokasi",
  },
  {
    title: "Tanjung Karimun",
    category: "Lokasi",
    description:
      "Jalan Batu Lipai No. 80, Baran Timur, Meral, Kabupaten Karimun.",
    keywords: "branch cabang tanjung karimun meral",
    href: "/lokasi",
  },
  {
    title: "Sukabumi",
    category: "Lokasi",
    description:
      "Jalan Sarasa No. 10, Babakan, Cibeureum, Kota Sukabumi, Jawa Barat.",
    keywords: "sukabumi jawa barat cabang",
    href: "/lokasi",
  },
  {
    title: "Jember",
    category: "Lokasi",
    description:
      "Jalan Mastrip Ruko Pandora Square No. 8J, Sumbersari, Jember, Jawa Timur.",
    keywords: "jember jawa timur cabang",
    href: "/lokasi",
  },
  {
    title: "Wilayah Layanan PROXINET",
    category: "Lokasi",
    description:
      "Informasi wilayah layanan di Banda Aceh, Riau, Kepulauan Riau, Padang, Jambi, Bengkulu, Jakarta, Jawa Barat, Jawa Timur, dan Bali.",
    keywords:
      "banda aceh riau pekanbaru padang jambi bengkulu jakarta sukabumi tasikmalaya banyuwangi lumajang situbondo bondowoso sidoarjo bali",
    href: "/lokasi",
  },

  // BANTUAN
  {
    title: "Cara Berlangganan PROXINET",
    category: "Bantuan",
    description:
      "Pelajari langkah berlangganan mulai dari cek coverage hingga menghubungi tim PROXINET melalui WhatsApp.",
    keywords: "cara berlangganan daftar pemasangan instalasi daftar internet",
    href: "/bantuan",
  },
  {
    title: "Informasi Paket Internet",
    category: "Bantuan",
    description:
      "Temukan informasi mengenai pilihan paket dan layanan internet PROXINET.",
    keywords: "paket harga biaya internet tarif layanan",
    href: "/bantuan",
  },
  {
    title: "Pembayaran",
    category: "Bantuan",
    description:
      "Informasi bantuan mengenai pembayaran layanan PROXINET.",
    keywords: "pembayaran bayar tagihan transaksi",
    href: "/bantuan",
  },
  {
    title: "Layanan dan Gangguan",
    category: "Bantuan",
    description:
      "Temukan informasi bantuan terkait layanan dan gangguan koneksi internet.",
    keywords:
      "gangguan internet koneksi wifi lemot lambat troubleshooting teknis",
    href: "/bantuan",
  },

  // KONTAK
  {
    title: "Pusat Kontak PROXINET",
    category: "Kontak",
    description:
      "Hubungi PROXINET untuk pertanyaan, konsultasi, dan kebutuhan layanan.",
    keywords: "kontak customer service whatsapp email telepon hubungi",
    href: "/pusat-kontak",
  },
];

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function SearchPage({
  searchParams,
}: SearchPageProps) {
  const params = await searchParams;
  const query = params.q?.trim() ?? "";

  const normalizedQuery = query.toLowerCase();

  const results = searchIndex.filter((item) => {
    const searchableText = [
      item.title,
      item.category,
      item.description,
      item.keywords,
    ]
      .join(" ")
      .toLowerCase();

    return normalizedQuery
      .split(/\s+/)
      .filter(Boolean)
      .every((word) => searchableText.includes(word));
  });

  return (
    <main className="min-h-[70vh] bg-slate-50 px-5 pb-16 pt-28 sm:px-8 sm:pt-32">
      <div className="mx-auto max-w-5xl">

        {/* HEADER */}
        <div>
          <p className="text-sm font-semibold tracking-wider text-blue-600">
            PENCARIAN PROXINET
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Hasil Pencarian
          </h1>

          {query ? (
            <p className="mt-3 text-sm text-slate-500">
              Menampilkan hasil untuk{" "}
              <strong className="text-slate-800">
                &quot;{query}&quot;
              </strong>
            </p>
          ) : (
            <p className="mt-3 text-sm text-slate-500">
              Masukkan kata kunci untuk menemukan informasi PROXINET.
            </p>
          )}
        </div>

        {/* HASIL PENCARIAN */}
        <div className="mt-8 space-y-3">
          {query && results.length > 0 ? (
            <>
              <p className="mb-4 text-sm text-slate-500">
                {results.length} informasi ditemukan
              </p>

              {results.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group block rounded-xl border border-slate-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
                >
                  <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                    {item.category}
                  </span>

                  <h2 className="mt-3 text-base font-bold text-slate-900 transition-colors group-hover:text-blue-600">
                    {item.title}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {item.description}
                  </p>

                  <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
                    Lihat informasi
                    <ArrowRight aria-hidden="true" size={16} strokeWidth={2.2} />
                  </span>
                </Link>
              ))}
            </>
          ) : (
            <div className="rounded-xl border border-slate-200 bg-white px-6 py-12 text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-slate-100">
                <Search aria-hidden="true" className="size-6 text-slate-400" strokeWidth={1.8} />
              </div>

              <h2 className="mt-4 font-bold text-slate-900">
                {query
                  ? "Informasi tidak ditemukan"
                  : "Apa yang ingin kamu cari?"}
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {query
                  ? "Coba gunakan kata kunci lain atau periksa kembali penulisan kata kunci."
                  : "Gunakan kolom pencarian pada navbar untuk menemukan produk, lokasi, bantuan, dan informasi PROXINET."}
              </p>

              <Link
                href="/"
                className="mt-5 inline-flex rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Kembali ke Beranda
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
