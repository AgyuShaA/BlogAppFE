"use client";

import { StoreIcon } from "@/assets/icons/store";
import Image from "next/image";
import { useCartStore } from "@/store/useCartStore";
import { useTranslations } from "next-intl";
import { Tile } from "@/types/types";
import { useRouter } from "@/i18n/navigation";

interface TileCardProps {
  tile: Tile;
}

export const TileCard = ({ tile }: TileCardProps) => {
  const { addToCart, removeFromCart, isInCart } = useCartStore();
  const tn = useTranslations("names");
  const router = useRouter();

  const inCart = isInCart(tile.id);

  return (
    <div
      key={tile.id}
      onClick={() => router.push(`/catalog/${tile.name}`)}
      className="flex cursor-pointer flex-col border p-4 max-h-[500px] md:w-[230px] lg:w-[283px] w-[255px] border-gray-300 rounded shadow-sm"
    >
      {/* Tile Image fills width */}
      {tile.imageUrl && (
        <div className="flex w-full min-h-[250px] items-center justify-center">
          <Image
            src={tile.imageUrl}
            alt={tile.name}
            width={250}
            height={250}
            quality={100}
            className="object-contain border-1 border-amber-50"
          />
        </div>
      )}

      {/* Tile Name */}
      <h4 className="mt-2 flex gap-2 font-sans px-2 font-semibold text-base text-[#282828]">
        {tn(tile.name)}
      </h4>

      {/* Info Row */}
      <div className="w-full mt-2 px-2">
        {tile.sizes && (
          <div className="flex w-full mt-2 px-2 flex-row gap-2">
            {tile.sizes.slice(0, 2).map((i, idx) => (
              <div
                key={idx}
                className="flex-1 border border-gray-200 rounded px-2 py-1 text-center text-sm text-gray-600"
              >
                {i.size.name}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Colors */}
      {tile.colors && tile.colors.length > 0 ? (
        <div className="flex gap-2 mt-2 px-2">
          {tile.colors.map((c) => (
            <span
              key={c.color.id}
              className="w-5 h-5 rounded border border-gray-200"
              style={{ backgroundColor: c.color.hex }}
              title={c.color.name}
            />
          ))}
        </div>
      ) : (
        <span className="w-5 h-5 mt-2 px-2" />
      )}

      {/* Action Buttons */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          if (inCart) {
            removeFromCart(tile.id);
          } else {
            addToCart(tile.id);
          }
        }}
        className="flex hover:bg-gray-900/70 cursor-pointer mt-2 items-center justify-center mb-2 w-[99%] h-[42px] bg-gray-900 text-white rounded text-sm font-medium self-center"
      >
        {inCart ? (
          <>{tn("removeFromCart")}</>
        ) : (
          <>
            <StoreIcon />
            {tn("addToCart")}
          </>
        )}
      </button>
    </div>
  );
};
