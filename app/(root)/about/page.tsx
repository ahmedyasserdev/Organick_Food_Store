import AboutHero from '@/components/about/AboutHero'
import WhyChooseUs from '@/components/about/WhyChooseUs'
import React from 'react'

const page = () => {
  return (
  <>
    <div className="bg-about bg-cover h-[400px] w-full bg-center mt-4 bg-no-repeat flex-center mb-8 md:mb-10" />

    <AboutHero />
    <WhyChooseUs />
  </>
  )
}

export default page