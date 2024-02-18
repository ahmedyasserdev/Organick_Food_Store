import ProductCard from "@/components/cards/ProductCard";
import SearchBar from "@/components/shared/SearchBar";
import { getProducts } from "@/lib/actions/product.actions";
import { IProduct } from "@/lib/database/models/product.model";

const Page = async() => {
    const products = await getProducts()

 
  return (
    <section>
      <div className="bg-shop bg-cover h-[400px] w-full bg-center mt-4 bg-no-repeat flex-center mb-8 md:mb-10" />
        <div className="container">

        {/* <SearchBar   searchQuery={searchQuery}  /> */}



          {
            products && products.length > 0 ? (
              <div className = "card_wrapper mt-7" >
                  {products.map((product : IProduct)  => (
                    <ProductCard product={product} key={product._id} />
                  ))}
              </div>
            ) : (
              <div className="w-full flex-center py-28 text-center bg-light flex flex-col gap-3 ">
                <h3 className = "h3-bold text-primary italic" >No products found!</h3>
              </div>
            )
          }



        </div>


    </section>
  );

};



export default Page;
