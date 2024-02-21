import { getProducts } from "@/lib/actions/product.actions";

import ProductCard from "../cards/ProductCard";
import Link from "next/link";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

const OurProducts = async () => {

  const products = await getProducts();
  const slicedProducts = products.slice(1,5) //slice it later;

  return (
    <section className="py-10">
      <div className="container">
        <div className="flex-center flex-col gap3">
          <p className="text-dark-green p-bold-24 italic">Categories</p>
          <h2 className="h2-bold  text-primary">Our Products</h2>
        </div>


            <div className="flex  max-md:justify-center flex-wrap items-center gap-5 pt-8  ">
                {
                    slicedProducts?.map((product  : any) =>  (
                        <ProductCard key={product._id } product={product} />
                    )  )
                }
            </div>


            <Link href='/shop' className = "flex-center mt-5" >
            <Button size={'lg'} className="flex gap-2 items-center  h-[55px] md:h-[70px] rounded-2xl"  >
              <p className="p-bold-20 text-white" >Explore More</p>
              <Plus />
               </Button>
        </Link>




      </div>
    </section>
  );
};

export default OurProducts;
