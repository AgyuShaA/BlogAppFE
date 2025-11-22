"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { ChevronRight } from "lucide-react";

interface IProps {
  className?: string;
}

export const Breadcrumbs = ({ className }: IProps) => {
  const pathname = usePathname();
  const t = useTranslations("breadcrumbs");

  const segments = pathname
    .split("/")
    .filter(Boolean)
    .filter((seg) => !["en", "nl"].includes(seg));

  const paths = segments.map((segment, idx) => ({
    name: t(segment) || segment,
    href: "/" + segments.slice(0, idx + 1).join("/"),
  }));

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center gap-[2%]  text-gray-500 text-[16px] leading-[26px] font-dm-sans py-5 w-full ${className}`}
    >
      {/* Home */}
      <Link
        href="/"
        className="text-gray-500 hover:text-gray-800 transition-colors"
      >
        {t("home")}
      </Link>

      {paths.map((p, idx) => (
        <div key={p.href} className="flex items-center gap-2">
          <ChevronRight size={14} className="text-gray-400" />
          <Link
            href={p.href}
            className={`${
              idx === paths.length - 1
                ? "text-[#282828] font-medium"
                : "text-gray-500 hover:text-gray-800"
            } transition-colors`}
          >
            {p.name.charAt(0).toUpperCase() + p.name.slice(1)}
          </Link>
        </div>
      ))}
    </nav>
  );
};
