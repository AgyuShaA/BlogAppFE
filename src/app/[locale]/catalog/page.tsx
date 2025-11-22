import { Breadcrumbs } from "@/components/bread-scrums/bread-scrums";
import TileFilters from "@/components/catalog/tile-filters";
import { TileList } from "@/components/catalog/tile-list";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const revalidate = 600;

export default async function CatalogPage() {
  return (
    <div className="max-w-[1280px]  w-full ">
      <Breadcrumbs className="px-[5%] md:px-[2%]" />

      <div className="relative flex md:flex-row px-[2%] flex-col">
        <div className="hidden lg:block">
          <TileFilters />
        </div>

        <TileList />
      </div>
    </div>
  );
}
