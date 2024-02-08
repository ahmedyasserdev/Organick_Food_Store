import { IProduct } from "@/lib/database/models/product.model";

export type ProductFormProps = {
    userId : string | undefined  ;
    type : "Create" | "Update";
    product?: IProduct;
}

export type CreateNewProductProps = {
    userId : string |  undefined  ;
    product  : {
        title: string
        description: string
        image: string
        categoryId: string
        price: string
        discount : string;
    } ;
}