"use server";

import Product from "../database/models/product.model";
import User from "../database/models/user.model";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";
import { CreateNewProductProps } from "@/types";
import { getUser } from "./user.actions";
import Category from "../database/models/category.model";


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
