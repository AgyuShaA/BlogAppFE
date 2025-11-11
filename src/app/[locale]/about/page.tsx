import AboutSection from "@/components/about/about";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function CatalogPage() {
  return (
    <div>
      <AboutSection />
    </div>
  );
}
