'use client'

import { useCartStore } from '@/store/useCartStore'
import useWindowSize from '@/hooks/UseWindowsSize'

import { HeaderLanguageSelector } from './elements/header-language-selector'
import { HeaderCartButton } from './elements/header-cart-button'
import { HeaderNavigation } from './elements/header-navigation'
import { HeaderLogo } from './elements/header-logo'
import { SearchDialog } from './elements/header-search'
import { MobileMenu } from './elements/mobile-menu'
import { useQuery } from '@tanstack/react-query'
import { tilesQueryOptions } from '@/service/queries/use-tile-query'

export default function Header({ locale }: { locale: string }) {
  const { isMobile } = useWindowSize()
  const { items } = useCartStore()

  const { data } = useQuery(tilesQueryOptions)

  console.log(data)
  return (
    <header className='mx-auto sticky top-0 max-w-[1280px] h-[172px] flex flex-col gap-5'>
      <div className='flex items-center justify-between h-[74px] px-[5%] md:px-[2%]'>
        <HeaderLogo isMobile={isMobile} />

        <SearchDialog className='md:max-w-[50%] lg:max-w-[60%] ' />

        <HeaderLanguageSelector locale={locale} />

        <HeaderCartButton itemsCount={items.length} />
      </div>

      <div className='w-full md:hidden flex items-center gap-4  pb-2 px-[5%] md:px-[2%'>
        <MobileMenu locale={locale} />

        <SearchDialog className='flex! ' />
      </div>

      <HeaderNavigation />
    </header>
  )
}
