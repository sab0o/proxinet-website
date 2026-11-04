"use client";

import { useMemo, useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Link from "next/link";

type Location = {
  id: string;
  name: string;
  region: string;
  address: string;
  lat: number;
  lng: number;
  type: "office" | "coverage";
};

const whatsappNumber = "628117041659";

const locations: Location[] = [
  // KANTOR PROXINET
  {
    id: "batam",
    name: "PROXINET Head Office",
    region: "Batam, Kepulauan Riau",
    address:
      "Ruko Grand California Blok B2 No. 3 & 4, Kel. Taman Baloi, Kec. Batam Kota, Kota Batam, Kepulauan Riau.",
    lat: 1.121,
    lng: 104.039,
    type: "office",
  },
  {
    id: "tanjung-pinang",
    name: "PROXINET Branch Tanjung Pinang",
    region: "Tanjung Pinang, Kepulauan Riau",
    address:
      "Jalan Katamso KM 2, Depan TK Auri, Tanjung Pinang, Kepulauan Riau.",
    lat: 0.918,
    lng: 104.455,
    type: "office",
  },
  {
    id: "karimun",
    name: "PROXINET Branch Tanjung Karimun",
    region: "Kabupaten Karimun, Kepulauan Riau",
    address:
      "Jalan Batu Lipai No. 80, RT/RW 002/002, Kel. Baran Timur, Kec. Meral, Kabupaten Karimun, Kepulauan Riau.",
    lat: 0.998,
    lng: 103.432,
    type: "office",
  },
  {
    id: "sukabumi",
    name: "PROXINET Branch Sukabumi",
    region: "Sukabumi, Jawa Barat",
    address:
      "Jalan Sarasa No. 10, Kel. Babakan, Kec. Cibeureum, Kota Sukabumi, Jawa Barat.",
    lat: -6.927,
    lng: 106.929,
    type: "office",
  },
  {
    id: "jember",
    name: "PROXINET Branch Jember",
    region: "Jember, Jawa Timur",
    address:
      "Jalan Mastrip Ruko Pandora Square No. 8J, Kel. Lingkungan Tegalgede, Kec. Sumbersari, Jember, Jawa Timur.",
    lat: -8.172,
    lng: 113.716,
    type: "office",
  },

  // AREA CAKUPAN BERDASARKAN GAMBAR
  {
    id: "banda-aceh",
    name: "Banda Aceh",
    region: "Aceh",
    address: "Area cakupan PROXINET di Banda Aceh, Aceh.",
    lat: 5.548,
    lng: 95.323,
    type: "coverage",
  },
  {
    id: "bagan-siapi-api",
    name: "Bagan Siapi-api",
    region: "Rokan Hilir, Riau",
    address: "Area cakupan PROXINET di Bagan Siapi-api, Rokan Hilir, Riau.",
    lat: 2.157,
    lng: 100.816,
    type: "coverage",
  },
  {
    id: "bagan-batu",
    name: "Bagan Batu",
    region: "Rokan Hilir, Riau",
    address: "Area cakupan PROXINET di Bagan Batu, Riau.",
    lat: 1.432,
    lng: 100.589,
    type: "coverage",
  },
  {
    id: "rokan-hilir",
    name: "Rokan Hilir",
    region: "Riau",
    address: "Area cakupan PROXINET di Rokan Hilir, Riau.",
    lat: 2.12,
    lng: 100.8,
    type: "coverage",
  },
  {
    id: "ujung-batu",
    name: "Ujung Batu",
    region: "Rokan Hulu, Riau",
    address: "Area cakupan PROXINET di Ujung Batu, Riau.",
    lat: 0.72,
    lng: 100.57,
    type: "coverage",
  },
  {
    id: "perawang",
    name: "Perawang",
    region: "Siak, Riau",
    address: "Area cakupan PROXINET di Perawang, Riau.",
    lat: 0.64,
    lng: 101.87,
    type: "coverage",
  },
  {
    id: "rengat",
    name: "Rengat",
    region: "Indragiri Hulu, Riau",
    address: "Area cakupan PROXINET di Rengat, Riau.",
    lat: -0.37,
    lng: 102.55,
    type: "coverage",
  },
  {
    id: "tembilahan",
    name: "Tembilahan",
    region: "Indragiri Hilir, Riau",
    address: "Area cakupan PROXINET di Tembilahan, Riau.",
    lat: -0.32,
    lng: 103.16,
    type: "coverage",
  },
  {
    id: "dumai",
    name: "Dumai",
    region: "Riau",
    address: "Area cakupan PROXINET di Dumai, Riau.",
    lat: 1.667,
    lng: 101.447,
    type: "coverage",
  },
  {
    id: "tanjung-uban",
    name: "Tanjung Uban",
    region: "Bintan, Kepulauan Riau",
    address: "Area cakupan PROXINET di Tanjung Uban, Kepulauan Riau.",
    lat: 1.083,
    lng: 104.23,
    type: "coverage",
  },
  {
    id: "tanjung-balai",
    name: "Tanjung Balai",
    region: "Karimun, Kepulauan Riau",
    address: "Area cakupan PROXINET di Tanjung Balai Karimun, Kepulauan Riau.",
    lat: 0.99,
    lng: 103.43,
    type: "coverage",
  },
  {
    id: "padang",
    name: "Padang",
    region: "Sumatera Barat",
    address: "Area cakupan PROXINET di Padang, Sumatera Barat.",
    lat: -0.95,
    lng: 100.354,
    type: "coverage",
  },
  {
    id: "jambi",
    name: "Jambi",
    region: "Jambi",
    address: "Area cakupan PROXINET di Jambi.",
    lat: -1.61,
    lng: 103.613,
    type: "coverage",
  },
  {
    id: "bengkulu",
    name: "Bengkulu",
    region: "Bengkulu",
    address: "Area cakupan PROXINET di Bengkulu.",
    lat: -3.8,
    lng: 102.265,
    type: "coverage",
  },
  {
    id: "jakarta",
    name: "DKI Jakarta",
    region: "DKI Jakarta",
    address: "Area cakupan PROXINET di DKI Jakarta.",
    lat: -6.208,
    lng: 106.845,
    type: "coverage",
  },
  {
    id: "tasikmalaya",
    name: "Tasikmalaya",
    region: "Jawa Barat",
    address: "Area cakupan PROXINET di Tasikmalaya, Jawa Barat.",
    lat: -7.327,
    lng: 108.22,
    type: "coverage",
  },
  {
    id: "banyuwangi",
    name: "Banyuwangi",
    region: "Jawa Timur",
    address: "Area cakupan PROXINET di Banyuwangi, Jawa Timur.",
    lat: -8.219,
    lng: 114.369,
    type: "coverage",
  },
  {
    id: "lumajang",
    name: "Lumajang",
    region: "Jawa Timur",
    address: "Area cakupan PROXINET di Lumajang, Jawa Timur.",
    lat: -8.133,
    lng: 113.225,
    type: "coverage",
  },
  {
    id: "situbondo",
    name: "Situbondo",
    region: "Jawa Timur",
    address: "Area cakupan PROXINET di Situbondo, Jawa Timur.",
    lat: -7.706,
    lng: 114.009,
    type: "coverage",
  },
  {
    id: "bondowoso",
    name: "Bondowoso",
    region: "Jawa Timur",
    address: "Area cakupan PROXINET di Bondowoso, Jawa Timur.",
    lat: -7.913,
    lng: 113.821,
    type: "coverage",
  },
  {
    id: "sidoarjo",
    name: "Sidoarjo",
    region: "Jawa Timur",
    address: "Area cakupan PROXINET di Sidoarjo, Jawa Timur.",
    lat: -7.447,
    lng: 112.718,
    type: "coverage",
  },
  {
    id: "bali",
    name: "Bali",
    region: "Bali",
    address: "Area cakupan PROXINET di Bali.",
    lat: -8.65,
    lng: 115.216,
    type: "coverage",
  },
];

function MapFocus({ location }: { location: Location | null }) {
  const map = useMap();

  useEffect(() => {
    if (location) {
      map.flyTo(
        [location.lat, location.lng],
        location.type === "office" ? 13 : 9,
        { duration: 1.2 }
      );
    }
  }, [location, map]);

  return null;
}

function createMarkerIcon(type: Location["type"]) {
  return L.divIcon({
    className: "",
    html: `
      <div style="
        width: ${type === "office" ? "20px" : "14px"};
        height: ${type === "office" ? "20px" : "14px"};
        background: ${type === "office" ? "#1749F5" : "#60A5FA"};
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(15, 23, 42, .35);
      "></div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
}

function createWhatsAppLink(location: Location) {
  const message =
    location.type === "office"
      ? `Halo PROXINET, saya ingin menghubungi ${location.name} yang berlokasi di ${location.region}. Mohon informasi lebih lanjut.`
      : `Halo PROXINET, saya ingin menanyakan ketersediaan layanan internet di wilayah ${location.name}, ${location.region}. Mohon informasi lebih lanjut.`;

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export default function LocationMap() {
  const [search, setSearch] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const [showResults, setShowResults] = useState(false);

  const filteredLocations = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) return [];

    return locations.filter(
      (location) =>
        location.name.toLowerCase().includes(keyword) ||
        location.region.toLowerCase().includes(keyword)
    );
  }, [search]);

  function selectLocation(location: Location) {
    setSelectedLocation(location);
    setSearch(location.name);
    setShowResults(false);
  }

  return (
    <section className="bg-white">
        {/* SECTION JUDUL DAN PENCARIAN */}
        <div className="px-5 pb-10 pt-14 sm:pb-12 sm:pt-32">
        <div className="mx-auto max-w-7xl">
            <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Temukan{" "}
                <span className="text-blue-600">PROXINET</span> di Area Anda
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
                Temukan lokasi kantor dan jangkauan layanan PROXINET
                untuk memenuhi kebutuhan konektivitas Anda.
            </p>
            </div>

            {/* SEARCH BAR */}
            <div className="relative mx-auto mt-7 max-w-xl">
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
                <svg
                viewBox="0 0 24 24"
                className="size-5 shrink-0 text-slate-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
                >
                <circle cx="10.8" cy="10.8" r="7.2" />
                <path d="m16 16 5 5" />
                </svg>

                <input
                value={search}
                onChange={(event) => {
                    setSearch(event.target.value);
                    setShowResults(true);
                }}
                onFocus={() => setShowResults(true)}
                onKeyDown={(event) => {
                    if (event.key === "Enter" && filteredLocations[0]) {
                    selectLocation(filteredLocations[0]);
                    }

                    if (event.key === "Escape") {
                    setShowResults(false);
                    }
                }}
                placeholder="Cari kota atau lokasi..."
                className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                />

                {search && (
                <button
                    type="button"
                    onClick={() => {
                    setSearch("");
                    setSelectedLocation(null);
                    setShowResults(false);
                    }}
                    className="text-xs font-semibold text-slate-400 transition hover:text-slate-700"
                >
                    Hapus
                </button>
                )}
            </div>

            {/* HASIL PENCARIAN */}
            {showResults && search.trim() && (
                <div className="absolute left-0 right-0 top-full z-[1000] mt-2 max-h-64 overflow-y-auto rounded-xl border border-slate-200 bg-white p-2 text-left shadow-xl">
                {filteredLocations.length > 0 ? (
                    filteredLocations.map((location) => (
                    <button
                        key={location.id}
                        type="button"
                        onClick={() => selectLocation(location)}
                        className="flex w-full items-start gap-3 rounded-lg px-3 py-3 text-left transition hover:bg-blue-50"
                    >
                        <span className="mt-1.5 size-2.5 shrink-0 rounded-full bg-blue-600" />

                        <span>
                        <span className="block text-sm font-semibold text-slate-800">
                            {location.name}
                        </span>

                        <span className="mt-0.5 block text-xs text-slate-500">
                            {location.region}
                        </span>

                        <span className="mt-1 block text-[11px] text-blue-600">
                            {location.type === "office"
                            ? "Kantor PROXINET"
                            : "Area cakupan"}
                        </span>
                        </span>
                    </button>
                    ))
                ) : (
                    <p className="px-3 py-4 text-center text-sm text-slate-500">
                    Lokasi tidak ditemukan. Coba nama kota atau wilayah lain.
                    </p>
                )}
                </div>
            )}
            </div>
        </div>
        </div>

        {/* SECTION PETA */}
        <div className="px-4 pb-16 sm:px-8 lg:px-10">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm">
            <div className="h-[430px] w-full sm:h-[520px] lg:h-[600px]">
            <MapContainer
                center={[-2.5, 115]}
                zoom={5}
                scrollWheelZoom
                zoomControl={true}
                className="z-0 h-full w-full"
            >
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MapFocus location={selectedLocation} />

                {locations.map((location) => (
                <Marker
                    key={location.id}
                    position={[location.lat, location.lng]}
                    icon={createMarkerIcon(location.type)}
                    ref={(marker) => {
                    if (
                        marker &&
                        selectedLocation?.id === location.id
                    ) {
                        marker.openPopup();
                    }
                    }}
                    eventHandlers={{
                    click: () => setSelectedLocation(location),
                    }}
                >
                    <Popup>
                    <div className="min-w-[220px]">
                        <p className="text-sm font-bold text-slate-900">
                        {location.name}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                        {location.region}
                        </p>

                        <p className="mt-3 text-xs leading-5 text-slate-700">
                        {location.address}
                        </p>

                        <a
                        href={createWhatsAppLink(location)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-700"
                        style={{ color: "#FFFFFF" }}
                        >
                        Hubungi PROXINET
                        </a>
                    </div>
                    </Popup>
                </Marker>
                ))}
            </MapContainer>
            </div>

            {/* LEGENDA PETA */}
            <div className="absolute bottom-4 left-4 z-[400] rounded-xl border border-slate-200 bg-white/95 p-3 shadow-md backdrop-blur-sm">
            <p className="mb-2 text-xs font-bold text-slate-800">
                Keterangan
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-600">
                <span className="size-3 rounded-full border-2 border-white bg-blue-700 shadow" />
                Kantor PROXINET
            </div>

            <div className="mt-2 flex items-center gap-2 text-xs text-slate-600">
                <span className="size-3 rounded-full border-2 border-white bg-blue-400 shadow" />
                Area cakupan
            </div>
            </div>

            {/* JUMLAH LOKASI */}
            <div className="absolute bottom-4 right-4 z-[400] rounded-xl border border-slate-200 bg-white/95 px-4 py-3 shadow-md backdrop-blur-sm">
            <p className="text-xs text-slate-500">
                Lokasi terdaftar
            </p>

            <p className="text-xl font-bold text-slate-900">
                {locations.length}
                <span className="ml-1 text-xs font-medium text-slate-500">
                wilayah
                </span>
            </p>
            </div>
        </div>
        </div>
    </section>
    );
}