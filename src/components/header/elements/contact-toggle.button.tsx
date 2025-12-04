'use client'

import { useContactModalStore } from '@/store/useContactStore'
import { useTranslations } from 'next-intl'

export function HeaderContactButton() {
  const { toggle } = useContactModalStore()
  const t = useTranslations('header')

  return (
    <nav className='hidden md:flex h-[54px] px-[2%] justify-between items-center '>
      <button onClick={toggle} className='border-2 cursor-pointer border-red-600 px-4 h-[38px] text-red-600'>
        {t('contactUs')}
      </button>
    </nav>
  )
}
