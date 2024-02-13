import { IProduct } from '@/lib/database/models/product.model';
import React from 'react';

type CollectionProps = {
  data: IProduct[],
  emptyTitle: string,
  emptyStateSubtext: string,
}

const ProductsCollection = ({
  data,
  emptyTitle,
  emptyStateSubtext,
}: CollectionProps) => {
  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col items-center gap-10">
          <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {data?.map((product) => {
              return (
                <li key={product._id} className="bg-red-500 ">
                  {/* <Card product={product} /> */}
                  {product.title}
                  {product.discount}
                </li>
              )
            })}
          </ul>
        </div>
      ) : (
        <div className="flex-start container min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-light py-28 text-start">
          <h3 className="p-bold-20 md:h5-bold">{emptyTitle}</h3>
          <p className="p-regular-14">{emptyStateSubtext}</p>
        </div>
      )}
    </>
  )
}

export default ProductsCollection;
