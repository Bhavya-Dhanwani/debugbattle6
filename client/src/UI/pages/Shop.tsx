import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ProductGrid } from '../components/ProductGrid';
import { useProducts } from '../../hooks/useProducts';
import { Search } from 'lucide-react';

export const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    products,
    loading,
    categories,
    selectedCategory,
    searchQuery,
    fetchProducts,
    changeCategory,
    changeSearchQuery,
  } = useProducts();

  // Read URL parameters on load & sync state
  useEffect(() => {
    const categoryParam = searchParams.get('category') || 'ALL';
    const searchParam = searchParams.get('search') || '';

    changeCategory(categoryParam);
    changeSearchQuery(searchParam);
    fetchProducts(categoryParam, searchParam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleCategoryClick = (cat: string) => {
    setSearchParams((prev: URLSearchParams) => {
      const next = new URLSearchParams(prev);
      if (cat === 'ALL') {
        next.delete('category');
      } else {
        next.set('category', cat);
      }
      return next;
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchParams((prev: URLSearchParams) => {
      const next = new URLSearchParams(prev);
      if (!val) {
        next.delete('search');
      } else {
        next.set('search', val);
      }
      return next;
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-neutral-50/50 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-neutral-100 mb-8">
          <div>
            <h1 className="text-xl sm:text-3xl font-black uppercase tracking-wider text-black">
              Shop Catalog
            </h1>
            <p className="text-xs text-neutral-500 font-medium mt-1">
              Browse premium lifestyle wear and sneaker essentials.
            </p>
          </div>

          {/* Catalog Search Input */}
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
              <Search size={16} />
            </span>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-neutral-200 bg-white text-xs sm:text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories Sidebar - Desktop */}
          <aside className="hidden lg:block space-y-6">
            <div>
              <h2 className="text-xs font-black uppercase tracking-widest text-neutral-900 mb-4 pb-2 border-b border-neutral-100">
                Categories
              </h2>
              <nav className="flex flex-col space-y-1">
                {categories.map((cat: string) => {
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => handleCategoryClick(cat)}
                      className={`text-left px-3 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-black text-white'
                          : 'text-neutral-500 hover:bg-neutral-100 hover:text-black'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Categories Horizontal - Mobile */}
          <div className="lg:hidden w-full overflow-x-auto no-scrollbar scroll-smooth flex space-x-2 pb-4">
            {categories.map((cat: string) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-colors border cursor-pointer ${
                    isActive
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-neutral-500 border-neutral-200 hover:text-black'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Product Grid Area */}
          <div className="lg:col-span-3">
            <ProductGrid products={products} loading={loading} />
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
};
