"use client";

export default function FloatingWhatsApp() {
  const phoneNumber = "628117041659";

  const message =
    "Halo PROXINET, saya ingin mengetahui informasi lebih lanjut mengenai layanan internet PROXINET.";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat WhatsApp PROXINET"
      className="fixed bottom-6 right-6 z-[100] isolate inline-flex items-center gap-2 overflow-visible rounded-full bg-[#1539B7] px-5 py-3.5 text-sm font-semibold !text-white shadow-lg shadow-blue-900/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#102F9B] hover:shadow-xl sm:bottom-8 sm:right-8"
    >
      {/* PULSE EFFECT */}
    <span className="absolute inset-0 -z-10 rounded-full bg-[#1539B7] animate-[soft-pulse_3s_ease-out_infinite]" />
      {/* WHATSAPP ICON */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="white"
        className="size-5 shrink-0"
        aria-hidden="true"
      >
        <path d="M12.04 2a9.91 9.91 0 0 0-8.45 15.1L2.3 21.7l4.73-1.24A9.91 9.91 0 1 0 12.04 2Zm0 18.1a8.14 8.14 0 0 1-4.15-1.14l-.3-.18-2.8.73.75-2.73-.2-.31a8.15 8.15 0 1 1 6.7 3.63Zm4.47-6.1c-.25-.13-1.47-.73-1.7-.81-.23-.09-.39-.13-.56.13-.17.25-.64.81-.79.98-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.75-.67-1.26-1.49-1.4-1.74-.15-.25-.02-.39.11-.52.11-.11.25-.29.38-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.55-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.09s.9 2.43 1.03 2.6c.12.17 1.77 2.7 4.29 3.79.6.26 1.07.42 1.44.54.61.19 1.16.16 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.29Z" />
      </svg>

      <span>Butuh Bantuan?</span>
    </a>
  );
}