"use client";

import dynamic from "next/dynamic";

const LocationMap = dynamic(
  () => import("@/components/LocationMap"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[680px] items-center justify-center bg-slate-50">
        <p className="text-sm text-slate-500">
          Menyiapkan peta PROXINET...
        </p>
      </div>
    ),
  }
);

export default function LokasiPage() {
  return (
    <main>
      <LocationMap />
    </main>
  );
}