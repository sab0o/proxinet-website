
import PartnerLogoMarquee, {
  type PartnerLogo,
} from "@/components/PartnerLogoMarquee";

const customerLogos: PartnerLogo[] = [
  {
    name: "RS Awal Bros",
    src: "/images/customers/awalbros.jpg",
  },
  {
    name: "Polda Kepri",
    src: "/images/customers/logo-polri-kepri.png",
  },
  {
    name: "RS Bhayangkara",
    src: "/images/customers/logo-rs-bhayangkara.jpg",
  },
  {
    name: "Diskominfo Kota Batam",
    src: "/images/customers/diskominfo-batam.jpg",
  },
  {
    name: "Dishub Kota Batam",
    src: "/images/customers/dishub-batam.jpg",
  },
  {
    name: "Meisterstadt Batam",
    src: "/images/customers/meisterstadt.png",
  },
  {
    name: "Baloi Apartment",
    src: "/images/customers/baloiapartment.png",
  },
  {
    name: "Rusun Pemko",
    src: "/images/customers/logo-pemko.jpg",
  },
  {
    name: "RS Embung Fatimah",
    src: "/images/customers/embung-fatimah.png",
  },
  {
    name: "Rusun BP Batam",
    src: "/images/customers/logo-bp.png",
  },
  {
    name: "Sanford",
    src: "/images/customers/sanford.png",
  },
  {
    name: "VME",
    src: "/images/customers/VME.svg",
  },
  {
    name: "Mega Vape",
    src: "/images/customers/megavape.png",
  },
];

export default function CustomerShowcase() {
  return (
    <PartnerLogoMarquee
      title="Referensi Pelanggan"
      description="Berbagai instansi dan perusahaan telah mempercayakan kebutuhan konektivitas mereka kepada PROXINET."
      logos={customerLogos}
      direction="left"
      variant="light"
    />
  );
}
