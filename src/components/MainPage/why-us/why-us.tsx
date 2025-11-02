"use client";

import { useTranslations } from "next-intl";
import { Car } from "@/assets/icons/car";
import { ClockIcon } from "@/assets/icons/clock";
import { DirectIcon } from "@/assets/icons/direct";
import { SafeIcon } from "@/assets/icons/safe";

const WhyUs = () => {
  const t = useTranslations("whyUs");

  const icons = [<SafeIcon />, <Car />, <DirectIcon />, <ClockIcon />];
  const cards = t.raw("cards") as { title: string; description: string }[];

  return (
    <section className="w-full px-5 md:px-10 py-16">
      <h2 className="text-3xl font-normal text-[#282828] mb-12">
        {t("title")}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:min-h-[340px]">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="bg-white border-2 rounded-sm justify-center border-[#DDDDDD] p-6 flex flex-col items-center text-center"
          >
            <span className="mb-4">{icons[idx]}</span>
            <h3 className="font-bold text-lg mb-2">{card.title}</h3>
            <p className="text-sm text-[#000] max-w-[11rem] leading-7">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyUs;
