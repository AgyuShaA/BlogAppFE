"use client";
import { useContactModalStore } from "@/store/useContactStore";
import { useTranslations } from "next-intl";
import React from "react";

interface ButtonProps {
  labelKey: string;
  translationsKey: string;
  className?: string;
}

export default function Button({
  labelKey,
  translationsKey,
  className = "",
}: ButtonProps) {
  const { toggle } = useContactModalStore();
  const t = useTranslations(translationsKey);
  const combinedClassName = `cursor-pointer hover:bg-[#CB2021]/80 flex items-center justify-center bg-[#CB2021] text-white h-[42px] rounded-[4px] md:px-6 px-4 ${className}`;

  return (
    <button onClick={toggle} className={combinedClassName}>
      <span className="md:text-md text-sm leading-[26px]">{t(labelKey)}</span>
    </button>
  );
}
