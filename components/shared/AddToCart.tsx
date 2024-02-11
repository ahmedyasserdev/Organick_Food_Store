'use client'

import { AddToCartProps } from '@/types'
import React, { useState, ChangeEvent } from 'react'
import { Button } from '../ui/button'
import {AddProductToCart} from "@/lib/actions/user.actions"
const AddToCart = ({ product, userId, finalPrice }: AddToCartProps) => {
    const [quantity, setQuantity] = useState(1)
    const [loading , setLoading] = useState(false)



    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);

        setQuantity(isNaN(value) ? 1 : value);
    };
    
    const handleAddToCart = async () => {
        try {

            setLoading(true);
            await AddProductToCart({
                userId,
                product: { ...product, price: finalPrice.toString(), quantity },
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="flex flex-col gap-5">
            <input  min='1' placeholder="quantity" className='input-field outline-none border-none' type="number" value={quantity} onChange={handleOnChange} />


                <Button  disabled = {loading} size='lg' className='p-bold-20 rounded-xl' 
                    onClick={handleAddToCart}
                >
                  {loading ? "Adding To Cart" : "Add To Cart"  }  
                    
                    </Button>
      
        </div>
    )
}

export default AddToCart
