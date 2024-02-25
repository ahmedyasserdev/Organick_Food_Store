"use server";

import Product from "../database/models/product.model";
import User from "../database/models/user.model";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";
import {
  CreateNewAndUpdateProductParams,
  DeleteProductProps,
  GetRelatedProductsByCategoryParams,
} from "@/types";
import Category from "../database/models/category.model";
import { revalidatePath } from "next/cache";
import toast from "react-hot-toast";

const populateProduct = (query: any) => {
  return query
    .populate({
      path: "creator",
      model: User,
      select: "_id firstName lastName",
    })
    .populate({ path: "category", model: Category, select: "_id name" });
};

export const createNewProduct = async ({
  product,
  userId,
}: CreateNewAndUpdateProductParams) => {
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
      { $push: { sellingProducts: newProduct } },
      { new: true }
    );

    return JSON.parse(JSON.stringify(newProduct));
  } catch (error: any) {
    handleError(error);
  }
};

export const getProductById = async (id: string) => {
  try {
    await connectToDatabase();
    const product = await populateProduct(Product.findById(id));
    if (!product) throw new Error("Product not found");

    return JSON.parse(JSON.stringify(product));
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
        model: Product,
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
    });

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

export const removeProductFromCart = async (
  userId: string | undefined,
  productId: string
) => {
  try {
    await connectToDatabase();
    const user = await User.findOne({ clerkId: userId });

    user.cart = user.cart.filter(
      (product: any) => product._id.toString() !== productId.toString()
    );
    revalidatePath("/cart");
    await user.save();
  } catch (error: any) {
    handleError(error);
  }
};

export const cartCheckout = async (
  userId: string | undefined,
  path: string
) => {
  try {
    await connectToDatabase();

    const user = await User.findOne({ clerkId: userId });

    user.cart = [];

    revalidatePath(path);
    await user.save();
  } catch (error: any) {
    handleError(error);
  }
};

// created by chatgpt
export const getProducts = async (searchQuery?: string) => {
  try {
    await connectToDatabase();

    let conditions: any = {};

    if (searchQuery && searchQuery.trim() !== "") {
      const regex = new RegExp(searchQuery, "i");

      // Find categories matching the search query
      const categories = await Category.find({ name: { $regex: regex } });

      // Extract category IDs from the found categories
      const categoryIds = categories.map((category) => category._id);

      // Add conditions for title matching regex or category matching IDs
      conditions = {
        $or: [{ title: { $regex: regex } }, { category: { $in: categoryIds } }],
      };
    }

    const products = await populateProduct(Product.find(conditions));

    return JSON.parse(JSON.stringify(products));
  } catch (error: any) {
    handleError(error);
  }
};

export const deleteProduct = async ({
  productId,
  path,
}: DeleteProductProps) => {
  try {
    await connectToDatabase();

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (deletedProduct) revalidatePath(path);
  } catch (error: any) {
    handleError(error);
  }
};

// UPDATE
export const updateProduct = async ({
  userId,
  product,
  productId,
  path,
}: CreateNewAndUpdateProductParams) => {
  try {
    await connectToDatabase();

    const productToUpdate = await Product.findById(productId);

    if (
      !productToUpdate ||
      productToUpdate.creator.toString() !== userId?.toString()
    ) {
      throw new Error("Unauthorized or product not found");
    }

    // Update the product with new values
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { ...product, category: product.categoryId },
      { new: true }
    );

    // Validate the path and revalidate if provided
    if (path) {
      revalidatePath(path);
    }

    return JSON.parse(JSON.stringify(updatedProduct));
  } catch (error) {
    handleError(error);
  }
};

export const getRelatedProductsByCategory = async ({
  categoryId,
  productId,
}: GetRelatedProductsByCategoryParams) => {
  try {
    await connectToDatabase();

    const conditions = {
      $and: [{ category: categoryId }, { _id: { $ne: productId } }],
    };

    const Products = await populateProduct(Product.find(conditions));

    return Products;
  } catch (error) {
    handleError(error);
  }
};

export const getUserSellingProducts = async (userId: string | undefined) => {
  try {
    await connectToDatabase();

    const user = await User.findOne({ clerkId: userId }).populate({
      path: "sellingProducts",
      model: Product,
      populate : [
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
      ]
    });

    const sellingProducts = user?.sellingProducts;

    return JSON.parse(JSON.stringify(sellingProducts));
  } catch (error) {}
};
