import React from 'react'
import ServiceColumn from '@/components/services/ServiceColumn'
import { services_Two, services_one } from '@/constants'
import Image from 'next/image'
const Services = () => {
  return (
    <div className="container mt-20">
    <div className="flex-center gap-4 ">

   <ServiceColumn data = {services_one}  />




                <div className='hidden lg:block' >
                    <Image  src= {'/services.svg'}  className='object-cover' alt="services" width={750} height={750} />
                </div>



                <ServiceColumn data = {services_Two}  />




    </div>
</div>
  )
}

export default Services