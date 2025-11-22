import AboutSection from "@/components/about/about";
import { Breadcrumbs } from "@/components/bread-scrums/bread-scrums";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
export const dynamic = "force-static";

export default async function CatalogPage() {
  return (
    <div className="max-w-7xl w-full px-[5%] md:px-[2%]">
      <Breadcrumbs />
      <AboutSection />
    </div>
  );
}
