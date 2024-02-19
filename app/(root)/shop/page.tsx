'use client'
import React, { useState, useEffect } from 'react';
import ProductCard from '@/components/cards/ProductCard';
import SearchBar from '@/components/shared/SearchBar';
import { getProducts } from '@/lib/actions/product.actions';
import { IProduct } from '@/lib/database/models/product.model';
import { fetchProducts } from '@/lib/utils';
import Banner from '@/components/shared/Banner';

const Page = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {

    fetchProducts({setProducts , searchQuery});
  }, [searchQuery]);

  return (
    <section>
      <Banner bgImage="shop"  />
      <div className="container">
        <SearchBar  setSearchQuery={setSearchQuery} />

        {products && products.length > 0 ? (
          <div className="card_wrapper mt-7">
            {products.map((product: IProduct) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
        ) : (
          <div className="w-full flex-center py-28 text-center bg-light flex flex-col gap-3">
            <h3 className="h3-bold text-primary italic">No products found!</h3>
          </div>
        )}
      </div>
    </section>
  );
};

export default Page;
