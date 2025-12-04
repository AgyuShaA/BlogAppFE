import { HeaderLanguageSelector } from './elements/header-language-selector'
import { HeaderCartButton } from './elements/header-cart-button'
import { HeaderNavigation } from './elements/header-navigation'
import { HeaderLogo } from './elements/header-logo'
import { SearchDialog } from './elements/header-search'
import { MobileMenu } from './elements/mobile-menu'
import { Suspense } from 'react'

export default async function Header({ locale }: { locale: string }) {
  return (
    <header className='mx-auto sticky top-0 max-w-[1280px] h-[172px] flex flex-col gap-5'>
      <div className='flex items-center justify-between h-[74px] px-[5%] md:px-[2%]'>
        <HeaderLogo />

        <Suspense>
          <SearchDialog className='md:max-w-[50%] lg:max-w-[60%] ' />
        </Suspense>

        <HeaderLanguageSelector locale={locale} />

        <HeaderCartButton />
      </div>

      <div className='w-full md:hidden flex items-center gap-4  pb-2 px-[5%] md:px-[2%'>
        <MobileMenu locale={locale} />

        <SearchDialog className='flex! ' />
      </div>

      <HeaderNavigation />
    </header>
  )
}
