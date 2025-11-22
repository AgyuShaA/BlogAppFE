"use client";

import { Link } from "@/i18n/navigation";
import { LogoIconWithText } from "../../../../public/header/logo";

export function HeaderLogo({ isMobile }: { isMobile: boolean }) {
  return (
    <div className="flex items-center h-[50px]">
      <Link href="/">
        <LogoIconWithText width={isMobile ? 160 : 189} height={50} />
      </Link>
    </div>
  );
}
