import OrganicOnly from '@/components/services/OrganicOnly'
import ServiceColumn from '@/components/services/ServiceColumn'
import Services from '@/components/services/Services'
import { services_Two, services_one } from '@/constants'
import Image from 'next/image'

const page = () => {
  return (
    <section>
          <div className="bg-services bg-cover h-[400px] w-full bg-center  mt-4 bg-no-repeat flex-center  mb-8 md:mb-10" />

            <Services />
            <OrganicOnly/>
    
    
    
    </section>
  )
}

export default page