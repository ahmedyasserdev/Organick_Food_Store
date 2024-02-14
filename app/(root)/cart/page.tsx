import CartCard from "@/components/cards/CartCard";
import { getCartProducts } from "@/lib/actions/product.actions";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";
import {calculateFinalPrice} from "@/lib/utils"
import CheckOut from "@/components/shared/CheckOut";
const page = async () => {
  const user = await currentUser();
  if (!user) redirect("/");
  const cartProducts = await getCartProducts(user?.id);


  const totalPrice = cartProducts?.reduce((acc: number, cartProduct: any) => {
    const { product } = cartProduct;
    const { price, discount } = product;
    const finalPrice = calculateFinalPrice(price, discount);
    const totalPriceForProduct = finalPrice * cartProduct.quantity;
    return acc + totalPriceForProduct;
  }, 0).toFixed(1);
  return (
    <section>
      <div className="container flex-between md:items-start gap-4 flex-col md:flex-row">
     <>
         {cartProducts && cartProducts.length > 0 ? (
           <div className=" md:w-[70%] flex items-center flex-wrap max-sm:justify-center  py-10 mt-10 gap-x-5 gap-y-10">
             {cartProducts.map((cartProduct: any) => (
               <CartCard key={cartProduct._id} cartProduct={cartProduct} userId={user.id} />
             ))}
           </div>
         ) : (
           <div className="w-full flex-center py-28 text-center bg-light flex flex-col gap-3 ">
             <h3 className="p-bold-20 md:h3-bold text-primary">Cart is empty</h3>
             <Link href="/shop" className="underline">
               <p className="p-regular-14">Go Add Some</p>
             </Link>
           </div>
         )}
      
     </>

              {cartProducts && cartProducts.length > 0 && (
  <div className = " max-md:w-full  md:self-start mt-10" >

  <CheckOut userId = {user?.id} totalPrice={totalPrice} />

  </div>
              )}

          

      </div>
    </section>
  );
};

export default page;
