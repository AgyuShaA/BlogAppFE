import FirstSection from "@/components/MainPage/FirstSection/FirstSection";

import SecondSection from "@/components/MainPage/second-section/second-section";
import AboutSection from "@/components/MainPage/about-section/about-section";
import WhyUs from "@/components/MainPage/why-us/why-us";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";

export const dynamic = "force-static";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <div className="relative">
      <FirstSection />
      <SecondSection />
      <AboutSection />
      <WhyUs />
    </div>
  );
}
