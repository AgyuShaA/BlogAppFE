'use client'

import Image from 'next/image'
import { Figtree } from 'next/font/google'
import { useCartStore } from '@/store/useCartStore'

import { useContactModalStore } from '@/store/useContactStore'
import { useTranslations } from 'next-intl'

import { CallIcon } from '@/assets/icons/call-icon'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet'
import { Button } from '../ui/button'
import { tilesQueryOptions } from '@/service/queries/use-tile-query'
import { useQuery } from '@tanstack/react-query'
import Loader from '@/app/[locale]/loading'

const figtree = Figtree({ subsets: ['latin'], weight: '300' })

interface CartSidebarProps {
  trigger: React.ReactNode // Button that opens the cart
}

export const CartSidebar = ({ trigger }: CartSidebarProps) => {
  const items = useCartStore((state) => state.items)
  const { data: tiles } = useQuery(tilesQueryOptions)
  const { toggle } = useContactModalStore()

  const t = useTranslations('contact_form')

  const increaseQuantity = useCartStore((s) => s.increaseQuantity)
  const decreaseQuantity = useCartStore((s) => s.decreaseQuantity)

  if (!tiles) return Loader()

  const cartItems = items
    .map((cartItem) => ({
      ...tiles.find((t) => t.id === cartItem.id)!,
      quantity: cartItem.quantity,
    }))
    .filter(Boolean)

  const totalItems = items.reduce((s, i) => s + i.quantity, 0)

  return (
    <Sheet>
      {/* Trigger button (cart icon, etc.) */}
      <SheetTrigger>{trigger}</SheetTrigger>

      {/* RIGHT SIDEBAR */}
      <SheetContent side='right' className='w-[300px] md:w-[350px] p-0 flex flex-col'>
        <SheetHeader className='p-4 border-b'>
          <SheetTitle>
            {t('shopping_cart')} ({totalItems})
          </SheetTitle>
        </SheetHeader>

        {/* Items */}
        <div className='flex-1 overflow-y-auto p-4 flex flex-col gap-4'>
          {cartItems.length === 0 && <p className='text-gray-500 text-center mt-10'>Your cart is empty</p>}

          {cartItems.map((tile) => (
            <div key={tile.id} className='flex flex-col gap-2 border-b pb-3'>
              <div className='flex items-center gap-3'>
                <div className='w-24 h-24 relative'>
                  {tile.imageUrl && <Image src={tile.imageUrl} alt={tile.name} fill className='object-cover rounded' />}
                </div>

                <div className='flex-1'>
                  <h3 className='font-bold text-lg'>{tile.name}</h3>

                  <p className={`text-md text-[#282828] ${figtree.className}`}>Article NR: ######</p>

                  <p className={`text-md text-[#282828] ${figtree.className} flex flex-wrap`}>
                    {tile.sizes?.map((e, i) => (
                      <span key={i} className="after:content-['|'] last:after:content-[''] mr-1">
                        {e.size.name}
                      </span>
                    ))}
                  </p>
                </div>
              </div>

              <div className='flex gap-2 items-center'>
                <div className='flex items-center gap-2 border-2  border-gray-300 rounded-xl'>
                  <button
                    onClick={() => decreaseQuantity(tile.id)}
                    className='px-3 py-1 cursor-pointer border-r-2 border-gray-300'
                  >
                    -
                  </button>
                  <span className='px-1'>{tile.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(tile.id)}
                    className='px-3 py-1 cursor-pointer border-l-2 border-gray-300'
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <SheetFooter className='p-4 border-t flex items-center justify-center'>
          <SheetClose asChild>
            <Button
              onClick={toggle}
              className={`text-md text-white flex items-center justify-center gap-2 bg-[#21A141] w-[80%] py-2 rounded-md font-semibold ${figtree.className}`}
            >
              <CallIcon /> {t('contactUs')}
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
