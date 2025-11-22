import { Breadcrumbs } from "@/components/bread-scrums/bread-scrums";
import type { Metadata } from "next";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
  title: "Returns Policy | Dimora Shop",
};

export const dynamic = "force-static";

export default function ReturnsPolicyPage() {
  const t = useTranslations("returns");

  return (
    <main className="mx-auto max-w-7xl px-[5%] md:px-[2%] py-10 space-y-8">
      <Breadcrumbs />

      <h1 className="text-3xl font-semibold mb-4">{t("title")}</h1>

      <section className="space-y-4">
        <p className="leading-relaxed">{t("p1")}</p>
        <p className="leading-relaxed">{t("p2")}</p>
        <p className="leading-relaxed">{t("p3")}</p>
        <p className="leading-relaxed">{t("p4")}</p>
        <p className="leading-relaxed">{t("p5")}</p>
        <p className="leading-relaxed">{t("p6")}</p>
        <p className="leading-relaxed">{t("p7")}</p>
        <p className="leading-relaxed">{t("p8")}</p>
        <p className="leading-relaxed font-medium">{t("p9")}</p>
      </section>
    </main>
  );
}
