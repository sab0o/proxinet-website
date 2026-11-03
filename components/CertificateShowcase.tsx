
import Image from "next/image";

export default function CertificateShowcase() {
  return (
    <section className="w-full bg-white px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-6xl">
        {/* JUDUL */}
        <h2 className="text-center text-2xl font-bold tracking-tight text-black sm:text-3xl md:text-4xl">
          Komitmen Pada Kualitas
        </h2>

        {/* GAMBAR SERTIFIKAT */}
        <div className="mx-auto mt-12 flex min-h-[150px] max-w-[440px] items-center justify-center gap-3 sm:mt-14 sm:gap-5 md:mt-16">
          <div className="relative w-[65%]">
            <Image
              src="/images/sertifikat-proxinet.png"
              alt="Sertifikat ISO 9001:2015 PROXINET"
              width={520}
              height={280}
              sizes="(max-width: 640px) 65vw, 280px"
              className="h-auto w-full object-contain"
            />
          </div>
        </div>

        {/* DESKRIPSI */}
        <p className="mx-auto mt-10 max-w-5xl text-center text-sm leading-relaxed text-slate-400 sm:mt-12 sm:text-base">
          Telah tersertifikasi ISO 9001:2015 sebagai bentuk komitmen PROXINET
          dalam menjaga standar manajemen mutu, meningkatkan kualitas layanan,
          dan memberikan pengalaman terbaik serta terpercaya bagi setiap
          pelanggan.
        </p>
      </div>
    </section>
  );
}
