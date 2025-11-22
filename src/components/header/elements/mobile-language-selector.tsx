"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { routing } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";

export function MobileLanguageSelector({ locale }: { locale: string }) {
  const t = useTranslations("header");
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (loc: string) => {
    router.replace(pathname, { locale: loc });
  };

  return (
    <div className="mt-4">
      <Select value={locale} onValueChange={handleChange}>
        <SelectTrigger className="w-full border border-gray-300">
          <SelectValue placeholder={t(`languages.${locale}`)} />
        </SelectTrigger>

        <SelectContent>
          {routing.locales.map((loc) => (
            <SelectItem key={loc} value={loc}>
              {t(`languages.${loc}`)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
