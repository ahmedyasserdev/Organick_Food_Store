import ProductCard from "@/components/cards/ProductCard";
import { getUserSellingProducts } from "@/lib/actions/product.actions";
import { IProduct } from "@/lib/database/models/product.model";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";

const Profile = async () => {
  const user = await currentUser();
  if (!user) redirect("/");
  const sellingProducts = await getUserSellingProducts(user?.id);

  console.log(sellingProducts);

  return (
    <section>
      <div className="container">
        {sellingProducts && sellingProducts.length > 0 ? (
        <div className="flex flex-col gap-5" >
             <h3 className="h3-bold text-primary">
              Products  you are  selling {" "}
            </h3>
              <div className="card_wrapper">
                    {
                        sellingProducts.map((product : IProduct) => (
                            <ProductCard product={product} key={product._id} />
                        ) )
                    }
            
              </div>
        </div>
        ) : (
          <div className="flex-center flex-col gap-5 mt-4">
            <h3 className="h3-bold text-primary">
              You are not selling any products{" "}
            </h3>

            <Link href="/product/create" className="underline">
              <p className="p-regular-18 capitalize">go create some</p>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Profile;
