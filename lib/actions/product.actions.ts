"use server";

import Product from "../database/models/product.model";
import User from "../database/models/user.model";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";
import { CreateNewProductProps } from "@/types";
import Category from "../database/models/category.model";
import {revalidatePath} from "next/cache"

const populateProduct = (query: any) => {
    return query
      .populate({ path: 'creator', model: User, select: '_id firstName lastName' })
      .populate({ path: 'category', model: Category, select: '_id name' })
  }



  
  export const createNewProduct = async ({
    product,
    userId,
  }: CreateNewProductProps) => {
    try {
      await connectToDatabase();
  
      const creator = await User.findById(userId);
      if (!creator) throw new Error("Creator not found");
  
      const newProduct = await Product.create({
        ...product,
        category: product.categoryId,
        creator: userId,
      });
  

      await User.findByIdAndUpdate(
        userId,
        { $push: { sellingProducts: newProduct} },
        { new: true }
      );
  
      return JSON.parse(JSON.stringify(newProduct));
    } catch (error: any) {
      handleError(error);
    }
  };
  
export const getProductById = async (id : string ) => {
    try {
        await connectToDatabase()
       const  product = await populateProduct(Product.findById(id));
       if (!product) throw new Error('Product not found')

       return JSON.parse(JSON.stringify(product))

    } catch (error: any) {
        handleError(error);
      }
};



export const getCartProducts = async (id: string | undefined) => {
  try {
    await connectToDatabase();

    const userCart = await User.findOne({ clerkId: id }).populate({
      path: "cart",
      populate: {
        path: "product",
        model : Product ,
        populate: [
          {
            path: "creator",
            model: User, 
            select: "_id firstName lastName",
          },
          {
            path: "category",
            model: Category,
            select: "_id name",
          },
        ],
      },
    })

    if (!userCart || !userCart.cart || userCart.cart.length === 0) {
      console.log("User cart is empty or not found");
      return null; // or throw an error
    }



    

    return userCart.cart;
  } catch (error) {
    console.error("Error fetching user cart:", error);
    throw error;
  }
};




export const removeProductFromCart = async (userId: string | undefined, productId: string) => {
  try {
    await connectToDatabase();
    const user = await User.findOne({ clerkId: userId });

    user.cart = user.cart.filter((product: any) => product._id.toString() !== productId.toString());
    revalidatePath('/cart')
    await user.save();
  } catch (error: any) {
    handleError(error);
  }
};



export const cartCheckout = async (userId : string | undefined , path : string) => {
  try {
      await connectToDatabase()

      const user = await User.findOne({ clerkId: userId });

        user.cart = []

          revalidatePath(path)
        await user.save()

  } catch (error: any) {
    handleError(error);
  }
}