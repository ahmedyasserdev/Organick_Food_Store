"use server";

import { CreateNewReviewParams, DeleteProductProps, UpdateReviewParams, deleteProductReviewParams, reviewType } from "@/types";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";
import Review from "../database/models/reviews.model";
import Product from "../database/models/product.model";
import User from "../database/models/user.model";
import { revalidatePath } from "next/cache";


const populateReview = (query: any) => {
  return query
    .populate({
      path: "creator",
      model: User,
      select: "_id firstName lastName image",
    })
    .populate({ path: "reviews", model: Review, select: "_id text" });
};



export const createNewReview = async ({
  text,
  userId,
  productId,
  path
}: CreateNewReviewParams) => {
  try {
    await connectToDatabase();

    if (!productId) {
      throw new Error("Product id is missing");
    }

    const newReview = await Review.create({ text, creator: userId });

    await Product.findByIdAndUpdate(
      productId,
      { $push: { reviews: newReview } },
      { upsert: true }
    );


    revalidatePath(path)

    return JSON.parse(JSON.stringify(newReview));
  } catch (error: any) {
    handleError(error);
  }
};


export const getProductReviews = async (id: string) => {
  try {
    await connectToDatabase();

    if (!id) {
      throw new Error("Product id is missing");
    }

    const product = await Product.findById(id).populate({
      path: "reviews",
      model: Review,
      options: { sort: { createdAt: -1 } },
      populate: [
        {
          path: "creator",
          model: User,
          select: "_id firstName lastName photo",
        },
      ],
    })

    if (!product) {
      throw new Error("Product not found");
    }

    const reviews = product.reviews;

    return JSON.parse(JSON.stringify(reviews));
  } catch (error: any) {
    console.error(error);
    throw new Error("Error fetching product reviews");
  }
};



export const deleteProductReview = async ({ reviewId, productId , path } : deleteProductReviewParams ) => {
  try {
    await connectToDatabase();

    await Review.findByIdAndDelete(reviewId);

    await updateProductReviews(productId , reviewId );

    revalidatePath(path)

  } catch (error) {
    console.error(error);
  }
}

const updateProductReviews = async (productId: string, reviewId: string) => {
  try {
    const product = await Product.findById(productId);

    if (product) {
      // Filter out the review with the specified reviewId
      product.reviews = product.reviews.filter((review  : reviewType) => review._id !== reviewId);

      await product.save();
    } else {
      console.log('Product not found');
    }
  } catch (error) {
    console.error('Error updating product reviews:', error);
  }
};

export const updateReview = async ({reviewId , reviewText , path } : UpdateReviewParams ) => {
  try {

  await connectToDatabase()
   const reviewToUpdate =  await Review.findByIdAndUpdate(reviewId, {
    text : reviewText
   })

   revalidatePath(path)

    
   return JSON.parse(JSON.stringify(reviewToUpdate))
  } catch (error) {
    console.error(error);
  }
}