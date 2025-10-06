"use client";

import React from "react";

import { ArrowDownIcon } from "@/assets/icons/arrow-down";
import { SearchIcon } from "@/assets/icons/search";
import { StoreIcon } from "@/assets/icons/store";
import useWindowSize from "@/hooks/UseWindowsSize";
import Link from "next/link";
import { LogoIconWithText } from "../../../public/header/logo";

interface HeaderProps {
  locale: string;
}

const Header: React.FC<HeaderProps> = ({ locale }) => {
  const { isMobile } = useWindowSize();
  console.log(locale);
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

        {/* Cart */}
        <button className="flex items-center gap-2 h-[40px] md:h-[50px] px-6 bg-[#212C34] text-white rounded">
          <div className="relative">
            <StoreIcon />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-[12px] font-light">
              <span className="translate-y-[1px]">0</span>
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
        {["Ceramic", "Wood", "catalog", "About us"].map((item, idx) => (
          <div
            key={idx}
            className="relative w-[130px] h-[54px] flex items-center justify-center"
          >
            <Link
              href={"/catalog"}
              className="text-[16px] w-full text-[#282828] font-normal"
            >
              {item}
            </Link>

            <ArrowDownIcon />
          </div>
        ))}

        {/* Contact Button */}
        <div className="relative w-[126px] h-[38px]">
          <button className="absolute w-[126px] h-[38px] left-0 top-0 border-2 border-red-600 rounded-[4px] flex items-center justify-center text-red-600 text-[16px]">
            Contact us
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
