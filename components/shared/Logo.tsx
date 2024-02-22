import { LogoProps } from '@/types'
import Image from 'next/image'


const Logo = ({isFooter = false} : LogoProps) => {
  return (
    <div className='flex items-center gap-2' >
        <Image src={'/logo.svg'} alt ="logo"  width = { isFooter ? 66 :  33} height={isFooter ? 66 :  33} className='object-contain' />
        <p className={` ${isFooter ? " p-bold-24 md:h3-bold " : "p-medium-20"} text-primary`}>Organick</p>
    </div>
  )
}

export default Logo