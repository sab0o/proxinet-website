
"use client";

import Image from "next/image";

export type PartnerLogo = {
  name: string;
  src: string;
};

type PartnerLogoMarqueeProps = {
  title: string;
  description: string;
  logos: PartnerLogo[];
  direction?: "left" | "right";
  variant?: "light" | "dark";
};

export default function PartnerLogoMarquee({
  title,
  description,
  logos,
  direction = "left",
  variant = "light",
}: PartnerLogoMarqueeProps) {
  const isDark = variant === "dark";

  if (logos.length === 0) return null;

  return (
    <section
      className={`overflow-hidden py-8 sm:py-9 lg:py-10 ${
        isDark ? "bg-[#173B5C] text-white" : "bg-white text-slate-900"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
            {title}
          </h2>

          <p
            className={`mt-3 text-sm leading-6 sm:text-base ${
              isDark ? "text-slate-300" : "text-slate-500"
            }`}
          >
            {description}
          </p>
        </div>
      </div>

      {/* AREA CAROUSEL */}
      <div
        className="group relative w-full overflow-hidden"
        aria-label={title}
      >
        {/* Gradasi di kedua ujung */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-10 sm:w-20 ${
            isDark
              ? "bg-gradient-to-r from-[#173B5C] to-transparent"
              : "bg-gradient-to-r from-white to-transparent"
          }`}
        />

        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-10 sm:w-20 ${
            isDark
              ? "bg-gradient-to-l from-[#173B5C] to-transparent"
              : "bg-gradient-to-l from-white to-transparent"
          }`}
        />

        <div
          className={`flex w-max ${
            direction === "left"
              ? "animate-logo-marquee-left"
              : "animate-logo-marquee-right"
          } group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]`}
        >
          {/* Dua set identik agar animasi dapat berulang */}
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="flex shrink-0 items-center gap-10 px-5 sm:gap-16 sm:px-8 lg:gap-20"
              aria-hidden={copy === 1}
            >
              {logos.map((logo, index) => (
                <div
                  key={`${copy}-${logo.src}-${index}`}
                  className="flex h-20 w-32 shrink-0 items-center justify-center sm:h-24 sm:w-40 lg:h-28 lg:w-48"
                >
                  <Image
                    src={logo.src}
                    alt={copy === 0 ? logo.name : ""}
                    width={192}
                    height={112}
                    draggable={false}
                    sizes="(max-width: 640px) 128px, (max-width: 1024px) 160px, 192px"
                    className={`max-h-full max-w-full object-contain transition duration-300 ${
                      isDark
                        ? "brightness-0 invert opacity-80 hover:opacity-100"
                        : "opacity-80 hover:opacity-100"
                    }`}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
