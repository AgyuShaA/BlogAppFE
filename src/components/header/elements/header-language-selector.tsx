"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { routing } from "@/i18n/routing";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export function HeaderLanguageSelector({ locale }: { locale: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("header");

  const handleLocale = (loc: string) => {
    router.replace(pathname, { locale: loc });
  };

  return (
    <div className="hidden md:flex items-center">
      <Select value={locale} onValueChange={handleLocale}>
        <SelectTrigger className="w-fit border-gray-400 bg-transparent">
          <SelectValue placeholder={t(`languages.short.${locale}`)} />
        </SelectTrigger>

        <SelectContent className="w-fit">
          {routing.locales.map((loc) => (
            <SelectItem key={loc} value={loc} className="text-center">
              {t(`languages.short.${loc}`)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
