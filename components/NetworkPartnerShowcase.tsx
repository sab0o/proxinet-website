
import PartnerLogoMarquee, {
  type PartnerLogo,
} from "@/components/PartnerLogoMarquee";

const networkPartners: PartnerLogo[] = [
  {
    name: "SOLNET",
    src: "/images/partners/solnet-logo.png",
  },
  {
    name: "Moratelindo",
    src: "/images/partners/moratelindo.png",
  },
  {
    name: "ION Partnership",
    src: "/images/partners/ion-partnership.png",
  },
  {
    name: "Fiberstar",
    src: "/images/partners/fiberstar.png",
  },
  {
    name: "Neucentrix",
    src: "/images/partners/neucentix.jpg",
  },
  {
    name: "Weave",
    src: "/images/partners/weave.png",
  },
  {
    name: "iForte",
    src: "/images/partners/iforte.png",
  },
  {
    name: "Biznet",
    src: "/images/partners/biznet.jpg",
  },
  {
    name: "XL Axiata",
    src: "/images/partners/xl.svg",
  },
  {
    name: "Mora Republic",
    src: "/images/partners/morerepublic.png",
  },
  {
    name: "Omni",
    src: "/images/partners/omni_dc_logo.jpg",
  },
  {
    name: "Omni Cloud",
    src: "/images/partners/Logo-Omnicloud.png",
  },
  {
    name: "Indosat",
    src: "/images/partners/indosat.png",
  },
  {
    name: "Lintasarta",
    src: "/images/partners/lintasarta.png",
  },
  {
    name: "Sol Media",
    src: "/images/partners/sol-media.jpg",
  },
];

export default function NetworkPartnerShowcase() {
  return (
    <PartnerLogoMarquee
      title="Rekanan & Mitra Jaringan"
      description="Bersinergi dengan ekosistem mitra untuk mendukung konektivitas dan pengembangan layanan PROXINET."
      logos={networkPartners}
      direction="right"
      variant="dark"
    />
  );
}
