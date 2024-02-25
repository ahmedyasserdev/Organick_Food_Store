import { IProduct } from "@/lib/database/models/product.model";

export type ProductFormProps = {
  userId: string | undefined;
  type: "Create" | "Update";
  product?: IProduct;
  productId?: string;
};

type Product = {
  title: string;
  description: string;
  image: string;
  categoryId: string;
  price: string;
  discount?: string;
};

export type CreateNewAndUpdateProductParams = {
  userId: string | undefined;
  product: Product;
  path?: string | undefined;
  productId?: string | undefined;
};

export type AddToCartProps = {
  product: IProduct;
  userId: string | undefined;
  finalPrice: number;
};

export type AddProductToCartProps = {
  userId: string | undefined;
  path: string;
  product:
    | {
        title: string;
        description: string;
        image: string;
        categoryId: string;
        price: string;
        discount?: string;
        quantity: number;
      }
    | any;
};

export type DeleteProductProps = {
  productId: string;
  path: string;
};

export type GetRelatedProductsByCategoryParams = {
  categoryId: string;
  productId: string;
};

export type LogoProps = {
  isFooter: boolean;
};

export type CreateNewReviewParams = {
  text: string;
  productId: string;
  userId: string | undefined;
  path: string;
};

export type reviewType = {
  creator: {
    _id: string;
    firstName: string;
    lastName: string;
    photo: string;
  };
  text: string;
  _id: string;
  createdAt: string;
};

export type ReviewFormProps = {
  productId: string;
  userId: string | undefined;
  reviews: reviewType[];
};

export type deleteProductReviewParams = {
  productId: string;
  reviewId: string;
  path: string;
};

export type UpdateReviewParams = {
  reviewId: string;
  reviewText: string;
  path: string;
};
