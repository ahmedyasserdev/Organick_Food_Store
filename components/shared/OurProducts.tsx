import { getProducts } from "@/lib/actions/product.actions";

import ProductCard from "../cards/ProductCard";

const OurProducts = async () => {

  const products = await getProducts();
  const slicedProducts = products;

  return (
    <section className="py-10">
      <div className="container">
        <div className="flex-center flex-col gap3">
          <p className="text-dark-green p-bold-24 italic">Categories</p>
          <h2 className="h2-bold  text-primary">Our Products</h2>
        </div>


            <div className="flex  max-md:justify-center flex-wrap items-center gap-4">
                {
                    slicedProducts?.map((product) =>  (
                        <ProductCard key={product._id } product={product} />
                    )  )
                }
            </div>



      </div>
    </section>
  );
};

export default OurProducts;
