"use server";

import { CreateNewReviewParams } from "@/types";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";
import Review from "../database/models/reviews.model";
import Product from "../database/models/product.model";
import User from "../database/models/user.model";


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
      populate : [
        {
          path: "creator",
          model: User,
          select: "_id firstName lastName image",
        },
      
      ]
    });
    if (!product) {
      throw new Error("Product not found");
    }

    const reviews = product.reviews;

    return reviews;
  } catch (error: any) {
    console.error(error);
    throw new Error("Error fetching product reviews");
  }
};