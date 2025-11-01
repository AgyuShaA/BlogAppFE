import FirstSection from "@/components/MainPage/FirstSection/FirstSection";

import SecondSection from "@/components/MainPage/second-section/second-section";
import AboutSection from "@/components/MainPage/about-section/about-section";
import WhyUs from "@/components/MainPage/why-us/why-us";

export const dynamic = "force-static";

export default function HomePage() {
  return (
    <div className="relative">
      <FirstSection />
      <SecondSection />
      <AboutSection />
      <WhyUs />
    </div>
  );
}
