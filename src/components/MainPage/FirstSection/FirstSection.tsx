import Image from "next/image";
import { useTranslations } from "next-intl";
import { useContactModalStore } from "@/store/useContactStore";
import Button from "@/components/button";

const FirstSection = () => {
  const t = useTranslations("firstSection");

  return (
    <section className="relative w-full px-[5%] md:px-[2%]">
      {/* Heading */}
      <h1 className="text-[20px] text-[#282828] font-normal leading-[29px] mb-4">
        {t("heading")}
      </h1>

      {/* Background image with gradient */}
      <div className="relative w-full rounded-[4px] overflow-hidden">
        <Image
          src="/main-page/1.webp"
          alt="Background"
          width={1280}
          height={600}
          className="object-contain hidden md:block"
        />
        <Image
          src="/main-page/1.webp"
          alt="Background"
          width={1280}
          height={600}
          className="object-cover md:hidden block w-full h-[400px]"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black rounded-b-[4px]" />

        {/* Content over background */}
        <div className="absolute bottom-4 md:bottom-6 border-l-amber-200 md:left-8 left-4 right-4 flex flex-col md:flex-row items-start md:items-center justify-between md:gap-12 gap-4">
          {/* Text block */}
          <div className="flex flex-col text-white border-l-4 border-[#CB2021] pl-4">
            <h2 className="text-lg md:text-lg leading-[22px] font-normal md:font-thin mb-2">
              {t("subtitle")}
            </h2>
            <p className="text-lg font-bold max-w-[14rem] sm:max-w-[100rem] md:font-normal md:text-2xl leading-[46px]">
              {t("description")}
            </p>
          </div>

          <Button translationsKey="firstSection" labelKey="button" />
        </div>
      </div>
    </section>
  );
};

export default FirstSection;
