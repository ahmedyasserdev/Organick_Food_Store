import React from 'react'

const Banner = ({bgImage } : {bgImage : string} ) => {
  return (
    <div className={`bg-${bgImage} bg-cover h-[400px] w-full bg-center mt-4 bg-no-repeat flex-center mb-8 md:mb-10`}/>
  )
}

export default Banner