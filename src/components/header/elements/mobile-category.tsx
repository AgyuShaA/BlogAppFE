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

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="flex w-full items-center justify-between text-lg text-gray-800">
        <span>{t(`nav.${category}`)}</span>
        <ChevronDown
          className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </CollapsibleTrigger>

      <CollapsibleContent className="mt-2 ml-4 space-y-2 animate-slideDown">
        {items.map((item) => (
          <Link
            href={`/${locale}${item.href}`}
            key={item.href}
            className="block text-base text-gray-600"
          >
            {t(`categories.${item.label}`)}
          </Link>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
