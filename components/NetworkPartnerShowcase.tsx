
import PartnerLogoMarquee, {
  type PartnerLogo,
} from "@/components/PartnerLogoMarquee";

const networkPartners: PartnerLogo[] = [
  { name: "SOLNET", src: "/images/partners/solnet-logo.png" },
  { name: "Moratelindo", src: "/images/partners/moratelindo.png" },
  { name: "ION Partnership", src: "/images/partners/ion-partnership.png" },
  { name: "Fiberstar", src: "/images/partners/fiberstar.png" },
  { name: "Neucentrix", src: "/images/partners/neucentix.jpg" },
  { name: "Weave", src: "/images/partners/weave.png" },
  { name: "iForte", src: "/images/partners/iforte.png" },
  { name: "Biznet", src: "/images/partners/biznet.jpg" },
  { name: "XL Axiata", src: "/images/partners/xl.svg" },
  { name: "Mora Republic", src: "/images/partners/morerepublic.png" },
  { name: "Omni Data Center", src: "/images/partners/omni_dc_logo.jpg" },
  { name: "Omni Cloud", src: "/images/partners/Logo-Omnicloud.png" },
  { name: "Indosat", src: "/images/partners/indosat.png" },
  { name: "Lintasarta", src: "/images/partners/lintasarta.png" },
  { name: "Sol Media", src: "/images/partners/sol-media.jpg" },
];

const customerLogos: PartnerLogo[] = [
  { name: "RS Awal Bros", src: "/images/customers/awalbros.jpg" },
  { name: "Polda Kepri", src: "/images/customers/logo-polri-kepri.png" },
  { name: "RS Bhayangkara", src: "/images/customers/logo-rs-bhayangkara.jpg" },
  { name: "Diskominfo Kota Batam", src: "/images/customers/diskominfo-batam.jpg" },
  { name: "Dishub Kota Batam", src: "/images/customers/dishub-batam.jpg" },
  { name: "Meisterstadt Batam", src: "/images/customers/meisterstadt.png" },
  { name: "Baloi Apartment", src: "/images/customers/baloiapartment.png" },
  { name: "Rusun Pemko", src: "/images/customers/logo-pemko.jpg" },
  { name: "RS Embung Fatimah", src: "/images/customers/embung-fatimah.png" },
  { name: "Rusun BP Batam", src: "/images/customers/logo-bp.png" },
  { name: "Sanford", src: "/images/customers/sanford.png" },
  { name: "VME", src: "/images/customers/VME.svg" },
  { name: "Mega Vape", src: "/images/customers/megavape.png" },
];

export default function NetworkPartnerShowcase() {
  return (
    <section className="overflow-hidden bg-white py-8 sm:py-10">
      <div className="mx-auto mb-2 max-w-7xl px-5 text-center sm:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Dipercaya oleh Berbagai Mitra dan Pelanggan
        </h2>

        <p className="mx-auto mt-2 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
          Berkolaborasi dengan penyedia jaringan dan berbagai organisasi
          untuk menghadirkan konektivitas yang andal bagi kebutuhan digital.
        </p>
      </div>

      <div className="-mt-8 space-y-0 sm:-mt-12">
        {/* Rekanan dan mitra: bergerak ke kiri */}
        <PartnerLogoMarquee
          title=""
          description=""
          logos={networkPartners}
          direction="right"
          variant="light"
        />

        {/* Pelanggan: bergerak ke kanan */}
        <PartnerLogoMarquee
          title=""
          description=""
          logos={customerLogos}
          direction="left"
          variant="light"
        />
      </div>
    </section>
  );
}
