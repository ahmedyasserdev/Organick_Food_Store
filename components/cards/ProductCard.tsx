'use client'
import { useEffect, useState } from 'react';
import { IProduct } from "@/lib/database/models/product.model";
import { getUser } from "@/lib/actions/user.actions";
import { currentUser, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { calculateFinalPrice } from "@/lib/utils";
import DeleteConfirmation from "../shared/DeleteConfirmation";
import Loader from '@/app/loading';

const ProductCard = ({ product }: { product: IProduct }) => {
  const [isCreator, setIsCreator] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { user , isLoaded } = useUser();
  const fetchUserInfo = async () => {
    try {
      const userInfo = await getUser(user?.id);
      setIsCreator(userInfo?._id.toString() === product.creator._id.toString());
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user information:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
  

    fetchUserInfo();
  }, []);

  if (loading || !isLoaded ) {
    return <Loader/>;
  }

  const finalPrice = calculateFinalPrice(product.price, product.discount);

  return (
    <div className="card">
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

          <div className="text-start md:flex-between flex flex-col md:flex-row max-md:gap-y-3 ">
            <p className="text-primary p-bold-16">
              Price : <span className="font-regular">${finalPrice} </span>
            </p>

            {product.discount && (
              <p className="text-primary p-bold-16">
                discount :{" "}
                <span className="font-regular">{product.discount}% </span>
              </p>
            )}
          </div>
        </div>
      </Link>

      {isCreator && (
        <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-light p-3 shadow-md transition-all">
          <Link href={`/product/${product._id}/update`}>
            <Image src="/edit.svg" alt="edit" width={20} height={20} />
          </Link>

          <DeleteConfirmation
            productId={product._id ? product._id : undefined}
          />
        </div>
      )}

      <div className="absolute top-5 left-5 bg-primary p-4 rounded-xl z-10">
        <p className="p-bold-16 text-white  leading-[1.6] capitalize">
          {product.category.name}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
