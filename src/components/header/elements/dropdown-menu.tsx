"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useTranslations } from "next-intl";

import { ArrowDownIcon } from "@/assets/icons/arrow-down";
import { Link } from "@/i18n/navigation";

interface CategoryDropdownProps {
  category: "ceramic" | "wood"; // extend as needed
  items: { label: string; href: string }[];
}

export function CategoryDropdown({ category, items }: CategoryDropdownProps) {
  const t = useTranslations();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative w-[130px] h-[54px] flex items-center justify-between cursor-pointer">
          <span className="text-[16px]  font-normal">
            {t(`nav.${category}`)}
          </span>

          <ArrowDownIcon />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="min-w-[180px]">
        {items.map((item) => (
          <DropdownMenuItem key={item.href} asChild>
            <Link className="cursor-pointer!" href={item.href}>
              {item.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
