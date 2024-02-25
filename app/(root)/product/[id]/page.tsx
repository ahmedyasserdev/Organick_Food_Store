
import {
  getProductById,
  getRelatedProductsByCategory,
} from "@/lib/actions/product.actions";
import Image from "next/image";
import { calculateFinalPrice } from "@/lib/utils";
import AddToCart from "@/components/shared/AddToCart";
import { IProduct } from "@/lib/database/models/product.model";
import ProductCard from "@/components/cards/ProductCard";
import { currentUser } from "@clerk/nextjs";
import { getUser } from "@/lib/actions/user.actions";
import ReviewForm from "@/components/shared/ReviewForm";
import { getProductReviews } from "@/lib/actions/review.actions";
const page = async ({ params: { id } }: { params: { id: string } }) => {
  const user = await currentUser()
  const userInfo  = await getUser(user?.id)
  const product = await getProductById(id);
  const finalPrice: number = calculateFinalPrice(
    product.price,
    product.discount
  );
  const relatedProducts = await getRelatedProductsByCategory({
    categoryId: product.category._id,
    productId: product._id,
  });


  const productReviews = await getProductReviews(id)




  return (
    <>
      <section>
        <div className="bg-shop_single bg-cover h-[400px] w-full bg-center  mt-4 bg-no-repeat flex-center  mb-8 md:mb-10" />

        <div className="flex flex-col   md:gap-10 gap-5   md:flex-row md:container  py-5 md:py-8">
          {/* left section */}
          <div className="relative">
            <div className="max-w-xl  shadow-md   rounded-2xl  transition-shadow duration-500  bg-white ">
              <Image
                src={product.image}
                alt={product.title}
                width={500}
                height={500}
              />
            </div>

            <div className="absolute top-5 left-5 bg-primary p-4 rounded-xl z-10">
              <p className="p-bold-16 text-white  leading-[1.6] capitalize">
                {product.category.name}
              </p>
            </div>
          </div>

          {/* right Section */}

          <div className="flex text-center md:text-start flex-col gap-4 max-md:mt-10 max-md:px-5   ">
            <h2 className="h2-bold text-primary">{product.title}</h2>

            <div className="max-md:flex-center">
              {finalPrice &&
              typeof finalPrice === "number" &&
              product.discount ? (
                <div className="flex gap-3">
                  <p className="line-through text-dark-gray p-regular-18">
                    ${product.price}
                  </p>
                  <p className=" text-primary p-bold-20">${finalPrice}</p>
                </div>
              ) : (
                <p className=" text-dark-gray p-regular-16">{product.price}</p>
              )}
            </div>

            <p className="p-medium-16 text-primary max-w-md">
              {product.description}
            </p>

            <AddToCart
              product={product}
              userId={product.creator?._id}
              finalPrice={finalPrice}
            />
          </div>
        </div>
      </section>

      {/* reviwes */}
<section>
  
       <div className = "container " >
             <ReviewForm  reviews= {productReviews}  productId={product?._id.toString()} userId={userInfo._id.toString()} />
       </div>
</section>


      <section className="mt-8 md:mt-10">
        <div className="container">
          {relatedProducts && relatedProducts.length > 0 && (
            <div className="text-start h3-bold text-primary">
              Related Products
            </div>
          )}

          <div className=" mt-7 card_wrapper">
            {relatedProducts &&
              relatedProducts.length > 0 &&
              relatedProducts.map((product: IProduct) => (
                <ProductCard product={product} key={product._id} />
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
