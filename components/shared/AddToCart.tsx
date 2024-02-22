"use client";

import { AddToCartProps } from "@/types";
import React, { useState, ChangeEvent } from "react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AddProductToCart } from "@/lib/actions/user.actions";
import { ShoppingCart } from "lucide-react";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
const AddToCart = ({ product, userId, finalPrice }: AddToCartProps) => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);

    setQuantity(isNaN(value) ? 1 : value);
  };

  const handleAddToCart = async () => {
    try {
      if (quantity < 1) {
        toast.error("quantity must be at least 1");
        return;
      }

      setLoading(true);
      await AddProductToCart({
        userId,
        product: { ...product, price: finalPrice.toString(), quantity },
        path: pathname,
      });
      toast.success("Product added to cart successfully ");
    } catch (error) {
      console.log(error);
      toast.error("Error adding Product to cart");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <input
        placeholder="quantity"
        className="input-field outline-none border-none"
        type="text"
        value={quantity}
        onChange={handleOnChange}
      />

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              disabled={loading}
              size="lg"
              className="p-bold-20 rounded-xl"
              onClick={handleAddToCart}
            >
              {loading ? "Adding To Cart" : "Add To Cart"}
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-primary text-white flex items-center gap-3 ">
            <p className="p-bold-16">${finalPrice} </p>
            <ShoppingCart />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default AddToCart;
