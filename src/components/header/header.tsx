"use client";

import React, { useRef, useState } from "react";

import { ArrowDownIcon } from "@/assets/icons/arrow-down";
import { SearchIcon } from "@/assets/icons/search";
import { StoreIcon } from "@/assets/icons/store";
import useWindowSize from "@/hooks/UseWindowsSize";
import Link from "next/link";
import { LogoIconWithText } from "../../../public/header/logo";
import { useCartStore } from "@/store/useCartStore";
import { CartSidebar } from "../sidebar/sidebar";
import { useRouter } from "next/navigation";
import { routing } from "@/i18n/routing";
import { useTranslations } from "next-intl";

interface HeaderProps {
  locale: string;
}

const Header: React.FC<HeaderProps> = ({ locale }) => {
  const { isMobile } = useWindowSize();
  const { items } = useCartStore();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const t = useTranslations();

  const handleLocaleChange = (loc: "en" | "nl") => {
    router.push(`/${loc}`);
  };
  const dropdownRef = useRef<HTMLUListElement>(null);

  return (
    <header className=" mx-auto sticky   top-0 h-[172px] flex flex-col gap-5 ">
      <div className="relative flex items-center justify-between gap-2 h-[74px] px-[5%] md:px-[2%]">
        {/* Logo */}
        <div className="flex items-center h-[50px]">
          <Link href={"/"}>
            <LogoIconWithText
              width={isMobile ? 160 : 189}
              height={isMobile ? 50 : 50}
            />
          </Link>
        </div>

        {/* Search */}
        <div className="relative w-full hidden md:block max-w-[60%] h-[50px]">
          <input
            type="text"
            placeholder="Search our collections"
            className="w-full h-full pl-4 pr-12 rounded-[4px] bg-[#F3F3F3] outline-none text-gray-700"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
            <SearchIcon />
          </div>
        </div>
        <div className="relative flex flex-col gap-4 md:items-end">
          <button
            onClick={() => setOpen(!open)}
            className="text-small relative inline-flex h-10 cursor-pointer items-center gap-2 rounded-md border-2 border-gray-400 bg-transparent px-4 font-normal text-grey outline-none"
          >
            <span className="max-w-full truncate text-black">
              {t("language")}
            </span>
            <span className="ml-2 transition-transform duration-200 text-gray-400">
              {open ? "▲" : "▼"}
            </span>
          </button>

          <ul
            ref={dropdownRef}
            className={`absolute top-full z-10 w-36 origin-bottom border-1 border-gray-300 transform rounded-md bg-white shadow-lg transition-all duration-300 ease-out ${
              open
                ? "translate-y-1 opacity-100"
                : "pointer-events-none -translate-2-2 opacity-0"
            }`}
          >
            {routing.locales.map((loc) => (
              <li key={loc}>
                <button
                  className="block  py-2 text-black hover:bg-gray-200 w-full"
                  onClick={() => {
                    handleLocaleChange(loc);
                    setOpen(false);
                  }}
                >
                  {loc === "en"
                    ? "English"
                    : loc === "nl"
                    ? "Нідерландська"
                    : loc}
                </button>
              </li>
            ))}
          </ul>
        </div>
        {/* Cart */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex cursor-pointer items-center gap-2 h-[40px] md:h-[50px] px-6 bg-[#212C34] text-white rounded"
        >
          <div className="relative">
            <StoreIcon />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-[12px] font-light">
              <span className="translate-y-[1px]">{items.length}</span>
            </div>
          </div>
          <span>Cart</span>
        </button>
      </div>
      <div className="relative w-full blcok md:hidden  flex items-center justify-center">
        <input
          type="text"
          placeholder="Search our collections"
          className="w-[90%]  h-[40px] pl-4 pr-4 rounded-[4px] bg-[#F3F3F3] outline-none text-gray-700"
        />
        <div className="absolute right-10  top-1/2 -translate-y-1/2 text-gray-500">
          <SearchIcon />
        </div>
      </div>

      {/* Navigation */}
      <nav className=" justify-between h-[54px] hidden md:flex px-[5%] md:px-[2%] ">
        {["Ceramic", "Wood"].map((item, idx) => (
          <div
            key={idx}
            className="relative w-[130px] h-[54px] flex items-center justify-center"
          >
            <span className="text-[16px] w-full text-[#282828] font-normal">
              {item}
            </span>

            <ArrowDownIcon />
          </div>
        ))}
        s
        {["Catalog", "About us"].map((item, idx) => (
          <div
            key={idx}
            className="relative w-[130px] h-[54px] flex items-center justify-center"
          >
            <Link
              href={idx === 0 ? "/catalog" : "/about"}
              className="text-[16px] w-full text-[#282828] font-normal"
            >
              {item}
            </Link>
          </div>
        ))}
        {/* Contact Button */}
        <div className="relative w-[126px] h-[38px]">
          <button className="absolute w-[126px] h-[38px] left-0 top-0 border-2 border-red-600 rounded-[4px] flex items-center justify-center text-red-600 text-[16px]">
            Contact us
          </button>
        </div>
      </nav>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
};

export default Header;
