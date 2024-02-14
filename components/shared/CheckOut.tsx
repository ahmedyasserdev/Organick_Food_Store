'use client'
import React from "react";
import { Button } from "../ui/button";
import { cartCheckout } from "@/lib/actions/product.actions";
import {usePathname} from 'next/navigation'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {CheckCircle} from "lucide-react"
type  CheckOutProps = {
  userId: string | undefined ;
  totalPrice: number;
}

const CheckOut = ({ totalPrice  , userId }: CheckOutProps ) => {
  const pathname = usePathname()
  const handleCheckOut = () => {
    cartCheckout(userId , pathname)
  }
  return (
    <div className="bg-light px-5 pb-8 pt-4 rounded-xl shadow-md text-primary">
      <div className="flex  flex-col gap-4 ">
        <p className="p-medium-20">
          Total Price : <span className="font-regular">${totalPrice} </span>{" "}
        </p>





      <AlertDialog >
      <AlertDialogTrigger   asChild>
      <Button size={"lg"} onClick={handleCheckOut} className="w-full p-medium-20 " >Check out</Button>

      </AlertDialogTrigger >
      <AlertDialogContent className = "bg-light">
        <AlertDialogHeader>
          <AlertDialogTitle className = "flex items-center gap-4" >
            
          <h3 className = "h3-bold text-primary italic" >Thank you for your purchase!</h3>
          
        <div className = "bg-dark-green  text-white  p-4 rounded-full" >
             <CheckCircle  className = ' w-10 h-10' />
        </div>
          
          
          </AlertDialogTitle>
      
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
       
      </AlertDialogContent>
    </AlertDialog>

      </div>
    </div>
  );
};

export default CheckOut;
