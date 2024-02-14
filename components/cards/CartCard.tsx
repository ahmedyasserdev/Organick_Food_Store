import { IProduct } from "@/lib/database/models/product.model";
import Image from "next/image";
import Link from "next/link";
import DeleteFromCart from "../shared/DeleteFromCart";
import { calculateFinalPrice } from "@/lib/utils";
type CartProductProps = {
  cartProduct: {
    quantity: number;
    _id: string;
    product: IProduct;
  };
  userId: string | undefined;
};

const CartCard = ({ cartProduct, userId }: CartProductProps) => {
  const { product } = cartProduct;
  const finalPrice = calculateFinalPrice(product.price, product.discount);

  return (
    <div className=" card">
      <Link className="flex flex-col gap-5 " href={`/product/${product._id}`}>
        <Image
          src={product.image}
          alt={product.title}
          width={400}
          height={100}
          className=" mx-auto object-contain "
        />

        <div className="flex flex-col gap-4 text-primary px-2 pb-3">
          <h5 className="h5-bold">{product.title}</h5>
          <p className="p-regular-14 truncate max-w-md">
            {product.description}
          </p>
        </div>

        <div className="text-start md:flex-between flex flex-col md:flex-row max-md:gap-y-3 ">
          <p className="text-primary p-bold-16">
            Quantity :{" "}
            <span className="font-regular">{cartProduct.quantity} </span>
          </p>
          <p className="text-primary p-bold-16">
            Total Price :{" "}
            <span className="font-regular">
              ${(finalPrice * cartProduct.quantity).toFixed(1)}{" "}
            </span>
          </p>
        </div>
      </Link>

      <div className="absolute top-0 left-2  ">
        <DeleteFromCart
          userId={userId}
          productId={cartProduct._id.toString()}
        />
      </div>
    </div>
  );
};

export default CartCard;
