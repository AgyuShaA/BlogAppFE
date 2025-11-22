"use client";

import { Button } from "@/components/ui/button";
import { StoreIcon } from "@/assets/icons/store";
import { CartSidebar } from "@/components/sidebar/sidebar";

export function HeaderCartButton({
  itemsCount,
  onClick,
}: {
  itemsCount: number;
  onClick: () => void;
}) {
  return (
    <>
      <CartSidebar
        trigger={
          <Button
            onClick={onClick}
            className="flex cursor-pointer items-center gap-2 h-[50px] px-6 bg-[#212C34] text-white hover:bg-[#2c3942]"
          >
            <div className="relative">
              <StoreIcon />

              {/* Cart counter badge */}
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-[12px] font-medium leading-none">
                {itemsCount}
              </div>
            </div>
            <span>Cart</span>
          </Button>
        }
      />
    </>
  );
}
