
import { IProduct } from "@/lib/database/models/product.model"
import Image from "next/image";
import Link from "next/link";
import DeleteFromCart from "../shared/DeleteFromCart";
type CartProductProps = {
    cartProduct : {
        _id : string;
        product : IProduct;

    }
    userId  :string | undefined;
}

const CartCard = ({cartProduct , userId} :  CartProductProps) => {
    const {product} = cartProduct


  return (
    <div className=" w-[350px]  md:max-w-[450px]  p-4 overflow-hidden  max-h[450px]   bg-light relative shadow-lg hover:shadow-sm transition-all  rounded-xl " >
        <Link className="flex flex-col " href={`/product/${product._id}`}
        >

             <Image  src = {product.image} alt={product.title} width={400} height={100} className  =' mx-auto object-contain ' />

  
          <div className="flex flex-col gap-4 text-primary px-2 pb-3">
            <h5 className="h5-bold">{product.title}</h5>
            <p className="p-regular-14 truncate max-w-md">{product.description}</p>
          </div>


         
  



        </Link>
            


        <div className="absolute top-0 left-2  z-[1000]">
      <DeleteFromCart 

      userId = {userId}
      productId={cartProduct._id.toString()}
      
        />
  
      </div>

    </div>
  )
}

export default CartCard