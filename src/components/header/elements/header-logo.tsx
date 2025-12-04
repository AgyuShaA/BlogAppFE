import { LogoIconWithText } from '../../../../public/header/logo'
import { LogoIconWithTextCopy } from '../../../../public/header/logo copy'

export async function HeaderLogo() {
  return (
    <div className='flex items-center h-[50px]'>
      {/* Desktop */}
      <div className='hidden md:block'>
        <LogoIconWithText width={189} height={50} />
      </div>

      {/* Mobile */}
      <div className='block md:hidden'>
        <LogoIconWithTextCopy width={160} height={50} />
      </div>
    </div>
  )
}
