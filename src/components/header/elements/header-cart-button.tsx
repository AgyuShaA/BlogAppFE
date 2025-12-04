'use client'

import { StoreIcon } from '@/assets/icons/store'
import { CartSidebar } from '@/components/sidebar/sidebar'
import { useCartStore } from '@/store/useCartStore'
import { useTranslations } from 'next-intl'

export function HeaderCartButton() {
  const t = useTranslations('header')
  const { items } = useCartStore()

  return (
    <>
      <CartSidebar
        trigger={
          <div className='flex cursor-pointer rounded-lg items-center gap-2 h-[50px] px-6 bg-[#212C34] text-white hover:bg-[#2c3942]'>
            <div className='relative'>
              <StoreIcon />

              {/* Cart counter badge */}
              <div className='absolute -top-1 -right-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-[12px] font-medium leading-none'>
                {items.length}
              </div>
            </div>
            <span>{t('cart')}</span>
          </div>
        }
      />
    </>
  )
}
