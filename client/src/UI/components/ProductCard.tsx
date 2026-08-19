import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Plus, Check } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import type { Product } from '../../state/slices/product.slice';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [isLiked, setIsLiked] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault(); // Stop navigation to details page
    e.stopPropagation();

    setIsAdding(true);
    const res = await addToCart(product._id, 1);
    setIsAdding(false);

    if (res.success) {
      setAddSuccess(true);
      setTimeout(() => setAddSuccess(false), 2000);
    } else {
      alert(res.error || 'Failed to add item to cart');
    }
  };

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(product.price);

  // Mark first few products as "NEW"
  const isNew = ['Kapde Wala Flow X1', 'Essential Cotton Hoodie', 'Heritage Chrono Leather Watch'].includes(product.name);

  return (
    <div className="group relative bg-white border border-neutral-100 rounded-2xl overflow-hidden premium-shadow-hover flex flex-col justify-between">
      
      {/* Product Image & Badges Container */}
      <div className="relative aspect-square w-full bg-neutral-50 overflow-hidden">
        <Link to={`/product/${product._id}`} className="block w-full h-full">
          <img
            src={product.imageUrl}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* New Badge */}
        {isNew && (
          <span className="absolute top-3 left-3 bg-black text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full z-10 select-none">
            NEW
          </span>
        )}

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className="absolute top-3 right-3 w-10 h-10 bg-white/80 hover:bg-white text-neutral-800 rounded-full flex items-center justify-center shadow-xs hover:scale-105 active:scale-95 transition-all z-10"
          aria-label={isLiked ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            size={16}
            className={`transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'text-neutral-600'}`}
          />
        </button>
      </div>

      {/* Info Details Section */}
      <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Category */}
          <div className="text-[9px] sm:text-xs font-bold tracking-widest uppercase text-neutral-400 mb-1">
            {product.category}
          </div>
          {/* Product Name */}
          <Link to={`/product/${product._id}`} className="block">
            <h3 className="text-xs sm:text-sm font-bold text-neutral-900 line-clamp-1 hover:underline">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Price & Quick Add Button Row */}
        <div className="flex items-center justify-between pt-2 mt-auto border-t border-neutral-50">
          <span className="text-xs sm:text-base font-black text-neutral-900">
            {formattedPrice}
          </span>

          <button
            onClick={handleQuickAdd}
            disabled={isAdding || product.stock === 0}
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all ${
              product.stock === 0
                ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                : addSuccess
                ? 'bg-green-500 text-white shadow-md'
                : 'bg-black text-white hover:bg-neutral-800 shadow-md active:scale-95'
            }`}
            aria-label={`Add ${product.name} to cart`}
          >
            {addSuccess ? (
              <Check size={16} className="animate-scale-in" />
            ) : (
              <Plus size={16} className={isAdding ? 'animate-spin' : ''} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
