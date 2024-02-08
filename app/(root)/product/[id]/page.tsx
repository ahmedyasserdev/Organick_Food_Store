import React from 'react'
import {getProductById} from '@/lib/actions/product.actions'
const page = async ({params : {id}} : {params : {id : string}} ) => {
  const product = await getProductById(id)
  console.log(product)
  return (
    <div>page</div>
  )
}

export default page