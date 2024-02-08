import Image from 'next/image'
const Logo = () => {
  return (
    <div className='flex items-center gap-2' >
        <Image src={'/logo.svg'} alt ="logo"  width = {33} height={33} className='object-contain' />
        <p className="p-medium-20">Organick</p>
    </div>
  )
}

export default Logo