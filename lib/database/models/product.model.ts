import { Document, Schema, model, models } from "mongoose";

export interface IProduct extends Document {
  title: string;
  description: string;
  price: string;
  image: string;
  category: { _id: string, name: string }
  discount?: string;
  creator : { _id: string, firstName: string, lastName: string };
  reviews : { _id: string, text: string  , creator : { _id: string, firstName: string, lastName: string , image : string }  };
}

const ProductSchema = new Schema<IProduct>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, required: true },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
  discount: { type: String },

  creator :{ type: Schema.Types.ObjectId, ref: 'User' },
  reviews :[
    { type: Schema.Types.ObjectId, ref: 'Review' }
  ],
});

const Product = models.Product || model<IProduct>('Product', ProductSchema);

export default Product;
