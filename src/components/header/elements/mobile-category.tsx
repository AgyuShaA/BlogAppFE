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

interface MobileCategorySectionProps {
  category: string;
  items: { label: string; href: string }[];
}

export function MobileCategorySection({
  category,
  items,
}: MobileCategorySectionProps) {
  const [open, setOpen] = useState(false);
  const t = useTranslations("header");

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger
        className="
          flex w-full items-center justify-between text-lg text-gray-800
          outline-none 
          focus:outline-none 
          focus-visible:outline-none
          active:bg-transparent
          select-none
          [tap-highlight-color:transparent]
        "
      >
        <span>{t(`nav.${category}`)}</span>
        <ChevronDown
          className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </CollapsibleTrigger>

      <CollapsibleContent className="mt-2 ml-2 space-y-2 animate-slideDown">
        {items.map((item, idx) => (
          <SheetClose asChild key={idx}>
            <Link
              href={`/${item.href}`}
              className="block text-base text-gray-600"
            >
              {t(`categories.${item.label}`)}
            </Link>
          </SheetClose>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
