import React, { useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { CategoryNav } from '../components/CategoryNav';
import { ProductGrid } from '../components/ProductGrid';
import { PromoBanner } from '../components/PromoBanner';
import { BenefitsBar } from '../components/BenefitsBar';
import { Footer } from '../components/Footer';
import { useProducts } from '../../hooks/useProducts';
import { useCart } from '../../hooks/useCart';

export const Home: React.FC = () => {
  const { products, loading, fetchProducts, selectedCategory, searchQuery } = useProducts();
  const { fetchCart } = useCart();

  useEffect(() => {
    fetchProducts(selectedCategory, searchQuery);
    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, searchQuery]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-neutral-50/50">
        <Hero />
        
        {/* Category & New Arrivals Product Catalog Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center space-y-2 mb-6">
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-neutral-900">
              New Arrivals
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 font-medium max-w-md mx-auto">
              Discover the latest statement pieces crafted for everyday comfort and modern styling.
            </p>
          </div>

          <CategoryNav />

          <ProductGrid products={products} loading={loading} />
        </section>

        <PromoBanner />
        <BenefitsBar />
      </main>
      <Footer />
    </div>
  );
};
