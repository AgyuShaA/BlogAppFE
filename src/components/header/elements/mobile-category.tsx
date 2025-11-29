"use client";

import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { SheetClose } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";

interface MobileCategorySectionProps {
  category: string;
  items: { label: string; href: string }[];
  locale: string;
}

export function MobileCategorySection({
  category,
  items,
  locale,
}: MobileCategorySectionProps) {



  

  const [open, setOpen] = useState(false);
  const t = useTranslations("header");
  const pathname = usePathname();

  // Normalize pathname (remove locale prefix)
  const cleanedPath =
    pathname.replace(`/${locale}`, "") === ""
      ? "/"
      : pathname.replace(`/${locale}`, "");

  const isActive = (href: string) => cleanedPath === href;

  // NEW: Detect if any item inside is active
  const anyActive = items.some((item) => isActive(item.href));

  return (
    <Collapsible open={anyActive || open} onOpenChange={setOpen}>
      <CollapsibleTrigger
        className={`
          flex w-full items-center justify-between text-lg
          outline-none focus:outline-none focus-visible:outline-none
          active:bg-transparent select-none
          [tap-highlight-color:transparent]
          ${anyActive ? "text-red" : "text-gray-800"}
        `}
      >
        <span>{t(`nav.${category}`)}</span>
        <ChevronDown
          className={`h-5 w-5 transition-transform ${
            anyActive ? "rotate-180" : ""
          }`}
        />
      </CollapsibleTrigger>

      <CollapsibleContent className="mt-2 ml-2 space-y-2 animate-slideDown">
        {items.map((item, idx) => (
          <SheetClose asChild key={idx}>
            <Link
              href={`/${item.href}`}
              className={`block text-base ${
                isActive(item.href) ? "text-red" : "text-gray-600"
              }`}
            >
              {t(`categories.${item.label}`)}
            </Link>
          </SheetClose>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
