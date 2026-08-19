import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const PromoBanner: React.FC = () => {
  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        
        {/* Left Promo Card - Limited Time Offer */}
        <div className="relative bg-neutral-900 text-white rounded-2xl p-6 sm:p-10 flex flex-col justify-between items-start min-h-[220px] sm:min-h-[300px] overflow-hidden group">
          {/* Subtle design element */}
          <div className="absolute right-0 bottom-0 w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-white/5 blur-3xl group-hover:scale-110 transition-transform duration-500"></div>

          <div className="space-y-2 sm:space-y-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">
              LIMITED TIME OFFER
            </span>
            <h2 className="text-xl sm:text-3xl font-black uppercase tracking-tight leading-tight">
              UP TO 40% OFF
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-[200px] sm:max-w-xs">
              On selected premium items. Experience elevation at a special price.
            </p>
          </div>

          <Link
            to="/shop?category=SALE"
            className="mt-6 flex items-center space-x-2 text-xs font-bold uppercase tracking-widest group-hover:underline"
          >
            <span>Shop Sale</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Right Promo Card - Premium Quality */}
        <div className="relative bg-neutral-100 text-black rounded-2xl p-6 sm:p-10 flex flex-col justify-between items-start min-h-[220px] sm:min-h-[300px] overflow-hidden group">
          {/* Subtle design element */}
          <div className="absolute right-0 bottom-0 w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-black/5 blur-3xl group-hover:scale-110 transition-transform duration-500"></div>

          <div className="space-y-2 sm:space-y-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500">
              PREMIUM QUALITY
            </span>
            <h2 className="text-xl sm:text-3xl font-black uppercase tracking-tight leading-tight">
              CRAFTED<br />FOR YOU
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-[200px] sm:max-w-xs">
              Details that make the difference. 100% fine cotton, precision stitching, and premium finishes.
            </p>
          </div>

          <Link
            to="/shop"
            className="mt-6 flex items-center space-x-2 text-xs font-bold uppercase tracking-widest group-hover:underline"
          >
            <span>Explore Collection</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
};
