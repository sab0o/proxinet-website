
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "leaflet/dist/leaflet.css";
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
    </body>
  </html>
);
}
