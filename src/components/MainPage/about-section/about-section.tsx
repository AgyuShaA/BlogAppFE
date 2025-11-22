import Image from "next/image";

import { useTranslations } from "next-intl";
import Button from "@/components/button";
import { Link } from "@/i18n/navigation";

const AboutSection = () => {
  const t = useTranslations("aboutSection");

  return (
    <section className="relative w-full px-[5%] md:px-[2%] py-16">
      <div className="flex flex-col lg:flex-row gap-12 items-center w-full">
        <div className="w-full lg:w-1/2">
          <h3 className="text-lg text-[#581010] mb-2">{t("subtitle")}</h3>
          <h2 className="text-3xl md:text-4xl font-normal text-[#581010] leading-snug mb-6">
            {t("title")}
          </h2>
          <p className="text-base text-[#282828] leading-relaxed mb-8">
            {t("description")}
          </p>

          {/* Buttons */}
          <div className="flex gap-4">
            <div className="flex gap-4">
              <Button translationsKey="aboutSection" labelKey="requestPrice" />
              <Button
                translationsKey="aboutSection"
                labelKey="getInTouch"
                className="bg-white !text-[#CB2021] border-2 border-[#CB2021] hover:bg-gray-100"
              />
            </div>
          </div>
        </div>

        {/* Right side image with overlay */}
        <div className="relative h-[330px] w-full lg:w-1/2 rounded-lg overflow-hidden">
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 z-10" />

          {/* Background image */}
          <Image
            src="/main-page/about-us-photo.webp"
            alt="catalog"
            fill
            className="object-cover"
          />

          {/* Overlay text */}
          <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-col md:flex-row md:items-end md:justify-between gap-5 md:gap-0">
            <div className="border-l-4 border-[#CB2021] pl-4">
              <h3 className="text-sm md:text-base text-white mb-1">
                {t("browseText")}
              </h3>
              <h2 className="text-2xl md:text-3xl text-white font-normal">
                <Link href={"/catalog"}>{t("catalogTitle")}</Link>
              </h2>
            </div>
            <a
              href="#"
              className="px-6 py-2 bg-[#F03939] text-white rounded-md text-sm hover:bg-[#c91e1e] transition self-start md:self-auto"
            >
              {t("goToCatalog")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
