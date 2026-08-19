import React from 'react';
import { ProductCard } from './ProductCard';
import type { Product } from '../../state/slices/product.slice';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-6">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div 
            key={idx} 
            className="animate-pulse bg-white border border-neutral-100 rounded-2xl overflow-hidden p-3 sm:p-4 space-y-4"
          >
            <div className="aspect-square bg-neutral-100 rounded-lg w-full"></div>
            <div className="space-y-2">
              <div className="h-3 bg-neutral-100 rounded w-1/3"></div>
              <div className="h-4 bg-neutral-100 rounded w-3/4"></div>
              <div className="h-5 bg-neutral-100 rounded w-1/2 pt-2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl border border-neutral-100 px-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-800">No products found</h3>
        <p className="text-xs text-neutral-500 mt-2">Try adjusting your category filter or search query.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};
