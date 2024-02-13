'use client'

import Image from "next/image"
import { removeProductFromCart } from "@/lib/actions/product.actions";

type DeleteFromCartProps = {
  userId : string | undefined;
  productId : string
}

const DeleteFromCart = ({userId , productId} : DeleteFromCartProps ) => {
  const removeProduct =  () => {
     removeProductFromCart(userId,productId)
  }
  return (
    <div className = "cursor-pointer bg-white p-2 rounded-xl " >
      <Image src=  {"/delete.svg"} alt={"delete"} width = {30} height={30}  
        onClick={removeProduct}
      />
    </div>
  ) 
}

export default DeleteFromCart