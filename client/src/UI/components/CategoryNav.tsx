import React from 'react';
import { useProducts } from '../../hooks/useProducts';

export const CategoryNav: React.FC = () => {
  const { categories, selectedCategory, changeCategory } = useProducts();

  return (
    <div className="w-full px-4 py-8 flex justify-center">
      {/* Floating rounded panel */}
      <div 
        className="flex items-center space-x-2 sm:space-x-4 bg-white border border-neutral-100/80 p-2 sm:p-3 rounded-full shadow-lg shadow-neutral-100 max-w-full overflow-x-auto no-scrollbar scroll-smooth"
        role="tablist"
        aria-label="Product categories"
      >
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              role="tab"
              aria-selected={isActive}
              onClick={() => changeCategory(cat)}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-black text-white shadow-md'
                  : 'text-neutral-500 hover:text-black hover:bg-neutral-50'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
};
