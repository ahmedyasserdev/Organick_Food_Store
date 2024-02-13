import { IProduct } from "@/lib/database/models/product.model";

export type ProductFormProps = {
  userId: string | undefined;
  type: "Create" | "Update";
  product?: IProduct;
};

 type Product = {
  title: string;
  description: string;
  image: string;
  categoryId: string;
  price: string;
  discount?: string;
};

export type CreateNewProductProps = {
  userId: string | undefined;
  product: Product;
};

export type AddToCartProps = {
  product: IProduct;
  userId: string | undefined;
  finalPrice: number;
};

export type AddProductToCartProps = {
  userId: string | undefined;
  path : string ;
  product: {
    title: string;
    description: string;
    image: string;
    categoryId: string;
    price: string;
    discount?: string;
    quantity : number

  } | any ; 

};
