import type { Metadata } from "next";
import "./globals.css";
import "leaflet/dist/leaflet.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsapp";
import ScrollMotion from "@/components/ScrollMotion";

export const metadata: Metadata = {
  title: "PROXINET | Connecting The World",
  description:
    "Temukan layanan internet PROXINET untuk kebutuhan rumah, bisnis, pendidikan, dan kemitraan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingWhatsApp />
        <ScrollMotion />
      </body>
    </html>
  );
}
