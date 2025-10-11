import { Portal } from "./portal";
import { useCartStore } from "@/store/useCartStore";
import { useTileStore } from "@/store/useTileStore";
import Image from "next/image";
import { Figtree } from "next/font/google";
import { CallIcon } from "@/assets/icons/call-icon";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}
const figtree = Figtree({ subsets: ["latin"], weight: "300" });

export const CartSidebar = ({ isOpen, onClose }: CartSidebarProps) => {
  const items = useCartStore((state) => state.items);

  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

  const tiles = useTileStore((state) => state.tiles);

  const cartItems = items
    .map((cartItem) => ({
      ...tiles.find((t) => t.id === cartItem.id)!,
      quantity: cartItem.quantity,
    }))
    .filter(Boolean);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Portal>
      {isOpen && (
        <div onClick={onClose} className="fixed inset-0 bg-black/10 z-40" />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-[350px] bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">
            Shopping Cart ({totalItems})
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 max-h-[calc(100%-64px-64px)]">
          {cartItems.length === 0 && (
            <p className="text-gray-500 text-center mt-10">
              Your cart is empty
            </p>
          )}

          {cartItems.map((tile, index) => (
            <div
              key={`${tile.id}-${index}`}
              className="flex  border-b border-gray-300 pb-3 flex-col gap-2 h-[80%]"
            >
              <div
                key={tile!.id}
                className="flex flex-row items-center gap-3  h-[80%]"
              >
                <div className="">
                  {tile!.imageUrl && (
                    <div className="w-24 h-24 relative flex-shrink-0">
                      <Image
                        src={tile!.imageUrl}
                        alt={tile!.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  )}
                </div>
                <div className="flex-1 flex flex-col">
                  <h3 className="font-bold text-lg">{tile!.name}</h3>

                  <h3
                    className={` text-md text-[#282828] ${figtree.className}`}
                  >
                    Article NR: ######
                  </h3>

                  <h3
                    className={` text-md  text-[#282828] ${figtree.className}`}
                  >
                    {tile!.sizes?.map((e) => {
                      return e.size.name;
                    })}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-10 justify-start">
                <div className="flex items-center gap-2 mt-1 border-2 border-gray-300 rounded-xl w-fit ">
                  <button
                    onClick={() => decreaseQuantity(tile!.id)}
                    className="px-3 py-1  border-r-2 border-gray-300 "
                  >
                    -
                  </button>
                  <span className="px-1">{tile!.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(tile!.id)}
                    className="px-3 py-1 border-l-2 border-gray-300  "
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="py-2 text-center flex items-center justify-center">
          <button
            className={`text-md text-white flex items-center justify-center  bg-[#21A141] w-[80%] py-2 rounded-md  font-semibold ${figtree.className}`}
          >
            <span className=" flex items-center justify-center gap-2">
              {" "}
              <CallIcon /> Contact Us
            </span>
          </button>
        </div>
      </div>
    </Portal>
  );
};
