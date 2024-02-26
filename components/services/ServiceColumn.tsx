import Image from 'next/image'
import React from 'react'

const ServiceColumn = ({data} : {data : {}[]} ) => {
  return (
    <div className="flex flex-col gap-4">
    {
        data.map((service : any) => (
            <div key={service.icon} className="flex max-md:items-center  flex-col gap-2">
                <Image    width={50} height={50} src={service.icon} alt={service.title} />
            
                <h5 className=" p-medium-20 md:p-medium-24  text-primary">{service.title}</h5>
                <p className="p-regular-14 text-dark-gray max-md:text-center">{service.description}</p>
            </div>
        ) )
    }
</div>
  )
}

export default ServiceColumn