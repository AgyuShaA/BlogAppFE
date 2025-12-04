'use client'

import { Link } from '@/i18n/navigation'
import { LogoIconWithText } from '../../../../public/header/logo'
import useWindowSize from '@/hooks/UseWindowsSize'

export function HeaderLogo() {
  const { isMobile } = useWindowSize()
  return (
    <div className='flex items-center h-[50px]'>
      <Link href='/'>
        <LogoIconWithText width={isMobile ? 160 : 189} height={50} />
      </Link>
    </div>
  )
}
